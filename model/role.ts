import mongoose from "mongoose";
import { Role } from "../schema/user";

export const RoleModel = mongoose.model("Role", Role);

