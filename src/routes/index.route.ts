// src/routes/index.route.ts
import { Router } from "express";
import messageRoutes from "./message/message.route";

const router = Router();

router.use("/messages", messageRoutes);

export default router;
