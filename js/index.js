require.config({
	paths:{
		utils:'utils',
		jquery:'jquery.min',
		bootstrap:'bootstrap.min',
		footer:'footer',
		loginPanel:'login-panel',
		dataTitle:'dataTitle'
	},
	shim:{
		jquery:{exports:'jquery'},
		bootstrap:{deps:['jquery']},
		footer:{deps:['jquery']},
		loginPanel:{deps:['jquery']},
		dataTitle:{deps:['jquery']}
	}
});

require(['utils','jquery','bootstrap','footer','loginPanel','dataTitle'],function(utils,$){
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

		//背景特效
		var bannerIframe = $("#banner-iframe"),
			url = bannerIframe[0].dataset.url,
			getNum = function(n,m){
				return Math.round(Math.random()*(m-1))+n;
			},
			isShow = true;
		bannerIframe.attr('src',url+'a'+getNum(1,15)+'.html');
		$(".iframe-toggle").click(function(){
			if(isShow){
				bannerIframe.attr('src',url+'bbg.html');
			}else{
				bannerIframe.attr('src',url+'a'+getNum(1,15)+'.html');
			}
			isShow = !isShow;
		})

		//搜索框
		var keyword = $("#keyword"),
			searchIcon = keyword.siblings("i");
		keyword.click(function(e){e.preventDefault();})

		keyword.focus(function(){
			searchIcon.addClass('hover');
		})

		keyword.blur(function(){
			searchIcon.removeClass('hover');
		})

		keyword.parents("form").submit(function(e){
			e.preventDefault();
		})

		//滚动定位中部导航栏
		var headerMain = $(".header .header-main"),
			limitHeight = parseFloat(headerMain.css('height')),
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


		//广告
		var adSrcs = [
			'http://googleads.g.doubleclick.net/pagead/ads?client=ca-pub-2935286260943234&output=html&h=250&slotname=1503012305&adk=4108522912&adf=1169608004&w=250&lmt=1535424953&guci=2.2.0.0.2.2.0&format=250x250&url=http%3A%2F%2Fwww.jq22.com%2F&flash=28.0.0&wgl=1&srr=0&dt=1535424952449&bpp=48&bdt=2160&fdt=96&idt=1289&shv=r20180822&cbv=r20180604&saldr=aa&abxe=1&correlator=2843079051984&frm=20&pv=2&ga_vid=750694165.1535424954&ga_sid=1535424954&ga_hid=40365669&ga_fc=0&icsg=626686&dssz=19&mdo=0&mso=8&u_tz=480&u_his=3&u_java=0&u_h=768&u_w=1366&u_ah=728&u_aw=1366&u_cd=24&u_nplug=1&u_nmime=2&adx=28&ady=571&biw=989&bih=631&scr_x=0&scr_y=264&eid=4089042%2C10573697%2C21060853%2C368226401%2C453848291&oid=3&rx=0&eae=0&fc=528&brdim=%2C%2C-8%2C-8%2C1366%2C0%2C1382%2C744%2C1006%2C631&vis=2&rsz=||oeEr|&abl=CS&ppjl=t&pfx=0&fu=8&bc=5&ifi=1&xpc=lEhYTQxc62&p=http%3A//www.jq22.com&dtd=1423',
			'http://pos.baidu.com/gcim?conwid=266&conhei=90&rdid=2885661&dc=3&di=u2885661&dri=0&dis=0&dai=1&ps=2028x19&enu=encoding&dcb=___adblockplus&dtm=HTML_POST&dvi=0.0&dci=-1&dpt=none&tsr=0&tpr=1535424950817&ti=jQuery%E6%8F%92%E4%BB%B6%E5%BA%93-%E6%94%B6%E9%9B%86%E6%9C%80%E5%85%A8%E6%9C%80%E6%96%B0%E6%9C%80%E5%A5%BD%E7%9A%84jQuery%E6%8F%92%E4%BB%B6&ari=2&dbv=0&drs=1&pcs=989x631&pss=989x2188&cfv=28&cpl=1&chi=3&cce=true&cec=UTF-8&tlm=1535424950&rw=631&ltu=http%3A%2F%2Fwww.jq22.com%2F&ecd=1&uc=1366x728&pis=-1x-1&sr=1366x768&tcn=1535424951&qn=d7fa4a2fb029fc2b&tt=1535424950782.41.42.44'
		]
		$(".ad-iframe").each(function(i){
			switch (i) {
				case 0:
				case 1:
					$(this).attr('src',adSrcs[0]);
					break;
				case 2:
					$(this).attr('src',adSrcs[1]);
					break;
			}
		})

	})
});