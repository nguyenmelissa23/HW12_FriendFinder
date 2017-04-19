// Determine the user's most compatible friend using the following as a guide:
// Convert each user's results into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).
// With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.
// Example:
// User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
// User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
// Total Difference: 2 + 1 + 2 = 5
// Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both 5-3 and 3-5 as 2, and so on.
// The closest match will be the user with the least amount of difference.
// Once you've found the current user's most compatible friend, display the result as a modal pop-up.
// The modal should display both the name and picture of the closest match.

let scores;
let question = ["#q1","#q2","#q3","#q4","#q5","#q6","#q7","#q8","#q9","#q10"];
let newPerson;

$("input[name=submitForm]").on("click", function(){
    newPerson={};
    scores =[];
    for (let i=0; i<question.length; i++){
        if (!parseInt($(question[i]).val().trim())){
            alert("Please answer all the questions before submitting!");
            break;
        } else {
            scores.push($(question[i]).val().trim());
        } 
    }
    console.log(scores);
    newPerson = {
        "name": $("input[name=name").val().trim(),
        "photo": $("input[name=image]").val().trim(),
        "scores": scores
    };

    if (scores.length === 10) console.log("You answer has been recorded.");

    //save info and empty the input field
    $.post("/survey", newPerson, function(data){
        if (data){
            console.log("Your record has been saved!");
            // for (let i=0; i<question.length; i++){
            //     $(question[i]).val("");
            // }
            // $("input[name=name").val("");
            // $("input[name=image]").val("");

            //Display Modal
            // console.log(data);
            $(".modal-body").text("");
            $(".modal-body").append("<p>Friend Name: " + data.name + "</p>");
            $(".modal-body").append("<img id='matchImg' src='" + data.photo + "'>");
        } else {
            console.log("Error");
        }
    });
    
});


//API friends - All submissions:
$("#apifriends").on("click", function(){
    $.get("/api/friends", function(data){
        $("body").text(data);
    });
});
