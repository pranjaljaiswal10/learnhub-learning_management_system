import Razorpay from "razorpay";

const razorpay=new Razorpay({
    key_secret:process.env.RAZORPAY_SECRET_KEY,
    key_id:process.env.RAZORPAY_ID_KEY
})

export default razorpay;