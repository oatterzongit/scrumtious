console.log('JS loaded!');

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

  // Get the user's boards!
  getUsersBoards(trelloToken)
    .then(loadBoardsAsDivs)
    .then(loadBoardsAsOptions);
});

/*
 * TRELLO API HELPERS ==================================================
 */

// INDEX members/<currentUser>/boards
function getUsersBoards(token) {
  return Trello
    .get("/members/me/boards?token=" + token)
    .then(
      function(boards) {
        console.log("Boards found: ", boards);
        return boards;
      },
      function(err) {
        console.log("Failure: ", err);
      }
    );
};

/*
 * AJAX / RENDERING FUNCTIONS ==========================================
 */

function loadBoardsAsDivs(boards) {
  boards.forEach(function(board){
    var boardTemplate = `
      <div id="<%= board.id %>">
        <a href="<%= board.shortUrl %>"><%= board.name %></a>
      <div>
    `;

    var renderBoard = _.template(boardTemplate);
    var boardHTML   = renderBoard({board: board});

    $boardList.append(boardHTML);
  });
  return boards;
}

function loadBoardsAsOptions(boards) {
  boards.forEach(function(board){
    var boardTemplate = `
      <option value="<%= board.id %>"><%= board.name %></option>
    `;

    var renderBoard = _.template(boardTemplate);
    var boardHTML   = renderBoard({board: board});

    $boardDropdown.append(boardHTML);
  });
}
