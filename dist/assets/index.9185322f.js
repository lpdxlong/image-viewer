var e=Object.defineProperty,i=Object.defineProperties,n=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,a=(i,n,t)=>n in i?e(i,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[n]=t;import{d as s,r as c,t as r,w as m,c as u,a as g,T as d,o as h,b as p,v as f,e as v,f as w,g as x,n as y,F as b,h as S,i as C,j as k,k as P,l as F,m as j}from"./vendor.f06d88ff.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&i(e)})).observe(document,{childList:!0,subtree:!0})}function i(e){if(e.ep)return;e.ep=!0;const i=function(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?i.credentials="include":"anonymous"===e.crossorigin?i.credentials="omit":i.credentials="same-origin",i}(e);fetch(e.href,i)}}();const E=s({name:"imageViewer",props:{images:{type:Array,default:()=>[]},startPosition:{type:Number,default:0},show:{type:Boolean,default:!1},page:{type:Number,default:0},thumbnail:{type:Boolean,default:!0}},setup(e,{expose:i,emit:n}){const t=c({config:{imgMaxWidth:.8*window.innerWidth,imgMaxHeight:.8*window.innerHeight,fullScreen:!1},imgStyle:{width:"auto",height:"auto"},imgVisible:!1,index:0,activePage:0}),{config:o,imgStyle:l,imgVisible:a,index:s,activePage:u}=r(t);function g(){t.imgStyle={width:"auto",height:"auto"}}function d(i){if(e.images&&e.images[t.index]){let i=new Image;i.src=e.images[t.index].url,i.onload=function(){h(i.width,i.height)}}}function h(e,i){let n=function(e,i){let n=0,{imgMaxWidth:o,imgMaxHeight:l}=t.config;if(e>o||i>l)return n=e-o>i-l?o/e:l/i,{width:e*n,height:i*n};return{width:e,height:i}}(e,i);n.width-10>t.config.imgMaxWidth||n.height-10>t.config.imgMaxHeight?h(n.width,n.height):(t.imgStyle=n,t.imgVisible=!0)}function p(){let e=document.querySelector(".image-viewer-nav-thumb").width;document.querySelector(".image-viewer-nav-thumb > div:first-child").style.marginLeft=-e*t.activePage+"px"}function f(i){const n=e.images.length-1;"prev"===i&&8*t.activePage>=8?t.activePage--:"next"===i&&8*t.activePage<n&&n-8*t.activePage>8&&t.activePage++,p()}function v(){if(t.config.fullScreen)document.exitFullscreen?document.exitFullscreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen(),t.config.fullScreen=!1;else{const e=document.documentElement.requestFullScreen||document.documentElement.webkitRequestFullScreen||document.documentElement.mozRequestFullScreen||document.documentElement.msRequestFullscreen;e&&e.call(document.documentElement),t.config.fullScreen=!0}}return m((()=>e.startPosition),(e=>{t.index=+e})),m(s,(()=>{g(),t.imgVisible=!1,d()})),m((()=>e.show),(i=>{e.images.length?(i?(g(),document.body.style.overflow="hidden"):document.body.style.overflow="",d()):n("close",{index:t.index})})),m((()=>e.page),(e=>{t.activePage=e,p()})),window.onresize=()=>{document.fullscreenEnabled||window.fullScreen||document.webkitIsFullScreen||document.msFullscreenEnabled||(t.config.fullScreen=!1)},{config:o,imgStyle:l,imgVisible:a,index:s,imgChange:function(i){const n=e.images.length-1;"prev"===i?(t.index=t.index--<=0?0:t.index,t.index<8*t.activePage&&f("prev")):"next"===i?(t.index=t.index++>=n?n:t.index,t.index>=8*(t.activePage+1)&&f("next")):isNaN(i)||(t.index=i<=0?0:i>=n?n:i)},pageChange:f,close:function(){t.config.fullScreen&&v(),n("close")},fullScreen:v,download:function(e){window.open(e)}}}}),O={class:"image-viewer"},q={key:0,class:"image-viewer-content"},M=["src","alt","width","height"],N={class:"image-viewer-info"},V={class:"right"},I={key:1,class:"image-viewer-nav"},L=[v("i",{class:"img-v-icon-download"},null,-1)],z={class:"image-viewer-nav-main"},H={class:"image-viewer-nav-thumb"},W=["alt","title","onClick"],A=[v("i",{class:"img-v-icon-arrow-right"},null,-1)];E.render=function(e,i,n,t,o,l){return h(),u(d,{name:"image-viewer-fade"},{default:g((()=>[p(v("div",O,[v("i",{class:"image-viewer-close img-v-icon-close",onClick:i[0]||(i[0]=(...i)=>e.close&&e.close(...i))}),e.images.length?(h(),w("div",q,[p(v("img",{src:e.images[e.index].url,alt:e.images[e.index].name?e.images[e.index].name:"",width:e.imgStyle.width,height:e.imgStyle.height},null,8,M),[[f,e.imgVisible]]),v("div",N,[v("p",null,x(e.images[e.index].name?e.images[e.index].name:"")+"("+x(e.index+1+"/"+e.images.length)+")",1),v("div",V,[v("i",{class:y(`img-v-icon-${e.config.fullScreen?"cancel-":""}full-screen`),onClick:i[1]||(i[1]=(...i)=>e.fullScreen&&e.fullScreen(...i))},null,2),v("i",{class:"img-v-icon-download",onClick:i[2]||(i[2]=i=>e.download(e.images[e.index].url))})])]),e.images.length>1?(h(),w(b,{key:0},[v("div",{class:"image-viewer-content-prev",onClick:i[3]||(i[3]=i=>e.imgChange("prev"))}),v("div",{class:"image-viewer-content-next",onClick:i[4]||(i[4]=i=>e.imgChange("next"))})],64)):S("",!0)])):S("",!0),e.thumbnail?(h(),w("div",I,[v("div",{class:"image-viewer-nav-prev",onClick:i[5]||(i[5]=i=>e.pageChange("prev"))},L),v("div",z,[v("div",H,[(h(!0),w(b,null,C(e.images,((i,n)=>(h(),w("div",{key:n,class:y({active:n===e.index}),alt:i.name?i.name:"",title:i.name?i.name:"",style:k({backgroundImage:"url("+i.url+")"}),onClick:i=>e.imgChange(n)},null,14,W)))),128))])]),v("div",{class:"image-viewer-nav-next",onClick:i[6]||(i[6]=i=>e.pageChange("next"))},A)])):S("",!0)],512),[[f,e.show]])])),_:1})};let R=null;function B(){let e=function(e){const i=P(e),n=document.createElement("div",{class:"vue-image-viewer-full"});return document.body.appendChild(n),{instance:i.mount(n),unmount(){i.unmount(),document.body.removeChild(n)}}}({setup(e,{expose:s}){const r=c({show:!1,startPosition:0,page:0,images:[]});function m(){r.show=!1}const u=j();return u&&Object.assign(u.proxy,{open:function(e){r.show=!0,r.startPosition=e},close:function(){r.show=!1},images:function(e){r.images=e}}),()=>{return F(E,(e=((e,i)=>{for(var n in i||(i={}))o.call(i,n)&&a(e,n,i[n]);if(t)for(var n of t(i))l.call(i,n)&&a(e,n,i[n]);return e})({},r),i(e,n({onClose:m}))));var e}}});({instance:R}=e)}function D(){return R||B(),R}var K={show(e=0){D().open(e)},hide(){D().close()},images(e){D().images(e)}};const T={name:"demo",data:()=>({visible:!1,images:[{url:"https://static.pexels.com/photos/860935/pexels-photo-860935.jpeg",name:"Sunset"},{url:"https://images.pexels.com/photos/589810/pexels-photo-589810.jpeg",name:"Autumn"},{url:"https://static.pexels.com/photos/126793/pexels-photo-126793.jpeg"},{url:"https://static.pexels.com/photos/74775/pexels-photo-74775.jpeg",name:"Floral"},{url:"https://static.pexels.com/photos/545968/pexels-photo-545968.jpeg"}]}),created(){K.images(this.images)},methods:{open(e){K.show(e)}}},$={class:"demo"},_=["src","onClick"];T.render=function(e,i,n,t,o,l){return h(),w("div",$,[(h(!0),w(b,null,C(o.images,((e,i)=>(h(),w("img",{key:i,src:e.url,onClick:e=>l.open(i)},null,8,_)))),128))])},P(T).mount("#app");