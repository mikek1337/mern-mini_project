import { Request, Response } from "express";

export const uploads = (req:Request, res:Response)=>{
    console.log(req.file)
    if(!req.file){
        res.status(400).json({message:'sucess', data:null})
        return;
    }
    res.status(201).json({message:'sucess', data:{filename:req.file.filename}});
}