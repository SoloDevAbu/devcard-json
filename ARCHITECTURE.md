# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Interface                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   Home   │  │Dashboard │  │ Preview  │  │  Auth    │       │
│  │  Page    │  │  Page    │  │  Page    │  │  Dialog  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
                            ↕ (React Components)
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js App Router                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Middleware (Route Protection)                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ Page Routes │  │ API Routes  │  │  Providers  │            │
│  │ (/, /dash)  │  │ (/api/*)    │  │  (Session)  │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                            ↕ (HTTP/HTTPS)
┌─────────────────────────────────────────────────────────────────┐
│                      Authentication Layer                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  NextAuth.js                                              │  │
│  │  ├─ Google OAuth Provider                                │  │
│  │  ├─ Session Management                                   │  │
│  │  ├─ JWT/Database Sessions                                │  │
│  │  └─ User Authentication                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            ↕ (Prisma Client)
┌─────────────────────────────────────────────────────────────────┐
│                      Database Layer (Prisma)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  ORM & Query Builder                                      │  │
│  │  ├─ Type-safe queries                                     │  │
│  │  ├─ Migration management                                 │  │
│  │  ├─ Connection pooling                                   │  │
│  │  └─ Schema validation                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            ↕ (SQL)
┌─────────────────────────────────────────────────────────────────┐
│                      PostgreSQL Database                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │  User   │  │  Card   │  │ Account │  │ Session │           │
│  │  Table  │  │  Table  │  │  Table  │  │  Table  │           │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### User Authentication Flow

```
┌─────────┐                 ┌──────────┐                ┌─────────┐
│  User   │────Sign In─────>│ NextAuth │───Redirect────>│ Google  │
│         │                 │          │                │  OAuth  │
└─────────┘                 └──────────┘                └─────────┘
     ^                            │                           │
     │                            │                           │
     │                            v                           │
     │                      ┌──────────┐                     │
     └─────Session──────────│ Database │<────User Data───────┘
                            │ (Prisma) │
                            └──────────┘
```

### Card Creation Flow

```
┌──────────────┐
│ User Fills   │
│    Form      │
└──────┬───────┘
       │
       v
┌──────────────┐
│   Choose     │
│  Template    │
└──────┬───────┘
       │
       v
┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│   Preview    │────>│  API Route  │────>│   Database   │
│    Card      │     │ POST /cards │     │ Save Card    │
└──────┬───────┘     └─────────────┘     └──────────────┘
       │
       v
┌──────────────┐
│  Download    │
│ PNG/SVG/JSON │
└──────────────┘
```

### Download Limit Flow

```
┌──────────────┐
│ User Clicks  │
│  Download    │
└──────┬───────┘
       │
       v
┌──────────────────┐      ┌──────────────┐
│ Check Download   │─────>│  Database    │
│     Count        │      │ Query Card   │
└──────┬───────────┘      └──────────────┘
       │
       ├─── Count = 0 ──────────┐
       │                        v
       │                 ┌──────────────┐
       │                 │   Allow      │
       │                 │  Download    │
       │                 └──────────────┘
       │
       ├─── Count >= 1 & No Auth ───────┐
       │                                 v
       │                          ┌──────────────┐
       │                          │ Show Auth    │
       │                          │   Dialog     │
       │                          └──────────────┘
       │
       └─── Count >= 1 & Auth ──────────┐
                                         v
                                  ┌──────────────┐
                                  │   Allow      │
                                  │  Download    │
                                  └──────────────┘
```

## Component Hierarchy

```
App Layout (layout.tsx)
├── Providers (SessionProvider, ThemeProvider)
│   ├── Header
│   │   ├── Logo
│   │   └── Auth Menu
│   │       ├── Avatar
│   │       └── Dropdown
│   │
│   ├── Home Page (page.tsx)
│   │   ├── Step Indicator
│   │   ├── Developer Form
│   │   │   ├── Input Fields
│   │   │   └── Tech Stack Manager
│   │   ├── Template Selector
│   │   │   └── Template Cards
│   │   └── Card Preview
│   │       ├── Template Renderer
│   │       └── Download Buttons
│   │
│   ├── Dashboard Page (dashboard/page.tsx)
│   │   ├── Stats Cards
│   │   │   ├── Total Cards
│   │   │   ├── Total Downloads
│   │   │   └── Member Since
│   │   └── Card Grid
│   │       └── Card Items
│   │
│   └── Toaster (Notifications)
```

## API Endpoint Structure

```
/api
├── /auth
│   └── /[...nextauth]
│       ├── GET  (Sign in page)
│       └── POST (Authentication)
│
├── /cards
│   ├── GET  (List user cards)
│   └── POST (Create new card)
│   └── /download
│       └── POST (Track download)
│
├── /user
│   └── /stats
│       └── GET (User statistics)
│
└── /health
    └── GET (Health check)
```

## Database Schema

```
┌─────────────────────┐
│       User          │
├─────────────────────┤
│ id (PK)             │
│ email               │
│ name                │
│ image               │
│ emailVerified       │
│ createdAt           │
│ updatedAt           │
└─────────┬───────────┘
          │
          │ 1:N
          │
┌─────────▼───────────┐       ┌─────────────────────┐
│       Card          │       │      Account        │
├─────────────────────┤       ├─────────────────────┤
│ id (PK)             │       │ id (PK)             │
│ userId (FK)         │◄──┐   │ userId (FK)         │
│ name                │   │   │ provider            │
│ title               │   │   │ providerAccountId   │
│ email               │   │   │ access_token        │
│ github              │   └───│ refresh_token       │
│ twitter             │       │ expires_at          │
│ linkedin            │       └─────────────────────┘
│ website             │
│ techStack[]         │       ┌─────────────────────┐
│ theme               │       │      Session        │
│ downloads           │       ├─────────────────────┤
│ createdAt           │       │ id (PK)             │
│ updatedAt           │       │ userId (FK)         │
└─────────────────────┘       │ sessionToken        │
                              │ expires             │
                              └─────────────────────┘
```

## Technology Stack

```
Frontend Layer
├── React 18.3.1
├── Next.js 15.1.4 (App Router)
├── TypeScript 5.7.2
├── Tailwind CSS 3.4.17
├── Radix UI Components
├── Framer Motion 11.13.5
└── Lucide Icons

Backend Layer
├── Next.js API Routes
├── NextAuth.js 4.24.11
├── Prisma ORM 5.22.0
└── Node.js 18+

Database Layer
└── PostgreSQL

Development Tools
├── ESLint 9.18.0
├── Prisma Studio
├── TypeScript Compiler
└── Next.js Dev Server

Deployment
├── Vercel (recommended)
├── Railway
├── Docker-ready
└── Any Node.js host
```

## Security Architecture

```
┌─────────────────────────────────────────┐
│        Security Layers                  │
├─────────────────────────────────────────┤
│                                         │
│  1. Environment Variables               │
│     ├─ .env file (not committed)       │
│     └─ Server-side only                │
│                                         │
│  2. Authentication                      │
│     ├─ NextAuth.js                     │
│     ├─ OAuth 2.0 (Google)              │
│     └─ Session encryption              │
│                                         │
│  3. Authorization                       │
│     ├─ Middleware protection           │
│     ├─ API route guards                │
│     └─ User-scoped queries             │
│                                         │
│  4. Data Protection                     │
│     ├─ Prisma (SQL injection safe)     │
│     ├─ Input validation                │
│     └─ Type safety (TypeScript)        │
│                                         │
│  5. Transport Security                  │
│     ├─ HTTPS in production             │
│     ├─ Secure cookies                  │
│     └─ CSRF protection                 │
│                                         │
└─────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CDN / Edge                       │
│              (Vercel Edge Network)                  │
└─────────────────┬───────────────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────────────┐
│              Next.js Application                    │
│  ┌───────────────────────────────────────────────┐ │
│  │  Static Assets (HTML, CSS, JS)                │ │
│  └───────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────┐ │
│  │  Server-Side Rendering (SSR)                  │ │
│  └───────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────┐ │
│  │  API Routes (Serverless Functions)            │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────┬───────────────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────────────┐
│         PostgreSQL Database                         │
│  (Vercel Postgres / Neon / Supabase)               │
└─────────────────────────────────────────────────────┘
```

## Performance Optimization

```
Client-Side
├── Code Splitting (Automatic)
├── Lazy Loading
├── Image Optimization
├── Cached Components
└── Minimal JavaScript

Server-Side
├── Static Generation
├── Incremental Static Regeneration
├── API Route Caching
├── Database Query Optimization
└── Connection Pooling

Database
├── Indexed Columns
├── Optimized Queries
├── Connection Pooling
└── Query Result Caching
```

## Monitoring & Observability

```
Production Monitoring
├── Health Check Endpoint (/api/health)
├── Error Boundary (UI errors)
├── API Error Logging
├── Database Connection Status
└── Performance Metrics

Recommended Tools
├── Vercel Analytics
├── Sentry (Error tracking)
├── LogRocket (Session replay)
├── Prisma Pulse (DB changes)
└── Vercel Speed Insights
```

---

This architecture provides:
- ✅ Scalability
- ✅ Security
- ✅ Performance
- ✅ Maintainability
- ✅ Developer Experience

For implementation details, see [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
