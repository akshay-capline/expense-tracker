import express from 'express';
import { PORT } from './config/env.js';
import connectDB from './db.js';
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";

const app = express();

app.use(cors({
    origin : "http://localhost:5173"
}))
app.use(express.json());

const port = PORT || 3001;

app.get('/', (req, res) => {
  res.send('Dev started');
});

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

connectDB();


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});