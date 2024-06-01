# Event Genie Backend Setup

Event Genie is a platform that helps you find and create events that you'll love. Discover events tailored to your interests, connect with like-minded individuals, and create memorable experiences.

## Tech Stack

-  **Node.js**
-  **Express**
-  **TypeScript**
-  **PostgreSQL**
-  **Socket.io**

## Prerequisites

Make sure you have the following installed:

-  [Node.js](https://nodejs.org/)
-  [PostgreSQL](https://www.postgresql.org/)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/NexGenCoder/event-genie-backend
   cd event-genie-backend
   ```

2. **Install dependencies**

   ```bash
   yarn
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory of your project and add the following environment variables:

   ```env
   PORT=<port_number>(default: 3001)

   DB_USER=<your_postgres_username>
   DB_HOST=<your_postgres_host>(default: 127.0.0.1)
   DB_NAME=<your_postgres_database>
   DB_PASSWORD=<your_postgres_password>
   DB_PORT=<your_postgres_port>(default: 5432)

   # GOOGLE AUTH
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   GOOGLE_CALLBACK_URL=http://<your_backend_url>/auth/google/callback

   CORS_ORIGIN=<your_frontend_url>
   SESSION_SECRET=<your_session_secret>
   JWT_SECRET_KEY=<your_jwt_secret_key>
   CLIENT_URL=<your_frontend_url>

   CLEAN_DB_PASSWORD=<your_clean_db_password>
   SEED_DB_PASSWORD=<your_seed_db_password>
   ```

   **Note:** Ensure there are no spaces around the `=` sign in the `.env` file.

4. **Run the PostgreSQL server**

   Make sure your PostgreSQL server is running. You can use the following command to start PostgreSQL:

   ```bash
   sudo service postgresql start
   ```

5. **Create the database**

   Connect to PostgreSQL and create the database:

   ```sql
   CREATE DATABASE <your_postgres_database_name>;
   ```

6. **Run database migrations**

   Migration is run automatically when the server is started.

7. **Start the server**

   ```bash
   yarn start
   ```

   The server should now be running on [http://localhost:3001](http://localhost:3001).

## Contact

If you have any questions or feedback, please reach out to us at @sahsisunny.
