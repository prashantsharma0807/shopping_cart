const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
   name:String,
   desc:String,
   price:Number,
   qty:Number,
   weight:String,
   img:String,
   status:{type:String, default:'IN-STOCK'} 
})

module.exports=mongoose.model('product',productSchema)