#!/bin/bash

echo "🚀 DevCard Generator - Quick Start"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if PostgreSQL is accessible
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL CLI not found. Make sure PostgreSQL is installed and running."
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Update .env with your credentials:"
    echo "   - DATABASE_URL"
    echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
    echo "   - GOOGLE_CLIENT_ID"
    echo "   - GOOGLE_CLIENT_SECRET"
    echo ""
    read -p "Press Enter when you've updated the .env file..."
fi

echo ""
echo "🔧 Generating Prisma Client..."
npx prisma generate

echo ""
echo "🗄️  Setting up database..."
read -p "Do you want to run database migrations now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx prisma migrate dev --name init
    echo "✅ Database migrations completed!"
else
    echo "⚠️  Remember to run 'npx prisma migrate dev' before starting the app!"
fi

echo ""
echo "=================================="
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Ensure your .env file is configured"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "📚 Useful Commands:"
echo "   npm run dev          - Start development server"
echo "   npm run build        - Build for production"
echo "   npm run typecheck    - Check TypeScript"
echo "   npx prisma studio    - Open database GUI"
echo ""
echo "Need help? Check README.md or DEPLOYMENT.md"
echo ""
