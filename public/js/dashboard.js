console.log('Dashboard.JS loaded!');

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
  $boardDropdown = $("#dropdown1");

  if (!trelloToken) {
    console.log("Current user's Trello token unavailable!");
    return;
  }

  // Drop Down menu action
$('.dropdown-button').dropdown(
  {
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: true, // Displays dropdown below the button
    alignment: 'left' // Displays dropdown with edge aligned to the left of button
  }
);

/// clickable drop down... so close.... thanks Karen!!!
$('#dropdown1').delegate('li', 'click', function() {
    var thisId = $(this).attr('id');
    var thisText = $(this).text();
    console.log(thisId);
    // getBoardMembers(thisId)
    createTeam(thisId, thisText);
});

  // Get the user's boards!
  getUsersBoards(trelloToken)
    // .then(loadBoardsAsDivs)
    .then(loadBoardsAsOptions);
});

/*
 * TRELLO API HELPERS ==================================================
 */

// INDEX members/<currentUser>/boards
function getUsersBoards(trelloToken) {
  return Trello
    .get("/members/me/boards?token=" + trelloToken)
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

// function loadBoardsAsDivs(boards) {
//   boards.forEach(function(board){
//     var boardTemplate = `
//       <div id="<%= board.id %>">
//         <a href="<%= board.shortUrl %>"><%= board.name %></a>
//       <div>
//     `;

//     var renderBoard = _.template(boardTemplate);
//     var boardHTML   = renderBoard({board: board});

//     $boardList.append(boardHTML);
//   });
//   return boards;
// }

function loadBoardsAsOptions(boards) {
  boards.forEach(function(board){
    var boardTemplate = `
      <li class="center-align bold-text board-id" id="<%= board.id %>"><%= board.name %></li>
      <li class="divider"></li>
    `;

    var renderBoard = _.template(boardTemplate);
    var boardHTML   = renderBoard({board: board});

    $boardDropdown.append(boardHTML);
  });
}



function getBoardMembers(boardId) {
  return Trello
    .get("/boards/" + boardId + "/memberships?token=" + trelloToken)
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

function createTeam(boardId, title) {
  $.ajax({
    method: "post",
    url: "/teams/new",
    data: { trello_bid: boardId, title: title }
  }).then(loadTeamsIndex)
}

function loadTeamsIndex(team) {
  $.get()
}
