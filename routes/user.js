import Express from "express";
import {navRouter} from "./navigation.js";
import {cmsRouter} from "./cms.js";
import {paymentRouter} from "./payment.js";
import csurf from "csurf";
import flash from "connect-flash";
import  passport  from "./../config/passport.js"
import { check } from "express-validator";

export const loginRouter = Express.Router();

loginRouter.use(csurf());
loginRouter.use(flash());
loginRouter.use(passport.initialize());
loginRouter.use(passport.session());

const validate = ()=>[
  check('email').notEmpty().withMessage('Enter E-mail').isEmail().withMessage('Enter a valid E-mail'),
  check('password').notEmpty().withMessage('Enter Password').isLength({ min: 5 })
      .withMessage('Enter Password with at least 5 characters')
      .matches(/\d/).withMessage('Password must contain a number')
]

loginRouter.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

loginRouter.use('/',paymentRouter);
loginRouter.use('/',cmsRouter);
loginRouter.use('/',navRouter);

loginRouter.get('/logout', isLoggedIn, function (req, res, next) {
  req.logout();
  res.redirect('/');
});
 
loginRouter.get('/cart.html', isLoggedIn,(req,res)=>{
  res.render("cart");
})
loginRouter.get('/wishlist.html',isLoggedIn,(req,res)=>{
  res.render("wishlist");
})
loginRouter.get('/checkout.html',isLoggedIn,(req,res)=>{
  res.redirect("/order");
})




loginRouter.use('/', notLoggedIn, function(req, res, next) {
  next();
});


loginRouter.get('/login.html',(req,res)=>{
    let messages = req.flash('error');
    console.log(messages);
   let tab = req.query.tab;
   if(!tab || !(tab=="login" || tab == "signup")){ tab="login"; }
   res.render("login",{tab:tab, csrfToken: req.csrfToken(), messages: messages});
      //  if(!!tab && (tab=="login" || tab == "signup")){
      //      res.render("login",{tab:tab, csrfToken: req.csrfToken(), messages: messages});          
      //   }else{
      //      res.redirect('/index.html');
      //  }
       
 });
 
 loginRouter.post('/login',validate(),passport.authenticate('local.signin', {
   successRedirect: '/index.html',
   failureRedirect: '/login.html?tab=login',
   failureFlash: true
 }));
 
 loginRouter.post('/signup',
 validate(),
  passport.authenticate('local.signup', {
     successRedirect: '/index.html',
     failureRedirect: '/login.html?tab=signup',
     failureFlash: true
 }));


 function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
      return next();
  }
  res.redirect('/');
}