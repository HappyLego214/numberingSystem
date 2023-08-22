const binaryInput = document.querySelector(".binaryInput");
const decimalInput = document.querySelector(".decimalInput");
const hexaInput = document.querySelector(".hexaInput");

const binaryConvert = document.querySelector("#binaryConvert");
const decimalConvert = document.querySelector("#decimalConvert");
const hexaConvert = document.querySelector("#hexaConvert");

const numberConverter = document.querySelector("#converterTab");
const testGenerator = document.querySelector("#testGeneratorTab");
const cheatsheet = document.querySelector("#cheatsheetTab");

const hexAlphaArr = ["A","B","C","D","E","F"];
const hexNumericArr = [10,11,12,13,14,15];
const hexBinaryArr = [1010,1011,1100,1101,1110,1111];

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
        updateHexa(decimalToHex(decimalInput.value));
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

function decimalToHex(decimalValue) {
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

