define(['lib/MVC','css!./home.css','home/section_1/section_1','home/section_2/section_2'],function(MVC){
		MVC.addController("home",function(model,view,$,animate,OB){
		$("data/home.json","get","",function(data){
			model.add("home",data.data);
			OB.emit("dataReady")
		})
	})
})