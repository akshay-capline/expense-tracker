import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import {
  createUserRepo,
  getuserByEmailRepo,
} from "../respositories/auth.respository.js";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password)
      return errorResponse(res, 400, "missing fields");

    console.log("email", email);
    console.log("name", name);
    console.log("password", password);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUserRepo(name, email, hashedPassword);

    if (!user) return errorResponse(res, 400, "unable to create user");

    return successResponse(res, 201, "user created successfully", user);
  } catch (err) {
    console.log("err", err);
    return errorResponse(res, 500, "server error");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return errorResponse(res, 400, "missing fields");

    const user = await getuserByEmailRepo(email);
    if (!user) return errorResponse(res, 401, "user not available");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return errorResponse(res, 401, "invalid credentials");

    return successResponse(res, 200, "login successfull", {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
    });

  } catch (err) {
    console.log("err", err);
    return errorResponse(res, 500, "server error");
  }
};
