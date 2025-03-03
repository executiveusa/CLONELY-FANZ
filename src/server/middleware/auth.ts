import { Request, Response, NextFunction } from "express";
import { supabase } from "../index";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token provided");

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error) throw error;
    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
