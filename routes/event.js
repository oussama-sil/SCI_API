const express = require('express');

const {getNbEventsDB,getEventsDB,getEventDB,insertEventDB} = require('../model/event');
const {createEvent,getEvent,getEvents} = require('../services/event');
const {delEventDB} = require("../model/event");


const router = express.Router();



router.get('/',async (req,res)=>{
    getEvents().then(events=>{
        res.header('Access-Control-Expose-Headers','Content-Range');
        res.header('Content-Range',`posts 0-${events.nbEvents[0].nb}/${events.nbEvents[0].nb}`);
        res.json(events.events)})
    .catch(err=>{res.status(400).json(err)})
})

router.get('/:eventID',async (req,res)=>{
    
    getEvent(req.params.eventID)
        .then(event =>{res.send(event)})
        .catch(err=>{res.status(400).json(err)})

})


router.get('/:mailboxID/:eventType/:nbMails',async (req,res)=>{
    createEvent(req.params.mailboxID,req.params.eventType,req.params.nbMails,req.params.personID)
        .then(result =>{res.send("ok")})
        .catch(err=>{res.status(400).json(err)})
})

router.delete('/:eventID',async(req,res)=>{
    delEventDB(req.params.eventID)
    .then(event =>{res.send(event)})
    .catch(err=>{res.status(400).json(err)})
})



module.exports = router;