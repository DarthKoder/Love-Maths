/**
 * Two types of event listeners:
 * Code that will be executed when the page has finished loading.
 * Code that executes when a button is clicked.
 */
// Wait for the DOM to finish loading before running the game.
// Get the button elements and add event listeners to them.

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button"); // This will create an array of all button elements

    // more modern syntax, keep it simpler to read rather than use index notation ( let i = 0; i < buttons.legth; i++).
    for (let button of buttons) {
        button.addEventListener("click", function() {
            // This. refers to the button that was just clicked i.e. addition, submit etc.
            // get.Attribute refers to the button that was clicked, in this instance, data-type, which is the submit button.
            // We removed alert("You clicked Submit!"), to know call the checkAnswer() function, to render the answer. 
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            // If it is not equal to "Submit" then the "else" will tell us what button was clicked and what game the user wants to play.
            // An alert will pop up stating what gameType was clicked. This is done with a template literal, using the back ticks and ${gameType}. 
            } else {
                let gameType = this.getAttribute("data-type");
                // Rather than displaying an aklert when the user clicks the button, it will call the function and start the addition game automatically.
                runGame(gameType);
            }
        })
    }

    /* This adds and event listener to the document page, waiting for the key property, "keydown" event to happen 
    that is equal to "Enter", which will then call the checkAnswer function
    */
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    // This will call the function to run addition game on page/document load.
    runGame("addition");

})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed.
 */
// The function has the perameters of gameType and the if statement will check what gameType it will run.
function runGame(gameType) {

    // This is to clear the answer box from any previouse ansers upon reload or submit. 
    document.getElementById("answer-box").value = "";
    /* We set the focus here to make our cursor automatically be in the sanswer box so the user 
    does not have to click or tap on the box every time - giving the answer box the focus.
    */
    document.getElementById("answer-box").focus();
    // Creates random integer numbers between 1 and 25.
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    // This will check and call the appropriate gameType.
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    // Adding the else if to give the option of calling the "multiply" game function: displayMultiplyQuestion().
    // We still have the num1 and num2 random generated numbers to use, we just need to change the operator.
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    // Adding the else if to give the option of calling the "subtract" game function: displaySubtractQuestion().
    // We still have the num1 and num2 random generated numbers to use, we just need to change the operator.
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);

    // We added the else incase the game type is unknown. We will then alert the user that there is an error with an unknown game type.
    // The JavaScript keyword "throw". This will stop the game from running and supply the error message we supply in the console i.e "....Aborting!".
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`
    }
}

/**
 * Checks the answer against the first element in 
 * the returned calculateCorectAnswer array.
 * We get the users guess from the DOM
 * and compare that answer with the answer that we have calculated.
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    // If the answer is the same as in isCorrect function ghive that alert or else it is the wroung alert.
    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awwww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    // Run the game and givbe the answer. 
    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers (parseInt for integers and to not have the text returned as a string)) 
 * and the operator (plus, minus etc)
 * directly from the dom, calculate and returns the correct answer.
 */
// Helper function
function calculateCorrectAnswer() {
    // Start reading our values from the DOM and storing them as variables.
    // We grab the innText which is the vbalue of the HTML element with the specific ID.
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    // If the operator is equal to "+", calculate, then return the sum. It will also keep playing the addition gameType.
    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    // If the operator is equal to "x", calculate, then return the sum. It will also keep playing the multiply gameType.
    //Note: using the "*" symbol for multiplication. 
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    // If the operator is equal to "-", calculate, then return the sum. It will also keep playing the subtract gameType. 
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1.
 */
// Displays number of correct answers.
function incrementScore() {

    // This will get the text value of the html with the id of "score".
    // we use ++ before oldScore so it adds 1 to oldScore and returns, otherwise it would return oldScore before adding the 1.
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1.
 */
// Displays number of wrong answers
function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;

}

// Funtions that display our questions

// Will be called by the "Addition ${gameType}". The accepted arguments are the operand 1 & 2.
// Calling the element ID and displaying the textContent i.e number of operand1 or the operator set (+).
function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    
    /* We use > to ensure that operand1 is greater than operand2 the the ternary operator to keep everything on 
    one line and ask if operand1 is bigger than operand 2 ?, if it is then it will return operand 1 , 
    else return operand 2. Then the other way round for our second number. (? true : false returns). 
    */
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
    }

// Here we change the operator to the "x" for multiplication and UX rather than the "*".
function displayMultiplyQuestion(operand1, operand2) {
    
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";

}

function displayDivisionQuestion() {
    
}
