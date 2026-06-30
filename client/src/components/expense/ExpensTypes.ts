export type Category =
  | "food"
  | "travel"
  | "health"
  | "other";

export interface Expense {
  id: number;
  name: string;
  amount: number;
  category: Category;
  expense_date: string;
}

export interface ExpenseFormData {
  name: string;
  amount: number;
  category: Category;
  expense_date : string;
}