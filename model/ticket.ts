import mongoose from "mongoose";
import { TicketComment, Tickets } from "../schema/tickets";

export const TicketCommentModel = mongoose.model("TicketComments", TicketComment);
export const TicketsModel = mongoose.model("Tickets",Tickets);
