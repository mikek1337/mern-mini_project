import express from "express";
import { login, logout, me, refreshToken, signup } from "./auth";
import { checkRole } from "../middleware/checkrole";
import { createTickets, getTicketById, getTickets, getTicketStats, updateTicketStatus } from "./ticket";
import { getComments, postComment } from "./comment";
import { upload } from "../lib/upload";
import { uploads } from "./upload";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/upload", upload.single('file'),uploads);
router.get("/refreshtoken", refreshToken);
router.get("/me", checkRole(['admin', 'user']), me);
router.post("/ticket",checkRole(['user']),createTickets);
router.get("/tickets", checkRole(['admin', 'user']), getTickets);
router.get("/ticket", checkRole(['admin', 'user']), getTicketById);
router.post('/comment', checkRole(['admin', 'user']), postComment);
router.get('/comments', checkRole(['admin', 'user']), getComments);
router.get("/ticketstatus", checkRole(['admin']), getTicketStats);
router.get("/filtertickets", checkRole(['admin', 'user']), getTickets);
router.put("/ticket", checkRole(['admin', 'user']), updateTicketStatus);
export default router;