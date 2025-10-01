# Contributing to DevCard Generator

Thank you for your interest in contributing to DevCard Generator! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards others

## Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Git
- Basic knowledge of Next.js, React, and TypeScript

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/devcard-generator.git
   cd devcard-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/your-repo/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check if the feature has been suggested in [Issues](https://github.com/your-repo/issues)
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Any implementation ideas

### Pull Requests

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   **Commit message format:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Link related issues

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow the existing code structure
- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for complex functions

### Component Guidelines

```typescript
// Good component structure
interface MyComponentProps {
  /** Description of prop */
  propName: string;
  /** Optional prop with default */
  optionalProp?: boolean;
}

export function MyComponent({ propName, optionalProp = false }: MyComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### File Organization

```
/app
  /api           # API routes
  /dashboard     # Dashboard pages
  page.tsx       # Home page
  layout.tsx     # Root layout

/components
  /ui            # Reusable UI components
  /card-templates # Card design templates
  feature.tsx    # Feature components

/lib
  utils.ts       # Utility functions
  types.ts       # TypeScript types

/prisma
  schema.prisma  # Database schema
```

### Adding New Card Templates

1. Create a new template file in `/components/card-templates/`
2. Follow the existing template structure
3. Export the component
4. Add it to the template selector
5. Update types in `/lib/types.ts`
6. Test with different data

Example:
```typescript
import { DeveloperData } from '@/lib/types';

interface CardTemplateProps {
  data: DeveloperData;
}

export function MyAwesomeTemplate({ data }: CardTemplateProps) {
  return (
    <div className="w-[600px] h-[400px] ...">
      {/* Your design */}
    </div>
  );
}
```

### Database Changes

1. Update schema in `prisma/schema.prisma`
2. Create migration:
   ```bash
   npx prisma migrate dev --name description-of-change
   ```
3. Update related TypeScript types
4. Update API routes if needed

### API Route Guidelines

- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return appropriate status codes
- Handle errors gracefully
- Validate input data
- Use TypeScript types

Example:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Your logic here

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Testing

Currently, the project doesn't have automated tests. Contributions for adding tests are welcome!

### Manual Testing Checklist

- [ ] Form validation works
- [ ] All templates render correctly
- [ ] Downloads work (PNG, SVG, JSON)
- [ ] Authentication flow works
- [ ] Dashboard displays correctly
- [ ] Responsive on mobile devices
- [ ] No console errors
- [ ] No TypeScript errors

## Documentation

- Update README.md for new features
- Add JSDoc comments for complex functions
- Update DEPLOYMENT.md for deployment changes
- Add examples for new features

## Questions?

- Open an issue for discussion
- Check existing issues and PRs
- Read the documentation

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing! 🎉
