

$(document).ready(function () {

  let theme = "";
  let word = "";
  let guessArray = [];
  let answerArray =[];
  let wrongGuesses = [];
  let guessLeft = 6;

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

    let h2 = $('<h1 id="word-spaces">');

    h2.text(str);
    $('#buttons').append(h2);
  })

  document.onkeyup = function (event) {
    let guess = event.key;

    if (word.indexOf(guess) > -1) {
      for (let i in answerArray) {
        for (let j in answerArray[i]) {
          console.log(answerArray[i][j], j);
          if (answerArray[i][j] === guess) {
            console.log(guessArray[i][j]);;
            guessArray[i][j] = guess.toUpperCase();
            console.log(guessArray[i][j]);
          }
        }
      }
      $('#word-spaces').text(guessArray.map(elem => elem.join(' ')).join('\xa0 \xa0'));
    } else {

      if (!guessArray.map(elem => elem.join(' ')).join('\xa0 \xa0') === word) {
        wrongGuesses.push(guess)
        $('#wrong-guesses').text("Already guessed: " + wrongGuesses.join(', '));
      }
    }
  }
});
