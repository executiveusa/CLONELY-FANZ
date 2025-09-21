# Implementation Plan: CLONELY-FANZ Golden Boilerplate

## Architecture Decision Records

### Frontend: Next.js 14 App Router
**Decision**: Use Next.js 14 with App Router
**Justification**:
- Superior SEO capabilities with SSR/SSG
- File-based routing simplifies navigation
- Built-in optimization for performance
- Better TypeScript integration
- Vercel deployment optimization

### Backend: Express + Prisma + PostgreSQL
**Decision**: Replace Supabase with Express + Prisma + PostgreSQL
**Justification**:
- Better control over API logic and middleware
- Prisma provides excellent TypeScript integration
- PostgreSQL offers production-grade reliability
- Railway provides excellent PostgreSQL hosting
- Separation of concerns between frontend and backend

### Deployment Strategy: Vercel + Railway
**Decision**: Deploy frontend to Vercel, backend to Railway
**Justification**:
- Vercel optimized for Next.js deployments
- Railway provides excellent Node.js + PostgreSQL hosting
- Environment separation for better security
- Scalability for production workloads

## Technical Implementation Plan

### Phase 1: Repository Restructuring [2 hours]

#### 1.1 Create Monorepo Structure
```
/apps
  /frontend (Next.js 14)
  /backend (Express + Prisma)
/packages (shared utilities if needed)
/docs
```

#### 1.2 Root Configuration
- Update root package.json for workspace management
- Configure shared ESLint and TypeScript configs
- Create root .gitignore

### Phase 2: Frontend Migration [4 hours]

#### 2.1 Next.js 14 Setup
- Initialize Next.js with TypeScript
- Configure Tailwind CSS
- Set up App Router structure
- Create next.config.mjs

#### 2.2 Component Migration Strategy
```
src/components → apps/frontend/components
src/lib → apps/frontend/lib (client-side only)
src/types → shared types or frontend-specific
```

#### 2.3 Routing Migration
```
React Router → Next.js App Router
/ → app/page.tsx
/dashboard → app/dashboard/page.tsx
/pricing → app/pricing/page.tsx
/clonely → app/clonely/page.tsx
```

#### 2.4 Environment Variables
```
VITE_* → NEXT_PUBLIC_*
Add NEXT_PUBLIC_API_BASE_URL for backend communication
```

#### 2.5 Health Check Implementation
```
apps/frontend/app/healthz/page.tsx
- Ping backend health endpoint
- Display system status
- Show backend connectivity
```

### Phase 3: Backend Migration [4 hours]

#### 3.1 Express + TypeScript Setup
- Initialize Express with TypeScript
- Configure CORS for frontend domain
- Set up middleware stack (helmet, compression, etc.)
- Configure error handling

#### 3.2 Prisma Configuration
```sql
-- Convert Supabase schema to Prisma schema
model Avatar {
  id              String   @id @default(uuid())
  name            String
  description     String
  imageUrl        String   @map("image_url")
  niche           String
  isNsfw          Boolean  @default(false) @map("is_nsfw")
  redditAutomation Boolean @default(false) @map("reddit_automation")
  subscriberCount Int      @default(0) @map("subscriber_count")
  messageCount    Int      @default(0) @map("message_count") 
  likeCount       Int      @default(0) @map("like_count")
  userId          String?  @map("user_id")
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  @@map("avatars")
}
```

#### 3.3 API Endpoints Migration
```
POST /api/avatars → POST /avatars
GET /api/avatars → GET /avatars
PUT /api/avatars/:id → PUT /avatars/:id
DELETE /api/avatars/:id → DELETE /avatars/:id
```

#### 3.4 Authentication Middleware
- Implement JWT validation middleware
- Replace Supabase RLS with API-level authorization
- Maintain user context in requests

#### 3.5 Health Endpoint
```typescript
GET /health → { ok: true, timestamp: Date, database: "connected" }
```

### Phase 4: Database Migration [2 hours]

#### 4.1 PostgreSQL Setup
- Configure Railway PostgreSQL instance
- Set up connection string in environment
- Initialize Prisma migrations

#### 4.2 Data Migration Strategy
- Export existing data from Supabase (if any)
- Create migration scripts for data preservation
- Validate data integrity post-migration

### Phase 5: Deployment Configuration [2 hours]

#### 5.1 Frontend (Vercel)
```json
// vercel.json
{
  "builds": [{ "src": "apps/frontend/package.json", "use": "@vercel/next" }],
  "env": {
    "NEXT_PUBLIC_API_BASE_URL": "@api-url"
  }
}
```

#### 5.2 Backend (Railway)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM gcr.io/distroless/nodejs20-debian11
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 8080
CMD ["src/index.js"]
```

#### 5.3 Railway Configuration
```toml
# railway.toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "Dockerfile"

[deploy]
healthcheckPath = "/health"
healthcheckTimeout = 100
healthcheckInterval = 10
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### Phase 6: CI/CD Pipeline [1 hour]

#### 6.1 GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build --workspace=apps/frontend
      
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build --workspace=apps/backend
```

## Pre-Implementation Gates

### Simplicity Gate ✅
- Architecture reduces complexity by separating concerns
- Eliminates Supabase vendor lock-in
- Simplifies deployment with standard platforms

### Anti-Abstraction Gate ✅
- Direct PostgreSQL usage instead of Supabase abstractions
- Standard Express patterns instead of serverless complexity
- Clear separation between frontend and backend

### Test-First Implementation ✅
- Health checks provide immediate validation
- API endpoints can be tested independently
- Frontend components can be tested with mock data

## Risk Assessment & Mitigation

### High Risk: Data Migration
**Mitigation**: 
- Export Supabase data before starting
- Test migration in development environment
- Implement rollback strategy

### Medium Risk: Authentication Flow
**Mitigation**:
- Preserve existing JWT patterns
- Test authentication thoroughly
- Maintain user session compatibility

### Low Risk: Deployment Configuration
**Mitigation**:
- Use proven deployment patterns
- Test deployments in staging
- Document environment variable setup

## Success Metrics

1. **Functionality Preservation**: All existing features work in new architecture
2. **Performance**: Page load times ≤ current performance
3. **Reliability**: Deployment success rate > 95%
4. **Developer Experience**: Setup time < 10 minutes for new developers
5. **Security**: No authentication or authorization regressions

## Post-Implementation TODO Items

- [ ] Stripe integration placeholder
- [ ] Advanced error monitoring setup
- [ ] Performance monitoring configuration
- [ ] Advanced caching strategy
- [ ] Database backup automation
- [ ] Monitoring and alerting setup

This plan follows test-driven development principles and ensures a smooth migration path while maintaining all existing functionality.