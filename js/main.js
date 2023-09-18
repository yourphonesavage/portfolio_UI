$(function(){
	// preloading interface
	$("#pre_cont").addClass("loaded");
	$("body").addClass("fixed");
	$(".global_tabs").hide();

	setTimeout(function(){
		$("#preload, #cover").addClass("loaded");
	}, 800);

	$("#preload").on("transitionend", function(){
		$("#pre_cont").hide();
		$("body").removeClass("fixed");
	});

	setTimeout(function(){
		$(".start").addClass("loaded");
		$("#page1").addClass("loaded");
		$(".global_tabs").removeAttr("style");

	}, 3000);

	// video interface
	var mainVideo=document.getElementById("main_video");

	mainVideo.addEventListener("loadeddata", function(){
		main_video.muted=true
		main_video.play();
	});
	mainVideo.addEventListener("ended", function(){
		main_video.currentTime=0;
		main_video.play();
	});

	// mainswiper interface
	var mainTotal, mainCurrent;
	var targetY=0;
	var pageN=0;
	var mainN=0;
	var scrollT=0;
	var winHalf;

	var mainSwiper=new Swiper(".mainSwiper", {
		speed:1200,
		effect: "fade",
		fadeEffect: {
			crossFade: true
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		on: {
			init: function(){
				mainTotal=this.slides.length;
				mainCurrent=this.activeIndex;
				$(".main_slider .account .current").text(mainCurrent+1);
				$(".start .menu a").eq(mainCurrent).addClass("active");
			},
			slideChange: function(){
				mainCurrent=this.activeIndex;
				$(".start .menu a").removeClass("active");
				$(".start .menu a").eq(mainCurrent).addClass("active");
				$("#page2").addClass("active")

				if(mainCurrent == 0){
					mainN=0;
					$(".main_slider .account").show();
					$(".main_slider .account .current").text(mainCurrent+1);
				}
				else if(mainCurrent == 1){
					mainN=1;
					$(".main_slider .account").show();
					$(".main_slider .account .current").text(mainCurrent+1);
				}
				else{
					mainN=2;
					$(".main_slider .account").hide();
				}
			}
		}
	});

	$(window).resize(function(){
		winHalf=$(window).height()/2;
		$(window).trigger("scroll");
	});
	$(window).trigger("resize");


	$(".start .menu a").click(function(e){
		e.preventDefault();
		$(".start .menu a").removeClass("active");
		$(this).addClass("active");
		mainN=pageN=$(this).index();

		if(pageN != 2) {
			$("html").animate({scrollTop: 0}, 800, function(){
				mainSwiper.slideTo(pageN, 1000, false)
				$(".start .menu").removeClass("dark");
			});
		}
		else{
			targetY=$("#portfolio").offset().top;
			$("html").animate({scrollTop: targetY}, 800);
			$(".start .menu").addClass("dark");
			$(".start .menu a").removeClass("active");
			$(".start .sns").addClass("dark");
			$(this).addClass("active");
		}
	});

	var projectN=0;

	$(".project:first").addClass("active");

	$(".project .title_area").click(function(e){
		e.preventDefault();
		var project=$(this).parents(".project");

		if(projectN != project.index()){
			projectN=project.index();
			$(".project").removeClass("active");
			project.addClass("active");

			var projectY=$(this).offset().top-60;
			$("html").animate({scrollTop:projectY}, 800);
		}
	});


	$(window).scroll(function(){
		scrollT=$(window).scrollTop();

		if(scrollT >= $("#portfolio").offset().top-winHalf){
			pageN=3;
			$(".start .menu").addClass("dark");
			$(".start .sns").addClass("dark");
			$(".start .menu a").removeClass("active");
			$(".start .menu a").eq(pageN).addClass("active");
			$("#portfolio").addClass("active");
			$(".global_tabs").addClass("dark");
		}
		else{
			pageN=mainN;
			$(".start .menu").removeClass("dark");
			$(".start .sns").removeClass("dark");
			$(".start .menu a").removeClass("active");
			$(".start .menu a").eq(pageN).addClass("active");
			$(".global_tabs").removeClass("dark");
		}
	});	
	$(".global_tabs").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$("body").toggleClass("fixed");
		$(".floating_menu").toggleClass("active");
		$(".blur").toggleClass("active");

	});
		$(".mobile_menu li").click(function(e){
		e.preventDefault();
		mainN=pageN=$(this).index();

		$(".global_tabs").removeClass("active");
		$("body").removeClass("fixed");
		$(".floating_menu").removeClass("active");
		$(".mobile_menu li").removeClass("active");
		$(this).addClass("active");
		$(".blur").removeClass("active");


		if(pageN !== 2) {
			$("html").animate({scrollTop: 0}, 800, function(){
				mainSwiper.slideTo(pageN, 1000, false)
				$(".global_tabs").removeClass("dark");
			});
		}
		else{
			targetY=$("#portfolio").offset().top;
			$("html").animate({scrollTop: targetY}, 800);
			$(".global_tabs").addClass("dark");
		}
	});
});