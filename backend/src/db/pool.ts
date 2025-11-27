import { Pool } from "pg";

// Default to empty string if not set, handling the case where pg might try to connect to localhost by default
const connectionString = process.env.DATABASE_URL || "";

export const pool = connectionString
  ? new Pool({ connectionString })
  : null;

if (!pool) {
    console.log("No DATABASE_URL provided. Running in in-memory mode.");
} else {
    console.log("Connecting to Postgres database...");
}
