import { pool } from "../db";

export const addExpenseRepo = async (
  name: string,
  amount: number,
  category: string,
  date: string,
  userId: number
) => {
  const query = ` INSERT INTO expenses (name, amount, category, expense_date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING
    id,
    name,
    amount,
    category,
    expense_date AS date,
    user_id`;

  const result = await pool.query(query, [
    name,
    amount,
    category,
    date,
    userId,
  ]);

  return result.rows[0];
};


export const updateExpenseRepo = async (
  name: string,
  amount: number,
  category: string,
  date: string,
  userId: number, 
  id: number, 
) => {
  const query = `
    UPDATE expenses
    SET
      name = $1,
      amount = $2,
      category = $3,
      expense_date = $4
    WHERE id = $5
    AND user_id = $6
    RETURNING
      id,
      name,
      amount,
      category,
      expense_date AS date,
      user_id
  `;

   const result = await pool.query(query, [
    name,
    amount,
    category,
    date,
    id,
    userId,
  ]);

  return result.rows[0];
};




export const getAllExpensesRepo = async (
  userId: number
) => {
   const query = `
    SELECT
    id,
    name,
    amount,
    category,
    expense_date AS date,
    user_id
    FROM expenses
    WHERE user_id = $1
    ORDER BY expense_date DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
};




export const deleteExpenseRepo = async (
  expenseId : number, 
  userId: number
) => {
   const query = `
    DELETE FROM expenses
    WHERE id = $1
    AND user_id = $2
    RETURNING *
  `;

  const result = await pool.query(query, [expenseId, userId]);

  return result.rows;
};