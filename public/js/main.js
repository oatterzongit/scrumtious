console.log('JS loaded!');


var Trello = require("node-trello");
var t = new Trello("67929b4f830358f56a6508bd5ddb0c08", "cb3e4915fb27587a711727c84f3e8b98b3eb2bda2282135f6c1351e57b949da1");






// sand box starts here
var $boardList;
var $boardId;
var $list;
var $memberId;
var $template;

var $bList = $('#board-list');


function getUserBoards() { t.get("/1/members/me/boards", function(err, res) {
   // console.log(res);
  $boardList = res;
  console.log($boardList);
    $boardList.forEach(function(board){
      var content = `
      <li> <%= $boardList.fullName %> <li>
      `;

      return(board);
    });
  });
};

getUserBoards();

function generateTeam(id) { t.get("/1/boards/" + id + "/memberships", function(err, res) {
  $memberId = res;
  console.log($mId);
  $memberId.forEach(function(mem) {
    t.get("/1/members/" + mem.idMember, function(err, res) {
      console.log(res.id, res.fullName);

    }
    )
  })
  }
)};




