const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = require('../config/jwt_secret');
const {getPersonUsername} = require("../model/person")

import { getPersonUsername } from "../model/person";

//* Login steps : get person enrg by username , compare the passwords , if valid then generate the token and send it to the back 


function login(username,passwd){

    return new Promise(async (resolve,reject)=>{
        try{
            
        }catch(e){

        }

    });

}