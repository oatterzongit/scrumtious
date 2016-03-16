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


  if (!trelloToken) {
    console.log("Current user's Trello token unavailable!");
    return;
  }

});
