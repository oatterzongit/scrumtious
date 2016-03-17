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

  $membersList = $('#members-list');
  $listList = $("#list-list");
  $listDropdown = $("#listdropdown1");

  $membersCard = $('#members-card');
  $listCard = $("#card-list");
  $cardDropdown = $("#carddropdown1");

  if (!trelloToken) {
    console.log("Current user's Trello token unavailable!");
    return;
  }


  grabCards("56df85611edca153afed8a82")
  .then(console.log("sldkf"))
  .then(loadCardsAsOptions);

    grabList("56de37756835a1eacef9366b")
    .then(console.log("sldkf"))
    .then(loadListsAsOptions);


    getTeamMembers("56de37756835a1eacef9366b", trelloToken)
    .then(generateTeam);


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
    $('#listdropdown1').delegate('li', 'click', function() {
        var thisListId = $(this).attr('id');
        var thisListText = $(this).text();
        // console.log(thisListId);
        // getBoardMembers(thisId)
        console.log(thisListId, thisListText);
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

function grabList(boardid) {
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

function loadListsAsOptions(lists) {
  lists.forEach(function(list){
    var listTemplate = `
      <li class="center-align bold-text list-id" id="<%= list.id %>"><%= list.name %></li>
      <li class="divider"></li>
    `;

    var renderList = _.template(listTemplate);
    var listHTML   = renderList({list: list});

    $listDropdown.append(listHTML);
  });
}

function grabCards(listid) {
  return Trello
  .get("/lists/" + listid + "/cards?token=" + trelloToken)
  .then(
    function(cards) {
      console.log("Cards found: ", cards);
      return cards;
    },
    function(err) {
      console.log("Failure: ", err);
    }
  );
}

function loadCardsAsOptions(cards) {
  cards.forEach(function(card){
    var cardTemplate = `
      <li class="center-align bold-text card-id" id="<%= card.id %>"><%= card.name %></li>
      <li class="divider"></li>
    `;

    var renderCard = _.template(cardTemplate);
    var cardHTML   = renderCard({card: card});

    $cardDropdown.append(cardHTML);
  });
}




