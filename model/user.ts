import mongoose from "mongoose";
import { User } from "../schema/user";

export const UserModel = mongoose.model("User", User);