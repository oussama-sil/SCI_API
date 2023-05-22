const sql  = require('./database_connection');



function getNbEventsDB(){
    return new Promise(async (resolve,reject)=>{
        sql.query(`SELECT count(*) as nb FROM Event`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


function getEventsDB(){
    return new Promise(async (resolve,reject)=>{
        sql.query(`SELECT eventID,TIME(dateEvent) as time ,DATE_FORMAT(dateEvent, '%Y-%m-%d')as date,mailboxID,eventType,nbMails,personID from Event;`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


// function getNbEventsDB(){
//     return new Promise(async (resolve,reject)=>{
//         sql.query(`SELECT count(*) as nb FROM Event`,(err,res)=>{
//             if(err){
//                 return reject(err);
//             }
//             return resolve(res);
//         }
//     )});
// }

function getEventDB(eventID){
    return new Promise(async (resolve,reject)=>{
        sql.query(`SELECT * FROM Event WHERE eventID = ${eventID}`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


function insertEventDB(eventID,mailboxID,eventType,nbMails,personID){
    return new Promise (async (resolve,reject)=>{
        sql.query(`INSERT INTO Event(eventID,dateEvent,mailboxID,eventType,nbMails,personID) VALUES (${eventID},CURRENT_TIMESTAMP(),${mailboxID},"${eventType}",${nbMails},${personID});`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        })
    })
}


//? Simple test function
async function test(){
    try{
        //? Executing the sql requests in parallel 
        const [var1,var2,var3,var4] = await Promise.all(
            [
                getNbEventsDB(),
                getEventsDB(),
                getEventDB(1),
                insertEventDB(2,2,"Ouverture d'une boite",1,1)
                // insertChoiceDB(4,1,,1,'Choice 01'),
                // insertChoiceDB(4,1,2,'Choice 02'),
                // insertQuestionDB(4,1,"Qustion for test ?",1)
                // insertQuizDB(4,"simple Description","quiz 4","")
            ]
        );
        // console.log(`First call: ${qst}`)
        // console.log(`Second call: ${choices}`)
        console.log(var1);
        console.log(var2);
        console.log(var3);
        console.log(var4);
        // console.log("end"); 
    }catch (e){
        console.log(e)
    }
}

// test();

module.exports = {getNbEventsDB,getEventsDB,getEventDB,insertEventDB};