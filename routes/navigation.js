import Express from "express";
import {Product} from "./../models/product.js";


export const navRouter = Express.Router();

navRouter.get('/index.html',(req,res)=>{
    res.render("index");
})

navRouter.get('/shop1.html',(req,res)=>{
    res.render("shop-old.ejs");
})


navRouter.get('/shop.html',(req,res)=>{
    Product.find({}, function(err, prods) {
        if(!!prods){
            res.render("shop", {products : prods});
        }
    });
    // res.redirect('/index.html');
})



navRouter.get('/product-single1.html',(req,res)=>{
    res.render("product-single-old");
})

navRouter.get('/product-single.html',(req,res)=>{
    console.log(req.query.title);
    let title = req.query.title;
    if(!!title){
        Product.find({title : ''+req.query.title}, function(err, product) {
            console.log(product);
            if(!!product){
                res.render("product-single",{product:product[0]});
            }
        });
    }
})


navRouter.get('/about.html',(req,res)=>{
    res.render("about");
})

navRouter.get('/blog.html',(req,res)=>{
    res.render("blog");
})

navRouter.get('/contact.html',(req,res)=>{
    res.render("contact");
})

navRouter.get('/blog-single.html',(req,res)=>{
    res.render("blog-single");
})

// navRouter.get('/login.html',(req,res)=>{

//     console.log(req.query.tab);
//     let tab = req.query.tab;
//         console.log(tab);
//         if(!!tab && (tab=="login" || tab == "signup")){
//             res.render("login",{tab:tab, user: new User()}); 
//             // , csrfToken: req.csrfToken(
//         }else{
//             res.redirect('/index.html');
//         }
        
// })

navRouter.get('/',(req,res)=>{
    res.redirect('/index.html');
})







