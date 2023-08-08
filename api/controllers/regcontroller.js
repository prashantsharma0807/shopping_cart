const Reg = require('../models/reg')
const bcrypt = require('bcrypt')


exports.regdata = async (req, res) => {
    const { name, pass } = req.body
    const record = await Reg.findOne({ name: name })
    try {
        if (record === null) {
            let changepassword = await bcrypt.hash(pass, 10)
            //console.log(chanPass)
            const record = new Reg({ name: name, pass: changepassword })
            record.save()
            // console.log(record)
            res.json({
                status: 201,
                message: "Successfully Register",
                apidata: record
            })
        } else {
            res.json({
                message: 'Username Already Taken',
                status: 400
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}


exports.logincheck = async (req, res) => {
    const { name, pass } = req.body
    try{
    const record = await Reg.findOne({ name: name })
    if (record !== null) {
        let passcompare = await bcrypt.compare(pass, record.pass)
        //console.log(passcompare)
        if (passcompare) {
            res.json({
                status: 200,
                apiData: record
            })
        } else {
            res.json({
                status: 400,
                message: 'Wrong Credentaiols'
            })
        }
    } else {
        res.json({
            status: 400,
            message: 'UserName is not exits'
        })
    }
 }catch(error){
    res.json({
        status: 400,
        message:error.message
    })
 }
}