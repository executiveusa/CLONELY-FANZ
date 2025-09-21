import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
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

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({ 
      ok: true, 
      timestamp: new Date().toISOString(),
      database: 'connected',
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
    const avatars = await prisma.avatar.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ data: avatars });
  } catch (error) {
    console.error('Error fetching avatars:', error);
    res.status(500).json({ error: 'Failed to fetch avatars' });
  }
});

app.post('/avatars', async (req, res) => {
  try {
    const { name, description, niche, isNsfw, imageUrl } = req.body;
    
    const avatar = await prisma.avatar.create({
      data: {
        name,
        description,
        niche,
        isNsfw: isNsfw || false,
        imageUrl: imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        // TODO: Add userId from authentication
      }
    });
    
    res.status(201).json({ data: avatar });
  } catch (error) {
    console.error('Error creating avatar:', error);
    res.status(500).json({ error: 'Failed to create avatar' });
  }
});

app.get('/avatars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const avatar = await prisma.avatar.findUnique({
      where: { id }
    });
    
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
    
    const avatar = await prisma.avatar.update({
      where: { id },
      data: {
        name,
        description,
        niche,
        isNsfw,
        updatedAt: new Date()
      }
    });
    
    res.json({ data: avatar });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ error: 'Failed to update avatar' });
  }
});

app.delete('/avatars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.avatar.delete({
      where: { id }
    });
    
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

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;