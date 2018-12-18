var wins = 0;
var remGuesses = 12;
var guess= '';
var horrorChar = ["Chucky","Jason","Leatherface","Cujo","Pennywise"];
var compChoice = '';
var blank;

document.onkeyup = function(event) {

    var userGuess = event.key;

    if (remGuesses === 12) {
        compChoice = horrorChar[Math.floor(Math.random() * horrorChar.length)];

        var makeSpaces = function(spaces) {
            var blank = "";
            for (var i = 0; i < spaces; i++) {
            blank += '_ ';
            document.getElementById("word").innerHTML = blank;
        }
    }

alert(compChoice);  
alert(makeSpaces());
}

}