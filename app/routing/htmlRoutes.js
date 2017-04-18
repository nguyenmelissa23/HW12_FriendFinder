// our htmlRoutes.js file should include two routes:
// A GET Route to /survey which should display the survey page.
// A default USE route that leads to home.html which displays the home page.
const path = require("path");

module.exports = function(app){
    app.get("/", function(req,res){
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
     
    app.get("/home", function(req,res){
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });

    app.get("/survey", function(req,res){
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    app.get("/logic.js", function(req,res){
        res.sendFile(path.join(__dirname, "/../../assets/javascript/logic.js"));
    });

    app.get("/server.js", function(req,res){
        res.sendFile(path.join(__dirname, "/../../server.js"));
    });

    app.use(function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
};