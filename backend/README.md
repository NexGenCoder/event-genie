# Whisperverse Backend

Welcome to the Whisperverse Backend! This server-side component is responsible for managing user authentication, secrets posting, and other backend functionalities for the Whisperverse application.

## Overview

The Whisperverse backend is built using Express.js and Node.js, providing a robust and secure foundation for the Whisperverse application. It uses MongoDB as its database, JWT for authentication, and Passport for Google OAuth 2.0 integration.

## Cloning

To clone the backend repository, use the following command:

```bash
git clone https://github.com/sahsisunny/form-flows.git
cd form-flows/backend
```

## Setup

1. Install dependencies:

```bash
yarn
```

2. Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=3001
MONGODB_URI="mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name?retryWrites=true&w=majority"
JWT_SECRET_KEY="your_jwt_secret_key"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_CALLBACK_URL="http://localhost:3001/auth/google/callback"
CORS_ORIGIN="http://localhost:3000"
SESSION_SECRET="your_session_secret_key"
CLIENT_URL="http://localhost:3000"
```

Ensure to replace the placeholder values with your actual MongoDB connection string, JWT secret key, Google OAuth client ID, and client secret.

3. Run the backend server:

```bash
yarn start
```

The backend server will start on `http://localhost:3001`.

### Environment Variables

- **PORT**: The port on which the backend server will run.
- **MONGODB_URI**: The connection string for your MongoDB database.
- **JWT_SECRET_KEY**: A secret key for JWT token generation.
- **GOOGLE_CLIENT_ID**: Your Google OAuth client ID.
- **GOOGLE_CLIENT_SECRET**: Your Google OAuth client secret.
- **GOOGLE_CALLBACK_URL**: The callback URL for Google OAuth.
- **CORS_ORIGIN**: The origin URL for CORS.
- **SESSION_SECRET**: A secret key for session generation.
- **CLIENT_URL**: The URL for the frontend client.

Make sure to keep your `.env` file secure and do not share it publicly.

Now, the Whisperverse Backend is up and running, ready to support the Whisperverse application. For frontend setup and usage, please refer to the `client` folder's README.md.
