import { Response, Request } from "express";
import { IUser } from "../schema/user";
import { UserModel } from "../model/user";

export const signup = async (request: Request, response: Response)=>{
    const {username, password, role}:IUser = request.body;

    const user = new UserModel({username, password, role});
    
}