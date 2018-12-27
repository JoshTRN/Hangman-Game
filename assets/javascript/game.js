

$(document).ready(function () {

  const themes = {
    philosophy: {
      genre: {
        positions: ["direct realism", "nihilism", "atheism"],
        philosophers: ["David Chalmers", "Akeel Bilgrami", "Karl Marx"]
      },
      background: [
        "assets/images/philosophy.png",
        "assets/images/philosophy.jpg",
        "assets/images/Thinker.jpg"
      ],
      themeMusic: '',
    },
    movies: {
      genre: {
        action: ["This Or That"],
        comedy: [],
        horror: []
      },
      background: ["assets/images/movie1.png", "assets/images/movie2.jpg"],
      themeMusic: ""
    },
    music: {
      genre: {
        metal: [],
        rap: [],
      }
    }
  };

  let theme = "";
  let word = "";
  let guessArray = [];
  let answerArray = [];
  let wrongGuesses = [];
  let guessLeft = 6;

  for (const key in themes) {
    let str = key.charAt(0).toUpperCase() + key.slice(1);
    let button = $(
      `<button class="theme-button btn btn-lg btn-success">${str}</button>`
    );
    $("#buttons").append(button);
  }

  $(".theme-button").on("click", function () {

    theme = $(this)[0].innerHTML;
    $("#header").text(`${theme} Hangman!`);
    theme = theme.toLowerCase();
    let randomPic = themes[theme].background[Math.floor(Math.random() * themes[theme].background.length)];
    let url = `url(${randomPic})`;
    $("body").css({ backgroundImage: url });

    $('#buttons').empty();

    for (const key in themes[theme].genre) {
      let str = key.charAt(0).toUpperCase() + key.slice(1);
      let button = $(`<button class="genre-button btn btn-lg btn-success">${str}</button>`);
      $("#buttons").append(button);
    }
  });


  $(document).on('click', '.genre-button', function () {

    $('#buttons').empty();
    $('#message').text('Guess the word!');

    let genre = $(this)[0].innerHTML.toLowerCase();
    let genreArray = themes[theme].genre[genre];
    word = genreArray[Math.floor(Math.random() * genreArray.length)].toLowerCase();
    console.log(word);

    answerArray = word.toLowerCase().split(' ')
    guessArray = answerArray.map(elem => new Array(elem.length).fill().map(i => i = '_'));
    answerArray = answerArray.map(elem => elem.split(''));

    let str = guessArray.map(elem => elem.join(' ')).join('\xa0 \xa0');

    let h1 = $('<h1 id="word-spaces">');

    h1.text(str);
    $('#buttons').append(h1);
  })

  document.onkeyup = function (event) {

    if (guessLeft === 0) return;

    let guess = event.key;

    if (word.includes(guess)) {
      for (let i in answerArray) {
        for (let j in answerArray[i]) {
          if (answerArray[i][j] === guess) {
            guessArray[i][j] = guess.toUpperCase();
          }
        }
      }
      $('#word-spaces').text(guessArray.map(elem => elem.join(' ')).join('\xa0 \xa0'));
      console.log(guessArray.map(elem => elem.join('').toLowerCase()).join(' '), word);
      if (guessArray.map(elem => elem.join('').toLowerCase()).join(' ') === word) {
        $('#message').empty()
        $('#message').append(`<div class="alert alert-success text-center" role="alert">
          Congrats! You win!
          </div>`);
        }
      } else {
        
        if (!wrongGuesses.includes(guess)) {
        
        guessLeft--;
        $('#guesses-left').text(`Guesses Left: ${guessLeft}`);
        
        wrongGuesses.push(guess);
        $('#wrong-guesses').text( `Already Guessed: ${wrongGuesses.join(', ')}`);

        if (guessLeft === 0) {
          $('#message').empty();
          
          $('#message').append(`<div class="alert alert-danger text-center" role="alert">
          Sorry, try again!
          </div>`);
        }
      }
    }
  }

});
