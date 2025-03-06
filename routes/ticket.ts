import { Request, Response } from "express";
export const createTickets = (request:Request, response:Response)=>{
    response.status(200).json({message:'somedata'});
}