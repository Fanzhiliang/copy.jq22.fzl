require.config({
	paths:{
		utils:'utils'
	}
});

define(['utils'],function(utils){
	$("head").append('<style>#backTop{width: 40px;height: 36px;background-image: url("img/iconsprite_btbar.png");background-position: center 5px;background-repeat: no-repeat;position: fixed;right: 10px;bottom: 47px;border-radius: 5px;background-color: rgba(0, 0, 0, 0.5);z-index: 9999;cursor: pointer;opacity: 0;}#backTop.on{transition: opacity 0.3s;opacity: 1;}</style>');
	$("body").append('<div id="backTop"></div>');
	setTimeout(function(){},0);

	//回到顶部
	var backTop = $("#backTop");

	backTop.mousedown(function(){
		if(utils.getScrollTop() >= (utils.getScrollHeight()-utils.getWindowHeight())/4){
			$("html,body").animate({scrollTop:0})
		}
	})

	$(document).scroll(function(){
		if(utils.getScrollTop() >= (utils.getScrollHeight()-utils.getWindowHeight())/4){
			backTop.addClass('on');
		}else{
			backTop.removeClass('on');
		}
	})

})