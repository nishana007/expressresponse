const express=require('express');
const cors = require('cors');
const app = express();
const path=require('path');
const fs=require('fs');
const bodyParser = require('body-parser');
//const xml2js = require('xml2js');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.set('json spaces', 20);

const flowers=[
    {label: 'tulip',color:'pink',id: 1},
    {label: 'rose',color:'yellow',id: 2},
    {label: 'blossom',color:'white',id: 3}
    ];


app.get('/api/1', (req, res) => {
    res.send('Welcome to Nishana\'garden...!!');               //string data
          
 });
app.get('/api/2', (req, res) => {                 
        res.send('<h1 style="color:red;">Fresh flowers</h1>')                     //html data
     });

app.get('/api/3', (req, res) => {  
                 
          res.send(flowers);                                   //array of objects (json response)
     });
     
app.get('/api/4', (req, res) => {    
                                                                   
    var dataPath=path.join(__dirname, '/colors.json');         // read Json file & display data

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
     res.send(JSON.parse(data));
    });

     });


    
app.get('/api/5', (req, res) => {  
           
       res.type('application/xml');                              //xml data
       res.send(`<?xml version="1.0" encoding="UTF-8"?>
       <flowerstore>
         <flower>
           <label>tulip</label>
           <color>pink</color>
           <id>1</id>
         </flower>
       </flowerstore> `)
                                              
         });
        
app.get('/api/6', (req, res) => {  
      
   // var parser = new xml2js.Parser();
    fs.readFile(__dirname + '/colors.xml', 'utf8', function(error, data) {

        if(error)                                           // read xml file & display data
        {
            throw error;
        }
        else
        {
        //parser.parseString(data, function (err, result) {
        res.type('application/xml');   
        res.send(data);
        //});
        }   
     });
    });
       
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
    