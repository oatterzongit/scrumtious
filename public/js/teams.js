console.log("teams JS loaded!");

var uid,
    trelloId,
    trelloToken,
    trelloSecret;

$(document).ready(function() {
  $main = $("main");
  uid          = $main.data("uid");
  trelloId     = $main.data("trello-id");
  trelloToken  = $main.data("trello-token");
  trelloSecret = $main.data("trello-secret");
  console.log(trelloToken);

  $membersList = $('#members-list')

  if (!trelloToken) {
    console.log("Current user's Trello token unavailable!");
    return;
  }
    getTeamMembers("56de37756835a1eacef9366b", trelloToken)
    .then(generateTeam);
});

function getTeamMembers(team_id) {
  return Trello
  .get("/boards/" + team_id + "/memberships?token=" + trelloToken)
  .then(
    function(members) {
      console.log("members found: ", members);
      return members;
    },
    function(err) {
      console.log("Failure: ", err);
    }
  );
};

function generateTeam(members) {
  members.forEach(function(mems) {
    Trello.get("/members/" + mems.idMember + "?token=" + trelloToken, function(mem) {
      var memberTemplate = `
      <div id="<%= mem.id %>">
        <span><%= mem.fullName %><%= mem.initials %></span
      </div>
      `;

      var renderMembers = _.template(memberTemplate);
      var memberHTML = renderMembers({mem: mem});

      $membersList.append(memberHTML);
    });
    return members;
  })
};





