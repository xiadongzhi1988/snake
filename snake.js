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
		drawGrid(context, "lightgrey", 20, 20);

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
			case 32:
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
	function boundingBoxCollide(){
		var left1=0;
		var left2=x;
		var right1=canvas.width;
		var right2=x+20;
		var top1=0;
		var top2=y;
		var bottom1=canvas.height;
		var bottom2=y+20;
		if(left1>=left2)return(false);
		if(right1<=right2)return(false);
		if(top1>=top2)return(false);
		if(bottom1>=bottom2)return(false);
		return(ture);
	    }
	function gameover(){
		if(boundingBoxCollide==false){
			context.fillStyle="#00B7BF";
			context.fillRect(0,0,500,300);
			context.fillStyle("#000000");
			context.fillText("Game Over",150,130);
		}

	const FRAME_RATE = 40;
	var intervalTime = 1000/FRAME_RATE;
	setInterval(drawScreen, intervalTime);
}