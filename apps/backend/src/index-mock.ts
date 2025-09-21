import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mock data store (replace with real database)
let avatars: any[] = [];

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    res.json({ 
      ok: true, 
      timestamp: new Date().toISOString(),
      database: 'mock', // Will be 'connected' when Prisma is working
      service: 'clonely-fanz-backend'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ 
      ok: false, 
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: 'Database connection failed'
    });
  }
});

// Avatar routes
app.get('/avatars', async (req, res) => {
  try {
    res.json({ data: avatars });
  } catch (error) {
    console.error('Error fetching avatars:', error);
    res.status(500).json({ error: 'Failed to fetch avatars' });
  }
});

app.post('/avatars', async (req, res) => {
  try {
    const { name, description, niche, isNsfw, imageUrl } = req.body;
    
    const avatar = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      niche,
      isNsfw: isNsfw || false,
      imageUrl: imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      subscriberCount: 0,
      messageCount: 0,
      likeCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // TODO: Add userId from authentication
    };
    
    avatars.push(avatar);
    res.status(201).json({ data: avatar });
  } catch (error) {
    console.error('Error creating avatar:', error);
    res.status(500).json({ error: 'Failed to create avatar' });
  }
});

app.get('/avatars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const avatar = avatars.find(a => a.id === id);
    
    if (!avatar) {
      return res.status(404).json({ error: 'Avatar not found' });
    }
    
    res.json({ data: avatar });
  } catch (error) {
    console.error('Error fetching avatar:', error);
    res.status(500).json({ error: 'Failed to fetch avatar' });
  }
});

app.put('/avatars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, niche, isNsfw } = req.body;
    
    const avatarIndex = avatars.findIndex(a => a.id === id);
    
    if (avatarIndex === -1) {
      return res.status(404).json({ error: 'Avatar not found' });
    }
    
    avatars[avatarIndex] = {
      ...avatars[avatarIndex],
      name,
      description,
      niche,
      isNsfw,
      updatedAt: new Date().toISOString()
    };
    
    res.json({ data: avatars[avatarIndex] });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ error: 'Failed to update avatar' });
  }
});

app.delete('/avatars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const avatarIndex = avatars.findIndex(a => a.id === id);
    
    if (avatarIndex === -1) {
      return res.status(404).json({ error: 'Avatar not found' });
    }
    
    avatars.splice(avatarIndex, 1);
    res.json({ message: 'Avatar deleted successfully' });
  } catch (error) {
    console.error('Error deleting avatar:', error);
    res.status(500).json({ error: 'Failed to delete avatar' });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;