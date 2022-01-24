// sqlite3 package used to create an sqlite database
var sqlite3 = require("sqlite3").verbose();

// create an sqlite database in-memory
var db = new sqlite3.Database(':memory:');

// express package used to create a server
var express = require('express');

// create an express instance to define our server
var app = express();

// include cors to allow for requests from our ReactJS app running on a different port
var cors = require('cors');

// accept requests from any origin
app.use(cors({
  origin: '*'
}));

// startup a collection of data to manage
db.serialize(function () {

  // create a fresh version of the table
  db.run("DROP TABLE IF EXISTS Locations");
  db.run("CREATE TABLE Locations (id INT AUTO_INCREMENT, name TEXT, lng FLOAT, lat FLOAT, filterType TEXT, imageUrl TEXT, traffic INT, favourite BOOL)")
  db.run("DROP TABLE IF EXISTS Reviews")
  db.run("CREATE TABLE Reviews (id INT AUTO_INCREMENT, location_id INT, user TEXT, text TEXT, date DATE, ownership BOOL)")

  // insert initial records into the table
  let stmt = db.prepare("INSERT INTO Locations VALUES (?,?,?,?,?,?,?,?)");
  stmt.run(1, "Gage Park", "-79.8287", "43.2422", "Parks", "https://globalnews.ca/wp-content/uploads/2019/06/gage-park-e1587995157718.jpg", 5, false);
  stmt.run(2, "Bayfront Park", "-79.8724", "43.2716", "Parks", "https://d3qvqlc701gzhm.cloudfront.net/thumbs/04e47ab5a6b1180e2de36a1cef6257da20c40313244f664b0ebd39d130f64b3a-750.jpg", 4, false);
  stmt.run(3, "Pier 4 Park", "-79.8676", "43.2740", "Parks", "https://upload.wikimedia.org/wikipedia/commons/7/76/Pier4ParkHamilton2.JPG", 4, false);
  stmt.run(4, "Sam Lawrence Park", "-79.8657", "43.2449", "Parks", "https://live.staticflickr.com/4312/35458728963_6f2bc53106_b.jpg", 2, false);
  stmt.run(5, "Gore Park", "-79.8681", "43.2562", "Parks", "https://i.redd.it/fibj85uvexf31.jpg", 5, false);
  stmt.run(6, "Dundurn Castle", "-79.8846", "43.2695", "Landmarks", "https://upload.wikimedia.org/wikipedia/commons/a/a6/DundurnCastleSummer.JPG", 1, false);
  stmt.run(7, "Albion Falls", "-79.8196", "43.2004", "Landmarks", "https://tourismhamilton.com/media/Albion-Falls-in-summer-custom.jpg", 2, false);
  stmt.run(8, "Eramosa Karst Conservation Area", "-79.8036", "43.1837", "Landmarks", "https://ontariocaves.com/hamilton5.JPG", 1, false);
  stmt.run(9, "Whitehern Historic House and Garden", "-79.8719", "43.2547", "Landmarks", "https://upload.wikimedia.org/wikipedia/commons/2/22/WhitehernMuseumHamilton.JPG", 2, false);
  stmt.run(10, "Sassafras Point Lookout", "-79.9019", "43.2735", "Landmarks", "http://rbg.geotrail.ca/system/point_images/images/37/original/c2.jpg", 1, false);
  stmt.run(11, "Battlefield House", "-79.7661", "43.2176", "Museums", "https://www.museumsontario.ca/sites/default/files/styles/featured-photo-full/public/images/Battlefield%20House%20August%202007_8_0.JPG", 3, false);
  stmt.run(12, "Fieldcote Memorial Park And Museum", "-79.9800", "43.2262", "Museums", "https://theheartofontario.com/wp-content/uploads/2018/11/Fieldcote-Exterior-2-1440x960.jpg", 4, false);
  stmt.run(13, "Art Gallery Of Hamilton", "-79.8724", "43.2572", "Museums", "https://www.thespec.com/content/dam/thespec/news/hamilton-region/2016/09/23/june-30-1914-art-gallery-of-hamilton-officially-opens/B822619009Z.1_20160921122931_000_GHD1N660A.2_Gallery.jpg", 5, false);
  stmt.run(14, "The Hamilton Military Museum", "-79.8847", "43.2681", "Museums", "https://tourismhamilton.com/media/9f60c8a7-3628-49b3-af32-d9b1721ffbee.jpg", 4, false);
  stmt.run(15, "Hamilton Children's Museum", "-79.8257", "43.2435", "Museums", "https://theheartofontario.com/wp-content/uploads/2018/06/Childrens-Museum-exterior-summer-2016-1-1440x960.jpg", 3, false);
  stmt.finalize();

  stmt = db.prepare("INSERT INTO Reviews VALUES (?,?,?,?,?,?)");
  stmt.run(1, 1, "John Smith", "10/10 would visit again", "2019/02/01", false);
  stmt.run(2, 1, "Alan McNab", "it's ok I guess", "2017/12/11", false);
  stmt.run(3, 1, "Albert Aldren", "one of my favourite places!", "2018/09/16", false);
  stmt.run(4, 2, "Ricardo Gomez", "I like it a lot!", "2018/11/05", false);
  stmt.run(5, 5, "Mary Alvino", "nice but noisy", "2011/11/21", false);
  stmt.run(6, 6, "Sam Wilson", "I've seen better.", "2017/03/07", false);
  stmt.run(7, 7, "Charlie Lee", "Very nice little gem in Hamilton! Highly recommend visiting if you haven't already. The surrounding area is great for strolling.", "2020/05/16", false);
  stmt.run(8, 9, "Zack Samuels", "receptionist is rude, don't come here", "2016/10/04", false);
  stmt.run(9, 9, "Jamie Jackson", "a reel treasure and peice of hystorie", "2019/06/11", false);
  stmt.run(10, 15, "Jackie Louis", "this is not a real museum", "2017/08/22", false);
  stmt.finalize();
  
});

// Make the backend available at localhost:3001/api
app.get("/api",
  function (req, res) {

    // log to console that an api request has been received
    console.log("API REQUEST RECEIVED");

    // return all of the animals in the inventory as a JSON array
    if (req.query.act == "getlocations") {

      db.all("SELECT rowid as id, name, lng, lat, filterType, imageUrl, traffic, favourite FROM Locations",
        function (err, results) {
          if (err) {
            // console log error, return JSON error message
            console.log(err);
            res.json({
              "error": "Could not get locations."
            });
          } else {
            // send debug info to console
            console.log(JSON.stringify(results));

            // send back table data as JSON data
            res.json(results);

          }
        });
    }

    // return all of the animals in the inventory as a JSON array
    else if (req.query.act == "getreviews") {

      db.all("SELECT rowid as id, location_id, user, text, date, ownership FROM Reviews",
        function (err, results) {
          if (err) {
            // console log error, return JSON error message
            console.log(err);
            res.json({
              "error": "Could not get reviews."
            });
          } else {
            // send debug info to console
            console.log(JSON.stringify(results));

            // send back table data as JSON data
            res.json(results);

          }
        });
    }

    // add a review
    else if (req.query.act == "addReview") {
      db.run("INSERT INTO Reviews(location_id, user, text, date, ownership) VALUES (?,?,?,?,?)",
        [ 
          req.query.location_id,
          req.query.user,
          req.query.text,
          req.query.date,
          req.query.ownership
        ],
        function (err, results) {
          if (err) {
            // console log error, return JSON error message
            console.log(err);
            res.json({
              "error": "Could not insert review"
            });
          } else {
            console.log(results);
            res.json({
              "status": "Add review successful"
            });
          }

        });

    // update a review
    } else if (req.query.act == "updateReview") {
      db.run("UPDATE Reviews SET location_id=(?), user=(?), " +
        "text=(?), date=(?) WHERE rowid=?",
        [
          req.query.location_id,
          req.query.user,
          req.query.text,
          req.query.date,
          req.query.id
        ],
        function (err, results) {
          if (err) {
            // console log error, return JSON error message
            console.log(err);
            res.json({
              "error": "Could not update review"
            });
          } else {
            console.log(results);
            res.json({
              "status": "Update review successful"
            });
          }

        });

    // delete a review 
    } else if (req.query.act == "deleteReview") {
      db.run("DELETE FROM Reviews WHERE rowid=?",
        [req.query.id],
        function (err, results) {
          if (err) {
            // console log error, return JSON error message
            console.log(err);
            res.json({
              "error": "Could not delete review"
            });
          } else {
            console.log(results);
            res.json({
              "status": "Delete review successful"
            });
          }

        });

    // update a favourite
    } else if (req.query.act == "updateFavourite") {
      db.run("UPDATE Locations SET favourite=(?) WHERE rowid=?",
        [
          req.query.favourite,
          req.query.id
        ],
        function (err, results) {
          if (err) {
            console.log("failed")
            // console log error, return JSON error message
            console.log(err);
            res.json({
              "error": "Could not update location"
            });
          } else {
            console.log(results);
            res.json({
              "status": "Update location successful"
            });
          }

        });

    }

    // if no act is found
    else {
      res.json({
        'error': 'act not found'
      });
    }

  });

// catch all case if no route found
app.get('*', function (req, res) {
  res.json({
    'error': 'route not found'
  });
});

// run the server
var server = app.listen(3001, function () {
  console.log("Atlas Locations Server listening on port 3001!")
});