var express = require('express')  
var app = express()

app.use(express.static('public'));



const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore,Filter} = require('firebase-admin/firestore');
var serviceAccount = require("./key.json");
 
initializeApp({
    credential: cert(serviceAccount)
  });
  
const db = getFirestore();
  
app.get('/signup', function (req, res) {  
res.sendFile( __dirname + "/public/" + "signup.html" );

  
})  
app.get('/login', function (req, res) {  
    res.sendFile( __dirname + "/public/" + "signup.html" );
    
      
    })  
app.get('/loginup', function (req, res) {  
    res.sendFile( __dirname + "/public/" + "main.html" );
        
          
    })  
  
app.get('/signin', function (req, res) { 
    db.collection('userDemo')
    .where(
        Filter.or(
            Filter.where("Email","==",req.query.Email),
            Filter.where("userName","==",req.query.userName)
        
            )
    )
    .get()
    .then((docs)=>{
        if(docs.size>0){
            res.send("hey this is an existing account");
        }else{
            db.collection("userDemo")
            .add({
                userName:req.query.userName,
                Email:req.query.Email,
                Password:req.query.Password,
            })
            .then(()=>{
                res.sendFile(__dirname+"/public/",+"login.html")
            })
            .catch(()=>
            {
                res.send("something went wrong");
            })
        }
    })
}); 
  
app.get("/loginup", function (req,res) {  
 db.collection('userDemo')
   .where("Email","==",req.query.Email)
   .where("Password","==",req.query.Password)
   .get()
   .then((docs)=>{
    if(docs.size>0){
        res.send("successfull")
    }
    else{
        res.send("Fail")
    }
   })
})
app.get("/login", function (req,res) {  
    res.sendFile( __dirname + "/public/" + "login.html" );
});
app.listen(3000);