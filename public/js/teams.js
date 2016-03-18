console.log("teams JS loaded!");

var currentBid,
    $membersList,
    $listList,
    $listDropdown,
    $membersCard,
    $listCard,
    $cardDropdown,
    $rawReports;

var listsTemplate = `
  <ul id="list-menu-content" class="collapsible" data-collapsible="accordion">
    <% lists.forEach(function(list) { %>
      <li class="bold-text list-id" id="<%= list.id %>">
        <div class="collapsible-header"><%= list.name %><i class="material-icons">arrow_drop_down</i></div>
        <div class="collapsible-body">
          <%= renderCards({cards: list.cards}) %>
        </div>
      </li>
      <li class="divider"></li>
    <% }); %>
  </ul>
`;
var renderLists = _.template(listsTemplate);



var cardTemplate = `
  <ul class="cards">
    <% cards.forEach(function(card) { %>
      <li class="card-id" id="<%= card.id %>">
        <%= card.name %>
      </li>
    <% }); %>
  </ul>
`;
var renderCards = _.template(cardTemplate);

$(document).ready(function() {
  currentBid = $('h1').attr('id');

  $membersList = $('#members-list');
  $listList = $("#list-list");
  $listDropdown = $("#listdropdown1");

  $membersCard = $('#members-card');
  $listCard = $("#card-list");
  $cardDropdown = $("#carddropdown1");

  grabLists(currentBid)
    .then(function(lists) { console.log("Grabbed lists:", lists); return lists; })
    .then(loadLists);

  getTeamMembers(currentBid, trelloToken)
    .then(generateTeam);

  $(".modal-trigger").leanModal();

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

  $current = $('#current');

  /// clickable drop down... so close.... thanks Karen!!!
  function hideCard() {
    $current.val() ? $('#lists-menu').hide() : $('#lists-menu').show();
  };


  $('#lists-menu').delegate('li.card-id', 'click', function() {
      var cardId = $(this).attr('id');
      var cardText = $(this).text();
      console.log(cardId, cardText);
      $current.data('cid', cardId);
      $current.val(cardText);
      hideCard();
  });

  /// clickable drop down... so close.... thanks Karen!!!
  $('#carddropdown1').delegate('li', 'click', function() {
      var thisCardId = $(this).attr('id');
      var thisCardText = $(this).text();
      // console.log(thisCardId);
      // getBoardMembers(thisId)
      console.log(thisCardId, thisCardText);
  });
});

function getTeamMembers(teamid) {
  return Trello
  .get("/boards/" + teamid + "/memberships?token=" + trelloToken)
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
        <div class="col s4">
          <div class="card medium hoverable">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="../images/default_pic.png">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4" data-mid="<%= mem.id %>"><%= mem.fullName %><i class="material-icons right">more_vert</i></span>
              <p><a href="https://trello.com/<%= mem.id %>">Trello Profile</a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"><%= mem.fullName %><i class="material-icons right">close</i></span>
              <ul class="collapsible popout" data-collapsible="accordion">
                <li>
                  <div class="collapsible-header"><i class="material-icons">place</i>Current</div>
                  <div class="collapsible-body container">

                    <span>
                      <input id="current" type="text" placeholder="Not working on a card? Type it here." data-cid="" value="">
                    </span>

                  </div>
                </li>
                <li>
                  <div class="collapsible-header"><i class="material-icons">whatshot</i>Challenges</div>
                  <div class="collapsible-body container">

                    <span>
                      <input id="challenges" type="text" placeholder="What is troubling yas?" class="validate">
                    </span>

                  </div>
                </li>
                <li>
                  <div class="collapsible-header"><i class="material-icons">filter-drama</i>Outlook</div>
                  <div class="collapsible-body container">

                    <span>
                      <input id="outlook" type="text" placeholder="What are you excited about?!" class="validate">
                    </span>

                  </div>
                </li>
                <textarea id="textarea1" placeholder="Got something to say?" class="materialize-textarea"></textarea>
              </ul>
            </div>
          </div>
        </div>
      `;

      var renderMembers = _.template(memberTemplate);
      var memberHTML = renderMembers({mem: mem});

      $membersList.append(memberHTML);
    });
    return members;
  })
};


function grabLists(boardid) {
  return Trello
  .get("/boards/" + boardid + "/lists?token=" + trelloToken)
  .then(
    function(lists) {
      console.log("Lists found: ", lists);
      return lists;
    },
    function(err) {
      console.log("Failure: ", err);
    }
  );
}

function loadLists(lists) {
  grabCards(lists).then(function(lists) {
    console.log("Received the complete array of lists, captain!", lists);

    var listsHTML = renderLists({lists: lists, renderCards: renderCards});
    $("#lists-menu").append(listsHTML);

    $('.collapsible').collapsible({accordion : false});

  });
}

function grabCards(lists) {

  // newLists will be the repository for the old lists, with each
  // lists cards attached to it...
  var newLists = [],
  // promises will be the array of promises that fire when the
  // cards return, and then are saved in the newList...
      promises = [];

  // frustratingly, lists is a list of lists, ie an array of the boards'
  // lists.
  lists.forEach(function(list) {
    // console.log("List: ", list);

    // store the promise for the newList having been updated here...
    var currentPromise =

    // send a request to Trello for the cards in this list,
    // then add the cards to the list object, and push the new list
    // object into the newLists array
    Trello
      .get("/lists/" + list.id + "/cards?token=" + trelloToken)
      .then(
        function(cards) {
          console.log("Cards found: ", cards, list.id);
          list.cards = cards;
          newLists.push(list);
        },
        function(err) {
          console.log("Failure: ", err, list.id);
        }
      );

    // put this promise in your pocket! (the array of promises)
    promises.push(currentPromise);
  });

  // now, return a promise that will fire once all the promises
  // in the promises array are finished, and have it return the
  // newList of lists...
  return Promise.all(promises).then(function() {
    console.log("All cards received, sir!");
    return newLists;
  });
}

// All routing and Controllers have been setup but couldnt finish
function createReport(memberId, current, currentId, challenges, outlook, boardId) {
  $.ajax({
    method: "post",
    url: "/teams/:b_id/reports/new",
    data: {
      member:     memberId,
      current:    current,
      current_id: currentId,
      challenges: challenges,
      outlook:    outlook,
      trello_bid: boardId
    }
  });
}

// Same as above, couldnt finish implimenting

// function dispalyReport() {
//   $.ajax({
//       method: "get",
//       url: "/teams/:b_id/reports",
//         current:    current,
//         current_id: currentId,
//         challenges: challenges,
//         outlook:    outlook,
//         trello_bid: boardId,
//         member:     memberId
//   })
// }

function displayReport(bid) {
  $.ajax({
      url: "/teams/" + bid + "/reports",
      dataType: 'application/json',
      complete: function(data){
          console.log(data)
      },
      success: function(data){
          console.log(data)
      }
    });
}
