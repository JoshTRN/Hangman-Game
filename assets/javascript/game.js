

$(document).ready(function () {

  let theme = "";
  let word = "";
  let guessArray = [];
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
        action: [],
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
    word = genreArray[Math.floor(Math.random() * genreArray.length)];
    console.log(word);

    for (let index in word) {
      guessArray.push('_')
    }

    console.log(guessArray);

    let h2 = $('<h1 id="word-spaces">');

    h2.text(guessArray.join(' ').toUpperCase());
    $('#buttons').append(h2);
  })

  document.onkeyup = function (event) {
    let guess = event.key;

    if (word.indexOf(guess) > -1) {
      for (let i in word) {
        if (word[i] === guess) {
          guessArray[i] = guess.toUpperCase()
        }
      }
      $('#word-spaces').text(guessArray.join(' '));
    } else {

      if (!guessArray.join('').toLowerCase() === word) {
        wrongGuesses.push(guess)
        $('#wrong-guesses').text("Already guessed: " + wrongGuesses.join(', '));
      }
    }
  }
});
