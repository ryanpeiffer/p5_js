function ProbBar (y,inProb,h,which) {
	this.x = width/2-inProb/100*width/2
	this.y = y
	this.w = inProb/100*width
	this.h = h
	this.which = which

	this.show = function (inProb) {
		noStroke()
		
		if (which == 1) {
			fill(255,0,0)
		}
		else {
			fill(0,0,255)
		}

		this.w = inProb/100*width
		this.x = width/2-this.w/2
		rect(this.x,this.y,this.w,this.h)

	}


}
