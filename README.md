
# ip-final
The version of issueprism that finally made it to production.

DESCRIPTION

I decided to build a site that is a cross between Stack Overflow and a public debate forum. The
idea is people will post questions about issues ranging from global warming to charter schools.
Other people will comment, taking a pro or con side and providing some type of argument. The arguments are categorized
as logical, anecdotal, statistical, or moral. Users can also up/downvote comments.

Issues are categorized by type (science, politics, life, or sports) and by scope (local,
regional, national, and global). Users select from these options on the homepage, then click the View
button. That loads a view with the top posts in that category. Then users click on one
of the displayed posts and see all the comments associated with it.

SETUP

issueprism is built in node.js without a framework. The code is executed with index.js. A package.json is provided to help install dependencies. The app is deployed using heroku, with MongoLabs for its mongoDB needs.On the back-end, it uses the mongojs module to interface with the db. The app uses the database "ip". Issues are stored in the collection "issues", comments in "comments".

For a typical pageview, the server listening at  and router will gather up a request then call
a handle function based on the request url (and pass the function the POST data and query, if applicable). These functions are stored on in the requestHandlers.js file. Some views are compiled on the back-end, some in the browser, but all pass through a requestHandler function.

FUTURE DEVELOPMeNT

Issues I want to add in the future are:
-let users sign in to the app
-let users edit their comments/issues after posting them
-display upvote count on comments
-take users back to the issue they were just on when they post a comment
-allow user to search for issues
-eventually it would be nice to have a pro/con spectrum, instead of a dichotomy. Maybe display the spectrum of comments horizontally
