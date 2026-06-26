import  { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { Expense } from '../components/expense/ExpensTypes';

interface ExpenseContextType {
  expenses: Expense[];
  setExpenses: Dispatch<SetStateAction<Expense[]>>
}


const ExpenseContext = createContext<ExpenseContextType | null>(null);

interface ExpenseProviderProps {
  children: ReactNode;
}

const ExpenseProvider = ({ children }: ExpenseProviderProps) => {

  const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

const useExpense = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpense must be used inside ExpenseProvider"
    );
  }

  return context;
};

export { ExpenseProvider, useExpense };