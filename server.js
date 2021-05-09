import Express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {navRouter} from "./routes/navigation.js";
import {cmsRouter} from "./routes/cms.js";
import {paymentRouter} from "./routes/payment.js";
import {Product} from "./models/product.js";
import http from "http";



dotenv.config({path : './config.env'});

const DB = process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD) || 'mongodb://localhost:27017/palm';
mongoose.connect(DB, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(con=> console.log(con.connections));

var Port = process.env.PORT || 4000;
const app = Express();
app.set('view engine', 'ejs');



app.use(Express.urlencoded({ extended: false }));
app.use(Express.static("public/"));

app.get('/test',(req,res)=>{
    res.send("test page works fine");
});
app.use('/',navRouter);
app.use('/',cmsRouter);
app.use('/',paymentRouter);
var http1 = http.Server(app);
http1.listen(Port, '0.0.0.0', ()=> console.log("listening in ", Port));