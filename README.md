# Talent IQ

A collaborative coding platform for real-time pair programming and technical interviews.

## Overview

Talent IQ is a modern web application that enables developers to collaborate on coding problems in real-time. It provides a shared coding environment with video conferencing and chat capabilities, making it ideal for technical interviews, pair programming, and collaborative learning.

## Features

- **Real-time Code Collaboration**: Write and execute code together with your partner
- **Video Conferencing**: Built-in video calling powered by Stream Video
- **Live Chat**: Real-time messaging during sessions
- **Multi-language Support**: Code in JavaScript, Python, and Java
- **Problem Library**: Access to curated coding problems with varying difficulties
- **Session Management**: Create and join coding sessions with up to 2 participants
- **Code Execution**: Run and test code with instant feedback

## Technology Stack

### Frontend
- React with Vite
- TailwindCSS with DaisyUI for styling
- Monaco Editor for code editing
- Stream Video and Chat SDKs
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB for data storage
- JWT for authentication
- Stream API for video and chat services
- Piston API for code execution

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance
- Stream API keys
- Clerk account for authentication

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
- Copy `.env.example` to `.env` in both frontend and backend directories
- Fill in the required API keys and configuration values

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

## Project Structure

```
talent-iq/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── lib/            # Utility functions
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── api/             # API service functions
│   │   └── lib/            # Utility functions
│   └── ...
└── ...
```

## Authentication

Talent IQ uses JWT-based authentication. Users can register and log in to create accounts. Session tokens are used to authenticate API requests and generate Stream tokens for video/chat services.

## Code Execution

The platform uses the Piston API to execute code in isolated environments. Supported languages include:
- JavaScript
- Python
- Java

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or inquiries, please contact the development team.