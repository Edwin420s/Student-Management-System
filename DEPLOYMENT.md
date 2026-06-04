# Deployment Guide - Ikonex Academy Student Management System

## Overview

This guide provides step-by-step instructions for deploying the Student Management System to production.

## Prerequisites

- GitHub account with repository access
- Vercel account (for frontend)
- Railway account (for backend + database) OR VPS with PostgreSQL
- Domain name (optional)

## Deployment Architecture

```
Frontend (Vercel) → Backend API (Railway/VPS) → PostgreSQL (Railway/VPS)
```

## Step 1: Database Deployment (Railway)

### Option A: Railway (Recommended)

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add a PostgreSQL database:
   - Click "New" → "Database" → "Add PostgreSQL"
5. Railway will provide a DATABASE_URL in the environment variables
6. Copy this DATABASE_URL for later use

### Option B: VPS with PostgreSQL

1. Provision a VPS (e.g., DigitalOcean, AWS EC2)
2. Install PostgreSQL:
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo -u postgres psql
   ```
3. Create database and user:
   ```sql
   CREATE DATABASE ikonex_academy;
   CREATE USER ikonex_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE ikonex_academy TO ikonex_user;
   ```
4. Note the connection string: `postgresql://ikonex_user:your_secure_password@your-vps-ip:5432/ikonex_academy`

## Step 2: Backend Deployment (Railway)

1. In your Railway project, click "New" → "Service" → "Deploy from GitHub"
2. Select your repository
3. Configure the service:
   - Root directory: `server`
   - Build command: `npm run build`
   - Start command: `npm start`
4. Add environment variables:
   ```
   DATABASE_URL=<your-database-url-from-step-1>
   JWT_SECRET=<generate-a-secure-random-string>
   NODE_ENV=production
   ```
5. Click "Deploy"
6. Railway will provide a backend URL (e.g., `https://your-backend.railway.app`)

### Run Database Migrations

After backend deployment, you need to run migrations:

1. Go to your Railway backend service
2. Click "Variables" tab
3. Add a new variable: `CLI_COMMAND=migrate deploy`
4. Or use Railway CLI:
   ```bash
   railway login
   railway run npx prisma migrate deploy
   ```

### Seed Database (Optional)

To seed with initial data:
```bash
railway run npx prisma db seed
```

## Step 3: Frontend Deployment (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - Root directory: `Client`
   - Build command: `npm run build`
   - Output directory: `.next`
5. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=<your-railway-backend-url>
   DATABASE_URL=<your-database-url>
   JWT_SECRET=<same-as-backend>
   ```
6. Click "Deploy"
7. Vercel will provide a frontend URL (e.g., `https://your-app.vercel.app`)

## Step 4: Update API Client Configuration

In `Client/src/lib/api.ts`, ensure the API base URL points to your backend:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
```

## Step 5: Verify Deployment

1. Access your frontend URL
2. Login with default credentials:
   - Email: `admin@ikonex.com`
   - Password: `admin123`
3. Test core functionality:
   - Create a class stream
   - Add a student
   - Create a subject
   - Assign subject to stream
   - Record scores
   - Generate PDF report

## Step 6: Custom Domain (Optional)

### Vercel Frontend
1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Railway Backend
1. Go to Railway backend service
2. Click "Settings" → "Networking"
3. Add custom domain
4. Update DNS records

## Environment Variables Reference

### Backend (server/.env)
```
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=production
```

### Frontend (Client/.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check PostgreSQL allows remote connections
- Ensure firewall rules permit traffic

### Build Failures
- Check build logs for specific errors
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility (Node.js 20+)

### API Errors
- Verify backend is running
- Check CORS settings
- Ensure environment variables match between frontend and backend

### PDF Generation Issues
- Verify @react-pdf/renderer is installed
- Check memory limits on deployment platform

## Security Best Practices

1. **Change default credentials** immediately after first login
2. **Use strong JWT_SECRET** (generate with: `openssl rand -base64 32`)
3. **Enable HTTPS** on both frontend and backend
4. **Set up database backups** (Railway has automatic backups)
5. **Monitor logs** for suspicious activity
6. **Keep dependencies updated** regularly

## Monitoring

### Railway
- Built-in metrics dashboard
- Log viewing
- Error tracking

### Vercel
- Analytics dashboard
- Log viewing
- Performance monitoring

## Scaling

If traffic increases:
1. **Database**: Upgrade PostgreSQL plan on Railway
2. **Backend**: Enable horizontal scaling on Railway
3. **Frontend**: Vercel automatically scales

## Cost Estimates (Monthly)

- Railway PostgreSQL: ~$5-15
- Railway Backend: ~$5-15
- Vercel Frontend: Free tier (up to 100GB bandwidth)
- **Total**: ~$10-30/month

## Support

For issues or questions:
- Check logs in Railway/Vercel dashboards
- Review this deployment guide
- Consult the main README.md
