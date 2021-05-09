import Express from "express";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";

dotenv.config({path : './config.env'});

export const paymentRouter = Express.Router();

// Checkout checkout = new Checkout();


var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
  })
  
paymentRouter.get('/order',(req,res)=>{
    var params = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(params).then((data) => {
        console.log(data);      
        res.render("checkout", {order: data} );
    }).catch((error) => {
        console.log(error);
        res.send({"sub":error,"status":"failed in order"})
    })
})

paymentRouter.post("/verify",(req,res)=>{
    console.log(req, "req");
    var body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    
    var expectedSignature = crypto.createHmac('sha256', 'process.env.KEY_SECRET')
                                    .update(body.toString())
                                    .digest('hex');
    console.log("sig actual"+req.body.razorpay_signature);
    console.log("sig expected"+expectedSignature);
    var response = {"status":"failure"}
    if(expectedSignature === req.body.razorpay_signature)
        response={"status":"success"}
        res.send(response);        
});