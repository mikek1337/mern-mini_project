import mongoose from "mongoose";
import {nanoid} from "nanoid";
export interface ITickets{
    title:string;
    description:string;
    ticketNo:string;
    userId:string;
}

export const Tickets = new mongoose.Schema<ITickets>({
    title:{type: String, requried:true},
    description: {type:String, required:true},
    ticketNo: {type:String, default: nanoid()},
    userId: {type: String, required: true},
    
})