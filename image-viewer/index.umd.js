var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,n,t)=>n in e?__defProp(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,__spreadValues=(e,n)=>{for(var t in n||(n={}))__hasOwnProp.call(n,t)&&__defNormalProp(e,t,n[t]);if(__getOwnPropSymbols)for(var t of __getOwnPropSymbols(n))__propIsEnum.call(n,t)&&__defNormalProp(e,t,n[t]);return e},__spreadProps=(e,n)=>__defProps(e,__getOwnPropDescs(n));!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("vue")):"function"==typeof define&&define.amd?define(["vue"],n):(e="undefined"!=typeof globalThis?globalThis:e||self)["image-viewer"]=n(e.Vue)}(this,(function(e){"use strict";const n=e.defineComponent({name:"imageViewer",props:{images:{type:Array,default:()=>[]},startPosition:{type:Number,default:0},show:{type:Boolean,default:!1},page:{type:Number,default:0},thumbnail:{type:Boolean,default:!0}},setup(n,{expose:t,emit:i}){const o=e.reactive({config:{imgMaxWidth:.8*window.innerWidth,imgMaxHeight:.8*window.innerHeight,fullScreen:!1},imgStyle:{width:"auto",height:"auto"},imgVisible:!1,index:0,activePage:0}),{config:l,imgStyle:a,imgVisible:c,index:r,activePage:m}=e.toRefs(o);function s(){o.imgStyle={width:"auto",height:"auto"}}function d(e){if(n.images&&n.images[o.index]){let e=new Image;e.src=n.images[o.index].url,e.onload=function(){u(e.width,e.height)}}}function u(e,n){let t=function(e,n){let t=0,{imgMaxWidth:i,imgMaxHeight:l}=o.config;if(e>i||n>l)return t=e-i>n-l?i/e:l/n,{width:e*t,height:n*t};return{width:e,height:n}}(e,n);t.width-10>o.config.imgMaxWidth||t.height-10>o.config.imgMaxHeight?u(t.width,t.height):(o.imgStyle=t,o.imgVisible=!0)}function g(){let e=document.querySelector(".image-viewer-nav-thumb").width;document.querySelector(".image-viewer-nav-thumb > div:first-child").style.marginLeft=-e*o.activePage+"px"}function f(e){const t=n.images.length-1;"prev"===e&&8*o.activePage>=8?o.activePage--:"next"===e&&8*o.activePage<t&&t-8*o.activePage>8&&o.activePage++,g()}function h(){if(o.config.fullScreen)document.exitFullscreen?document.exitFullscreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen(),o.config.fullScreen=!1;else{const e=document.documentElement.requestFullScreen||document.documentElement.webkitRequestFullScreen||document.documentElement.mozRequestFullScreen||document.documentElement.msRequestFullscreen;e&&e.call(document.documentElement),o.config.fullScreen=!0}}return e.watch((()=>n.startPosition),(e=>{o.index=+e})),e.watch(r,(()=>{s(),o.imgVisible=!1,d()})),e.watch((()=>n.show),(e=>{n.images.length?(e?(s(),document.body.style.overflow="hidden"):document.body.style.overflow="",d()):i("close",{index:o.index})})),e.watch((()=>n.page),(e=>{o.activePage=e,g()})),window.onresize=()=>{document.fullscreenEnabled||window.fullScreen||document.webkitIsFullScreen||document.msFullscreenEnabled||(o.config.fullScreen=!1)},{config:l,imgStyle:a,imgVisible:c,index:r,imgChange:function(e){const t=n.images.length-1;"prev"===e?(o.index=o.index--<=0?0:o.index,o.index<8*o.activePage&&f("prev")):"next"===e?(o.index=o.index++>=t?t:o.index,o.index>=8*(o.activePage+1)&&f("next")):isNaN(e)||(o.index=e<=0?0:e>=t?t:e)},pageChange:f,close:function(){o.config.fullScreen&&h(),i("close")},fullScreen:h,download:function(e){window.open(e)}}}}),t={class:"image-viewer"},i={key:0,class:"image-viewer-content"},o=["src","alt","width","height"],l={class:"image-viewer-info"},a={class:"right"},c={key:1,class:"image-viewer-nav"},r=[e.createElementVNode("i",{class:"img-v-icon-arrow-left"},null,-1)],m={class:"image-viewer-nav-main"},s={class:"image-viewer-nav-thumb"},d=["alt","title","onClick"],u=[e.createElementVNode("i",{class:"img-v-icon-arrow-right"},null,-1)];n.render=function(n,g,f,h,p,w){return e.openBlock(),e.createBlock(e.Transition,{name:"image-viewer-fade"},{default:e.withCtx((()=>[e.withDirectives(e.createElementVNode("div",t,[e.createElementVNode("i",{class:"image-viewer-close img-v-icon-close",onClick:g[0]||(g[0]=(...e)=>n.close&&n.close(...e))}),n.images.length?(e.openBlock(),e.createElementBlock("div",i,[e.withDirectives(e.createElementVNode("img",{src:n.images[n.index].url,alt:n.images[n.index].name?n.images[n.index].name:"",width:n.imgStyle.width,height:n.imgStyle.height},null,8,o),[[e.vShow,n.imgVisible]]),e.createElementVNode("div",l,[e.createElementVNode("p",null,e.toDisplayString(n.images[n.index].name?n.images[n.index].name:"")+"("+e.toDisplayString(n.index+1+"/"+n.images.length)+")",1),e.createElementVNode("div",a,[e.createElementVNode("i",{class:e.normalizeClass(`img-v-icon-${n.config.fullScreen?"cancel-":""}full-screen`),onClick:g[1]||(g[1]=(...e)=>n.fullScreen&&n.fullScreen(...e))},null,2),e.createElementVNode("i",{class:"img-v-icon-download",onClick:g[2]||(g[2]=e=>n.download(n.images[n.index].url))})])]),n.images.length>1?(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("div",{class:"image-viewer-content-prev",onClick:g[3]||(g[3]=e=>n.imgChange("prev"))}),e.createElementVNode("div",{class:"image-viewer-content-next",onClick:g[4]||(g[4]=e=>n.imgChange("next"))})],64)):e.createCommentVNode("",!0)])):e.createCommentVNode("",!0),n.thumbnail?(e.openBlock(),e.createElementBlock("div",c,[e.createElementVNode("div",{class:"image-viewer-nav-prev",onClick:g[5]||(g[5]=e=>n.pageChange("prev"))},r),e.createElementVNode("div",m,[e.createElementVNode("div",s,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.images,((t,i)=>(e.openBlock(),e.createElementBlock("div",{key:i,class:e.normalizeClass({active:i===n.index}),alt:t.name?t.name:"",title:t.name?t.name:"",style:e.normalizeStyle({backgroundImage:"url("+t.url+")"}),onClick:e=>n.imgChange(i)},null,14,d)))),128))])]),e.createElementVNode("div",{class:"image-viewer-nav-next",onClick:g[6]||(g[6]=e=>n.pageChange("next"))},u)])):e.createCommentVNode("",!0)],512),[[e.vShow,n.show]])])),_:1})};let g=null;function f(){let t=function(n){const t=e.createApp(n),i=document.createElement("div",{class:"vue-image-viewer-full"});return document.body.appendChild(i),{instance:t.mount(i),unmount(){t.unmount(),document.body.removeChild(i)}}}({setup(t,{expose:i}){const o=e.reactive({show:!1,startPosition:0,page:0,images:[]});function l(){o.show=!1}const a=e.getCurrentInstance();return a&&Object.assign(a.proxy,{open:function(e){o.show=!0,o.startPosition=e},close:function(){o.show=!1},images:function(e){o.images=e}}),()=>e.h(n,__spreadProps(__spreadValues({},o),{onClose:l}))}});({instance:g}=t)}function h(){return g||f(),g}return{show(e=0){h().open(e)},hide(){h().close()},images(e){h().images(e)}}}));