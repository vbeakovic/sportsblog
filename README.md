# Intro

This is a node.js project that is part of the [Projects in ExpressJS Video](https://www.packtpub.com/web-development/projects-expressjs-video) course published by [Pack publishing](https://www.packtpub.com/)

# Differences

* Using yarn instead of bower

* Using EJS instead of pug as template engine

* Messaging is a done using bootstrap alerts

* All article and category fields validated

* Bootstrap is invalid class used to highlight the unvalidated fields

* When validation is not successful the form returns the originally inserted text instead of returning the empty form

* The delete request uses also bootstrap alerts and the e.preventDefault() method is used to avoid the href of the a tag redirect and instead let Ajax redirect upon successful removal   of a category or an article.
