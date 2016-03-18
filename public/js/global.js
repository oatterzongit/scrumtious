/*
 * This is a global script file that gets inserted by
 * the scripts.js partial
 */
var uid,
    trelloId,
    trelloToken,
    trelloSecret,
    $main;

$(function() {
  $main = $("main");
  uid          = $main.data("uid");
  trelloId     = $main.data("trello-id");
  trelloToken  = $main.data("trello-token");
  trelloSecret = $main.data("trello-secret");

  $boardList = $("#board-list");
  $boardDropdown = $("#dropdown1");

  if (!trelloToken) {
    console.log("Current user's Trello token unavailable!");
    return;
  }

  // For main nav mobile collapse
  $(".button-collapse").sideNav();
});
