$(document).ready(function(){
	
	/****************
	Simple Calculator
	*****************/


	var number = "", secondNumber = "", operator = "", answer=0;
	var result = $("#result-window");
	result.text("0");

	function verifyLength(str){
		if(str.length > 14){
			result.text("Error");
			number = "";
		}
	}

	$(".number").click(function(){
		number += $(this).html();
		result.text(number);
		verifyLength(number)

	})

	$("#clear").click(function(){
		result.text("0")
		number = "";
		secondNumber ="";
	})
	
	$(".operator").click(function(){
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
	function resolveAnswer(answer){
		result.text(answer);
		verifyLength(answer)
		number = "";
		secondNumber = "";
	}

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




})