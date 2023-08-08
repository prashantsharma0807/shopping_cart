const mongoose=require('mongoose')

const regSchema=mongoose.Schema({
    name:String,
    pass:String
})

 module.exports=mongoose.model('reg',regSchema)