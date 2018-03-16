
$(function() {
   //******引入头尾*************
   $(".da").load("data/header.php");
   $(".footer").load("data/footer.php");
   //***************正则********************
    $("#box1").submit(function(){
       var hname=$("input[name=hname]").val();
       var upwd=$("input[name=upwd]").val();
       var hnamereg=/^[0-9a-zA-Z]{6,10}$/;
       var upwdreg=/^[0-9a-zA-Z]{6,10}$/;
       if(!hnamereg.test(hname)){
          //$("#as1").text("用户名格式不正确");
          alert(aaaa);
          return false;
       }
       if(!upwdreg.test(upwd)){
          //$("#as1").text("密码格式不正确");
          alert(bbbbb);
          return false;
       }
          return true;
    });

   //***********注册登录按钮************
   $(".da").on("click","#enter>button",function(e){
      e.preventDefault();
      $("#popup-box1").removeClass("in");
      $("#shade").removeClass("in");
      $("body").addClass("of");
   });
   $(".da").on("click","#popup-box1>button:first",function(e){
      e.preventDefault();
      $(this).parent().addClass("in");
      $("#shade").addClass("in");
      $("body").removeClass("of");
   });
   $(".da").on("click","#popup-box1>div>button:last",function(e){
      e.preventDefault();
      $("#popup-box1").addClass("in");
      $("#shade").addClass("in");
      $("body").removeClass("of");
   });
   $(".da").on("click","#login>button",function(e){
      e.preventDefault();
      $("#popup-box2").removeClass("in");
      $("#shade").removeClass("in");
      $("body").addClass("of")
   });
   $(".da").on("click","#popup-box2>button:first",function(e){
      e.preventDefault();
      $(this).parent().addClass("in");
      $("#shade").addClass("in");
      $("body").removeClass("of");
   });
   $(".da").on("click","#popup-box2>div>button:last",function(e){
      e.preventDefault();
      $("#popup-box2").addClass("in");
      $("#shade").addClass("in");
      $("body").removeClass("of");
   });
   $(".da").on("click","li>a",function(){
      $(this).parent().addClass("active");
      $($(this).parent().siblings()).removeClass("active");
   });


//********轮播***************
   var index = 1;

   function task() {
      index++;
      (index > 3) && (index = 1);
      var a = "images/banner" + index + ".jpg";
      $("#carousel>img").attr("src", a);
   }

   var timer = setInterval(task, 1500);

//*************类手风琴效果********************
   var $a = $("#dd>.panel-default");

   $a.hover(function () {
      $(this).children().removeClass("collapse")
   }, function () {
      $(this).children().next().addClass("collapse")
   })
});
//**************gallery*********************
$("#imgZs img").hover(function(){
   $(this).addClass('over');


},function(){$(this).removeClass('over')});


//*************contant************************

   $("#yd").hover(function(){
         // $("#yd").children().animate({
          $(this).find('img').animate({
           left:-500
        },3000);
      //$(this).animate({
      //   left:-500
      //},3000)
   },function(){
          $(this).find('img').animate({
             left:0
          },3000);
      //$(this).animate({
      //   left:0
      //},3000)

      }
   );






//********************注册***************
$(".da").on("click","#login",function(){
   var $hname=$("input[name=hname]").val();
   var $upwd=$("input[name=upwd]").val();
   $.ajax({
      url:"data/user_add.php",
      data:{hname:$hname,upwd:$upwd},
      success:function(data){
         if(data.code>0){
            $(".as").html(data.msg);
         }else{
            $(".as").html(data.msg);
         }

      }

   })

});


