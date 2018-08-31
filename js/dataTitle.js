define(function(){
	$("head").append('<style>#dataTitle{display: inline-block;height: 35px;line-height: 35px;color: #fff;font-size: 12px;text-align: center;background-color: #000; padding: 0 8px;position: absolute;top: -99px;left: 0;z-index: 9999;border-radius: 5px;transform: translate(-50%,-140%);opacity: 0;}#dataTitle:before{content: "";width: 0;height: 0;border: 6px solid transparent;border-top-color: #000;position: absolute;bottom: -11px;left: 50%; margin-left: -6px;}</style>');
	$("body").append('<div id="dataTitle">title提示内容</div>');
	setTimeout(function(){},0);

	var dataTitle = $("#dataTitle");
	$(document).on('mouseenter','[data-title]',function(e){
		var target = e.currentTarget,
			title = target.dataset.title,
			targetWidth = parseFloat($(target).css('width'));
		dataTitle.text(title);
		
		dataTitle.css({
			top: $(target).offset().top + 'px',
			left: ($(target).offset().left + targetWidth/2) + 'px'
		});
		dataTitle.animate({opacity:1});
	})

	$(document).on('mouseleave','[data-title]',function(e){
		dataTitle.css({
			top: '-99px',
			opacity:0
		})
	})
})