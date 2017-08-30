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

        if (friendsArray.length === 0) {
            res.json(false);
            break;
        } else {

            var total = 0;
            var compareArray = [];
            compareDiff = 99999;

            function Friend(name, photo) {
                this.name = name;
                this.photo = photo;
            }

            for (var index = 0; index < friendsArray.length; index++) {
                for (var index2 = 0; index2 < newFriend.scores.length; index2++) {
                    var difference = Math.abs(newFriend.scores[index2] - friendsArray[index].scores[index2]);
                    total += difference;
                }
                if (total < compareDiff) {
                    compareDiff  = total; 
                    var compFriend = new Friend(friendsArray[index].name, friendsArray[index].photo);
                }
            }

            friendsArray.push(newFriend);

            fs.writeFile(path.join(__dirname, "../data", "friends.js"), JSON.stringify(friendsArray), function (err) {

                if (err) {
                    return console.log(err);
                };
            });

            console.log(compFriend);

            res.json(compFriend);
        }
    });

}