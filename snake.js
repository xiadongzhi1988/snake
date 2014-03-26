var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
drawGrid(ctx, "lightgrey", 16, 16);


function canvasApp(){

	var canvas = document.getElementById('canvas');
	
	if(!canvas||!canvas.getContext){
		return;
	}
	var ctx = canvas.getContext('2d');

	if (!ctx){
		return;
	}
	var rotation=0;
	var x=50;
	var y=50;
}

function drawGrid(ctx, color, stepx, stepy) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.strokeStyle = color;
	ctx.lineWidth = 0.5;

	for (var i = stepx + 0.5; i < ctx.canvas.width; i += stepx) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, ctx.canvas.height);
		ctx.stroke();
		ctx.closePath();
	}
	
	for (var i = stepy + 0.5; i < ctx.canvas.height; i += stepy) {
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(ctx.canvas.width, i);
		ctx.stroke();
		ctx.closePath();
	}
	ctx.restore();
}