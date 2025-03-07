import express from "express";
import { login, refreshToken, signup } from "./auth";
import { checkRole } from "../middleware/checkrole";
import { createTickets, getTickets, updateTicketStatus } from "./ticket";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login)
router.get("/refreshtoken", refreshToken);
router.post("/ticket",checkRole(['user']),createTickets);
router.get("/ticket", checkRole(['admin', 'user']), getTickets)
router.put("/ticket/:ticketId", checkRole(['admin']), updateTicketStatus);
export default router;