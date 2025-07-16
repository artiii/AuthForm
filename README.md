# Auth Form App

A simple authentication app built with Next.js and protected routes. Created to demonstrate modern auth patterns in React applications.

## Requirements

- **Node.js**: 18.17+ or newer
- **npm**: 8.0+ or yarn/pnpm

## Tech Stack

- **Next.js 15** with App Router and Turbopack
- **React 19** with hooks
- **TypeScript** for type safety
- **Supabase** for authentication
- **SCSS Modules** for styling
- **React Hook Form** + **Zod** for form validation
- **Feature-Sliced Design** architecture

## Features

- User login with email/password
- Route protection from unauthorized users
- Automatic redirects (to login/home)
- Logout with session cleanup
- Responsive design with dark theme support

## Quick Start

1. Clone and install dependencies:
```bash
npm install
```

2. Setup Supabase:

   Use existed credentials:
   - Create `.env.local` from `.env.example`
   - Fill in the variables from your project settings:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Start the dev server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - if you're not authenticated, it'll redirect you to login.

## Project Structure

Uses Feature-Sliced Design for scalability:

```
src/
├── app/                    # Next.js App Router
│   ├── login/             # Login page
│   ├── dashboard/         # Protected page
│   └── globals.css        # CSS variables
├── features/
│   └── auth/              # Authentication feature
│       ├── model/         # Business logic (hooks)
│       └── ui/            # UI components
├── shared/
│   ├── lib/               # Supabase client
│   ├── model/             # Shared types and enums
│   └── ui/                # Reusable components
```

## Under the Hood

### Authentication
- `useAuth` hook tracks user state
- `AuthGuard` component protects routes
- Supabase Auth for backend

### Validation
- Zod schemas with trim/toLowerCase
- Password validation for letters+numbers
- React Hook Form for convenience

### Styling
- CSS variables for theming
- SCSS Modules with camelCase
- clsx for conditional classes

## Creating a Test User

### Ready-to-use test account (**Recommended**):
- **Email:** test@example.com
- **Password:** password123

### Or create your own (Needs credentials for Supabase):
In your Supabase dashboard:
1. Authentication → Users → Add User

## Useful Commands

```bash
npm run dev          # Run with Turbopack
npm run build        # Production build
npm run lint         # ESLint check
```

## License

MIT
