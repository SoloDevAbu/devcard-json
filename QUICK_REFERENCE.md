# Quick Reference Guide

Quick commands and tips for working with DevCard Generator.

## 🚀 Common Commands

### Development
```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Check TypeScript types
```

### Database
```bash
npx prisma generate              # Generate Prisma Client
npx prisma migrate dev           # Create and apply migration
npx prisma migrate deploy        # Apply migrations (production)
npx prisma migrate reset         # Reset database (dev only)
npx prisma studio                # Open database GUI
npx prisma db push               # Sync schema without migration
```

### Setup
```bash
./scripts/quick-start.sh         # Run quick setup
./scripts/setup.sh               # Run setup with prompts
npm install                      # Install dependencies
```

## 🔑 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<32+ char random string>"

# Google OAuth
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### Generate Secret
```bash
openssl rand -base64 32
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env` | Environment variables (not in git) |
| `prisma/schema.prisma` | Database schema |
| `lib/auth.ts` | NextAuth configuration |
| `middleware.ts` | Route protection |
| `app/page.tsx` | Home page |
| `app/dashboard/page.tsx` | User dashboard |

## 🔧 Common Tasks

### Add New Card Template

1. Create template file:
```typescript
// components/card-templates/my-template.tsx
import { DeveloperData } from '@/lib/types';

export function MyTemplate({ data }: { data: DeveloperData }) {
  return (
    <div className="w-[600px] h-[400px]">
      {/* Your design */}
    </div>
  );
}
```

2. Update types:
```typescript
// lib/types.ts
export type CardTheme = 'dark-code' | 'ocean' | 'sunset' | 'matrix' | 'minimal' | 'my-template';
```

3. Add to selector:
```typescript
// components/template-selector.tsx
const templates: CardTemplate[] = [
  // ... existing templates
  {
    id: 'my-template',
    name: 'My Template',
    description: 'Description here',
  },
];
```

4. Add to preview:
```typescript
// components/card-preview.tsx
import { MyTemplate } from './card-templates/my-template';

const renderTemplate = () => {
  switch (theme) {
    // ... existing cases
    case 'my-template':
      return <MyTemplate data={data} />;
  }
};
```

### Add Database Field

1. Update schema:
```prisma
// prisma/schema.prisma
model Card {
  // ... existing fields
  newField  String?
}
```

2. Create migration:
```bash
npx prisma migrate dev --name add_new_field
```

3. Update TypeScript types:
```typescript
// lib/types.ts
export interface DeveloperData {
  // ... existing fields
  newField?: string;
}
```

4. Update form and components as needed

### Add API Endpoint

```typescript
// app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Your logic here

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check if PostgreSQL is running
pg_isready

# Test connection
psql $DATABASE_URL

# Regenerate Prisma Client
npx prisma generate
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma Client
npx prisma generate

# Try building again
npm run build
```

### OAuth Not Working
1. Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
2. Verify redirect URI in Google Console: `http://localhost:3000/api/auth/callback/google`
3. Check `NEXTAUTH_URL` matches your domain
4. Ensure `NEXTAUTH_SECRET` is set

### TypeScript Errors
```bash
# Check for errors
npm run typecheck

# Check specific file
npx tsc --noEmit path/to/file.ts
```

## 🔍 Useful Queries

### Check Database
```sql
-- Count users
SELECT COUNT(*) FROM "User";

-- Count cards
SELECT COUNT(*) FROM "Card";

-- Total downloads
SELECT SUM(downloads) FROM "Card";

-- Cards per user
SELECT u.name, COUNT(c.id) as card_count
FROM "User" u
LEFT JOIN "Card" c ON u.id = c."userId"
GROUP BY u.id, u.name;
```

### View Logs

**Development:**
```bash
# Server logs appear in terminal running npm run dev
```

**Production:**
```bash
# Vercel
vercel logs

# PM2
pm2 logs devcard-generator

# Railway
railway logs
```

## 📊 Health Checks

```bash
# Check API health
curl http://localhost:3000/api/health

# Expected response:
# {"status":"ok","timestamp":"...","database":"connected"}

# Check if server is running
curl http://localhost:3000

# Check specific endpoint
curl -X POST http://localhost:3000/api/cards \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","title":"Developer"}'
```

## 🎨 Styling Tips

### Tailwind Classes
```typescript
// Responsive
className="w-full md:w-1/2 lg:w-1/3"

// Hover effects
className="hover:bg-primary/10 hover:scale-105 transition-all"

// Dark mode (if implemented)
className="bg-white dark:bg-gray-900"

// Gradients
className="bg-gradient-to-r from-primary to-blue-500"
```

### Custom Animations
```typescript
// Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {children}
</motion.div>
```

## 🔐 Security Reminders

- ✅ Never commit `.env` file
- ✅ Use strong `NEXTAUTH_SECRET`
- ✅ Keep dependencies updated
- ✅ Validate user input
- ✅ Use HTTPS in production
- ✅ Regular database backups
- ✅ Monitor error logs

## 📚 Documentation Links

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com)
- [Framer Motion](https://www.framer.com/motion)

## 💡 Pro Tips

1. **Use Prisma Studio** for easy database management
   ```bash
   npx prisma studio
   ```

2. **Hot reload** - Changes to most files trigger auto-reload

3. **Environment variables** - Restart dev server after changing `.env`

4. **Database changes** - Always create migrations for schema changes

5. **Type safety** - Let TypeScript guide you with autocomplete

6. **Git hooks** - Consider adding pre-commit hooks for type checking

7. **Error monitoring** - Consider adding Sentry or similar in production

8. **Performance** - Use React DevTools Profiler to find slow components

9. **Debugging** - Use `console.log` or VS Code debugger

10. **Testing** - Test authentication flow and download limits thoroughly

## 🎯 Quick Testing Checklist

- [ ] Form validation works
- [ ] All templates render
- [ ] PNG download works
- [ ] SVG download works
- [ ] JSON download works
- [ ] Google sign-in works
- [ ] Download limit triggers
- [ ] Dashboard loads
- [ ] Cards show in dashboard
- [ ] Statistics are correct
- [ ] Responsive on mobile
- [ ] No console errors

## 📞 Getting Help

1. Check this quick reference
2. Review README.md
3. Check DEPLOYMENT.md for production issues
4. Review error logs
5. Check documentation links
6. Open GitHub issue

---

**Happy coding! 🚀**
