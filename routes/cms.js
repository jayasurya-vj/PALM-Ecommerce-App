import Express from "express";
import {Product} from "./../models/product.js";


export const cmsRouter = Express.Router();



cmsRouter.get('/addProduct',(req,res)=>{
    res.render("cms", {product : new Product()});
})

cmsRouter.get('/allproducts',(req,res)=>{
    Product.find({}, function(err, prods) {
        res.render("cms-all-products", {products : prods});
    });
})

cmsRouter.post('/addProductForm',  (req,res) => {
  let prod = new Product({
  title : req.body.title,
  description : req.body.description,
  quantity : req.body.quantity,
  price : req.body.price,
  discountPercent : req.body.discountPercent,
  image : req.body.image  
  });
   prod.save();
    res.redirect('/allproducts');
    // try{
        
    //     res.redirect("/cms/allproducts", {isAllproduct : true});
    // }catch(e){
    //      res.render("cms", {product : prod });        
    // }
})