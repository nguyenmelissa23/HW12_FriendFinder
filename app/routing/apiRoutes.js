// Your apiRoutes.js file should contain two routes:
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

//include the friend list data: 
const friendList = require("../data/friends");
const fs = require("fs");
//json file content
let friendJson; 
const path = require("path");
//matched friend
let yourMatch;

function findMatch(){

    return 1;
}

function readFile(){
    
}

module.exports = function(app){
    //get the info from the data file and display it as JSON
    app.get("/api/friends", function(request, response){
        fs.readFile(path.join(__dirname, '../data/friends.json'),"utf8", function(err,data){
            if (err) throw err;
            console.log("app.get() dislay line 15");
            friendJson = JSON.parse(data); 
            response.json(friendJson);        
        }); //close fs.readFile
    });

    app.get("/api/friends/yourmatch", function(request,response){
        yourMatch = findMatch();
        response.send("your match");
        response.end();
    });

    //get the info from the form and display that new submission 
    app.post("/api/friends", function(request, response){
        console.log("request.body:", request.body);
        let newPerson = request.body;
        fs.readFile(path.join(__dirname, '../data/friends.json'), "utf8",function(err,data){
            if (err) throw err;
            if (!data){
                console.log("file does not exist");
                friendJson = [];
            } else {
                friendJson = JSON.parse(data); //change to object
                console.log("inside: ", friendJson);
            }
            console.log("friendJson: ", friendJson);
            friendJson.push(newPerson);
            friendJson = JSON.stringify(friendJson,null,2);
            fs.writeFile(path.join(__dirname, '../data/friends.json'), friendJson, function(err){
                if (err) throw err; 
                else console.log("New submisison added");
            });
            response.json(friendJson);
        });  
    }); //closs app.post
}; //close module.exports