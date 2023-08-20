const binaryInput = document.querySelector(".binaryInput");
const decimalInput = document.querySelector(".decimalInput");
const hexaInput = document.querySelector(".hexaInput");

const binaryConvert = document.querySelector("#binaryConvert");
const decimalConvert = document.querySelector("#decimalConvert");
const hexaConvert = document.querySelector("#hexaConvert");

binaryConvert.addEventListener("click", () => {
    if (binaryInput.validity.valid) {
        console.log("Valid!");
        binaryToDecimal(Array.from(binaryInput.value));
    } else {
        console.log("Invalid");
    }
});

decimalConvert.addEventListener("click", () => {
    if(decimalInput.validity.valid) {
        console.log("Valid!");
        decimalToBinary(decimalInput.value);
        decimalToHex(decimalInput.value);
    } else {
        console.log("Invalid");
    }
});

hexaConvert.addEventListener("click", () => {
    if(hexaInput.validity.valid) {
        console.log("Valid!");
        decimalToHex(hexaInput.value);
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
    
    updateDecimal(sum);
}

function decimalToBinary(decimalValue) {
    let binaryArray = [];
    let decimal = decimalValue;
    do {
        binaryArray.push(decimal % 2);
        decimal = Math.floor(decimal / 2);
    } while (decimal > 0)

    binaryArray.reverse();
    updateBinary(Number(binaryArray.join('')));
}

function decimalToHex(decimalValue) {
    let hexaArray = [];
    let decimal = decimalValue;
    do {
        let remainder = decimal % 16;
        console.log(remainder);
        if (remainder > 9 ) {
            const hexAlphaArr = ["A","B","C","D","E","F"];
            const hexNumericArr = [10,11,12,13,14,15];
            let index = hexNumericArr.findIndex((item) => item === remainder );
            hexaArray.push(hexAlphaArr[index]);
        } else {
            hexaArray.push(remainder);
        }

        decimal = Math.floor(decimal / 16);
    } while (decimal > 0)

    hexaArray.reverse();
    updateHexa(hexaArray.join(''));
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

