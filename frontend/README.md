# Talent-IQ

Talent-IQ is a full-stack web application built with React, Node.js, and MongoDB.

## Project URLs

### Frontend
- **Hosted URL**: https://talent-iq-rose.vercel.app
- **Local Development**: http://localhost:5173

### Backend
- **Hosted API**: https://talent-iq-1-9t0n.onrender.com
- **Local Development**: http://localhost:3000

### Database
- **MongoDB Atlas**: mongodb+srv://naman:wbSdSUwNeJIBgqsa@cluster0.jogmaxt.mongodb.net/

## Authentication Endpoints

- **Login**: `/auth/login`
- **Register**: `/auth/signup`
- **Refresh Token**: `/auth/refresh-token`
- **Logout**: `/auth/logout`
- **Logout All Devices**: `/auth/logout-all`

## Available Scripts

### Root Directory
- `npm run build` - Install dependencies for both frontend and backend, then build the frontend
- `npm run start` - Start the backend server

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run preview` - Preview the production build

### Backend
- `npm run dev` - Start the development server with nodemon
- `npm run start` - Start the production server

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

### Backend (.env)
- `PORT` - Server port
- `DB_URL` - MongoDB connection string
- `JWT_SECRET` - Secret for access tokens
- `JWT_SECRET_REFRESH` - Secret for refresh tokens
- `JWT_EXPIRE` - Access token expiration time
- `JWT_REFRESH_EXPIRE` - Refresh token expiration time
- `NODE_ENV` - Environment (production/development)
- `CLIENT_URL` - Frontend URL for CORS

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel (Frontend), Render (Backend)

## Features

- User authentication (login/register)
- JWT-based session management
- Refresh token implementation
- Protected routes
- Responsive UI with Tailwind CSS