$(document).ready(function(){
	
	/****************
	Simple Calculator
	*****************/
	var Calculator = function(){ //declare a calculator object constructor to isolate variables from global scope
		 this.number = "", this.secondNumber = "", this.operator = "", this.answer=0, this.temp = 0;
			this.result = $("#result-window");
		this.result.text("0");

	this.verifyLength = function(str){ //makes sure input isn't larger than display can handle.
		if(str.length > 14){
			this.result.text("Error");
			this.number = "";
		}
	}
	this.resolveAnswer = function(answer){ //prints answer to display, clears values for next operation.
		this.result.text(this.answer);
		this.verifyLength(this.answer)
		this.temp = this.number
		this.number = "";
		this.secondNumber = "";
	}
};
	var calc = new Calculator(); //initiate new calc object

	$(".number").click(function(){
		calc.number += $(this).html();
		calc.result.text(calc.number);
		calc.verifyLength(calc.number)

	})

	$("#decimal").click(function(){
		if(calc.number.indexOf(".") === -1){
			calc.number += "."
		} 
	})

	$("#clear").click(function(){
		calc.result.text("0");
		calc.number = "";
	})

	$("#clearall").click(function(){
		calc.result.text("0")
		calc.number = "";
		calc.secondNumber ="";
		calc.answer = "";
		calc.temp = "";
	})
	
	$(".operator").click(function(){ //stores first number, and operator.
		if(calc.number === ""){
			calc.number = calc.answer;
		}
		calc.secondNumber = calc.number;
		calc.number = "";
		calc.operator = $(this).html();
		calc.result.text("0")
	})
	
	$("#plus-minus").click(function(){ 
		if(calc.number[0] === "-"){
			calc.number = calc.number.substring(1);
			calc.result.text(calc.number);
		} else {
			calc.number = "-" + calc.number;
			calc.result.text(calc.number);
		}
	})

	
	$("#equal").click(function(){
		if(calc.number === "" && calc.secondNumber === ""){ //if equals button is hit without entering any new numbers
			calc.number = calc.temp;
			calc.secondNumber = calc.answer;
		}

		if(calc.operator === "+"){
			calc.answer = parseFloat(calc.number)+parseFloat(calc.secondNumber);
			calc.resolveAnswer(calc.answer);
		} else if (calc.operator === "-"){
			calc.answer = parseFloat(calc.secondNumber)-parseFloat(calc.number);
			calc.resolveAnswer(calc.answer);
		} else if (calc.operator === "*"){
			calc.answer = parseFloat(calc.secondNumber)*parseFloat(calc.number);
			calc.resolveAnswer(calc.answer);
		} else if (calc.operator === "/"){
			calc.answer = parseFloat(calc.secondNumber)/parseFloat(calc.number);
			calc.resolveAnswer(calc.answer);
		}
	})

/*************************************
	Tic Tac Toe
**************************************/

var TicTacToe = function(){
	this.turnCount = 1;
	this.player = 0;
	this.result = []
	this.gameOver = false;
	this.initBoard = function(){
		for (var i = 0; i < 3; i++) {
			this.result[i] = []
			for (var j = 0; j < 3; j++) {
				this.result[i][j] = 0
			};
		};
	}
	this.trackMove = function(value){
		this.result[Math.floor(value/3)][value - (3*(Math.floor(value/3)))] = this.player;
	}

	this.currentPlayer = function(){
		if(this.turnCount %2 !== 0){
			this.player = 1;
		} else {
			this.player = -1;
		}
	}
	this.playerMark = function(player){
	return this.player === 1 ? "X" : "O"
}
	this.checkAcross = function() {
		for (var i = 0; i < 3; i++) {
			var totalAcross = this.result[i][0] + this.result[i][1] + this.result[i][2]
			if(totalAcross === 3 || totalAcross === -3){
				return true
		}
	} return false;
}
	this.checkDown = function(){
		for (var i = 0; i < 3; i++) {
			var totalDown = this.result[0][i] + this.result[1][i] + this.result[2][i]
			if(totalDown === 3 || totalDown === -3){
				return true
		}
	} return false;
}
	this.checkCross = function(){
		var crossLeft = this.result[0][0] + this.result[1][1]+ this.result[2][2]
		var crossRight = this.result[0][2] + this.result[1][1] + this.result[2][0]
		
		if(crossRight === 3 || crossRight === -3 || crossLeft === 3 || crossLeft === -3){
			return true
		}
		return false;
	}
	this.checkWin = function(){
		if(this.checkAcross() || this.checkDown() || this.checkCross()){
			$("#messagecenter").text(this.playerMark(this.currentPlayer) + " has won!")
			this.gameOver = true;
		}
	}
	this.outMoves = function(){
		if(this.turnCount >9){
			$("#messagecenter").text("The game has resulted in a draw")
			this.gameOver = true;
		}
	}
	
};
var game = new TicTacToe();
game.initBoard();
$(".gamesquare").click(function(){
	if(game.gameOver === false){
		game.currentPlayer();
	if(!$(this).hasClass("taken")){
		$(this).text(game.playerMark(game.currentPlayer))
		$(this).addClass("taken");
		game.trackMove($(this).attr("id"))
		game.turnCount++
	} else {
		alert("Please choose a different square.")
	}
	game.checkWin();
	game.outMoves();
	}
})
$("#reloadButton").click(function(){
	location.reload();
})

/*************************************
	Hangman
**************************************/


var Hangman = function(){
	this.secretWord = "";
	this.newWord = "";
	this.keyEntered = "";
	this.turnsLeft = 5;
	this.lettersUsed = ""
	this.hasWon = false;
	this.convertWord= function(str){
		str = str.toLowerCase();
		this.secretWord = str;
		for (var i = 0; i < str.length; i++) {
			if(str[i].match(/[a-z]/)){
				this.newWord += "_"
			}
			else {
				this.newWord += str[i]
			}
		};
		};
	this.checkWin = function(){
		if(this.newWord === this.secretWord){
			$("#resultText").text("You Win!")
			this.hasWon = true;
			$("#letterEntry").addClass("hide");
			$("#hangReloadButton").removeClass("hide");
		}
		if(this.turnsLeft === 0){
			$("#resultText").text("You lost, try again.")
			$("#letterEntry").addClass("hide");
			$("#hangReloadButton").removeClass("hide");
		}
	}
	this.updatePic = function(){
		$('#hangboard').css({'background-image': 'url(./images/hang' + this.turnsLeft + '.png)'})

		}

	this.updateMessage = function(){
		$("#messageDisplay").text(this.newWord)
		$("#lettersUsed").text(("Letters used: " + this.lettersUsed))
	}

	this.checkLetter = function(key){
		if(key.match(/[a-z]/)){
			if(this.secretWord.indexOf(key)=== -1){
				while(this.lettersUsed.indexOf(key) === -1){
					this.lettersUsed += key;
					this.turnsLeft--;
					this.updatePic(this.turnsLeft);
					
				}
		}	else{
				for (var i = 0; i < this.secretWord.length; i++) {
					if(this.secretWord[i].match(key)){
						this.newWord = this.newWord.substring(0,i) + key + this.newWord.substring(i+1,this.newWord.length);
					}
				};
		} 
	}
}
}

var hGame = new Hangman();

$("#newGame").click(function(){
	$(this).addClass("hide");
	$("#textEntry").removeClass("hide");

})
	
$("form").bind("keydown", function(e) { //deactivates "enter" key for form input
   if (e.keyCode === 13) return false;
 });

$("#doIt").click(function(){
	hGame.secretWord = $("#textInput").val();
	if(hGame.secretWord.length > 30){
		$("#textEntry").fadeOut()
		$("#resultText").fadeIn(10)
		$("#resultText").text("Please enter a smaller word");
		$("#resultText").fadeOut(1000)
		$("#textEntry").fadeIn(10)
	} else if (hGame.secretWord){
		$("#textEntry").addClass("hide");
		$("#hangGame").removeClass("hide");
		hGame.convertWord(hGame.secretWord);
		hGame.updateMessage();
		$("#hangboard").css('background-image', 'url(./images/hang5.png)');
	};
})

$("#letterEntry").keyup(function(){
	if(hGame.turnsLeft > 0 && hGame.hasWon === false){
		hGame.keyEntered = String.fromCharCode(event.which).toLowerCase()
		hGame.checkLetter(hGame.keyEntered);
		hGame.checkWin();
		hGame.updateMessage();
		$("#letterEntry input").val("");
} 
})

$("#hangReloadButton").click(function(){
	location.reload();
})

})