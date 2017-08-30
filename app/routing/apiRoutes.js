//Routes for the survey page and home page
var path = require("path");
var fs = require("fs");

var friendsArray = [];

fs.readFile(path.join(__dirname, "../data", "friends.js"), 'utf8', function (err, data) {
    friendsArray = JSON.parse(data);
});

module.exports = function (app) {

    // Get all characters
    app.get("/api/friends", function (req, res) {
        res.json(friendsArray);
    });

    // Create New Characters - takes in JSON input
    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        console.log(req)

        console.log(newFriend);

        friendsArray.push(newFriend);

        fs.writeFile(path.join(__dirname, "../data", "friends.js"), JSON.stringify(friendsArray), function (err) {

            if (err) {
                return console.log(err);
            };
        });

        console.log(friendsArray)

        res.json(newFriend);
    });
    
}
