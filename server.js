import Express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {navRouter} from "./routes/navigation.js";
import {cmsRouter} from "./routes/cms.js";
import {paymentRouter} from "./routes/payment.js";
import http from "http";
import csurf from "csurf";
import session from "express-session";
import flash from "connect-flash";
import  passport  from "./config/passport.js"
import { check } from "express-validator";



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
// User 
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false}));
app.use(csurf());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const validate = ()=>[
  check('email').notEmpty().withMessage('Enter E-mail').isEmail().withMessage('Enter a valid E-mail'),
  check('password').notEmpty().withMessage('Enter Password').isLength({ min: 5 })
      .withMessage('Enter Password with at least 5 characters')
      .matches(/\d/).withMessage('Password must contain a number')
]
   

app.use('/',navRouter);
app.use('/',cmsRouter);
app.use('/',paymentRouter);

app.get('/login.html',(req,res)=>{
   let messages = req.flash('error');
   console.log(messages);
  let tab = req.query.tab;
      if(!!tab && (tab=="login" || tab == "signup")){
          res.render("login",{tab:tab, csrfToken: req.csrfToken(), messages: messages});          
       }else{
          res.redirect('/index.html');
      }
      
});

app.post('/login',validate(),passport.authenticate('local.signin', {
  successRedirect: '/index.html',
  failureRedirect: '/login.html?tab=login',
  failureFlash: true
}));

app.post('/signup',
validate(),
 passport.authenticate('local.signup', {
    successRedirect: '/index.html',
    failureRedirect: '/login.html?tab=signup',
    failureFlash: true
}));


app.get('/test',(req,res)=>{
    res.send("test page works fine");
});


var http1 = http.Server(app);
http1.listen(Port, '0.0.0.0', ()=> console.log("listening in ", Port));