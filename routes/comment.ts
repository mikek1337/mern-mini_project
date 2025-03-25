import { Request, Response } from "express";
import { TicketCommentModel } from "../model/ticket";
import { info, error as errorlog } from "../lib/logging";

export const postComment = async (request: Request, response: Response) => {
    if (response.statusCode !== 200) return;
    const user = response.locals.user;
    const { ticketId, comment, ticketHandler } = await request.body;
    console.log(ticketId, comment, ticketHandler)
    try{
        const newComment = new TicketCommentModel({
            ticketId,
            comment,
            commenter:user.id
        });
        
        const addedComment = await newComment.save();
        info('Comment added');
        response.status(201).json({ message: 'success', data: addedComment });

    }catch(error){
        errorlog(error);
        response.status(500).json({message:'error', data:error});
    }

}

export const getComments = async(request:Request, response:Response)=>{
    if(response.statusCode !==200) return;
    const{ticketId} = request.query;
    try{
        info(`Getting comments for ticket ${ticketId}`);
        const ticketComments = await TicketCommentModel.find({
            ticketId: ticketId
        }).populate('commenter').exec();
        info('Comments fetched');
        
        response.status(201).json({message:'sucess', data:ticketComments});
    }catch(error){
        errorlog(`Error fetching comments for ticket ${ticketId} with error ${error}`);
        response.status(500).json({message:'error', data:error});
    }
}