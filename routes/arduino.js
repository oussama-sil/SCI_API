const express = require('express');
const {getMailboxBadgeID} = require("../services/assign")


const router = express.Router();

router.get('/:mailboxID',async (req,res)=>{
    
    getMailboxBadgeID(req.params.mailboxID)
        .then(badge =>{res.send(badge)})
        .catch(err=>{res.status(400).json(err)})

})





module.exports = router;