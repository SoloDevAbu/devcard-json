# DevCard Generator

A modern, feature-rich web application for creating beautiful developer cards. Built with Next.js 15, TypeScript, Prisma, PostgreSQL, and NextAuth.

## Features

✨ **Core Features**
- Create stunning developer cards with customizable templates
- 5 beautiful themes: Dark Code, Ocean, Sunset, Matrix, and Minimal
- Export cards as PNG, SVG, or JSON
- Responsive design with smooth animations

🔐 **Authentication & Authorization**
- Google OAuth integration via NextAuth
- Download limit: 1 free download, unlimited for signed-in users
- Secure session management

💾 **Database & Persistence**
- PostgreSQL database with Prisma ORM
- Track card creation history
- Monitor download counts
- User profile management

📊 **Dashboard**
- View all created cards
- Track download statistics
- Quick access to card history
- Beautiful analytics display

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js with Google Provider
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Card Export:** html2canvas

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd devcard-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/devcard_generator?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Get Google OAuth credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret

### 4. Set up the database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### User
- Stores user authentication data
- Links to accounts and sessions
- Tracks created cards

### Card
- Stores card information (name, title, social links, tech stack)
- Tracks download count
- Links to user (optional for guest cards)

### Account & Session
- Managed by NextAuth for OAuth

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth API routes
│   │   └── cards/                  # Card API endpoints
│   ├── dashboard/                  # User dashboard
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Home page
├── components/
│   ├── card-templates/             # Card design templates
│   ├── ui/                         # Reusable UI components
│   ├── card-preview.tsx            # Card preview & download
│   ├── developer-form.tsx          # Card creation form
│   ├── header.tsx                  # Navigation header
│   ├── providers.tsx               # App providers
│   └── template-selector.tsx       # Template selection
├── lib/
│   ├── auth.ts                     # NextAuth configuration
│   ├── prisma.ts                   # Prisma client
│   ├── types.ts                    # TypeScript types
│   └── utils.ts                    # Utility functions
├── prisma/
│   └── schema.prisma               # Database schema
└── types/
    └── next-auth.d.ts              # NextAuth type extensions
```

## Features Overview

### Card Creation Flow
1. **Enter Details:** Fill in developer information (name, title, social links, tech stack)
2. **Choose Template:** Select from 5 beautiful themes
3. **Download:** Export as PNG, SVG, or JSON

### Authentication Logic
- **Guest Users:** Can create and download 1 card
- **Signed-in Users:** Unlimited card creation and downloads
- **Auto-save:** Cards are automatically saved to database for authenticated users

### Dashboard Features
- View all created cards
- Track total downloads
- See card creation dates
- Quick statistics overview

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript compiler check
```

### Database Commands

```bash
npx prisma generate       # Generate Prisma Client
npx prisma migrate dev    # Create and apply migrations
npx prisma migrate reset  # Reset database
npx prisma studio         # Open Prisma Studio
npx prisma db push        # Push schema changes (no migration)
```

## Deployment

### Environment Variables for Production

Ensure all environment variables are set in your production environment:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your production URL
- `NEXTAUTH_SECRET`: Secure random string
- `GOOGLE_CLIENT_ID`: Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth Client Secret

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

**Note:** Make sure to add your production URL to Google OAuth authorized redirect URIs.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## 📖 Documentation

- **[Quick Reference](QUICK_REFERENCE.md)** - Common commands and tasks
- **[Architecture Overview](ARCHITECTURE.md)** - System architecture and diagrams
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment instructions
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Changelog](CHANGELOG.md)** - Version history and changes
- **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - Technical details
- **[Project Complete](PROJECT_COMPLETE.md)** - Final summary

## Support

If you have any questions or need help:
1. Check the documentation above
2. Review the [Quick Reference](QUICK_REFERENCE.md)
3. Open an issue on GitHub

## Acknowledgments

Built with amazing open-source technologies:
- [Next.js](https://nextjs.org)
- [Prisma](https://www.prisma.io)
- [NextAuth.js](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Framer Motion](https://www.framer.com/motion)

---

Made with ❤️ for developers, by developers
