
window.onload=function(){
	var oTab=document.getElementById("tabs");
	var liArr=oTab.getElementsByTagName("li");
	var index_panels=document.querySelectorAll(".index_panel");

for(var i=0;i<liArr.length;i++){
	liArr[i].index=i;
	index_panels[i].index=i;

	liArr[i].onclick=function(){
		for(var j=0;j<liArr.length;j++){
			liArr[j].className="";
			index_panels[j].style.display="none";
		}
		liArr[this.index].className="on";
		index_panels[this.index].style.display="block";
		}
	}
}