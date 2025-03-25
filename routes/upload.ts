import { Request, Response } from "express";
import { warn, info } from "../lib/logging";

export const uploads = (req:Request, res:Response)=>{
    console.log(req.file)
    if(!req.file){
        warn('No file uploaded');
        res.status(400).json({message:'sucess', data:null})
        return;
    }
    info('File uploaded');
    res.status(201).json({message:'sucess', data:{filename:`http://localhost:3000/${req.file.path}`}});
}