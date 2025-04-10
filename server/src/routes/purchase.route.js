import { Router } from "express";
import {
  createOrderId,
  paymentWebhook,
  verifyPayment,
} from "../controllers/purchase.controller.js";
import authVerify from "../middlewares/auth.middleware.js";

const purchaseRouter = Router();

purchaseRouter.post("/create", authVerify, createOrderId);
purchaseRouter.post("/webhook", authVerify, paymentWebhook);
purchaseRouter.post("verify", authVerify, verifyPayment);

export default purchaseRouter;
