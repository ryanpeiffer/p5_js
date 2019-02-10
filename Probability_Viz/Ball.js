function Ball (x,y,r,vel) {
	this.x = x
	this.y = y
	this.r = r
	this.vel = vel
	this.counter = 0
	
	this.color = [200,200,200]


	this.show = function () {
		fill(this.color)
		ellipse(this.x,this.y,this.r,this.r)

	}

	this.update = function (ProbBarA,ProbBarB) {
		this.y = this.y + this.vel
		
		//keep ball at bottom of screen instead of falling off
		if (this.y > height-(r/2)) {
			this.y = height-(r/2)
			this.counter++
		}

		// if ball has been at bottom of screen for 10 frames, send it back up with a new random x
		if (this.counter > 50) { 
			this.counter = 0
			this.x = random(r/2,width-r/2)
			this.y = y

		}

		//check to see if the ball has hit either probability bar and update color accordingly
		this.updateColor(this.hitBar(ProbBarA),this.hitBar(ProbBarB))
	}

	this.hitBar = function(ProbBar) {
		if (this.y-this.r/2 > ProbBar.y) { 
			if (this.x+this.r/2 > ProbBar.x && this.x-this.r/2 < ProbBar.x+ProbBar.w) { 
				return true
			}
		}
		else {
			return false
		}

	}

	this.updateColor = function(hitA,hitB) {
		if (hitA) {
			if (hitB) {
				this.color = [255,0,255]   //Purple if hit both
			}
			else {
				this.color = [255,0,0]	   //Red if only hit A	
			}
		}
		else if (hitB) {
			this.color = [0,0,255]	   //Blue if only hit B
		}
		else {
			this.color = [200,200,200] //gray if no hits
		}

	}
		


}
