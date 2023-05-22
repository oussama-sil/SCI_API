const express = require('express');

const {getNbPersonsDB,getPersonsDB,getPersonDB,insertPersonDB}
    = require('../model/person')

const {getPerson,getPersons,insertPerson,removePerson} = require('../services/person')
const router = express.Router();


router.get('/',async (req,res)=>{
    getPersons().then(persons=>{
        res.header('Access-Control-Expose-Headers','Content-Range');
        res.header('Content-Range',`posts 0-${persons.nbPersons[0].nb}/${persons.nbPersons[0].nb}`);
        res.json(persons.persons)})
    .catch(err=>{res.status(400).json(err)})
})


// router.get('/',async (req,res)=>{
//     getPersonsDB().then(persons=>res.send(persons))
//     .catch(err=>{res.status(400).json(err)})
// })

router.get('/:personID',async (req,res)=>{
    getPerson(req.params.personID)
        .then(person =>{res.send(person)})
        .catch(err=>{res.status(400).json(err)})

})

router.post('/',async (req,res)=>{
    insertPerson(req.body.firstname,req.body.lastname,req.body.badgeID,req.body.username,req.body.passwd,req.body.isAdmin)
    .then(person =>{res.send(person)})
        .catch(err=>{res.status(400).json(err)})
})

router.delete('/:personID',async (req,res)=>{
    removePerson(req.params.personID)
    .then(result =>{res.send(result)})
        .catch(err=>{res.status(400).json(err)})
})

//TODO : insert mailbox creation
// router.post('/:quizID/:attemptID',async (req,res)=>{
//     closeAttempt(req.user.userID,req.params.quizID,req.params.attemptID,req.body)
//         .then(result =>{res.send(result)})
//         .catch(err=>{res.status(400).json(err)})
// })

module.exports = router;