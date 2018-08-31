define(function(){

return {
	isMobile: /Android|webOS|iPhone|iPod|BlackBerry|Phone|Mobile/i.test(navigator.userAgent)?true:false,
	setData: function(key,value,exdays){//使用cookie或storsge保存数据
		value = JSON.stringify(value);
		var storage=window.localStorage;
		exdays = typeof exdays== 'number'?exdays:7;//cookie默认7天
		if(typeof storage !== 'undefined'){
			storage.setItem(key,value);
		}else{
			var d = new Date();
			d.setTime(d.getTime()+(exdays*24*60*60*1000));
			var expires = "expires="+d.toGMTString();
			document.cookie = key + "=" + value + "; " + expires;
		}
	},
	getData: function(key){//获得cookie或storsge保存的数据
		var storage=window.localStorage;
		if(typeof storage !== 'undefined'){
			return JSON.parse(storage.getItem(key));
		}else{
			var name = key + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0; i<ca.length; i++) {
		    	var c = ca[i].trim();
		    	if (c.indexOf(name)==0){
					return JSON.parse(c.substring(name.length,c.length));
		    	}
		    }
		    return "";
		}
	},
	removeData: function(key){//删除cookie或storsge保存数据
		var storage=window.localStorage;
		if(typeof storage !== 'undefined'){
			storage.removeItem(key);
		}else{
			var d = new Date();
			d.setTime(d.getTime()-1);
			var expires = "expires="+d.toGMTString();
			document.cookie = key + "=" + '' + "; " + expires;
		}
	},
	camelize: function (attr) {// - 转驼峰
	    // /\-(\w)/g 正则内的 (\w) 是一个捕获，捕获的内容对应后面 function 的 letter
	    // 意思是将 匹配到的 -x 结构的 x 转换为大写的 X (x 这里代表任意字母)
	    return attr.replace(/\-(\w)/g, function(all, letter) {
	        return letter.toUpperCase();
	    });
	},
	getStyle: function(ele,attr){//获得样式
		var style = window.getComputedStyle(ele, null);
		if(style){
			return style.getPropertyValue(attr);
		}else{
			return ele.currentStyle.getAttribute(this.camelize(attr));
		}
	},
	setStyle: function(ele,attr,value){//设置样式
		ele.style[this.camelize(attr)] = value;
	},
	getScrollTop: function(){//获得当前垂直滚动位置
		var _body = 0,_doc = 0;
		if(document.body){
			_body = document.body.scrollTop;
		}
		if(document.documentElement){
			_doc = document.documentElement.scrollTop;
		}
		return _body>_doc?_body:_doc;
	},
	setScrollTop: function(_height){//设置垂直滚动位置
		if(document.body){
			document.body.scrollTop = _height;
		}
		if(document.documentElement){
			document.documentElement.scrollTop = _height;
		}
	},
	getScrollHeight: function(){//获得页面总高度
		var _body = 0,_doc = 0;
		if(document.body){
			_body = document.body.scrollHeight;
		}
		if(document.documentElement){
			_doc = document.documentElement.scrollHeight;
		}
		return _body>_doc?_body:_doc;
	},
	getWindowWidth: function(){//获得屏幕宽度
		var _width = 0;
		if(document.compatMode == "CSS1Compat"){
			_width = document.documentElement.clientWidth;
		}else{
			_width = document.body.clientWidth;
		}
		return _width;
	},
	getWindowHeight: function(){//获得屏幕高度
		var _height = 0;
		if(document.compatMode == "CSS1Compat"){
			_height = document.documentElement.clientHeight;
		}else{
			_height = document.body.clientHeight;
		}
		return _height;
	},
	getOffset: function(ele){//获得节点离body偏移量
		var offset = {
			top: ele.offsetTop,
			left: ele.offsetLeft
		}
		if(!ele.offsetParent){
			return offset;
		}else{
			var parentOffset = this.getOffset(ele.offsetParent);
			return {
				top: offset.top + parentOffset.top,
				left: offset.left + parentOffset.left
			}
		}
	},
	arrayDeleteRepeat: function(arr){
		if(arr && Object.prototype.toString.call(arr) !== '[object Array]'){
			return false;
		}
		var tempObj = {},
			type = '',
			result = [];
		arr.forEach(function(a){
			type = typeof a;
			if(typeof tempObj[a+type] === 'undefined'){
				tempObj[a+type] = a;
				result.push(a);
			}
		});
		return result;
	}
}

})