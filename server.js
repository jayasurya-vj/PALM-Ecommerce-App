import Express from "express";
import mongoose from "mongoose";
import {navRouter} from "./routes/navigation.js";
import {cmsRouter} from "./routes/cms.js";
import {Product} from "./models/product.js";

mongoose.connect('mongodb://localhost:27017/palm', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

const app = Express();
app.set('view engine', 'ejs');


app.use(Express.urlencoded({ extended: false }));
app.use(Express.static("public/"));

app.get('/test',(req,res)=>{
    res.send("test page works fine");
});
app.use('/',navRouter);
app.use('/',cmsRouter);
app.listen(4000, ()=> console.log("listening in 4000"));