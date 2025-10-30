const sContainer = document.querySelector("#sketch-container");

const gridSize = Number(prompt("Enter grid size", 0));
const grid = [];

grid.addRow = function(numberOfBoxes) {
    let row = { 
        rowTag: "div",
        rowClass: "row", 
        boxes: [],
    };

    for(let i = 0; i < numberOfBoxes; i++) {
        row.boxes.push( {boxClass: "box", boxTag: "div"});
    }
    grid.push(row);
}

for(let i = 0; i < gridSize; i++) {
    grid.addRow(gridSize);
}

console.log(grid);

function addGrid(grid) {
    grid.forEach(row => {
        let rowDiv = document.createElement(row.rowTag);
        rowDiv.classList.add(row.rowClass);

        row.boxes.forEach(box => {
            let boxDiv = document.createElement(box.boxTag);
            boxDiv.classList.add(box.boxClass);

            rowDiv.appendChild(boxDiv);
        })
        sContainer.appendChild(rowDiv);
    });


    /*
    grid.forEach(row => {
        let rowDiv = document.createElement(row.rowTag);
        
        //add the css properties
        rowDiv.classList.add(row.rowClass);
        //append boxes to row
        row.boxes.forEach(box => {
            let boxDiv = document.createElement(box.boxTag);
            boxDiv.classList.add(box.boxClass);


            rowDiv.appendChild(boxDiv);
        })
        //append row to sContainer
        sContainer.appendChild(rowDiv);
    });
    */

}

addGrid(grid);