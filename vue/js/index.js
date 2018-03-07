var Util = {
	ajax:function(url,fn){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					fn && fn(JSON.parse(xhr.responseText))
				}
			}
		}
		xhr.open('get',url,true);
		xhr.send(null)
	}
}
var Home = Vue.extend({
	template:'#tpl_home',
	data:function(){
		return{
			now:[],
			news:[]
		}
	},
	created:function(){
		var me = this ;
		Util.ajax('data/home.json',function(res){
			if(res && res.errno === 0){
				me.now = res.data.now;
				me.news = res.data.news;
			}
		})
	}
})
var Now = Vue.extend({
	template:'#tpl_now',
	data:function(){
		return{
			movie:[]
		}
	},
	created:function(){
		var me = this ;
		Util.ajax('data/now.json',function(res){
			if(res && res.errno === 0){
				me.movie = res.data.movie;
			}
		})
	}
})
var Come = Vue.extend({
	template:'#tpl_come',
	data:function(){
		return{
			hot:[],
			comeing:[]
		}
	},
	created:function(){
		var me = this ; 
		Util.ajax('data/come.json',function(res){
			if(res && res.errno === 0){
				me.hot = res.data.hot;
				me.comeing = res.data.comeing;
			}
		})
	}
})
var News = Vue.extend({})
var Search = Vue.extend({})
var Detail = Vue.extend({
	template:"#tpl_detail",
	data:function(){
		return{
			detail:[]
		}
	},
	created:function(){
		var me = this ;
		Util.ajax('data/detail.json',function(res){
			if(res && res.errno === 0){
				me.detail = res.data.detail;
			}
		})
	}
})
Vue.component('home',Home)
Vue.component('now',Now)
Vue.component('come',Come)
Vue.component('news',News)
Vue.component('search',Search)
Vue.component('detail',Detail)
var app = new Vue({
	el: '#app',
	data: {
		view: 'home',
		query: []
	}
})
var route = function(){
	var hash = location.hash;
	hash = hash.replace(/#\/?/,'');
	hash = hash.split('/')
	var map = {
		home : true ,
		now : true ,
		come : true ,
		news : true ,
		search : true,
		detail:true
	}
	if(map[hash[0]]){
		app.view = hash[0]
	}else{
		app.view = 'home'
	}
	app.query = hash.slice(1);
}
window.addEventListener('hashchange',route)
route()
