var gameOver = true;
const board = document.getElementsByClassName('board')[0];
var filledCellNumber = 0;
let currentTurn = 'O';
var sideLength = 0;

const board1 = document.querySelector(".player-1-info");
const board2 = document.querySelector(".player-2-info");

function createGame() {
    var input = document.getElementById("side-length");
    var name1 = document.getElementById("player-1-name").value;
    var name2 = document.getElementById("player-2-name").value;
    sideLength = Number(input.value);
    closeModal();
    console.log(Number(input.value));
    createBoard(sideLength, name1, name2);
    displayPlayers(name1, name2);
}

const displayPlayers = (name1, name2) => {
    board1.innerHTML = `${name1}: O`;
    board2.innerHTML = `${name2}: X`;
}

function createPlayers(name1, name2) {
    var player1 = {
        row_map: {},
        col_map: {},
        name: name1,
        sub_diagonal: 0,
        main_diagonal: 0,
        symbol: "O",
    };

    var player2 = {
        row_map: {},
        col_map: {},
        name: name2,
        sub_diagonal: 0,
        main_diagonal: 0,
        symbol: "X",
    }

    for (let i = 0; i < sideLength; i++){
        player1.col_map[`${i}`] = 0;
        player1.row_map[`${i}`] = 0;
        player2.col_map[`${i}`] = 0;
        player2.row_map[`${i}`] = 0;
    }
    return [player1, player2] ;
}


function getNextTurn() {
    currentTurn = currentTurn === "X" ? "O" : "X";
}

function createBoard(sideLength, name1, name2) {
    let [ player1, player2 ] = createPlayers(name1, name2);
    for (let r = 0; r < sideLength; r++){
        for (let c = 0; c < sideLength; c++){
            const cell = document.createElement('div');
            cell.setAttribute('class', `row ${r} col ${c}`);
            cell.setAttribute('id', `grid-cell`);
            cell.addEventListener("click", function (e) {
                if (!e.target.classList.contains('row')) {
                    return;
                } else if (cell.innerHTML == "") {
                    var attribute = this.getAttribute("class");
                    var position = attribute.split(" ");
                    console.log(currentTurn);
                    if (currentTurn === "O") {
                        if (checkMove(player1, position)) {
                            alert(`${player1.name} wins`);
                        };
                        const img = document.createElement("img");
                        img.src= "letter-o.png";
                        this.appendChild(img);
                    } else {
                        if (checkMove(player2, position)) {
                            alert(`${player2.name} wins`);
                        };
                        const img = document.createElement("img");
                        img.src = "delete.png";
                        this.appendChild(img);
                    }
                    getNextTurn();
                    filledCellNumber += 1;
                }
            })
            board.appendChild(cell);
        }
    }
    board.style.display = "grid";
    board.style.border ='2px solid #f0f0f0';
    board.style.gridTemplateColumns = `repeat(${sideLength}, 1fr`;
}

// function getComputerChoice(computer) {
//     while (true) {
//         var col_num = Math.floor(Math.random() * (sideLength - 0));
//         var row_num = Math.floor(Math.random() * (sideLength - 0));
//         var position_str = `row ${row_num} col ${col_num}`;
//         var cell = document.getElementsByClassName(position_str)[0];
//         if (cell.innerHTML === "") {
//             var position = position_str.split(' ');
//             filledCellNumber +=1;
//             cell.innerHTML = computer.symbol;
//             recordChoice(computer, position);
//             break;
//         } 
//     }
// }

function checkMove(player, position) { 
    console.log(player);
    const row = position[1];
    const col = position[3];
    player.row_map[row] += 1;
    player.col_map[col] += 1;
    if (Number(row) === Number(col)) {
        player.main_diagonal += 1;
    } 
    if (Number(row) + Number(col) === sideLength - 1) {
        player.sub_diagonal += 1
    }
    console.log("score of :",player.name ,player.main_diagonal, player.sub_diagonal, player.row_map, player.col_map)
    if (player.row_map[row] === sideLength || player.col_map[col] === sideLength || player.main_diagonal === sideLength || player.sub_diagonal === sideLength) {
        return true;
    }
    return false;
}


const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const openModal = function () {
    var modal = document.querySelector(".modal");
    var overlay = document.querySelector(".overlay");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

openModalBtn.addEventListener("click", openModal);



const closeModal = function () {
    var modal = document.querySelector(".modal");
    var overlay = document.querySelector(".overlay");
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
closeModalBtn.addEventListener("click", closeModal);
const submit = document.getElementById("submit-side-length");
submit.addEventListener("click", createGame);
