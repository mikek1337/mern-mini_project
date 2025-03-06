import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
export const checkRole = (role:string[])=>(request:Request, response:Response, next:NextFunction)=>{
    if(request.cookies?.token){
        const token = request.cookies.token;
        const tokenData = jwt.verify(token, process.env.JWT_SECRET!);
        if(typeof tokenData !== "string"){
            const hasRole = role.includes(tokenData.role.role);
            if(hasRole){
                next();
                return;
            }
        }
        response.status(403).json({message:'Access denied. Insufficient permission'});
        return
    }
    response.status(401).json({message:'unauthorized'});
    return;

}