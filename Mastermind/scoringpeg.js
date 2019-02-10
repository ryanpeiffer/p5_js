function Scoringpeg(inx,iny) {
	this.dia = 20
	this.x = inx
	this.y = iny

	this.score = 0
	
	this.colors = []
	this.colors[0] = [255,255,255]
	this.colors[1] = [255,0,0]
	this.colors[2] = [0,0,0]

	this.color = this.colors[this.score]

	this.show = function() {
		stroke(0)
		fill(this.color)
		ellipse(this.x,this.y,this.dia,this.dia)
	}



}
