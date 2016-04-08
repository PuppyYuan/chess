var canvasWidth = 400;
var canvasHeight = 800;
var blockWidth = 20;
var canvas = document.getElementById('eros');
var context = canvas.getContext('2d');
var board = [];
var randomShape = 1;
var shape;
var shapeXY = [];
var shapeHeight = 0;
var t;
var rotate = 0;
var tid;
var startRun = true;
var topTrue = true;
var rectX = 0;
var rectY = 0;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

document.addEventListener('keydown', moveShape);

for (var i = 0; i < 40; i++) {
    board[i] = [];
    for (var j = 0; j < 20; j++) {
        board[i][j] = 0;
    }
}

function getDirection(e) {
    var keyCode = e.which || e.keyCode;
    switch (keyCode) {
        case 1:
        case 38:
        case 269: //up
            return 'up';
        case 2:
        case 40:
        case 270: // down
            return 'down';
        case 3:
        case 37:
        case 271: // left
            return 'left';
        case 4:
        case 39:
        case 272: // right
            return 'right';
        case 339: // exit
        case 240: // back
            return 'back';
    }
}

function moveShape(e) {
    var direction = getDirection(e)
    if (direction == 'right') {

        console.log('I am right');
    } else if (direction == 'left') {

        console.log('I am left');
    } else if (direction == 'up') {

        console.log('I am up');
    } else if (direction == 'down') {

        console.log('I am down');
    }
}

function drawRect(x, y) {
    context.fillStyle = '#f33';
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.fillRect(x, y, blockWidth, blockWidth);
    context.strokeRect(x, y, blockWidth, blockWidth);
}

function redrawCanvas() {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] == 1) {
                drawRect(j * blockWidth, i * blockWidth);
            }
        }
    }
}

function drawLine() {
    for (var i = 0; i < canvasWidth / blockWidth; i++) {
        context.beginPath();
        context.strokeStyle = '#eee';
        context.moveTo(i * blockWidth, 0);
        context.lineTo(i * blockWidth, canvasHeight);
        context.stroke();
    }

    for (var i = 0; i < canvasHeight / blockWidth; i++) {
        context.beginPath();
        context.strokeStyle = '#eee';
        context.moveTo(0, i * blockWidth);
        context.lineTo(canvasWidth, i * blockWidth);
        context.stroke();
    }
}

drawLine();

function drawBoard() {
    if (checkBottom()) return;

    if (startRun == false) {
        context.clearRect(shapeXY[0][1] * blockWidth - 1, shapeXY[0][0] * blockWidth - 1, blockWidth + 2, blockWidth + 2);
        context.clearRect(shapeXY[1][1] * blockWidth - 1, shapeXY[1][0] * blockWidth - 1, blockWidth + 2, blockWidth + 2);
        context.clearRect(shapeXY[2][1] * blockWidth - 1, shapeXY[2][0] * blockWidth - 1, blockWidth + 2, blockWidth + 2);
        context.clearRect(shapeXY[3][1] * blockWidth - 1, shapeXY[3][0] * blockWidth - 1, blockWidth + 2, blockWidth + 2);
    }
    startRun = false;
    drawLine();

    var sp = randomShape;
    shape = shaps[sp - 1];
    t = shape[rotate];
    draw();

}

function draw() {
    var i = 0;
    var tempY = 0;
    shapeXY = [];
    for (i = 0; i < 4; i++) {
        drawRect((t[i * 2] + rectX) * blockWidth, (t[i * 2 + 1] + rectY) * blockWidth);
        shapeXY[i] = [t[i * 2 + 1] + rectY, t[i * 2] + rectX];

        if (topTrue && tempY < (t[i * 2 + 1] + rectY)) {
            tempY = t[i * 2 + 1] + rectY;
            shapeHeight = tempY + 1;
        }
    }
    rectY += 1;
    
}

tid = setInterval(drawBoard, 500);

function checkBottom() {
    if (topTrue) {
        startRun = true;
        topTrue = false;
        rectX = 9;
        rectY = 0;
        randomShape = Math.floor(Math.random() * 7 + 1);

        return;
    }

    if (rectY + shapeHeight - 1 >= 40 || rectY == 0) {
        if (rectY == 0) {
            return false;
        }
        currentShapeOnBotton();
        return true;
    } else {
        if(shapeXY[0][0] == 39 || shapeXY[1][0] == 39 || shapeXY[2][0] == 39 || shapeXY[3][0] == 39){
            currentShapeOnBotton();
            return true;
        }
    }
}

function currentShapeOnBotton(){
    board[shape[0][0]][shape[0][1]] = 1;
    board[shape[1][0]][shape[1][1]] = 1;
    board[shape[2][0]][shape[2][1]] = 1;
    board[shape[3][0]][shape[3][1]] = 1;
    
    if(!clearRow()){
        return;
    }
    
    startRun = true;
    topTrue = true;
    rectX = 9;
    rectY = 0;
    randomShape = Math.floor(Math.random() * 7 + 1);
    // clearInterval(tid);
    // tid=setInterval(drawBoard, 500);
}

function  clearRow() {
    return true;
}

