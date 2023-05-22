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



const app = express();
app.use(bodyParser.json());

// app.use(express.json());

//! To bypass CORS restrictions   ==> Once the front deployed , this should contain only the domain of the front server 
app.use(cors({
    origin: '*'
}));

//? HTTP LOGGER
if(app.get('env')=='development'){
    console.log("App on development");
    app.use(morgan('tiny'));

}


//? For testing the API 
app.get('/',(req,res)=>{
    res.json({message:"ok"});
});

//? Routes of the API
app.use('/api/email',emailRouter);
app.use('/api/mailbox',mailboxRouter);
app.use('/api/person',personRouter);
app.use('/api/event',eventRouter);



// console.log(process.env.USER);

//? Running the server 
PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`App running on port : ${PORT}`);
}) 