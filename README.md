# API: Scrum*tiouJS

### We help you _Savor Your Time_.
`Scrum*tiouJS` is a simple, user-friendly, client framework to interface with the `Scrum*tious` API. `Scrum*tiouJS` adheres to RESTful conventions so modern developers like you will spend less time referring to the documentation and more time having a __*scrumptious*__ experience of tapping your creativity developing applications while consuming our API.

Which brings us to the great news! The `Scrum*tiouJS API` is freely available for the public! We don't even limit your query rate! As an open-source application and a people-centric service, we are constantly evolving with the people we serve!


# API Documentation
##### *Our API currently returns JSON. Other formats will be considered by popular request. <br> Please visit wwww.scrum*tious.co.ga.w.t.f/notaforum/requests <br><br>
#### Actions: `/paths/`
<br>
#### GET: `/api/teams`
Gets the index of Teams. <br>
`teams` Arguments:
- `creator:` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type: String
- `members:` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type: String
- `title:` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type: String
- `trello_bid:` &nbsp; Type: String
- `active:` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Type: Boolean

#### GET: `/api/teams/:b_id`
<br>
Gets a specific team by their `trello_bid` <br>

#### GET: `/api/teams/:b_id/reports`
Gets a list of all reports made by the team. _Not yet implemented_ <br>

#### GET: `/api/teams/:b_id/reports/:r_id/comments`
Gets a list of all comments posted to one report by its `report_index`. _Not yet implemented_ <br>
