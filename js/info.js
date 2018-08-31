require.config({
	paths:{
		utils:'utils',
		jquery:'jquery.min',
		bootstrap:'bootstrap.min',
		footer:'footer',
		loginPanel:'login-panel',
		dataTitle:'dataTitle',
		backTop:'backTop'
	},
	shim:{
		jquery:{exports:'jquery'},
		bootstrap:{deps:['jquery']},
		footer:{deps:['jquery']},
		loginPanel:{deps:['jquery']},
		dataTitle:{deps:['jquery']},
		backTop:{deps:['jquery']}
	}
});

require(['utils','jquery','bootstrap','footer','loginPanel','dataTitle','backTop'],function(utils,$){
	$(document).ready(function(){
		//加载完成
		$("html").show();

		//用户头像下的下拉菜单
		var usermenu = $(".usermenu"),
			userlogin = $(".userlogin"),
			menuToogle = function(){
				if(utils.getWindowWidth()>=768){
					$(this).toggleClass('open');
				}
			}
		usermenu.hide();
		usermenu.click(function(e){
			e.stopPropagation();
			if(utils.getWindowWidth()<768){
				$(this).toggleClass('open');
			}
		})
		usermenu.hover(menuToogle,menuToogle);

		//模拟登录和退出
		var loginPanel = $("#login-panel"),
			signOut = $("#sign-out"),
			loginSuccess = function(e){
				e.preventDefault();
				userlogin.hide();
				usermenu.show();
				loginPanel.modal('hide');
			},
			exitLogin = function(e){
				e.preventDefault();
				userlogin.show();
				usermenu.hide();
				usermenu.removeClass('open');
			}
		userlogin.find('a').click(function(e){
			e.preventDefault();
			loginPanel.modal('show');
		})
		loginPanel.find("form").submit(loginSuccess);
		loginPanel.find(".panel-footer a").click(loginSuccess);
		signOut.click(exitLogin);

		//滚动定位中部导航栏
		var headerTop = $(".header .header-top"),
			limitHeight = parseFloat(headerTop.css('height')),
			mainNav = $(".main .main-nav"),
			scrollHandler = function(e){
				if(utils.getScrollTop()>limitHeight){
					mainNav.addClass('isTop');
				}else{
					mainNav.removeClass('isTop');
				}
			};
		scrollHandler();
		$(document).scroll(scrollHandler);

		//中部导航栏的下拉菜单
		var liItems = mainNav.find(".nav-inner li"),
			dropPanel = $(".main .drop-panel"),
			dropItems = dropPanel.find(".drop-item"),
			mainBody = $(".main .main-body"),
			isShowPanel = false,
			showDropPanel = function(that,i){
				mainNav.find("li.hover").removeClass('hover');
				$(that).addClass('hover');
				if(dropItems[i]){
					dropPanel.show();
					mainBody.addClass('blur');
					var temp = dropItems.filter(".on");
					temp.removeClass('on');
					temp.css('opacity',0);
					$(dropItems[i]).addClass('on');
					$(dropItems[i]).animate({opacity:1});
				}else{
					resetSomething();
				}
				isShowPanel = true;
			},
			resetSomething = function(){
				dropItems.removeClass('on');
				dropItems.css('opacity',0);
				dropPanel.hide();
				mainBody.removeClass('blur');
				isShowPanel = false;
			}
		liItems.each(function(i){
			$(this).mouseenter(function(e){
				e.preventDefault();
				if(utils.getWindowWidth()>=768){
					showDropPanel(this,i);
				}
			})
			$(this).mousedown(function(e){
				e.preventDefault();
				if(utils.getWindowWidth()<768){
					if(isShowPanel){
						liItems.removeClass('hover');
						resetSomething();
					}else{
						showDropPanel(this,i);
					}
				}
			})
		})

		mainNav.mouseleave(function(){
			liItems.removeClass('hover');
			resetSomething();
		})
		mainNav.click(function(e){
			e.preventDefault();
			e.stopPropagation();
		})
		$(document).click(function(){
			liItems.removeClass('hover');
			resetSomething();
		})

		//右边搜索
		var search = $("form.search"),
			searchInput = search.find("input"),
			submitBtn = search.find(".submit");

		submitBtn.mousedown(function(){
			console.log(searchInput.val().trim().length)
			if(searchInput.val().trim().length>0){
				search.submit();
			}
		})

		//改变颜色
		var changeColor = $(".change-color"),
			changeToggle = changeColor.find(".toggle"),
			hoverToggle = function(){
				if(utils.getWindowWidth()>=992){
					changeColor.toggleClass('hover');
				}
			}
		changeColor.find("[data-color]").mousedown(function(){
			var color = this.dataset.color;
			if(color){
				$(".main").css('background-color',color);
			}
		})

		changeColor.hover(hoverToggle,hoverToggle)

		changeToggle.click(function(e){
			e.stopPropagation();
			e.preventDefault();
		})

		changeToggle.mousedown(function(e){
			e.preventDefault();
			e.stopPropagation();
			console.log(console.log(changeColor))
			if(utils.getWindowWidth()<=991){
				changeColor.toggleClass('hover');
			}
		})

		//右边个人信息页面滚动事件
		var sidebar = $(".sidebar"),
			author = sidebar.find(".author"),
			sidebarHandler = function(){
				if(utils.getScrollTop() >= sidebar.height()){
					author.css({
						position: 'fixed',
						top: '123px',
						left: (parseFloat($(".main-inner").css('margin-left'))+($(".main-inner .body").width()+40))+'px',
						width: sidebar.css('width')
					});
					author.addClass('fade-top-down');
				}else{
					author.css({position: '',top: '',left: '',width:''});
					author.removeClass('fade-top-down');
				}
			}
		sidebarHandler();
		$(document).scroll(sidebarHandler);
		$(window).resize(sidebarHandler)
	})
});