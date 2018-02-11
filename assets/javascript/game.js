// Create a list of lists of words by topic.
var fullList = [["Animals As Leaders", "Helix Nebula", "Planet X"], [
"Spider-Man", "Fight Club:", "Green Mile"]]
	//contains sublists [1] = Music, [2] = Movies

// Create a topic selector for player by way of button.
// when user click topic, randomly generate word from that list.
var x = document.getElementsByClassName("btnChoice");
	


// Select random word from said list.

// Create a simple for loop that generates the 
// underscores "_ _ _ _"  for the length of the word. Call this "getSpaces"
var getSpaces = function(word) {
	var spaces = ''
	for (var i = 0; i < (word.length - 1); i++) {
		spaces += '_ '
	}
	spaces += '_'
	return spaces
}

//getSpaces(word)
// Create a tracker for all unsuccessful letters guessed.
var failedGuess = ''

document.onkeyup = function(event) {

      // Determines which key was pressed.
      var userGuess = event.key;


// If user guesses a letter in the word, find the index(s) of that letter in that word
// and replace the underscores at corresponding index(s) with that letter.

var indexFinder = function (word, letter) {

	indexLst = []

	for (var i = 0; i < word.length; ) {
		if (word[i] === letter) {
			indexLst.push(i)
			i++
		}
		else {
			i++
		}
	}
	return indexLst
}



// If user guesses incorrect letter, add to tracker of unsuccessful letters guessed
// add a body part to the hangman, decrease attempts left by 1.

// if attempts left == 0 user loses. Display try again screen

// If there are no underscores left in wordString. Display win screen.



// function for returning indices of letter in word.
}