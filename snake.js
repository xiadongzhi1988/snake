// snake
var reset = document.getElementById("reset");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var SNAKE_WIDTH = 20;

var dx = 0;
var dy = 0;
var m = 0;
var n = 0;
var snake = [];
var head = 0;
var loop = null;

reset.onclick = init;
init();

function init() {
	clearInterval(loop);
	dx = 0;
	dy = 0;
	snake = [{x: 20, y: 60}, {x: 40, y: 60}, {x: 60, y: 60}, {x: 80, y: 60}];
	head = snake.length - 1;
	newFood();

	const FRAME_RATE = 5;
	var intervalTime = 1000/FRAME_RATE;
	loop = setInterval(drawScreen, intervalTime);

	window.onkeydown = processkey;
}

function drawScreen() {
	drawGrid(ctx, "lightgrey", 20, 20);

	ctx.font = "50px Arial";
	ctx.fillStyle = "#cd2828";
	head = snake.length - 1;

	if(dx != 0 || dy != 0) {
		snakeMove();
	}
	snake[head].x += dx;
	snake[head].y += dy;

	for (var i = 0; i < head; i++) {
		ctx.fillRect(snake[i].x, snake[i].y, 20, 20);
	}

	snakeGrow();

	if(boundingBoxCollide() ==false) {
		gameover();
	}

	for (var i = 0; i < snake.length-2; i++) {
		if (snake[head].x == snake[i].x && snake[head]. y == snake[i].y) {
			if (dx != 0 || dy != 0) {
				gameover();
			}
		}
	}
}

function processkey(e) {
switch (e.keyCode) {
	case 37:
	case 65:
		if (dx != SNAKE_WIDTH) {
			dx = -SNAKE_WIDTH;
			dy = 0;
		}
		break;
	case 38:
	case 87:
		if(dy != SNAKE_WIDTH) {
			dy = -SNAKE_WIDTH;
			dx = 0;
		}
		break;
	case 39:
	case 68:
		if(dx != -SNAKE_WIDTH) {
			dx = SNAKE_WIDTH;
			dy = 0;
		}
		break;
	case 40:
	case 83:
		if(dy != -SNAKE_WIDTH) {
			dy = SNAKE_WIDTH;
			dx = 0;
		}
		break;
	}
}

function snakeMove() {

	for (var j = 0; j < head; j++) {
		snake[j].x = snake[j+1].x;
		snake[j].y = snake[j+1].y;
	}	
}

function snakeGrow(){
	ctx.fillStyle = "#cd2828";
	ctx.fillRect(m, n, 20, 20);
	
	/*if((dx == -SNAKE_WIDTH&&m==snake[head].x-20&&n==snake[head].y)
		||(dx == SNAKE_WIDTH&&m==snake[head].x+20&&n==snake[head].y)
		||(dy == SNAKE_WIDTH&&m==snake[head].x&&n==snake[head].y+20)
		||(dy == -SNAKE_WIDTH&&m==snake[head].x&&n==snake[head].y-20)) {
	*/
	if (m == snake[head].x && n == snake[head].y) {
		var snakeHead = {
			x: m,
			y: n
		};
		snake.push(snakeHead);
		newFood();
	}
}

function newFood() {
	var tempM = Math.floor(Math.random()*25)*20;
	var tempN = Math.floor(Math.random()*25)*20;

	for (var i = 0; i < snake.length; i++) {
		if (snake[i].x != tempM && snake[i].y != tempN) {
			m = tempM;
			n = tempN;
		} else {
			newFood();
		}
	}
}

function boundingBoxCollide() {
	var head = snake.length - 1;

	if(snake[head].x < 0 || snake[head].x > canvas.width-20 ||
		snake[head].y < 0 ||snake[head].y > canvas.height-20) {
		return false;
	}
	return true;
}

function gameover() {
	ctx.fillStyle = "#00B7BF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.fillText("Game Over", (canvas.width - 35*6)/2, (canvas.height-20)/2);
	snake[head].x = -1000;
}

function drawGrid(ctx, color, stepx, stepy) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.strokeStyle = color;
	ctx.lineWidth = 0.5;

	for (var i = stepx + 0.5; i < canvas.width; i += stepx) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, canvas.height);
		ctx.stroke();
		ctx.closePath();
	}

	for (var i = stepy + 0.5; i < canvas.height; i += stepy) {
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(canvas.width, i);
		ctx.stroke();
		ctx.closePath();
	}
	ctx.restore();
}
