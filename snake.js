window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded(){
	canvasApp();
}

function canvasApp() {
	var canvas = document.getElementById("canvas");

	if(!canvas||!canvas.getContext){
		return;
	}
	var context = canvas.getContext("2d");

	if (!context){
		return;
	}
	
	var x=0;
	var y=0;
	var dx=0;
	var dy=0;
	
	function drawScreen(){
		drawGrid(context, "lightgrey", 16, 16);

		context.fillStyle = "#cd2828";
		context.fillRect(x, y, 20, 20);
		context.fill;
		x += dx;
		y += dy;
		
		
	}

	window.onkeydown = processkey;

	function processkey(e){
		var keyCode = e.keyCode;

		switch (keyCode) {
			case 37:
			case 65:
				dx = -2;
				dy = 0;
				break;
			case 38:
			case 87:
				dy = -2;
				dx = 0;
				break;
			case 39:
			case 68:
				dx = 2;
				dy = 0;
				break;
			case 40:
			case 83:
				dy = 2;
				dx = 0;
				break;
			case 82:
				undo();
				break;
		}		
	}
	


	function drawGrid(context, color, stepx, stepy) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.save();
		context.strokeStyle = color;
		context.lineWidth = 0.5;

		for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
			context.beginPath();
			context.moveTo(i, 0);
			context.lineTo(i, context.canvas.height);
			context.stroke();
			context.closePath();
		}
		
		for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
			context.beginPath();
			context.moveTo(0, i);
			context.lineTo(context.canvas.width, i);
			context.stroke();
			context.closePath();
		}
		context.restore();
	}

	const FRAME_RATE = 40;
	var intervalTime = 1000/FRAME_RATE;
	setInterval(drawScreen, intervalTime);
}