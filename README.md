![Spotlight screenshot](https://i.imgur.com/GPj6qCC.png)
*_Savor Your Time_*
----
> A web application to connect with team members and manage agile workflow remotely without falling out of touch with your team



## Back Story
Scrumtious is a simple and Agile solution for online collaboration between project groups.

Designed for innovative teams on the go and expanding beyond the physical boundaries of their workspace.

Using existing project boards on Trello, Scrumtious is the perfect solution for remote product and team
management

Integrating the existing Trello board of a project group. Scrumtious enables a complete SCRUM experience from the comfort of your own workspace

## Target Audience
- Development teams working remotely.

- Scrum masters & project managers who would like the ability to
keep a record of their member’s strength, progress and needs.

- Companies who utilize Agile development process.


## Design Approach

![Spotlight screenshot](https://i.imgur.com/smaqFwY.jpg)

### Color Palette

![Spotlight screenshot](https://i.imgur.com/ShHSBVt.png)

### Wireframes

![Spotlight screenshot](https://i.imgur.com/F7YNlIa.png)


![Spotlight screenshot](https://i.imgur.com/DmsjDG1.png)

### Model
![Spotlight screenshot](https://i.imgur.com/eDMawX4.png)

## Technologies Used
- Trello's API
- Trello Oauth
- Express.js
- Node.js
- Javascript/jQuery
- HTML/EJS
- CSS
- Materialize
- Lodash
- Heroku
- mongoDB/mongoose
- GitHub

##Installation instructions:
For immediate use simply open your web browser to [https://shielded-garden-38633.herokuapp.com/](https://shielded-garden-38633.herokuapp.com/)


For installation onto a local host or to play with the open source code, fork the git repository available at [https://github.com/oatterzongit/scrumtious](https://github.com/oatterzongit/scrumtious)

NPM install and create a .env file

acquire a trello Application ID and OAUTH ID from
[https://developers.trello.com/get-started/start-building](https://developers.trello.com/get-started/start-building)
add these keys in your .env file as:
CID=<developer key>
CLS=<OAUTH secret>

Sign in with your trello account information to have immediate access to your trello boards! Select a board to create a new team! Select your current sprint card from the dropdown menu of your own card on the team page to make your standup report!


![dilbert on agile](https://s-media-cache-ak0.pinimg.com/736x/a6/64/bf/a664bfae939ac4da62d6783442e560ee.jpg)

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

## Future Features
Members will be able to:

- Post stand up reports to the database

- view the stand up reports of their teammates

- comment on their teammate's stand up reports for collaboration

- Edit/update/add information from Scrumtious and have it save to their Trello account


- Get notifications when other team members view their boards


- Search for other users


Project managers will be able to:

- View a archive of each member's reports from a callender

Users will be able to:

- Collaborate in real time with socket.io


## Thank You!

> User Story [https://trello.com/b/rQWDBwo1/virtual-standups](https://trello.com/b/rQWDBwo1/virtual-standups)
>
> Presentation [https://trello.com/c/xdJOu9hK/45-scrum-tious-presentation-pdf](https://trello.com/c/xdJOu9hK/45-scrum-tious-presentation-pdf)
>
> GitHub [https://github.com/oatterzongit/scrumtious](https://github.com/oatterzongit/scrumtious)
>
> Website [https://shielded-garden-38633.herokuapp.com/](https://shielded-garden-38633.herokuapp.com/)
