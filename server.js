import Express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {navRouter} from "./routes/navigation.js";
import {cmsRouter} from "./routes/cms.js";
import {paymentRouter} from "./routes/payment.js";
import http from "http";
import csurf from "csurf";
import session from "express-session";



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


// User 
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false}));
app.use(csurf());

app.use('/',navRouter);
app.use('/',cmsRouter);
app.use('/',paymentRouter);

app.get('/login.html',(req,res)=>{

  console.log(req.query.tab);
  let tab = req.query.tab;
      if(!!tab && (tab=="login" || tab == "signup")){
          res.render("login",{tab:tab, csrfToken: req.csrfToken(), page: req.query.tab});          
         //, csrfToken: req.csrfToken
      }else{
          res.redirect('/index.html');
      }
      
});

app.post('/login',(req,res)=>{
  res.redirect('/index.html');
})

app.post('/signup',(req,res)=>{
  res.redirect('/index.html');
})












var http1 = http.Server(app);
http1.listen(Port, '0.0.0.0', ()=> console.log("listening in ", Port));