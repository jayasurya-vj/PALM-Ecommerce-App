import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity:{
      type: Number,
    required: true 
  },
  price:{
      type: Number,
    required: true 
  },
  discountPercent:{
    type: Number
  },
  image:{
      
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Product =  mongoose.model('Product', productSchema);

export {Product};