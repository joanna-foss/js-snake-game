const snakeboard = document.getElementById("gameCanvas");
const c = snakeboard.getContext("2d");

let x;
let y;
let head;
let snakeBody;
let gridSize;
let direction;
let snakeLength;
let foodPoint;
let boardWidth;
let boardHeight;
let time;
let offset = -10;
let allowPlay;
let interval;

c.translate(offset, offset) 

$('#lets-play').click(function(){
	c.clearRect(0, 0, boardWidth, boardHeight);
	x = 200;
	y = 200;
	head = [x, y];
	snakeBody = [];
	gridSize = 10;
	direction = 'right';
	snakeLength = 2;
	foodPoint = [];
	boardWidth = 450;
	boardHeight = 450;
	time = 100;
	allowPlay = true;
	interval = setInterval(moveSnake, time);
	drawFood();
});

$(document).keydown(function(e){
	switch(e.code){
		case ('ArrowUp'):
			direction = 'up';
			break;
		case ('ArrowRight'):
			direction = 'right';
			break;
		case ('ArrowDown'):
			direction = 'down';
			break;
		case ('ArrowLeft'):
			direction = 'left';
			break;
		default:
			break;
	}
});

function drawSnake(){
	snakeBody.push([head[0], head[1]]);
	c.fillStyle = '#ffd500';
	c.fillRect(head[0], head[1], gridSize, gridSize);
	if (snakeBody.length > snakeLength) {
		let removePart = snakeBody.shift();
		c.clearRect(removePart[0], removePart[1], gridSize, gridSize);
	}
}

function moveSnake() {
	if (checkForEat()){
		snakeLength += 1;
		$('#score').html((snakeLength * 10) - 20);
		drawFood();
	}
	if (checkForWallHit()){
		gameOver();
	}
	if (checkForBodyHit()){
		gameOver();
	}
	switch(direction){
		case 'up':
			moveUp();
			break;
		case 'right':
			moveRight();
			break;
		case 'down':
			moveDown();
			break;
		case 'left':
			moveLeft();
			break;
		default: break;
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
	if(down()<=boardHeight){
		executeMove('down', 1, down())
	}
}

function moveLeft(){
	if(left()>=0){
		executeMove('left', 0, left())
	}
}

function moveRight(){
	if(right()<=boardWidth){
		executeMove('right', 0, right())
	}
}

function executeMove(dir, axType, axVal){
	direction = dir;
	head[axType] = axVal;
	drawSnake();
}

function drawFood() {
	let a = Math.ceil((Math.random() * (boardWidth-20)+10)/10) * 10;
	let b = Math.ceil((Math.random() * (boardHeight-20)+10)/10) * 10;
	foodPoint = [a, b];
	console.log("foodPoint: " + foodPoint);
	if(snakeBody.some((elem) => elem[0] === foodPoint[0] && elem[1] === foodPoint[1])){
		drawFood();
	} else {
		c.fillStyle = '#ff0000';
		c.fillRect(foodPoint[0], foodPoint[1], 8, 8);
	}
}

function checkForEat(){
	return head[0] === foodPoint[0] && head[1] === foodPoint[1];
}

function checkForBodyHit(){
	let hit = false;
	for(let i = snakeBody.length-2; i >=0; --i){
		console.log("snakeBody: " + snakeBody[i][0] + " " + snakeBody[i][1]);
		console.log("head: " + head[0] + " " + head[1]);
		if(snakeBody[i][0] === head[0] && snakeBody[i][1] === head[1]){
			hit = true;
		}
	}
	return hit;
}

function checkForWallHit(){
	return (head[0] === boardWidth || head[0] === 0 || head[1] === boardHeight || head[1] === 0);
}

function gameOver(){
	let score = (snakeLength-2) * 10;
	alert('Game over, pal. You scored: ' + score);
	clearInterval(interval);
	snakeBody = [];
	snakeLength = 2;
	allowPlay = false;
	$('#score').html("");
}