import express from "express";
import { login, me, refreshToken, signup } from "./auth";
import { checkRole } from "../middleware/checkrole";
import { createTickets, getTickets } from "./ticket";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login)
router.get("/refreshtoken", refreshToken);
router.get("/me", checkRole(['admin', 'user']), me);
router.post("/ticket",checkRole(['user']),createTickets);
router.get("/ticket", checkRole(['admin', 'user']), getTickets)
export default router;