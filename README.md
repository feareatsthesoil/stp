## [stp.world](https://www.stp.world/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Required Environment Variables

##

### Chan Environment Variables

### UPLOADCARE
```
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY
```
```
NEXT_PUBLIC_UPLOADCARE_SECRET_KEY
```

### OPENAI
```
OPEN_API_KEY
```

##

### Membership code
```
ACCESS_MEMBERSHIP_CODE=
```

### Google Cloud keys & email
```
GOOGLE_CLOUD_PRIVATE_KEY=
```
```
GOOGLE_CLOUD_CLIENT_EMAIL=
```
```
GOOGLE_CALENDAR_ID=
```
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

### Clerk keys
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```
```
CLERK_SECRET_KEY=
```

### Stripe keys
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```
```
STRIPE_SECRET_KEY=
```

### Next
```
BACKEND_URL="http://localhost:3000"
```
Used by Nextjs server side renders.

### Database
```
DATABASE_URL=
```
```
SHADOW_DATABASE_URL=
```
The shadow database is used by prisma to diff the current version of database from the schema version 
and create migrations. Not required in production.

### Create .env
```
cp .env.sample .env
```
Create a `.env` file, using `.env.sample` as a template.

See [Environment Variables in Next.js](https://nextjs.org/docs/basic-features/environment-variables)

## Getting Started
First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Build and Start a Local Production Server
```
npm run build
npm start
```

### Export Website to Static Files
```
npm run predeploy
```
Produces the `out/` directory

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Don't forget to [configure your environment variables](https://vercel.com/docs/concepts/projects/environment-variables) for the project in the Vercel dashboard!

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
