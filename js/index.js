$(function(){
    var cars=0;
	console.log('Hi! 朋友，感谢您抽空阅读我的简历代码。 如果您有什么好的建议或者需要联系我 \n 我的邮箱是viken0408@foxmail.com ^_^')
    // fullpage
    $('#dowebok').fullpage({
        anchors: ["first","two","three","four","five"],
        menu:'#aside-menu',
    });

    // logo文字切换动画
    $('#hp').mouseenter(function(){
        $('.hp1').css('display','none');
        $('.hp2').css('display','block');
    });
    $('#hp').mouseleave(function(){
        $('.hp1').css('display','block');
        $('.hp2').css('display','none');
    });

    // 侧边导航栏图标切换
    // $('aside a:nth-child(1)').mouseenter(function(){
    //     $('aside a:nth-child(1)').addClass('glyphicon glyphicon-send');
    // });
    // $('aside a:nth-child(1)').mouseleave(function(){
    //     $('aside a:nth-child(1)').removeClass('glyphicon glyphicon-send');
    // });
    // 侧边导航栏文字切换
    $("aside a").hover(function(){
		$(this).find("b").fadeToggle(200,"easeInOutCubic");
	});

    // skill内容切换
    $('.skill_icon').click(function(){
    	$(".skill_int").each(function(){
			if($(this).is(":visible")){
				$(this).slideUp(200);
				$(this).prev().removeClass("skill_flag_scale");
			}
		});
		if($(this).siblings(".skill_int").is(":hidden")){
			$(this).siblings(".skill_int").slideDown(400);
			$(this).siblings(".skill_flag").addClass("skill_flag_scale");
		}else{
			$(this).siblings(".skill_int").slideUp(200);
			$(this).siblings(".skill_flag").removeClass("skill_flag_scale");
		}
    });

    $('#car1').mouseenter(function(){
        $('.carousel-indicators li').removeClass('active');
        $('.carousel-inner div').removeClass('active');
        $('#cart1').addClass('active');
        $('#carp1').addClass('active');
        console.log(cars);
        
    })
    $('#car2').mouseenter(function(){
        $('.carousel-indicators li').removeClass('active');
        $('.carousel-inner div').removeClass('active');
        $('#cart2').addClass('active');
        $('#carp2').addClass('active');
        console.log(cars);
        
    })
    $('#car3').mouseenter(function(){
        $('.carousel-indicators li').removeClass('active');
        $('.carousel-inner div').removeClass('active');
        $('#cart3').addClass('active');
        $('#carp3').addClass('active');
        console.log(cars);
        
    })
    $('#car4').mouseenter(function(){
        $('.carousel-indicators li').removeClass('active');
        $('.carousel-inner div').removeClass('active');
        $('#cart4').addClass('active');
        $('#carp4').addClass('active');
        console.log(cars);
        
    })
    $('.unfinished').click(function(){
        alert('搭建中ing......')
    });
});
