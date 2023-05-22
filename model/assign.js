const sql  = require('./database_connection');








function insertAssignDB(mailboxID,personID){
    return new Promise(async (resolve,reject)=>{
        sql.query(`INSERT INTO ASSIGNED(mailboxID,personID) VALUES (${mailboxID},${personID});`,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}

function getAssignMailboxDB(mailboxID){
    return new Promise(async (resolve,reject)=>{
        sql.query(`select * from assigned where mailboxID = ${mailboxID}; `,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}

function getAssignPersonDB(personID){
    return new Promise(async (resolve,reject)=>{
        sql.query(`select * from assigned where personID = ${personID}; `,(err,res)=>{
            if(err){
                return reject(err);
            }
            return resolve(res);
        }
    )});
}

function deleteAssignDB(mailboxID){
    return new Promise(async (resolve,reject)=>{
        sql.query(`delete from Assigned where mailboxID=${mailboxID};`,(err,res)=>{
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

module.exports = {insertAssignDB,getAssignMailboxDB,getAssignPersonDB,deleteAssignDB};