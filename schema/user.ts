import mongoose from "mongoose";

export interface IUser{
    profilePic:string;
    username: string;
    password: string;
    role: IRole;
}

export interface IRole{
    role: string;
    permissions: string[];
}

export const Role = new mongoose.Schema<IRole>({
    role: { type: String, required: true },
    permissions: { type: [String], required: true }
});

export const User = new mongoose.Schema<IUser>({
    profilePic:{type:String, required:true, default:'https://robohash.org/user'},
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Role, required: true }
});
