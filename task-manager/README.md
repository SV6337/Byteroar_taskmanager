# Task Manager Auth UI + Modular Express Backend

The backend has been restructured into a feature-based `server/src` layout while keeping the React frontend and auth flow intact.

## File Structure

```text
task-manager/
├── package.json                # Workspace-level scripts and shared dependencies
├── README.md                   # Project overview, setup, and structure
├── code/task-manager/
│   ├── package.json            # App-specific dependencies and scripts
│   ├── server.js               # Legacy compatibility entry that forwards to server/src/server.js
│   ├── public/                 # CRA public assets used during development/build
│   │   ├── index.html          # HTML shell for the React app
│   │   ├── manifest.json       # Web app manifest metadata
│   │   └── robots.txt         # Search engine crawling rules
│   ├── build/                  # Production frontend build output
│   │   ├── index.html          # Built HTML entry point
│   │   ├── asset-manifest.json # Generated asset map for the build
│   │   ├── manifest.json       # Generated manifest for the built app
│   │   ├── robots.txt          # Copied crawl rules for production
│   │   └── static/             # Compiled CSS and JavaScript bundles
│   ├── src/                    # React frontend source code
│   │   ├── App.js              # Login/signup screens and route setup
│   │   ├── App.css             # Styling for the auth UI
│   │   ├── App.test.js         # Frontend test placeholder
│   │   ├── index.js            # React DOM entry point
│   │   ├── index.css           # Global styles
│   │   ├── reportWebVitals.js  # Performance reporting helper
│   │   └── setupTests.js       # Jest test setup
│   └── server/                 # Express backend source
│       └── src/
│           ├── app.js          # Express app wiring, middleware, and routes
│           ├── server.js       # Backend runtime entry point and DB startup
│           ├── config/
│           │   └── db.js       # MongoDB connection configuration
│           ├── constants/
│           │   └── roles.js    # Shared role constants for the backend
│           ├── controllers/
│           │   └── authController.js # Auth controller compatibility layer
│           ├── middlewares/
│           │   └── error.middleware.js # 404 and global error handlers
│           ├── models/
│           │   └── User.js     # User model export for compatibility
│           ├── modules/
│           │   ├── auth/
│           │   │   ├── auth.controller.js # Signup/login request handlers
│           │   │   ├── auth.routes.js     # Auth API routes
│           │   │   └── auth.service.js    # User creation and authentication logic
│           │   ├── comment/    # Comment feature placeholder
│           │   ├── issue/      # Issue feature placeholder
│           │   ├── notification/ # Notification feature placeholder
│           │   ├── project/    # Project feature placeholder
│           │   └── user/
│           │       └── user.model.js      # Mongoose user schema
│           ├── routes/
│           │   └── authRoutes.js # Auth route registration
│           ├── services/
│           │   └── authService.js # Auth service compatibility layer
│           └── utils/
│               └── asyncHandler.js # Promise wrapper for async route handlers
```

The backend uses a feature-based structure under `server/src`, while the React app lives in `src` and handles the login/sign-up UI.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
copy .env.example .env
```

3. Update `.env` if needed:

```env
SERVER_PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/byteroar
```

## Run

Start both frontend and backend:

```bash
npm run dev
```

Frontend runs on `http://localhost:3000` and backend on `http://localhost:5000`.

## API

### Health

`GET /api/health`

### Signup

`POST /api/auth/signup`

Request body:

```json
{
	"name": "Jane Doe",
	"email": "jane@example.com",
	"password": "secret123"
}
```

### Login

`POST /api/auth/login`

Request body:

```json
{
	"email": "jane@example.com",
	"password": "secret123"
}
```
