# ip-final
The version of issueprism that I think is going to make it.

DESCRIPTION

This project is essentially my second application to Hack Reactor. After an interview they said
study more and build a project to show us then come back. They discourage using frameworks like
Express or Angular.

I decided to build a site that is like a cross between Stack Overflow and a public debate forum. The 
idea is people will post questions about issues ranging from global warming to charter schools.
People will comment, taking a pro or con side and providing some type of reason. The reasons are categorized
as rational, anecdotal, statistical, or moral. Users can also up/downvote reasons.

Issues will be categorized by type (science, politics, life, or other) and eventually by scope (local,
regional, national, and global). Users will select from these options on the homepage, then click the View
button. That will load a view with the top posts in that category. Then users should be able to click on one
of the displayed posts and see all the comments associated with it.

A search function makes sense, but I don't want to tackle  that at this point.

SETUP

The code is executed with index.js. A package.json is provided to help install dependencies. Inside mongoDB,
the code uses the database "ip". Blog posts are stored in the collection "blogs".

For a typical pageview, the server listening at (localhost:8888)  and router will gather up a request then call
a handle function based on the request url. These functions are stored on in the requestHandlers.js file.
Responses that attempt to read from or save to the mongoose database use functions called from the
mongooseLookups.js file.

I try to use Handlebars.js to make a view template, but haven't quite figured that out yet.

WHAT WORKS

Loading the home page ("/" or "/start") works. From there you can click on  "Add Issue" and go to the
/addissue page. Filling out a form on that page saves a new blog post to the mongoDB database mentioned in SETUP.

WHAT DOESN'T

If you are on the homepage and click the "View" button, the resulting page tries to look
up all posts in the database. The find function is valid Mongoose, but the value that it's returning and passing to
the page is not recognized for some reason.
