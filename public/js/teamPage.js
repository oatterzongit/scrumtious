console.log("teamPage JS loaded!");

var uid,
    trelloId,
    trelloToken,
    trelloSecret,
    $boardList;

$(document).ready(function() {
  $main = $("main");
  uid          = $main.data("uid");
  trelloId     = $main.data("trello-id");
  trelloToken  = $main.data("trello-token");
  trelloSecret = $main.data("trello-secret");

  $boardList = $("#board-list");
  $boardDropdown = $("#boards-dropdown");

  if (!trelloToken) {
    console.log("Current user's Trello token unavailable!");
    return;
  }

});
