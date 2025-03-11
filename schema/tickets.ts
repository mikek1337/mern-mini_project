import mongoose from "mongoose";

export interface ITickets{
    title:string;
    description:string;
    status:string;
    userId:string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const Tickets = new mongoose.Schema<ITickets>({
    title:{type: String, requried:true},
    description: {type:String, required:true},
    status: {type:String, default: "open"},
    userId: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})