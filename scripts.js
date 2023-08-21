const binaryInput = document.querySelector(".binaryInput");
const decimalInput = document.querySelector(".decimalInput");
const hexaInput = document.querySelector(".hexaInput");

const binaryConvert = document.querySelector("#binaryConvert");
const decimalConvert = document.querySelector("#decimalConvert");
const hexaConvert = document.querySelector("#hexaConvert");

const hexAlphaArr = ["A","B","C","D","E","F"];
const hexNumericArr = [10,11,12,13,14,15];
const hexBinaryArr = [1010,1011,1100,1101,1110,1111];

binaryConvert.addEventListener("click", () => {
    if (binaryInput.validity.valid) {
        console.log("Valid!");
        binaryToDecimal(Array.from(binaryInput.value));
        binaryToHex(Array.from(binaryInput.value));
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
        hexaToDecimal(Array.from(hexaInput.value));
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

function binaryToHex(binaryArray) {
    let hexaArray = [];
    binaryArray.reverse();
    do {
        if(binaryArray.length > 3) {
            let partition = binaryArray.splice(0,4).reverse().join("");
            let index = hexBinaryArr.findIndex((item) => item == partition);
            hexaArray.push(hexAlphaArr[index]);
            console.log('check-1');
        } else {
            let sum = 0;
            for(i = 0; i < binaryArray.length; i++)
            {
                sum += binaryArray[i] * Math.pow(2, i);
            }
            hexaArray.push(sum);
            break;
        }
    } while (binaryArray.length != 0);


    updateHexa(hexaArray.reverse().join(''));
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
            let index = hexNumericArr.findIndex((item) => item == remainder);
            hexaArray.push(hexAlphaArr[index]);
        } else {
            hexaArray.push(remainder);
        }

        decimal = Math.floor(decimal / 16);
    } while (decimal > 0)

    hexaArray.reverse();
    updateHexa(hexaArray.join(''));
}

function hexaToDecimal(hexaValue) {
    let sum = 0;
    hexaValue.reverse();
    for (i = 0; i < hexaValue.length; i++) {
        if(parseInt(hexaValue[i])) {
            sum += hexaValue[i] * Math.pow(16, i);
        } else {
            let index = hexAlphaArr.findIndex((item) => item == hexaValue[i]);
            let hexNum = hexNumericArr[index];
            sum += hexNum * Math.pow(16, i);      
        }
    }

    updateDecimal(sum);
}

function hexaToBinary(hexaValue) {
    
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

