function Card(suit, value) {
  this.suit = suit
  this.text = value
  if(value == 'A') {
    this.value = 11 //placeholder, see function below for 1 vs 11 logic
  } else if (value=='J' | value=='Q' | value=='K') {
    this.value = 10
  } else {
    this.value = value
  }
  if(value >= 2 & value <= 6) {
    this.countval = 1
  } else if(value >= 7 & value <= 9) {
    this.countval = 0
  } else {
    this.countval = -1
  }

  //values for formatting card
  this.w = 50
  this.h = (3/2) * this.w
  this.corner = this.w / 5
  this.textsize = 26

  this.show = function(in_x, in_y) {
    this.x = in_x
    this.y = in_y
    
    //draw outline of card
    stroke(0)
    strokeWeight(1)
    fill(255)
    rectMode(CORNER)
    rect(this.x, this.y, this.w, this.h, this.corner)      
    //setup for drawing details of card
    if(this.suit == 's' | this.suit == 'c') {
      this.color = 0
    } else {
      this.color = [255,0,0]
    }
    fill(this.color)
    noStroke()
    textSize(this.textsize)
    textAlign(CENTER)
    
    //draw suit
    push()
    translate(this.x + this.w/4,
              this.y + this.h/2)
    
    if(this.suit == 'd') {
      quad(-this.w/8, 0,
           0, this.h/8,
           this.w/8, 0,
           0, -this.h/8)
    } else if(this.suit == 'h') {
      let size = this.w/4
      translate(0, -4)
      beginShape()
      vertex(0, 0);
      bezierVertex(-size / 2, -size / 2, - size, size / 3, 0, size);
      bezierVertex(size, size / 3, size / 2, -size / 2, 0, 0);
      endShape(CLOSE)
    } else if (this.suit == 's') {
      let size = this.w/90
      let numSteps = 36
	  translate(0, 2)
      beginShape()
	  for(var t=0; t<TWO_PI; t+=TWO_PI/numSteps) {
	    var spadex = 16*pow(sin(t),3)
		var spadey = 13*cos(t) - 5*cos(2*t) - 2*cos(3*t) - cos(4*t)
		vertex(size*spadex, size*spadey)
	  }
	  endShape(CLOSE)
    } else if (this.suit == 'c') {
      let size = 8
      ellipse(-size/2 + 0.5, 2, size, size)
      ellipse(size/2 - 0.5, 2, size, size)
      ellipse(0, -size/2 + 0.5, size, size)
    }
    pop()
    
    //write value on card
    push()
    translate(this.x + this.w/2 + 10,
              this.y + this.h/2 + 10)
    text(this.text, 0, 0)
    pop()
  }

  
}
