$(document).ready(function(){
	
	/****************
	Simple Calculator
	*****************/


	var number = "", secondNumber = "", operator = "", answer=0;
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

var turnCount = 1;

function isTurn(){
	if(turnCount%2 === 0){
		return false;
	}
	return true;
}



})