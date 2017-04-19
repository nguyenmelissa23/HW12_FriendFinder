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
let totalDifference;
let differenceArray=[];

function findMatch(newPerson, response){
    fs.readFile(path.join(__dirname, '../data/friends.json'),"utf8", function(err,data){
        if (err) throw err;
        console.log("app.get() dislay - line 15");
        friendJson = JSON.parse(data);
        console.log(friendJson);
        yourMatch={"name":"no name", "img": "no img", "diff":"none"};        
        for (let i=0; i < friendJson.length; i++){
            if (!newPerson) {
                //console.log("There is nothing in newPerson"); 
                break;
            }
            // console.log("newPerson: ",newPerson);
            // console.log("friendJson[i]", friendJson[i]);
            totalDifference = 0;
            if (newPerson !== friendJson[i]){
                //go through the scores and add together the differences:
                for (let j=0; j<10; j++){
                    friendScore = friendJson[i].scores[j];
                    newPersonScore = newPerson.scores[j];
                    totalDifference += Math.abs(friendScore - newPersonScore);
                }
                if (yourMatch.diff === "none"){
                    yourMatch.name=friendJson[i].name;
                    yourMatch.diff= totalDifference;
                } else{
                    if (yourMatch.diff > totalDifference){
                        yourMatch.name=friendJson[i].name;
                        yourMatch.diff= totalDifference;
                        yourMatch.img=friendJson[i].photo;
                    }
                }
            }
            console.log(yourMatch);
            response.json(yourMatch);
        }     
    });
}

module.exports = function(app){

    //get the info from the form and display that new submission 
    app.post("/survey", function(request, response){
        console.log("request.body:", request.body);
        let newPerson = request.body;
        fs.readFile(path.join(__dirname, '../data/friends.json'), "utf8", function(err,data){
            //if (err) throw err;
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
            console.log("checking if friendJSON is empty", friendJson);
            if (friendJson !== ""){
                fs.writeFile(path.join(__dirname, '../data/friends.json'), friendJson, function(err){
                    if (err) console.log(err);
                    if (err) throw err; 
                    else console.log("New submisison added");
                 });
            }
        }); 
        //=============================================

        fs.readFile(path.join(__dirname, '../data/friends.json'),"utf8", function(err,data){
            if (err) throw err;
            console.log("app.get() dislay - line 15");
            friendJson = JSON.parse(data);
            //console.log(friendJson);
            yourMatch={"name":"no name", "photo": "no img", "diff":"none"};        
            for (let i=0; i < friendJson.length; i++){
                if (!newPerson) {
                    console.log("There is nothing in newPerson"); 
                    break;
                }
                console.log("newPerson: ",newPerson);
                console.log("friendJson[i]", friendJson[i]);
                totalDifference = 0;
                if (newPerson !== friendJson[i]){
                    //go through the scores and add together the differences:
                    for (let j=0; j<10; j++){
                        friendScore = friendJson[i].scores[j];
                        newPersonScore = newPerson.scores[j];
                        totalDifference += Math.abs(friendScore - newPersonScore);
                    }
                    if (yourMatch.diff === "none"){
                        yourMatch.name=friendJson[i].name;
                        yourMatch.diff= totalDifference;
                        yourMatch.photo = friendJson[i].photo;
                    } else{
                        if (yourMatch.diff > totalDifference){
                            yourMatch.name= friendJson[i].name;
                            yourMatch.diff= totalDifference;
                            yourMatch.photo = friendJson[i].photo;
                        }
                    }
                }
                console.log("your match:",yourMatch);
                response.json(yourMatch);
            }
        });
    }); //closs app.post


//==================================================================================================
    //get the info from the data file and display it as JSON
    app.get("/api/friends", function(request, response){
        fs.readFile(path.join(__dirname, '../data/friends.json'),"utf8", function(err,data){
            if (err) throw err;
            console.log("app.get() dislay line 15");
            friendJson = JSON.parse(data); 
            response.json(friendJson);        
        }); //close fs.readFile
    });

}; //close module.exports