import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { type Expense } from "./ExpensTypes";

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "food":
      return "success";

    case "travel":
      return "primary";

    case "health":
      return "warning";

    default:
      return "default";
  }
};

const ExpenseTable = ({
  expenses,
  onEdit,
  onDelete,
}: ExpenseTableProps) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>

            <TableCell align="right">
              <strong>Amount</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Category</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Date</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                align="center"
                sx={{ py: 5 }}
              >
                <Typography color="text.secondary">
                  No expenses found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense, idx) => (
              <TableRow
                hover
                key={idx}
              >
                <TableCell>
                  <Typography  sx={{
                    fontWeight: 500
                  }}>
                    {expense.name}
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  ₹{expense.amount}
                </TableCell>

                <TableCell align="center">
                  <Chip
                    size="small"
                    label={expense.category}
                    color={getCategoryColor(expense.category)}
                    sx={{
                      textTransform: "capitalize",
                      minWidth: 80,
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  {new Date(expense.expense_date).toLocaleDateString("en-GB")}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(expense)}
                  >
                    <EditRoundedIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onDelete(expense.id)}
                  >
                    <DeleteRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;