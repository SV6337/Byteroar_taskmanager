# Task Manager Auth UI + MongoDB Backend

This project now includes:

- Login page UI matching your provided design.
- Sign Up page with the same visual style.
- Express backend with MongoDB integration.
- Signup API: `POST /api/auth/signup`.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
copy .env.example .env
```

3. Update `.env` with your MongoDB connection string:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task_manager
```

## Run

Open two terminals in the project folder.

1. Start backend:

```bash
npm run server
```

2. Start frontend:

```bash
npm start
```

Frontend runs on `http://localhost:3000` and backend on `http://localhost:5000`.

## API

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

Success response:

```json
{
	"message": "Signup successful."
}
```
