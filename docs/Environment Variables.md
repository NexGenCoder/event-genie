## Environment Variables

The application uses several environment variables for configuration. These variables are typically stored in a `.env` file at the root of the project. Below is a list of environment variables and their descriptions:

### Server Configuration

- `PORT`: The port on which the server should listen. Default is `3001`.

### Database Configuration

- `DB_HOST`: The database host address.
- `DB_USER`: The username for database access.
- `DB_PASSWORD`: The password for database access.
- `DB_DATABASE`: The name of the database.

### Authentication Configuration

- `JWT_SECRET_KEY`: Secret key for JWT (JSON Web Tokens) authentication.

### Google OAuth Configuration

- `GOOGLE_CLIENT_ID`: Client ID for Google OAuth.
- `GOOGLE_CLIENT_SECRET`: Client secret for Google OAuth.
- `GOOGLE_CALLBACK_URL`: Callback URL for Google OAuth.

### CORS and Session Configuration

- `CORS_ORIGIN`: Allowed origin for CORS (Cross-Origin Resource Sharing).
- `SESSION_SECRET`: Secret key for session management.
- `CLIENT_URL`: URL of the client application.
