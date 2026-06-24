import { Pool } from "pg";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config/env";


export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT ? Number(DB_PORT) : 5432,
});


const  connectDB = async () =>  {
  try {
    const client = await pool.connect();

    console.log("postgres connected");

    client.release();
  } catch (err) {
    console.error("connection failed", err);
    process.exit(1);
  }
}

export default connectDB;