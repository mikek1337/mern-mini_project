import mongoose, { Schema, SchemaType, SchemaTypes } from "mongoose";
import { IUser, User } from "./user";

export interface ITickets{
    title:string;
    description:any;
    status:string;
    userId:string;
    createdAt?: Date;
    updatedAt?: Date;
    comments:any
}

export interface IComment{
    comment:any;
    postedDate: Date;
    commenter:any;
    ticketId:string;
    tickets:any;
}
export const TicketComment = new mongoose.Schema<IComment>({
    comment:{type:Map, required:true},
    postedDate:{type: Date, default:Date.now},
    commenter:{type:Schema.Types.ObjectId, ref:'User'},
    ticketId:{type:String, required:true},
    tickets:{type:'ObjectId', ref:'Tickets'}
})

export const Tickets = new mongoose.Schema<ITickets>({
    title:{type: String, requried:true},
    description: {type:SchemaTypes.Map, required:true},
    status: {type:String, default: "open"},
    userId: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    
});



