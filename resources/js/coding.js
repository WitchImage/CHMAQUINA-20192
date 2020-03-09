//***************************************/
//******* Standard system config *******//
//***************************************/
var memory = [];
var memoryLen = 9999;
var kernel = 909;
var acum = 0;
var dataTypes = {"C": " ", "I": 0, "R": 0.0, "L": 0};
//console.log(memory, memoryLen, kernel, acum);

this.memory.push(acum);
for (i = 1; i <= kernel; i++) {
    this.memory.push("kernel" + i);
}
for (i = 0; i < 100; i++) {
    this.memory.push("reserved" + i);
}

//******************************************/
//******* System variable functions *******//
//******************************************/
/**
 * Set the beginning values for system variables (acum, memory and kernel).
 */
function apply() {
    this.memory = []
    this.memory.push(acum);
    for (i = 1; i <= kernel; i++) {
        this.memory.push("kernel" + i);
    }
    for (i = 0; i < 100; i++) {
        this.memory.push("reserved" + i);
    }
}

/**
 * Change the value of the memory.
 */
function changeMemory() {
    this.memoryLen = document.getElementsByTagName("input")[0].value;
}

/**
 * Change the value of the kernel.
 */
function changeKernel() {
    this.kernel = document.getElementsByTagName("input")[1].value;
}

function standardConfig() {
    this.acum = 0;
    this.memory = [];
    this.memory.push(acum);
    for (i = 1; i <= kernel; i++) {
        this.memory.push("kernel" + i);
    }
    for (i = 0; i < 100; i++) {
        this.memory.push("reserved" + i);
    }
    //console.log(memory);
}

function test() {
    let value = document.getElementsByClassName("app")[0];
    this.instructions.chargue(value);
}

//***************************************/
//******* CHMÁQUINA instructions functions *******//
//***************************************/
/**
 * Get the code of the app textarea.
 */
function getCode() {
    let code = document.getElementsByClassName("app")[0].value; //Why do i need the "[0]?"
    let instructions = this.splitCode(code);
    //console.log(instructions);
    this.chargeApp(instructions);
}

/**
 * Get the set of code lines and do syntax checking.
 */
function getInstructions() {
    console.log(this.memory);
    let code = document.getElementsByClassName("app")[0].value;
    let instructions = this.splitCode(code);
    this.checkSyntax(instructions);    
}

/**
 * Split the code in lines separated by line breakups.
 * @param {String} code the code of the app textarea.
 */
function splitCode(code) {
    let lines = code.split("\n");
    //console.log(lines);
    return lines;
}

/**
 * Split a single line of code.
 * @param {String} line the line of code to be split.
 */
function splitLine(line) {
    let instructions = line.split(" ");
    //console.log(instructions);
    return instructions;
}

/**
 * Check the validity of the syntax.
 * @param {Array<String>} codeLines the code lines to be analysed.
 */
function checkSyntax(codeLines, i=-1) {
    let ret = false;
    
    codeLines.forEach(function(line, index1, arr1) {        
        console.log(index1);
        lineInstructions = this.splitLine(line); //obtain each part of the line of code
        lineInstructions.forEach(function(inst, index2, arr2) { //iterates over the line of code for ...
            //console.log(inst);                                  //... each instruction
            if(index2 == 0 && !ret && index1 >= i) {                
                console.log(this.memory);
                if(inst == 'retorne' && !ret) {
                    ret = true;
                }
                else if(inst == '//' || inst == ' ') {
                    console.log("skip");
                }
                else if(inst === 'cargue' && !ret) {
                    this.cargue(arr2[1]);
                    console.log(inst);
                }
                else if(inst === 'almacene' && !ret) {
                    this.almacene(arr2[1]);
                    console.log(inst);
                }
                else if(inst === 'vaya' && !ret) {
                    ret = true;
                    this.checkSyntax(codeLines, arr2[1]);
                    console.log(inst);
                }
                else if(inst === 'vayasi' && !ret) {
                    ret = this.vayasi(codeLines, arr2, arr2[1], arr2[2]);              
                    console.log(inst);      
                }
                else if(inst === "nueva" && !ret) {
                    //this.nueva(arr1[index1]);
                }
                else if(inst === "etiqueta" && !ret) {
                    //this.etiqueta(arr1[index1]);
                }
                else if(inst === "lea" && !ret) {
                    this.lea(arr2[1]);
                    console.log(inst);
                }
                else if(inst === 'sume' && !ret) {
                    this.sume(arr2[1]);
                    console.log(inst);
                }
                else if(inst === 'reste' && !ret) {
                    this.reste(arr2[1]);
                    console.log(inst);
                    ret = true;
                }
                else if(inst === 'multiplique' && !ret) {
                    this.multiplique(arr2[1]);
                    console.log(inst);
                }
                else if(inst === 'divida' && !ret) {
                    this.divida(arr2[1]);
                    console.log(inst);
                }
                else if(inst === 'potencia' && !ret) {
                    this.potencia(arr2[1]);
                    console.log(inst);
                }
                else if(inst === 'modulo' && !ret) {
                    this.modulo(arr2[1]);
                    console.log(inst);
                }
                else if(inst === 'concatene' && !ret) {
                    this.concatene(arr1[index1]);
                    console.log(inst);
                }
                else if(inst === 'elimine' && !ret) {
                    this.elimine(arr2[1]);
                    console.log(inst);
                }
                else if(inst === 'extraiga' && !ret) {
                    this.extraiga(arr2[1]);
                    console.log(inst);
                }
                else if(inst === 'Y' && !ret) {
                    this.y(arr2[1], arr2[2], arr2[3]);
                    console.log(inst);
                }
                else if(inst === 'O' && !ret) {
                    this.o(arr2[1], arr2[2], arr2[3]);
                    console.log(inst);
                }
                else if(inst === 'NOT' && !ret) {
                    this.no(arr2[1], arr2[2]);
                    console.log(inst);
                }
                else if((inst === 'muestre' || inst === 'imprima') && !ret) {
                    this.imprima(arr2[1]);
                    console.log(inst);
                }
                else if(inst === 'libere' && !ret) {
                    this.libere(arr2[1]);
                    console.log(inst);
                }
                else {
                    alert(inst + " is not a valid statement");
                }
            }         
        });
        
    });
    
    //console.log("acum", this.acum);
    this.standardConfig();
}

function chargeApp(codeLines) {
    console.log("charge");
    codeLines.forEach(function(line, index1, arr1) {
        lineInstructions = this.splitLine(line); //obtain each part of the line of code
        lineInstructions.forEach(function(inst, index2, arr2) { //iterates over the line of code for ...
            //console.log(inst);                                  //... each instruction
            if(index2 == 0) {
                if(inst == '//' || inst == ' ') {

                }
                else if(inst === "nueva") {
                    this.nueva(arr1[index1]);
                }
                else if(inst === "etiqueta") {
                    this.etiqueta(arr1[index1], codeLines.length);
                }
            }
        });
    });
    console.log(this.memory);
    alert("App ready");
}

//***********************************************/
//******* Instructions set for CHMÁQUINA *******//
//***********************************************/
/**
 * Charge in the acumulator the value of a specific variable.
 * @param {any} varName the name of the variable.
 */
function cargue(varName) {
    let varIndex = this.memory.indexOf(varName)+1;
    let data = this.memory[varIndex];
    this.acum = data;
    this.memory[0] = this.acum;
    return true;
}

/**
 * Saves in a specific variable the acumulator value.
 * @param {String} varName the name of the variable.
 */
function almacene(varName) {
    if(this.memory.includes(varName)) {
        let varIndex = this.memory.indexOf(varName)+1;
        this.memory[varIndex] = this.acum;
    }
    else {
        this.memory.push(varName);
        this.memory.push(this.acum);
    }
    return true;
}

function vayasi(code, instructions, op1, op2) {
    console.log(code);
    let indexOp1 = this.memory.indexOf(op1)+1;
    let op1Value = this.memory[indexOp1];
    let indexOp2 = this.memory.indexOf(op2)+1;
    let op2Value = this.memory[indexOp2];
    if(this.acum > 0) {
        this.checkSyntax(code, op1Value);
        return true;
    }
    else if(this.acum < 0) {
        this.checkSyntax(code, op2Value);
        return true;
    }
    else {
        return false;
    }   
}

/**
 * Creates a new variable. This function runs only when the app is compiling, otherwise the interpreter
 * will skip "nueva" instruction.
 * @param {Array<String>} line the line of code.
 */
function nueva(line) {
    instructions = this.splitLine(line);
    varName = instructions[1];
    varType = instructions[2];
    varValue = instructions[3];
    if(varType in this.dataTypes) {
        if(varValue == undefined) {
            this.memory.push(varName, this.dataTypes.varType);
        }
        else if(varType == 'C') {
            this.memory.push(varName, varValue);
        }
        else if(varType == 'R') {
            varValue = parseFloat(varValue);
            this.memory.push(varName, varValue);
        }
        else {
            varValue = parseInt(varValue);
            this.memory.push(varName, varValue);
        }
        return true;
    }    
    else {
        alert("Data type incorrect");
        return false;
    }
}

/**
 * Create a new label which is referred to a specific instruction (number of line of code).
 * @param {Array<String>} line the line of code
 */
function etiqueta(line, maxNum) {
    instructions = this.splitLine(line);
    labelName = instructions[1];
    instruction = instructions[2];
    instruction = parseInt(instruction);
    if(instruction < maxNum) {
        this.memory.push(labelName, instruction);
        return true;
    }    
    else {
        alert("Line number exceed the maximum number of code lines: " + labelName + " " + instruction);
        return false;
    }
}

/**
 * Read an user imput for one variable
 * @param {String} varName the var name specified in the code line.
 */
function lea(varName) {
    varType = prompt("Insert data type");
    varValue = prompt("Insert data");
    if(varType != "C") {
        if(varType == "R") {
            varValue = parseFloat(varValue);
        }
        else if(varType == "I" || varType == "L") {
            varValue = parseInt(varValue);
        }
        else {
            alert("Data type incorrect");
            return false;
        }
    }
    this.memory.push(varName, varValue);
    return true;
}

function sume(variable) {
    let varIndex = this.memory.indexOf(varName)+1;
    let varValue = this.memory[varIndex];
    varValue = parseInt(varValue);
    this.acum = parseInt(this.acum);
    this.acum += varValue;
    this.memory[0] = this.acum;
}

function reste(variable) {
    let varIndex = this.memory.indexOf(varName)+1;
    let varValue = this.memory[varIndex];
    varValue = parseInt(varValue);
    this.acum = parseInt(this.acum);
    this.acum = this.acum-varValue;
    this.memory[0] = this.acum;
}

function multiplique(variable) {
    let varIndex = this.memory.indexOf(varName)+1;
    let varValue = this.memory[varIndex];
    varValue = parseInt(varValue);
    this.acum = parseInt(this.acum);
    this.acum = this.acum*varValue;
    this.memory[0] = this.acum;
    console.log(varValue);
}

function divida(variable) {    
    let varIndex = this.memory.indexOf(varName)+1;
    let varValue = this.memory[varIndex];
    if(varValue == 0) {
        alert("Divide by zero")
        return false;
    }
    varValue = parseInt(varValue);
    this.acum = parseInt(this.acum);    
    this.acum /= varValue;
    this.memory[0] = this.acum;
}

function potencia(exp) {
    exp = parseInt(exp);
    this.acum = parseInt(this.acum);
    if(Number.isNaN(exp)) {
        alert("Potencia is missing the exponent");
        return false;
    }
    this.acum = Math.pow(this.acum, exp);
    this.memory[0] = this.acum;
}

function modulo(mod) {
    mod = parseInt(mod);
    this.acum = parseInt(this.acum);
    if(Number.isNaN(mod)) {
        alert("Modulo is missing the remainder number");
        return false;
    }
    mod = parseInt(mod);
    this.acum = this.acum%mod;
    this.memory[0] = this.acum;
}

function concatene(line) {
    string = this.splitLine(line);
    string.shift();
    for(i = 0; i < string.length; i++) {
        this.acum += string[i];
    }
    this.memory[0] = this.acum;
}

function elimine(char) {
    if(char == undefined) {
        alert("Elimine is missing the specific char to be removed");
        return false;
    }
    this.acum.replace("char", "");
    this.memory[0] = this.acum;
}

function extraiga(end) {
    if(end == undefined) {
        alert("Extraiga is missing the substring ending value");
        return false;
    }
    this.acum = this.acum.substring(0, end);
    this.memory[0] = this.acum;
}

function y(op1, op2, op3) {
    let indexOp1 = this.memory.indexOf(op1)+1;
    let op1Value = this.memory[indexOp1];
    let indexOp2 = this.memory.indexOf(op2)+1;
    let op2Value = this.memory[indexOp2];
    result = op1Value && op2Value;
    this.memory.push(op3, result);
}

function o(op1, op2, op3) {
    let indexOp1 = this.memory.indexOf(op1)+1;
    let op1Value = this.memory[indexOp1];
    let indexOp2 = this.memory.indexOf(op2)+1;
    let op2Value = this.memory[indexOp2];
    result = op1Value || op2Value;
    this.memory.push(op3, result);
}

function no(op1, op2) {
    let indexOp1 = this.memory.indexOf(op1)+1;
    let op1Value = this.memory[indexOp1];
    result = !op1Value;
    this.memory.push(op2, result);
}

function imprima(variable) {
    if(variable == undefined) {
        alert("acumulador = " + this.acum);
        return true;
    }
    let varIndex = this.memory.indexOf(variable)+1;
    let varValue = this.memory[varIndex];
    alert(variable + " = " + varValue);
}

function libere(variable) {
    if(variable == undefined) {
        alert("Libere is missing the variable argument");
        return false;
    }
    let varIndex = this.memory.indexOf(variable);
    this.memory.splice(varIndex, 2);
}

function retorne(value) {
    return value;
}