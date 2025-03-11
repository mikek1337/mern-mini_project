import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
export const checkRole = (role:string[])=>(request:Request, response:Response, next:NextFunction)=>{
        const token = request.headers.authorization?.split(' ')[1];
        if(token === undefined){
            response.status(401).json({message:'unauthorized'});
            return;
        }
        const tokenData = jwt.verify(token, process.env.JWT_SECRET!);
        if(typeof tokenData !== "string"){
            const hasRole = role.includes(tokenData.role.role);
            if(hasRole){
                response.locals.user = tokenData;
                next();
                return;
            }
            response.status(403).json({message:'Access denied. Insufficient permission'});
            return
        }
    response.status(401).json({message:'unauthorized'});
    return;

}