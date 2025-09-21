# Specification: CLONELY-FANZ Golden Boilerplate Transformation

## Product Requirements Document (PRD)

### Executive Summary
Transform the Lovable-generated CLONELY-FANZ platform from Vite/React with Supabase to the Golden Boilerplate architecture (Next.js 14 + Express + Prisma + PostgreSQL) with deployments to Vercel (frontend) and Railway (backend).

### User Requirements

#### Core User Needs
1. **Avatar Management**: Users need to create, customize, and manage AI avatars
2. **Content Generation**: Users need to generate animations and content with their avatars
3. **Authentication**: Users need secure sign-up, sign-in, and session management
4. **Dashboard**: Users need a central place to manage their avatars and view analytics
5. **Pricing & Payments**: Users need transparent pricing and payment options

#### Success Criteria
- ✅ All existing functionality preserved in new architecture
- ✅ Improved deployment reliability (Vercel + Railway)
- ✅ Better developer experience with modern tooling
- ✅ Simplified environment configuration
- ✅ Database schema properly migrated
- ✅ Authentication flow maintained

### Technical Requirements

#### Architecture Goals
1. **Frontend**: Next.js 14 App Router for SSR/SSG capabilities
2. **Backend**: Express + Prisma for robust API and database management
3. **Database**: PostgreSQL with Prisma ORM replacing Supabase
4. **Deployment**: Vercel (frontend) + Railway (backend) for scalability
5. **Security**: Maintain current authentication patterns

#### Data Model Migration
- Convert Supabase `avatars` table to Prisma schema
- Preserve all existing fields and relationships
- Maintain RLS equivalent through API middleware

#### Feature Parity Requirements
- ✅ Landing page with hero section
- ✅ User authentication (sign up, sign in, sign out)
- ✅ Avatar creation and management
- ✅ Dashboard with avatar analytics
- ✅ Pricing page with plan options
- ✅ 3D model rendering and animations
- ✅ File upload capabilities
- ✅ Responsive design maintained

### Integration Requirements
- Preserve Google Cloud Storage integration
- Maintain Sentry error tracking
- Keep crypto payment support (placeholder)
- Ensure CI/CD pipeline functionality

### Constraints
- No breaking changes to user experience
- Maintain existing UI/UX design
- Preserve all environment variables pattern
- Keep external service integrations functional

### Acceptance Criteria
- [ ] All React components successfully migrated to Next.js
- [ ] Backend APIs respond correctly with Prisma
- [ ] Database schema migrated without data loss
- [ ] Authentication flow works end-to-end
- [ ] Frontend deploys successfully to Vercel
- [ ] Backend deploys successfully to Railway
- [ ] Health checks pass for both services
- [ ] Environment variables properly configured
- [ ] Documentation updated with new deployment process

## Implementation Specification

### Phase 1: Repository Structure
- Create monorepo structure with `/apps/frontend` and `/apps/backend`
- Initialize separate package.json files for each app
- Configure root package.json for workspace management

### Phase 2: Frontend (Next.js 14)
- Migrate React components to Next.js App Router structure
- Convert React Router to Next.js file-based routing
- Update environment variables to `NEXT_PUBLIC_*` format
- Implement health check page at `/healthz`
- Configure Tailwind CSS for Next.js

### Phase 3: Backend (Express + Prisma)
- Convert Supabase schema to Prisma schema
- Create Express server with TypeScript
- Implement health endpoint at `/health`
- Migrate authentication middleware
- Create Dockerfile for Railway deployment

### Phase 4: Database Migration
- Design Prisma schema based on existing Supabase schema
- Create migration scripts for data preservation
- Implement equivalent Row Level Security in API layer
- Configure PostgreSQL connection strings

### Phase 5: Deployment Configuration
- Configure Vercel deployment for frontend
- Configure Railway deployment for backend
- Create environment examples
- Add deployment badges to README
- Document environment variable setup

### Testing Strategy
- Manual testing of key user flows
- API endpoint testing with health checks
- Database connection verification
- Authentication flow validation
- Frontend-backend integration testing

### Risk Mitigation
- Incremental migration approach
- Preserve original code until verification
- Environment variable backup and documentation
- Fallback deployment strategy
- Data migration verification

## Task Breakdown

### [P] Parallel Tasks - Phase 1
1. Create repository structure
2. Initialize Next.js frontend
3. Initialize Express backend
4. Create Prisma schema

### [P] Parallel Tasks - Phase 2
1. Migrate React components
2. Convert routing system
3. Implement API endpoints
4. Configure deployment

### Sequential Tasks - Phase 3
1. Test frontend-backend integration
2. Verify authentication flow
3. Test database operations
4. Deploy and validate

This specification follows the Spec-Kit methodology with clear requirements, testable acceptance criteria, and a structured implementation approach.