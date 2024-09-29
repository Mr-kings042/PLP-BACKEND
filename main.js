const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');


app.use(express.json());
app.use(cors());
dotenv.config();

// GET METHOD EXAMPLE
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// connect to Database ****
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    });

    // check database connection
    db.connect((err) => {
        if(err){
            return console.log(err, "error connecting to database");
        }
        console.log("Connected to mysql sucessfully as id:", db.threadId);
        
    });


// Data is the name of the file inside the view folder
app.get('/data', (req, res) => {
    // RETRIEVE DATA FROM DATABASE
    db.query('SELECT * FROM patients', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching data');
        }else{
            res.render('data', { results: results });
        }
        });
        });

      
  
  

       
         // successful connection, start server
         app.listen(process.env.PORT,() => {
            console.log(`server is listening on port: ${process.env.PORT}`);

              //   sending message to browser for  successfull connection
       console.log(`sending message to browser .....`);
       // Root route for the homepage
       app.get('/', (req,res) =>{
        res.send('hello world, Server has started successfully')

       });
  
    });

