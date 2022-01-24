# Statement of Authorship:
  
** I, Vincent Mark, 000803494, certify that this material is my original work. 
No other person’s work has been used without due acknowledgement. 
I have not made my work available to anyone else. **

# COMP 10244 Final Project

This project consists of a frontend and backend component. The backend app uses SQLite3 to generate a database of location data that is served to the frontend app through Port 3001.

## Frontend App Features:
* Google Maps API.
* Geolocation: retrieves the user's current location and displays it as a red pin marker.
* Markers: locations are represented by blue pin markers on the API.
* Filter: locations can be filtered based on type.
* Location Menu: selecting a marker will display the location menu which gives detailed information about the selected location. Detailed information include: traffic level, reviews, images, etc.
* Favourites: locations can be saved as favourites to be quickly referenced using the favourite filter.
* Reviews: users may create, edit and delete reviews for each available location in the app.
* Settings Menu: accessibility settings for font size and marker color.
* Responsive design.
* Webpage documentation and information text.

* Note: I wanted to add a map directions feature to the app, but I could not get it to work within React Google Maps. The code has been commented out so that it wouldn't obstruct the workflow of the app, but the code is still there. I was having problems with the Google Maps API directions renderer. For some reason, calling the directions renderer would cause the API to freeze up and become undraggable. I ran out of time before I could find a solution to the issue.

* Note: the React Google Maps API on the frontend app may freeze on startup and display a white background if you are tabbed out. A simple page refresh should solve this issue if it arises.

# Running the Application
* Install the dependencies for each app using - npm install
* Use the following commands to initialize each app:
    * Backend - node index.js
    * Frontend - npm start