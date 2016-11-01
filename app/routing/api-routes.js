// Your api-routes.js file should contain two routes:

// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
// ===============================================================================

var friends = require('../data/friends.js');
var path = require('path');

module.exports = function (app) {
	// API GET Requests
	// Below code handles when users "visit" a page.

	app.get('/api/friends', function (req, res) {
		res.json(friends);
	});

	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	
	app.post('/api/friends', function (req, res) {
		var match = {};
		var diffArray = [];
		var totalNew = 0;
		var count = 0;
		var index = 0;
		var total = 0;
		var totalArray = [];
		var differenceTotal = 0;
		totalNewArray();
		//calculates total of question values of user's input
		function totalNewArray(){
			for (var i = 0; i<req.body.scores.length; i++){
			totalNew += parseInt(req.body.scores[i]);
			}

			console.log(totalNew);
			pushArray();
		}
		//calculates total of the question values of the list of friends in friends.js
		function pushArray() {
			for (var i = 0; i<friends.length; i++) {
				for (var x = 0; x<friends[i].scores.length; x++) {
					total += parseInt(friends[i].scores[x]);
				}
				totalArray.push(total);
				total = 0;
			}
			console.log(totalArray);
			difference();
		}
		//calculates the difference between user's score and friends in the list
		function difference(){
			for (var j = 0; j<totalArray.length; j++) {
				differenceTotal = Math.abs(parseInt(totalNew) - parseInt(totalArray[j]));
				diffArray.push(differenceTotal);
				differenceTotal = 0;
			}
			console.log("This is the diffarray " + diffArray);
			indexOfSmallest();
		}
		//grabs the index of the array of the smallest difference thus finding the most compatible friend
     	function indexOfSmallest() {
			index = 0;
			var value = diffArray[0];
			for (var i = 1; i < diffArray.length; i++) {
 				if (diffArray[i] < value) {
    				value = diffArray[i];
    				index = i;
  				}
			}
			matchSelect();
		}
		//putting the result into a new object
		function matchSelect() {
			match = {
				name: friends[index].name,
				photo: friends[index].photo
			};
		}
		console.log("Match found: " + match.name + "\n");
		friends.push(req.body);
		res.json(match);

	});
};
