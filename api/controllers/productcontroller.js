const Product = require('../models/product')


exports.productadd = (req, res) => {
    const { name, desc, price, qty, weight } = req.body
    const filename=req.file.filename
    //console.log(filename)
    try {
        const record = new Product({ name: name, desc: desc, price: price, qty: qty, weight:weight, img:filename, })
        record.save()
        res.json({
            status: 201,
            message: 'Successfully added'
        })
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}

exports.allproducts = async (req, res) => {
    try {
        const record =await Product.find()
        res.json({
            status: 200,
            apidata: record
        })
    } catch (error) {
        req.json({
            status: 400,
            message: error.message
        })
    }
}

exports.singlproduct = async (req, res) => {
    const id = req.params.id
    try {
        const record = await Product.findById(id)
        res.json({
            status: 200,
            apidata: record
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

exports.updateproduct=async(req,res)=>{
    const id=req.params.id
    const{name,desc,price,qty,weight,status}=req.body
    try{
        if(req.file){
            const filename=req.file.filename
            await Product.findByIdAndUpdate(id,{name:name,desc:desc,price:price,qty:qty,weight:weight,status:status,img:filename})
        }else{
            await Product.findByIdAndUpdate(id,{name:name,desc:desc,price:price,qty:qty,weight:weight,status:status})
        }
        res.json({
            status:201,
            message: 'Successfully Updated'
        })
    }catch(error){
            res.json({
                status:500,
                message:error.message
            })
    }
}

exports.stockproduct=async(req,res)=>{
    try{ 
        const record= await Product.find({status:'IN-STOCK'})
        res.json({
          status:200,
          apidata:record
        })
      }catch(error){
         res.json({
          status:400,
          message:error.message
         })
      }
}
exports.singledataile=async(req,res)=>{
    const id=req.params.id
    try{
    const record=  await Product.findById(id)
    res.json({
        status:200,
        apidata:record
    })
    }catch(error){
          res.json({
            status:500,
            message:error.message
          })
    }
}
exports.cartproduct=async(req,res)=>{
    const{ids}=req.body
    try{
    const record=  await Product.find({_id:{$in:ids}})
    console.log(record)
    res.json({
        status:200,
        apidata:record
    })
    }catch(error){
       res.json({
        status:500,
        message:error.message
       })
    }
}

exports.adminproductdelet=async(req,res)=>{
    const id=req.params.id
    try{
       await Product.findByIdAndDelete(id) 
      res.json({
        status:200,
        message:'Successfully Deleted',
        
      })
    }catch(error){
        res.json({
            status:500,
            message:error.message
          })
    }
}