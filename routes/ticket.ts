import { Request, Response } from "express";
import { UserModel } from "../model/user";
import { TicketsModel } from "../model/ticket";
export const createTickets = async (request: Request, response: Response) => {
    if (response.statusCode !== 200) return;
    const { title, description } = request.body;
    const ticket = new TicketsModel({
        title,
        description,
        userId: response.locals.user.id
    });
    const newTicket = await ticket.save()
    response.status(201).json({ message: 'success', ticket: newTicket });

}

export const getTickets = async (request: Request, response: Response) => {
    if (response.statusCode !== 200) return;
    if (response.locals.user.role.role === 'admin') {
        const tickets = await TicketsModel.find();
        response.status(201).json({ message: 'success', tickets: tickets });
        return;
    }
    const userTickets = await TicketsModel.find({
        userId: response.locals.user.id
    })
    response.status(201).json({ message: 'success', tickets: userTickets });
}

export const getTicketStats = async (request:Request, response:Response)=>{
    if(response.statusCode !== 200) return;
    const ticketsStatus = await TicketsModel.aggregate([
        {
            $group:{
                _id:{
                    status:'$status'
                },
                count:{$sum:1}
            }
            
        },
        {
            $project:{
                status:'$_id.status',
                totalNumber:'$count',
                _id:0
            }  
        }
    ]);
    response.status(201).json({message:'success', ticketsStatus});
    return
}

export const updateTicketStatus = async (request:Request, response:Response)=>{
    if(response.statusCode !== 200) return;
    const {id, status} = request.body;
    const ticket = await TicketsModel.updateOne({_id:id}, {status});
    response.status(201).json({message:'success', ticket});
};