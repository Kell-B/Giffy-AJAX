// gif = $(this).data("name");
//queryURL = api.giphy.com/v1/gifs/search + gif + 1obEZoPPKMJDJuEVAGU2hkx7hWpjfQBr&limit=10;
// Instructions
// 1. Before you can make any part of your site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
// 2. We chose animals for our theme, but you can make a list to your own liking.
// 3. Your app should take the topics in this array and create buttons in your HTML.
// 4. Try using a loop that appends a button for each string in the array.
// 5.  When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// 6.  When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// 7. Under every gif, display its rating (PG, G, so on).
// 8. This data is provided by the GIPHY API.
// 9. Only once you get images displaying with button presses should you move on to the next step.
// 10. Add a form to your page that takes a value from a user input box and adds it to your topics array. Then make a function call that takes each topic in the array and remakes the buttons on the page.
// 11. Deploy your assignment to Github Pages.

// Rejoice! You just made something really cool.

$(document).ready(function() {
	var memes = [ 'funny memes', 'sad memes', 'weird memes', 'classic memes' ];

	function renderButtons() {
		$('#buttonView').empty();
		for (let i = 0; i < memes.length; i++) {
			gifBtn = $('<button class="btn btn-primary mt-5 mx-3 gif-btn text-capitalize">');
			//gifBtn.addClass('btn btn-primary mt-5 mx-3 gif-btn text-capitalize');
			gifBtn.attr('data-name', memes[i]);
			gifBtn.text(memes[i]);
			$('#buttonView').append(gifBtn);
		}
	}

	$('#add-btn').on('click', function(event) {
		event.preventDefault();
		var newMeme = $('#search-bar').val().trim();

		$('#search-bar').val('');
		memes.push(newMeme);
		console.log(memes);
		renderButtons();
	});

	renderButtons();
	// var space = ["planets", "stars", "nebulas", "rockets", "telescopes", "galaxy"];
	//$(document).on(“click”, “.gif-btn”, displayGifs);
	$(document).on('click', '.gif-btn', function() {
		var gifBtn;

		var gif = $(this).attr('data-name');

		var queryURL =
			'https://api.giphy.com/v1/gifs/search?q=' + gif + '&api_key=ZN5bvG5xzMUp8C2VWT22c1w9BorJLWfP&limit=10';

		console.log(queryURL);

		$.ajax({
			url    : queryURL,
			method : 'GET'
		}).then(function(response) {
			console.log(response);
			for (let i = 0; i < response.data.length; i++) {
				var imageStill = response.data[i].images.downsized_still.url;
				var imageAnimate = response.data[i].images.downsized_large.url;
				var rating = response.data[i].rating;
				var displayRating = $('<p style=‘text-transform: capitalize;’>').html('Gif rating: ' + rating);
				var newDiv = $('<div>');
				console.log(rating);
				var displayGif = $('<img>').attr('src', imageStill);
				newDiv.append(displayGif);
				$('#gif-div').prepend(newDiv);
				$('img').attr('data-state', 'still');
				$('img').addClass('gif');
				displayGif.attr('data-animate', imageAnimate);
				displayGif.attr('data-still', imageStill);
				newDiv.append(displayRating);
			}
		});

		$(document).on('click', '.gif', function() {
			console.log('hi');
			var state = $(this).attr('data-state');

			var still = $(this).attr('data-still');

			var animate = $(this).attr('data-animate');

			if (state === 'still') {
				state = 'animate';
				$(this).attr('src', animate);
				$(this).attr('data-state', state);
			} else if (state === 'animate') {
				state = 'still';
				$(this).attr('src', still);
				$(this).attr('data-state', state);
			}
		});
	});
});
