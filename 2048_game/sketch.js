
//variables for formatting / window
var w = 500
var edge = 10
var block_width = (w-2*edge)/4 - 6	 //subtracting 2 just to make block slightly smaller than full box

//arrays to store the board / blocks
var board = [0, 1, 2, 3]
var blocks = []

function setup() {

	createCanvas(w, w)

	block1 = new Block(round(random(board)), round(random(board)), block_width)

}

function draw() {
	//Draw the board
	background(0)
	stroke(255)
	strokeWeight(5.5)
	noFill()
	rect(edge, edge, w-2*edge, w-2*edge) //outer border
	for (var i = 3; i > 0; i--) {
		line(edge+i*(w-2*edge)/4, edge, edge+i*(w-2*edge)/4, w-edge) //vertical inner lines
		line(edge, edge+i*(w-2*edge)/4, w-edge, edge+i*(w-2*edge)/4) //horizontal inner lines
	}

	//draw blocks
	block1.show()

}


function keyPressed() {
	if(keyCode === LEFT_ARROW)       {block1.move(0, -1)}
	else if(keyCode === RIGHT_ARROW) {block1.move(0, 1)}
	else if(keyCode === UP_ARROW)    {block1.move(-1, 0)}
	else if(keyCode === DOWN_ARROW)  {block1.move(1, 0)}

}
