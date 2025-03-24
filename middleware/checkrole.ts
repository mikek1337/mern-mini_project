import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { error as errorlog, info } from "../lib/logging";
export const checkRole = (role:string[])=>(request:Request, response:Response, next:NextFunction)=>{
        const token = request.headers.authorization?.split(' ')[1];
        if(token === undefined){
            errorlog('No token provided');
            response.status(401).json({message:'unauthorized'});
            return;
        }
        try {
            
            const tokenData = jwt.verify(token, process.env.JWT_SECRET!);
            if(typeof tokenData !== "string"){
                info(`User ${tokenData.id} has role ${tokenData.role.role}`);
                const hasRole = role.includes(tokenData.role.role);
                if(hasRole){
                    response.locals.user = tokenData;
                    info(`User ${tokenData.id} has permission to access`);
                    next();
                    return;
                }
                errorlog(`User ${tokenData.id} has insufficient permission`);
                response.status(403).json({message:'Access denied. Insufficient permission'});
                return
            }
        } catch (error) {
            errorlog(`Error verifying token ${error}`);
            response.status(401).json({message:'unauthorized'});
        }
    return;

}