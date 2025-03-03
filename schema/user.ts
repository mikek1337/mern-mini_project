import mongoose from "mongoose";
interface IUser{
    username: string;
    password: string;
    role: IRole;
}

interface IRole{
    role: string;
    permissions: string[];
}

const Role = new mongoose.Schema<IRole>({
    role: { type: String, required: true },
    permissions: { type: [String], required: true }
});

const User = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Role, required: true }
});
