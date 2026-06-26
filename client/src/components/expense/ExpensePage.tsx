import { useEffect, useState } from "react";
import axios from "axios";

import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import ExpenseCard from "./ExpenseCard";

import {
  ExpenseContainer,
  ExpenseContent,
  ExpenseCard as StyledCard,
  SectionTitle,
} from "./styles";

import { type Expense, type ExpenseFormData } from "./ExpensTypes";
import { USER_ID } from "../../config/localStorageKeys";
import { API_URL } from "../../config/api";
import Navbar from "../Navbar";
import { useExpense } from "../../context/ExpenseContext";

const ExpensePage = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // const [expenses, setExpenses] = useState<Expense[]>([]);

  const { expenses, setExpenses } = useExpense();

  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ExpenseFormData>({
    name: "",
    amount: 0,
    category: "other",
    date: "",
  });

  const fetchExpenses = async () => {
    try {
      const userId = localStorage.getItem(USER_ID);

      const res = await axios.get(`${API_URL}/api/expense/${userId}`);

      setExpenses(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem(USER_ID);

      const inputData = {
        ...formData,
        user_id: userId,
      };

      if (editId) {
        const res = await axios.put(
          `${API_URL}/api/expense/${editId}`,
          inputData,
        );

        setExpenses((prev) =>
          prev.map((expense) =>
            expense.id === editId ? res.data.data : expense,
          ),
        );
      } else {
        const res = await axios.post(`${API_URL}/api/expense/add`, inputData);

        setExpenses((prev) => [...prev, res.data.data]);
      }

      setFormData({
        name: "",
        amount: 0,
        category: "other",
        date: "",
      });

      setEditId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const userId = localStorage.getItem(USER_ID);

      await axios.delete(`${API_URL}/api/expense/${id}?userId=${userId}`);

      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditId(expense.id);

    setFormData({
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
      date: expense.date.split("T")[0],
    });
  };
  return (
    <>
      <Navbar/>
      <ExpenseContainer>
        <ExpenseContent>
          <Stack spacing={4}>
            <StyledCard>
              <SectionTitle>Add Expense</SectionTitle>

              <ExpenseForm
                formData={formData}
                setFormData={setFormData}
                editId={editId}
                onSubmit={handleSubmit}
              />
            </StyledCard>

            <StyledCard>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Expense History
              </Typography>

              {isMobile ? (
                <ExpenseCard
                  expenses={expenses}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ) : (
                <ExpenseTable
                  expenses={expenses}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </StyledCard>
          </Stack>
        </ExpenseContent>
      </ExpenseContainer>
    </>
  );
};

export default ExpensePage;
