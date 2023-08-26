// Header Section

const numberConverter = document.querySelector("#converterTab");
const testGenerator = document.querySelector("#testGeneratorTab");
const cheatsheet = document.querySelector("#cheatsheetTab");

// Number Converter - Inputs

const binaryInput = document.querySelector(".binaryInput");
const decimalInput = document.querySelector(".decimalInput");
const hexaInput = document.querySelector(".hexaInput");

// Number Converter - Buttons

const binaryConvert = document.querySelector("#binaryConvert");
const decimalConvert = document.querySelector("#decimalConvert");
const hexaConvert = document.querySelector("#hexaConvert");

// Number Converter - Hex Arrays

const hexAlphaArr = ["A","B","C","D","E","F"];
const hexNumericArr = [10,11,12,13,14,15];
const hexBinaryArr = [1010,1011,1100,1101,1110,1111];

// Test Generator - Options

const generateTest = document.querySelector(".generateTest");
const checkTest = document.querySelector(".checkTest");
const randomizeTrigger = document.querySelector("#randomizeTrigger");

// Test Generator - Test Menu

const testMenu = document.querySelector(".test-menu");
const testTitle = document.querySelector(".test-title");

// Number Type Array

const numberTypes = ["binary", "decimal", "hexadecimal"];

numberConverter.addEventListener("click", () => {
    document.getElementById("converter").style.display = "grid";
    document.getElementById("test-generator").style.display = "none";
});

testGenerator.addEventListener("click", () => {
    document.getElementById("converter").style.display = "none";
    document.getElementById("test-generator").style.display = "grid";
});

cheatsheet.addEventListener("click", () => {

});

generateTest.addEventListener("click", () => {
    let questionQuantity = document.getElementById("testQuantity").value;
    let questionConvertFrom = document.getElementById("testConvertFrom").value;
    let questionConvertTo = document.getElementById("testConvertTo").value;

    clearTest();

    if (randomizeTrigger.checked) {
        for(i = 0; i < questionQuantity; i++) {

            questionConvertFrom = randomizeItem();
            questionConvertTo = randomizeItem(questionConvertFrom);

            createTestCard(questionConvertFrom, questionConvertTo, i + 1)
        }
    } else {
        if (questionConvertFrom == questionConvertTo) {
            console.log("Error Cannot Convert Similiar Number Systems");
            // FUTURE WORK !!;
        } else {
            for(i = 0; i < questionQuantity; i++) {
                createTestCard(questionConvertFrom, questionConvertTo, i + 1)
            }
        }
    }

    updateTestTitle(questionConvertFrom, questionConvertTo, randomizeTrigger.checked)
    
});

checkTest.addEventListener("click", () => {
    testMenu.childNodes.forEach((item) => {
        let from = item.firstChild.lastChild.dataset.from;
        let to = item.firstChild.lastChild.dataset.to;
        
        let answer = item.lastChild.firstChild;
        let given = item.firstChild.lastChild.dataset.problem;
        let solution;

        if(from == "binary" && to == "decimal") {
            solution = binaryToDecimal(Array.from(given));
        } else if (from == "binary" && to == "hexadecimal") {
            solution = binaryToHex(Array.from(given));
        } else if (from == "decimal" && to == "binary") {
            solution = decimalToBinary(given);
        } else if (from == "decimal" && to == "hexadecimal") {
            solution = decimalToHexa(given);
        } else if (from == "hexadecimal" && to == "binary") {
            solution = hexaToBinary(Array.from(given));
        } else if (from == "hexadecimal" && to == "decimal") {
            solution = hexaToDecimal(Array.from(given));
        }

        console.log(solution);

        if (solution == answer.value) {
            answer.style.backgroundColor = "lightgreen"
        } else {
            answer.style.backgroundColor = "lightpink"
        }
    });
}); 

function updateTestTitle(convertFrom, convertTo, randomize) {
    if(randomize) {
        testTitle.textContent = "Randomized Test";
    } else {
        let capitalizeFrom = convertFrom.charAt(0).toUpperCase() + convertFrom.slice(1);
        let capitalizeTo = convertTo.charAt(0).toUpperCase() + convertTo.slice(1);

        testTitle.textContent = capitalizeFrom + " to " + capitalizeTo;
    }
}

function randomizeItem(exclusion) {
    let randomArray = ["binary", "decimal", "hexadecimal"];

    if (exclusion != undefined) {
        randomArray.splice(randomArray.indexOf(exclusion), 1);
    }

    let randomizedItem = randomArray[Math.floor(Math.random() * randomArray.length)];
    return randomizedItem;
}

binaryConvert.addEventListener("click", () => {
    if (binaryInput.validity.valid) {
        console.log("Valid!");
        updateDecimal(binaryToDecimal(Array.from(binaryInput.value)));
        updateHexa(binaryToHex(Array.from(binaryInput.value)));
    } else {
        console.log("Invalid");
    }
});

decimalConvert.addEventListener("click", () => {
    if(decimalInput.validity.valid) {
        console.log("Valid!");
        updateBinary(decimalToBinary(decimalInput.value));;
        updateHexa(decimalToHexa(decimalInput.value));
    } else {
        console.log("Invalid");
    }
});

hexaConvert.addEventListener("click", () => {
    if(hexaInput.validity.valid) {
        console.log("Valid!");
        updateDecimal(hexaToDecimal(Array.from(hexaInput.value)));
        updateBinary(hexaToBinary(Array.from(hexaInput.value)));
    } else {
        console.log("Invalid");
    }
});

function binaryToDecimal(binaryArray) {
    let sum = 0;
    binaryArray.reverse();
    for(i = 0; i < binaryArray.length; i++)
    {
        sum += binaryArray[i] * Math.pow(2, i);
    }
    return(sum);
}

function binaryToHex(binaryArray) {
    let hexaArray = [];
    binaryArray.reverse();
    do {
        let partition = binaryArray.splice(0,4).reverse().join("");
        let index = hexBinaryArr.findIndex((item) => item == partition);
        if(index == -1) {
            let sum = 0;
            let partArr = Array.from(partition).reverse();
            for(i = 0; i < partArr.length; i++)
            {
                sum += partArr[i] * Math.pow(2, i);
            }
            hexaArray.push(sum);
        } else {
        hexaArray.push(hexAlphaArr[index]);
        }
    } while (binaryArray.length != 0);


    return(hexaArray.reverse().join(''));
}

function decimalToBinary(decimalValue) {
    let binaryArray = [];
    let decimal = decimalValue;
    do {
        binaryArray.push(decimal % 2);
        decimal = Math.floor(decimal / 2);
    } while (decimal > 0)

    binaryArray.reverse();
    return(Number(binaryArray.join('')));
}

function decimalToHexa(decimalValue) {
    let hexaArray = [];
    let decimal = decimalValue;
    do {
        let remainder = decimal % 16;
        if (remainder > 9 ) {
            let index = hexNumericArr.findIndex((item) => item == remainder);
            hexaArray.push(hexAlphaArr[index]);
        } else {
            hexaArray.push(remainder);
        }

        decimal = Math.floor(decimal / 16);
    } while (decimal > 0)

    hexaArray.reverse();
    return(hexaArray.join(''));
}

function hexaToDecimal(hexaValue) {
    let sum = 0;
    hexaValue.reverse();
    for (i = 0; i < hexaValue.length; i++) {
        if(parseInt(hexaValue[i])) {
            sum += hexaValue[i] * Math.pow(16, i);
        } else {
            let index = hexAlphaArr.findIndex((item) => item == hexaValue[i]);
            let hexDecimal = hexNumericArr[index];
            sum += hexDecimal * Math.pow(16, i);      
        }
    }

    return(sum);
}

function hexaToBinary(hexaValue) {
    let binaryArray = [];
    for(i = 0; i < hexaValue.length; i++) {
        if(parseInt(hexaValue[i])) {
            let decimal = parseInt(hexaValue[i]);
            do {
                binaryArray.push(decimal % 2);
                decimal = Math.floor(decimal / 2);
            } while (decimal > 0)
        } else {
            let index = hexAlphaArr.findIndex((item) => item == hexaValue[i]);
            let hexBinary = hexBinaryArr[index];
            binaryArray.push(hexBinary);
        }
    }

    return(binaryArray.join(''));
}

function updateDecimal(decimalConverted) {
    decimalInput.value = decimalConverted;
}

function updateBinary(binaryConverted) {
    binaryInput.value = binaryConverted;
}

function updateHexa(hexaConverted) {
    hexaInput.value = hexaConverted;
}

function clearTest() {
    let tests = document.querySelectorAll(".question-card");
    tests.forEach(test => {
        test.remove();
    })
}

function createTestCard(convertFrom, convertTo, questionNumber) {
    const questionCard = document.createElement("div");
    questionCard.className = "question-card";
    questionCard.dataset.number = questionNumber;
    testMenu.append(questionCard);   

    const questionLine = document.createElement("div");
    const answerLine = document.createElement("div");

    questionLine.className = "questionLine";
    answerLine.className = "answerLine";

    questionCard.append(questionLine);
    questionCard.append(answerLine);

    const numberItem = document.createElement("h2");
    numberItem.textContent = "Question " + questionCard.dataset.number;
    questionLine.append(numberItem);

    let problemNumber = 0;

    if (convertFrom === "binary") {
        problemNumber = decimalToBinary(itemNumberRange());
    } else if (convertFrom === "decimal") {
        problemNumber = itemNumberRange();
    } else if (convertFrom === "hexadecimal") {
        problemNumber = decimalToHexa(itemNumberRange());
    }

    const questionItem = document.createElement("p");
    questionItem.dataset.from = convertFrom;
    questionItem.dataset.to = convertTo;
    questionItem.dataset.problem = problemNumber;

    questionItem.textContent = "Convert " + problemNumber + " in " + convertFrom + " to " + convertTo + ".";
    questionLine.append(questionItem);

    const answerArea = document.createElement("input");
    answerArea.className = "user-answer";
    answerLine.append(answerArea);

}

function itemNumberRange() {
    let questionTask = 0;
    let taskRandomRange = Math.floor(Math.random() * 3);

    if (taskRandomRange = 0) {
        questionTask = Math.floor(Math.random() * (99 - 0 + 1) + 1);
    } else if (taskRandomRange = 1) {
        questionTask = Math.floor(Math.random() * (499 - 100 + 1) + 100);
    } else if (taskRandomRange = 2) {
        questionTask = Math.floor(Math.random() * (1000 - 500 + 1) + 500);
    }

    return questionTask;
}
