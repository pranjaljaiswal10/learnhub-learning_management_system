import razorpay from "../../utils/razorpay.js";
import { Payment } from "../models/payment.model.js";
import {
  validatePaymentVerification,
  validateWebhookSignature,
} from "razorpay/dist/utils/razorpay-utils.js";

const createOrderId = async (req, res) => {
  try {
    const { amount } = req.body;
    const { fullname, email } = req.user;
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        fullname,
        email,
      },
    });
    const payment = await Payment.create({
      userId: req.user._id,
      orderId: order.id,
      status: order?.status,
      amount: order?.amount,
      notes: order?.notes,
      receipt: order?.receipt,
    });
    res.status(200).json({ ...payment, keyId: process.env.RAZORPAY_ID });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const paymentWebhook = async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");
    const verifyWebhook = validateWebhookSignature(
      req.body,
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    if (!verifyWebhook) {
      console.log("Invalid webhook Signature");
      res
        .status(400)
        .json({ success: false, message: "Webhok signature is invalid" });
    }

    const paymentDetail = req.body.payload.entity;
    const payment = await Payment.findOne({ orderId: paymentDetail.order_id });
    payment.status = paymentDetail.status;
    await payment.save();
    res.status(200).json({ msg: "Webhook received successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    const paymentVerify = validatePaymentVerification({
      order_id: orderId,
      payment_id: paymentId,
      signature,
      secret: process.env.RAZORPAY_SECRET_KEY,
    });
    if (paymentVerify) {
      const payment = await Payment.findOne({ orderId });
      payment.paymentId = paymentId;
      payment.signature = signature;
      const savedPayment = await payment.save();
      res
        .status(200)
        .json({ success: true, mesage: "Payment verification successfull" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createOrderId, paymentWebhook, verifyPayment };
