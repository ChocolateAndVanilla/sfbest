function myScroll(){
	if(window.pageXOffset != undefined){
		return {
			left:window.pageXOffset,
			top:window.pageYOffset
		}
	}
	else if(document.compatMode == "CSS1Compat"){
		return {
			left:document.documentElement.scrollLeft,
			top:document.documentElement.scrollTop
		}
	}
	return {
		left:document.body.scrollLeft,
		top:document.body.scrollTop
	}
}
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	return window.getComputedStyle(obj,null)[attr];
	
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;
		for(attr in json){
			var current = 0;
			var target = 0;
			if(attr == "opacity"){
				current = getStyle(obj,attr) * 100;
				target = json[attr] * 100;
			}
			else{
				current = parseInt(getStyle(obj,attr));
				target = parseFloat(json[attr])
			}
			
			var step = (target - current) / 10;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			if(attr == "opacity"){
				obj.style[attr] = (current + step) / 100;
				obj.style.filter = "alpha(opacity=" + (current + step) + ")";
			}
			else if(attr == "zIndex"){
				obj.style.zIndex = target;
			}
			else{
				obj.style[attr] = current + step + "px";
			}
			if(current != target){
				flag = false;
			}
		}
		if(flag){
			clearInterval(obj.timer);
			if(typeof(callback) == "function"){
				callback();
			}
		}
	},30)
}