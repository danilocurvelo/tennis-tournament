# Tennis Tournament App

This project contains the initial Prisma setup for modeling a knockout tennis tournament in the ATP Masters 1000 format.

## Setup

1. Install dependencies (requires access to npm registry):
   ```bash
   npm install prisma @prisma/client
   ```
2. Run the migrations to create the database:
   ```bash
   npx prisma migrate deploy
   ```
   The default database is SQLite using the connection string defined in `.env`.

## Prisma Models

The Prisma schema defines the following entities:

- **Player** – individual competitors.
- **Tournament** – tournament information such as location and dates.
- **Match** – links players to a tournament round and stores results.

Migrations are located in `prisma/migrations`.
