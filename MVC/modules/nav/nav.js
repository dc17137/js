define(['lib/MVC','css!./nav.css'],function(MVC){
		MVC.addView("nav",function(m,format){
		var dom = document.querySelector("#nav .inner");
		var data = m.get("nav");
		var html = "";
		var tpl = [ '<ul>',
						'<%nav_list%>',
					'</ul>'].join("");
		var nav_tpl = '<li><a href="<%href%>"><%title%></a></li>';
		var nav_list = "";
		var obj = {};
		for(var i = 0 ; i < data.nav.length;i ++){
			nav_list += format(nav_tpl,data.nav[i]);
		}
		obj.nav_list = nav_list;
		html = format(tpl,obj);
		dom.innerHTML = html ; 
		return dom;
	})
	.addController("nav",function(m,v,$){
		$("data/nav.json","get","",function(data){
			m.add("nav",data);
			v.create("nav");
		})
	})
})