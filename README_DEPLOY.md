# Deployment to Vercel + MongoDB Atlas

## Overview
This backend is now prepared to be deployed on Vercel using Serverless Functions. The `/api` folder contains a serverless wrapper that exports your Express app.

## Required environment variables (set in Vercel dashboard)
- `MONGO_URL` — full Atlas connection string (include DB name; replace <password> placeholder with your DB user's password)
- `SECRET_OTP` — secret used by `/reset` route
- `SALT` — number used by bcrypt hash (e.g. `10`)

Optional: any other secret values your app uses.

## Steps to deploy the Backend to Vercel
1. Commit & push these changes to your git repository.
2. Go to https://vercel.com and import the repository (select the Backend folder as the project root).
3. In Vercel project settings, set the Environment Variables listed above (Production and Preview as needed).
4. Vercel will detect the project and build; functions will live under `/api/*` endpoints.

Notes:
- The Express app is exported from `app.js` and the serverless handler is `api/index.js`.
- Ensure your frontend points to the Vercel backend URL (e.g. `https://your-backend.vercel.app/api/profile`)

## MongoDB Atlas quick setup
1. Create an Atlas cluster at https://cloud.mongodb.com/ (free tier available).
2. Create a database user and note the username/password.
3. Network Access: add your IP or allow access from anywhere (0.0.0.0/0) for testing.
4. Get the connection string and replace `<password>` and `<dbname>`.
5. Set the connection string value as `MONGO_URL` in Vercel (include `mongodb+srv://...`)

## Frontend notes
- Deploy each frontend folder (e.g., `FrontEnd/CMS` and/or `FrontEnd/Portfolio`) as separate Vercel projects.
- For Vite frontends (this project), set an environment variable named `VITE_API_URL` in Vercel to your backend API base URL (example: `https://your-backend.vercel.app/api`). The frontend falls back to `http://localhost:3000` for local dev if the env var is not set.

## Testing
- After deployment and env setup, hit a simple endpoint: `GET https://<your-backend>.vercel.app/api/skill` (or other route) to confirm.

---
If you'd like, I can prepare the frontend environment config next (set API base URL) and give exact commands for building the frontends so they deploy cleanly on Vercel.