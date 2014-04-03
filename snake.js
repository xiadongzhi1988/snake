window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
	canvasApp();
}

function canvasApp() {	
	var theCanvas = document.getElementById("canvas");

	if (!theCanvas || !theCanvas.getContext) {
		return;
	}

	var context = theCanvas.getContext("2d");

	if (!context) {
		return;
	}
	
	var snakeLength = 20;
	var	snakeHeight = 20;
	var x = 60;
	var y = 60;
	var dx = 0;
	var dy = 0;
	var m=300;
	var n=300;
	var snakeinitLength = 4;
	var snake = new Array();

	snake = [{x: 20, y: 60}, {x: 40, y: 60}, {x: 60, y: 60}, {x: 80, y: 60}];

	function drawScreen() {	
		drawGrid(context, "lightgrey",snakeLength, snakeHeight);
		context.font = "30px Arial";
		context.fillStyle = "#cd2828";
		/*
		x += dx;
		y += dy;
		context.fillRect(x,y,snakeLength,snakeHeight);
		context.fillRect(x-snakeLength,y,snakeLength,snakeHeight);
		context.fillRect(x-2*snakeLength,y,snakeLength,snakeHeight);
		*/
		snakeBodyMove();
		snake[snake.length-1].x += dx;
		snake[snake.length-1].y += dy;
		for (var i = 0; i < snake.length-1; i++) {
			context.fillRect(snake[i].x, snake[i].y, 20, 20);
			}
		Growth();	
		gameover();
		
	}
	
	function snakeBodyMove() {
		for (var j = 0; j < snake.length-1; j++){
				snake[j].x = snake[j+1].x;
				snake[j].y = snake[j+1].y; 			
			}	
			
		/*
		snake[snakeinitLength-1] = {
			x: snake[snakeinitLength-2].x + dx,
			y: snake[snakeinitLength-2].y + dy
		};
		*/ 	
	}
	function Growth(){
		context.fillStyle="#cd2828";
		context.fillRect(m,n,20,20);
		if(m==snake[snake.length-1].x&&n==snake[snake.length-1].y){
			snake.length+=1;
			isFood();
			}
		}
	
	function isFood(){
		var m=Math.floor(Math.random()*25)*20;
		var n=Math.floor(Math.random()*25)*20;
		}
		
	window.onkeydown=processkey;
	function processkey(e) {
	switch (e.keyCode) {
		case 37:
		case 65:
			if (dx != snakeLength) {
				dx = -snakeLength;
				dy = 0;
			}
			//snakeBodyMove();
			break;
		case 38:
		case 87:
			if(dy!=snakeHeight)
			{dy = -snakeHeight;
			dx = 0;}
			//snakeBodyMove();
			break;
		case 39:
		case 68:
			if(dx!=-snakeLength)
			{dx = snakeLength;
			dy = 0;}
			//snakeBodyMove();
			break;
		case 40:
		case 83:
			if(dy!=-snakeHeight)
			{dy = snakeHeight;
			dx = 0;}
			//snakeBodyMove();
			break;
			}
	}		
	
	function boundingBoxCollide() {
		var left1 = 0;
		var left2 = snake[snake.length-1].x;
		var right1 = canvas.width;
		var right2 = snake[snake.length-1].x+20;
		var top1 = 0;
		var top2 = snake[snake.length-1].y;
		var bottom1=canvas.height;
		var bottom2=snake[snake.length-1].y+20;
		if(left1 > left2)
			return false;
		if(right1 < right2)
			return false;
		if(top1 > top2)
			return false;
		if(bottom1 < bottom2)
			return false;
		return true;
	}

	function drawGrid(context, color, stepx, stepy) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.save();
		context.strokeStyle = color;
		context.lineWidth = 0.5;

		for (var i = stepx + 0.5; i <canvas.width; i += stepx) {
			context.beginPath();
			context.moveTo(i, 0);
			context.lineTo(i, canvas.height);
			context.stroke();
			context.closePath();
		}

		for (var i = stepy + 0.5; i < canvas.height; i += stepy) {
			context.beginPath();
			context.moveTo(0, i);
			context.lineTo(canvas.width, i);
			context.stroke();
			context.closePath();
		}
		context.restore();
	}
	
	function gameover(){
		if(boundingBoxCollide() ==false){
		//while(1)
		context.fillStyle="#00B7BF";
		context.fillRect(0,0,canvas.width,canvas.height);
		context.fillStyle="#000000";
		context.fillText("Game Over",(canvas.width-30*6)/2,(canvas.height-20)/2);
		x=-1000;
		
		}
	}
	
	const FRAME_RATE = 5;//The game is lowly sensitive to game'FRAME_RATE 
	var intervalTime = 1000/FRAME_RATE;
	setInterval(drawScreen, intervalTime);
		
}