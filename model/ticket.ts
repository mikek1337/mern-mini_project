import mongoose from "mongoose";
import { Tickets } from "../schema/tickets";

export const TicketsModel = mongoose.model("Tickets", Tickets);
