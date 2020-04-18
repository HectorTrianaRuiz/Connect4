/*global document*/

var gameTable;
var gameOver = false;
var redTurn = false;
var redtoken;
var yellowtoken;


function setUp() {
    redtoken = document.getElementById("redtoken").innerHTML;
    yellowtoken = document.getElementById("yellowtoken").innerHTML;
    /* document.getElementById("reset").setAttribute("onClick", "reset()")*/
    gameTable = document.getElementById("gameTable");

    for (i = 0; i < 6; i++) {
        var thisRow = document.createElement("tr");
        gameTable.appendChild(thisRow);

        for (j = 0; j < 7; j++) {
            var thisSquare = document.createElement("td");

            thisSquare.setAttribute("class", "gameSquare")
            thisSquare.setAttribute("onClick", "clicked(" + i + "," + j + ")");
            thisSquare.innerHTML = " ";
            thisRow.appendChild(thisSquare);
        }
    }
}

function clicked(row, col) {
    if (gameOver) {
        return;
    }
    //console.log("clicked ran");
    for (var j = 5; j >= 0; j--) {
        //console.log(j, col);
        if (gameTable.rows[j].cells[col].innerHTML == " ") {
            //console.log("found a blank");
            if (redTurn) {
                gameTable.rows[j].cells[col].innerHTML = redtoken;
                checkRow(j, redtoken);
                checkColumn(col, redtoken);
                checkDiagnolsDown(row, col, redtoken);
                checkDiagnolsUp(row, col, redtoken);
            } else {
                gameTable.rows[j].cells[col].innerHTML = yellowtoken;
                checkRow(j, yellowtoken);
                checkColumn(col, yellowtoken);
                checkDiagnolsDown(row, col, yellowtoken);
                checkDiagnolsUp(row, col, yellowtoken);
            }

            redTurn = !redTurn;
            return;
        }
    }
}


function checkRow(row, player) {
    //console.log("checking row");
    var counter = 0;
    for (var i = 0; i < 7; i++) {
        if (gameTable.rows[row].cells[i].innerHTML == player) {
            counter++;
            if (counter == 4) {
                //console.log("winner");
                declareWinner(player);
            }
        } else {
            counter = 0;
        }
    }
}

function checkColumn(col, player) {
    //console.log("checking row");
    var counter = 0;
    for (var i = 0; i < 6; i++) {
        if (gameTable.rows[i].cells[col].innerHTML == player) {
            counter++;
            if (counter == 4) {
                //console.log("winner");
                declareWinner(player);
            }
        } else {
            counter = 0;
        }
    }
}

function checkDiagnolsDown(row, col, player) {
    var counter = 0;
    var diff = col - row;
    for (var i = 0; i < 6; i++) {
        if ((diff + i) >= 0 && (diff + i) < 7) {
            if (gameTable.rows[i].cells[diff - i].innerHTML == player) {
                counter += 1;
            } else {
                counter = 0;
            }
            if (counter == 4) {
                declareWinner(player);
            }

        }
    }
}

function checkDiagnolsUp(row, col, player) {
    var counter = 0;
    var diff = col - row;
    for (var i = 0; i < 6; i++) {
        if ((diff + i) >= 0 && (diff + i) < 7) {
            if (gameTable.rows[i].cells[diff - i].innerHTML == player) {
                counter += 1;
            } else {
                counter = 0;
            }
            if (counter == 4) {
                declareWinner(player);
            }

        }
    }
}





function declareWinner(A) {
    document.getElementById("winMsg").innerHTML = A + " is the winner!!!";
    gameOver = true;
}
