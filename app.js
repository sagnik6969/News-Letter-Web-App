const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https"); 
const { post } = require("request");
const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen(process.env.PORT || 3000,function(){
    console.log("surver has started");
});
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/signup",function(requ,resp){
    var email = requ.body.email;
    var firstname = requ.body.fst;
    var lastname = requ.body.lst;

   var data = {
       members:[
           {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname,
            }
           }

       ]
   };
   var sdata = JSON.stringify(data);
   var option = {
       method: "POST",
       auth: "sagnik:9f325031cc890e9f845e0f223a3b02fe-us7",
   };

    console.log(sdata);
    var url = 'https://us7.api.mailchimp.com/3.0/lists/019cb973c3';
  const reques =  https.request(url,option,function(respon){
        respon.on("data",function(dat){
            console.log(JSON.parse(dat));
            if(JSON.parse(dat).error_count==0){
                resp.sendFile(__dirname+"/success.html");
            }
            else{
                resp.sendFile(__dirname+"/failure.html");
            }
        });
    })
    reques.write(sdata);
    reques.end();
    
});
app.get("/failure",function(req,res){
    res.redirect("/");
})