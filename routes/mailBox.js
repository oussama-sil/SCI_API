const express = require('express');

const {getMailBoxesDB,getNbMailBoxesDB,getMailBoxeDB,insertMailBoxDB,updateNbMailsMailBoxDB,updateStatusMailBoxDB, deleteMailBoxDB}
    = require('../model/mailBox')


const {getMailBox,getMailBoxes,affectMailBox,createMailBox} = require('../services/mailbox');


const router = express.Router();


router.get('/',async (req,res)=>{
    getMailBoxes().then(mailboxes=>{
        res.header('Access-Control-Expose-Headers','Content-Range');
        res.header('Content-Range',`posts 0-${mailboxes.nbMailBoxes[0].nb}/${mailboxes.nbMailBoxes[0].nb}`);
        res.json(mailboxes.mailboxs)})
    .catch(err=>{res.status(400).json(err)})
})

router.get('/:mailboxID',async (req,res)=>{
    
    getMailBox(req.params.mailboxID)
        .then(mailbox =>{res.send(mailbox)})
        .catch(err=>{res.status(400).json(err)})

})

//TODO : insert mailbox creation

router.post('/',async (req,res)=>{
    createMailBox(req.body.mailboxName)
        .then(mailbox =>{res.send(mailbox)})
        .catch(err=>{res.status(400).json(err)})
})


router.put('/:mailboxID',async (req,res)=>{
    // console.log(req.body);
    // res.send({})
    affectMailBox(req.params.mailboxID,req.body.isFree,req.body.ownerID )
        .then(result =>{res.send(result)})
        .catch(err=>{res.status(400).json(err)})
})


router.delete('/:mailboxID',async (req,res)=>{
    deleteMailBoxDB(req.params.mailboxID)
    .then(result =>{res.send(result)})
        .catch(err=>{res.status(400).json(err)})
})


module.exports = router;