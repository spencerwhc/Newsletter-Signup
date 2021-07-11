require('dotenv').config();
const express = require('express');
const bodyParser= require('body-parser');
const https= require('https');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res){
    const firstName=req.body.firstName;
    const lastName= req.body.lastName;
    const email= req.body.email;

    const data= {
        members: [
         { email_address:email,
            status:'subscribed',
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }
        ]
        };

    const jsonData= JSON.stringify(data);
    const url = 'https://us19.api.mailchimp.com/3.0/lists/39b589185b';
    const options= {
         method: 'POST',
         auth: 'user:'+process.env.API_KEY + '-us19'
    };

    const request  = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname+ '/success.html');

        } else{
            console.log('not working');
            res.sendFile(__dirname+ '/failure.html');
        }


        response.on('data', function(data){
           console.log(JSON.parse(data));
    });
});
request.write(jsonData);
request.end();

app.post("/failure", function(req, res){
    res.redirect('/');
})

});

app.listen(process.env.PORT || 3000, function(req, res){
    console.log("server is running on post 3000");
});




// List ID
// 39b589185b

// website link: https://serene-basin-22260.herokuapp.com/
