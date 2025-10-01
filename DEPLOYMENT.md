# Deployment Guide

This guide will help you deploy the DevCard Generator to production.

## Prerequisites

- PostgreSQL database (production instance)
- Google OAuth credentials (production)
- Hosting platform account (Vercel, Railway, etc.)

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Prepare Database

You can use any PostgreSQL hosting service:
- **Vercel Postgres** (easiest with Vercel)
- **Neon** (https://neon.tech) - Free tier available
- **Supabase** (https://supabase.com) - Free tier available
- **Railway** (https://railway.app)
- **Heroku Postgres**

### Step 2: Set up Google OAuth for Production

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **Credentials** → **OAuth 2.0 Client IDs**
4. Edit your OAuth client or create a new one
5. Add your production URL to **Authorized JavaScript origins**:
   ```
   https://your-domain.com
   ```
6. Add to **Authorized redirect URIs**:
   ```
   https://your-domain.com/api/auth/callback/google
   ```

### Step 3: Deploy to Vercel

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import Project in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   
   Add these in Vercel dashboard (Settings → Environment Variables):
   
   ```env
   DATABASE_URL=postgresql://user:password@host:5432/database
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-production-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

   **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - Your app will be live at `your-app.vercel.app`

### Step 4: Run Database Migrations

After deployment, you need to run migrations:

**Option A: Using Vercel CLI**
```bash
npm i -g vercel
vercel env pull .env.local
npx prisma migrate deploy
```

**Option B: Using Prisma Studio**
```bash
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

## Option 2: Deploy to Railway

### Step 1: Set up Railway

1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Add PostgreSQL service
4. Note down the connection string

### Step 2: Deploy Application

1. **Connect GitHub Repo**
   - Click "New" → "GitHub Repo"
   - Select your repository
   - Railway will auto-detect Next.js

2. **Add Environment Variables**
   ```env
   DATABASE_URL=<from-railway-postgres>
   NEXTAUTH_URL=https://your-app.railway.app
   NEXTAUTH_SECRET=<generate-random-string>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   ```

3. **Deploy**
   - Railway will automatically deploy
   - Get your deployment URL

### Step 3: Run Migrations

```bash
# Set DATABASE_URL environment variable
export DATABASE_URL="your-railway-postgres-url"

# Run migrations
npx prisma migrate deploy
```

## Option 3: Deploy to DigitalOcean/AWS/GCP

### Requirements
- Node.js 18+ on server
- PostgreSQL database
- Nginx (optional, for reverse proxy)
- PM2 (for process management)

### Steps

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set environment variables on server**
   ```bash
   export DATABASE_URL="postgresql://..."
   export NEXTAUTH_URL="https://your-domain.com"
   export NEXTAUTH_SECRET="your-secret"
   export GOOGLE_CLIENT_ID="your-client-id"
   export GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

3. **Run database migrations**
   ```bash
   npx prisma migrate deploy
   ```

4. **Start the application**
   ```bash
   # Production mode
   npm start

   # Or with PM2
   pm2 start npm --name "devcard-generator" -- start
   ```

5. **Configure Nginx (optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Post-Deployment Checklist

- [ ] Database migrations applied successfully
- [ ] Environment variables configured correctly
- [ ] Google OAuth redirect URIs updated
- [ ] Health check endpoint responding: `/api/health`
- [ ] Sign in with Google working
- [ ] Card creation and download working
- [ ] Dashboard loading correctly
- [ ] SSL certificate configured (use Let's Encrypt)

## Monitoring & Maintenance

### Database Backups

**Vercel Postgres:**
- Automatic backups included

**Railway:**
- Automatic backups on paid plans

**Self-hosted:**
```bash
# Backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup-20240101.sql
```

### Check Application Health

```bash
curl https://your-domain.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"
}
```

### View Logs

**Vercel:**
- Dashboard → Your Project → Logs

**Railway:**
- Dashboard → Your Service → Logs

**PM2:**
```bash
pm2 logs devcard-generator
```

## Troubleshooting

### Database Connection Issues

1. Check DATABASE_URL is correct
2. Verify database is running
3. Check firewall rules allow connection
4. Ensure SSL mode is correct:
   ```
   postgresql://user:pass@host:5432/db?sslmode=require
   ```

### OAuth Issues

1. Verify Google OAuth credentials
2. Check redirect URIs match exactly
3. Ensure NEXTAUTH_URL is correct
4. Verify NEXTAUTH_SECRET is set

### Build Failures

1. Check Node.js version (18+)
2. Clear build cache
3. Verify all dependencies installed
4. Check Prisma Client generated:
   ```bash
   npx prisma generate
   ```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes |
| NEXTAUTH_URL | Your app's URL | Yes |
| NEXTAUTH_SECRET | Random secret for JWT | Yes |
| GOOGLE_CLIENT_ID | Google OAuth Client ID | Yes |
| GOOGLE_CLIENT_SECRET | Google OAuth Client Secret | Yes |

## Security Best Practices

1. **Never commit `.env` file**
2. **Use strong NEXTAUTH_SECRET** (32+ characters)
3. **Enable CORS only for your domain**
4. **Use HTTPS in production** (Let's Encrypt)
5. **Regularly update dependencies**
6. **Monitor for security vulnerabilities**
   ```bash
   npm audit
   ```
7. **Set up rate limiting** (Vercel has built-in)
8. **Regular database backups**

## Scaling Considerations

### Horizontal Scaling
- Vercel automatically scales
- Use connection pooling for database (PgBouncer)

### Database Optimization
```sql
-- Add indexes for performance
CREATE INDEX idx_cards_user_id ON "Card"("userId");
CREATE INDEX idx_cards_created_at ON "Card"("createdAt");
```

### CDN & Caching
- Vercel Edge Network (automatic)
- Cache static assets
- Use Next.js Image Optimization

## Support

For issues or questions:
- Check logs first
- Review this guide
- Open GitHub issue
- Check Next.js documentation
- Check Prisma documentation

---

Good luck with your deployment! 🚀
