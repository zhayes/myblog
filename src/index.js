(function () {

	var can = document.getElementById("can");
	var canBox = document.getElementById("canvas-box");

	function canvasRect() {
		canBox.style.height = window.innerHeight + "px";
		can.width = canBox.offsetWidth;
		can.height = canBox.offsetHeight;

	}

	canvasRect();

	window.onresize = function () {
		canvasRect();
	}




	/**********************************************************
	
	CANVAS 绘图 开始
	
	**************************************************************/

	var cxt = can.getContext("2d");

	function Arc() {//圆的构造函数；
		this.x = window.innerWidth * Math.random();
		this.y = window.innerHeight * Math.random();
		this.r = 4;
		this.speed = Math.random();
		this.color = color();
		this.direction = Math.random() * Math.PI * 2;
	}

	Arc.prototype.run = function () {
		this.x += Math.cos(this.direction) * this.speed;
		this.y += Math.sin(this.direction) * this.speed;

		if (this.x <= this.r) {
			this.x = this.r;
			this.direction = Math.PI - this.direction;
		} else if (this.x >= can.offsetWidth - this.r) {
			this.x = can.offsetWidth - this.r;
			this.direction = Math.PI - this.direction;
		}
		if (this.y <= this.r) {
			this.y = this.r;
			this.direction = this.direction - Math.PI;
		} else if (this.y >= can.offsetHeight - this.r) {
			this.y = can.offsetHeight - this.r;
			this.direction = this.direction - Math.PI;
		}
	}

	function drawArc(object) {//画圆的方法；
		cxt.save();
		cxt.strokeStyle = object.color;
		cxt.lineWidth = 1;
		cxt.fillStyle = object.color;
		cxt.beginPath();
		cxt.arc(object.x, object.y, object.r, 0, 2 * Math.PI);
		cxt.closePath();
		cxt.stroke();
		cxt.fill();
		cxt.restore();
	}

	//alert(new Arc().run());
	var arc = [];//圆的寄存地址 数组；

	for (var i = 0; i < 80; i++) {
		arc.push(new Arc());
		//drawArc(arc[i]);
	}



	function flashCanvas() {
		cxt.clearRect(0, 0, can.offsetWidth, can.offsetHeight);
		for (var i = 0; i < arc.length; i++) {
			arc[i].run();
			drawArc(arc[i]);
		}
		requestAnimationFrame(flashCanvas);
	}

	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	requestAnimationFrame(flashCanvas);

	function color() {
		var color = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
		var str = "#";

		var n = 6;
		while (n) {
			var index = Math.floor(Math.random() * 16);
			str += color[index];
			//console.log(num);
			n--;
		}
		//console.log(str);

		return str;
	}
	/**************************************************************
	
	CANVAS 绘图 结束
	
	****************************************************************/


	$('.nav-img').click(function () {
		$('.show-ul').toggle();
	});
})()
