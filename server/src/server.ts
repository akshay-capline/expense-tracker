import express from 'express';
import { PORT } from './config/env.js';
import connectDB from './db.js';
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";


import path from "path";
import { fileURLToPath } from "url";


const app = express();

app.use(cors({
    origin : "http://localhost:5173"
}))
app.use(express.json());

const port = PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientPath = path.join(__dirname, "../client-build");
console.log("clientPath", clientPath);



// app.get('/', (req, res) => {
//   res.send('Dev started');
// });

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

app.use(express.static(clientPath));

app.use((req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});



connectDB();


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});