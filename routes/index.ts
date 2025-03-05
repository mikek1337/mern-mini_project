import express, { Request, Response } from "express";
import { login, signup } from "./auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login)

export default router;