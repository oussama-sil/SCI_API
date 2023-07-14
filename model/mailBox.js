const sql  = require('./database_connection');





function getNbMailBoxesDB(){
    return new Promise(async (resolve,reject)=>{
        sql.query(`SELECT count(*) as nb FROM MailBox`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


function getMailBoxesDB(){
    return new Promise(async (resolve,reject)=>{
        sql.query(`SELECT mailboxID, mailboxName,nbMails,isFree, (TIME_TO_SEC(CURRENT_TIMESTAMP()) - TIME_TO_SEC(lastUpdate))/60 as lastUpdate FROM MailBox`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


function getMailBoxeDB(mailboxID){
    return new Promise(async (resolve,reject)=>{
        sql.query(`SELECT mailboxID, mailboxName,nbMails,isFree, (TIME_TO_SEC(CURRENT_TIMESTAMP()) - TIME_TO_SEC(lastUpdate))/60 as lastUpdate FROM MailBox WHERE mailboxID = ${mailboxID}`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


function insertMailBoxDB(mailboxID,nbMails,isFree,mailboxName){
    return new Promise (async (resolve,reject)=>{
        sql.query(`INSERT INTO MailBox (mailboxID,nbMails,isFree,mailboxName) VALUES (${mailboxID},${nbMails},${isFree},"${mailboxName}");`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        })
    })
}

function getMaxMailBoxID(){
    return new Promise(async (resolve,reject)=>{
        sql.query(`select max(mailboxID) as max from MailBox;`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}

function updateNbMailsMailBoxDB(mailboxID,update_value){
    //* update_value : +1 -1
    return new Promise(async (resolve,reject)=>{
        sql.query(`UPDATE MailBox SET nbMails=${update_value} WHERE mailboxID = ${mailboxID}`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}



function updateStatusMailBoxDB(mailboxID,update_value){
    return new Promise(async (resolve,reject)=>{
        sql.query(`UPDATE MailBox SET isFree=${update_value} WHERE mailboxID = ${mailboxID}`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


function deleteMailBoxDB(mailboxID){
    return new Promise(async (resolve,reject)=>{
        sql.query(`DELETE  from MailBox WHERE mailboxID = ${mailboxID}`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


function updateMailBoxLastUpdateDB(mailboxID){
    return new Promise(async (resolve,reject)=>{
        sql.query(`UPDATE MailBox SET lastUpdate=CURRENT_TIMESTAMP() WHERE mailboxID = ${mailboxID}`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}


//? Simple test function
async function test(){
    try{
        //? Executing the sql requests in parallel 
        const [var1,var2,var3,var4,var5] = await Promise.all(
            [
                getMailBoxesDB(),
                getMailBoxeDB(1),
                getNbMailBoxesDB(),
                updateNbMailsMailBoxDB(1,3),
                updateStatusMailBoxDB(2,true)
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
        console.log(var5);


        // console.log("end"); 
    }catch (e){
        console.log(e)
    }
}

// test();

module.exports = {updateMailBoxLastUpdateDB,deleteMailBoxDB,getMaxMailBoxID,getMailBoxesDB,getNbMailBoxesDB,getMailBoxeDB,insertMailBoxDB,updateNbMailsMailBoxDB,updateStatusMailBoxDB};