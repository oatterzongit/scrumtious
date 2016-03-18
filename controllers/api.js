var Team = require("../models/team");

module.exports = {
  index:  index,
  show:   show,
  create: create,
  update: update,
  createReport: createReport,
  indexReports: indexReports,
}

function show(req, res, next) {
  Team.find({trello_bid: req.params.b_id}, function(err, team) {
    if (err) res.render(err);
    res.json(team[0]);
  })
};


function index(req, res) {
  console.log(req.body);
  console.log(req.user);
  // Find all teams in DB
  Team.find({}, function(err, teams) {
    if (err) {
      res.send(err);
    }

    // Return all teams as json
    res.json(teams);
  });
}


// Teams CREATE page rendering


function create(req, res, next) {
  console.log(req.body);
  console.log(req.user);

  Team.findOne({trello_bid: req.body.trello_bid})
  .then(function(team){
    if(team){
      // then go to next step
      return team;
    } else {
      // create new team
      // then go to next step
      return Team.create({
        creator:    req.user.trelloId,
        trello_bid: req.body.trello_bid,
        title:      req.body.title
      });
    }
  })
  .then(function(team) {
      // from boardId grab users from trello API??
      // grab unique user id from users??
      // for each user get fullName, ID, email address and add to team??

      // return TEAM object
    res.json({
      msg:  "Team found or created!",
      team: team
    })
  });
};

function update(req, res, next) {
  var teamId  = req.params.id;
  var changes = req.body;

  Team
  .findById(teamId)
  .then(function(team) {
    return team.update(changes);
  })
  .then(function(status) {
    res.json({msg: "Updated team!", status: status});
  });

}


function createReport(req, res, next) {
  console.log(req.body);
  console.log(req.user);
  Team.reports.create({
        current: current,
        current_id: currentId,
        challenges: challenges,
        outlook: outlook,
        trello_bid: boardId,
        member: memberId
  })
    .then(function(report) {
      // from boardId grab users from trello API??
      // grab unique user id from users??
      // for each user get fullName, ID, email address and add to team??

      // return TEAM object
      res.json({
        msg:  "Report created!",
        report: report
    })
  });
};

function indexReports(req, res, next) {
  Team.findOne({trello_bid: req.body.trello_bid})
  .then(function(err, team) {
    if (err) res.render(err);
    res.json(team.reports)
  })
};


