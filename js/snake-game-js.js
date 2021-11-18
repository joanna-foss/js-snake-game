// WHAT YOU'RE DOING NOW:
// https://thoughtbot.com/blog/html5-canvas-snake-game#eat-food-grow-longer

console.log("test");

const snakeboard = document.getElementById("gameCanvas");
const ctx = snakeboard.getContext("2d");

let x = 200;
let y = 200;
let head = [x, y];
let snakeBody = [];
let gridSize = 10;
let direction = 'right';

$(document).keydown(function(e){
	switch(e.code){
		case ('ArrowUp'):
			console.log("You pressed up!");
			direction = 'up';
			break;
		case ('ArrowRight'):
			console.log("You pressed right!");
			direction = 'right';
			break;
		case ('ArrowDown'):
			console.log("You pressed down!");
			direction = 'down';
			break;
		case ('ArrowLeft'):
			console.log("You pressed left!");
			direction = 'left';
			break;
		default:
			console.log("You pressed a key!");
			break;
	}
});

function drawSnake(){
	snakeBody.push([head[0], head[1]]);
	ctx.fillStyle = '#ffd500';
	ctx.fillRect(head[0], head[1], gridSize, gridSize);
	if (snakeBody.length > 3) {
		let removePart = snakeBody.shift();
		ctx.clearRect(removePart[0], removePart[1], gridSize, gridSize);
	}
}

function moveSnake() {
	switch(direction){
		case 'up': {
			moveUp();
			break;
		}
		case 'right': {
			moveRight();
			break;
		}
		case 'down': {
			moveDown();
			break;
		}
		case 'left': {
			moveLeft();
			break;
		}
		default: {console.log('none');}
	}
};

function left(){
	return head[0] - gridSize;
}

function right(){
	return head[0] + gridSize;
}

function up(){
	return head[1] - gridSize;
}

function down(){
	return head[1] + gridSize;
}

function moveUp(){
	if(up()>=0){
		executeMove('up', 1, up())
	}
}

function moveDown(){
	if(down()<=490){
		executeMove('down', 1, down())
	}
}

function moveLeft(){
	if(left()>=0){
		executeMove('left', 0, left())
	}
}

function moveRight(){
	if(right()<=490){
		executeMove('right', 0, right())
	}
}

function executeMove(dir, axType, axVal){
	direction = dir;
	head[axType] = axVal;
	drawSnake();
}

// function makeFood() {
// 	let foodPoint = [Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)];
//
// 	ctx.fillStyle = "#ff0000";
// 	ctx.fillRect(foodPoint[0], foodPoint[1], gridSize, gridSize);
// }

setInterval(moveSnake, 100);
// makeFood();
drawSnake();