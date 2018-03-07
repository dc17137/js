define(['lib/MVC','css!./footer.css'],function(MVC){
		MVC.addView("footer",function(m,format){
		var dom = document.querySelector("#footer .inner");
		var data = m.get("footer");
		var tpl = [
			'<div id="left"><img src="<%foot%>"></div>',
			'<div id="right"><ul><%foot_list%></ul></div>'
		].join("");
		var foot_tpl ='<li><%title%><ul><%ul_list%></ul></li>';
		var foot_list ="";
		var li_tpl = '<li><a href="<%href%>"><%title%></a></li>';
		var li_str ="";
		for(var i = 0 ; i <data.txt.length; i ++){
			li_str = "";
			if(data.txt[i].list){
				for(var j = 0 ; j < data.txt[i].list.length ; j ++){
					li_str += format(li_tpl,data.txt[i].list[j]);
				}
			}
			data.txt[i].ul_list = li_str;
			foot_list += format(foot_tpl,data.txt[i]);
		}
		var obj = {};
		obj.foot = data.picture.img;
		obj.foot_list = foot_list;
		html = format(tpl,obj);
		dom.innerHTML = html;
		return dom;
	})
	.addController("footer",function(m,v,$){
		$("data/footer.json","get","",function(data){
			m.add("footer",data);
			v.create("footer")
		})
	})
})