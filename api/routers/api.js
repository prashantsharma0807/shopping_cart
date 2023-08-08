const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const productc=require('../controllers/productcontroller')
const multer=require('multer')
  
let storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/images')
    },
    filename :function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
const upload=multer({
    storage:storage,
    limits:{fieldSize:1024*1024*4}
})




router.post('/regdata',regc.regdata)
router.post('/logincheck',regc.logincheck)

router.post('/productadd',upload.single('img'),productc.productadd)
router.get('/allproducts',productc.allproducts)
router.get('/singlproduct/:id',productc.singlproduct)
router.put('/updateproduct/:id',upload.single('img'),productc.updateproduct)
router.get('/stockproduct',productc.stockproduct)
router.get('/singledataile/:id',productc.singledataile)
router.post('/cartproduct',productc.cartproduct)
router.delete('/adminproductdelet/:id',productc.adminproductdelet)

module.exports=router  