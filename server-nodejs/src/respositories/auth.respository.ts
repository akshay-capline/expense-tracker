import { pool } from "../db.js";

export const createUserRepo = async (
  name: string,
  email: string,
  password: string,
) => {

  const query = `INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING user_id, name, email, created_at`;

  const result = await pool.query(query, [name, email, password]);
  console.log("result", result);

  return result.rows[0];

};



export const getuserByEmailRepo = async (email : string) => {
    const query = `
    SELECT
      user_id,
      name,
      email,
      password
    FROM users
    WHERE email = $1
  `;

  const result = await pool.query(
    query,
    [email]
  );

  return result.rows[0];
}