const sContainer = document.querySelector("#sketch-container");

const gridSize = Number(prompt("Enter grid size", 0));
const grid = [];
let color = ""; //color option

/* SCONTAINER SECTION */

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
                boxDiv.style.backgroundColor = color;
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
                if(event.target.style.backgroundColor == color)
                    return;
                let box = event.target;
                box.style.backgroundColor = color;
            })

            rowDiv.appendChild(boxDiv);
        })
        sContainer.appendChild(rowDiv);
    });
}

/*END OF SCONTAINER SECTION*/

/* COLOR-DIV SECTION */
const colorDiv = document.querySelector("#color-div");
const colorRowOne = document.querySelector("#color-row-one");
const colorRowTwo = document.querySelector("#color-row-two");

const colors = [
    //from light to dark (except specials)
    //red family
    "#FFC0CB", "#FF0000", "#800000",
    //blue family
    "#87CEEB", "#0000FF", "#000080",
    //yellow family
    "#FFFACD", "#FFFF00", "#808000",
    //orange family
    "#FFDAB9", "#FFA500", "#CC5500",
    //green family
    "#98FF98", "#008000", "#228B22",
    //purple family
    "#E6E6FA", "#800080", "#4B0082",
    //essentials or specials
    "#9159d6", "#b689ee", "brown",
    "white", "grey", "black",
]
const rowLength = colors.length/2;  //note: might have errors if colors.length is odd since it should only be int

function addColors(colors) {
    let rowOne = colorRowOne;
    let rowTwo = colorRowTwo;

    //note: might have errors if colors.length is odd since it should only be int
    //console.log("Row one:");
    for(let i = 0; i < rowLength; i++) {
        rowOne.children[i].id = colors[i];
        rowOne.children[i].style.backgroundColor = colors[i];
        //console.log(`${rowOne.children[i].id} : ${i}`);
    }

    //console.log("Row two:")
    for(let i = 0; i < rowLength; i++) {
        rowTwo.children[i].id = colors[i + colors.length/2];
        rowTwo.children[i].style.backgroundColor = colors[i + colors.length/2];
        //console.log(`${rowOne.children[i].id} : ${i}`);
    }

    rowOne.addEventListener('click', event => {
        let target = event.target;
        if(!target.classList.contains("color-option"))
            return;

        console.log(target.classList.contains("color-option"));
        color = target.id;
    });

    rowTwo.addEventListener('click', event => {
        let target = event.target;
        if(!target.classList.contains("color-option"))
            return;

        console.log(target.classList.contains("color-option"));
        color = target.id;
    });
}
addColors(colors);
/* END OF COLOR-DIV SECTION */

//main
addGrid(grid);