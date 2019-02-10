/*
TO DO ITEMS:
		
5) create info button to describe game rules
	and how to play?

7) a difficulty chooser? number of colors?

*/

//VARIABLE INITIALIZATION
var pegRow = []
var pegMatrix = []
var scorePegRow = []
var scorePegMatrix = []
var matrixRows = 10
var curRow = matrixRows-1

var winRow = []
var scoreRow = []
var scoringRow = []
var gameScore = 0

var gameOver = false
var endTextCol
var endText



//SETUP FUNCTION
function setup() {

	createCanvas(600,600)
	
	//Create matrix of pegs for game board.
	for (var j = matrixRows-1; j >= 0; j--) {
		pegMatrix[j] = []
		for (var i = 3; i >= 0; i--) {
			pegMatrix[j][i] = new Peg(40+i*40,80+40*j)
		}
	}

	//Create matrix of pegs to show score.
	for (var j = matrixRows*2 - 1; j >= 0; j--) {
		scorePegMatrix[j] = []
		for (var i = 1; i >= 0; i--) {
			scorePegMatrix[j][i] = new Scoringpeg(240+i*20,70+20*j)
		}
	}

	//Create the winning row (what the player is trying to guess).
	for (var i = 3; i >= 0; i--) {
		winRow[i] = new Peg(40+i*40,20)
		winRow[i].randcol()
	}
	
}



//DRAW FUNCTION
function draw() {
	background(255)
	
	//Show matrix of pegs
	for (var j = pegMatrix.length-1; j >= 0; j--) {
		pegRow = pegMatrix[j]
		for (var i = pegRow.length - 1; i >= 0; i--) {
			pegRow[i].show()
		}
	}

	//Show matrix of scoring pegs
	for (var j = scorePegMatrix.length - 1; j >= 0; j--) {
		scorePegRow = scorePegMatrix[j]
		for (var i = scorePegRow.length - 1; i >= 0; i--) {
			scorePegRow[i].show()
		}
	}

	//Show winning row
	for (var i = winRow.length - 1; i >= 0; i--) {
			winRow[i].show()
	}

	//Cover winning row until gameOver
	textSize(24)
	fill(0)
	text("Click on pegs to select color",280,80)
	text("Hit enter to submit guess",280,120)

	if(!gameOver) {
		fill(0)
		rect(20,0,160,40)
	
	}

	if(gameOver) {
		fill(endTextCol)
		text(endText,280,150)
	}
}




//Function to change color of peg if clicked
function mousePressed () {
	for (var j = pegMatrix.length -1; j >= 0; j--) {
		pegRow = pegMatrix[j]
		for (var i = pegRow.length - 1; i >= 0; i--) {
			pegRow[i].changecol(curRow)
		}	
	}

}

function keyPressed() {
	if (keyCode === ENTER) {
		curRow--
		scoreGame()
	}
}

//Function to score the entered row.
function scoreGame() {
	var scoreArray = [0,0,0,0]
	var pegScore = 0

	//SCORING ALGORITHM BELOW:
	scoreRow = pegMatrix[curRow+1]

	//step 1: check for perfect matches
	//pegs with a perfect match get a value of 2
	for (var i = 0; i < scoreRow.length; i++) {
		pegScore = 2*scoreRow[i].comparecolor(winRow[i])
		scoreRow[i].score = pegScore
		winRow[i].score = pegScore

		scoreArray[i] = scoreRow[i].score 
	}

	//Console logs for debugging
/*	console.log("step 1")
	console.log(scoreArray)*/

	/*step 2: check for right color, wrong place
	1)go through each peg in winRow
	2) if not already matched, loop through scoreRow
	3) if a peg in scoreRow is not already matched,
		then compare its color to the selected peg in winRow
	4) if the colors match, give the scoreRow peg value of 1
		****AND EXIT THE scoreRow loop!!!
	*/
	for (var i = 0; i < scoreRow.length; i++) {
		if (scoreRow[i].score == 0) {
			for (var j = 0; j < winRow.length; j++) {
				if (winRow[j].score == 0) {
					pegScore = scoreRow[i].comparecolor(winRow[j])
					scoreRow[i].score = pegScore
					winRow[j].score = pegScore
					if (pegScore != 0) {
						scoreArray[i] = pegScore
						break
					}
				}
			}
		}
	}

	//Console logs for debugging
/*	console.log("step 2")
	console.log(scoreArray)*/

	//Color the scoreArray
	scoreColorRow = 2*(curRow+1)
	shuffle(scoreArray,true) //supposedly this function will be removed eventually?

	scorePegMatrix[scoreColorRow][0].color = scorePegMatrix[scoreColorRow][0].colors[scoreArray[0]]	
	scorePegMatrix[scoreColorRow][1].color = scorePegMatrix[scoreColorRow][1].colors[scoreArray[1]]
	scorePegMatrix[scoreColorRow+1][0].color = scorePegMatrix[scoreColorRow+1][0].colors[scoreArray[2]]
	scorePegMatrix[scoreColorRow+1][1].color = scorePegMatrix[scoreColorRow+1][1].colors[scoreArray[3]]	

	gameScore = 0
	for (var i = 0; i < scoreArray.length; i++) {
		gameScore += scoreArray[i]
	}

	if (gameScore==8) {	
		gameOver = true
		endTextCol = [0,255,0]
		endText = "You win! Refresh to play again"
	}
	else if (curRow < 0) {
		gameOver = true
		endTextCol = [255,0,0]
		endText = "You lose! Refresh to try again"
	}
}


