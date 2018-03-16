var a1=document.querySelector("#banner div.rt a:first-child");
var mm=document.querySelector("#mm");
var btn2=document.querySelectorAll("#mm button");
a1.addEventListener("click",function(){
    mm.style.display="block";
    for(var i=0;i<btn2.length;i++) {
        btn2[i].addEventListener("click", function () {
            mm.style.display = "none";
        });
    }
});

 var i=document.querySelector("#banner form.form-horizontal div.sm>i");
var wm2=document.querySelector("#banner form.form-horizontal div.wm2");
var m=true;
i.addEventListener("click",function(){
    if(m==true){
    wm2.style.display="block";
    m=false;
}else{
        wm2.style.display="none";
        m=true;
    }
});