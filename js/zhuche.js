$("#pwd").blur(function(){
var p=$(this).val();
var reg=/^\w{3,9}$/;
 if(!reg.test(p)){
   $("span.yz2").show();
  }else{	
  $("span.yz2").hide();
  };
})
$("#pwd1").blur(function(){
	var p=$("#pwd").val();
   var p2=$(this).val();
   if(p!==p2){
  $("span.yz3").show();
 }else{
  $("span.yz3").hide();
   }; 
})
$("#uname").blur(function(){
var uname=$(this).val();
	 if($(this).val()===""){
	 $(this).css("borderColor","red");
	 $("span.yz1").show().html('用户名不能为空');
	 }else{
	 $(this).css("borderColor","#A9A9A9");
	 $("span.yz1").hide()
	 }
 });
$("#btn").click(function(){
var un=$("#uname").val();
var p=$("#pwd").val();
  $.ajax({
   type:'get',
   url:"/zhuche",
   data:{uname:un,upwd:p},
   success:function(data){
   if(data.code===200){
    $("#xs").show();
   }else{
   $("span.yz1").show().html(data.msg);
   }
   }
  })
  });