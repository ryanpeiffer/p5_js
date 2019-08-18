function Block(row, col, w) {
	this.num = 0
	this.nums = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048]
	this.colors = ['#59c6eb'] //todo: create color palette for each of the numbers
	this.row = row
	this.col = col


	this.show = function() {
		noStroke()
		fill(this.colors[this.num])
		rect(edge+3+this.col*(w+6), edge+3+this.row*(w+6), w, w)

	}

	this.move = function(r, c) {
		this.row = max(min(this.row + r, 3), 0)
		this.col = max(min(this.col + c, 3), 0)
	}



}
