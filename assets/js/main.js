const rowInput = document.getElementById("row-qty-input");
const addRowBtn = document.getElementById("add-row-btn");
const delRowBtn = document.getElementById("del-row-btn");
const inputs = document.getElementById("inputs-sheet");
const clearBtn = document.getElementById("clear-btn");

const tableMin = 2
const tableMax = 25
let tableSize = 0

resizeTable()

function resizeTable(){
    const newTableSize = rowInput.value
    if (newTableSize<=tableMax && newTableSize>=tableMin){
        while(tableSize>newTableSize){
            deleteRow()
        }
        while(tableSize<newTableSize){
            addRow()
        }
    } else{
        alert(`Please enter a number from ${tableMin} to ${tableMax}`)
        return
    }
}

function deleteRow(){
    if(tableSize>tableMin){
        inputs.removeChild(inputs.lastElementChild)
        tableSize--
        rowInput.value=tableSize
        delRowBtn.disabled = tableSize>tableMin ? false : true
    }
    addRowBtn.disabled=false
    calculateTable()
}

function addRow(){
    if(tableSize<tableMax){
        const newRow = document.createElement("div")
        newRow.className = "input-row"
        newRow.id = `row-${tableSize+1}`
        newRow.innerHTML = `<input onchange="calculateTable()" type="number" id="r${tableSize+1}-c1" class="row-input-cell" /><input onchange="calculateTable()" type="number" id="r${tableSize+1}-c2" class="row-input-cell" /><p id="r${tableSize+1}-c3" class="row-total-cell"></p>`
        inputs.appendChild(newRow)
        tableSize++
        rowInput.value=tableSize
        addRowBtn.disabled = tableSize<tableMax ? false : true
    }
    delRowBtn.disabled=false
    calculateTable()
}

function calculateTable(){
    let sumOunce = 0;
    for (let i=1; i<tableSize+1; i++){
        calculateRow(i)
    }
    for (let i=1; i<tableSize+1; i++){
        sumOunce+=parseFloat(document.getElementById(`r${i}-c3`).innerHTML || 0)
    }
    const splitOunce = sumOunce % 16
    const splitPound = ~~(sumOunce/16)

    document.getElementById("r0-c3").innerHTML=convToDec(sumOunce)
    document.getElementById("r0-c2").innerHTML=convToDec(splitOunce)
    document.getElementById("r0-c1").innerHTML=convToDec(splitPound)
}

function calculateRow(i){
    const ric1 = document.getElementById(`r${i}-c1`);
    const ric2 = document.getElementById(`r${i}-c2`);
    const ric3 = document.getElementById(`r${i}-c3`);
    
    const poundConv = parseFloat((ric1.value || 0)*16).toFixed(3)
    const ounceConv = parseFloat(ric2.value || 0).toFixed(3)

    ric3.innerHTML = convToDec(parseFloat(poundConv) + parseFloat(ounceConv)) ? convToDec(parseFloat(poundConv) + parseFloat(ounceConv)) : "";
    return
}

function convToDec(value) {
    return Math.round(value * 1000) / 1000;
}

function clearTable(){
    for (let i=1; i<tableSize+1; i++){
        document.getElementById(`r${i}-c1`).value = ""
        document.getElementById(`r${i}-c2`).value = ""
    }
    calculateTable()
}

rowInput.addEventListener("change",resizeTable)
addRowBtn.addEventListener("click",addRow)
delRowBtn.addEventListener("click",deleteRow)
clearBtn.addEventListener("click", clearTable)
