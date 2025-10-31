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

function changeBoxColor(event, color) {
    //console.log(event.target);
    let box = event.target;
    box.style.backgroundColor = color;
}

//console.log(grid);
function addGrid(grid) {
    grid.forEach(row => {
        let rowDiv = document.createElement(row.rowTag);
        rowDiv.classList.add(row.rowClass);

        row.boxes.forEach(box => {
            let boxDiv = document.createElement(box.boxTag);
            boxDiv.classList.add(box.boxClass);

            //mouse event handling for box
            boxDiv.addEventListener('click', event => {
                boxDiv.style.backgroundColor = "pink";
            })

            //boxDiv.addEventListener('mouseenter', (event) => changeBoxColor(event, "pink"));
            let holding = false;
            sContainer.addEventListener('mousedown', (event) => {
                event.preventDefault();
                holding = true;
                //console.log(`Holding | ${event.type} | ${holding}`);
            });

            sContainer.addEventListener('mouseup', (event) => {
                holding = false;
                //console.log(`Holding | ${event.type} | ${holding}`);
            });

            let lastTime = 0;
            const throttleDelay = 50;
            boxDiv.addEventListener('mousemove', (event) => {
                if(!holding) 
                    return;
                if(!event.target.classList.contains('box'))
                    return;

                let now = Date.now();
                if(now - lastTime < throttleDelay)
                    return;
                lastTime = now;

                //console.log(event.target);
                if(event.target.style.backgroundColor == "pink")
                    return;
                let box = event.target;
                box.style.backgroundColor = "pink";
            })

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