const express = require('express');

const {sendEmail} = require('../services/mailer')


const router = express.Router();


router.get('/',async (req,res)=>{
    let from = req.query.from;
    let to = req.query.to;
    let mail = req.query.mail
    sendEmail(from,to,mail)
        .then(response =>{console.log(response);res.send(response)})
        .catch(err=>{res.status(400).json(err)})
})


module.exports = router;