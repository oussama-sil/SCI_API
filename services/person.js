const {getMailBoxesDB,getNbMailBoxesDB,getMailBoxeDB,insertMailBoxDB,updateNbMailsMailBoxDB,updateStatusMailBoxDB}
    = require('../model/mailBox')


const {insertAssignDB,getAssignMailboxDB,getAssignPersonDB,deleteAssignDB} = require('../model/assign');
const  {getNbPersonsDB,getPersonsDB,getPersonDB,insertPersonDB,getMaxPersonID,removePersonDB} = require('../model/person');
const {affectMailBox} = require("../services/mailbox");

function removePerson(personID){
    return new Promise(async (resolve,reject)=>{
        try{
            //if assigned exist delete set the mailbox to free 
            let assign = await getAssignPersonDB(personID);
            let resps = {}
            if(assign.length>0){
                resps = await affectMailBox(assign[0].mailboxID,true,-1);
            }
            // Delete person
            resps = removePersonDB(parseInt(personID));
            resolve(resps);
        }catch(e){
            reject(e);
        }
    });
}


function insertPerson(firstname,lastname,badgeID,username,passwd,isAdmin){
    return new Promise(async (resolve,reject)=>{
        try{
            // console.log(mailboxName)
            let maxID = await getMaxPersonID();
            let rsps = insertPersonDB(maxID[0].max+1,firstname,lastname,badgeID,username,passwd,isAdmin);
            resps  = getPerson(maxID[0].max+1);
            resolve(resps);
        }catch(e){
            reject(e);
        }
    });
}



function getPersons(){
    return new Promise(async (resolve,reject)=>{
        try{
            // getting mailbox object 
            // Adding range 
            let persons = await getPersonsDB();
            let nbPersons  = await getNbPersonsDB();
            persons = persons.map(person => {
                return {id:person.personID, ...person,isAdmin: person.isAdmin == 1}
            })
            // console.log(mailboxs)
            // resolve({data : {mailboxs},total:mailboxs.length})
            resolve({persons:persons,nbPersons:nbPersons})
            
        }catch(e){
            reject(e);
        }
    });
}




function getPerson(personID){
    return new Promise(async (resolve,reject)=>{
        try{
            // getting mailbox object 

            let person = await getPersonDB(personID);
            if(person.length > 0){
                person = person[0]
                // Getting assigned of the mailbox
                let assign = await getAssignPersonDB(personID);
                if(assign.length>0){
                    let own  = await getMailBoxeDB(assign[0]["mailboxID"]);
                    person["Affected"] = true
                    if(own.length>0 ){
                        person["Own"] = own[0]["mailboxName"]
                        person["mailboxID"] = own[0]["mailboxID"]
                    }else{
                        person["Own"] = " "
                        person["mailboxID"] = " "
                    }

                }else{
                    person["Affected"] = false
                    person["Own"] = " "
                    person["mailboxID"] = " "
                }
                resolve({id:person.personID,...person,isAdmin: person.isAdmin == 1})
            }else{
                reject("Error , non existing person");
            }
        }catch(e){
            console.log(e)
            reject(e);
        }
    });
}


module.exports =  {getPerson,getPersons,insertPerson,removePerson}