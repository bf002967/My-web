(function(){
    var a=9;
    var Util = (function(){
    	var prefix = 'html5_reader_';
        var StorageGetter = function(key){
            return localStorage.getItem(prefix+key);
        }
        var StorageSetter = function(key,val){
            return localStorage.setItem(prefix+key,val);
        }
        var getBSONP = function(url,callback){
        	return $.jsonp({
        		url : url,
        		cache:true,
        		callback:'duokan_fiction_chapter',
        		success :function(result){

        			 var data = $.base64.decode(result);
        			 var json = decodeURIComponent(escape(data));
               callback(json);
               
        		}
        	})
        }
        return{
        	getBSONP : getBSONP,
        	StorageGetter:StorageGetter,
        	StorageSetter:StorageSetter
        }
    })();
    var Dom={
    	top_nav :$('#top-nav'),
    	bottom_nav:$('#bottom-nav'),
    	night_day_toggle:$('#night-button'),
    	font_container:$('.font-container'),
    	font_button:$('#font-button'),
      menu_container:$('#menu-bar'),
      menu_button:$('#menu-button'),
      menu_button_top:$('#menu-back'),
    	bg_toggle:$('.bk-container'),
    	bg_color1:$('#inital'),
    	bg_color2:$('#beige'),
    	bg_color3:$('#grey'),
    	bg_color4:$('#green'),
    	bg_color5:$('#black')
    }
    var bg_btn = $('.bk-container');
    var Win = $(window);
    var Doc = $(document);
    var ChapterTotal;
    var readerModel;
    var readerUI;
    var RootContainer=$('#fiction_container');
    var initFont = Util.StorageGetter('font_size');
    initFont=parseInt(initFont);
    if(!initFont){
    	initFont=14;
    }
    RootContainer.css('font-size',initFont+'px');
    var init_word_color = Util.StorageGetter("word_color");
    $('#fiction_container').css('color',init_word_color);
    var init_reader_bg_color = Util.StorageGetter("bg_color");
    $('#fiction_container').css('background',init_reader_bg_color);
    var localpage=Util.StorageGetter('localpage');
    
    function main(){
    	//todo 整个项目的入口函数 
    	readerModel = ReaderModel();
      readerUI = ReaderBaseFrame(RootContainer);
    	readerModel.init(function(data){
          readerUI(data);
      });
    	EventHanlder();
    }

    function ReaderModel(){
    	//todo 实现和阅读器相关的数据交互的方法

    	var init = function(UIcallback){
    		getFictionInfo(function(){
    			getCurchapterContent(Chapter_id,function(data){
               UIcallback && UIcallback(data);
    			})
    		})
    	}

      //初始内容渲染
      var getFictionInfo = function(callback){
        	$.get('data/chapter.json',function(data){
        		//获得章节信息后回调
              if (localpage) {
                  Chapter_id = parseInt(localpage,10);
              }else{
        		      Chapter_id = data.chapters[1].chapter_id;
                   }
              ChapterTotal = data.chapters.length;
                  callback && callback();
        	},'json');
        }
      var getCurchapterContent=function(chapter_id,callback){
        	$.get('data/data'+chapter_id+'.json',function(data){
                 if(data.result == 0){
                 	var url = data.jsonp;
                    Util.getBSONP(url , function(data){
                          callback && callback(data);
                    });
                 }
        	},'json')
        }
        
        //翻页功能
        var prevChapter = function(UIcallback){
            Chapter_id = parseInt(Chapter_id,10);
            if(Chapter_id == 1){
              return;
            }
            Chapter_id=Chapter_id - 1;
            getCurchapterContent(Chapter_id,UIcallback);
            Util.StorageSetter('localpage',Chapter_id);
        }
        var nextChapter = function(UIcallback){
            Chapter_id = parseInt(Chapter_id,10);
            if(Chapter_id == ChapterTotal-1){
              return;
            }
            Chapter_id=Chapter_id + 1;
            getCurchapterContent(Chapter_id,UIcallback);
            Util.StorageSetter('localpage',Chapter_id);
        }
        return{
        	init :init ,
          prevChapter : prevChapter,
          nextChapter : nextChapter
        }
    }

    function ReaderBaseFrame(container){
    	//todo 渲染基本的UI结构
      function parseChapterData(jsonData){
        var jsonObj = JSON.parse(jsonData);
        var html = '<h4>' + jsonObj.t + '</h4>';
        for (var i = 0; i < jsonObj.p.length; i++) {
            html+="<p>" + jsonObj.p[i] + '</p>';
        }
        return html;
      }
      return function(data){
        container.html(parseChapterData(data));
      }
    }

    function EventHanlder(){

    	//todo 交互的事件绑定
    	$('#action_mid').click(function(){
               if(Dom.top_nav.css('display')=='none'){
               	   Dom.bottom_nav.show();
               	   Dom.top_nav.show();
                   Dom.bottom_nav.css('z-index',10005)
               }else{
               	   Dom.bottom_nav.hide();
               	   Dom.top_nav.hide();
               	   Dom.font_container.hide();
                   Dom.menu_container.hide();
               	   $('#font-button .b-title').removeClass('current'); 
               }
    	});

        Dom.font_button.click(function(){
               if(Dom.font_container.css('display')=='none'){
               	   Dom.font_container.show(); 
               	   $('#font-button .b-title').addClass('current');          	
               }else{
               	   Dom.font_container.hide();
               	   $('#font-button .b-title').removeClass('current'); 
               }
        });

        Dom.night_day_toggle.click(function(){
               //触发背景切换事件
               if ($('.b-night').css('display')=='none') {
               	  $('.b-night').show();
               	  $('.b-day').hide();
                  $('#fiction_container').css('background','#e9dfc7');
                  $('#fiction_container').css('color','#555');
               	  
               }else{
                  $('.b-day').show();
                  $('.b-night').hide();
                  $('#fiction_container').css('background','#4f4f4f');
                  $('#fiction_container').css('color','#bebebe');
               }
        });
        Dom.menu_button.click(function(){
               if(Dom.menu_container.css('display')=='none'){
                   Dom.menu_container.show();             
               }
        });
        Dom.menu_button_top.click(function(){
               Dom.menu_container.hide(); 
        });

        Dom.bg_color1.click(function(){
        	   init_reader_bg_color='#e9dfc7';
               $('#fiction_container').css('background',init_reader_bg_color);
               $('#fiction_container').css('color','#555');
               Util.StorageSetter("bg_color", init_reader_bg_color);
               Util.StorageSetter("word_color",'#555');
        });
        Dom.bg_color2.click(function(){
        	   init_reader_bg_color='#f5f5dc';
               $('#fiction_container').css('background',init_reader_bg_color);
               $('#fiction_container').css('color','#555');
               Util.StorageSetter("bg_color", init_reader_bg_color);
               Util.StorageSetter("word_color",'#555');
        });
        Dom.bg_color3.click(function(){
        	   init_reader_bg_color='#bebebe'
               $('#fiction_container').css('background',init_reader_bg_color);
               $('#fiction_container').css('color','#555');
               Util.StorageSetter("bg_color", init_reader_bg_color);
               Util.StorageSetter("word_color",'#555');
        });
        Dom.bg_color4.click(function(){
        	   init_reader_bg_color='#c1ffe4'
               $('#fiction_container').css('background',init_reader_bg_color);
               $('#fiction_container').css('color','#555');
               Util.StorageSetter("bg_color", init_reader_bg_color);
               Util.StorageSetter("word_color",'#555');
        });
        Dom.bg_color5.click(function(){
        	   init_reader_bg_color='#4f4f4f'
               $('#fiction_container').css('background',init_reader_bg_color);
               $('#fiction_container').css('color','#bebebe');
               Util.StorageSetter("bg_color", init_reader_bg_color);
               Util.StorageSetter("word_color",'#bebebe');
        });

        $('#large').click(function(){
        	if (initFont>20) {
        		return;
        	}
             initFont++;
             RootContainer.css('font-size',initFont+'px');
             Util.StorageSetter('font_size',initFont);
        });

        $('#small').click(function(){
        	if (initFont<12) {
        		return;
        	}
             initFont--;
             RootContainer.css('font-size',initFont+'px');
             Util.StorageSetter('font_size',initFont);
        });

    	Win.scroll(function(){
               	   Dom.bottom_nav.hide();
               	   Dom.top_nav.hide();
               	   Dom.font_container.hide();
               	   $('#font-button .b-title').removeClass('current'); 
                   
    	});

      $('#prev').click(function(){
          readerModel.prevChapter(function(data){
                readerUI(data);
          })
      });
      $('#next').click(function(){
          readerModel.nextChapter(function(data){
                readerUI(data);
          });
      });


    }

    main();
    
})();