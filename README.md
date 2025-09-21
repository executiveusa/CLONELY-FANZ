# CLONELY-FANZ - Golden Boilerplate

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.app/new/template?repository=executiveusa/CLONELY-FANZ&services=backend)

## 🚀 Overview

CLONELY-FANZ is an AI Avatar Platform built with the **Golden Boilerplate** architecture:

- **Frontend**: Next.js 14 with App Router and Tailwind CSS
- **Backend**: Express.js with TypeScript and Prisma ORM  
- **Database**: PostgreSQL with Prisma
- **Deployment**: Vercel (frontend) + Railway (backend)

### Features

- 🤖 AI Avatar creation and management
- 🎨 Interactive dashboard with analytics
- 💰 Pricing and payment system
- 🔐 User authentication and authorization
- 📱 Responsive design with modern UI components
- ⚡ Health monitoring and status checks

## 📁 Repository Structure

```
├── apps/
│   ├── frontend/          # Next.js 14 application
│   │   ├── src/app/       # App Router pages
│   │   ├── components/    # React components (to be migrated)
│   │   └── lib/          # Utilities and configurations
│   └── backend/          # Express API server
│       ├── src/          # TypeScript source code
│       ├── prisma/       # Database schema and migrations
│       └── Dockerfile    # Container configuration
├── specs/                # Project specifications and planning
├── .github/workflows/    # CI/CD pipeline
└── docs/                # Documentation
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+
- PostgreSQL database (for production)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/executiveusa/CLONELY-FANZ.git
   cd CLONELY-FANZ
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually:
   npm run dev --workspace=apps/frontend
   npm run dev --workspace=apps/backend
   ```

4. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Health Check: http://localhost:3000/healthz

## 🚀 Deployment

### Frontend (Vercel)

1. **Connect to Vercel**
   - Fork this repository
   - Connect your GitHub account to Vercel
   - Import the `apps/frontend` directory

2. **Configure Environment Variables**
   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://your-backend.up.railway.app
   ```

3. **Deploy**
   - Vercel will automatically deploy on push to main branch

### Backend (Railway)

1. **Deploy to Railway**
   - Click the "Deploy to Railway" button above
   - Or manually connect your GitHub repository
   - Select the `apps/backend` directory

2. **Configure Environment Variables**
   ```bash
   DATABASE_URL=postgresql://user:password@host:5432/database
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   ```

3. **Database Setup**
   - Railway will automatically provision a PostgreSQL database
   - Run migrations: `npm run db:migrate --workspace=apps/backend`

## 🔧 Development Workflow

### Building

```bash
# Build both applications
npm run build

# Build individually
npm run build --workspace=apps/frontend
npm run build --workspace=apps/backend
```

### Type Checking

```bash
# Type check both applications
npm run type-check

# Type check individually  
npm run type-check --workspace=apps/frontend
npm run type-check --workspace=apps/backend
```

### Linting

```bash
# Lint both applications
npm run lint

# Lint individually
npm run lint --workspace=apps/frontend
npm run lint --workspace=apps/backend
```

## 🔄 Database Management

```bash
# Generate Prisma client
npm run db:generate --workspace=apps/backend

# Run database migrations
npm run db:migrate --workspace=apps/backend

# Push schema changes to database
npm run db:push --workspace=apps/backend
```

## 🔗 API Endpoints

### Health Check
- `GET /health` - System health status

### Avatars
- `GET /avatars` - List all avatars
- `POST /avatars` - Create new avatar
- `GET /avatars/:id` - Get avatar by ID
- `PUT /avatars/:id` - Update avatar
- `DELETE /avatars/:id` - Delete avatar

## 🎯 VS Code + MCP Integration

To connect this project with MCP servers for enhanced development:

1. **Start MCP Gateway**
   ```bash
   # Install MCP gateway if not already installed
   npm install -g @modelcontextprotocol/gateway
   
   # Start gateway
   mcp-gateway start
   ```

2. **Add Vercel & Railway Servers**
   ```json
   {
     "mcpServers": {
       "vercel": {
         "command": "npx",
         "args": ["@vercel/mcp-server"],
         "env": {
           "VERCEL_TOKEN": "your-vercel-token"
         }
       },
       "railway": {
         "command": "npx", 
         "args": ["@railway/mcp-server"],
         "env": {
           "RAILWAY_TOKEN": "your-railway-token"
         }
       }
     }
   }
   ```

3. **Keep Platform Secrets Secure**
   - Store sensitive tokens in Vercel/Railway dashboards
   - Never commit secrets to source code
   - Use environment variables for all configuration

## 📚 Architecture Decisions

This project follows the **Golden Boilerplate** pattern with:

- **Separation of Concerns**: Clear frontend/backend boundaries
- **Type Safety**: Full TypeScript coverage
- **Modern Tooling**: Latest versions of Next.js, Express, Prisma
- **Production Ready**: Docker containers, CI/CD, health checks
- **Scalable**: Designed for horizontal scaling

## 🧪 Testing

```bash
# Run all tests (when implemented)
npm test

# Test health endpoints
curl http://localhost:8080/health
curl http://localhost:3000/healthz
```

## 📋 TODO Items

- [ ] Implement Stripe payment integration
- [ ] Add comprehensive test suite
- [ ] Set up advanced monitoring and alerting
- [ ] Implement rate limiting and security headers
- [ ] Add database backup automation
- [ ] Configure CDN for static assets
- [ ] Implement caching strategy
- [ ] Add API documentation with OpenAPI/Swagger

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with the Golden Boilerplate architecture for maximum reliability and developer experience.**
