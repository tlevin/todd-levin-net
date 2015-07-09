$(document).ready(function(){
	
	/****************
	Simple Calculator
	*****************/
	var number = "", secondNumber = "", operator = "", answer=0, temp = 0;
	var result = $("#result-window");
	result.text("0");

	function verifyLength(str){ //makes sure input isn't larger than display can handle.
		if(str.length > 14){
			result.text("Error");
			number = "";
		}
	}
	function resolveAnswer(answer){ //prints answer to display, clears values for next operation.
		result.text(answer);
		verifyLength(answer)
		temp = number
		number = "";
		secondNumber = "";
	}



	$(".number").click(function(){
		number += $(this).html();
		result.text(number);
		verifyLength(number)

	})

	$("#decimal").click(function(){
		if(number.indexOf(".") === -1){
			number += "."
		} 
	})

	$("#clear").click(function(){
		result.text("0");
		number = "";
	})

	$("#clearall").click(function(){
		result.text("0")
		number = "";
		secondNumber ="";
		answer = "";
		temp = "";
	})
	
	$(".operator").click(function(){ //stores first number, and operator.
		if(number === ""){
			number = answer;
		}
		secondNumber = number;
		number = "";
		operator = $(this).html();
		result.text("0")
	})
	
	$("#plus-minus").click(function(){ 
		if(number[0] === "-"){
			number = number.substring(1);
			result.text(number);
		} else {
			number = "-" + number;
			result.text(number);
		}
	})

	
	$("#equal").click(function(){
		if(number === "" && secondNumber === ""){
			number = temp;
			secondNumber = answer;
		}

		if(operator === "+"){
			answer = parseInt(number)+parseInt(secondNumber);
			resolveAnswer(answer);
		} else if (operator === "-"){
			answer = parseInt(secondNumber)-parseInt(number);
			resolveAnswer(answer);
		} else if (operator === "*"){
			answer = parseInt(secondNumber)*parseInt(number);
			resolveAnswer(answer);
		} else if (operator === "/"){
			answer = parseInt(secondNumber)/parseInt(number);
			resolveAnswer(answer);
		}
	})

/*************************************
	Tic Tac Toe
**************************************/
var turnCount = 0, player = 0;
function currentPlayer(){
	if(turnCount %2 !== 0){
		player = 1;
	} else {
		player = -1;
	}
}
function playerMark(player){
	return player == 1 ? "X" : "O"
}
$(".gamesquare").click(function(){
	turnCount++;
	if(!$(this).hasClass("taken")){
		$(this).text(playerMark(currentPlayer))
		$(this).addClass("taken");
	} else {
		alert("Please choose a different square.")
	}
	
})

})