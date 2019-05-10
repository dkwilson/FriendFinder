var friends = require("../data/friends");

//Routes

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function(req,res) {
        const bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
          };

        const userData = req.body;
        const userScores = userData.scores;

        var totalDelta;

        for (i = 0; i < friends.length; i++) {
          let currentFriend = friends[i];
          totalDelta = 0;
    
          for (var j = 0; j < currentFriend.scores.length; j++) {
            let currentFriendScore = currentFriend.scores[j];
            let currentUserScore = userScores[j];
    
            totalDelta += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
          }
    
          if (totalDelta <= bestMatch.friendDifference) {
            
            bestMatch.photo = currentFriend.photo;
            bestMatch.name = currentFriend.name;
            bestMatch.friendDifference = totalDelta;
          }
        }

        friends.push(userData);

        res.json(bestMatch);
    });

};