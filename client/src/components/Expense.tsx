import axios from "axios";
import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { USER_ID } from "../config/localStorageKeys";
import Navbar from "./Navbar";

type Category = "food" | "travel" | "health" | "other";

interface FormData {
  name: string;
  amount: number;
  category: Category;
  date: string;
}

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: Category;
  date: string;
}

const Expense = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    amount: 0,
    category: "other",
    date: "",
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editId, setEditId] = useState<Number | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("formData", formData);

      const userID = localStorage.getItem(USER_ID);
      const inputData = { ...formData, user_id: userID };

      console.log("input data", inputData);



      if(editId) {
        const res = await axios.put(
        `http://localhost:3000/api/expense/${editId}`,
        inputData,
      );
      
      const data = res.data.data;
      setExpenses((prev) => prev.map((e) => e.id === data.id ? data : e));
      }else {
        
      const res = await axios.post(
        "http://localhost:3000/api/expense/add",
        inputData,
      );

      setExpenses((prev) => [...prev, res?.data.data]);
      }

      
      
      
    } catch (error) {
      console.error("error:", error);
    }finally{
      setFormData({
        name: "",
        amount: 0,
        category: "other",
        date: "",
      });
      setEditId(null);
    }
  };

  const fetchExpenses = async () => {
    try {
      const userId = localStorage.getItem(USER_ID);

      const res = await axios.get(
        `http://localhost:3000/api/expense/${userId}`,
      );
      const data = res.data.data;
      console.log("data", data);
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const deleteExpense = async (id: number) => {
    try {
      const userId = localStorage.getItem(USER_ID);
      await axios.delete(
        `http://localhost:3000/api/expense/${id}?userId=${userId}`,
      );
      fetchExpenses();
    } catch (err) {
      console.log("err", err);
    }
  };

  const updateFormData = (expenseData: Expense) => {
    setFormData({
      name: expenseData.name,
      amount: expenseData.amount,
      category: expenseData.category,
      date: expenseData.date.split("T")[0], 
    });
    setEditId(expenseData.id);
  };

  return (
    <>
    <Navbar />
    <div className="flex min-h-full sm:mx-auto sm:w-full sm:max-w-5xl flex-col justify-center px-6 py-2 lg:px-8">
      <div className="mt-10 w-full  bg-gray-200 rounded-md p-2 ">
        <form
          onSubmit={handleSubmit}
          className="h-12.5 text-black flex flex-wrap justify-around items-center"
        >
          <div>
            <input
              id="name"
              value={formData.name}
              type="text"
              name="name"
              required
              className="block w-full rounded-md border border-black bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500  sm:text-sm/6"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <input
              id="name"
              value={formData.amount}
              type="text"
              name="amount"
              required
              className="block w-full rounded-md border border-black bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value as Category,
                }))
              }
              className="block w-full rounded-md border border-black bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 sm:text-sm/6"
            >
              <option value="food">food</option>
              <option value="travel">travel</option>
              <option value="health">health</option>
              <option value="other">other</option>
            </select>
          </div>
          <div>
            <input
              id="name"
              value={formData.date}
              type="date"
              name="date"
              required
              className="block w-full rounded-md border border-black bg-white/5 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500  sm:text-sm/6"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm/6 font-semibold text-black  hover:bg-gray-400  cursor-pointer"
            >
              {editId ? "Update Expense" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 w-full overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-400 text-center">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Update</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{expense.name}</td>

                  <td className="border px-4 py-2">₹{expense.amount}</td>

                  <td className="border px-4 py-2 capitalize">
                    {expense.category}
                  </td>

                  <td className="border px-4 py-2">
                    {new Date(expense.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border border-black">
                    <button
                      className="w-full h-full  flex justify-center items-center"
                      onClick={() => updateFormData(expense)}
                    >
                      <FaPen
                        size={18}
                        fill="yellow"
                        className="cursor-pointer"
                      />
                    </button>
                  </td>
                  <td className="border  border-black">
                    <button
                      className="w-full h-full flex justify-center items-center"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      {" "}
                      <FaTrash
                        size={18}
                        fill="red"
                        opacity={0.5}
                        className="cursor-pointer"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="border px-4 py-4 text-center">
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Expense;
