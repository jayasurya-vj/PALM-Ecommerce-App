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
        res.render("shop", {products : prods});
    });
})

navRouter.get('/wishlist.html',(req,res)=>{
    res.render("wishlist");
})

navRouter.get('/product-single1.html',(req,res)=>{
    res.render("product-single-old");
})

navRouter.get('/product-single.html',(req,res)=>{
    console.log(req.query.title);
    var title = req.query.title;
    Product.find({title : ''+req.query.title}, function(err, product) {
        console.log(product);
        res.render("product-single",{product:product[0]});
    });
    
    
})

navRouter.get('/cart.html',(req,res)=>{
    res.render("cart");
})

navRouter.get('/checkout.html',(req,res)=>{
    res.redirect("/order");
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

navRouter.get('/',(req,res)=>{
    res.redirect('/index.html');
})

