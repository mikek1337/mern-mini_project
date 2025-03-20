import { Request, Response } from "express";
import { TicketCommentModel } from "../model/ticket";

export const postComment = async (request: Request, response: Response) => {
    if (response.statusCode !== 200) return;
    const user = response.locals.user;
    const { ticketId, comment, ticketHandler } = await request.body;
    console.log(ticketId, comment, ticketHandler)
    const newComment = new TicketCommentModel({
        ticketId,
        comment,
        commenter:user.id
    });
    console.log(newComment)
    const addedComment = await newComment.save();
    response.status(201).json({ message: 'success', data: addedComment });

}

export const getComments = async(request:Request, response:Response)=>{
    if(response.statusCode !==200) return;
    const{ticketId} = request.query;
    const ticketComments = await TicketCommentModel.find({
        ticketId: ticketId
    }).populate('commenter').exec();
    console.log(ticketComments);
    response.status(201).json({message:'sucess', data:ticketComments});
}