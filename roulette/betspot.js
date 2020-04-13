function Betspot(in_x, in_y, in_w, in_h, 
                 value, col, payout, bet_type) {
  this.x = in_x
  this.y = in_y
  this.w = in_w
  this.h = in_h
  this.value = value
  this.color = col
  this.payout = payout
  this.bettype = bet_type
  
  //determine label based on bet type
  this.label = ''
  if (this.bettype == 'number') {
    this.label = this.value
  } else if (this.bettype == 'third') {
    this.label = (this.value-11) + ' to ' +       this.value
  } else if (this.bettype == 'half') {
    if(this.value == 18) {
      this.label = "1st Half"
    } else {
      this.label = "2nd Half"
    }
  } else if (this.bettype == 'evenodd') {
    this.label = this.value
  }
  
  this.bet = false
  this.win = false
  
  this.show = function() {
    //draw box 
    push()
    stroke(255)  
    strokeWeight(2)
    rectMode(CENTER)
    fill(this.color)
    rect(this.x, this.y, this.w, this.h)
    pop()
   
    //draw label
    push()
    textAlign(CENTER)
    textSize(16)
    strokeWeight(1)
    stroke(180)
    fill(255)
    if (this.bettype != 'number') {
      translate(this.x, this.y)
      rotate(-HALF_PI)
      if (this.bettype != 'third') {
        textSize(12)
      }
      text(this.label, 0, 5)
    } else {
      text(this.label, this.x, this.y + 5)
    }
    pop()  

    //draw a chip if there is a bet placed 
    if (this.bet) {
      push()
      ellipseMode(CENTER)
      stroke(0)
      strokeWeight(1)
      fill([3, 194, 252])
      ellipse(this.x, this.y, 12.5, 12.5)
      pop()
    }    
    
  }
  
  //place a bet if mouse is clicked within the spot
  //clicking again removes the bet
  this.placebet = function() {
    var d_x = dist(mouseX, 0, this.x, 0)
    var d_y = dist(0, mouseY, 0, this.y)
    if (d_x < this.w/2 && d_y < this.h/2) {
      this.bet = !this.bet
    }
  }
  
  //function to check if the bet wins based on ball
  //logic is different for different types of bets
  this.checkwin = function(ball) {
    this.win = false
    
    if(this.bettype == 'number') {
      if(this.value == ball) {
        this.win = true
      }
    } else if (this.bettype == 'third') {
      this.value = int(this.value)  
      if (ball >= this.value-11 && ball <= this.value) {
        this.win = true
       } 
    } else if (this.bettype == 'half') {
      this.value = int(this.value)  
      if(ball > this.value-18 && ball <= this.value) {
        this.win = true
      }
    } else if (this.bettype == 'evenodd') {
      if (this.value == 'Even') {
        if (ball > 0 && ball % 2 == 0) {
          this.win = true
        } 
      } else {
        if (ball > 0 && ball % 2 == 1) {
          this.win = true
        }
      }
    } else if (this.bettype == 'redblack') {
      var ball_color = my_colors[ball_col-1]
      this.win = true
		for (var i = 0; i < this.color.length; i++) {
			if (this.color[i] != ball_color[i]) {
				this.win = false
			}	
		}
    }
    return(this.win)
  }
  
  
}
