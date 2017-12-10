function Game(letters) {
    this.answer = '';
    this.guessed = [];
    this.lives = 10;
    this.possibilities = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    
    this.blankedAnswer = function() {
        var a = this.answer;
        for (var i = 0; i < this.possibilities.length; i++) {
            if (!this.guessed.includes(this.possibilities[i])) {
                a = a.replace(new RegExp(this.possibilities[i],'g'),'*');
            }
        }
        return a;
    };
    
    this.guess = function(letter) {
        var btn = document.getElementById('btn' + letter);
        var clue = document.getElementById('clue');

        btn.disabled = true;
        this.guessed.push(letter);

        var blanked = this.blankedAnswer();
        if (clue.innerHTML === blanked) {
            this.lives--;
            this.refreshLives();
        } else {
            clue.innerHTML = this.blankedAnswer();
        }
        
        if (this.lives === 0) {
            alert('UNLUCKY, You Lost! Have another go.');
            this.newgame();
        }

        if (this.answer === clue.innerHTML) {
            alert('CONGRATULATIONS, You Won! You guessed \'' + this.answer + '\'');
            this.newgame();
        }
    }

    this.newgame = function() {
        var board = document.getElementById('board');
        var clue = document.getElementById('clue');
        var keyboard = document.getElementById('keyboard');
        var numlives = document.getElementById('lives');

        this.answer = getAnswer();
        this.guessed = [];
        this.lives = 10;
        clue.innerHTML = this.blankedAnswer();
        this.refreshLives();
        this.refreshKeyboard(keyboard);
    };

    this.refreshLives = function() {
        var numlives = document.getElementById('lives');
        numlives.innerHTML = this.lives.toString();
    }

    this.refreshKeyboard = function(keyboard) {
        keyboard.innerHTML = '';
        for (var i = 0; i < this.possibilities.length; i++) {
            keyboard.innerHTML = keyboard.innerHTML +
                '<button id="btn' + this.possibilities[i] + '" class="btn" type="button" onclick="game.guess(\'' + this.possibilities[i] + '\')">' + this.possibilities[i] + '</button>';
        }
    }

    // initialise
    this.newgame();
}

function getAnswer() {
    return answers[Math.floor(Math.random() * answers.length)];
}

var answers = [
    'aardvark',
    'badger',
    'capybara',
    'crocodile',
    'elephant',
    'gorilla',
    'giraffe',
    'hyena'
]

var game = new Game();
