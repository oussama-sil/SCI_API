const sql  = require('./database_connection');


function removePersonDB(personID){
    return new Promise(async (resolve,reject)=>{
        sql.query(`DELETE  from Person WHERE personID = ${personID}`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}



function getMaxPersonID(){
    return new Promise(async (resolve,reject)=>{
        sql.query(`select max(personID) as max from Person;`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


function getNbPersonsDB(){
    return new Promise(async (resolve,reject)=>{
        sql.query(`SELECT count(*) as nb FROM Person`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


function getPersonsDB(){
    return new Promise(async (resolve,reject)=>{
        sql.query(`SELECT * FROM Person`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


function getPersonDB(personID){
    return new Promise(async (resolve,reject)=>{
        sql.query(`SELECT * FROM Person WHERE personID = ${personID}`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


function insertPersonDB(personID,firstname,lastname,badgeID,username,passwd,isAdmin){
    //* Add hashing passwords
    return new Promise (async (resolve,reject)=>{
        sql.query(`INSERT INTO Person (personID,firstname,lastname,badgeID,username,passwd,isAdmin) VALUES (${personID},"${firstname}","${lastname}","${badgeID}","${username}","${passwd}",${isAdmin});`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        })
    })
}


function getPersonUsername(username){
    return new Promise(async (resolve,reject)=>{
        sql.query(`SELECT * FROM Person where username=${username}`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}

// function updateNbMailsMailBoxDB(mailboxID,update_value){
//     //* update_value : +1 -1
//     return new Promise(async (resolve,reject)=>{
//         sql.query(`UPDATE MailBox SET nbMails=${update_value} WHERE mailboxID = ${mailboxID}`,(err,res)=>{
//             if(err){
//                 return reject(err);
//             }
//             return resolve(res);
//         }
//     )});
// }



// function updateStatusMailBoxDB(mailboxID,update_value){
//     return new Promise(async (resolve,reject)=>{
//         sql.query(`UPDATE MailBox SET isFree=${update_value} WHERE mailboxID = ${mailboxID}`,(err,res)=>{
//             if(err){
//                 return reject(err);
//             }
//             return resolve(res);
//         }
//     )});
// }





//? Simple test function
async function test(){
    try{
        //? Executing the sql requests in parallel 
        const [var1,var2,var3,var4] = await Promise.all(
            [
                getNbPersonsDB(),
                getPersonsDB(),
                getPersonDB(1),
                insertPersonDB(3,"Test","person","5x","test","somepsswd",false)
                // insertChoiceDB(4,1,1,'Choice 01'),
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

module.exports = {getNbPersonsDB,getPersonsDB,getPersonDB,insertPersonDB,getPersonUsername,getMaxPersonID,removePersonDB};