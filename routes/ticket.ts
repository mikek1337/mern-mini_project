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