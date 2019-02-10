function Peg(inx,iny) {
	this.dia = 40
	this.x = inx
	this.y = iny

	this.score = 0
	
	this.colors = []
	this.colors[0] = [255,255,255]
	this.colors[1] = [255,0,0]
	this.colors[2] = [0,255,0]
	this.colors[3] = [0,0,255]
	//this.colors[4] = [0,0,0]
	//this.colors[5] = [255,255,0]
	
	var col_indx = 0
	this.color = this.colors[col_indx]

	this.show = function() {
		stroke(0)
		fill(this.color)
		ellipse(this.x,this.y,this.dia,this.dia)
	}

	//Pegs change color when clicked AND
	//if they are in the current game row.
	this.changecol = function(curRow) {
		var d = dist(mouseX, mouseY, this.x, this.y)
  		var d2 = abs(80+curRow*this.dia-this.y)

  		if (d < this.dia/2 && d2 < this.dia/2) {
    		if (col_indx==this.colors.length-1) {
    			col_indx=0
    		}
    		else {
    			col_indx++	
    		}
    		this.color = this.colors[col_indx]
    	}
	}

	//Picks a random color for a peg.
	//Used in setting up "winning" row.
	this.randcol = function() {
		var r = round(random(this.colors.length-1))
		this.color = this.colors[r]
	}


	this.comparecolor = function(inPeg) {
		var samecol = 1
		for (var i = 0; i < this.color.length; i++) {
			if (this.color[i]!=inPeg.color[i]) {
				samecol = 0
			}	
		}
		return samecol
	}
}
