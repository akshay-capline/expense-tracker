import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import {type   ExpenseFormData, type  Category } from "./ExpensTypes";

interface ExpenseFormProps {
  formData: ExpenseFormData;
  editId: number | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<ExpenseFormData>>;
}

const ExpenseForm = ({
  formData,
  editId,
  onSubmit,
  setFormData,
}: ExpenseFormProps) => {
  return (
    <Stack
      component="form"
      spacing={3}
      onSubmit={onSubmit}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            label="Expense Name"
            placeholder="Lunch"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            label="Amount"
            type="number"
            value={formData.amount || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                amount: Number(e.target.value),
              }))
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>

            <Select
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value as Category,
                }))
              }
            >
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="travel">Travel</MenuItem>
              <MenuItem value="health">Health</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            type="date"
            label="Date"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            value={formData.date}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        size="large"
      >
        {editId ? "Update Expense" : "Add Expense"}
      </Button>
    </Stack>
  );
};

export default ExpenseForm;