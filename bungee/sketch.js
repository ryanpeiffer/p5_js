let guy;
let newGuy;
let guys = [];
let n_guys = 5;

let guysprite;
let spriteSize = 30

function preload() {
	guysprite = loadImage("https://art.pixilart.com/3d332525384446f.png");
}

function Guy() {
	this.x = random(0, width - spriteSize);
	this.y = random(-80, -35);
	this.vel = 0.85;
	this.accel = 0.12;

	this.show = function() {
		//TODO update to show bungee cord 
		image(guysprite, this.x, this.y);
		push();
		stroke(0);
		strokeWeight(3);
		line(this.x + spriteSize/2, 0,
				 this.x + spriteSize/2, this.y + 2)
		pop();
	}

	this.move = function() {
		this.y += this.vel;
		this.vel += this.accel;
		if(this.y >= height * 0.4) {
			this.accel = -0.16;
		}
	}

}


function setup() {
	createCanvas(400, 400);
	guysprite.resize(spriteSize, 0);

	for(i = 0; i < n_guys; i++) {
		guy = new Guy();
		guys.push(guy);
	}
}

function draw() {
	background('#42c8f5');
	guys[0].show()
	//TODO draw some clouds or something

	for(i = 0; i < n_guys; i++) {
		guys[i].show();
		guys[i].move();
		//once guy hits top on way back up, delete and make new guy
		if(guys[i].y < 0 && guys[i].accel < 0) {
			guys.splice(i, 1, guy = new Guy());
		}
	}

}


