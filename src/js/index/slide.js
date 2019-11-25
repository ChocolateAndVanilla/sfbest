window.onload = function(){
	// var Ol = document.querySelector(".slide_show>ol>li")
	
	var oLi = document.querySelectorAll(".slide_show ol li")	//拿到图片
	var oOl = document.querySelector(".slide_show ol");	//拿到装图片的框框
	var oLis = document.querySelectorAll(".slide_show ul li")	//拿到点点
	// console.log(oLi)
	oLi[0].parentNode.appendChild(oLi[0].cloneNode(true))//克隆第一张图片,再把它放到最后面
	// console.log(oLi[0].parentNode)
	//自动轮播
	var imgIndex = 0;
	var dotIndex = 0;
	// var arrCount = 0;
	var colorArr = ["#F5E2E6","#FFFDFE","#0099C0","#EBBC87","#DEF3F8","#4F368E","#51DAFA","#1C8BC3"]
	
	function autoPlay(){
		imgIndex++;
		if(imgIndex > 8){
			oOl.style.left = "0px";
			imgIndex = 1;
		}
		animate(oOl,{
			left:imgIndex * -1000
		})
		
		//小格子的移动
		dotIndex++;
		if(imgIndex >= 8){
			dotIndex = 0;
		}
		for(var i = 0;i < oLis.length;i++){
			oLis[i].className = "";
		}
		oLis[dotIndex].className = "current";
		document.querySelector(".slide_show").style.backgroundColor = colorArr[dotIndex];
		
	}
	
	var timer = setInterval(autoPlay,2000);
	var screen = document.querySelector("#index_slide");
	screen.onmouseenter = function(){
		clearInterval(timer);
	}
	screen.onmouseleave = function(){
		timer = setInterval(autoPlay,2000)
	}
	
	for(var i = 0;i < oLis.length;i++){
		oLis[i].tmpIndex = i;
		oLis[i].onmouseenter = function(){
			imgIndex = dotIndex = this.tmpIndex - 1;
			autoPlay();
		}
	}
}