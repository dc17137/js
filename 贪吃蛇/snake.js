function Snake(){
	this.snakeArr = [
		{x:0,y:0},
		{x:0,y:1},
		{x:0,y:2}
	];
	this.alive = true ;
	this.forward = 39 ;
}
Snake.prototype = {
	constructor:Snake,
	move: function(){
		this.snakeArr.shift();
		if(this.forward === 37){
			this.snakeArr.push({
				x:this.snakeArr[this.snakeArr.length-1].x,
				y:this.snakeArr[this.snakeArr.length-1].y-1
			})
		}else if(this.forward === 38){
			this.snakeArr.push({
				x:this.snakeArr[this.snakeArr.length-1].x-1,
				y:this.snakeArr[this.snakeArr.length-1].y
			})
		}else if(this.forward === 39){
			this.snakeArr.push({
				x:this.snakeArr[this.snakeArr.length-1].x,
				y:this.snakeArr[this.snakeArr.length-1].y+1
			})
		}else if(this.forward === 40){
			this.snakeArr.push({
				x:this.snakeArr[this.snakeArr.length-1].x+1,
				y:this.snakeArr[this.snakeArr.length-1].y
			})
		}																																																																																																	
	},
	changeForward :function(forward){
		if(Math.abs(forward - this.forward) === 2){
			return;
		}
		this.forward = forward ;
	},
	die :function(){
		this.alive = false ;
	},
	checkMove :function(){
		var x = this.snakeArr[this.snakeArr.length - 1].x;
		var y = this.snakeArr[this.snakeArr.length - 1].y;
		for(var i = 0 ; i <this.snakeArr.length - 1 ;  i++){
			if(x === this.snakeArr[i].x && y === this.snakeArr[i].y){
				return true;
			}
		}
	},
	growUp :function(){
		this.snakeArr.unshift(this.snakeArr[0]);
	},
}