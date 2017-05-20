const friendsList = require('../data/friends.js');

module.exports = (app) => {
  app.get("/api/friends", (req, res) => {
    res.json(friendsList)
  })

  app.post("/api/friends", (req, res) => {
    let newUser = req.body
    console.log(getBestMatch(newUser, friendsList));
    res.json(getBestMatch(newUser, friendsList)[0])
  })
}

const getScore = function(user, friend) {
  return user.scores
  .map(function(ele, idx) {return Math.abs(ele - friend.scores[idx])})
    .reduce(function(a, b) { return a + b })
}

const getBestMatch = function(user, arrFriends) {
  return arrFriends.sort(function(a, b) {
    return getScore(user, a) - getScore(user, b)
  })
}
