import { addExpenseRepo, deleteExpenseRepo, getAllExpensesRepo, updateExpenseRepo } from "../respositories/expense.repository";
import { errorResponse, successResponse } from "../utils/apiResponse";
import type { Request, Response } from "express";



export const addExpense = async (req : Request, res: Response) => {
    try {

        const { category, name,  amount, date, user_id} = req.body;
        if(!category || !name || !amount || !date || !user_id) return errorResponse(res, 400, 'missing fields');

        const data = await addExpenseRepo(name, amount, category, date, user_id);
        if(!data) return errorResponse(res, 400, 'unable to add expense');

        return successResponse(res, 201, 'expense created successfully', data);

    }catch(err){
        console.log("err", err);
        return errorResponse(res, 500, "server error");
    }
}


export const getAllExpenses = async (req : Request, res : Response) => {
    try {
        const { id } = req.params;
        
        console.log("id", id);
        
        const data = await getAllExpensesRepo(Number(id));
        
        if(!data) return errorResponse(res, 400, 'unable to get expenses');

        return successResponse(res, 201, 'expenses fetched successfully', data);

    }catch(err){
        console.log("err", err);
        return errorResponse(res, 500, "server error");
    }
}



export const deleteExpense = async (req : Request, res : Response) => {
    try {
        //expense id
        const { id } = req.params;

        //user id
        const { userId } = req.query;
        
        console.log("id", id, userId);
        
        const data = await deleteExpenseRepo(Number(id), Number(userId));
        
        if(!data) return errorResponse(res, 400, 'unable to get expenses');

        return successResponse(res, 201, 'expense deleted successfully', data);

    }catch(err){
        console.log("err", err);
        return errorResponse(res, 500, "server error");
    }
}



export const updateExpense = async (req : Request, res: Response) => {
    try {

        const { id } = req.params;
        const { category, name,  amount, date, user_id} = req.body;

        console.log("params", id);
        
        if(!category || !name || !amount || !date || !user_id || !id) return errorResponse(res, 400, 'missing fields');

        const data = await updateExpenseRepo(name, amount, category, date, user_id, Number(id));
        if(!data) return errorResponse(res, 400, 'unable to update expense');

        return successResponse(res, 201, 'expense updated successfully', data);

    }catch(err){
        console.log("err", err);
        return errorResponse(res, 500, "server error");
    }
}