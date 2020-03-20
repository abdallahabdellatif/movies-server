# Movies Server Web Application

The objective of this project is to get experience in developing a network application based on the client/server architecture.

The project is a web application that is used as a simple movie database. The website allows the users to lookup movies descriptions, release dates, trailers… etc. Users should be allowed to create an account, add movies to their watchlist and search for movies. 



## Components

### Users Login (Main Page):

Registered users should be allowed to login to their accounts using their stored username and password. If an unregistered user tried to login an error message should be displayed.


### User Registration:

Users should be allowed to create an account using a unique username and a password and the users’ information should be stored in a JSON file that represents a simple database. If the user tried to register using an already taken username, an error message should be displayed.

### Home Page:

The home page is the first page that should be encountered by the users when they login to their accounts. It contains several movie categories and a button to view the user’s watchlist. When the user clicks on any movie category, they should be redirected to that category’s page.


### Category Page:
 
The category page contains all the movies within this category. When a user clicks on any movie’s name, they should be redirected to that movie’s page.


### Movie Page:

The movie page contains a short description for the movie. The page should also contain the movie trailer as an embedded video that can be streamed by the user. Finally, an “add to watchlist” button should be added. The button adds this movie to the user’s watchlist in the database.


### Watchlist page:

The watchlist page contains the movies that the user previously added using the “add to watchlist” button. A “view watchlist” button should be added to the home page that directs the user to their own watchlist page.


### Search:

A search bar should be displayed in all pages except for the registration and login pages. The search will be done using movies names only. The search result is either a “movie not found” message if the movie was not available in the database or a list of the movies that contain the search keyword in their names. The search results should be clickable and they direct you to that specific movie’s page.
