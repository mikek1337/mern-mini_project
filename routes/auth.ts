import { IUser } from "../schema/user";
import type{ Response, Request } from "express";
import { UserModel } from "../model/user";
import {compareSync, hashSync} from 'bcryptjs';
import * as jwt from "jsonwebtoken";
export const signup = async (request: Request, response: Response)=>{
    const {username, password, role}:IUser = request.body;
    const user = await UserModel.findOne({username});
    if(user){
         response.status(400).json({message: "User already exists"});
         return;
    }
    const newUser = new UserModel({
        username,
        password: hashSync(password, 10),
        role:{
            role,
            permissions: []
        }
    });
    const savedUser =  await newUser.save();
    if(savedUser){
        const token = await jwt.sign({id: newUser._id, username: newUser.username, role: newUser.role}, process.env.JWT_SECRET!)
        response.cookie('token', token, {httpOnly: true});
         response.status(201).json({token});
    }
    
    
}

export const login = async (request: Request, response: Response)=>{
    const {username, password}:IUser = await request.body;
    const user = await UserModel.findOne({
        username
    })
    if(!user){
        response.status(400).json({message: "Incorrect username or password"});
        return;
    }
    const isValid = await compareSync(password, user.password);

    if(!isValid){
        response.status(400).json({message: "Incorrect username or password1"});
        return;
    }
    const token = await jwt.sign({id: user._id, username: user.username, role: user.role}, process.env.JWT_SECRET!)
    response.cookie('token', token, {httpOnly: true});
    response.status(200).json({token});

}

export const logout = async (request: Request, response: Response)=>{
    response.status(200).clearCookie('token').send();
}