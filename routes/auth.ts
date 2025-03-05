import { Response, Request } from "express";
import { IUser } from "../schema/user";
import { UserModel } from "../model/user";
import {compareSync, hashSync} from 'bcryptjs';
import jwt from "jsonwebtoken";
export const signup = async (request: Request, response: Response)=>{
    const {username, password, role}:IUser = request.body;
    const user = await UserModel.findOne({username});
    if(user){
         response.status(400).json({message: "User already exists"});
    }
    const newUser = new UserModel({
        username,
        password: hashSync(password, 10),
        role
    });
    const savedUser =  await newUser.save();
    if(savedUser){
        const token = await jwt.sign({id: newUser._id, username: newUser.username, role: newUser.role}, process.env.JWT_SECRET!)
         response.status(201).json({token}).cookie('token', token, {httpOnly: true}).send();
    }
    
    
}

export const login = async (request: Request, response: Response)=>{
    const {username, password}:IUser = await request.body;
    const user = await UserModel.findOne({
        username
    })
    if(!user){
        response.status(400).json({message: "User does not exist"});
        return;
    }
    const isValid = await compareSync(user.password, password);

    if(!isValid){
        response.status(400).json({message: "Invalid password"});
    }
    const token = await jwt.sign({id: user._id, username: user.username, role: user.role}, process.env.JWT_SECRET!)
    response.status(200).json({token}).cookie('token', token, {httpOnly: true}).send();

}

export const logout = async (request: Request, response: Response)=>{
    response.status(200).clearCookie('token').send();
}