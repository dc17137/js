function Game(){
	this.dom = document.createElement("div");
	this.score= document.createElement("div");
	this.go = document.createElement("p");
	this.pause = document.createElement("p");
	this.ctn = document.createElement("p");
	this.row = 20 ;
	this.col = 20 ;
	this.arr = [] ;
	this.snake = null;
	this.timer = null ;
	this.scores = 0 ;
	this.food = null ;
	this.zhangai = null;
	this.init();
}
Game.prototype = {
	constructor:Game,
	fillDom : function(){
		this.dom.className = "map";
		for(var i = 0 ; i <this.row ; i ++){
			var row = document.createElement("div");
			var arr = [];
			row.className = "row";
			for(var j = 0 ; j < this.col ; j ++){
				var block = document.createElement("div");
				arr.push(block);
				block.className = "block";
				row.appendChild(block);
			}
			this.dom.appendChild(row);
			this.arr.push(arr);
		}
	},
	goDom:function(){
		this.go.className = "go";
		this.go.innerHTML = "开始游戏"
	},
	pauseDom:function(){
		this.pause.className = "pause";
		this.pause.innerHTML = "暂停游戏";
	},
	ctnDom:function(){
		this.ctn.className = "continue";
		this.ctn.innerHTML = "继续游戏";
	},
	scoreDom:function(){
		this.score.className = "score";
		this.score.innerHTML = "当前分数为："+ this.scores;
	},
	uptree : function(){
		document.body.appendChild(this.dom);
		document.body.appendChild(this.score);
		document.body.appendChild(this.go);
		document.body.appendChild(this.pause);
		document.body.appendChild(this.ctn);
	},
	createSnake : function(){
		this.snake = new Snake();
	},
	renderSnake : function(){
		if(!this.snake.alive){
			return;
		}
		for(var i = 0 ; i < this.snake.snakeArr.length ; i ++){
			this.arr[this.snake.snakeArr[i].x][this.snake.snakeArr[i].y].style.backgroundColor = "red";
		  this.arr[this.snake.snakeArr[i].x][this.snake.snakeArr[i].y].style.borderRadius = "0";
		}
	},
	bindEvent :function (){
		var me = this ;
		document.onkeydown = function(e){
			if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
				me.snake.changeForward(e.keyCode);
			}
		}
	},
	start :function(){
		var me = this ;
		this.timer = setInterval(function(){
			me.snake.move();
			if(me.snake.checkMove()){
				me.end();
				return;
			}
			me.checkMove();
			me.checkEat();
			me.checkZhangAi();
			me.clear();
			me.renderSnake();
			me.renderZhangAi();
			me.renderFood();
		},500)
	},
	end :function(){
		clearInterval(this.timer);
		alert("游戏结束！")
	},
	checkMove:function(){
		var snake_h = this.snake. snakeArr[this.snake.snakeArr.length -1];
		if(snake_h.x >= this.row || snake_h.y >= this.col || snake_h.x < 0 || snake_h.y < 0 ){
			this.snake.die();
			this.end();
		}
	},
	clear :function(){
		if(!this.snake.alive){
			return;
		}
		for(var i = 0 ;i <this.arr.length ;i++){
			for(var j = 0 ;j <this.arr[0].length; j++){
				this.arr[i][j].style = "";
			}
		}
	},
	init :function(){
		this.createSnake();
		this.createZhangAi();
		this.createFood();
		this.fillDom();
		this.goDom();
		this.pauseDom();
		this.ctnDom();
		this.scoreDom();
		this.uptree();
		this.bindEvent();
		this.start();
	},
	createFood:function(){
		var x = 0 ; 
		var y = 0 ;
		x = parseInt(Math.random() * this.row);
		y = parseInt(Math.random() * this.col);
		var arr = this.snake.snakeArr.concat(this.zhangai.arr);
		for(var i = 0 ; i<arr.length ; i ++){
			if(x === arr[i].x && y === arr[i].y){
				x = parseInt(Math.random() *this.row);
				y = parseInt(Math.random() *this.col);
				i = 0 ;
				continue;
			}
		}
		this.food = new Food(x,y);
	},
	renderFood:function(){
		this.arr[this.food.x][this.food.y].style.backgroundColor = "pink";
		this.arr[this.food.x][this.food.y].style.borderRadius = "50%";
	},
	checkEat:function(){
		if(this.snake.snakeArr[this.snake.snakeArr.length-1].x === this.food.x && this.snake.snakeArr[this.snake.snakeArr.length-1].y === this.food.y){
			this.createFood();
			this.snake.growUp();
			this.scores++;
			console.log("当前分数是:"+this.scores);
			this.score.innerHTML = "当前分数为："+ this.scores;
		}
	},
	createZhangAi:function(){
		this.zhangai = new ZhangAi();
	},
	renderZhangAi:function(){
		for(var i= 0 ; i<this.zhangai.arr.length ; i ++){
			this.arr[this.zhangai.arr[i].x][this.zhangai.arr[i].y].style.backgroundColor = "green";
		}
	},
	checkZhangAi:function(){
		var head = this.snake.snakeArr.slice(-1)[0];
		for(var i =0;i<this.zhangai.arr.length;i++){
			if(head.x === this.zhangai.arr[i].x && head.y === this.zhangai.arr[i].y){
				// 撞上了
				this.snake.die();
				this.end();
			}
		}
	}
}