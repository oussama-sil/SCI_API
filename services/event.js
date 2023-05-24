const {getNbEventsDB,getEventsDB,getEventDB,insertEventDB} = require('../model/event');
const {updateMailBoxLastUpdateDB,getMailBoxesDB,getNbMailBoxesDB,getMailBoxeDB,insertMailBoxDB,updateNbMailsMailBoxDB,updateStatusMailBoxDB}
    = require('../model/mailBox')
const  {getNbPersonsDB,getPersonsDB,getPersonDB,insertPersonDB} = require('../model/person');
const {insertAssignDB,getAssignMailboxDB,getAssignPersonDB,deleteAssignDB} =require('../model/assign');


function getEvents(){
    return new Promise(async (resolve,reject)=>{
        try{
            // getting mailbox object 
            // Adding range 
            let events = await getEventsDB();
            // console.log(events)
            let nbEvents  = await getNbEventsDB();
            // console.log(events);
            events = events.map(event => {
                return { ...event, id:event.eventID, time:event.time,date:event.date }
            })
            // console.log(mailboxs)
            // resolve({data : {mailboxs},total:mailboxs.length})
            // console.log(events)
            resolve({events:events,nbEvents:nbEvents})
            
        }catch(e){
            console.log(e)
            reject(e);
        }
    });
}



function getEvent(eventID){
    return new Promise(async (resolve,reject)=>{

        // console.log(mailboxID,eventType,nbMails,personID)
try{
    let event = await getEventDB(eventID);
    if(event.length> 0){
        let person = await getPersonDB(event[0]["personID"]);
        if(person.length >0){
            person = person[0];
        }else{
            person = {}
        }
        let mailbox = await getMailBoxeDB(event[0]["mailboxID"]);
        if(mailbox.length > 0){
            mailbox = mailbox[0];
        }else{
            reject("Error, Mailbox doesn't exist")
        }
        resolve({...event[0],...person,...mailbox})

        console.log(event+person)
    }else{
        reject("Error, Event doesn't exist")
    }
}catch(e){
    console.log(e);
    reject(e);
}


    });
}


function createEvent(mailboxID,eventType,nbMails){
    return new Promise(async (resolve,reject)=>{

        // console.log(mailboxID,eventType,nbMails,personID)
        //! ADD Sort by TIMESTAMPS 
        //*Getting the number of events on the database
        let nbEvents  = await getNbEventsDB();

        //* Some tests 
        if(mailboxID <= 0){
            reject(new Error('Invalid mailBox ID'));
        }
        //* Inserting the event on the databse 
        try{
            let assigned = await getAssignMailboxDB(mailboxID);
            let personID = -1
            if(assigned.length> 0){
                personID = assigned[0].personID
            }

            let rsp = await insertEventDB(nbEvents[0]['nb']+1,mailboxID,eventType,nbMails,personID) ;
            //! UPDATE THE STATE OF THE MAILBOX
            rsp = await updateNbMailsMailBoxDB(mailboxID,nbMails) ;
            rsp = await updateMailBoxLastUpdateDB(mailboxID);
            resolve(rsp);
        }catch(e){
            reject(e);
        }
    });
}



module.exports = {createEvent,getEvent,getEvents}
