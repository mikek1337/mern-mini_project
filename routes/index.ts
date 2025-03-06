import express, { Request, Response } from "express";
import { login, refreshToken, signup } from "./auth";
import { checkRole } from "../middleware/checkrole";
import { createTickets } from "./ticket";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login)
router.get("/refreshtoken", refreshToken);
router.post("/ticket",checkRole(['user']),createTickets);

export default router;