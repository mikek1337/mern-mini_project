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

export const updateTicketStatus = async (request:Request, response:Response)=>{
    if(response.statusCode !== 200) return;
    const {ticketId} = request.params;
    const {status} = request.body;
    if(ticketId || status) {
        response.status(400).json({message: 'Ticket id is required'});
        return;
    }
    const ticket = await TicketsModel.findById(ticketId);
    if(!ticket){
        response.status(404).json({message: 'Ticket not found'});
        return;
    }
    const updatedTicket = await TicketsModel.updateOne({
        _id: ticketId
    }, {status});

    response.status(201).json({message: 'success', ticket: updatedTicket});

}