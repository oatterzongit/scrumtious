
module.exports = {
  login: login,
  dash: dash
};


function login(req, res, next) {
  res.render('pages/welcome');
};

function dash(req, res, next) {
  res.render('pages/dashboard');
  // getUserBoards();
  // res.redirect("")
};



// / get members from board ///
// t.get("/1/members/me", function(err, res) {
//    console.log(res);
//   $bId = res.idBoards[4];
//   console.log($bId);
//     return t.get("/1/boards/" + $bId + "/lists", function(err, bord) {
//     $lId= bord[2].id;
//     return t.get("/1/lists/" + $lId +'/cards' , function(err, last) {
//       if (err){
//         console.log(err);
//       }
//       console.log(last);
//     });
//   });
// });




// Parse.User.logIn("user", "pass").then(function(user) {
//   return query.find();
// }).then(function(results) {
//   return results[0].save({ key: value });
// }).then(function(result) {
//   // the object was saved.
// }, function(error) {
//   // there was some error.
// });

// t.get("/1/members/me", function.then(function(res) {
//   return res;
//   console.log(results);
// });
// then(function(results) {
//   return results[0].save({ key: value });
// }).then(function(result) {
//   // the object was saved.
// }, function(error) {
//   // there was some error.
// });

////
// User wants to make a new standup:

// on button click, t.get("/1/members/[idMember or username]/boards")
//     var usersboards = res.idBoards
//      for each usersboards, t.get ("/1/boards/" + userboards)
//        var displayboards = res.name
//     display userboards as list
//       on userboard click, t.get
