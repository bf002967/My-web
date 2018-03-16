 $("#bt").click(function(){
	 var n=$("#uname").val();
	 var p=$("#upwd").val();
	 $.ajax({
	  type:'get',
	  url:"/index",
	  data:{uname:n,upwd:p},
	  success:function(data){
		  console.log(data);
	   if(data.code===400){
	    $("#test").show();
	   }else{
		   sessionStorage['uname']=data.u;
		   sessionStorage['uid']=data.uid;
	    location.href="main.html";
	   }
	  }
	 })
	})