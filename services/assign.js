const { assign } = require("nodemailer/lib/shared");
const {getAssignMailboxDB} = require("../model/assign")
const {getMailBoxeDB,updateMailBoxLastUpdateDB} = require("../model/mailBox")
const {getPersonDB} = require("../model/person")

function convertBadgeID(badgeID){
    const hexString = badgeID;
    let result = "";
    
    for (let i = 0; i < hexString.length; i += 2) {
        const hexPair = hexString.substr(i, 2);
        const decimalValue = parseInt(hexPair, 16);
        const char = String.fromCharCode(decimalValue);
        result += char;
    }
    return "<"+result+">";
}

function getMailboxBadgeID(mailboxID){
    return new Promise(async (resolve,reject)=>{
        try{
            //Updating date of last contact from the mailbox
            let resp = await updateMailBoxLastUpdateDB(mailboxID)

            // getting assignement 
            let assign  = await getAssignMailboxDB(mailboxID)
            
            if(assign.length>0){
                //Getting the person by personID on assign 
                let person = await getPersonDB(assign[0].personID)
                if(person.length > 0){
                    // console.log(convertBadgeID(person[0].badgeID))
                    // resolve(convertBadgeID(person[0].badgeID))
                    resolve("<"+person[0].badgeID+">,"+person[0].email);
                }else{
                    resolve("");
                }
            }else{
                resolve("");
            }
        }catch(e){
            console.log(e)
            reject(e);
        }
    });

}





module.exports =  {getMailboxBadgeID}


