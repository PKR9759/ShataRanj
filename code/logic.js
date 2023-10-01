
//sounds for each effects
const killSound = document.getElementById("killSound");
const moveSound = document.getElementById("moveSound");
const captureSound = document.getElementById("captureSound");




function getImgName(cellid) {

    let cell = document.getElementById(cellid);
    if (cell == null) return null;
    let Imgcell = cell.querySelector("img");
    if (Imgcell == null) return null;
    let Imgname = Imgcell.getAttribute("src");
    return Imgname;
}
function highlightPosition(cellid, nextcellid) {
    let cell = document.getElementById(cellid);
    let Imgcell = cell.querySelector("img");
    let Imgname = Imgcell.getAttribute("src");

    let nextcell = document.getElementById(nextcellid);

    if (nextcell.childElementCount == 0) {
        nextcell.classList.add("highlighted_cell_empty");
    } else {
        let Imgcellnext = nextcell.querySelector("img");
        let Imgnamenext = Imgcellnext.getAttribute("src");
        // console.log(Imgname[0], Imgnamenext[0]);
        if (Imgname[0] != Imgnamenext[0]) {
            if (Imgname[1] != 's') {
                nextcell.classList.add("highlighted_cell_filled");
            }
            else {//soldiers can kill diaogonal but not step up positions that's why
                if (cellid[1] != nextcellid[1]) {

                    nextcell.classList.add("highlighted_cell_filled");
                }
            }

        }

        return -1;
        //indiacte that it's same color piece on that position
    }
}

function showKingMoves(curPosition) {
    let cell = document.getElementById(curPosition);
    let Imgcell = cell.querySelector("img");
    let Imgname = Imgcell.getAttribute("src");

    const positions = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
        [1, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
    ];

    for (let i of positions) {
        let curr = i[0] + parseInt(curPosition[0]);
        let curc = i[1] + parseInt(curPosition[1]);

        if (curr >= 0 && curr < 8 && curc < 8 && curc >= 0) {
            let posString = curr.toString() + curc.toString();

            highlightPosition(curPosition, posString);
        }
    }
}

function showSoldierMoves(curPosition) {
    let cell = document.getElementById(curPosition);
    let Imgcell = cell.querySelector("img");
    let Imgname = Imgcell.getAttribute("src");

    let positions = [];
    let curr = parseInt(curPosition[0]);
    let curc = parseInt(curPosition[1]);
    if (Imgname[0] == "b") {
        positions.push([curr + 1, curc]);
        if (!getImgName((curr + 1).toString() + (curc).toString())) {
            positions.push([curr + 2, curc]);
        }

        if (getImgName((curr + 1).toString() + (curc + 1).toString())) {
            if (
                Imgname[0] !=
                getImgName((curr + 1).toString() + (curc + 1).toString())[0]
            ) {
                positions.push([curr + 1, curc + 1]);
            }
        }

        if (getImgName((curr + 1).toString() + (curc - 1).toString())) {
            if (
                Imgname[0] !=
                getImgName((curr + 1).toString() + (curc - 1).toString())[0]
            ) {
                positions.push([curr + 1, curc - 1]);
            }
        }
    } else {
        positions.push([curr - 1, curc]);
        if (!getImgName((curr - 1).toString() + (curc).toString())) {
            positions.push([curr - 2, curc]);
        }

        if (getImgName((curr - 1).toString() + (curc + 1).toString())) {
            if (
                Imgname[0] !=
                getImgName((curr - 1).toString() + (curc + 1).toString())[0]
            ) {
                positions.push([curr - 1, curc + 1]);
            }
        }

        if (getImgName((curr - 1).toString() + (curc - 1).toString())) {
            if (
                Imgname[0] !=
                getImgName((curr - 1).toString() + (curc - 1).toString())[0]
            ) {
                positions.push([curr - 1, curc - 1]);
            }
        }
    }

    for (let i of positions) {
        let drow = i[0];
        let dcol = i[1];
        if (drow >= 0 && drow < 8 && drow < 8 && drow >= 0) {
            let posString = drow.toString() + dcol.toString();

            highlightPosition(curPosition, posString);
        }
    }
}
// showSoldierMoves("65");

function showCamelMoves(curPosition) {
    let cell = document.getElementById(curPosition);
    let Imgcell = cell.querySelector("img");
    console.log(cell.childElementCount);
    let Imgname = Imgcell.getAttribute("src");

    let positions = [];
    let curr = parseInt(curPosition[0]);
    let curc = parseInt(curPosition[1]);

    let temp = [];

    let i = 1,
        j = 1;
    while (i + curr < 8 && j + curc < 8) {
        temp.push([curr + i, curc + j]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    (i = 1), (j = 1);
    while (i + curr < 8 && curc - j >= 0) {
        temp.push([curr + i, curc - j]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    (i = 1), (j = 1);
    while (curr - i >= 0 && curc - j >= 0) {
        temp.push([curr - i, curc - j]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    (i = 1), (j = 1);
    while (curr - i >= 0 && j + curc < 8) {
        temp.push([curr - i, curc + j]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    // console.log(positions);
    for (let i of positions) {
        // console.log(i);

        for (let j of i) {
            let drow = j[0];
            let dcol = j[1];
            if (drow >= 0 && drow < 8 && drow < 8 && drow >= 0) {
                let posString = drow.toString() + dcol.toString();
                // console.log(posString);
                if (highlightPosition(curPosition, posString) == -1) {
                    break;
                }
            }
        }
    }
}

// showCamelMoves("51");

function showElephantMoves(curPosition) {
    let cell = document.getElementById(curPosition);
    let Imgcell = cell.querySelector("img");
    let Imgname = Imgcell.getAttribute("src");

    let positions = [];
    let curr = parseInt(curPosition[0]);
    let curc = parseInt(curPosition[1]);

    let temp = [];

    let i = 1,
        j = 1;
    while (i + curr < 8 && curc < 8) {
        temp.push([curr + i, curc]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    (i = 1), (j = 1);
    while (curr < 8 && curc - j >= 0) {
        temp.push([curr, curc - j]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    (i = 1), (j = 1);
    while (curr - i >= 0 && curc >= 0) {
        temp.push([curr - i, curc]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    (i = 1), (j = 1);
    while (curr >= 0 && j + curc < 8) {
        temp.push([curr, curc + j]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    // console.log(positions);
    for (let i of positions) {
        // console.log(i);

        for (let j of i) {
            let drow = j[0];
            let dcol = j[1];
            if (drow >= 0 && drow < 8 && drow < 8 && drow >= 0) {
                let posString = drow.toString() + dcol.toString();
                // console.log(posString);
                if (highlightPosition(curPosition, posString) == -1) {
                    break;
                }
            }
        }
    }
}

function showQueenMoves(curPosition) {
    showCamelMoves(curPosition);
    showElephantMoves(curPosition);
}
// showQueenMoves("53");
function showHorseMoves(curPosition) {
    let cell = document.getElementById(curPosition);
    let Imgcell = cell.querySelector("img");
    let Imgname = Imgcell.getAttribute("src");

    let positions = [
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, -2],
        [-1, -2],
        [1, 2],
        [-1, 2],
    ];
    let curr = parseInt(curPosition[0]);
    let curc = parseInt(curPosition[1]);

    for (let i of positions) {
        let curr = i[0] + parseInt(curPosition[0]);
        let curc = i[1] + parseInt(curPosition[1]);

        if (curr >= 0 && curr < 8 && curc < 8 && curc >= 0) {
            let posString = curr.toString() + curc.toString();

            highlightPosition(curPosition, posString);
        }
    }
}
// showHorseMoves("72");



function clearAllMoves() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let cell = document.getElementById(i.toString() + j.toString());

            if (cell.classList.contains("highlighted_cell_filled")) {
                cell.classList.remove("highlighted_cell_filled");
            }
            if (cell.classList.contains("highlighted_cell_empty")) {
                cell.classList.remove("highlighted_cell_empty");

            }
        }
    }
}



// function showOverlay(message) {
//     var overlay = document.getElementById("overlay");
//     var overlayMessage = document.getElementById("overlay-message");

//     overlayMessage.textContent = message;
//     overlay.style.display = "block";

//     setTimeout(function () {
//         overlay.style.opacity = "1";
//     }, 10);
// }
// showOverlay("PLATER 1 won the match");
// function hideOverlay() {
//     var overlay = document.getElementById("overlay");
//     overlay.style.opacity = "0";

//     setTimeout(function () {
//         overlay.style.display = "none";
//     }, 300);
// }







var killedByBlack = 0;
var killedByWhite = 0;
const eliminated = document
    .querySelector(".eliminated")
    .querySelectorAll(".pieces");
let eliminateboxWhite = eliminated[1];
let eliminateboxBlack = eliminated[0];

function killing(cellid) {
    let cell = document.getElementById(cellid);
    let Imgcell = cell.querySelector("img");
    let Imgname = Imgcell.getAttribute("src");

    let imgDiv = document.createElement("div");
    if (Imgname[0] == "b") {
        killedByWhite++;
        imgDiv.appendChild(Imgcell);
        eliminateboxWhite.appendChild(imgDiv);

    } else {
        killedByBlack++;
        imgDiv.appendChild(Imgcell);
        eliminateboxBlack.appendChild(imgDiv);

    }

    if (Imgname[1] == 'k' || killedByBlack == 16 || killedByWhite == 16) {//king is eliminated or all     pieces are eliminated
        console.log("GAME OVER ");

        // exiting 
        //restart game over
    }
    // console.log(Imgname);
}

function move(from, to) {
    //from and to giving table cellid and we moving it

    let fromcell = document.getElementById(from);
    let tocell = document.getElementById(to);

    // let fromcellImg=fromcell.querySelector("img");

    if (tocell.childElementCount == 0) {
        tocell.innerHTML = fromcell.innerHTML;
        fromcell.innerHTML = "";
        moveSound.play();
        // console.log(fromcell.innerHTML,tocell.innerHTML);
    } else {
        killSound.play();
        killing(to);

        tocell.innerHTML = fromcell.innerHTML;

        fromcell.innerHTML = "";
    }

    //if soldier reaches the end of opposites town than give it a new pieces as exchange
    tocell = document.getElementById(to);
    // console.log(tocell);
    const tocellImgName = getImgName(to);
    if ((to[0] == '7' || to[0] == '0') && tocellImgName[1] == 's') {
        // console.log("yes");
        giveChangePiece(to, tocellImgName[0]);
    }
}

function moveElimateBoxTocell(from, to) {
    let tocell = document.getElementById(to);
    console.log(from.innerHTML);
    tocell.innerHTML = from.innerHTML;

    from.innerHTML = "";



}

function removeOtherAnimations(player){
    let divs;
    if (player == 'b') {
        divs = eliminateboxBlack.childNodes;

    }
    else {
        divs = eliminateboxWhite.childNodes;

    }


    for (let div in divs) {
        let img =div.querySelector('img');
        img.classList.remove('border-animation');
    }

}
function giveChangePiece(cellid, player) {
    let imgs;
    if (player == 'b') {
        imgs = eliminateboxBlack.childNodes;
        killedByWhite--;

    }

    else {
        imgs = eliminateboxWhite.childNodes;
        killedByBlack--;

    }
    console.log(imgs);
    for (let imgDiv of imgs) {
        let img = imgDiv.firstChild;
        img.classList.add("border-animation");
        img.addEventListener("click", () => {
            img.classList.remove("border-animation");

            killSound.play();//it's kill sound but suit on it

            moveElimateBoxTocell(imgDiv, cellid);
            removeOtherAnimations(player);


        });
    }
}
// setTimeout(() => {
//     move("01", "21");
// }, 2000);






let lastClickedCell = null;

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        let cellid = (i).toString() + (j).toString();
        let cell = document.getElementById(cellid);

        cell.addEventListener('click', () => {

            let Imgcell = cell.querySelector("img");
            if (cell.classList.contains("highlighted_cell_filled") || cell.classList.contains("highlighted_cell_empty")) {
                move(lastClickedCell, cellid);
                clearAllMoves();

            }
            else if (Imgcell) {
                let Imgname = Imgcell.getAttribute("src");
                clearAllMoves();
                switch (Imgname[1]) {
                    case 's': showSoldierMoves(cellid); break;
                    case 'k': showKingMoves(cellid); break;
                    case 'q': showQueenMoves(cellid); break;
                    case 'c': showCamelMoves(cellid); break;
                    case 'e': showElephantMoves(cellid); break;
                    case 'h': showHorseMoves(cellid); break;

                }
                lastClickedCell = cellid;
            }


        });

    }

}

















