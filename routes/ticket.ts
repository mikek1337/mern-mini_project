import { Request, Response } from "express";
import { UserModel } from "../model/user";
import { TicketCommentModel, TicketsModel } from "../model/ticket";
import { info, error as errorlog } from "../lib/logging";
export const createTickets = async (request: Request, response: Response) => {
    if (response.statusCode !== 200) return;
    const { title, description } = request.body;
    info(`Creating ticket for user ${response.locals.user.id}`);
    const ticket = new TicketsModel({
        title,
        description,
        userId: response.locals.user.id
    });
    console.log(ticket)
    const newTicket = await ticket.save()
    info(`Ticket created for user ${response.locals.user.id}`);
    response.status(201).json({ message: 'success', ticket: newTicket });

}

export const getTickets = async (request: Request, response: Response) => {

    if (response.statusCode !== 200) return;
    if (response.locals.user.role.role === 'admin') {
        info('Admin fetching all tickets');
        const tickets = await TicketsModel.find();
        response.status(201).json({ message: 'success', data: tickets });
        info('Tickets fetched');
        return;
    }
    info(`Fetching tickets for user ${response.locals.user.id}`);
    const userTickets = await TicketsModel.find({
        userId: response.locals.user.id
    }).sort('createdAt');
    info(`Tickets fetched for user ${response.locals.user.id}`);
    response.status(201).json({ message: 'success', data: userTickets });
}

export const getTicketById = async (request:Request, response:Response)=>{
    if(response.statusCode !== 200) return;
    const {ticketId} =  request.query;
    info(`Fetching ticket ${ticketId}`);
    const ticket = await TicketsModel.findById(ticketId);
    info(`Ticket ${ticketId} fetched`);
    response.status(201).json({message:'success', data:ticket});
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
    response.status(201).json({message:'success', data:ticketsStatus});
    return
}

export const updateTicketStatus = async (request:Request, response:Response)=>{
    if(response.statusCode !== 200) return;
    const {ticketId} = request.query;
    const {status} = request.body;
    try{
        info(`Updating ticket ${ticketId} status to ${status}`);
        const ticket = await TicketsModel.updateOne({_id:ticketId}, {status});
        response.status(201).json({message:'success', ticket});

    }catch(error){
        errorlog(`Error updating ticket ${ticketId} status to ${status} with error ${error}`);
        response.status(500).json({message:'error', data:error});
    }
};
