const {deleteMailBoxDB,getMaxMailBoxID,getMailBoxesDB,getNbMailBoxesDB,getMailBoxeDB,insertMailBoxDB,updateNbMailsMailBoxDB,updateStatusMailBoxDB}
    = require('../model/mailBox')


const {insertAssignDB,getAssignMailboxDB,getAssignPersonDB,deleteAssignDB} = require('../model/assign');
const  {getNbPersonsDB,getPersonsDB,getPersonDB,insertPersonDB} = require('../model/person');



function getMailBoxes(){
    return new Promise(async (resolve,reject)=>{
        try{

            let mailboxs = await getMailBoxesDB();
            let nbMailBoxes  = await getNbMailBoxesDB();
            mailboxs = mailboxs.map(mailbox => {
                return {id:mailbox.mailboxID,  
                    ...mailbox,"isFree": mailbox.isFree==1,}
            })

            resolve({mailboxs:mailboxs,nbMailBoxes:nbMailBoxes})
            
        }catch(e){
            reject(e);
        }
    });
}

// function getMailBox(mailBoxID){
//     return new Promise(async (resolve,reject)=>{
//         try{
//             // getting mailbox object 
//             // Adding range 
//             let mailboxs = await getMailBoxeDB(mailBoxID);
            
//             mailboxs = mailboxs.map(mailbox => {
//                 return {id:mailbox.mailboxID, "Numero Boite":mailbox.mailboxID,"Last Update":parseInt(mailbox.lastUpdate), "Is Free": mailbox.isFree==1,
//                     ...mailbox}
//             })
//             // console.log(mailboxs)
//             // resolve({data : {mailboxs},total:mailboxs.length})
//             resolve({id:mailbox.mailboxID, "Numero Boite":mailbox.mailboxID,"Last Update":parseInt(mailbox.lastUpdate), "Is Free": mailbox.isFree==1,
//             ...mailbox})
            
//         }catch(e){
//             reject(e);
//         }
//     });
// }


function getMailBox(mailBoxID){
    return new Promise(async (resolve,reject)=>{
        try{
            // getting mailbox object 

            let mailbox = await getMailBoxeDB(mailBoxID);
            if(mailbox.length > 0){
                mailbox = mailbox[0]
                // Getting assigned of the mailbox
                let assign = await getAssignMailboxDB(mailBoxID);
                if(assign.length>0){
                    let owner  = await getPersonDB(assign[0]["personID"]);
                    // console.log(owner)
                    mailbox["Affected"] = true
                    if(owner.length>0 ){
                        mailbox["Owner"] = owner[0]["firstname"]+ "  " +owner[0]["lastname"]
                        mailbox["personID"] = owner[0]["personID"]
                        mailbox["email"] = owner[0]["email"]
                    }else{
                        mailbox["Owner"] = " "
                        mailbox["personID"] =" "
                        mailbox["email"] = ""
                    }

                }else{
                    mailbox["Affected"] = false
                    mailbox["Owner"] = " "
                    mailbox["personID"] =" "
                    mailbox["email"] = ""
                }
                resolve({id:mailbox.mailboxID,...mailbox,"isFree": mailbox.isFree==1})
            }else{
                reject("Error , non existing mailbox");
            }
        }catch(e){
            reject(e);
        }
    });
}



function affectMailBox(mailboxID,newStatus,ownerID){
    return new Promise(async (resolve,reject)=>{
        try{
            // getting mailbox object 
            // Get old mailbox 
            // console.log(mailboxID,newStatus,ownerID)
            let oldMailBox = await getMailBoxeDB(mailboxID);
            if(newStatus == false){ //* Case affected to a new user 
                
                // console.log(parseInt(mailboxID),newStatus,ownerID)
                //* Drop old user 
                let rsp = await deleteAssignDB(parseInt(mailboxID))
                if(ownerID != -1){

                    //* Insertion of new user with assign 
                    rsp = await insertAssignDB(parseInt(mailboxID),ownerID)
    
                    //* Updating status of the mailbox 
                    rsp = await updateStatusMailBoxDB(parseInt(mailboxID),newStatus)
                }else{
                    rsp = {}
                }

            }else{ //* Drop if assign exists  
                let rsp = await deleteAssignDB(parseInt(mailboxID));
                //* Updating status of the mailbox 
                rsp = await updateStatusMailBoxDB(parseInt(mailboxID),true)
            }            
            let mailBox = await getMailBox(parseInt(mailboxID));
            resolve(mailBox);
        }catch(e){
            console.log(e)
            reject(e);
        }
    });
}




function createMailBox(mailboxName){
    return new Promise(async (resolve,reject)=>{
        try{
            // console.log(mailboxName)
            let maxID = await getMaxMailBoxID();
            let rsps = insertMailBoxDB(maxID[0].max+1,0,true,mailboxName);
            resps  = getMailBox(maxID[0].max+1);
            resolve(resps);
        }catch(e){
            reject(e);
        }
    });
}



function deleteMailBox(mailboxID){
    return new Promise(async (resolve,reject)=>{
        try{
            // console.log(mailboxName)
            let rsps = await deleteMailBoxDB(parseInt(mailboxID));
            rsps = await deleteAssignDB(parseInt(mailboxID));
            resolve(resps);
        }catch(e){
            reject(e);
        }
    });
}

module.exports =  {getMailBox,getMailBoxes,affectMailBox,createMailBox,deleteMailBox}