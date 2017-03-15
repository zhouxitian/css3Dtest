function touchHandlerDummy(e){
	e=e||window.event;
	if ( e && e.preventDefault ){
	   e.preventDefault();
	}else{
	   e.returnValue = false;
   }
}
function touchHandlerStart(e){}
$(document).bind("touchstart",touchHandlerStart);
$(document).bind("touchmove",touchHandlerDummy);
var slowtime=50; 
if(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=="micromessenger") {//微信
	slowtime=slowtime*2;
}
var loadOptions={
	container:".main",
	slow:false,//开启缓慢显示进度，默认 false
	maxWidth:800,
	slowtime:slowtime,//缓慢显示进度的时间间隔，默认 50
	maxRadio:1.625,
	minRadio:1.55,
	setRem:false,
	setWidth:false,
	autoHeight:false
};
var loadImg='<div><img src="images/b1.png"><img src="images/b2.jpg"><img src="images/b3.png"><img src="images/b4.png"><img src="images/b5.png"><img src="images/l1.png"><img src="images/l2.png"><img src="images/logo_pc.jpg"><img src="images/m1.png"><img src="images/m2.png"><img src="images/m3.png"><img src="images/man.png"><img src="images/p1.png"><img src="images/s1.png"><img src="images/s2.png"><img src="images/s3.png"><img src="images/s4.png"><img src="images/s5.png"><img src="images/s6.png"><img src="images/s7.png"><img src="images/s8.png"><img src="images/s9.png"><img src="images/s10.png"><img src="images/s11.png"><img src="images/s12.png"><img src="images/w.png"><img src="images/xing.jpg"><img src="images/yun1.png"></div>';
//创建场景
var s = new C3D.Stage(),
	parent=document.getElementById("three"),
	width=parent.clientWidth,
	height=parent.clientHeight;
s.size(width,height).material({
	color:"#000",
	image:"images/xing.jpg",
	repeat:"repeat",
	position:"center center"
}).update();
document.getElementById('three').appendChild(s.el);

//三维显示元素基类
var sp=new C3D.Sprite();
sp.position(0, 0, -s.fov).update();
s.addChild(sp);

//花
var flower = new C3D.Plane();
flower.size(381,483).position(-20,0,-3000).rotation(0,0,0).material({
	image:"images/p1.png",
	size:"100%"
}).update()

sp.addChild(flower);

//跑道
var p1 = new C3D.Plane();
	p1.size(200,500).position(0,400,-800).scale(5,200).rotation(90,0,0).material({
		color:"rgb(0, 86, 41)",
	}).update()
sp.addChild(p1);
var p2 = new C3D.Plane();
	p2.size(10,500).position(0,400,-800).scale(5,200).rotation(90,0,0).material({
		color:"#fff",
	}).update()
sp.addChild(p2);


//logo
var logo=new C3D.Plane();
logo.size(207,100).position(480,40,-2000).scale(1,1).rotation(-8,-66,0).material({
	image:"images/logo_pc.jpg",
}).visibility({visible:true,alpha:1}).update();
sp.addChild(logo);
var pArr1=[],pArr2=[],pArr3=[],pArr4=[],pArr5=[],plength=10,speed=100;
//线条

function make3D(sp){
	this.num=1;
	this.sp=sp;
	this.lineArr=[];//保存线条的数组
	this.lineLenth=8;//线条的个数
	this.lineNum=5;//线条的行数
	this.maxLine=this.lineLenth*this.lineNum;
}
make3D.prototype={
	setLine:function(num){
		num=num||1;
		for(;num--;){
			for(var i=this.lineNum;i--;){
				var p = new C3D.Plane();
				p.size(10,500).material({
					color:"#fff",
				});
				switch (this.num%this.lineNum){
					case 0:
						p.position(600,200,-800*Math.ceil(this.num/this.lineNum)).rotation(90,130,0);
					break;
					case 1:
						p.position(-600,200,-800*Math.ceil(this.num/this.lineNum)).rotation(90,50,0);
					break;
					case 2:
						p.position(600,-350,-800*Math.ceil(this.num/this.lineNum)).rotation(90,50,0);
					break;
					case 3:
						p.position(-600,-350,-800*Math.ceil(this.num/this.lineNum)).rotation(90,130,0);
					break;
					case 4:
						p.position(0,-720,-800*Math.ceil(this.num/this.lineNum)).rotation(90,0,0);
					break;
				}
				this.num++;
				p.update();
				this.sp.addChild(p);
				this.lineArr.push(p);
				var length=this.lineArr.length;
				if(length>this.maxLine){
					this.lineArr[0].remove();
					this.lineArr.shift();
				}
			}
		}
	}
}

var line=new make3D(sp);
line.setLine(8);

/*立方体*/
var Box= new C3D.Box();
Box.size(20, 20, 20)
		.position(30,40,-1000).rotation(80,0,-45)
		.material({
			color : "#f00"//C3D.getRandomColor()
		})
		.buttonMode(true)//鼠标状态为btn
		.update();
sp.addChild(Box);

/*场景2*/
var sp2=new C3D.Sprite();
sp2.position(0, 0, -s.fov).update();
sp2.el.className="sp2";
s.addChild(sp2);
/*人*/
var man=new C3D.Plane();
man.size(120,150).position(-45,90,200).scale(1).material({
	image:"images/man.png",
	repeat:"no-repeat",
	size:"800% 400%",
	position:"left bottom"
}).update();
man.el.className="man";//添加class
sp2.addChild(man);


/*场景3*/
var sp3 = C3D.create({
	type: 'sprite', position: [0, 0, -s.fov-15000],rotation:[0,0,20], visibility:[{visible:false,alpha:-1}],children: [
		{/*球场*/
			type: 'plane',
			size: [207,282],
			name:"b1",
			position: [0,400,-1500],
			rotation: [90,0,0],
			scale:[20],
			material: [{
				image:"images/b1.png",
				repeat:"no-repeat",
				size:"100% 100%"
			}]
		},
		{/*球员1*/
			type: 'plane',
			size: [174,241],
			name:"m1",
			position: [100,135,0],
			rotation: [0,0,12],
			scale:[2],
			material: [{
				image:"images/m1.png",
				repeat:"no-repeat",
				size:"100% 100%"
			}]
		},
		{/*球员2*/
			type: 'plane',
			size: [136,250],
			name:"m2",
			position: [-300,145,-800],
			rotation: [0,0,-5],
			scale:[2],
			material: [{
				image:"images/m2.png",
				repeat:"no-repeat",
				size:"100% 100%"
			}]
		},
		{/*球员3*/
			type: 'plane',
			size: [147,250],
			name:"m3",
			position: [200,150,-1500],
			rotation: [0,0,0],
			scale:[2],	
			material: [{
				image:"images/m3.png",
				repeat:"no-repeat",
				size:"100% 100%"
			}]
		},
		{/*球篮*/
			type: 'plane',
			size: [231,161],
			name:"l1",
			position: [0,-250,-3000],
			rotation: [0,0,0],
			scale:[1],	
			material: [{
				image:"images/l1.png",
				repeat:"no-repeat",
				size:"100% 100%"
			}]
		},
		{/*网*/
			type: 'plane',
			size: [263,268],
			name:"w",
			position: [0,10,800],
			rotation: [0,0,0],
			scale:[3],	
			material: [{
				image:"images/w.png",
				repeat:"no-repeat",
				size:"100% 100%"
			}]
		},
		{/*云1*/
			type: 'plane',
			size: [173,86],
			name:"yun1",
			position: [0,175,2800],
			rotation: [0,0,-20],
			scale:[3],	
			material: [{
				image:"images/yun1.png",
				repeat:"no-repeat",
				size:"100% 100%"
			}]
		},
		{/*云2*/
			type: 'plane',
			size: [173,86],
			name:"yun2",
			position: [-100,75,2600],
			rotation: [0,0,-20],
			scale:[5],	
			material: [{
				image:"images/yun1.png",
				repeat:"no-repeat",
				size:"100% 100%"
			}]
		},
		{/*云3*/
			type: 'plane',
			size: [173,86],
			name:"yun3",
			position: [100,175,3000],
			rotation: [0,0,-20],
			scale:[5],	
			material: [{
				image:"images/yun1.png",
				repeat:"no-repeat",
				size:"100% 100%"
			}]
		},
		{/*云4*/
			type: 'plane',
			size: [173,86],
			name:"yun4",
			position: [100,0,2500],
			rotation: [0,0,-20],
			scale:[15,10],	
			material: [{
				image:"images/yun1.png",
				repeat:"no-repeat",
				size:"100% 100%"
			}]
		},
	]
});
sp3.el.className="sp3";
s.addChild(sp3);

/*场景4*/
var sp4 = C3D.create({
	type: 'sprite', position: [0, 0, -s.fov],rotation:[0,0,0],visibility:[{visible:false,alpha:-1}],children: [
		{/*球鞋*/
			type: 'plane',
			size: [520,520],
			name:"shoe",
			position: [0,-150,-1500],
			rotation: [0,0,0],
			scale:[2.5],
			material: [{
				image:"images/s1.png",
				repeat:"no-repeat",
				size:"100% 100%"
			}]
		}
	]
});
sp4.el.className="sp4";
sp4.shoe.el.className="shoe";
s.addChild(sp4);
var myClickTouch=new myTouch({//滑屏
	wrapper:".shoe",
	durationTime:0.4,
	preventDefault:true,
	init:function(){
		this.canMove=false;
	},
	start:function(){
		
	},
	moveX:function(d){
		var t=this,
			//n=1,
			dir=t.mX<0?-0.5:0.5;//方向
		k+=dir;
		//n=k?Math.abs(k):2;
		sp4.shoe.material({
			image:"images/s"+(Math.floor(k)%12+1)+".png",
		}).updateM();
	},
	endX:function(){
		//console.log("endX");
	}
});
var style=document.createElement('div').style,
chart="animation",
transition=chart.charAt(0).toUpperCase() + chart.substr(1),
vendorPrefix=(function(){//现在的opera也是webkit
	var  i=0, vendor=["Moz", "Webkit", "Khtml", "O", "ms"];
	while (i < vendor.length) {
		if (typeof style[vendor[i] + transition] === "string") {
		  return vendor[i];
		}
		i++;
	}
	return false;
})();



/*注册事件*/
if(document.addEventListener){
	document.addEventListener('DOMMouseScroll',function(e){
		scrollFunc(e);
	},false);
}//W3C
//window.onmousewheel=document.onmousewheel=function(e){
document.onmousewheel=function(e){
	scrollFunc(e);
};//IE/Opera/Chrome
function scrollFunc(e){
	e=e||window.event;
	var dir=0,
		t=this;
	if(e.wheelDelta){//IE/Opera/Chrome
		if(e.wheelDelta==120){dir=-1;}else if(e.wheelDelta==-120){dir=1;}else if(e.wheelDelta<0){
			dir=1;
		}else if(e.wheelDelta>0){
			dir=-1;
		}
	}else{//Firefox
		if(e.detail>=3){dir=1;}else if(e.detail<=-3){dir=-1;}
	}
	//s.camera.fov+=dir;
	sp&&sp.move(0,0,-dir*10).updateT();
}

//重力感应
var o = new Orienter(),ob={g:0};
var tip = document.getElementById('tip');
o.onOrient = function (obj) {
	/*tip.innerHTML =
			'alpha:' + obj.a +
			',' + 'beta:' + obj.b +
			',' + 'gamma:' + obj.g +
			',' + 'log:' + obj.lon +
			',' + 'lat:' + obj.lat +
			',' + 'dir:' + obj.dir;*/
	ob.g=obj.g;
};
o.init();
var z=0,k=12e5,zflag=true;
 //刷新场景
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
    function (callback) {
        setTimeout(callback, 1000 / 60);
    };
function go() {
	if(sp&&sp.z<51000){//跑道尽头
		var sped;
		if(sp.z>500&&sp.z<=2000){
			sped=speed/3;
		}else if(sp.z>2000&&sp.z<3000){
			sped=speed/10;
		}else{
			sped=speed;
		}
		if(Math.floor(Math.abs(-s.fov-sp.z)/410)%2){//添加跑道线条
			if(zflag&&sp.z<45000){
				line.setLine(1);
				zflag=false;
			}
		}else{
			zflag=true;
		}
		if(sp.z>2000){//开始右转
			if(man.x<=40&&sp.z<=3500){//右行
				man.move(2,0,0).updateT();
				man.el.className="man right";
			}else{
				if(sp.z<3500){//前行
					man.el.className="man";
				}else{
					if(man.x>=-43){//左行
						man.el.className="man left";
						man.move(-2,0,0).updateT();
					}else{//前行
						man.el.className="man";
					}
					flower&&(flower.remove(),flower=null);//删除花
				}
			}
		}
		sp.move(0,0,sped).updateT();
	}else if(sp2){
		sp&&(sp.remove(),sp=null);
		if(sp2.z>-7e3){
			sp2.move(0,0,-50).rotate(0,0,10).updateT();
		}else{
			sp2.remove();
			sp2=null;
		}	
	}else if(sp3){
		sp3.visibility({visible:true,alpha:1}).updateV();
		if(sp3.z<-3500){
			//sp3.move(0,0,speed).updateT();
			if(sp3.rotationZ>-20){
				sp3.move(0,0,speed).rotate(0,0,-0.1).updateT();
				sp3.yun1&&sp3.yun1.rotate(0,0,0.1).updateT();
				sp3.yun2&&sp3.yun2.rotate(0,0,0.1).updateT();
				sp3.yun3&&sp3.yun3.rotate(0,0,0.1).updateT();
				sp3.yun4&&sp3.yun4.rotate(0,0,0.1).updateT();
			}else{
				sp3.move(0,0,speed).updateT();
			}
		}else{
			if(sp3.rotationZ>-20){
				sp3.move(0,0,speed/5).rotate(0,0,-0.1).updateT();
				sp3.yun1&&sp3.yun1.rotate(0,0,0.1).updateT();
				sp3.yun2&&sp3.yun2.rotate(0,0,0.1).updateT();
				sp3.yun3&&sp3.yun3.rotate(0,0,0.1).updateT();
				sp3.yun4&&sp3.yun4.rotate(0,0,0.1).updateT();
			}else{
				sp3.move(0,0,speed/5).updateT();
			}
			if(sp3.z>4000){//删除不可见元素
				sp3.remove();
				sp3=null;
			}else if(sp3.z>1420){
				sp3.m3&&sp3.m3.remove();
			}else if(sp3.z>420){
				sp3.m2&&sp3.m2.remove();
			}else if(sp3.z>20){
				sp3.m1&&sp3.m1.remove();
			}else if(sp3.z>-780){
				sp3.w&&sp3.w.remove();
			}else if(sp3.z>-2400){
				sp3.yun1&&sp3.yun1.remove();
				sp3.yun2&&sp3.yun2.remove();
				sp3.yun3&&sp3.yun3.remove();
				sp3.yun4&&sp3.yun4.remove();
			}
		}
	}else if(sp4){
		z++;
		if(!sp4.visible){
			sp4.visibility({visible:true,alpha:1}).updateV();
		}
		if(z%2===0){
			k++;
			sp4.shoe.material({
				image:"images/s"+(k%12+1)+".png"
			}).updateM();
		}
		if(z>123){
			myClickTouch.canMove=true;
			return false;
		}
	}
	requestAnimationFrame(go);
}

//显示fps
function showFPS(){
	var e,pe,pid,fps,last,offset,step,appendFps; 
	fps = 0;   
	last = Date.now();   
	step = function(){   
		offset = Date.now() - last;   
		fps += 1;   
		if( offset >= 1000 ){   
			last += offset;   
			appendFps(fps);   
			fps = 0;   
		}
		requestAnimationFrame(step);   
	};
	appendFps = function(fps){   
		if(!e) e=document.createElement('span');   
		pe=pid?document.getElementById(pid):document.getElementsByTagName('body')[0];   
		e.innerHTML = "fps: " + fps;   
		pe.appendChild(e);   
	}   
	return {   
		setId :  function(id){pid=id;},   
		go                 :  function(){step();}   
	}
}
var fps=showFPS();
fps.setId("fps");

