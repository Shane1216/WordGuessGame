let darkSouls = {
    //Created word pool for game to choose from
	wordsToPick: {
		"solaire" : {
			picture: 'solaire.jpg',
			title: 'of astora',
		}, 
		"siegmeyer" : {
			picture: 'siegmeyer.jpg',
			title: 'of catarina',
		}, 
		"gwyn" : {
			picture: 'toto.jpg',
			title: 'lord of cinder',
		}, 
		"ciaran" : {
			picture: 'ciaran.jpg',
			title: 'lord\'s blade',
		}, 
		"ornstein" : {
			picture: 'ornstein.jpg',
			title: 'dragon knight',
		}, 
		"smough" : {
			picture: 'smough.jpg',
			title: 'executioner',
		}, 
		"seath" : {
			picture: 'seath.jpg',
			title: 'the scaleless',
		}, 
		"artorias" : {
			picture: 'artorias.jpg',
			title: 'the abysswalker',
		},
    },
    
	wordInPlay: null,
	lettersInWord: [],
	matchedLetters: [],
	guessedLetters: [],
	guessesLeft: 0,
	totalGuesses: 0,
	letterGuessed: null,
	wins: 0,

	//Function to pick a word from the wordsToPick object
	createGame: function() {	
		var objKeys = Object.keys(this.wordsToPick);
		this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

		this.lettersInWord = this.wordInPlay.split('');
		this.rebuildView();
		this.processUpdateTotalGuesses();
	},
	
	 //Function to create the current word view and let the user know
	 //characters they have guessed right and how many they have left
	 rebuildView: function() {
		var wordView = "";

		for(var i=0; i < this.lettersInWord.length; i++){
			if (this.matchedLetters.indexOf(this.lettersInWord[i]) != -1){
				wordView += this.lettersInWord[i];				
			}else{
				wordView += ' _ ';
			}
		}

		document.querySelector('#current-word').innerHTML = wordView;

	},
	
	//Function that updates the game view when the user guesses a character,
	//runs out of guesses or wins the game
	updateView: function(letter) {
		if (this.guessesLeft == 0){
			this.restartGame();
		}else{
			this.updateGuesses(letter);

			this.updateMatchedLetters(letter);

			this.rebuildView();

			if (this.updateWins() == true){
				this.restartGame();
			}
		}

    },
	//Function to update the number of guesses the user has remaining and
	//to track which letters have been pressed
	updateGuesses: function(letter){

		if ((this.guessedLetters.indexOf(letter) == -1) && (this.lettersInWord.indexOf(letter) == -1)){
			
			this.guessedLetters.push(letter);

			this.guessesLeft--;

			document.querySelector('#guesses-remaining').innerHTML = this.guessesLeft;

			document.querySelector("#guessed-letters").innerHTML = this.guessedLetters.join(', ');
		}
	},
	
    //Function to track number of guesses that the user has left
	processUpdateTotalGuesses: function() {
		this.totalGuesses = 10;
		this.guessesLeft = this.totalGuesses;

		document.querySelector('#guesses-remaining').innerHTML = this.guessesLeft;
	},
	
    //Function that writes a correct letter to the current word view
	updateMatchedLetters: function(letter){
		for (var i = 0; i < this.lettersInWord.length; i++) {
			if ((letter === this.lettersInWord[i]) && (this.matchedLetters.indexOf(letter) == -1)){
				this.matchedLetters.push(letter);
			};
		};
    },
   
    //Allows the game to be restarted once the user has run out of
    //guesses or the user has won
	restartGame : function(){
		document.querySelector('#guessed-letters').innerHTML = '';
		this.wordInPlay = null;
		this.lettersInWord = [];
		this.matchedLetters = [];
		this.guessedLetters = [];
		this.guessesLeft = 0;
		this.totalGuesses = 0;
		this.letterGuessed = null;
		this.createGame();
		this.rebuildView();
    },
    //If all characters selected by the user (before they run out of guesses) 
    //match with the characters selected by the game then the number of wins is
    //updated and a new round is started
	updateWins: function() {

		if (this.matchedLetters.length == 0){
			var win = false;
		}else{
			var win = true
		}
		
		for (var i=0; i < this.lettersInWord.length; i++){
			if (this.matchedLetters.indexOf(this.lettersInWord[i]) == -1){
				win = false;
			}
		}

		if (win == true){
			this.wins =  this.wins + 1;
			
			document.querySelector('#wins').innerHTML = this.wins;

			document.querySelector('#title').innerHTML = this.wordInPlay + " " + this.wordsToPick[this.wordInPlay].title;

			document.querySelector('#gameDiv').innerHTML = '<img class="darkImage" src="assets/images/' + this.wordsToPick[this.wordInPlay].picture + '" alt="' + this.wordsToPick[this.wordInPlay].title + '">';

			return true;
		}else{
			return false;
		}
	}
};

darkSouls.createGame();
//Allows the game to get user input and update the game view accordingly
document.onkeyup = function(event) {
	darkSouls.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	darkSouls.updateView(darkSouls.letterGuessed);
}