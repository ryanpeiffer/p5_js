/*
Project: an attempt to recreate the conditional probability visualization that can be found at:
			http://setosa.io/conditional/

Created by: Ryan Peiffer
Begin date: 2/9/2019
Last updated: 2/10/2019		


TODO: 
	1) Functionality:
		- figure out how to incorporate P(A & B) as as slider

	2) Beautification:
		- make sliders more obvious, add in equations and explanations (can wait a bit on this)

*/


//Variable Initialization:
var balls = []
var numBalls = 500 //total number of probability balls we want to drop

var aSlider, bSlider 
var aProb = 20
var bProb = 40



function setup() {

	var width = 800
	var height = 200

	createCanvas(width,height)

	aSlider = createSlider(0,100,aProb,1)
	bSlider = createSlider(0,100,bProb,1)

	probBarA = new ProbBar(50,aProb,5,1)
	probBarB = new ProbBar(100,bProb,5,2)

	for (var i = numBalls - 1; i >= 0; i--) {
		ball = new Ball(random(width),random(-numBalls,-10),5,1)
		balls.push(ball)
	}

}	



function draw() {
	background(50)

	aProb = aSlider.value()
	bProb = bSlider.value()

	probBarA.show(aProb)
	probBarB.show(bProb)
	
	for (var i = balls.length - 1; i >= 0; i--) {
		balls[i].update(probBarA,probBarB)
		balls[i].show()
	}


}
