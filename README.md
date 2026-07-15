# WorkDock

WorkDock is a modern workspace marketplace built for discovering, listing, and booking flexible workspaces. The platform connects hosts who want to monetize spaces with members who need productive environments for focus sessions, collaboration, and remote work.

This repository contains the full monorepo for the product:

- `work-dock/` — Next.js 16 frontend application
- `wd-server/` — Express + MongoDB backend API

## Project Overview

WorkDock combines a polished customer-facing marketplace with a secure dashboard experience for authenticated users. Core flows include:

- Browse and search for workspaces by category and location
- View featured listings and workspace details
- Host a space and manage business-facing listing information
- Manage profile, role, and plan preferences in the dashboard
- Submit and process booking-related operations through the API layer

## Tech Stack

### Frontend
- Next.js 16.2.10
- React 19
- TypeScript
- Tailwind CSS
- Better Auth
- Lucide React
- Cloudinary integration for image handling
- Next Themes for dark/light mode support

### Backend
- Express 5
- MongoDB Atlas / MongoDB driver
- Express rate limiting and CORS support
- REST-style API routes for workspace and booking operations

### Runtime and Deployment
- Vercel for the frontend production deployment
- Local development on `http://localhost:3000`
- Express API on `http://localhost:5000`

## Architecture

The application uses a clean client/server split:

1. The `work-dock` app handles rendering, authentication, dashboard UI, and client-side interactions.
2. The `wd-server` app exposes the workspace and booking APIs used by the frontend.
3. Better Auth is configured with MongoDB-backed persistence and custom user fields such as `role`, `plan`, and `profileImage`.

## Features

- Responsive landing pages and marketing sections
- Workspace discovery and listing experience
- Host onboarding and dashboard workflows
- Better Auth email/password authentication
- Custom user profile management
- Secure server action and API mutation process
- Cloudinary-powered image upload workflow
- Dark mode and modern UI styling

## Monorepo Structure

```text
work-dock/
  src/
    app/
    components/
    lib/
    types/

wd-server/
  controllers/
  routes/
  config/
  index.ts
```

## Local Development

### 1) Install frontend dependencies

```bash
cd work-dock
npm install
npm run dev
```

Frontend will run at:

```text
http://localhost:3000
```

### 2) Install backend dependencies

```bash
cd ../wd-server
npm install
npm run dev
```

Backend will run at:

```text
http://localhost:5000
```

## Environment Configuration

The frontend and backend rely on environment variables.

### Frontend `.env`

Typical variables include:

```env
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_BASE=http://localhost:3000
DB_URI=your_mongodb_connection_string
DB_NAME=workdock
SERVER_BASE=http://localhost:5000
```

### Backend `.env`

Typical variables include:

```env
MONGO_URI=your_mongodb_connection_string
DB_NAME=workdock
PORT=5000
CLIENT_URL=http://localhost:3000
WORKSPACE_COLLECTION=workspace
BOOKING_COLLECTION=booking
USER_COLLECTION=user
```

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
```

### Backend

```bash
npm run dev
npm run start
```

## Production

The frontend is deployed on Vercel and is publicly accessible through the production domain configured for this repository.

## Notes

- The application is designed as a Next.js App Router project with server-side data access and action-based mutations.
- Better Auth is used for session management and authentication.
- The server-side Express API currently handles workspace and booking operations, with user profile update flows wired through the same monorepo setup.

## License

This project is currently maintained for development and internal product work. Update this section if you need to publish the repository under a specific open-source or commercial license.

## Contributing

Pull requests and feature improvements are welcome. If you are contributing, keep the frontend and backend contracts aligned when modifying any profile, booking, or workspace APIs.
