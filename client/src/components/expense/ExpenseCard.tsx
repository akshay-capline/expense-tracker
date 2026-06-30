import {
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
  Box,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { type Expense } from "./ExpensTypes";

interface ExpenseCardProps {
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

const ExpenseCard = ({
  expenses,
  onEdit,
  onDelete,
}: ExpenseCardProps) => {
  if (expenses.length === 0) {
    return (
      <Card
        variant="outlined"
        sx={{
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          No expenses yet
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Start by adding your first expense.
        </Typography>
      </Card>
    );
  }

  return (
    <Stack spacing={2}>
      {expenses.map((expense, idx) => (
        <Card
          key={idx}
          variant="outlined"
          sx={{
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Stack spacing={2}>
              <Stack sx={{
                flexDirection : "row", 
                justifyContent: "space-between"
              }}>
                {/* Header */}
              <Box
                sx={{
                    display : "flex", 
                    justifyContent : "center", 
                    alignItems : "center"
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight : 600, 
                    marginRight : "5px"
                  }}
                >
                  {expense.name}
                </Typography>

                <Chip
                  label={expense.category}
                  color={getCategoryColor(expense.category)}
                  size="small"
                  sx={{
                    textTransform: "capitalize",
                  }}
                />
              </Box>

               {/* Actions */}
              <Stack
                sx={{
                    gap : 1, 
                    flexDirection : "row"
                }}
              >
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
              </Stack>
              </Stack>

              <Divider />

              {/* Amount */}
              <Box
                sx={{
                    display : "flex", 
                    justifyContent : "space-between"
                }}
              >
                <Typography color="text.secondary">
                  Amount
                </Typography>

                <Typography sx={{
                    fontWeight : 600
                }}>
                  ₹{expense.amount}
                </Typography>
              </Box>

              {/* Date */}
              <Box
                sx={{
                    display : "flex", 
                    justifyContent :"space-between"
                }}
              >
                <Typography color="text.secondary">
                  Date
                </Typography>

                <Typography>
                  {new Date(expense.expense_date).toLocaleDateString(
                    "en-GB"
                  )}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default ExpenseCard;