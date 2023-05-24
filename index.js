const  express = require('express');
const cors = require('cors');

const morgan = require('morgan'); // HTTP requests logger 
const bodyParser = require('body-parser');

// Database connection 
const DB_CONNECTION = require('./model/database_connection')


//? Importing API routes 
const emailRouter = require('./routes/mailer');
const mailboxRouter = require('./routes/mailBox');
const personRouter = require('./routes/person');
const eventRouter = require('./routes/event');
const arduinoRouter = require('./routes/arduino')


const app = express();
app.use(bodyParser.json());

// app.use(express.json());

//! To bypass CORS restrictions   ==> Once the front deployed , this should contain only the domain of the front server 


// Add headers before the routes are defined

app.use(cors());
//TODO: Fix the cors 

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Credentials","true ");
    res.header("Access-Control-Allow-Methods","OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers","Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

    next();
  });
  

//? HTTP LOGGER
if(app.get('env')=='development'){
    console.log("App on development");
    app.use(morgan('tiny'));

}


//? For testing the API 
app.get('/',(req,res)=>{
    res.send("ok");
});

//? Routes of the API
app.use('/api/email',emailRouter);
app.use('/api/mailbox',mailboxRouter);
app.use('/api/person',personRouter);
app.use('/api/event',eventRouter);
app.use('/api/arduino',arduinoRouter);



// console.log(process.env.USER);

//? Running the server 
PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0',()=>{
    console.log(`App running on port : ${PORT}`);
}) 