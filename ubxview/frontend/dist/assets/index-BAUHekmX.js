(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ba="165",Zc=0,Ja=1,jc=2,kl=1,Jc=2,dn=3,Fn=0,ye=1,Oe=2,pn=0,Dn=1,Qa=2,to=3,eo=4,Qc=5,Zn=100,td=101,ed=102,nd=103,id=104,rd=200,sd=201,ad=202,od=203,oa=204,la=205,ld=206,cd=207,dd=208,ud=209,hd=210,fd=211,pd=212,md=213,gd=214,_d=0,vd=1,xd=2,jr=3,Md=4,Sd=5,yd=6,Ed=7,Gl=0,Td=1,Ad=2,In=0,bd=1,wd=2,Cd=3,Rd=4,Pd=5,Ld=6,Dd=7,Vl=300,Fi=301,Oi=302,ca=303,da=304,cs=306,ua=1e3,hn=1001,ha=1002,Be=1003,Id=1004,Mr=1005,Re=1006,ys=1007,ti=1008,On=1009,Ud=1010,Nd=1011,Jr=1012,Wl=1013,Bi=1014,Cn=1015,ds=1016,Xl=1017,$l=1018,zi=1020,Fd=35902,Od=1021,Bd=1022,Qe=1023,zd=1024,Hd=1025,Pi=1026,Hi=1027,kd=1028,ql=1029,Gd=1030,Yl=1031,Kl=1033,Es=33776,Ts=33777,As=33778,bs=33779,no=35840,io=35841,ro=35842,so=35843,ao=36196,oo=37492,lo=37496,co=37808,uo=37809,ho=37810,fo=37811,po=37812,mo=37813,go=37814,_o=37815,vo=37816,xo=37817,Mo=37818,So=37819,yo=37820,Eo=37821,ws=36492,To=36494,Ao=36495,Vd=36283,bo=36284,wo=36285,Co=36286,Wd=3200,Xd=3201,$d=0,qd=1,wn="",Ze="srgb",zn="srgb-linear",wa="display-p3",us="display-p3-linear",Qr="linear",Yt="srgb",ts="rec709",es="p3",di=7680,Ro=519,Yd=512,Kd=513,Zd=514,Zl=515,jd=516,Jd=517,Qd=518,tu=519,Po=35044,Lo="300 es",fn=2e3,ns=2001;class Vi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Cs=Math.PI/180,fa=180/Math.PI;function cr(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(fe[i&255]+fe[i>>8&255]+fe[i>>16&255]+fe[i>>24&255]+"-"+fe[t&255]+fe[t>>8&255]+"-"+fe[t>>16&15|64]+fe[t>>24&255]+"-"+fe[e&63|128]+fe[e>>8&255]+"-"+fe[e>>16&255]+fe[e>>24&255]+fe[n&255]+fe[n>>8&255]+fe[n>>16&255]+fe[n>>24&255]).toLowerCase()}function Me(i,t,e){return Math.max(t,Math.min(e,i))}function eu(i,t){return(i%t+t)%t}function Rs(i,t,e){return(1-e)*i+e*t}function Ji(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ve(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class zt{constructor(t=0,e=0){zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class wt{constructor(t,e,n,r,s,a,o,l,c){wt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c)}set(t,e,n,r,s,a,o,l,c){const d=this.elements;return d[0]=t,d[1]=r,d[2]=o,d[3]=e,d[4]=s,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],f=n[7],p=n[2],m=n[5],g=n[8],_=r[0],h=r[3],u=r[6],E=r[1],y=r[4],T=r[7],B=r[2],R=r[5],w=r[8];return s[0]=a*_+o*E+l*B,s[3]=a*h+o*y+l*R,s[6]=a*u+o*T+l*w,s[1]=c*_+d*E+f*B,s[4]=c*h+d*y+f*R,s[7]=c*u+d*T+f*w,s[2]=p*_+m*E+g*B,s[5]=p*h+m*y+g*R,s[8]=p*u+m*T+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],d=t[8];return e*a*d-e*o*c-n*s*d+n*o*l+r*s*c-r*a*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],d=t[8],f=d*a-o*c,p=o*l-d*s,m=c*s-a*l,g=e*f+n*p+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=f*_,t[1]=(r*c-d*n)*_,t[2]=(o*n-r*a)*_,t[3]=p*_,t[4]=(d*e-r*l)*_,t[5]=(r*s-o*e)*_,t[6]=m*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ps.makeScale(t,e)),this}rotate(t){return this.premultiply(Ps.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ps.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ps=new wt;function jl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function or(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function nu(){const i=or("canvas");return i.style.display="block",i}const Do={};function Jl(i){i in Do||(Do[i]=!0,console.warn(i))}function iu(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const Io=new wt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Uo=new wt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Sr={[zn]:{transfer:Qr,primaries:ts,toReference:i=>i,fromReference:i=>i},[Ze]:{transfer:Yt,primaries:ts,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[us]:{transfer:Qr,primaries:es,toReference:i=>i.applyMatrix3(Uo),fromReference:i=>i.applyMatrix3(Io)},[wa]:{transfer:Yt,primaries:es,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Uo),fromReference:i=>i.applyMatrix3(Io).convertLinearToSRGB()}},ru=new Set([zn,us]),Xt={enabled:!0,_workingColorSpace:zn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!ru.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Sr[t].toReference,r=Sr[e].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Sr[i].primaries},getTransfer:function(i){return i===wn?Qr:Sr[i].transfer}};function Li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ui;class su{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ui===void 0&&(ui=or("canvas")),ui.width=t.width,ui.height=t.height;const n=ui.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ui}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=or("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Li(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Li(e[n]/255)*255):e[n]=Li(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let au=0;class Ql{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=cr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ds(r[a].image)):s.push(Ds(r[a]))}else s=Ds(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Ds(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?su.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ou=0;class _e extends Vi{constructor(t=_e.DEFAULT_IMAGE,e=_e.DEFAULT_MAPPING,n=hn,r=hn,s=Re,a=ti,o=Qe,l=On,c=_e.DEFAULT_ANISOTROPY,d=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=cr(),this.name="",this.source=new Ql(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ua:t.x=t.x-Math.floor(t.x);break;case hn:t.x=t.x<0?0:1;break;case ha:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ua:t.y=t.y-Math.floor(t.y);break;case hn:t.y=t.y<0?0:1;break;case ha:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}_e.DEFAULT_IMAGE=null;_e.DEFAULT_MAPPING=Vl;_e.DEFAULT_ANISOTROPY=1;class ue{constructor(t=0,e=0,n=0,r=1){ue.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],d=l[4],f=l[8],p=l[1],m=l[5],g=l[9],_=l[2],h=l[6],u=l[10];if(Math.abs(d-p)<.01&&Math.abs(f-_)<.01&&Math.abs(g-h)<.01){if(Math.abs(d+p)<.1&&Math.abs(f+_)<.1&&Math.abs(g+h)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,T=(m+1)/2,B=(u+1)/2,R=(d+p)/4,w=(f+_)/4,I=(g+h)/4;return y>T&&y>B?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=R/n,s=w/n):T>B?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=R/r,s=I/r):B<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(B),n=w/s,r=I/s),this.set(n,r,s,e),this}let E=Math.sqrt((h-g)*(h-g)+(f-_)*(f-_)+(p-d)*(p-d));return Math.abs(E)<.001&&(E=1),this.x=(h-g)/E,this.y=(f-_)/E,this.z=(p-d)/E,this.w=Math.acos((c+m+u-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class lu extends Vi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Re,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new _e(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ql(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ni extends lu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class tc extends _e{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Be,this.minFilter=Be,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class cu extends _e{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Be,this.minFilter=Be,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class dr{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let l=n[r+0],c=n[r+1],d=n[r+2],f=n[r+3];const p=s[a+0],m=s[a+1],g=s[a+2],_=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=d,t[e+3]=f;return}if(o===1){t[e+0]=p,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==p||c!==m||d!==g){let h=1-o;const u=l*p+c*m+d*g+f*_,E=u>=0?1:-1,y=1-u*u;if(y>Number.EPSILON){const B=Math.sqrt(y),R=Math.atan2(B,u*E);h=Math.sin(h*R)/B,o=Math.sin(o*R)/B}const T=o*E;if(l=l*h+p*T,c=c*h+m*T,d=d*h+g*T,f=f*h+_*T,h===1-o){const B=1/Math.sqrt(l*l+c*c+d*d+f*f);l*=B,c*=B,d*=B,f*=B}}t[e]=l,t[e+1]=c,t[e+2]=d,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],d=n[r+3],f=s[a],p=s[a+1],m=s[a+2],g=s[a+3];return t[e]=o*g+d*f+l*m-c*p,t[e+1]=l*g+d*p+c*f-o*m,t[e+2]=c*g+d*m+o*p-l*f,t[e+3]=d*g-o*f-l*p-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(r/2),f=o(s/2),p=l(n/2),m=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=p*d*f+c*m*g,this._y=c*m*f-p*d*g,this._z=c*d*g+p*m*f,this._w=c*d*f-p*m*g;break;case"YXZ":this._x=p*d*f+c*m*g,this._y=c*m*f-p*d*g,this._z=c*d*g-p*m*f,this._w=c*d*f+p*m*g;break;case"ZXY":this._x=p*d*f-c*m*g,this._y=c*m*f+p*d*g,this._z=c*d*g+p*m*f,this._w=c*d*f-p*m*g;break;case"ZYX":this._x=p*d*f-c*m*g,this._y=c*m*f+p*d*g,this._z=c*d*g-p*m*f,this._w=c*d*f+p*m*g;break;case"YZX":this._x=p*d*f+c*m*g,this._y=c*m*f+p*d*g,this._z=c*d*g-p*m*f,this._w=c*d*f-p*m*g;break;case"XZY":this._x=p*d*f-c*m*g,this._y=c*m*f-p*d*g,this._z=c*d*g+p*m*f,this._w=c*d*f+p*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],d=e[6],f=e[10],p=n+o+f;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(d-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(n>o&&n>f){const m=2*Math.sqrt(1+n-o-f);this._w=(d-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>f){const m=2*Math.sqrt(1+o-n-f);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+f-n-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,d=e._w;return this._x=n*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-n*c,this._z=s*d+a*c+n*l-r*o,this._w=a*d-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*r+e*this._y,this._z=m*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),f=Math.sin((1-e)*d)/c,p=Math.sin(e*d)/c;return this._w=a*f+this._w*p,this._x=n*f+this._x*p,this._y=r*f+this._y*p,this._z=s*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(No.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(No.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*n),d=2*(o*e-s*r),f=2*(s*n-a*e);return this.x=e+l*c+a*f-o*d,this.y=n+l*d+o*c-s*f,this.z=r+l*f+s*d-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Is.copy(this).projectOnVector(t),this.sub(Is)}reflect(t){return this.sub(Is.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Is=new L,No=new dr;class ur{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(He.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(He.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=He.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,He):He.fromBufferAttribute(s,a),He.applyMatrix4(t.matrixWorld),this.expandByPoint(He);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),yr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),yr.copy(n.boundingBox)),yr.applyMatrix4(t.matrixWorld),this.union(yr)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,He),He.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Qi),Er.subVectors(this.max,Qi),hi.subVectors(t.a,Qi),fi.subVectors(t.b,Qi),pi.subVectors(t.c,Qi),xn.subVectors(fi,hi),Mn.subVectors(pi,fi),Gn.subVectors(hi,pi);let e=[0,-xn.z,xn.y,0,-Mn.z,Mn.y,0,-Gn.z,Gn.y,xn.z,0,-xn.x,Mn.z,0,-Mn.x,Gn.z,0,-Gn.x,-xn.y,xn.x,0,-Mn.y,Mn.x,0,-Gn.y,Gn.x,0];return!Us(e,hi,fi,pi,Er)||(e=[1,0,0,0,1,0,0,0,1],!Us(e,hi,fi,pi,Er))?!1:(Tr.crossVectors(xn,Mn),e=[Tr.x,Tr.y,Tr.z],Us(e,hi,fi,pi,Er))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,He).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(He).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const sn=[new L,new L,new L,new L,new L,new L,new L,new L],He=new L,yr=new ur,hi=new L,fi=new L,pi=new L,xn=new L,Mn=new L,Gn=new L,Qi=new L,Er=new L,Tr=new L,Vn=new L;function Us(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Vn.fromArray(i,s);const o=r.x*Math.abs(Vn.x)+r.y*Math.abs(Vn.y)+r.z*Math.abs(Vn.z),l=t.dot(Vn),c=e.dot(Vn),d=n.dot(Vn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const du=new ur,tr=new L,Ns=new L;class hr{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):du.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;tr.subVectors(t,this.center);const e=tr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(tr,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ns.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(tr.copy(t.center).add(Ns)),this.expandByPoint(tr.copy(t.center).sub(Ns))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const an=new L,Fs=new L,Ar=new L,Sn=new L,Os=new L,br=new L,Bs=new L;class Ca{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,an)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=an.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(an.copy(this.origin).addScaledVector(this.direction,e),an.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Fs.copy(t).add(e).multiplyScalar(.5),Ar.copy(e).sub(t).normalize(),Sn.copy(this.origin).sub(Fs);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Ar),o=Sn.dot(this.direction),l=-Sn.dot(Ar),c=Sn.lengthSq(),d=Math.abs(1-a*a);let f,p,m,g;if(d>0)if(f=a*l-o,p=a*o-l,g=s*d,f>=0)if(p>=-g)if(p<=g){const _=1/d;f*=_,p*=_,m=f*(f+a*p+2*o)+p*(a*f+p+2*l)+c}else p=s,f=Math.max(0,-(a*p+o)),m=-f*f+p*(p+2*l)+c;else p=-s,f=Math.max(0,-(a*p+o)),m=-f*f+p*(p+2*l)+c;else p<=-g?(f=Math.max(0,-(-a*s+o)),p=f>0?-s:Math.min(Math.max(-s,-l),s),m=-f*f+p*(p+2*l)+c):p<=g?(f=0,p=Math.min(Math.max(-s,-l),s),m=p*(p+2*l)+c):(f=Math.max(0,-(a*s+o)),p=f>0?s:Math.min(Math.max(-s,-l),s),m=-f*f+p*(p+2*l)+c);else p=a>0?-s:s,f=Math.max(0,-(a*p+o)),m=-f*f+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Fs).addScaledVector(Ar,p),m}intersectSphere(t,e){an.subVectors(t.center,this.origin);const n=an.dot(this.direction),r=an.dot(an)-n*n,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,p=this.origin;return c>=0?(n=(t.min.x-p.x)*c,r=(t.max.x-p.x)*c):(n=(t.max.x-p.x)*c,r=(t.min.x-p.x)*c),d>=0?(s=(t.min.y-p.y)*d,a=(t.max.y-p.y)*d):(s=(t.max.y-p.y)*d,a=(t.min.y-p.y)*d),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(t.min.z-p.z)*f,l=(t.max.z-p.z)*f):(o=(t.max.z-p.z)*f,l=(t.min.z-p.z)*f),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,an)!==null}intersectTriangle(t,e,n,r,s){Os.subVectors(e,t),br.subVectors(n,t),Bs.crossVectors(Os,br);let a=this.direction.dot(Bs),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Sn.subVectors(this.origin,t);const l=o*this.direction.dot(br.crossVectors(Sn,br));if(l<0)return null;const c=o*this.direction.dot(Os.cross(Sn));if(c<0||l+c>a)return null;const d=-o*Sn.dot(Bs);return d<0?null:this.at(d/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(t,e,n,r,s,a,o,l,c,d,f,p,m,g,_,h){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c,d,f,p,m,g,_,h)}set(t,e,n,r,s,a,o,l,c,d,f,p,m,g,_,h){const u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=d,u[10]=f,u[14]=p,u[3]=m,u[7]=g,u[11]=_,u[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/mi.setFromMatrixColumn(t,0).length(),s=1/mi.setFromMatrixColumn(t,1).length(),a=1/mi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const p=a*d,m=a*f,g=o*d,_=o*f;e[0]=l*d,e[4]=-l*f,e[8]=c,e[1]=m+g*c,e[5]=p-_*c,e[9]=-o*l,e[2]=_-p*c,e[6]=g+m*c,e[10]=a*l}else if(t.order==="YXZ"){const p=l*d,m=l*f,g=c*d,_=c*f;e[0]=p+_*o,e[4]=g*o-m,e[8]=a*c,e[1]=a*f,e[5]=a*d,e[9]=-o,e[2]=m*o-g,e[6]=_+p*o,e[10]=a*l}else if(t.order==="ZXY"){const p=l*d,m=l*f,g=c*d,_=c*f;e[0]=p-_*o,e[4]=-a*f,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*d,e[9]=_-p*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const p=a*d,m=a*f,g=o*d,_=o*f;e[0]=l*d,e[4]=g*c-m,e[8]=p*c+_,e[1]=l*f,e[5]=_*c+p,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const p=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*d,e[4]=_-p*f,e[8]=g*f+m,e[1]=f,e[5]=a*d,e[9]=-o*d,e[2]=-c*d,e[6]=m*f+g,e[10]=p-_*f}else if(t.order==="XZY"){const p=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*d,e[4]=-f,e[8]=c*d,e[1]=p*f+_,e[5]=a*d,e[9]=m*f-g,e[2]=g*f-m,e[6]=o*d,e[10]=_*f+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(uu,t,hu)}lookAt(t,e,n){const r=this.elements;return Ae.subVectors(t,e),Ae.lengthSq()===0&&(Ae.z=1),Ae.normalize(),yn.crossVectors(n,Ae),yn.lengthSq()===0&&(Math.abs(n.z)===1?Ae.x+=1e-4:Ae.z+=1e-4,Ae.normalize(),yn.crossVectors(n,Ae)),yn.normalize(),wr.crossVectors(Ae,yn),r[0]=yn.x,r[4]=wr.x,r[8]=Ae.x,r[1]=yn.y,r[5]=wr.y,r[9]=Ae.y,r[2]=yn.z,r[6]=wr.z,r[10]=Ae.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],f=n[5],p=n[9],m=n[13],g=n[2],_=n[6],h=n[10],u=n[14],E=n[3],y=n[7],T=n[11],B=n[15],R=r[0],w=r[4],I=r[8],v=r[12],x=r[1],b=r[5],z=r[9],F=r[13],X=r[2],$=r[6],W=r[10],Y=r[14],k=r[3],dt=r[7],ct=r[11],ut=r[15];return s[0]=a*R+o*x+l*X+c*k,s[4]=a*w+o*b+l*$+c*dt,s[8]=a*I+o*z+l*W+c*ct,s[12]=a*v+o*F+l*Y+c*ut,s[1]=d*R+f*x+p*X+m*k,s[5]=d*w+f*b+p*$+m*dt,s[9]=d*I+f*z+p*W+m*ct,s[13]=d*v+f*F+p*Y+m*ut,s[2]=g*R+_*x+h*X+u*k,s[6]=g*w+_*b+h*$+u*dt,s[10]=g*I+_*z+h*W+u*ct,s[14]=g*v+_*F+h*Y+u*ut,s[3]=E*R+y*x+T*X+B*k,s[7]=E*w+y*b+T*$+B*dt,s[11]=E*I+y*z+T*W+B*ct,s[15]=E*v+y*F+T*Y+B*ut,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],d=t[2],f=t[6],p=t[10],m=t[14],g=t[3],_=t[7],h=t[11],u=t[15];return g*(+s*l*f-r*c*f-s*o*p+n*c*p+r*o*m-n*l*m)+_*(+e*l*m-e*c*p+s*a*p-r*a*m+r*c*d-s*l*d)+h*(+e*c*f-e*o*m-s*a*f+n*a*m+s*o*d-n*c*d)+u*(-r*o*d-e*l*f+e*o*p+r*a*f-n*a*p+n*l*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],d=t[8],f=t[9],p=t[10],m=t[11],g=t[12],_=t[13],h=t[14],u=t[15],E=f*h*c-_*p*c+_*l*m-o*h*m-f*l*u+o*p*u,y=g*p*c-d*h*c-g*l*m+a*h*m+d*l*u-a*p*u,T=d*_*c-g*f*c+g*o*m-a*_*m-d*o*u+a*f*u,B=g*f*l-d*_*l-g*o*p+a*_*p+d*o*h-a*f*h,R=e*E+n*y+r*T+s*B;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/R;return t[0]=E*w,t[1]=(_*p*s-f*h*s-_*r*m+n*h*m+f*r*u-n*p*u)*w,t[2]=(o*h*s-_*l*s+_*r*c-n*h*c-o*r*u+n*l*u)*w,t[3]=(f*l*s-o*p*s-f*r*c+n*p*c+o*r*m-n*l*m)*w,t[4]=y*w,t[5]=(d*h*s-g*p*s+g*r*m-e*h*m-d*r*u+e*p*u)*w,t[6]=(g*l*s-a*h*s-g*r*c+e*h*c+a*r*u-e*l*u)*w,t[7]=(a*p*s-d*l*s+d*r*c-e*p*c-a*r*m+e*l*m)*w,t[8]=T*w,t[9]=(g*f*s-d*_*s-g*n*m+e*_*m+d*n*u-e*f*u)*w,t[10]=(a*_*s-g*o*s+g*n*c-e*_*c-a*n*u+e*o*u)*w,t[11]=(d*o*s-a*f*s-d*n*c+e*f*c+a*n*m-e*o*m)*w,t[12]=B*w,t[13]=(d*_*r-g*f*r+g*n*p-e*_*p-d*n*h+e*f*h)*w,t[14]=(g*o*r-a*_*r-g*n*l+e*_*l+a*n*h-e*o*h)*w,t[15]=(a*f*r-d*o*r+d*n*l-e*f*l-a*n*p+e*o*p)*w,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,d=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+n,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,d=a+a,f=o+o,p=s*c,m=s*d,g=s*f,_=a*d,h=a*f,u=o*f,E=l*c,y=l*d,T=l*f,B=n.x,R=n.y,w=n.z;return r[0]=(1-(_+u))*B,r[1]=(m+T)*B,r[2]=(g-y)*B,r[3]=0,r[4]=(m-T)*R,r[5]=(1-(p+u))*R,r[6]=(h+E)*R,r[7]=0,r[8]=(g+y)*w,r[9]=(h-E)*w,r[10]=(1-(p+_))*w,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=mi.set(r[0],r[1],r[2]).length();const a=mi.set(r[4],r[5],r[6]).length(),o=mi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],ke.copy(this);const c=1/s,d=1/a,f=1/o;return ke.elements[0]*=c,ke.elements[1]*=c,ke.elements[2]*=c,ke.elements[4]*=d,ke.elements[5]*=d,ke.elements[6]*=d,ke.elements[8]*=f,ke.elements[9]*=f,ke.elements[10]*=f,e.setFromRotationMatrix(ke),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,r,s,a,o=fn){const l=this.elements,c=2*s/(e-t),d=2*s/(n-r),f=(e+t)/(e-t),p=(n+r)/(n-r);let m,g;if(o===fn)m=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===ns)m=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=fn){const l=this.elements,c=1/(e-t),d=1/(n-r),f=1/(a-s),p=(e+t)*c,m=(n+r)*d;let g,_;if(o===fn)g=(a+s)*f,_=-2*f;else if(o===ns)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const mi=new L,ke=new Kt,uu=new L(0,0,0),hu=new L(1,1,1),yn=new L,wr=new L,Ae=new L,Fo=new Kt,Oo=new dr;class gn{constructor(t=0,e=0,n=0,r=gn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],f=r[2],p=r[6],m=r[10];switch(e){case"XYZ":this._y=Math.asin(Me(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Me(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Me(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Me(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Me(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Fo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Fo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Oo.setFromEuler(this),this.setFromQuaternion(Oo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gn.DEFAULT_ORDER="XYZ";class ec{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let fu=0;const Bo=new L,gi=new dr,on=new Kt,Cr=new L,er=new L,pu=new L,mu=new dr,zo=new L(1,0,0),Ho=new L(0,1,0),ko=new L(0,0,1),Go={type:"added"},gu={type:"removed"},_i={type:"childadded",child:null},zs={type:"childremoved",child:null};class se extends Vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=cr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=se.DEFAULT_UP.clone();const t=new L,e=new gn,n=new dr,r=new L(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Kt},normalMatrix:{value:new wt}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=se.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ec,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return gi.setFromAxisAngle(t,e),this.quaternion.multiply(gi),this}rotateOnWorldAxis(t,e){return gi.setFromAxisAngle(t,e),this.quaternion.premultiply(gi),this}rotateX(t){return this.rotateOnAxis(zo,t)}rotateY(t){return this.rotateOnAxis(Ho,t)}rotateZ(t){return this.rotateOnAxis(ko,t)}translateOnAxis(t,e){return Bo.copy(t).applyQuaternion(this.quaternion),this.position.add(Bo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zo,t)}translateY(t){return this.translateOnAxis(Ho,t)}translateZ(t){return this.translateOnAxis(ko,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(on.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Cr.copy(t):Cr.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?on.lookAt(er,Cr,this.up):on.lookAt(Cr,er,this.up),this.quaternion.setFromRotationMatrix(on),r&&(on.extractRotation(r.matrixWorld),gi.setFromRotationMatrix(on),this.quaternion.premultiply(gi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Go),_i.child=t,this.dispatchEvent(_i),_i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(gu),zs.child=t,this.dispatchEvent(zs),zs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),on.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),on.multiply(t.parent.matrixWorld)),t.applyMatrix4(on),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Go),_i.child=t,this.dispatchEvent(_i),_i.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,t,pu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,mu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++){const s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const f=l[c];s(t.shapes,f)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),d=a(t.images),f=a(t.shapes),p=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),f.length>0&&(n.shapes=f),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}se.DEFAULT_UP=new L(0,1,0);se.DEFAULT_MATRIX_AUTO_UPDATE=!0;se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ge=new L,ln=new L,Hs=new L,cn=new L,vi=new L,xi=new L,Vo=new L,ks=new L,Gs=new L,Vs=new L;class Je{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Ge.subVectors(t,e),r.cross(Ge);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Ge.subVectors(r,e),ln.subVectors(n,e),Hs.subVectors(t,e);const a=Ge.dot(Ge),o=Ge.dot(ln),l=Ge.dot(Hs),c=ln.dot(ln),d=ln.dot(Hs),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const p=1/f,m=(c*l-o*d)*p,g=(a*d-o*l)*p;return s.set(1-m-g,g,m)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,cn)===null?!1:cn.x>=0&&cn.y>=0&&cn.x+cn.y<=1}static getInterpolation(t,e,n,r,s,a,o,l){return this.getBarycoord(t,e,n,r,cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,cn.x),l.addScaledVector(a,cn.y),l.addScaledVector(o,cn.z),l)}static isFrontFacing(t,e,n,r){return Ge.subVectors(n,e),ln.subVectors(t,e),Ge.cross(ln).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ge.subVectors(this.c,this.b),ln.subVectors(this.a,this.b),Ge.cross(ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return Je.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return Je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let a,o;vi.subVectors(r,n),xi.subVectors(s,n),ks.subVectors(t,n);const l=vi.dot(ks),c=xi.dot(ks);if(l<=0&&c<=0)return e.copy(n);Gs.subVectors(t,r);const d=vi.dot(Gs),f=xi.dot(Gs);if(d>=0&&f<=d)return e.copy(r);const p=l*f-d*c;if(p<=0&&l>=0&&d<=0)return a=l/(l-d),e.copy(n).addScaledVector(vi,a);Vs.subVectors(t,s);const m=vi.dot(Vs),g=xi.dot(Vs);if(g>=0&&m<=g)return e.copy(s);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(xi,o);const h=d*g-m*f;if(h<=0&&f-d>=0&&m-g>=0)return Vo.subVectors(s,r),o=(f-d)/(f-d+(m-g)),e.copy(r).addScaledVector(Vo,o);const u=1/(h+_+p);return a=_*u,o=p*u,e.copy(n).addScaledVector(vi,a).addScaledVector(xi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const nc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},En={h:0,s:0,l:0},Rr={h:0,s:0,l:0};function Ws(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class _t{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=Xt.workingColorSpace){if(t=eu(t,1),e=Me(e,0,1),n=Me(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Ws(a,s,t+1/3),this.g=Ws(a,s,t),this.b=Ws(a,s,t-1/3)}return Xt.toWorkingColorSpace(this,r),this}setStyle(t,e=Ze){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ze){const n=nc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Li(t.r),this.g=Li(t.g),this.b=Li(t.b),this}copyLinearToSRGB(t){return this.r=Ls(t.r),this.g=Ls(t.g),this.b=Ls(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return Xt.fromWorkingColorSpace(pe.copy(this),t),Math.round(Me(pe.r*255,0,255))*65536+Math.round(Me(pe.g*255,0,255))*256+Math.round(Me(pe.b*255,0,255))}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.fromWorkingColorSpace(pe.copy(this),e);const n=pe.r,r=pe.g,s=pe.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=d<=.5?f/(a+o):f/(2-a-o),a){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,e=Xt.workingColorSpace){return Xt.fromWorkingColorSpace(pe.copy(this),e),t.r=pe.r,t.g=pe.g,t.b=pe.b,t}getStyle(t=Ze){Xt.fromWorkingColorSpace(pe.copy(this),t);const e=pe.r,n=pe.g,r=pe.b;return t!==Ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(En),this.setHSL(En.h+t,En.s+e,En.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(En),t.getHSL(Rr);const n=Rs(En.h,Rr.h,e),r=Rs(En.s,Rr.s,e),s=Rs(En.l,Rr.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const pe=new _t;_t.NAMES=nc;let _u=0;class Wi extends Vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_u++}),this.uuid=cr(),this.name="",this.type="Material",this.blending=Dn,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oa,this.blendDst=la,this.blendEquation=Zn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _t(0,0,0),this.blendAlpha=0,this.depthFunc=jr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ro,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=di,this.stencilZFail=di,this.stencilZPass=di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Dn&&(n.blending=this.blending),this.side!==Fn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oa&&(n.blendSrc=this.blendSrc),this.blendDst!==la&&(n.blendDst=this.blendDst),this.blendEquation!==Zn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==jr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ro&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ra extends Wi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=Gl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ne=new L,Pr=new zt;class en{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Po,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Jl("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Pr.fromBufferAttribute(this,e),Pr.applyMatrix3(t),this.setXY(e,Pr.x,Pr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ne.fromBufferAttribute(this,e),ne.applyMatrix3(t),this.setXYZ(e,ne.x,ne.y,ne.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ne.fromBufferAttribute(this,e),ne.applyMatrix4(t),this.setXYZ(e,ne.x,ne.y,ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ne.fromBufferAttribute(this,e),ne.applyNormalMatrix(t),this.setXYZ(e,ne.x,ne.y,ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ne.fromBufferAttribute(this,e),ne.transformDirection(t),this.setXYZ(e,ne.x,ne.y,ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ji(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ve(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ji(e,this.array)),e}setX(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ji(e,this.array)),e}setY(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ji(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ji(e,this.array)),e}setW(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ve(e,this.array),n=ve(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=ve(e,this.array),n=ve(n,this.array),r=ve(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=ve(e,this.array),n=ve(n,this.array),r=ve(r,this.array),s=ve(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Po&&(t.usage=this.usage),t}}class ic extends en{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class rc extends en{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ee extends en{constructor(t,e,n){super(new Float32Array(t),e,n)}}let vu=0;const De=new Kt,Xs=new se,Mi=new L,be=new ur,nr=new ur,de=new L;class $e extends Vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=cr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(jl(t)?rc:ic)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new wt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return De.makeRotationFromQuaternion(t),this.applyMatrix4(De),this}rotateX(t){return De.makeRotationX(t),this.applyMatrix4(De),this}rotateY(t){return De.makeRotationY(t),this.applyMatrix4(De),this}rotateZ(t){return De.makeRotationZ(t),this.applyMatrix4(De),this}translate(t,e,n){return De.makeTranslation(t,e,n),this.applyMatrix4(De),this}scale(t,e,n){return De.makeScale(t,e,n),this.applyMatrix4(De),this}lookAt(t){return Xs.lookAt(t),Xs.updateMatrix(),this.applyMatrix4(Xs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mi).negate(),this.translate(Mi.x,Mi.y,Mi.z),this}setFromPoints(t){const e=[];for(let n=0,r=t.length;n<r;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Ee(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ur);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];be.setFromBufferAttribute(s),this.morphTargetsRelative?(de.addVectors(this.boundingBox.min,be.min),this.boundingBox.expandByPoint(de),de.addVectors(this.boundingBox.max,be.max),this.boundingBox.expandByPoint(de)):(this.boundingBox.expandByPoint(be.min),this.boundingBox.expandByPoint(be.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(be.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];nr.setFromBufferAttribute(o),this.morphTargetsRelative?(de.addVectors(be.min,nr.min),be.expandByPoint(de),de.addVectors(be.max,nr.max),be.expandByPoint(de)):(be.expandByPoint(nr.min),be.expandByPoint(nr.max))}be.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)de.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(de));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)de.fromBufferAttribute(o,c),l&&(Mi.fromBufferAttribute(t,c),de.add(Mi)),r=Math.max(r,n.distanceToSquared(de))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new en(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new L,l[I]=new L;const c=new L,d=new L,f=new L,p=new zt,m=new zt,g=new zt,_=new L,h=new L;function u(I,v,x){c.fromBufferAttribute(n,I),d.fromBufferAttribute(n,v),f.fromBufferAttribute(n,x),p.fromBufferAttribute(s,I),m.fromBufferAttribute(s,v),g.fromBufferAttribute(s,x),d.sub(c),f.sub(c),m.sub(p),g.sub(p);const b=1/(m.x*g.y-g.x*m.y);isFinite(b)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(f,-m.y).multiplyScalar(b),h.copy(f).multiplyScalar(m.x).addScaledVector(d,-g.x).multiplyScalar(b),o[I].add(_),o[v].add(_),o[x].add(_),l[I].add(h),l[v].add(h),l[x].add(h))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let I=0,v=E.length;I<v;++I){const x=E[I],b=x.start,z=x.count;for(let F=b,X=b+z;F<X;F+=3)u(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const y=new L,T=new L,B=new L,R=new L;function w(I){B.fromBufferAttribute(r,I),R.copy(B);const v=o[I];y.copy(v),y.sub(B.multiplyScalar(B.dot(v))).normalize(),T.crossVectors(R,v);const b=T.dot(l[I])<0?-1:1;a.setXYZW(I,y.x,y.y,y.z,b)}for(let I=0,v=E.length;I<v;++I){const x=E[I],b=x.start,z=x.count;for(let F=b,X=b+z;F<X;F+=3)w(t.getX(F+0)),w(t.getX(F+1)),w(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new en(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const r=new L,s=new L,a=new L,o=new L,l=new L,c=new L,d=new L,f=new L;if(t)for(let p=0,m=t.count;p<m;p+=3){const g=t.getX(p+0),_=t.getX(p+1),h=t.getX(p+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,h),d.subVectors(a,s),f.subVectors(r,s),d.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,h),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(h,c.x,c.y,c.z)}else for(let p=0,m=e.count;p<m;p+=3)r.fromBufferAttribute(e,p+0),s.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),d.subVectors(a,s),f.subVectors(r,s),d.cross(f),n.setXYZ(p+0,d.x,d.y,d.z),n.setXYZ(p+1,d.x,d.y,d.z),n.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)de.fromBufferAttribute(t,e),de.normalize(),t.setXYZ(e,de.x,de.y,de.z)}toNonIndexed(){function t(o,l){const c=o.array,d=o.itemSize,f=o.normalized,p=new c.constructor(l.length*d);let m=0,g=0;for(let _=0,h=l.length;_<h;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*d;for(let u=0;u<d;u++)p[g++]=c[m++]}return new en(p,d,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new $e,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=t(l,n);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,f=c.length;d<f;d++){const p=c[d],m=t(p,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let f=0,p=c.length;f<p;f++){const m=c[f];d.push(m.toJSON(t.data))}d.length>0&&(r[l]=d,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(e))}const s=t.morphAttributes;for(const c in s){const d=[],f=s[c];for(let p=0,m=f.length;p<m;p++)d.push(f[p].clone(e));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,d=a.length;c<d;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wo=new Kt,Wn=new Ca,Lr=new hr,Xo=new L,Si=new L,yi=new L,Ei=new L,$s=new L,Dr=new L,Ir=new zt,Ur=new zt,Nr=new zt,$o=new L,qo=new L,Yo=new L,Fr=new L,Or=new L;class ze extends se{constructor(t=new $e,e=new Ra){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){Dr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],f=s[l];d!==0&&($s.fromBufferAttribute(f,t),a?Dr.addScaledVector($s,d):Dr.addScaledVector($s.sub(e),d))}e.add(Dr)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Lr.copy(n.boundingSphere),Lr.applyMatrix4(s),Wn.copy(t.ray).recast(t.near),!(Lr.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere(Lr,Xo)===null||Wn.origin.distanceToSquared(Xo)>(t.far-t.near)**2))&&(Wo.copy(s).invert(),Wn.copy(t.ray).applyMatrix4(Wo),!(n.boundingBox!==null&&Wn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Wn)))}_computeIntersections(t,e,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,f=s.attributes.normal,p=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=p.length;g<_;g++){const h=p[g],u=a[h.materialIndex],E=Math.max(h.start,m.start),y=Math.min(o.count,Math.min(h.start+h.count,m.start+m.count));for(let T=E,B=y;T<B;T+=3){const R=o.getX(T),w=o.getX(T+1),I=o.getX(T+2);r=Br(this,u,t,n,c,d,f,R,w,I),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=h.materialIndex,e.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let h=g,u=_;h<u;h+=3){const E=o.getX(h),y=o.getX(h+1),T=o.getX(h+2);r=Br(this,a,t,n,c,d,f,E,y,T),r&&(r.faceIndex=Math.floor(h/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=p.length;g<_;g++){const h=p[g],u=a[h.materialIndex],E=Math.max(h.start,m.start),y=Math.min(l.count,Math.min(h.start+h.count,m.start+m.count));for(let T=E,B=y;T<B;T+=3){const R=T,w=T+1,I=T+2;r=Br(this,u,t,n,c,d,f,R,w,I),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=h.materialIndex,e.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let h=g,u=_;h<u;h+=3){const E=h,y=h+1,T=h+2;r=Br(this,a,t,n,c,d,f,E,y,T),r&&(r.faceIndex=Math.floor(h/3),e.push(r))}}}}function xu(i,t,e,n,r,s,a,o){let l;if(t.side===ye?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,t.side===Fn,o),l===null)return null;Or.copy(o),Or.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Or);return c<e.near||c>e.far?null:{distance:c,point:Or.clone(),object:i}}function Br(i,t,e,n,r,s,a,o,l,c){i.getVertexPosition(o,Si),i.getVertexPosition(l,yi),i.getVertexPosition(c,Ei);const d=xu(i,t,e,n,Si,yi,Ei,Fr);if(d){r&&(Ir.fromBufferAttribute(r,o),Ur.fromBufferAttribute(r,l),Nr.fromBufferAttribute(r,c),d.uv=Je.getInterpolation(Fr,Si,yi,Ei,Ir,Ur,Nr,new zt)),s&&(Ir.fromBufferAttribute(s,o),Ur.fromBufferAttribute(s,l),Nr.fromBufferAttribute(s,c),d.uv1=Je.getInterpolation(Fr,Si,yi,Ei,Ir,Ur,Nr,new zt)),a&&($o.fromBufferAttribute(a,o),qo.fromBufferAttribute(a,l),Yo.fromBufferAttribute(a,c),d.normal=Je.getInterpolation(Fr,Si,yi,Ei,$o,qo,Yo,new L),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new L,materialIndex:0};Je.getNormal(Si,yi,Ei,f.normal),d.face=f}return d}class fr extends $e{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],f=[];let p=0,m=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,r,a,2),g("x","z","y",1,-1,t,n,-e,r,a,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Ee(c,3)),this.setAttribute("normal",new Ee(d,3)),this.setAttribute("uv",new Ee(f,2));function g(_,h,u,E,y,T,B,R,w,I,v){const x=T/w,b=B/I,z=T/2,F=B/2,X=R/2,$=w+1,W=I+1;let Y=0,k=0;const dt=new L;for(let ct=0;ct<W;ct++){const ut=ct*b-F;for(let It=0;It<$;It++){const Gt=It*x-z;dt[_]=Gt*E,dt[h]=ut*y,dt[u]=X,c.push(dt.x,dt.y,dt.z),dt[_]=0,dt[h]=0,dt[u]=R>0?1:-1,d.push(dt.x,dt.y,dt.z),f.push(It/w),f.push(1-ct/I),Y+=1}}for(let ct=0;ct<I;ct++)for(let ut=0;ut<w;ut++){const It=p+ut+$*ct,Gt=p+ut+$*(ct+1),G=p+(ut+1)+$*(ct+1),J=p+(ut+1)+$*ct;l.push(It,Gt,J),l.push(Gt,G,J),k+=6}o.addGroup(m,k,v),m+=k,p+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ki(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function ge(i){const t={};for(let e=0;e<i.length;e++){const n=ki(i[e]);for(const r in n)t[r]=n[r]}return t}function Mu(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function sc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const Su={clone:ki,merge:ge};var yu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Eu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xe extends Wi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yu,this.fragmentShader=Eu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ki(t.uniforms),this.uniformsGroups=Mu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class ac extends se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=fn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Tn=new L,Ko=new zt,Zo=new zt;class Fe extends ac{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=fa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Cs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return fa*2*Math.atan(Math.tan(Cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Tn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Tn.x,Tn.y).multiplyScalar(-t/Tn.z),Tn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Tn.x,Tn.y).multiplyScalar(-t/Tn.z)}getViewSize(t,e){return this.getViewBounds(t,Ko,Zo),e.subVectors(Zo,Ko)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Cs*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ti=-90,Ai=1;class Tu extends se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Fe(Ti,Ai,t,e);r.layers=this.layers,this.add(r);const s=new Fe(Ti,Ai,t,e);s.layers=this.layers,this.add(s);const a=new Fe(Ti,Ai,t,e);a.layers=this.layers,this.add(a);const o=new Fe(Ti,Ai,t,e);o.layers=this.layers,this.add(o);const l=new Fe(Ti,Ai,t,e);l.layers=this.layers,this.add(l);const c=new Fe(Ti,Ai,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===fn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ns)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,f=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,a),t.setRenderTarget(n,2,r),t.render(e,o),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,d),t.setRenderTarget(f,p,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class oc extends _e{constructor(t,e,n,r,s,a,o,l,c,d){t=t!==void 0?t:[],e=e!==void 0?e:Fi,super(t,e,n,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Au extends ni{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new oc(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Re}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new fr(5,5,5),s=new Xe({name:"CubemapFromEquirect",uniforms:ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ye,blending:pn});s.uniforms.tEquirect.value=e;const a=new ze(r,s),o=e.minFilter;return e.minFilter===ti&&(e.minFilter=Re),new Tu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}}const qs=new L,bu=new L,wu=new wt;class Yn{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=qs.subVectors(n,e).cross(bu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(qs),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||wu.getNormalMatrix(t),r=this.coplanarPoint(qs).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xn=new hr,zr=new L;class Pa{constructor(t=new Yn,e=new Yn,n=new Yn,r=new Yn,s=new Yn,a=new Yn){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=fn){const n=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],d=r[5],f=r[6],p=r[7],m=r[8],g=r[9],_=r[10],h=r[11],u=r[12],E=r[13],y=r[14],T=r[15];if(n[0].setComponents(l-s,p-c,h-m,T-u).normalize(),n[1].setComponents(l+s,p+c,h+m,T+u).normalize(),n[2].setComponents(l+a,p+d,h+g,T+E).normalize(),n[3].setComponents(l-a,p-d,h-g,T-E).normalize(),n[4].setComponents(l-o,p-f,h-_,T-y).normalize(),e===fn)n[5].setComponents(l+o,p+f,h+_,T+y).normalize();else if(e===ns)n[5].setComponents(o,f,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(t){return Xn.center.set(0,0,0),Xn.radius=.7071067811865476,Xn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(zr.x=r.normal.x>0?t.max.x:t.min.x,zr.y=r.normal.y>0?t.max.y:t.min.y,zr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(zr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function lc(){let i=null,t=!1,e=null,n=null;function r(s,a){e(s,a),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Cu(i){const t=new WeakMap;function e(o,l){const c=o.array,d=o.usage,f=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,d),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const d=l.array,f=l._updateRange,p=l.updateRanges;if(i.bindBuffer(c,o),f.count===-1&&p.length===0&&i.bufferSubData(c,0,d),p.length!==0){for(let m=0,g=p.length;m<g;m++){const _=p[m];i.bufferSubData(c,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}l.clearUpdateRanges()}f.count!==-1&&(i.bufferSubData(c,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count),f.count=-1),l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class ci extends $e{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(r),c=o+1,d=l+1,f=t/o,p=e/l,m=[],g=[],_=[],h=[];for(let u=0;u<d;u++){const E=u*p-a;for(let y=0;y<c;y++){const T=y*f-s;g.push(T,-E,0),_.push(0,0,1),h.push(y/o),h.push(1-u/l)}}for(let u=0;u<l;u++)for(let E=0;E<o;E++){const y=E+c*u,T=E+c*(u+1),B=E+1+c*(u+1),R=E+1+c*u;m.push(y,T,R),m.push(T,B,R)}this.setIndex(m),this.setAttribute("position",new Ee(g,3)),this.setAttribute("normal",new Ee(_,3)),this.setAttribute("uv",new Ee(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ci(t.width,t.height,t.widthSegments,t.heightSegments)}}var Ru=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Lu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Du=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Iu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Uu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Fu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ou=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Bu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,zu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ku=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Vu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Xu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$u=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ku=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ju=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ju=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,th=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,eh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ih=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sh="gl_FragColor = linearToOutputTexel( gl_FragColor );",ah=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,oh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,lh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ch=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,dh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,uh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ph=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_h=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Sh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Eh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Th=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ah=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,wh=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ch=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ph=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lh=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dh=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ih=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Uh=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Oh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Bh=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gh=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wh=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Xh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$h=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,qh=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Yh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,jh=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ef=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,sf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,af=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,of=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,df=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,hf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ff=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,pf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,mf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,_f=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ef=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Tf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Af=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Cf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Df=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,If=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ff=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Of=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Bf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Wf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$f=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Yf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Zf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,np=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ip=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,rp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ap=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,op=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,bt={alphahash_fragment:Ru,alphahash_pars_fragment:Pu,alphamap_fragment:Lu,alphamap_pars_fragment:Du,alphatest_fragment:Iu,alphatest_pars_fragment:Uu,aomap_fragment:Nu,aomap_pars_fragment:Fu,batching_pars_vertex:Ou,batching_vertex:Bu,begin_vertex:zu,beginnormal_vertex:Hu,bsdfs:ku,iridescence_fragment:Gu,bumpmap_pars_fragment:Vu,clipping_planes_fragment:Wu,clipping_planes_pars_fragment:Xu,clipping_planes_pars_vertex:$u,clipping_planes_vertex:qu,color_fragment:Yu,color_pars_fragment:Ku,color_pars_vertex:Zu,color_vertex:ju,common:Ju,cube_uv_reflection_fragment:Qu,defaultnormal_vertex:th,displacementmap_pars_vertex:eh,displacementmap_vertex:nh,emissivemap_fragment:ih,emissivemap_pars_fragment:rh,colorspace_fragment:sh,colorspace_pars_fragment:ah,envmap_fragment:oh,envmap_common_pars_fragment:lh,envmap_pars_fragment:ch,envmap_pars_vertex:dh,envmap_physical_pars_fragment:Sh,envmap_vertex:uh,fog_vertex:hh,fog_pars_vertex:fh,fog_fragment:ph,fog_pars_fragment:mh,gradientmap_pars_fragment:gh,lightmap_pars_fragment:_h,lights_lambert_fragment:vh,lights_lambert_pars_fragment:xh,lights_pars_begin:Mh,lights_toon_fragment:yh,lights_toon_pars_fragment:Eh,lights_phong_fragment:Th,lights_phong_pars_fragment:Ah,lights_physical_fragment:bh,lights_physical_pars_fragment:wh,lights_fragment_begin:Ch,lights_fragment_maps:Rh,lights_fragment_end:Ph,logdepthbuf_fragment:Lh,logdepthbuf_pars_fragment:Dh,logdepthbuf_pars_vertex:Ih,logdepthbuf_vertex:Uh,map_fragment:Nh,map_pars_fragment:Fh,map_particle_fragment:Oh,map_particle_pars_fragment:Bh,metalnessmap_fragment:zh,metalnessmap_pars_fragment:Hh,morphinstance_vertex:kh,morphcolor_vertex:Gh,morphnormal_vertex:Vh,morphtarget_pars_vertex:Wh,morphtarget_vertex:Xh,normal_fragment_begin:$h,normal_fragment_maps:qh,normal_pars_fragment:Yh,normal_pars_vertex:Kh,normal_vertex:Zh,normalmap_pars_fragment:jh,clearcoat_normal_fragment_begin:Jh,clearcoat_normal_fragment_maps:Qh,clearcoat_pars_fragment:tf,iridescence_pars_fragment:ef,opaque_fragment:nf,packing:rf,premultiplied_alpha_fragment:sf,project_vertex:af,dithering_fragment:of,dithering_pars_fragment:lf,roughnessmap_fragment:cf,roughnessmap_pars_fragment:df,shadowmap_pars_fragment:uf,shadowmap_pars_vertex:hf,shadowmap_vertex:ff,shadowmask_pars_fragment:pf,skinbase_vertex:mf,skinning_pars_vertex:gf,skinning_vertex:_f,skinnormal_vertex:vf,specularmap_fragment:xf,specularmap_pars_fragment:Mf,tonemapping_fragment:Sf,tonemapping_pars_fragment:yf,transmission_fragment:Ef,transmission_pars_fragment:Tf,uv_pars_fragment:Af,uv_pars_vertex:bf,uv_vertex:wf,worldpos_vertex:Cf,background_vert:Rf,background_frag:Pf,backgroundCube_vert:Lf,backgroundCube_frag:Df,cube_vert:If,cube_frag:Uf,depth_vert:Nf,depth_frag:Ff,distanceRGBA_vert:Of,distanceRGBA_frag:Bf,equirect_vert:zf,equirect_frag:Hf,linedashed_vert:kf,linedashed_frag:Gf,meshbasic_vert:Vf,meshbasic_frag:Wf,meshlambert_vert:Xf,meshlambert_frag:$f,meshmatcap_vert:qf,meshmatcap_frag:Yf,meshnormal_vert:Kf,meshnormal_frag:Zf,meshphong_vert:jf,meshphong_frag:Jf,meshphysical_vert:Qf,meshphysical_frag:tp,meshtoon_vert:ep,meshtoon_frag:np,points_vert:ip,points_frag:rp,shadow_vert:sp,shadow_frag:ap,sprite_vert:op,sprite_frag:lp},nt={common:{diffuse:{value:new _t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new wt},alphaMap:{value:null},alphaMapTransform:{value:new wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new wt}},envmap:{envMap:{value:null},envMapRotation:{value:new wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new wt},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new _t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new wt},alphaTest:{value:0},uvTransform:{value:new wt}},sprite:{diffuse:{value:new _t(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new wt},alphaMap:{value:null},alphaMapTransform:{value:new wt},alphaTest:{value:0}}},je={basic:{uniforms:ge([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:bt.meshbasic_vert,fragmentShader:bt.meshbasic_frag},lambert:{uniforms:ge([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new _t(0)}}]),vertexShader:bt.meshlambert_vert,fragmentShader:bt.meshlambert_frag},phong:{uniforms:ge([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new _t(0)},specular:{value:new _t(1118481)},shininess:{value:30}}]),vertexShader:bt.meshphong_vert,fragmentShader:bt.meshphong_frag},standard:{uniforms:ge([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new _t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag},toon:{uniforms:ge([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new _t(0)}}]),vertexShader:bt.meshtoon_vert,fragmentShader:bt.meshtoon_frag},matcap:{uniforms:ge([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:bt.meshmatcap_vert,fragmentShader:bt.meshmatcap_frag},points:{uniforms:ge([nt.points,nt.fog]),vertexShader:bt.points_vert,fragmentShader:bt.points_frag},dashed:{uniforms:ge([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:bt.linedashed_vert,fragmentShader:bt.linedashed_frag},depth:{uniforms:ge([nt.common,nt.displacementmap]),vertexShader:bt.depth_vert,fragmentShader:bt.depth_frag},normal:{uniforms:ge([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:bt.meshnormal_vert,fragmentShader:bt.meshnormal_frag},sprite:{uniforms:ge([nt.sprite,nt.fog]),vertexShader:bt.sprite_vert,fragmentShader:bt.sprite_frag},background:{uniforms:{uvTransform:{value:new wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:bt.background_vert,fragmentShader:bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new wt}},vertexShader:bt.backgroundCube_vert,fragmentShader:bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:bt.cube_vert,fragmentShader:bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:bt.equirect_vert,fragmentShader:bt.equirect_frag},distanceRGBA:{uniforms:ge([nt.common,nt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:bt.distanceRGBA_vert,fragmentShader:bt.distanceRGBA_frag},shadow:{uniforms:ge([nt.lights,nt.fog,{color:{value:new _t(0)},opacity:{value:1}}]),vertexShader:bt.shadow_vert,fragmentShader:bt.shadow_frag}};je.physical={uniforms:ge([je.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new wt},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new wt},sheen:{value:0},sheenColor:{value:new _t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new wt},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new wt},attenuationDistance:{value:0},attenuationColor:{value:new _t(0)},specularColor:{value:new _t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new wt},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new wt}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag};const Hr={r:0,b:0,g:0},$n=new gn,cp=new Kt;function dp(i,t,e,n,r,s,a){const o=new _t(0);let l=s===!0?0:1,c,d,f=null,p=0,m=null;function g(E){let y=E.isScene===!0?E.background:null;return y&&y.isTexture&&(y=(E.backgroundBlurriness>0?e:t).get(y)),y}function _(E){let y=!1;const T=g(E);T===null?u(o,l):T&&T.isColor&&(u(T,1),y=!0);const B=i.xr.getEnvironmentBlendMode();B==="additive"?n.buffers.color.setClear(0,0,0,1,a):B==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function h(E,y){const T=g(y);T&&(T.isCubeTexture||T.mapping===cs)?(d===void 0&&(d=new ze(new fr(1,1,1),new Xe({name:"BackgroundCubeMaterial",uniforms:ki(je.backgroundCube.uniforms),vertexShader:je.backgroundCube.vertexShader,fragmentShader:je.backgroundCube.fragmentShader,side:ye,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(B,R,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),$n.copy(y.backgroundRotation),$n.x*=-1,$n.y*=-1,$n.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&($n.y*=-1,$n.z*=-1),d.material.uniforms.envMap.value=T,d.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(cp.makeRotationFromEuler($n)),d.material.toneMapped=Xt.getTransfer(T.colorSpace)!==Yt,(f!==T||p!==T.version||m!==i.toneMapping)&&(d.material.needsUpdate=!0,f=T,p=T.version,m=i.toneMapping),d.layers.enableAll(),E.unshift(d,d.geometry,d.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new ze(new ci(2,2),new Xe({name:"BackgroundMaterial",uniforms:ki(je.background.uniforms),vertexShader:je.background.vertexShader,fragmentShader:je.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(T.colorSpace)!==Yt,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(f!==T||p!==T.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,f=T,p=T.version,m=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function u(E,y){E.getRGB(Hr,sc(i)),n.buffers.color.setClear(Hr.r,Hr.g,Hr.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(E,y=1){o.set(E),l=y,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,u(o,l)},render:_,addToRenderList:h}}function up(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=p(null);let s=r,a=!1;function o(x,b,z,F,X){let $=!1;const W=f(F,z,b);s!==W&&(s=W,c(s.object)),$=m(x,F,z,X),$&&g(x,F,z,X),X!==null&&t.update(X,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,T(x,b,z,F),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function d(x){return i.deleteVertexArray(x)}function f(x,b,z){const F=z.wireframe===!0;let X=n[x.id];X===void 0&&(X={},n[x.id]=X);let $=X[b.id];$===void 0&&($={},X[b.id]=$);let W=$[F];return W===void 0&&(W=p(l()),$[F]=W),W}function p(x){const b=[],z=[],F=[];for(let X=0;X<e;X++)b[X]=0,z[X]=0,F[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:z,attributeDivisors:F,object:x,attributes:{},index:null}}function m(x,b,z,F){const X=s.attributes,$=b.attributes;let W=0;const Y=z.getAttributes();for(const k in Y)if(Y[k].location>=0){const ct=X[k];let ut=$[k];if(ut===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(ut=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(ut=x.instanceColor)),ct===void 0||ct.attribute!==ut||ut&&ct.data!==ut.data)return!0;W++}return s.attributesNum!==W||s.index!==F}function g(x,b,z,F){const X={},$=b.attributes;let W=0;const Y=z.getAttributes();for(const k in Y)if(Y[k].location>=0){let ct=$[k];ct===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(ct=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(ct=x.instanceColor));const ut={};ut.attribute=ct,ct&&ct.data&&(ut.data=ct.data),X[k]=ut,W++}s.attributes=X,s.attributesNum=W,s.index=F}function _(){const x=s.newAttributes;for(let b=0,z=x.length;b<z;b++)x[b]=0}function h(x){u(x,0)}function u(x,b){const z=s.newAttributes,F=s.enabledAttributes,X=s.attributeDivisors;z[x]=1,F[x]===0&&(i.enableVertexAttribArray(x),F[x]=1),X[x]!==b&&(i.vertexAttribDivisor(x,b),X[x]=b)}function E(){const x=s.newAttributes,b=s.enabledAttributes;for(let z=0,F=b.length;z<F;z++)b[z]!==x[z]&&(i.disableVertexAttribArray(z),b[z]=0)}function y(x,b,z,F,X,$,W){W===!0?i.vertexAttribIPointer(x,b,z,X,$):i.vertexAttribPointer(x,b,z,F,X,$)}function T(x,b,z,F){_();const X=F.attributes,$=z.getAttributes(),W=b.defaultAttributeValues;for(const Y in $){const k=$[Y];if(k.location>=0){let dt=X[Y];if(dt===void 0&&(Y==="instanceMatrix"&&x.instanceMatrix&&(dt=x.instanceMatrix),Y==="instanceColor"&&x.instanceColor&&(dt=x.instanceColor)),dt!==void 0){const ct=dt.normalized,ut=dt.itemSize,It=t.get(dt);if(It===void 0)continue;const Gt=It.buffer,G=It.type,J=It.bytesPerElement,ht=G===i.INT||G===i.UNSIGNED_INT||dt.gpuType===Wl;if(dt.isInterleavedBufferAttribute){const st=dt.data,Lt=st.stride,Ct=dt.offset;if(st.isInstancedInterleavedBuffer){for(let Bt=0;Bt<k.locationSize;Bt++)u(k.location+Bt,st.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Bt=0;Bt<k.locationSize;Bt++)h(k.location+Bt);i.bindBuffer(i.ARRAY_BUFFER,Gt);for(let Bt=0;Bt<k.locationSize;Bt++)y(k.location+Bt,ut/k.locationSize,G,ct,Lt*J,(Ct+ut/k.locationSize*Bt)*J,ht)}else{if(dt.isInstancedBufferAttribute){for(let st=0;st<k.locationSize;st++)u(k.location+st,dt.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let st=0;st<k.locationSize;st++)h(k.location+st);i.bindBuffer(i.ARRAY_BUFFER,Gt);for(let st=0;st<k.locationSize;st++)y(k.location+st,ut/k.locationSize,G,ct,ut*J,ut/k.locationSize*st*J,ht)}}else if(W!==void 0){const ct=W[Y];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(k.location,ct);break;case 3:i.vertexAttrib3fv(k.location,ct);break;case 4:i.vertexAttrib4fv(k.location,ct);break;default:i.vertexAttrib1fv(k.location,ct)}}}}E()}function B(){I();for(const x in n){const b=n[x];for(const z in b){const F=b[z];for(const X in F)d(F[X].object),delete F[X];delete b[z]}delete n[x]}}function R(x){if(n[x.id]===void 0)return;const b=n[x.id];for(const z in b){const F=b[z];for(const X in F)d(F[X].object),delete F[X];delete b[z]}delete n[x.id]}function w(x){for(const b in n){const z=n[b];if(z[x.id]===void 0)continue;const F=z[x.id];for(const X in F)d(F[X].object),delete F[X];delete z[x.id]}}function I(){v(),a=!0,s!==r&&(s=r,c(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:v,dispose:B,releaseStatesOfGeometry:R,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:h,disableUnusedAttributes:E}}function hp(i,t,e){let n;function r(c){n=c}function s(c,d){i.drawArrays(n,c,d),e.update(d,n,1)}function a(c,d,f){f!==0&&(i.drawArraysInstanced(n,c,d,f),e.update(d,n,f))}function o(c,d,f){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f;m++)this.render(c[m],d[m]);else{p.multiDrawArraysWEBGL(n,c,0,d,0,f);let m=0;for(let g=0;g<f;g++)m+=d[g];e.update(m,n,1)}}function l(c,d,f,p){if(f===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)a(c[g],d[g],p[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,d,0,p,0,f);let g=0;for(let _=0;_<f;_++)g+=d[_];for(let _=0;_<p.length;_++)e.update(g,n,p[_])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function fp(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==Qe&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const w=R===ds&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==On&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Cn&&!w)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const f=e.logarithmicDepthBuffer===!0,p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),u=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,B=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:_,maxAttributes:h,maxVertexUniforms:u,maxVaryings:E,maxFragmentUniforms:y,vertexTextures:T,maxSamples:B}}function pp(i){const t=this;let e=null,n=0,r=!1,s=!1;const a=new Yn,o=new wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const m=f.length!==0||p||n!==0||r;return r=p,n=f.length,m},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,p){e=d(f,p,0)},this.setState=function(f,p,m){const g=f.clippingPlanes,_=f.clipIntersection,h=f.clipShadows,u=i.get(f);if(!r||g===null||g.length===0||s&&!h)s?d(null):c();else{const E=s?0:n,y=E*4;let T=u.clippingState||null;l.value=T,T=d(g,p,y,m);for(let B=0;B!==y;++B)T[B]=e[B];u.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(f,p,m,g){const _=f!==null?f.length:0;let h=null;if(_!==0){if(h=l.value,g!==!0||h===null){const u=m+_*4,E=p.matrixWorldInverse;o.getNormalMatrix(E),(h===null||h.length<u)&&(h=new Float32Array(u));for(let y=0,T=m;y!==_;++y,T+=4)a.copy(f[y]).applyMatrix4(E,o),a.normal.toArray(h,T),h[T+3]=a.constant}l.value=h,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,h}}function mp(i){let t=new WeakMap;function e(a,o){return o===ca?a.mapping=Fi:o===da&&(a.mapping=Oi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ca||o===da)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Au(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",r),e(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class La extends ac{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ci=4,jo=[.125,.215,.35,.446,.526,.582],jn=20,Ys=new La,Jo=new _t;let Ks=null,Zs=0,js=0,Js=!1;const Kn=(1+Math.sqrt(5))/2,bi=1/Kn,Qo=[new L(-Kn,bi,0),new L(Kn,bi,0),new L(-bi,0,Kn),new L(bi,0,Kn),new L(0,Kn,-bi),new L(0,Kn,bi),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class tl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){Ks=this._renderer.getRenderTarget(),Zs=this._renderer.getActiveCubeFace(),js=this._renderer.getActiveMipmapLevel(),Js=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=il(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ks,Zs,js),this._renderer.xr.enabled=Js,t.scissorTest=!1,kr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Fi||t.mapping===Oi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ks=this._renderer.getRenderTarget(),Zs=this._renderer.getActiveCubeFace(),js=this._renderer.getActiveMipmapLevel(),Js=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Re,minFilter:Re,generateMipmaps:!1,type:ds,format:Qe,colorSpace:zn,depthBuffer:!1},r=el(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=el(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gp(s)),this._blurMaterial=_p(s,t,e)}return r}_compileMaterial(t){const e=new ze(this._lodPlanes[0],t);this._renderer.compile(e,Ys)}_sceneToCubeUV(t,e,n,r){const o=new Fe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(Jo),d.toneMapping=In,d.autoClear=!1;const m=new Ra({name:"PMREM.Background",side:ye,depthWrite:!1,depthTest:!1}),g=new ze(new fr,m);let _=!1;const h=t.background;h?h.isColor&&(m.color.copy(h),t.background=null,_=!0):(m.color.copy(Jo),_=!0);for(let u=0;u<6;u++){const E=u%3;E===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):E===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const y=this._cubeSize;kr(r,E*y,u>2?y:0,y,y),d.setRenderTarget(r),_&&d.render(g,o),d.render(t,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=p,d.autoClear=f,t.background=h}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===Fi||t.mapping===Oi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=il()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new ze(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;kr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ys)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Qo[(r-s-1)%Qo.length];this._blur(t,s-1,s,a,o)}e.autoClear=n}_blur(t,e,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,r,"latitudinal",s),this._halfBlur(a,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,f=new ze(this._lodPlanes[r],c),p=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*jn-1),_=s/g,h=isFinite(s)?1+Math.floor(d*_):jn;h>jn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${h} samples when the maximum is set to ${jn}`);const u=[];let E=0;for(let w=0;w<jn;++w){const I=w/_,v=Math.exp(-I*I/2);u.push(v),w===0?E+=v:w<h&&(E+=2*v)}for(let w=0;w<u.length;w++)u[w]=u[w]/E;p.envMap.value=t.texture,p.samples.value=h,p.weights.value=u,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:y}=this;p.dTheta.value=g,p.mipInt.value=y-n;const T=this._sizeLods[r],B=3*T*(r>y-Ci?r-y+Ci:0),R=4*(this._cubeSize-T);kr(e,B,R,3*T,2*T),l.setRenderTarget(e),l.render(f,Ys)}}function gp(i){const t=[],e=[],n=[];let r=i;const s=i-Ci+1+jo.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-Ci?l=jo[a-i+Ci-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,f=1+c,p=[d,d,f,d,f,f,d,d,f,f,d,f],m=6,g=6,_=3,h=2,u=1,E=new Float32Array(_*g*m),y=new Float32Array(h*g*m),T=new Float32Array(u*g*m);for(let R=0;R<m;R++){const w=R%3*2/3-1,I=R>2?0:-1,v=[w,I,0,w+2/3,I,0,w+2/3,I+1,0,w,I,0,w+2/3,I+1,0,w,I+1,0];E.set(v,_*g*R),y.set(p,h*g*R);const x=[R,R,R,R,R,R];T.set(x,u*g*R)}const B=new $e;B.setAttribute("position",new en(E,_)),B.setAttribute("uv",new en(y,h)),B.setAttribute("faceIndex",new en(T,u)),t.push(B),r>Ci&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function el(i,t,e){const n=new ni(i,t,e);return n.texture.mapping=cs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function kr(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function _p(i,t,e){const n=new Float32Array(jn),r=new L(0,1,0);return new Xe({name:"SphericalGaussianBlur",defines:{n:jn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function nl(){return new Xe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function il(){return new Xe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function Da(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function vp(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ca||l===da,d=l===Fi||l===Oi;if(c||d){let f=t.get(o);const p=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return e===null&&(e=new tl(i)),f=c?e.fromEquirectangular(o,f):e.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),f.texture;if(f!==void 0)return f.texture;{const m=o.image;return c&&m&&m.height>0||d&&m&&r(m)?(e===null&&(e=new tl(i)),f=c?e.fromEquirectangular(o):e.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),o.addEventListener("dispose",s),f.texture):null}}}return o}function r(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function xp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&Jl("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Mp(i,t,e,n){const r={},s=new WeakMap;function a(f){const p=f.target;p.index!==null&&t.remove(p.index);for(const g in p.attributes)t.remove(p.attributes[g]);for(const g in p.morphAttributes){const _=p.morphAttributes[g];for(let h=0,u=_.length;h<u;h++)t.remove(_[h])}p.removeEventListener("dispose",a),delete r[p.id];const m=s.get(p);m&&(t.remove(m),s.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(f,p){return r[p.id]===!0||(p.addEventListener("dispose",a),r[p.id]=!0,e.memory.geometries++),p}function l(f){const p=f.attributes;for(const g in p)t.update(p[g],i.ARRAY_BUFFER);const m=f.morphAttributes;for(const g in m){const _=m[g];for(let h=0,u=_.length;h<u;h++)t.update(_[h],i.ARRAY_BUFFER)}}function c(f){const p=[],m=f.index,g=f.attributes.position;let _=0;if(m!==null){const E=m.array;_=m.version;for(let y=0,T=E.length;y<T;y+=3){const B=E[y+0],R=E[y+1],w=E[y+2];p.push(B,R,R,w,w,B)}}else if(g!==void 0){const E=g.array;_=g.version;for(let y=0,T=E.length/3-1;y<T;y+=3){const B=y+0,R=y+1,w=y+2;p.push(B,R,R,w,w,B)}}else return;const h=new(jl(p)?rc:ic)(p,1);h.version=_;const u=s.get(f);u&&t.remove(u),s.set(f,h)}function d(f){const p=s.get(f);if(p){const m=f.index;m!==null&&p.version<m.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:d}}function Sp(i,t,e){let n;function r(p){n=p}let s,a;function o(p){s=p.type,a=p.bytesPerElement}function l(p,m){i.drawElements(n,m,s,p*a),e.update(m,n,1)}function c(p,m,g){g!==0&&(i.drawElementsInstanced(n,m,s,p*a,g),e.update(m,n,g))}function d(p,m,g){if(g===0)return;const _=t.get("WEBGL_multi_draw");if(_===null)for(let h=0;h<g;h++)this.render(p[h]/a,m[h]);else{_.multiDrawElementsWEBGL(n,m,0,s,p,0,g);let h=0;for(let u=0;u<g;u++)h+=m[u];e.update(h,n,1)}}function f(p,m,g,_){if(g===0)return;const h=t.get("WEBGL_multi_draw");if(h===null)for(let u=0;u<p.length;u++)c(p[u]/a,m[u],_[u]);else{h.multiDrawElementsInstancedWEBGL(n,m,0,s,p,0,_,0,g);let u=0;for(let E=0;E<g;E++)u+=m[E];for(let E=0;E<_.length;E++)e.update(u,n,_[E])}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=f}function yp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function Ep(i,t,e){const n=new WeakMap,r=new ue;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let p=n.get(o);if(p===void 0||p.count!==f){let x=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var m=x;p!==void 0&&p.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,h=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],E=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let T=0;g===!0&&(T=1),_===!0&&(T=2),h===!0&&(T=3);let B=o.attributes.position.count*T,R=1;B>t.maxTextureSize&&(R=Math.ceil(B/t.maxTextureSize),B=t.maxTextureSize);const w=new Float32Array(B*R*4*f),I=new tc(w,B,R,f);I.type=Cn,I.needsUpdate=!0;const v=T*4;for(let b=0;b<f;b++){const z=u[b],F=E[b],X=y[b],$=B*R*4*b;for(let W=0;W<z.count;W++){const Y=W*v;g===!0&&(r.fromBufferAttribute(z,W),w[$+Y+0]=r.x,w[$+Y+1]=r.y,w[$+Y+2]=r.z,w[$+Y+3]=0),_===!0&&(r.fromBufferAttribute(F,W),w[$+Y+4]=r.x,w[$+Y+5]=r.y,w[$+Y+6]=r.z,w[$+Y+7]=0),h===!0&&(r.fromBufferAttribute(X,W),w[$+Y+8]=r.x,w[$+Y+9]=r.y,w[$+Y+10]=r.z,w[$+Y+11]=X.itemSize===4?r.w:1)}}p={count:f,texture:I,size:new zt(B,R)},n.set(o,p),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let h=0;h<c.length;h++)g+=c[h];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:s}}function Tp(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,d=l.geometry,f=t.get(l,d);if(r.get(f)!==c&&(t.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==c&&(p.update(),r.set(p,c))}return f}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}class cc extends _e{constructor(t,e,n,r,s,a,o,l,c,d=Pi){if(d!==Pi&&d!==Hi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Pi&&(n=Bi),n===void 0&&d===Hi&&(n=zi),super(null,r,s,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Be,this.minFilter=l!==void 0?l:Be,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const dc=new _e,uc=new cc(1,1);uc.compareFunction=Zl;const hc=new tc,fc=new cu,pc=new oc,rl=[],sl=[],al=new Float32Array(16),ol=new Float32Array(9),ll=new Float32Array(4);function Xi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=rl[r];if(s===void 0&&(s=new Float32Array(r),rl[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function oe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function hs(i,t){let e=sl[t];e===void 0&&(e=new Int32Array(t),sl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ap(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function bp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ae(e,t))return;i.uniform2fv(this.addr,t),oe(e,t)}}function wp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ae(e,t))return;i.uniform3fv(this.addr,t),oe(e,t)}}function Cp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ae(e,t))return;i.uniform4fv(this.addr,t),oe(e,t)}}function Rp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),oe(e,t)}else{if(ae(e,n))return;ll.set(n),i.uniformMatrix2fv(this.addr,!1,ll),oe(e,n)}}function Pp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),oe(e,t)}else{if(ae(e,n))return;ol.set(n),i.uniformMatrix3fv(this.addr,!1,ol),oe(e,n)}}function Lp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),oe(e,t)}else{if(ae(e,n))return;al.set(n),i.uniformMatrix4fv(this.addr,!1,al),oe(e,n)}}function Dp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ip(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ae(e,t))return;i.uniform2iv(this.addr,t),oe(e,t)}}function Up(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ae(e,t))return;i.uniform3iv(this.addr,t),oe(e,t)}}function Np(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ae(e,t))return;i.uniform4iv(this.addr,t),oe(e,t)}}function Fp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Op(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ae(e,t))return;i.uniform2uiv(this.addr,t),oe(e,t)}}function Bp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ae(e,t))return;i.uniform3uiv(this.addr,t),oe(e,t)}}function zp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ae(e,t))return;i.uniform4uiv(this.addr,t),oe(e,t)}}function Hp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?uc:dc;e.setTexture2D(t||s,r)}function kp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||fc,r)}function Gp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||pc,r)}function Vp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||hc,r)}function Wp(i){switch(i){case 5126:return Ap;case 35664:return bp;case 35665:return wp;case 35666:return Cp;case 35674:return Rp;case 35675:return Pp;case 35676:return Lp;case 5124:case 35670:return Dp;case 35667:case 35671:return Ip;case 35668:case 35672:return Up;case 35669:case 35673:return Np;case 5125:return Fp;case 36294:return Op;case 36295:return Bp;case 36296:return zp;case 35678:case 36198:case 36298:case 36306:case 35682:return Hp;case 35679:case 36299:case 36307:return kp;case 35680:case 36300:case 36308:case 36293:return Gp;case 36289:case 36303:case 36311:case 36292:return Vp}}function Xp(i,t){i.uniform1fv(this.addr,t)}function $p(i,t){const e=Xi(t,this.size,2);i.uniform2fv(this.addr,e)}function qp(i,t){const e=Xi(t,this.size,3);i.uniform3fv(this.addr,e)}function Yp(i,t){const e=Xi(t,this.size,4);i.uniform4fv(this.addr,e)}function Kp(i,t){const e=Xi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Zp(i,t){const e=Xi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function jp(i,t){const e=Xi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Jp(i,t){i.uniform1iv(this.addr,t)}function Qp(i,t){i.uniform2iv(this.addr,t)}function tm(i,t){i.uniform3iv(this.addr,t)}function em(i,t){i.uniform4iv(this.addr,t)}function nm(i,t){i.uniform1uiv(this.addr,t)}function im(i,t){i.uniform2uiv(this.addr,t)}function rm(i,t){i.uniform3uiv(this.addr,t)}function sm(i,t){i.uniform4uiv(this.addr,t)}function am(i,t,e){const n=this.cache,r=t.length,s=hs(e,r);ae(n,s)||(i.uniform1iv(this.addr,s),oe(n,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||dc,s[a])}function om(i,t,e){const n=this.cache,r=t.length,s=hs(e,r);ae(n,s)||(i.uniform1iv(this.addr,s),oe(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||fc,s[a])}function lm(i,t,e){const n=this.cache,r=t.length,s=hs(e,r);ae(n,s)||(i.uniform1iv(this.addr,s),oe(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||pc,s[a])}function cm(i,t,e){const n=this.cache,r=t.length,s=hs(e,r);ae(n,s)||(i.uniform1iv(this.addr,s),oe(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||hc,s[a])}function dm(i){switch(i){case 5126:return Xp;case 35664:return $p;case 35665:return qp;case 35666:return Yp;case 35674:return Kp;case 35675:return Zp;case 35676:return jp;case 5124:case 35670:return Jp;case 35667:case 35671:return Qp;case 35668:case 35672:return tm;case 35669:case 35673:return em;case 5125:return nm;case 36294:return im;case 36295:return rm;case 36296:return sm;case 35678:case 36198:case 36298:case 36306:case 35682:return am;case 35679:case 36299:case 36307:return om;case 35680:case 36300:case 36308:case 36293:return lm;case 36289:case 36303:case 36311:case 36292:return cm}}class um{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Wp(e.type)}}class hm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=dm(e.type)}}class fm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],n)}}}const Qs=/(\w+)(\])?(\[|\.)?/g;function cl(i,t){i.seq.push(t),i.map[t.id]=t}function pm(i,t,e){const n=i.name,r=n.length;for(Qs.lastIndex=0;;){const s=Qs.exec(n),a=Qs.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){cl(e,c===void 0?new um(o,i,t):new hm(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new fm(o),cl(e,f)),e=f}}}class $r{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);pm(s,a,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&n.push(a)}return n}}function dl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const mm=37297;let gm=0;function _m(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function vm(i){const t=Xt.getPrimaries(Xt.workingColorSpace),e=Xt.getPrimaries(i);let n;switch(t===e?n="":t===es&&e===ts?n="LinearDisplayP3ToLinearSRGB":t===ts&&e===es&&(n="LinearSRGBToLinearDisplayP3"),i){case zn:case us:return[n,"LinearTransferOETF"];case Ze:case wa:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function ul(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+_m(i.getShaderSource(t),a)}else return r}function xm(i,t){const e=vm(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Mm(i,t){let e;switch(t){case bd:e="Linear";break;case wd:e="Reinhard";break;case Cd:e="OptimizedCineon";break;case Rd:e="ACESFilmic";break;case Ld:e="AgX";break;case Dd:e="Neutral";break;case Pd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Sm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(sr).join(`
`)}function ym(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Em(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function sr(i){return i!==""}function hl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Tm=/^[ \t]*#include +<([\w\d./]+)>/gm;function pa(i){return i.replace(Tm,bm)}const Am=new Map;function bm(i,t){let e=bt[t];if(e===void 0){const n=Am.get(t);if(n!==void 0)e=bt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return pa(e)}const wm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pl(i){return i.replace(wm,Cm)}function Cm(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ml(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Rm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===kl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Jc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===dn&&(t="SHADOWMAP_TYPE_VSM"),t}function Pm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Fi:case Oi:t="ENVMAP_TYPE_CUBE";break;case cs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Lm(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Oi:t="ENVMAP_MODE_REFRACTION";break}return t}function Dm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Gl:t="ENVMAP_BLENDING_MULTIPLY";break;case Td:t="ENVMAP_BLENDING_MIX";break;case Ad:t="ENVMAP_BLENDING_ADD";break}return t}function Im(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Um(i,t,e,n){const r=i.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Rm(e),c=Pm(e),d=Lm(e),f=Dm(e),p=Im(e),m=Sm(e),g=ym(s),_=r.createProgram();let h,u,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(sr).join(`
`),h.length>0&&(h+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(sr).join(`
`),u.length>0&&(u+=`
`)):(h=[ml(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sr).join(`
`),u=[ml(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==In?"#define TONE_MAPPING":"",e.toneMapping!==In?bt.tonemapping_pars_fragment:"",e.toneMapping!==In?Mm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",bt.colorspace_pars_fragment,xm("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(sr).join(`
`)),a=pa(a),a=hl(a,e),a=fl(a,e),o=pa(o),o=hl(o,e),o=fl(o,e),a=pl(a),o=pl(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,h=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+h,u=["#define varying in",e.glslVersion===Lo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Lo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const y=E+h+a,T=E+u+o,B=dl(r,r.VERTEX_SHADER,y),R=dl(r,r.FRAGMENT_SHADER,T);r.attachShader(_,B),r.attachShader(_,R),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function w(b){if(i.debug.checkShaderErrors){const z=r.getProgramInfoLog(_).trim(),F=r.getShaderInfoLog(B).trim(),X=r.getShaderInfoLog(R).trim();let $=!0,W=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,B,R);else{const Y=ul(r,B,"vertex"),k=ul(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+z+`
`+Y+`
`+k)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(F===""||X==="")&&(W=!1);W&&(b.diagnostics={runnable:$,programLog:z,vertexShader:{log:F,prefix:h},fragmentShader:{log:X,prefix:u}})}r.deleteShader(B),r.deleteShader(R),I=new $r(r,_),v=Em(r,_)}let I;this.getUniforms=function(){return I===void 0&&w(this),I};let v;this.getAttributes=function(){return v===void 0&&w(this),v};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(_,mm)),x},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=gm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=B,this.fragmentShader=R,this}let Nm=0;class Fm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Om(t),e.set(t,n)),n}}class Om{constructor(t){this.id=Nm++,this.code=t,this.usedTimes=0}}function Bm(i,t,e,n,r,s,a){const o=new ec,l=new Fm,c=new Set,d=[],f=r.logarithmicDepthBuffer,p=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function h(v,x,b,z,F){const X=z.fog,$=F.geometry,W=v.isMeshStandardMaterial?z.environment:null,Y=(v.isMeshStandardMaterial?e:t).get(v.envMap||W),k=Y&&Y.mapping===cs?Y.image.height:null,dt=g[v.type];v.precision!==null&&(m=r.getMaxPrecision(v.precision),m!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",m,"instead."));const ct=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ut=ct!==void 0?ct.length:0;let It=0;$.morphAttributes.position!==void 0&&(It=1),$.morphAttributes.normal!==void 0&&(It=2),$.morphAttributes.color!==void 0&&(It=3);let Gt,G,J,ht;if(dt){const $t=je[dt];Gt=$t.vertexShader,G=$t.fragmentShader}else Gt=v.vertexShader,G=v.fragmentShader,l.update(v),J=l.getVertexShaderID(v),ht=l.getFragmentShaderID(v);const st=i.getRenderTarget(),Lt=F.isInstancedMesh===!0,Ct=F.isBatchedMesh===!0,Bt=!!v.map,P=!!v.matcap,Ot=!!Y,Nt=!!v.aoMap,Zt=!!v.lightMap,Mt=!!v.bumpMap,Ht=!!v.normalMap,Dt=!!v.displacementMap,At=!!v.emissiveMap,ee=!!v.metalnessMap,A=!!v.roughnessMap,M=v.anisotropy>0,H=v.clearcoat>0,K=v.dispersion>0,Z=v.iridescence>0,j=v.sheen>0,vt=v.transmission>0,it=M&&!!v.anisotropyMap,rt=H&&!!v.clearcoatMap,Rt=H&&!!v.clearcoatNormalMap,Q=H&&!!v.clearcoatRoughnessMap,mt=Z&&!!v.iridescenceMap,Ut=Z&&!!v.iridescenceThicknessMap,Et=j&&!!v.sheenColorMap,at=j&&!!v.sheenRoughnessMap,Pt=!!v.specularMap,Ft=!!v.specularColorMap,Qt=!!v.specularIntensityMap,C=vt&&!!v.transmissionMap,ot=vt&&!!v.thicknessMap,V=!!v.gradientMap,q=!!v.alphaMap,et=v.alphaTest>0,Tt=!!v.alphaHash,kt=!!v.extensions;let te=In;v.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(te=i.toneMapping);const le={shaderID:dt,shaderType:v.type,shaderName:v.name,vertexShader:Gt,fragmentShader:G,defines:v.defines,customVertexShaderID:J,customFragmentShaderID:ht,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:m,batching:Ct,batchingColor:Ct&&F._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&F.instanceColor!==null,instancingMorph:Lt&&F.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:st===null?i.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:zn,alphaToCoverage:!!v.alphaToCoverage,map:Bt,matcap:P,envMap:Ot,envMapMode:Ot&&Y.mapping,envMapCubeUVHeight:k,aoMap:Nt,lightMap:Zt,bumpMap:Mt,normalMap:Ht,displacementMap:p&&Dt,emissiveMap:At,normalMapObjectSpace:Ht&&v.normalMapType===qd,normalMapTangentSpace:Ht&&v.normalMapType===$d,metalnessMap:ee,roughnessMap:A,anisotropy:M,anisotropyMap:it,clearcoat:H,clearcoatMap:rt,clearcoatNormalMap:Rt,clearcoatRoughnessMap:Q,dispersion:K,iridescence:Z,iridescenceMap:mt,iridescenceThicknessMap:Ut,sheen:j,sheenColorMap:Et,sheenRoughnessMap:at,specularMap:Pt,specularColorMap:Ft,specularIntensityMap:Qt,transmission:vt,transmissionMap:C,thicknessMap:ot,gradientMap:V,opaque:v.transparent===!1&&v.blending===Dn&&v.alphaToCoverage===!1,alphaMap:q,alphaTest:et,alphaHash:Tt,combine:v.combine,mapUv:Bt&&_(v.map.channel),aoMapUv:Nt&&_(v.aoMap.channel),lightMapUv:Zt&&_(v.lightMap.channel),bumpMapUv:Mt&&_(v.bumpMap.channel),normalMapUv:Ht&&_(v.normalMap.channel),displacementMapUv:Dt&&_(v.displacementMap.channel),emissiveMapUv:At&&_(v.emissiveMap.channel),metalnessMapUv:ee&&_(v.metalnessMap.channel),roughnessMapUv:A&&_(v.roughnessMap.channel),anisotropyMapUv:it&&_(v.anisotropyMap.channel),clearcoatMapUv:rt&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Rt&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:mt&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:at&&_(v.sheenRoughnessMap.channel),specularMapUv:Pt&&_(v.specularMap.channel),specularColorMapUv:Ft&&_(v.specularColorMap.channel),specularIntensityMapUv:Qt&&_(v.specularIntensityMap.channel),transmissionMapUv:C&&_(v.transmissionMap.channel),thicknessMapUv:ot&&_(v.thicknessMap.channel),alphaMapUv:q&&_(v.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Ht||M),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!$.attributes.uv&&(Bt||q),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:F.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:It,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&b.length>0,shadowMapType:i.shadowMap.type,toneMapping:te,decodeVideoTexture:Bt&&v.map.isVideoTexture===!0&&Xt.getTransfer(v.map.colorSpace)===Yt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Oe,flipSided:v.side===ye,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:kt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:kt&&v.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return le.vertexUv1s=c.has(1),le.vertexUv2s=c.has(2),le.vertexUv3s=c.has(3),c.clear(),le}function u(v){const x=[];if(v.shaderID?x.push(v.shaderID):(x.push(v.customVertexShaderID),x.push(v.customFragmentShaderID)),v.defines!==void 0)for(const b in v.defines)x.push(b),x.push(v.defines[b]);return v.isRawShaderMaterial===!1&&(E(x,v),y(x,v),x.push(i.outputColorSpace)),x.push(v.customProgramCacheKey),x.join()}function E(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}function y(v,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),v.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.skinning&&o.enable(4),x.morphTargets&&o.enable(5),x.morphNormals&&o.enable(6),x.morphColors&&o.enable(7),x.premultipliedAlpha&&o.enable(8),x.shadowMapEnabled&&o.enable(9),x.doubleSided&&o.enable(10),x.flipSided&&o.enable(11),x.useDepthPacking&&o.enable(12),x.dithering&&o.enable(13),x.transmission&&o.enable(14),x.sheen&&o.enable(15),x.opaque&&o.enable(16),x.pointsUvs&&o.enable(17),x.decodeVideoTexture&&o.enable(18),x.alphaToCoverage&&o.enable(19),v.push(o.mask)}function T(v){const x=g[v.type];let b;if(x){const z=je[x];b=Su.clone(z.uniforms)}else b=v.uniforms;return b}function B(v,x){let b;for(let z=0,F=d.length;z<F;z++){const X=d[z];if(X.cacheKey===x){b=X,++b.usedTimes;break}}return b===void 0&&(b=new Um(i,x,v,s),d.push(b)),b}function R(v){if(--v.usedTimes===0){const x=d.indexOf(v);d[x]=d[d.length-1],d.pop(),v.destroy()}}function w(v){l.remove(v)}function I(){l.dispose()}return{getParameters:h,getProgramCacheKey:u,getUniforms:T,acquireProgram:B,releaseProgram:R,releaseShaderCache:w,programs:d,dispose:I}}function zm(){let i=new WeakMap;function t(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function e(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:r}}function Hm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function gl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function _l(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(f,p,m,g,_,h){let u=i[t];return u===void 0?(u={id:f.id,object:f,geometry:p,material:m,groupOrder:g,renderOrder:f.renderOrder,z:_,group:h},i[t]=u):(u.id=f.id,u.object=f,u.geometry=p,u.material=m,u.groupOrder=g,u.renderOrder=f.renderOrder,u.z=_,u.group=h),t++,u}function o(f,p,m,g,_,h){const u=a(f,p,m,g,_,h);m.transmission>0?n.push(u):m.transparent===!0?r.push(u):e.push(u)}function l(f,p,m,g,_,h){const u=a(f,p,m,g,_,h);m.transmission>0?n.unshift(u):m.transparent===!0?r.unshift(u):e.unshift(u)}function c(f,p){e.length>1&&e.sort(f||Hm),n.length>1&&n.sort(p||gl),r.length>1&&r.sort(p||gl)}function d(){for(let f=t,p=i.length;f<p;f++){const m=i[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:d,sort:c}}function km(){let i=new WeakMap;function t(n,r){const s=i.get(n);let a;return s===void 0?(a=new _l,i.set(n,[a])):r>=s.length?(a=new _l,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Gm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new _t};break;case"SpotLight":e={position:new L,direction:new L,color:new _t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new _t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new _t,groundColor:new _t};break;case"RectAreaLight":e={color:new _t,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function Vm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Wm=0;function Xm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function $m(i){const t=new Gm,e=Vm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const r=new L,s=new Kt,a=new Kt;function o(c){let d=0,f=0,p=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let m=0,g=0,_=0,h=0,u=0,E=0,y=0,T=0,B=0,R=0,w=0;c.sort(Xm);for(let v=0,x=c.length;v<x;v++){const b=c[v],z=b.color,F=b.intensity,X=b.distance,$=b.shadow&&b.shadow.map?b.shadow.map.texture:null;if(b.isAmbientLight)d+=z.r*F,f+=z.g*F,p+=z.b*F;else if(b.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(b.sh.coefficients[W],F);w++}else if(b.isDirectionalLight){const W=t.get(b);if(W.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){const Y=b.shadow,k=e.get(b);k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,n.directionalShadow[m]=k,n.directionalShadowMap[m]=$,n.directionalShadowMatrix[m]=b.shadow.matrix,E++}n.directional[m]=W,m++}else if(b.isSpotLight){const W=t.get(b);W.position.setFromMatrixPosition(b.matrixWorld),W.color.copy(z).multiplyScalar(F),W.distance=X,W.coneCos=Math.cos(b.angle),W.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),W.decay=b.decay,n.spot[_]=W;const Y=b.shadow;if(b.map&&(n.spotLightMap[B]=b.map,B++,Y.updateMatrices(b),b.castShadow&&R++),n.spotLightMatrix[_]=Y.matrix,b.castShadow){const k=e.get(b);k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=$,T++}_++}else if(b.isRectAreaLight){const W=t.get(b);W.color.copy(z).multiplyScalar(F),W.halfWidth.set(b.width*.5,0,0),W.halfHeight.set(0,b.height*.5,0),n.rectArea[h]=W,h++}else if(b.isPointLight){const W=t.get(b);if(W.color.copy(b.color).multiplyScalar(b.intensity),W.distance=b.distance,W.decay=b.decay,b.castShadow){const Y=b.shadow,k=e.get(b);k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,k.shadowCameraNear=Y.camera.near,k.shadowCameraFar=Y.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=b.shadow.matrix,y++}n.point[g]=W,g++}else if(b.isHemisphereLight){const W=t.get(b);W.skyColor.copy(b.color).multiplyScalar(F),W.groundColor.copy(b.groundColor).multiplyScalar(F),n.hemi[u]=W,u++}}h>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=nt.LTC_FLOAT_1,n.rectAreaLTC2=nt.LTC_FLOAT_2):(n.rectAreaLTC1=nt.LTC_HALF_1,n.rectAreaLTC2=nt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=f,n.ambient[2]=p;const I=n.hash;(I.directionalLength!==m||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==h||I.hemiLength!==u||I.numDirectionalShadows!==E||I.numPointShadows!==y||I.numSpotShadows!==T||I.numSpotMaps!==B||I.numLightProbes!==w)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=h,n.point.length=g,n.hemi.length=u,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=T+B-R,n.spotLightMap.length=B,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=w,I.directionalLength=m,I.pointLength=g,I.spotLength=_,I.rectAreaLength=h,I.hemiLength=u,I.numDirectionalShadows=E,I.numPointShadows=y,I.numSpotShadows=T,I.numSpotMaps=B,I.numLightProbes=w,n.version=Wm++)}function l(c,d){let f=0,p=0,m=0,g=0,_=0;const h=d.matrixWorldInverse;for(let u=0,E=c.length;u<E;u++){const y=c[u];if(y.isDirectionalLight){const T=n.directional[f];T.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(h),f++}else if(y.isSpotLight){const T=n.spot[m];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(h),T.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(h),m++}else if(y.isRectAreaLight){const T=n.rectArea[g];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(h),a.identity(),s.copy(y.matrixWorld),s.premultiply(h),a.extractRotation(s),T.halfWidth.set(y.width*.5,0,0),T.halfHeight.set(0,y.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const T=n.point[p];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(h),p++}else if(y.isHemisphereLight){const T=n.hemi[_];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(h),_++}}}return{setup:o,setupView:l,state:n}}function vl(i){const t=new $m(i),e=[],n=[];function r(d){c.camera=d,e.length=0,n.length=0}function s(d){e.push(d)}function a(d){n.push(d)}function o(){t.setup(e)}function l(d){t.setupView(e,d)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function qm(i){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new vl(i),t.set(r,[o])):s>=a.length?(o=new vl(i),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Ym extends Wi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Km extends Wi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Zm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Jm(i,t,e){let n=new Pa;const r=new zt,s=new zt,a=new ue,o=new Ym({depthPacking:Xd}),l=new Km,c={},d=e.maxTextureSize,f={[Fn]:ye,[ye]:Fn,[Oe]:Oe},p=new Xe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:Zm,fragmentShader:jm}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const g=new $e;g.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ze(g,p),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kl;let u=this.type;this.render=function(R,w,I){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||R.length===0)return;const v=i.getRenderTarget(),x=i.getActiveCubeFace(),b=i.getActiveMipmapLevel(),z=i.state;z.setBlending(pn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const F=u!==dn&&this.type===dn,X=u===dn&&this.type!==dn;for(let $=0,W=R.length;$<W;$++){const Y=R[$],k=Y.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const dt=k.getFrameExtents();if(r.multiply(dt),s.copy(k.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/dt.x),r.x=s.x*dt.x,k.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/dt.y),r.y=s.y*dt.y,k.mapSize.y=s.y)),k.map===null||F===!0||X===!0){const ut=this.type!==dn?{minFilter:Be,magFilter:Be}:{};k.map!==null&&k.map.dispose(),k.map=new ni(r.x,r.y,ut),k.map.texture.name=Y.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const ct=k.getViewportCount();for(let ut=0;ut<ct;ut++){const It=k.getViewport(ut);a.set(s.x*It.x,s.y*It.y,s.x*It.z,s.y*It.w),z.viewport(a),k.updateMatrices(Y,ut),n=k.getFrustum(),T(w,I,k.camera,Y,this.type)}k.isPointLightShadow!==!0&&this.type===dn&&E(k,I),k.needsUpdate=!1}u=this.type,h.needsUpdate=!1,i.setRenderTarget(v,x,b)};function E(R,w){const I=t.update(_);p.defines.VSM_SAMPLES!==R.blurSamples&&(p.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new ni(r.x,r.y)),p.uniforms.shadow_pass.value=R.map.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(w,null,I,p,_,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(w,null,I,m,_,null)}function y(R,w,I,v){let x=null;const b=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(b!==void 0)x=b;else if(x=I.isPointLight===!0?l:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const z=x.uuid,F=w.uuid;let X=c[z];X===void 0&&(X={},c[z]=X);let $=X[F];$===void 0&&($=x.clone(),X[F]=$,w.addEventListener("dispose",B)),x=$}if(x.visible=w.visible,x.wireframe=w.wireframe,v===dn?x.side=w.shadowSide!==null?w.shadowSide:w.side:x.side=w.shadowSide!==null?w.shadowSide:f[w.side],x.alphaMap=w.alphaMap,x.alphaTest=w.alphaTest,x.map=w.map,x.clipShadows=w.clipShadows,x.clippingPlanes=w.clippingPlanes,x.clipIntersection=w.clipIntersection,x.displacementMap=w.displacementMap,x.displacementScale=w.displacementScale,x.displacementBias=w.displacementBias,x.wireframeLinewidth=w.wireframeLinewidth,x.linewidth=w.linewidth,I.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const z=i.properties.get(x);z.light=I}return x}function T(R,w,I,v,x){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===dn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const F=t.update(R),X=R.material;if(Array.isArray(X)){const $=F.groups;for(let W=0,Y=$.length;W<Y;W++){const k=$[W],dt=X[k.materialIndex];if(dt&&dt.visible){const ct=y(R,dt,v,x);R.onBeforeShadow(i,R,w,I,F,ct,k),i.renderBufferDirect(I,null,F,ct,R,k),R.onAfterShadow(i,R,w,I,F,ct,k)}}}else if(X.visible){const $=y(R,X,v,x);R.onBeforeShadow(i,R,w,I,F,$,null),i.renderBufferDirect(I,null,F,$,R,null),R.onAfterShadow(i,R,w,I,F,$,null)}}const z=R.children;for(let F=0,X=z.length;F<X;F++)T(z[F],w,I,v,x)}function B(R){R.target.removeEventListener("dispose",B);for(const I in c){const v=c[I],x=R.target.uuid;x in v&&(v[x].dispose(),delete v[x])}}}function Qm(i){function t(){let C=!1;const ot=new ue;let V=null;const q=new ue(0,0,0,0);return{setMask:function(et){V!==et&&!C&&(i.colorMask(et,et,et,et),V=et)},setLocked:function(et){C=et},setClear:function(et,Tt,kt,te,le){le===!0&&(et*=te,Tt*=te,kt*=te),ot.set(et,Tt,kt,te),q.equals(ot)===!1&&(i.clearColor(et,Tt,kt,te),q.copy(ot))},reset:function(){C=!1,V=null,q.set(-1,0,0,0)}}}function e(){let C=!1,ot=null,V=null,q=null;return{setTest:function(et){et?ht(i.DEPTH_TEST):st(i.DEPTH_TEST)},setMask:function(et){ot!==et&&!C&&(i.depthMask(et),ot=et)},setFunc:function(et){if(V!==et){switch(et){case _d:i.depthFunc(i.NEVER);break;case vd:i.depthFunc(i.ALWAYS);break;case xd:i.depthFunc(i.LESS);break;case jr:i.depthFunc(i.LEQUAL);break;case Md:i.depthFunc(i.EQUAL);break;case Sd:i.depthFunc(i.GEQUAL);break;case yd:i.depthFunc(i.GREATER);break;case Ed:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}V=et}},setLocked:function(et){C=et},setClear:function(et){q!==et&&(i.clearDepth(et),q=et)},reset:function(){C=!1,ot=null,V=null,q=null}}}function n(){let C=!1,ot=null,V=null,q=null,et=null,Tt=null,kt=null,te=null,le=null;return{setTest:function($t){C||($t?ht(i.STENCIL_TEST):st(i.STENCIL_TEST))},setMask:function($t){ot!==$t&&!C&&(i.stencilMask($t),ot=$t)},setFunc:function($t,qe,Ye){(V!==$t||q!==qe||et!==Ye)&&(i.stencilFunc($t,qe,Ye),V=$t,q=qe,et=Ye)},setOp:function($t,qe,Ye){(Tt!==$t||kt!==qe||te!==Ye)&&(i.stencilOp($t,qe,Ye),Tt=$t,kt=qe,te=Ye)},setLocked:function($t){C=$t},setClear:function($t){le!==$t&&(i.clearStencil($t),le=$t)},reset:function(){C=!1,ot=null,V=null,q=null,et=null,Tt=null,kt=null,te=null,le=null}}}const r=new t,s=new e,a=new n,o=new WeakMap,l=new WeakMap;let c={},d={},f=new WeakMap,p=[],m=null,g=!1,_=null,h=null,u=null,E=null,y=null,T=null,B=null,R=new _t(0,0,0),w=0,I=!1,v=null,x=null,b=null,z=null,F=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,W=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(Y)[1]),$=W>=1):Y.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),$=W>=2);let k=null,dt={};const ct=i.getParameter(i.SCISSOR_BOX),ut=i.getParameter(i.VIEWPORT),It=new ue().fromArray(ct),Gt=new ue().fromArray(ut);function G(C,ot,V,q){const et=new Uint8Array(4),Tt=i.createTexture();i.bindTexture(C,Tt),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let kt=0;kt<V;kt++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,q,0,i.RGBA,i.UNSIGNED_BYTE,et):i.texImage2D(ot+kt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,et);return Tt}const J={};J[i.TEXTURE_2D]=G(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=G(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=G(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=G(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ht(i.DEPTH_TEST),s.setFunc(jr),Mt(!1),Ht(Ja),ht(i.CULL_FACE),Nt(pn);function ht(C){c[C]!==!0&&(i.enable(C),c[C]=!0)}function st(C){c[C]!==!1&&(i.disable(C),c[C]=!1)}function Lt(C,ot){return d[C]!==ot?(i.bindFramebuffer(C,ot),d[C]=ot,C===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ot),C===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function Ct(C,ot){let V=p,q=!1;if(C){V=f.get(ot),V===void 0&&(V=[],f.set(ot,V));const et=C.textures;if(V.length!==et.length||V[0]!==i.COLOR_ATTACHMENT0){for(let Tt=0,kt=et.length;Tt<kt;Tt++)V[Tt]=i.COLOR_ATTACHMENT0+Tt;V.length=et.length,q=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,q=!0);q&&i.drawBuffers(V)}function Bt(C){return m!==C?(i.useProgram(C),m=C,!0):!1}const P={[Zn]:i.FUNC_ADD,[td]:i.FUNC_SUBTRACT,[ed]:i.FUNC_REVERSE_SUBTRACT};P[nd]=i.MIN,P[id]=i.MAX;const Ot={[rd]:i.ZERO,[sd]:i.ONE,[ad]:i.SRC_COLOR,[oa]:i.SRC_ALPHA,[hd]:i.SRC_ALPHA_SATURATE,[dd]:i.DST_COLOR,[ld]:i.DST_ALPHA,[od]:i.ONE_MINUS_SRC_COLOR,[la]:i.ONE_MINUS_SRC_ALPHA,[ud]:i.ONE_MINUS_DST_COLOR,[cd]:i.ONE_MINUS_DST_ALPHA,[fd]:i.CONSTANT_COLOR,[pd]:i.ONE_MINUS_CONSTANT_COLOR,[md]:i.CONSTANT_ALPHA,[gd]:i.ONE_MINUS_CONSTANT_ALPHA};function Nt(C,ot,V,q,et,Tt,kt,te,le,$t){if(C===pn){g===!0&&(st(i.BLEND),g=!1);return}if(g===!1&&(ht(i.BLEND),g=!0),C!==Qc){if(C!==_||$t!==I){if((h!==Zn||y!==Zn)&&(i.blendEquation(i.FUNC_ADD),h=Zn,y=Zn),$t)switch(C){case Dn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qa:i.blendFunc(i.ONE,i.ONE);break;case to:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case eo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case Dn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qa:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case to:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case eo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}u=null,E=null,T=null,B=null,R.set(0,0,0),w=0,_=C,I=$t}return}et=et||ot,Tt=Tt||V,kt=kt||q,(ot!==h||et!==y)&&(i.blendEquationSeparate(P[ot],P[et]),h=ot,y=et),(V!==u||q!==E||Tt!==T||kt!==B)&&(i.blendFuncSeparate(Ot[V],Ot[q],Ot[Tt],Ot[kt]),u=V,E=q,T=Tt,B=kt),(te.equals(R)===!1||le!==w)&&(i.blendColor(te.r,te.g,te.b,le),R.copy(te),w=le),_=C,I=!1}function Zt(C,ot){C.side===Oe?st(i.CULL_FACE):ht(i.CULL_FACE);let V=C.side===ye;ot&&(V=!V),Mt(V),C.blending===Dn&&C.transparent===!1?Nt(pn):Nt(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),s.setFunc(C.depthFunc),s.setTest(C.depthTest),s.setMask(C.depthWrite),r.setMask(C.colorWrite);const q=C.stencilWrite;a.setTest(q),q&&(a.setMask(C.stencilWriteMask),a.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),a.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),At(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ht(i.SAMPLE_ALPHA_TO_COVERAGE):st(i.SAMPLE_ALPHA_TO_COVERAGE)}function Mt(C){v!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),v=C)}function Ht(C){C!==Zc?(ht(i.CULL_FACE),C!==x&&(C===Ja?i.cullFace(i.BACK):C===jc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):st(i.CULL_FACE),x=C}function Dt(C){C!==b&&($&&i.lineWidth(C),b=C)}function At(C,ot,V){C?(ht(i.POLYGON_OFFSET_FILL),(z!==ot||F!==V)&&(i.polygonOffset(ot,V),z=ot,F=V)):st(i.POLYGON_OFFSET_FILL)}function ee(C){C?ht(i.SCISSOR_TEST):st(i.SCISSOR_TEST)}function A(C){C===void 0&&(C=i.TEXTURE0+X-1),k!==C&&(i.activeTexture(C),k=C)}function M(C,ot,V){V===void 0&&(k===null?V=i.TEXTURE0+X-1:V=k);let q=dt[V];q===void 0&&(q={type:void 0,texture:void 0},dt[V]=q),(q.type!==C||q.texture!==ot)&&(k!==V&&(i.activeTexture(V),k=V),i.bindTexture(C,ot||J[C]),q.type=C,q.texture=ot)}function H(){const C=dt[k];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function vt(){try{i.texSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function it(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function rt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Rt(){try{i.texStorage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Q(){try{i.texStorage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function mt(){try{i.texImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ut(){try{i.texImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Et(C){It.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),It.copy(C))}function at(C){Gt.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),Gt.copy(C))}function Pt(C,ot){let V=l.get(ot);V===void 0&&(V=new WeakMap,l.set(ot,V));let q=V.get(C);q===void 0&&(q=i.getUniformBlockIndex(ot,C.name),V.set(C,q))}function Ft(C,ot){const q=l.get(ot).get(C);o.get(ot)!==q&&(i.uniformBlockBinding(ot,q,C.__bindingPointIndex),o.set(ot,q))}function Qt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},k=null,dt={},d={},f=new WeakMap,p=[],m=null,g=!1,_=null,h=null,u=null,E=null,y=null,T=null,B=null,R=new _t(0,0,0),w=0,I=!1,v=null,x=null,b=null,z=null,F=null,It.set(0,0,i.canvas.width,i.canvas.height),Gt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:ht,disable:st,bindFramebuffer:Lt,drawBuffers:Ct,useProgram:Bt,setBlending:Nt,setMaterial:Zt,setFlipSided:Mt,setCullFace:Ht,setLineWidth:Dt,setPolygonOffset:At,setScissorTest:ee,activeTexture:A,bindTexture:M,unbindTexture:H,compressedTexImage2D:K,compressedTexImage3D:Z,texImage2D:mt,texImage3D:Ut,updateUBOMapping:Pt,uniformBlockBinding:Ft,texStorage2D:Rt,texStorage3D:Q,texSubImage2D:j,texSubImage3D:vt,compressedTexSubImage2D:it,compressedTexSubImage3D:rt,scissor:Et,viewport:at,reset:Qt}}function tg(i,t,e,n,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new zt,d=new WeakMap;let f;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return m?new OffscreenCanvas(A,M):or("canvas")}function _(A,M,H){let K=1;const Z=ee(A);if((Z.width>H||Z.height>H)&&(K=H/Math.max(Z.width,Z.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const j=Math.floor(K*Z.width),vt=Math.floor(K*Z.height);f===void 0&&(f=g(j,vt));const it=M?g(j,vt):f;return it.width=j,it.height=vt,it.getContext("2d").drawImage(A,0,0,j,vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+j+"x"+vt+")."),it}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),A;return A}function h(A){return A.generateMipmaps&&A.minFilter!==Be&&A.minFilter!==Re}function u(A){i.generateMipmap(A)}function E(A,M,H,K,Z=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let j=M;if(M===i.RED&&(H===i.FLOAT&&(j=i.R32F),H===i.HALF_FLOAT&&(j=i.R16F),H===i.UNSIGNED_BYTE&&(j=i.R8)),M===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.R8UI),H===i.UNSIGNED_SHORT&&(j=i.R16UI),H===i.UNSIGNED_INT&&(j=i.R32UI),H===i.BYTE&&(j=i.R8I),H===i.SHORT&&(j=i.R16I),H===i.INT&&(j=i.R32I)),M===i.RG&&(H===i.FLOAT&&(j=i.RG32F),H===i.HALF_FLOAT&&(j=i.RG16F),H===i.UNSIGNED_BYTE&&(j=i.RG8)),M===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.RG8UI),H===i.UNSIGNED_SHORT&&(j=i.RG16UI),H===i.UNSIGNED_INT&&(j=i.RG32UI),H===i.BYTE&&(j=i.RG8I),H===i.SHORT&&(j=i.RG16I),H===i.INT&&(j=i.RG32I)),M===i.RGB&&H===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),M===i.RGBA){const vt=Z?Qr:Xt.getTransfer(K);H===i.FLOAT&&(j=i.RGBA32F),H===i.HALF_FLOAT&&(j=i.RGBA16F),H===i.UNSIGNED_BYTE&&(j=vt===Yt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function y(A,M){let H;return A?M===null||M===Bi||M===zi?H=i.DEPTH24_STENCIL8:M===Cn?H=i.DEPTH32F_STENCIL8:M===Jr&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Bi||M===zi?H=i.DEPTH_COMPONENT24:M===Cn?H=i.DEPTH_COMPONENT32F:M===Jr&&(H=i.DEPTH_COMPONENT16),H}function T(A,M){return h(A)===!0||A.isFramebufferTexture&&A.minFilter!==Be&&A.minFilter!==Re?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function B(A){const M=A.target;M.removeEventListener("dispose",B),w(M),M.isVideoTexture&&d.delete(M)}function R(A){const M=A.target;M.removeEventListener("dispose",R),v(M)}function w(A){const M=n.get(A);if(M.__webglInit===void 0)return;const H=A.source,K=p.get(H);if(K){const Z=K[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&I(A),Object.keys(K).length===0&&p.delete(H)}n.remove(A)}function I(A){const M=n.get(A);i.deleteTexture(M.__webglTexture);const H=A.source,K=p.get(H);delete K[M.__cacheKey],a.memory.textures--}function v(A){const M=n.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(M.__webglFramebuffer[K]))for(let Z=0;Z<M.__webglFramebuffer[K].length;Z++)i.deleteFramebuffer(M.__webglFramebuffer[K][Z]);else i.deleteFramebuffer(M.__webglFramebuffer[K]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[K])}else{if(Array.isArray(M.__webglFramebuffer))for(let K=0;K<M.__webglFramebuffer.length;K++)i.deleteFramebuffer(M.__webglFramebuffer[K]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let K=0;K<M.__webglColorRenderbuffer.length;K++)M.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[K]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const H=A.textures;for(let K=0,Z=H.length;K<Z;K++){const j=n.get(H[K]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(H[K])}n.remove(A)}let x=0;function b(){x=0}function z(){const A=x;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),x+=1,A}function F(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function X(A,M){const H=n.get(A);if(A.isVideoTexture&&Dt(A),A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version){const K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Gt(H,A,M);return}}e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+M)}function $(A,M){const H=n.get(A);if(A.version>0&&H.__version!==A.version){Gt(H,A,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+M)}function W(A,M){const H=n.get(A);if(A.version>0&&H.__version!==A.version){Gt(H,A,M);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+M)}function Y(A,M){const H=n.get(A);if(A.version>0&&H.__version!==A.version){G(H,A,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+M)}const k={[ua]:i.REPEAT,[hn]:i.CLAMP_TO_EDGE,[ha]:i.MIRRORED_REPEAT},dt={[Be]:i.NEAREST,[Id]:i.NEAREST_MIPMAP_NEAREST,[Mr]:i.NEAREST_MIPMAP_LINEAR,[Re]:i.LINEAR,[ys]:i.LINEAR_MIPMAP_NEAREST,[ti]:i.LINEAR_MIPMAP_LINEAR},ct={[Yd]:i.NEVER,[tu]:i.ALWAYS,[Kd]:i.LESS,[Zl]:i.LEQUAL,[Zd]:i.EQUAL,[Qd]:i.GEQUAL,[jd]:i.GREATER,[Jd]:i.NOTEQUAL};function ut(A,M){if(M.type===Cn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Re||M.magFilter===ys||M.magFilter===Mr||M.magFilter===ti||M.minFilter===Re||M.minFilter===ys||M.minFilter===Mr||M.minFilter===ti)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,k[M.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,k[M.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,k[M.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,dt[M.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,dt[M.minFilter]),M.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ct[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Be||M.minFilter!==Mr&&M.minFilter!==ti||M.type===Cn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function It(A,M){let H=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",B));const K=M.source;let Z=p.get(K);Z===void 0&&(Z={},p.set(K,Z));const j=F(M);if(j!==A.__cacheKey){Z[j]===void 0&&(Z[j]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),Z[j].usedTimes++;const vt=Z[A.__cacheKey];vt!==void 0&&(Z[A.__cacheKey].usedTimes--,vt.usedTimes===0&&I(M)),A.__cacheKey=j,A.__webglTexture=Z[j].texture}return H}function Gt(A,M,H){let K=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(K=i.TEXTURE_3D);const Z=It(A,M),j=M.source;e.bindTexture(K,A.__webglTexture,i.TEXTURE0+H);const vt=n.get(j);if(j.version!==vt.__version||Z===!0){e.activeTexture(i.TEXTURE0+H);const it=Xt.getPrimaries(Xt.workingColorSpace),rt=M.colorSpace===wn?null:Xt.getPrimaries(M.colorSpace),Rt=M.colorSpace===wn||it===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let Q=_(M.image,!1,r.maxTextureSize);Q=At(M,Q);const mt=s.convert(M.format,M.colorSpace),Ut=s.convert(M.type);let Et=E(M.internalFormat,mt,Ut,M.colorSpace,M.isVideoTexture);ut(K,M);let at;const Pt=M.mipmaps,Ft=M.isVideoTexture!==!0,Qt=vt.__version===void 0||Z===!0,C=j.dataReady,ot=T(M,Q);if(M.isDepthTexture)Et=y(M.format===Hi,M.type),Qt&&(Ft?e.texStorage2D(i.TEXTURE_2D,1,Et,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,Et,Q.width,Q.height,0,mt,Ut,null));else if(M.isDataTexture)if(Pt.length>0){Ft&&Qt&&e.texStorage2D(i.TEXTURE_2D,ot,Et,Pt[0].width,Pt[0].height);for(let V=0,q=Pt.length;V<q;V++)at=Pt[V],Ft?C&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,at.width,at.height,mt,Ut,at.data):e.texImage2D(i.TEXTURE_2D,V,Et,at.width,at.height,0,mt,Ut,at.data);M.generateMipmaps=!1}else Ft?(Qt&&e.texStorage2D(i.TEXTURE_2D,ot,Et,Q.width,Q.height),C&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,mt,Ut,Q.data)):e.texImage2D(i.TEXTURE_2D,0,Et,Q.width,Q.height,0,mt,Ut,Q.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ft&&Qt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,Et,Pt[0].width,Pt[0].height,Q.depth);for(let V=0,q=Pt.length;V<q;V++)if(at=Pt[V],M.format!==Qe)if(mt!==null)if(Ft){if(C)if(M.layerUpdates.size>0){for(const et of M.layerUpdates){const Tt=at.width*at.height;e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,et,at.width,at.height,1,mt,at.data.slice(Tt*et,Tt*(et+1)),0,0)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,at.width,at.height,Q.depth,mt,at.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,V,Et,at.width,at.height,Q.depth,0,at.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?C&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,at.width,at.height,Q.depth,mt,Ut,at.data):e.texImage3D(i.TEXTURE_2D_ARRAY,V,Et,at.width,at.height,Q.depth,0,mt,Ut,at.data)}else{Ft&&Qt&&e.texStorage2D(i.TEXTURE_2D,ot,Et,Pt[0].width,Pt[0].height);for(let V=0,q=Pt.length;V<q;V++)at=Pt[V],M.format!==Qe?mt!==null?Ft?C&&e.compressedTexSubImage2D(i.TEXTURE_2D,V,0,0,at.width,at.height,mt,at.data):e.compressedTexImage2D(i.TEXTURE_2D,V,Et,at.width,at.height,0,at.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?C&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,at.width,at.height,mt,Ut,at.data):e.texImage2D(i.TEXTURE_2D,V,Et,at.width,at.height,0,mt,Ut,at.data)}else if(M.isDataArrayTexture)if(Ft){if(Qt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,Et,Q.width,Q.height,Q.depth),C)if(M.layerUpdates.size>0){let V;switch(Ut){case i.UNSIGNED_BYTE:switch(mt){case i.ALPHA:V=1;break;case i.LUMINANCE:V=1;break;case i.LUMINANCE_ALPHA:V=2;break;case i.RGB:V=3;break;case i.RGBA:V=4;break;default:throw new Error(`Unknown texel size for format ${mt}.`)}break;case i.UNSIGNED_SHORT_4_4_4_4:case i.UNSIGNED_SHORT_5_5_5_1:case i.UNSIGNED_SHORT_5_6_5:V=1;break;default:throw new Error(`Unknown texel size for type ${Ut}.`)}const q=Q.width*Q.height*V;for(const et of M.layerUpdates)e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,et,Q.width,Q.height,1,mt,Ut,Q.data.slice(q*et,q*(et+1)));M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,mt,Ut,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Et,Q.width,Q.height,Q.depth,0,mt,Ut,Q.data);else if(M.isData3DTexture)Ft?(Qt&&e.texStorage3D(i.TEXTURE_3D,ot,Et,Q.width,Q.height,Q.depth),C&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,mt,Ut,Q.data)):e.texImage3D(i.TEXTURE_3D,0,Et,Q.width,Q.height,Q.depth,0,mt,Ut,Q.data);else if(M.isFramebufferTexture){if(Qt)if(Ft)e.texStorage2D(i.TEXTURE_2D,ot,Et,Q.width,Q.height);else{let V=Q.width,q=Q.height;for(let et=0;et<ot;et++)e.texImage2D(i.TEXTURE_2D,et,Et,V,q,0,mt,Ut,null),V>>=1,q>>=1}}else if(Pt.length>0){if(Ft&&Qt){const V=ee(Pt[0]);e.texStorage2D(i.TEXTURE_2D,ot,Et,V.width,V.height)}for(let V=0,q=Pt.length;V<q;V++)at=Pt[V],Ft?C&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,mt,Ut,at):e.texImage2D(i.TEXTURE_2D,V,Et,mt,Ut,at);M.generateMipmaps=!1}else if(Ft){if(Qt){const V=ee(Q);e.texStorage2D(i.TEXTURE_2D,ot,Et,V.width,V.height)}C&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,Ut,Q)}else e.texImage2D(i.TEXTURE_2D,0,Et,mt,Ut,Q);h(M)&&u(K),vt.__version=j.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function G(A,M,H){if(M.image.length!==6)return;const K=It(A,M),Z=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+H);const j=n.get(Z);if(Z.version!==j.__version||K===!0){e.activeTexture(i.TEXTURE0+H);const vt=Xt.getPrimaries(Xt.workingColorSpace),it=M.colorSpace===wn?null:Xt.getPrimaries(M.colorSpace),rt=M.colorSpace===wn||vt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt);const Rt=M.isCompressedTexture||M.image[0].isCompressedTexture,Q=M.image[0]&&M.image[0].isDataTexture,mt=[];for(let q=0;q<6;q++)!Rt&&!Q?mt[q]=_(M.image[q],!0,r.maxCubemapSize):mt[q]=Q?M.image[q].image:M.image[q],mt[q]=At(M,mt[q]);const Ut=mt[0],Et=s.convert(M.format,M.colorSpace),at=s.convert(M.type),Pt=E(M.internalFormat,Et,at,M.colorSpace),Ft=M.isVideoTexture!==!0,Qt=j.__version===void 0||K===!0,C=Z.dataReady;let ot=T(M,Ut);ut(i.TEXTURE_CUBE_MAP,M);let V;if(Rt){Ft&&Qt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ot,Pt,Ut.width,Ut.height);for(let q=0;q<6;q++){V=mt[q].mipmaps;for(let et=0;et<V.length;et++){const Tt=V[et];M.format!==Qe?Et!==null?Ft?C&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,0,0,Tt.width,Tt.height,Et,Tt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,Pt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?C&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,0,0,Tt.width,Tt.height,Et,at,Tt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,Pt,Tt.width,Tt.height,0,Et,at,Tt.data)}}}else{if(V=M.mipmaps,Ft&&Qt){V.length>0&&ot++;const q=ee(mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ot,Pt,q.width,q.height)}for(let q=0;q<6;q++)if(Q){Ft?C&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,mt[q].width,mt[q].height,Et,at,mt[q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Pt,mt[q].width,mt[q].height,0,Et,at,mt[q].data);for(let et=0;et<V.length;et++){const kt=V[et].image[q].image;Ft?C&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,0,0,kt.width,kt.height,Et,at,kt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,Pt,kt.width,kt.height,0,Et,at,kt.data)}}else{Ft?C&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Et,at,mt[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Pt,Et,at,mt[q]);for(let et=0;et<V.length;et++){const Tt=V[et];Ft?C&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,0,0,Et,at,Tt.image[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,Pt,Et,at,Tt.image[q])}}}h(M)&&u(i.TEXTURE_CUBE_MAP),j.__version=Z.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function J(A,M,H,K,Z,j){const vt=s.convert(H.format,H.colorSpace),it=s.convert(H.type),rt=E(H.internalFormat,vt,it,H.colorSpace);if(!n.get(M).__hasExternalTextures){const Q=Math.max(1,M.width>>j),mt=Math.max(1,M.height>>j);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?e.texImage3D(Z,j,rt,Q,mt,M.depth,0,vt,it,null):e.texImage2D(Z,j,rt,Q,mt,0,vt,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),Ht(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,n.get(H).__webglTexture,0,Mt(M)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,n.get(H).__webglTexture,j),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ht(A,M,H){if(i.bindRenderbuffer(i.RENDERBUFFER,A),M.depthBuffer){const K=M.depthTexture,Z=K&&K.isDepthTexture?K.type:null,j=y(M.stencilBuffer,Z),vt=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=Mt(M);Ht(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,j,M.width,M.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,it,j,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,j,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,vt,i.RENDERBUFFER,A)}else{const K=M.textures;for(let Z=0;Z<K.length;Z++){const j=K[Z],vt=s.convert(j.format,j.colorSpace),it=s.convert(j.type),rt=E(j.internalFormat,vt,it,j.colorSpace),Rt=Mt(M);H&&Ht(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,rt,M.width,M.height):Ht(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt,rt,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,rt,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function st(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),X(M.depthTexture,0);const K=n.get(M.depthTexture).__webglTexture,Z=Mt(M);if(M.depthTexture.format===Pi)Ht(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(M.depthTexture.format===Hi)Ht(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Lt(A){const M=n.get(A),H=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");st(M.__webglFramebuffer,A)}else if(H){M.__webglDepthbuffer=[];for(let K=0;K<6;K++)e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[K]),M.__webglDepthbuffer[K]=i.createRenderbuffer(),ht(M.__webglDepthbuffer[K],A,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),ht(M.__webglDepthbuffer,A,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ct(A,M,H){const K=n.get(A);M!==void 0&&J(K.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Lt(A)}function Bt(A){const M=A.texture,H=n.get(A),K=n.get(M);A.addEventListener("dispose",R);const Z=A.textures,j=A.isWebGLCubeRenderTarget===!0,vt=Z.length>1;if(vt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=M.version,a.memory.textures++),j){H.__webglFramebuffer=[];for(let it=0;it<6;it++)if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[it]=[];for(let rt=0;rt<M.mipmaps.length;rt++)H.__webglFramebuffer[it][rt]=i.createFramebuffer()}else H.__webglFramebuffer[it]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let it=0;it<M.mipmaps.length;it++)H.__webglFramebuffer[it]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(vt)for(let it=0,rt=Z.length;it<rt;it++){const Rt=n.get(Z[it]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&Ht(A)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let it=0;it<Z.length;it++){const rt=Z[it];H.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[it]);const Rt=s.convert(rt.format,rt.colorSpace),Q=s.convert(rt.type),mt=E(rt.internalFormat,Rt,Q,rt.colorSpace,A.isXRRenderTarget===!0),Ut=Mt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut,mt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,H.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),ht(H.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),ut(i.TEXTURE_CUBE_MAP,M);for(let it=0;it<6;it++)if(M.mipmaps&&M.mipmaps.length>0)for(let rt=0;rt<M.mipmaps.length;rt++)J(H.__webglFramebuffer[it][rt],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,rt);else J(H.__webglFramebuffer[it],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);h(M)&&u(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let it=0,rt=Z.length;it<rt;it++){const Rt=Z[it],Q=n.get(Rt);e.bindTexture(i.TEXTURE_2D,Q.__webglTexture),ut(i.TEXTURE_2D,Rt),J(H.__webglFramebuffer,A,Rt,i.COLOR_ATTACHMENT0+it,i.TEXTURE_2D,0),h(Rt)&&u(i.TEXTURE_2D)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(it=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,K.__webglTexture),ut(it,M),M.mipmaps&&M.mipmaps.length>0)for(let rt=0;rt<M.mipmaps.length;rt++)J(H.__webglFramebuffer[rt],A,M,i.COLOR_ATTACHMENT0,it,rt);else J(H.__webglFramebuffer,A,M,i.COLOR_ATTACHMENT0,it,0);h(M)&&u(it),e.unbindTexture()}A.depthBuffer&&Lt(A)}function P(A){const M=A.textures;for(let H=0,K=M.length;H<K;H++){const Z=M[H];if(h(Z)){const j=A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,vt=n.get(Z).__webglTexture;e.bindTexture(j,vt),u(j),e.unbindTexture()}}}const Ot=[],Nt=[];function Zt(A){if(A.samples>0){if(Ht(A)===!1){const M=A.textures,H=A.width,K=A.height;let Z=i.COLOR_BUFFER_BIT;const j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=n.get(A),it=M.length>1;if(it)for(let rt=0;rt<M.length;rt++)e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let rt=0;rt<M.length;rt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,vt.__webglColorRenderbuffer[rt]);const Rt=n.get(M[rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Rt,0)}i.blitFramebuffer(0,0,H,K,0,0,H,K,Z,i.NEAREST),l===!0&&(Ot.length=0,Nt.length=0,Ot.push(i.COLOR_ATTACHMENT0+rt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ot.push(j),Nt.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Nt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ot))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let rt=0;rt<M.length;rt++){e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,vt.__webglColorRenderbuffer[rt]);const Rt=n.get(M[rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,Rt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const M=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function Mt(A){return Math.min(r.maxSamples,A.samples)}function Ht(A){const M=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Dt(A){const M=a.render.frame;d.get(A)!==M&&(d.set(A,M),A.update())}function At(A,M){const H=A.colorSpace,K=A.format,Z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||H!==zn&&H!==wn&&(Xt.getTransfer(H)===Yt?(K!==Qe||Z!==On)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}function ee(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=b,this.setTexture2D=X,this.setTexture2DArray=$,this.setTexture3D=W,this.setTextureCube=Y,this.rebindTextures=Ct,this.setupRenderTarget=Bt,this.updateRenderTargetMipmap=P,this.updateMultisampleRenderTarget=Zt,this.setupDepthRenderbuffer=Lt,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Ht}function eg(i,t){function e(n,r=wn){let s;const a=Xt.getTransfer(r);if(n===On)return i.UNSIGNED_BYTE;if(n===Xl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===$l)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Fd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ud)return i.BYTE;if(n===Nd)return i.SHORT;if(n===Jr)return i.UNSIGNED_SHORT;if(n===Wl)return i.INT;if(n===Bi)return i.UNSIGNED_INT;if(n===Cn)return i.FLOAT;if(n===ds)return i.HALF_FLOAT;if(n===Od)return i.ALPHA;if(n===Bd)return i.RGB;if(n===Qe)return i.RGBA;if(n===zd)return i.LUMINANCE;if(n===Hd)return i.LUMINANCE_ALPHA;if(n===Pi)return i.DEPTH_COMPONENT;if(n===Hi)return i.DEPTH_STENCIL;if(n===kd)return i.RED;if(n===ql)return i.RED_INTEGER;if(n===Gd)return i.RG;if(n===Yl)return i.RG_INTEGER;if(n===Kl)return i.RGBA_INTEGER;if(n===Es||n===Ts||n===As||n===bs)if(a===Yt)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Es)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ts)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===As)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===bs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Es)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ts)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===As)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===bs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===no||n===io||n===ro||n===so)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===no)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===io)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ro)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===so)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ao||n===oo||n===lo)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ao||n===oo)return a===Yt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===lo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===co||n===uo||n===ho||n===fo||n===po||n===mo||n===go||n===_o||n===vo||n===xo||n===Mo||n===So||n===yo||n===Eo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===co)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===uo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ho)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===po)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===mo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===go)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===_o)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Mo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===So)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Eo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ws||n===To||n===Ao)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===ws)return a===Yt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===To)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ao)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vd||n===bo||n===wo||n===Co)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===ws)return s.COMPRESSED_RED_RGTC1_EXT;if(n===bo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Co)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class ng extends Fe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ri extends se{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ig={type:"move"};class ta{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const h=e.getJointPose(_,n),u=this._getHandJoint(c,_);h!==null&&(u.matrix.fromArray(h.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=h.radius),u.visible=h!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],p=d.position.distanceTo(f.position),m=.02,g=.005;c.inputState.pinching&&p>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ig)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ri;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const rg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ag{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new _e,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Xe({vertexShader:rg,fragmentShader:sg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ze(new ci(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class og extends Vi{constructor(t,e){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,f=null,p=null,m=null,g=null;const _=new ag,h=e.getContextAttributes();let u=null,E=null;const y=[],T=[],B=new zt;let R=null;const w=new Fe;w.layers.enable(1),w.viewport=new ue;const I=new Fe;I.layers.enable(2),I.viewport=new ue;const v=[w,I],x=new ng;x.layers.enable(1),x.layers.enable(2);let b=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let J=y[G];return J===void 0&&(J=new ta,y[G]=J),J.getTargetRaySpace()},this.getControllerGrip=function(G){let J=y[G];return J===void 0&&(J=new ta,y[G]=J),J.getGripSpace()},this.getHand=function(G){let J=y[G];return J===void 0&&(J=new ta,y[G]=J),J.getHandSpace()};function F(G){const J=T.indexOf(G.inputSource);if(J===-1)return;const ht=y[J];ht!==void 0&&(ht.update(G.inputSource,G.frame,c||a),ht.dispatchEvent({type:G.type,data:G.inputSource}))}function X(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",$);for(let G=0;G<y.length;G++){const J=T[G];J!==null&&(T[G]=null,y[G].disconnect(J))}b=null,z=null,_.reset(),t.setRenderTarget(u),m=null,p=null,f=null,r=null,E=null,Gt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(B.width,B.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(u=t.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",X),r.addEventListener("inputsourceschange",$),h.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(B),r.renderState.layers===void 0){const J={antialias:h.antialias,alpha:!0,depth:h.depth,stencil:h.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,e,J),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new ni(m.framebufferWidth,m.framebufferHeight,{format:Qe,type:On,colorSpace:t.outputColorSpace,stencilBuffer:h.stencil})}else{let J=null,ht=null,st=null;h.depth&&(st=h.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,J=h.stencil?Hi:Pi,ht=h.stencil?zi:Bi);const Lt={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:s};f=new XRWebGLBinding(r,e),p=f.createProjectionLayer(Lt),r.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),E=new ni(p.textureWidth,p.textureHeight,{format:Qe,type:On,depthTexture:new cc(p.textureWidth,p.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:h.stencil,colorSpace:t.outputColorSpace,samples:h.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Gt.setContext(r),Gt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function $(G){for(let J=0;J<G.removed.length;J++){const ht=G.removed[J],st=T.indexOf(ht);st>=0&&(T[st]=null,y[st].disconnect(ht))}for(let J=0;J<G.added.length;J++){const ht=G.added[J];let st=T.indexOf(ht);if(st===-1){for(let Ct=0;Ct<y.length;Ct++)if(Ct>=T.length){T.push(ht),st=Ct;break}else if(T[Ct]===null){T[Ct]=ht,st=Ct;break}if(st===-1)break}const Lt=y[st];Lt&&Lt.connect(ht)}}const W=new L,Y=new L;function k(G,J,ht){W.setFromMatrixPosition(J.matrixWorld),Y.setFromMatrixPosition(ht.matrixWorld);const st=W.distanceTo(Y),Lt=J.projectionMatrix.elements,Ct=ht.projectionMatrix.elements,Bt=Lt[14]/(Lt[10]-1),P=Lt[14]/(Lt[10]+1),Ot=(Lt[9]+1)/Lt[5],Nt=(Lt[9]-1)/Lt[5],Zt=(Lt[8]-1)/Lt[0],Mt=(Ct[8]+1)/Ct[0],Ht=Bt*Zt,Dt=Bt*Mt,At=st/(-Zt+Mt),ee=At*-Zt;J.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(ee),G.translateZ(At),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();const A=Bt+At,M=P+At,H=Ht-ee,K=Dt+(st-ee),Z=Ot*P/M*A,j=Nt*P/M*A;G.projectionMatrix.makePerspective(H,K,Z,j,A,M),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function dt(G,J){J===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(J.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;_.texture!==null&&(G.near=_.depthNear,G.far=_.depthFar),x.near=I.near=w.near=G.near,x.far=I.far=w.far=G.far,(b!==x.near||z!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),b=x.near,z=x.far,w.near=b,w.far=z,I.near=b,I.far=z,w.updateProjectionMatrix(),I.updateProjectionMatrix(),G.updateProjectionMatrix());const J=G.parent,ht=x.cameras;dt(x,J);for(let st=0;st<ht.length;st++)dt(ht[st],J);ht.length===2?k(x,w,I):x.projectionMatrix.copy(w.projectionMatrix),ct(G,x,J)};function ct(G,J,ht){ht===null?G.matrix.copy(J.matrixWorld):(G.matrix.copy(ht.matrixWorld),G.matrix.invert(),G.matrix.multiply(J.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(J.projectionMatrix),G.projectionMatrixInverse.copy(J.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=fa*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(p===null&&m===null))return l},this.setFoveation=function(G){l=G,p!==null&&(p.fixedFoveation=G),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=G)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let ut=null;function It(G,J){if(d=J.getViewerPose(c||a),g=J,d!==null){const ht=d.views;m!==null&&(t.setRenderTargetFramebuffer(E,m.framebuffer),t.setRenderTarget(E));let st=!1;ht.length!==x.cameras.length&&(x.cameras.length=0,st=!0);for(let Ct=0;Ct<ht.length;Ct++){const Bt=ht[Ct];let P=null;if(m!==null)P=m.getViewport(Bt);else{const Nt=f.getViewSubImage(p,Bt);P=Nt.viewport,Ct===0&&(t.setRenderTargetTextures(E,Nt.colorTexture,p.ignoreDepthValues?void 0:Nt.depthStencilTexture),t.setRenderTarget(E))}let Ot=v[Ct];Ot===void 0&&(Ot=new Fe,Ot.layers.enable(Ct),Ot.viewport=new ue,v[Ct]=Ot),Ot.matrix.fromArray(Bt.transform.matrix),Ot.matrix.decompose(Ot.position,Ot.quaternion,Ot.scale),Ot.projectionMatrix.fromArray(Bt.projectionMatrix),Ot.projectionMatrixInverse.copy(Ot.projectionMatrix).invert(),Ot.viewport.set(P.x,P.y,P.width,P.height),Ct===0&&(x.matrix.copy(Ot.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),st===!0&&x.cameras.push(Ot)}const Lt=r.enabledFeatures;if(Lt&&Lt.includes("depth-sensing")){const Ct=f.getDepthInformation(ht[0]);Ct&&Ct.isValid&&Ct.texture&&_.init(t,Ct,r.renderState)}}for(let ht=0;ht<y.length;ht++){const st=T[ht],Lt=y[ht];st!==null&&Lt!==void 0&&Lt.update(st,J,c||a)}ut&&ut(G,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const Gt=new lc;Gt.setAnimationLoop(It),this.setAnimationLoop=function(G){ut=G},this.dispose=function(){}}}const qn=new gn,lg=new Kt;function cg(i,t){function e(h,u){h.matrixAutoUpdate===!0&&h.updateMatrix(),u.value.copy(h.matrix)}function n(h,u){u.color.getRGB(h.fogColor.value,sc(i)),u.isFog?(h.fogNear.value=u.near,h.fogFar.value=u.far):u.isFogExp2&&(h.fogDensity.value=u.density)}function r(h,u,E,y,T){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(h,u):u.isMeshToonMaterial?(s(h,u),f(h,u)):u.isMeshPhongMaterial?(s(h,u),d(h,u)):u.isMeshStandardMaterial?(s(h,u),p(h,u),u.isMeshPhysicalMaterial&&m(h,u,T)):u.isMeshMatcapMaterial?(s(h,u),g(h,u)):u.isMeshDepthMaterial?s(h,u):u.isMeshDistanceMaterial?(s(h,u),_(h,u)):u.isMeshNormalMaterial?s(h,u):u.isLineBasicMaterial?(a(h,u),u.isLineDashedMaterial&&o(h,u)):u.isPointsMaterial?l(h,u,E,y):u.isSpriteMaterial?c(h,u):u.isShadowMaterial?(h.color.value.copy(u.color),h.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(h,u){h.opacity.value=u.opacity,u.color&&h.diffuse.value.copy(u.color),u.emissive&&h.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(h.map.value=u.map,e(u.map,h.mapTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,e(u.alphaMap,h.alphaMapTransform)),u.bumpMap&&(h.bumpMap.value=u.bumpMap,e(u.bumpMap,h.bumpMapTransform),h.bumpScale.value=u.bumpScale,u.side===ye&&(h.bumpScale.value*=-1)),u.normalMap&&(h.normalMap.value=u.normalMap,e(u.normalMap,h.normalMapTransform),h.normalScale.value.copy(u.normalScale),u.side===ye&&h.normalScale.value.negate()),u.displacementMap&&(h.displacementMap.value=u.displacementMap,e(u.displacementMap,h.displacementMapTransform),h.displacementScale.value=u.displacementScale,h.displacementBias.value=u.displacementBias),u.emissiveMap&&(h.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,h.emissiveMapTransform)),u.specularMap&&(h.specularMap.value=u.specularMap,e(u.specularMap,h.specularMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest);const E=t.get(u),y=E.envMap,T=E.envMapRotation;y&&(h.envMap.value=y,qn.copy(T),qn.x*=-1,qn.y*=-1,qn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(qn.y*=-1,qn.z*=-1),h.envMapRotation.value.setFromMatrix4(lg.makeRotationFromEuler(qn)),h.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.reflectivity.value=u.reflectivity,h.ior.value=u.ior,h.refractionRatio.value=u.refractionRatio),u.lightMap&&(h.lightMap.value=u.lightMap,h.lightMapIntensity.value=u.lightMapIntensity,e(u.lightMap,h.lightMapTransform)),u.aoMap&&(h.aoMap.value=u.aoMap,h.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,h.aoMapTransform))}function a(h,u){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,u.map&&(h.map.value=u.map,e(u.map,h.mapTransform))}function o(h,u){h.dashSize.value=u.dashSize,h.totalSize.value=u.dashSize+u.gapSize,h.scale.value=u.scale}function l(h,u,E,y){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,h.size.value=u.size*E,h.scale.value=y*.5,u.map&&(h.map.value=u.map,e(u.map,h.uvTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,e(u.alphaMap,h.alphaMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest)}function c(h,u){h.diffuse.value.copy(u.color),h.opacity.value=u.opacity,h.rotation.value=u.rotation,u.map&&(h.map.value=u.map,e(u.map,h.mapTransform)),u.alphaMap&&(h.alphaMap.value=u.alphaMap,e(u.alphaMap,h.alphaMapTransform)),u.alphaTest>0&&(h.alphaTest.value=u.alphaTest)}function d(h,u){h.specular.value.copy(u.specular),h.shininess.value=Math.max(u.shininess,1e-4)}function f(h,u){u.gradientMap&&(h.gradientMap.value=u.gradientMap)}function p(h,u){h.metalness.value=u.metalness,u.metalnessMap&&(h.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,h.metalnessMapTransform)),h.roughness.value=u.roughness,u.roughnessMap&&(h.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,h.roughnessMapTransform)),u.envMap&&(h.envMapIntensity.value=u.envMapIntensity)}function m(h,u,E){h.ior.value=u.ior,u.sheen>0&&(h.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),h.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(h.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,h.sheenColorMapTransform)),u.sheenRoughnessMap&&(h.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,h.sheenRoughnessMapTransform))),u.clearcoat>0&&(h.clearcoat.value=u.clearcoat,h.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(h.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,h.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(h.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===ye&&h.clearcoatNormalScale.value.negate())),u.dispersion>0&&(h.dispersion.value=u.dispersion),u.iridescence>0&&(h.iridescence.value=u.iridescence,h.iridescenceIOR.value=u.iridescenceIOR,h.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],h.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(h.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,h.iridescenceMapTransform)),u.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),u.transmission>0&&(h.transmission.value=u.transmission,h.transmissionSamplerMap.value=E.texture,h.transmissionSamplerSize.value.set(E.width,E.height),u.transmissionMap&&(h.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,h.transmissionMapTransform)),h.thickness.value=u.thickness,u.thicknessMap&&(h.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=u.attenuationDistance,h.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(h.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(h.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=u.specularIntensity,h.specularColor.value.copy(u.specularColor),u.specularColorMap&&(h.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,h.specularColorMapTransform)),u.specularIntensityMap&&(h.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,h.specularIntensityMapTransform))}function g(h,u){u.matcap&&(h.matcap.value=u.matcap)}function _(h,u){const E=t.get(u).light;h.referencePosition.value.setFromMatrixPosition(E.matrixWorld),h.nearDistance.value=E.shadow.camera.near,h.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function dg(i,t,e,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,y){const T=y.program;n.uniformBlockBinding(E,T)}function c(E,y){let T=r[E.id];T===void 0&&(g(E),T=d(E),r[E.id]=T,E.addEventListener("dispose",h));const B=y.program;n.updateUBOMapping(E,B);const R=t.render.frame;s[E.id]!==R&&(p(E),s[E.id]=R)}function d(E){const y=f();E.__bindingPointIndex=y;const T=i.createBuffer(),B=E.__size,R=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,B,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,T),T}function f(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(E){const y=r[E.id],T=E.uniforms,B=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let R=0,w=T.length;R<w;R++){const I=Array.isArray(T[R])?T[R]:[T[R]];for(let v=0,x=I.length;v<x;v++){const b=I[v];if(m(b,R,v,B)===!0){const z=b.__offset,F=Array.isArray(b.value)?b.value:[b.value];let X=0;for(let $=0;$<F.length;$++){const W=F[$],Y=_(W);typeof W=="number"||typeof W=="boolean"?(b.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,z+X,b.__data)):W.isMatrix3?(b.__data[0]=W.elements[0],b.__data[1]=W.elements[1],b.__data[2]=W.elements[2],b.__data[3]=0,b.__data[4]=W.elements[3],b.__data[5]=W.elements[4],b.__data[6]=W.elements[5],b.__data[7]=0,b.__data[8]=W.elements[6],b.__data[9]=W.elements[7],b.__data[10]=W.elements[8],b.__data[11]=0):(W.toArray(b.__data,X),X+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,b.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(E,y,T,B){const R=E.value,w=y+"_"+T;if(B[w]===void 0)return typeof R=="number"||typeof R=="boolean"?B[w]=R:B[w]=R.clone(),!0;{const I=B[w];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return B[w]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function g(E){const y=E.uniforms;let T=0;const B=16;for(let w=0,I=y.length;w<I;w++){const v=Array.isArray(y[w])?y[w]:[y[w]];for(let x=0,b=v.length;x<b;x++){const z=v[x],F=Array.isArray(z.value)?z.value:[z.value];for(let X=0,$=F.length;X<$;X++){const W=F[X],Y=_(W),k=T%B;k!==0&&B-k<Y.boundary&&(T+=B-k),z.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=T,T+=Y.storage}}}const R=T%B;return R>0&&(T+=B-R),E.__size=T,E.__cache={},this}function _(E){const y={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(y.boundary=4,y.storage=4):E.isVector2?(y.boundary=8,y.storage=8):E.isVector3||E.isColor?(y.boundary=16,y.storage=12):E.isVector4?(y.boundary=16,y.storage=16):E.isMatrix3?(y.boundary=48,y.storage=48):E.isMatrix4?(y.boundary=64,y.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),y}function h(E){const y=E.target;y.removeEventListener("dispose",h);const T=a.indexOf(y.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function u(){for(const E in r)i.deleteBuffer(r[E]);a=[],r={},s={}}return{bind:l,update:c,dispose:u}}class ug{constructor(t={}){const{canvas:e=nu(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,h=null;const u=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ze,this.toneMapping=In,this.toneMappingExposure=1;const y=this;let T=!1,B=0,R=0,w=null,I=-1,v=null;const x=new ue,b=new ue;let z=null;const F=new _t(0);let X=0,$=e.width,W=e.height,Y=1,k=null,dt=null;const ct=new ue(0,0,$,W),ut=new ue(0,0,$,W);let It=!1;const Gt=new Pa;let G=!1,J=!1;const ht=new Kt,st=new L,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ct=!1;function Bt(){return w===null?Y:1}let P=n;function Ot(S,D){return e.getContext(S,D)}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ba}`),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",V,!1),e.addEventListener("webglcontextcreationerror",q,!1),P===null){const D="webgl2";if(P=Ot(D,S),P===null)throw Ot(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Nt,Zt,Mt,Ht,Dt,At,ee,A,M,H,K,Z,j,vt,it,rt,Rt,Q,mt,Ut,Et,at,Pt,Ft;function Qt(){Nt=new xp(P),Nt.init(),at=new eg(P,Nt),Zt=new fp(P,Nt,t,at),Mt=new Qm(P),Ht=new yp(P),Dt=new zm,At=new tg(P,Nt,Mt,Dt,Zt,at,Ht),ee=new mp(y),A=new vp(y),M=new Cu(P),Pt=new up(P,M),H=new Mp(P,M,Ht,Pt),K=new Tp(P,H,M,Ht),mt=new Ep(P,Zt,At),rt=new pp(Dt),Z=new Bm(y,ee,A,Nt,Zt,Pt,rt),j=new cg(y,Dt),vt=new km,it=new qm(Nt),Q=new dp(y,ee,A,Mt,K,p,l),Rt=new Jm(y,K,Zt),Ft=new dg(P,Ht,Zt,Mt),Ut=new hp(P,Nt,Ht),Et=new Sp(P,Nt,Ht),Ht.programs=Z.programs,y.capabilities=Zt,y.extensions=Nt,y.properties=Dt,y.renderLists=vt,y.shadowMap=Rt,y.state=Mt,y.info=Ht}Qt();const C=new og(y,P);this.xr=C,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const S=Nt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Nt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(S){S!==void 0&&(Y=S,this.setSize($,W,!1))},this.getSize=function(S){return S.set($,W)},this.setSize=function(S,D,N=!0){if(C.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=S,W=D,e.width=Math.floor(S*Y),e.height=Math.floor(D*Y),N===!0&&(e.style.width=S+"px",e.style.height=D+"px"),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set($*Y,W*Y).floor()},this.setDrawingBufferSize=function(S,D,N){$=S,W=D,Y=N,e.width=Math.floor(S*N),e.height=Math.floor(D*N),this.setViewport(0,0,S,D)},this.getCurrentViewport=function(S){return S.copy(x)},this.getViewport=function(S){return S.copy(ct)},this.setViewport=function(S,D,N,O){S.isVector4?ct.set(S.x,S.y,S.z,S.w):ct.set(S,D,N,O),Mt.viewport(x.copy(ct).multiplyScalar(Y).round())},this.getScissor=function(S){return S.copy(ut)},this.setScissor=function(S,D,N,O){S.isVector4?ut.set(S.x,S.y,S.z,S.w):ut.set(S,D,N,O),Mt.scissor(b.copy(ut).multiplyScalar(Y).round())},this.getScissorTest=function(){return It},this.setScissorTest=function(S){Mt.setScissorTest(It=S)},this.setOpaqueSort=function(S){k=S},this.setTransparentSort=function(S){dt=S},this.getClearColor=function(S){return S.copy(Q.getClearColor())},this.setClearColor=function(){Q.setClearColor.apply(Q,arguments)},this.getClearAlpha=function(){return Q.getClearAlpha()},this.setClearAlpha=function(){Q.setClearAlpha.apply(Q,arguments)},this.clear=function(S=!0,D=!0,N=!0){let O=0;if(S){let U=!1;if(w!==null){const tt=w.texture.format;U=tt===Kl||tt===Yl||tt===ql}if(U){const tt=w.texture.type,lt=tt===On||tt===Bi||tt===Jr||tt===zi||tt===Xl||tt===$l,ft=Q.getClearColor(),pt=Q.getClearAlpha(),St=ft.r,yt=ft.g,xt=ft.b;lt?(m[0]=St,m[1]=yt,m[2]=xt,m[3]=pt,P.clearBufferuiv(P.COLOR,0,m)):(g[0]=St,g[1]=yt,g[2]=xt,g[3]=pt,P.clearBufferiv(P.COLOR,0,g))}else O|=P.COLOR_BUFFER_BIT}D&&(O|=P.DEPTH_BUFFER_BIT),N&&(O|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",V,!1),e.removeEventListener("webglcontextcreationerror",q,!1),vt.dispose(),it.dispose(),Dt.dispose(),ee.dispose(),A.dispose(),K.dispose(),Pt.dispose(),Ft.dispose(),Z.dispose(),C.dispose(),C.removeEventListener("sessionstart",qe),C.removeEventListener("sessionend",Ye),Hn.stop()};function ot(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function V(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const S=Ht.autoReset,D=Rt.enabled,N=Rt.autoUpdate,O=Rt.needsUpdate,U=Rt.type;Qt(),Ht.autoReset=S,Rt.enabled=D,Rt.autoUpdate=N,Rt.needsUpdate=O,Rt.type=U}function q(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function et(S){const D=S.target;D.removeEventListener("dispose",et),Tt(D)}function Tt(S){kt(S),Dt.remove(S)}function kt(S){const D=Dt.get(S).programs;D!==void 0&&(D.forEach(function(N){Z.releaseProgram(N)}),S.isShaderMaterial&&Z.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,N,O,U,tt){D===null&&(D=Lt);const lt=U.isMesh&&U.matrixWorld.determinant()<0,ft=$c(S,D,N,O,U);Mt.setMaterial(O,lt);let pt=N.index,St=1;if(O.wireframe===!0){if(pt=H.getWireframeAttribute(N),pt===void 0)return;St=2}const yt=N.drawRange,xt=N.attributes.position;let Vt=yt.start*St,jt=(yt.start+yt.count)*St;tt!==null&&(Vt=Math.max(Vt,tt.start*St),jt=Math.min(jt,(tt.start+tt.count)*St)),pt!==null?(Vt=Math.max(Vt,0),jt=Math.min(jt,pt.count)):xt!=null&&(Vt=Math.max(Vt,0),jt=Math.min(jt,xt.count));const Jt=jt-Vt;if(Jt<0||Jt===1/0)return;Pt.setup(U,O,ft,N,pt);let Te,Wt=Ut;if(pt!==null&&(Te=M.get(pt),Wt=Et,Wt.setIndex(Te)),U.isMesh)O.wireframe===!0?(Mt.setLineWidth(O.wireframeLinewidth*Bt()),Wt.setMode(P.LINES)):Wt.setMode(P.TRIANGLES);else if(U.isLine){let gt=O.linewidth;gt===void 0&&(gt=1),Mt.setLineWidth(gt*Bt()),U.isLineSegments?Wt.setMode(P.LINES):U.isLineLoop?Wt.setMode(P.LINE_LOOP):Wt.setMode(P.LINE_STRIP)}else U.isPoints?Wt.setMode(P.POINTS):U.isSprite&&Wt.setMode(P.TRIANGLES);if(U.isBatchedMesh)U._multiDrawInstances!==null?Wt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances):Wt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else if(U.isInstancedMesh)Wt.renderInstances(Vt,Jt,U.count);else if(N.isInstancedBufferGeometry){const gt=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,me=Math.min(N.instanceCount,gt);Wt.renderInstances(Vt,Jt,me)}else Wt.render(Vt,Jt)};function te(S,D,N){S.transparent===!0&&S.side===Oe&&S.forceSinglePass===!1?(S.side=ye,S.needsUpdate=!0,vr(S,D,N),S.side=Fn,S.needsUpdate=!0,vr(S,D,N),S.side=Oe):vr(S,D,N)}this.compile=function(S,D,N=null){N===null&&(N=S),h=it.get(N),h.init(D),E.push(h),N.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(h.pushLight(U),U.castShadow&&h.pushShadow(U))}),S!==N&&S.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(h.pushLight(U),U.castShadow&&h.pushShadow(U))}),h.setupLights();const O=new Set;return S.traverse(function(U){const tt=U.material;if(tt)if(Array.isArray(tt))for(let lt=0;lt<tt.length;lt++){const ft=tt[lt];te(ft,N,U),O.add(ft)}else te(tt,N,U),O.add(tt)}),E.pop(),h=null,O},this.compileAsync=function(S,D,N=null){const O=this.compile(S,D,N);return new Promise(U=>{function tt(){if(O.forEach(function(lt){Dt.get(lt).currentProgram.isReady()&&O.delete(lt)}),O.size===0){U(S);return}setTimeout(tt,10)}Nt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let le=null;function $t(S){le&&le(S)}function qe(){Hn.stop()}function Ye(){Hn.start()}const Hn=new lc;Hn.setAnimationLoop($t),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(S){le=S,C.setAnimationLoop(S),S===null?Hn.stop():Hn.start()},C.addEventListener("sessionstart",qe),C.addEventListener("sessionend",Ye),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),C.enabled===!0&&C.isPresenting===!0&&(C.cameraAutoUpdate===!0&&C.updateCamera(D),D=C.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,D,w),h=it.get(S,E.length),h.init(D),E.push(h),ht.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Gt.setFromProjectionMatrix(ht),J=this.localClippingEnabled,G=rt.init(this.clippingPlanes,J),_=vt.get(S,u.length),_.init(),u.push(_),C.enabled===!0&&C.isPresenting===!0){const tt=y.xr.getDepthSensingMesh();tt!==null&&vs(tt,D,-1/0,y.sortObjects)}vs(S,D,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(k,dt),Ct=C.enabled===!1||C.isPresenting===!1||C.hasDepthSensing()===!1,Ct&&Q.addToRenderList(_,S),this.info.render.frame++,G===!0&&rt.beginShadows();const N=h.state.shadowsArray;Rt.render(N,S,D),G===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=_.opaque,U=_.transmissive;if(h.setupLights(),D.isArrayCamera){const tt=D.cameras;if(U.length>0)for(let lt=0,ft=tt.length;lt<ft;lt++){const pt=tt[lt];qa(O,U,S,pt)}Ct&&Q.render(S);for(let lt=0,ft=tt.length;lt<ft;lt++){const pt=tt[lt];$a(_,S,pt,pt.viewport)}}else U.length>0&&qa(O,U,S,D),Ct&&Q.render(S),$a(_,S,D);w!==null&&(At.updateMultisampleRenderTarget(w),At.updateRenderTargetMipmap(w)),S.isScene===!0&&S.onAfterRender(y,S,D),Pt.resetDefaultState(),I=-1,v=null,E.pop(),E.length>0?(h=E[E.length-1],G===!0&&rt.setGlobalState(y.clippingPlanes,h.state.camera)):h=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function vs(S,D,N,O){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)N=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)h.pushLight(S),S.castShadow&&h.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Gt.intersectsSprite(S)){O&&st.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ht);const lt=K.update(S),ft=S.material;ft.visible&&_.push(S,lt,ft,N,st.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Gt.intersectsObject(S))){const lt=K.update(S),ft=S.material;if(O&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),st.copy(S.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),st.copy(lt.boundingSphere.center)),st.applyMatrix4(S.matrixWorld).applyMatrix4(ht)),Array.isArray(ft)){const pt=lt.groups;for(let St=0,yt=pt.length;St<yt;St++){const xt=pt[St],Vt=ft[xt.materialIndex];Vt&&Vt.visible&&_.push(S,lt,Vt,N,st.z,xt)}}else ft.visible&&_.push(S,lt,ft,N,st.z,null)}}const tt=S.children;for(let lt=0,ft=tt.length;lt<ft;lt++)vs(tt[lt],D,N,O)}function $a(S,D,N,O){const U=S.opaque,tt=S.transmissive,lt=S.transparent;h.setupLightsView(N),G===!0&&rt.setGlobalState(y.clippingPlanes,N),O&&Mt.viewport(x.copy(O)),U.length>0&&_r(U,D,N),tt.length>0&&_r(tt,D,N),lt.length>0&&_r(lt,D,N),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function qa(S,D,N,O){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[O.id]===void 0&&(h.state.transmissionRenderTarget[O.id]=new ni(1,1,{generateMipmaps:!0,type:Nt.has("EXT_color_buffer_half_float")||Nt.has("EXT_color_buffer_float")?ds:On,minFilter:ti,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));const tt=h.state.transmissionRenderTarget[O.id],lt=O.viewport||x;tt.setSize(lt.z,lt.w);const ft=y.getRenderTarget();y.setRenderTarget(tt),y.getClearColor(F),X=y.getClearAlpha(),X<1&&y.setClearColor(16777215,.5),Ct?Q.render(N):y.clear();const pt=y.toneMapping;y.toneMapping=In;const St=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),h.setupLightsView(O),G===!0&&rt.setGlobalState(y.clippingPlanes,O),_r(S,N,O),At.updateMultisampleRenderTarget(tt),At.updateRenderTargetMipmap(tt),Nt.has("WEBGL_multisampled_render_to_texture")===!1){let yt=!1;for(let xt=0,Vt=D.length;xt<Vt;xt++){const jt=D[xt],Jt=jt.object,Te=jt.geometry,Wt=jt.material,gt=jt.group;if(Wt.side===Oe&&Jt.layers.test(O.layers)){const me=Wt.side;Wt.side=ye,Wt.needsUpdate=!0,Ya(Jt,N,O,Te,Wt,gt),Wt.side=me,Wt.needsUpdate=!0,yt=!0}}yt===!0&&(At.updateMultisampleRenderTarget(tt),At.updateRenderTargetMipmap(tt))}y.setRenderTarget(ft),y.setClearColor(F,X),St!==void 0&&(O.viewport=St),y.toneMapping=pt}function _r(S,D,N){const O=D.isScene===!0?D.overrideMaterial:null;for(let U=0,tt=S.length;U<tt;U++){const lt=S[U],ft=lt.object,pt=lt.geometry,St=O===null?lt.material:O,yt=lt.group;ft.layers.test(N.layers)&&Ya(ft,D,N,pt,St,yt)}}function Ya(S,D,N,O,U,tt){S.onBeforeRender(y,D,N,O,U,tt),S.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(y,D,N,O,S,tt),U.transparent===!0&&U.side===Oe&&U.forceSinglePass===!1?(U.side=ye,U.needsUpdate=!0,y.renderBufferDirect(N,D,O,U,S,tt),U.side=Fn,U.needsUpdate=!0,y.renderBufferDirect(N,D,O,U,S,tt),U.side=Oe):y.renderBufferDirect(N,D,O,U,S,tt),S.onAfterRender(y,D,N,O,U,tt)}function vr(S,D,N){D.isScene!==!0&&(D=Lt);const O=Dt.get(S),U=h.state.lights,tt=h.state.shadowsArray,lt=U.state.version,ft=Z.getParameters(S,U.state,tt,D,N),pt=Z.getProgramCacheKey(ft);let St=O.programs;O.environment=S.isMeshStandardMaterial?D.environment:null,O.fog=D.fog,O.envMap=(S.isMeshStandardMaterial?A:ee).get(S.envMap||O.environment),O.envMapRotation=O.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,St===void 0&&(S.addEventListener("dispose",et),St=new Map,O.programs=St);let yt=St.get(pt);if(yt!==void 0){if(O.currentProgram===yt&&O.lightsStateVersion===lt)return Za(S,ft),yt}else ft.uniforms=Z.getUniforms(S),S.onBuild(N,ft,y),S.onBeforeCompile(ft,y),yt=Z.acquireProgram(ft,pt),St.set(pt,yt),O.uniforms=ft.uniforms;const xt=O.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(xt.clippingPlanes=rt.uniform),Za(S,ft),O.needsLights=Yc(S),O.lightsStateVersion=lt,O.needsLights&&(xt.ambientLightColor.value=U.state.ambient,xt.lightProbe.value=U.state.probe,xt.directionalLights.value=U.state.directional,xt.directionalLightShadows.value=U.state.directionalShadow,xt.spotLights.value=U.state.spot,xt.spotLightShadows.value=U.state.spotShadow,xt.rectAreaLights.value=U.state.rectArea,xt.ltc_1.value=U.state.rectAreaLTC1,xt.ltc_2.value=U.state.rectAreaLTC2,xt.pointLights.value=U.state.point,xt.pointLightShadows.value=U.state.pointShadow,xt.hemisphereLights.value=U.state.hemi,xt.directionalShadowMap.value=U.state.directionalShadowMap,xt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,xt.spotShadowMap.value=U.state.spotShadowMap,xt.spotLightMatrix.value=U.state.spotLightMatrix,xt.spotLightMap.value=U.state.spotLightMap,xt.pointShadowMap.value=U.state.pointShadowMap,xt.pointShadowMatrix.value=U.state.pointShadowMatrix),O.currentProgram=yt,O.uniformsList=null,yt}function Ka(S){if(S.uniformsList===null){const D=S.currentProgram.getUniforms();S.uniformsList=$r.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function Za(S,D){const N=Dt.get(S);N.outputColorSpace=D.outputColorSpace,N.batching=D.batching,N.batchingColor=D.batchingColor,N.instancing=D.instancing,N.instancingColor=D.instancingColor,N.instancingMorph=D.instancingMorph,N.skinning=D.skinning,N.morphTargets=D.morphTargets,N.morphNormals=D.morphNormals,N.morphColors=D.morphColors,N.morphTargetsCount=D.morphTargetsCount,N.numClippingPlanes=D.numClippingPlanes,N.numIntersection=D.numClipIntersection,N.vertexAlphas=D.vertexAlphas,N.vertexTangents=D.vertexTangents,N.toneMapping=D.toneMapping}function $c(S,D,N,O,U){D.isScene!==!0&&(D=Lt),At.resetTextureUnits();const tt=D.fog,lt=O.isMeshStandardMaterial?D.environment:null,ft=w===null?y.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:zn,pt=(O.isMeshStandardMaterial?A:ee).get(O.envMap||lt),St=O.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,yt=!!N.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),xt=!!N.morphAttributes.position,Vt=!!N.morphAttributes.normal,jt=!!N.morphAttributes.color;let Jt=In;O.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Jt=y.toneMapping);const Te=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Wt=Te!==void 0?Te.length:0,gt=Dt.get(O),me=h.state.lights;if(G===!0&&(J===!0||S!==v)){const Le=S===v&&O.id===I;rt.setState(O,S,Le)}let qt=!1;O.version===gt.__version?(gt.needsLights&&gt.lightsStateVersion!==me.state.version||gt.outputColorSpace!==ft||U.isBatchedMesh&&gt.batching===!1||!U.isBatchedMesh&&gt.batching===!0||U.isBatchedMesh&&gt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&gt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&gt.instancing===!1||!U.isInstancedMesh&&gt.instancing===!0||U.isSkinnedMesh&&gt.skinning===!1||!U.isSkinnedMesh&&gt.skinning===!0||U.isInstancedMesh&&gt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&gt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&gt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&gt.instancingMorph===!1&&U.morphTexture!==null||gt.envMap!==pt||O.fog===!0&&gt.fog!==tt||gt.numClippingPlanes!==void 0&&(gt.numClippingPlanes!==rt.numPlanes||gt.numIntersection!==rt.numIntersection)||gt.vertexAlphas!==St||gt.vertexTangents!==yt||gt.morphTargets!==xt||gt.morphNormals!==Vt||gt.morphColors!==jt||gt.toneMapping!==Jt||gt.morphTargetsCount!==Wt)&&(qt=!0):(qt=!0,gt.__version=O.version);let rn=gt.currentProgram;qt===!0&&(rn=vr(O,D,U));let xr=!1,kn=!1,xs=!1;const ce=rn.getUniforms(),vn=gt.uniforms;if(Mt.useProgram(rn.program)&&(xr=!0,kn=!0,xs=!0),O.id!==I&&(I=O.id,kn=!0),xr||v!==S){ce.setValue(P,"projectionMatrix",S.projectionMatrix),ce.setValue(P,"viewMatrix",S.matrixWorldInverse);const Le=ce.map.cameraPosition;Le!==void 0&&Le.setValue(P,st.setFromMatrixPosition(S.matrixWorld)),Zt.logarithmicDepthBuffer&&ce.setValue(P,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&ce.setValue(P,"isOrthographic",S.isOrthographicCamera===!0),v!==S&&(v=S,kn=!0,xs=!0)}if(U.isSkinnedMesh){ce.setOptional(P,U,"bindMatrix"),ce.setOptional(P,U,"bindMatrixInverse");const Le=U.skeleton;Le&&(Le.boneTexture===null&&Le.computeBoneTexture(),ce.setValue(P,"boneTexture",Le.boneTexture,At))}U.isBatchedMesh&&(ce.setOptional(P,U,"batchingTexture"),ce.setValue(P,"batchingTexture",U._matricesTexture,At),ce.setOptional(P,U,"batchingColorTexture"),U._colorsTexture!==null&&ce.setValue(P,"batchingColorTexture",U._colorsTexture,At));const Ms=N.morphAttributes;if((Ms.position!==void 0||Ms.normal!==void 0||Ms.color!==void 0)&&mt.update(U,N,rn),(kn||gt.receiveShadow!==U.receiveShadow)&&(gt.receiveShadow=U.receiveShadow,ce.setValue(P,"receiveShadow",U.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(vn.envMap.value=pt,vn.flipEnvMap.value=pt.isCubeTexture&&pt.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&D.environment!==null&&(vn.envMapIntensity.value=D.environmentIntensity),kn&&(ce.setValue(P,"toneMappingExposure",y.toneMappingExposure),gt.needsLights&&qc(vn,xs),tt&&O.fog===!0&&j.refreshFogUniforms(vn,tt),j.refreshMaterialUniforms(vn,O,Y,W,h.state.transmissionRenderTarget[S.id]),$r.upload(P,Ka(gt),vn,At)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&($r.upload(P,Ka(gt),vn,At),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&ce.setValue(P,"center",U.center),ce.setValue(P,"modelViewMatrix",U.modelViewMatrix),ce.setValue(P,"normalMatrix",U.normalMatrix),ce.setValue(P,"modelMatrix",U.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Le=O.uniformsGroups;for(let Ss=0,Kc=Le.length;Ss<Kc;Ss++){const ja=Le[Ss];Ft.update(ja,rn),Ft.bind(ja,rn)}}return rn}function qc(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function Yc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(S,D,N){Dt.get(S.texture).__webglTexture=D,Dt.get(S.depthTexture).__webglTexture=N;const O=Dt.get(S);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=N===void 0,O.__autoAllocateDepthBuffer||Nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,D){const N=Dt.get(S);N.__webglFramebuffer=D,N.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,N=0){w=S,B=D,R=N;let O=!0,U=null,tt=!1,lt=!1;if(S){const pt=Dt.get(S);pt.__useDefaultFramebuffer!==void 0?(Mt.bindFramebuffer(P.FRAMEBUFFER,null),O=!1):pt.__webglFramebuffer===void 0?At.setupRenderTarget(S):pt.__hasExternalTextures&&At.rebindTextures(S,Dt.get(S.texture).__webglTexture,Dt.get(S.depthTexture).__webglTexture);const St=S.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(lt=!0);const yt=Dt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(yt[D])?U=yt[D][N]:U=yt[D],tt=!0):S.samples>0&&At.useMultisampledRTT(S)===!1?U=Dt.get(S).__webglMultisampledFramebuffer:Array.isArray(yt)?U=yt[N]:U=yt,x.copy(S.viewport),b.copy(S.scissor),z=S.scissorTest}else x.copy(ct).multiplyScalar(Y).floor(),b.copy(ut).multiplyScalar(Y).floor(),z=It;if(Mt.bindFramebuffer(P.FRAMEBUFFER,U)&&O&&Mt.drawBuffers(S,U),Mt.viewport(x),Mt.scissor(b),Mt.setScissorTest(z),tt){const pt=Dt.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+D,pt.__webglTexture,N)}else if(lt){const pt=Dt.get(S.texture),St=D||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,pt.__webglTexture,N||0,St)}I=-1},this.readRenderTargetPixels=function(S,D,N,O,U,tt,lt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=Dt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&lt!==void 0&&(ft=ft[lt]),ft){Mt.bindFramebuffer(P.FRAMEBUFFER,ft);try{const pt=S.texture,St=pt.format,yt=pt.type;if(!Zt.textureFormatReadable(St)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Zt.textureTypeReadable(yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-O&&N>=0&&N<=S.height-U&&P.readPixels(D,N,O,U,at.convert(St),at.convert(yt),tt)}finally{const pt=w!==null?Dt.get(w).__webglFramebuffer:null;Mt.bindFramebuffer(P.FRAMEBUFFER,pt)}}},this.readRenderTargetPixelsAsync=async function(S,D,N,O,U,tt,lt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=Dt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&lt!==void 0&&(ft=ft[lt]),ft){Mt.bindFramebuffer(P.FRAMEBUFFER,ft);try{const pt=S.texture,St=pt.format,yt=pt.type;if(!Zt.textureFormatReadable(St))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Zt.textureTypeReadable(yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=S.width-O&&N>=0&&N<=S.height-U){const xt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,xt),P.bufferData(P.PIXEL_PACK_BUFFER,tt.byteLength,P.STREAM_READ),P.readPixels(D,N,O,U,at.convert(St),at.convert(yt),0),P.flush();const Vt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);await iu(P,Vt,4);try{P.bindBuffer(P.PIXEL_PACK_BUFFER,xt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,tt)}finally{P.deleteBuffer(xt),P.deleteSync(Vt)}return tt}}finally{const pt=w!==null?Dt.get(w).__webglFramebuffer:null;Mt.bindFramebuffer(P.FRAMEBUFFER,pt)}}},this.copyFramebufferToTexture=function(S,D=null,N=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,S=arguments[1]);const O=Math.pow(2,-N),U=Math.floor(S.image.width*O),tt=Math.floor(S.image.height*O),lt=D!==null?D.x:0,ft=D!==null?D.y:0;At.setTexture2D(S,0),P.copyTexSubImage2D(P.TEXTURE_2D,N,0,0,lt,ft,U,tt),Mt.unbindTexture()},this.copyTextureToTexture=function(S,D,N=null,O=null,U=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,S=arguments[1],D=arguments[2],U=arguments[3]||0,N=null);let tt,lt,ft,pt,St,yt;N!==null?(tt=N.max.x-N.min.x,lt=N.max.y-N.min.y,ft=N.min.x,pt=N.min.y):(tt=S.image.width,lt=S.image.height,ft=0,pt=0),O!==null?(St=O.x,yt=O.y):(St=0,yt=0);const xt=at.convert(D.format),Vt=at.convert(D.type);At.setTexture2D(D,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);const jt=P.getParameter(P.UNPACK_ROW_LENGTH),Jt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Te=P.getParameter(P.UNPACK_SKIP_PIXELS),Wt=P.getParameter(P.UNPACK_SKIP_ROWS),gt=P.getParameter(P.UNPACK_SKIP_IMAGES),me=S.isCompressedTexture?S.mipmaps[U]:S.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,me.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,me.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ft),P.pixelStorei(P.UNPACK_SKIP_ROWS,pt),S.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,U,St,yt,tt,lt,xt,Vt,me.data):S.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,U,St,yt,me.width,me.height,xt,me.data):P.texSubImage2D(P.TEXTURE_2D,U,St,yt,xt,Vt,me),P.pixelStorei(P.UNPACK_ROW_LENGTH,jt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Jt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Te),P.pixelStorei(P.UNPACK_SKIP_ROWS,Wt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,gt),U===0&&D.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),Mt.unbindTexture()},this.copyTextureToTexture3D=function(S,D,N=null,O=null,U=0){S.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),N=arguments[0]||null,O=arguments[1]||null,S=arguments[2],D=arguments[3],U=arguments[4]||0);let tt,lt,ft,pt,St,yt,xt,Vt,jt;const Jt=S.isCompressedTexture?S.mipmaps[U]:S.image;N!==null?(tt=N.max.x-N.min.x,lt=N.max.y-N.min.y,ft=N.max.z-N.min.z,pt=N.min.x,St=N.min.y,yt=N.min.z):(tt=Jt.width,lt=Jt.height,ft=Jt.depth,pt=0,St=0,yt=0),O!==null?(xt=O.x,Vt=O.y,jt=O.z):(xt=0,Vt=0,jt=0);const Te=at.convert(D.format),Wt=at.convert(D.type);let gt;if(D.isData3DTexture)At.setTexture3D(D,0),gt=P.TEXTURE_3D;else if(D.isDataArrayTexture||D.isCompressedArrayTexture)At.setTexture2DArray(D,0),gt=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);const me=P.getParameter(P.UNPACK_ROW_LENGTH),qt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),rn=P.getParameter(P.UNPACK_SKIP_PIXELS),xr=P.getParameter(P.UNPACK_SKIP_ROWS),kn=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,Jt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Jt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,pt),P.pixelStorei(P.UNPACK_SKIP_ROWS,St),P.pixelStorei(P.UNPACK_SKIP_IMAGES,yt),S.isDataTexture||S.isData3DTexture?P.texSubImage3D(gt,U,xt,Vt,jt,tt,lt,ft,Te,Wt,Jt.data):D.isCompressedArrayTexture?P.compressedTexSubImage3D(gt,U,xt,Vt,jt,tt,lt,ft,Te,Jt.data):P.texSubImage3D(gt,U,xt,Vt,jt,tt,lt,ft,Te,Wt,Jt),P.pixelStorei(P.UNPACK_ROW_LENGTH,me),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,qt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,rn),P.pixelStorei(P.UNPACK_SKIP_ROWS,xr),P.pixelStorei(P.UNPACK_SKIP_IMAGES,kn),U===0&&D.generateMipmaps&&P.generateMipmap(gt),Mt.unbindTexture()},this.initRenderTarget=function(S){Dt.get(S).__webglFramebuffer===void 0&&At.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?At.setTextureCube(S,0):S.isData3DTexture?At.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?At.setTexture2DArray(S,0):At.setTexture2D(S,0),Mt.unbindTexture()},this.resetState=function(){B=0,R=0,w=null,Mt.reset(),Pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===wa?"display-p3":"srgb",e.unpackColorSpace=Xt.workingColorSpace===us?"display-p3":"srgb"}}class hg extends se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ia extends Wi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new _t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const is=new L,rs=new L,xl=new Kt,ir=new Ca,Gr=new hr,ea=new L,Ml=new L;class mc extends se{constructor(t=new $e,e=new Ia){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)is.fromBufferAttribute(e,r-1),rs.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=is.distanceTo(rs);t.setAttribute("lineDistance",new Ee(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(r),Gr.radius+=s,t.ray.intersectsSphere(Gr)===!1)return;xl.copy(r).invert(),ir.copy(t.ray).applyMatrix4(xl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,p=n.attributes.position;if(d!==null){const m=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=m,h=g-1;_<h;_+=c){const u=d.getX(_),E=d.getX(_+1),y=Vr(this,t,ir,l,u,E);y&&e.push(y)}if(this.isLineLoop){const _=d.getX(g-1),h=d.getX(m),u=Vr(this,t,ir,l,_,h);u&&e.push(u)}}else{const m=Math.max(0,a.start),g=Math.min(p.count,a.start+a.count);for(let _=m,h=g-1;_<h;_+=c){const u=Vr(this,t,ir,l,_,_+1);u&&e.push(u)}if(this.isLineLoop){const _=Vr(this,t,ir,l,g-1,m);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Vr(i,t,e,n,r,s){const a=i.geometry.attributes.position;if(is.fromBufferAttribute(a,r),rs.fromBufferAttribute(a,s),e.distanceSqToSegment(is,rs,ea,Ml)>n)return;ea.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ea);if(!(l<t.near||l>t.far))return{distance:l,point:Ml.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,object:i}}const Sl=new L,yl=new L;class fg extends mc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)Sl.fromBufferAttribute(e,r),yl.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Sl.distanceTo(yl);t.setAttribute("lineDistance",new Ee(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class pg extends Wi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const El=new Kt,ma=new Ca,Wr=new hr,Xr=new L;class mg extends se{constructor(t=new $e,e=new pg){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wr.copy(n.boundingSphere),Wr.applyMatrix4(r),Wr.radius+=s,t.ray.intersectsSphere(Wr)===!1)return;El.copy(r).invert(),ma.copy(t.ray).applyMatrix4(El);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){const p=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=p,_=m;g<_;g++){const h=c.getX(g);Xr.fromBufferAttribute(f,h),Tl(Xr,h,l,r,t,e,this)}}else{const p=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let g=p,_=m;g<_;g++)Xr.fromBufferAttribute(f,g),Tl(Xr,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Tl(i,t,e,n,r,s,a){const o=ma.distanceSqToPoint(i);if(o<e){const l=new L;ma.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,object:a})}}const Al={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class gg{constructor(t,e,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(d){o++,s===!1&&r.onStart!==void 0&&r.onStart(d,a,o),s=!0},this.itemEnd=function(d){a++,r.onProgress!==void 0&&r.onProgress(d,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,f){return c.push(d,f),this},this.removeHandler=function(d){const f=c.indexOf(d);return f!==-1&&c.splice(f,2),this},this.getHandler=function(d){for(let f=0,p=c.length;f<p;f+=2){const m=c[f],g=c[f+1];if(m.global&&(m.lastIndex=0),m.test(d))return g}return null}}}const _g=new gg;class Ua{constructor(t){this.manager=t!==void 0?t:_g,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(r,s){n.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Ua.DEFAULT_MATERIAL_NAME="__DEFAULT";class vg extends Ua{constructor(t){super(t)}load(t,e,n,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=Al.get(t);if(a!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0),a;const o=or("img");function l(){d(),Al.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(f){d(),r&&r(f),s.manager.itemError(t),s.manager.itemEnd(t)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(t),o.src=t,o}}class xg extends Ua{constructor(t){super(t)}load(t,e,n,r){const s=new _e,a=new vg(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){s.image=o,s.needsUpdate=!0,e!==void 0&&e(s)},n,r),s}}class gc extends se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new _t(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const na=new Kt,bl=new L,wl=new L;class Mg{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new zt(512,512),this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pa,this._frameExtents=new zt(1,1),this._viewportCount=1,this._viewports=[new ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;bl.setFromMatrixPosition(t.matrixWorld),e.position.copy(bl),wl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(wl),e.updateMatrixWorld(),na.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(na),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(na)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Sg extends Mg{constructor(){super(new La(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yg extends gc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(se.DEFAULT_UP),this.updateMatrix(),this.target=new se,this.shadow=new Sg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Eg extends gc{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Tg extends fg{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new $e;r.setAttribute("position",new Ee(e,3)),r.setAttribute("color",new Ee(n,3));const s=new Ia({vertexColors:!0,toneMapped:!1});super(r,s),this.type="AxesHelper"}setColors(t,e,n){const r=new _t,s=this.geometry.attributes.color.array;return r.set(t),r.toArray(s,0),r.toArray(s,3),r.set(e),r.toArray(s,6),r.toArray(s,9),r.set(n),r.toArray(s,12),r.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ba}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ba);class _c extends se{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new zt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof Element&&e.element.parentNode!==null&&e.element.parentNode.removeChild(e.element)})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const wi=new L,Cl=new Kt,Rl=new Kt,Pl=new L,Ll=new L;class Ag{constructor(t={}){const e=this;let n,r,s,a;const o={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:r}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),Cl.copy(_.matrixWorldInverse),Rl.multiplyMatrices(_.projectionMatrix,Cl),d(g,g,_),m(g)},this.setSize=function(g,_){n=g,r=_,s=n/2,a=r/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,h=g.children.length;_<h;_++)c(g.children[_])}function d(g,_,h){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){wi.setFromMatrixPosition(g.matrixWorld),wi.applyMatrix4(Rl);const u=wi.z>=-1&&wi.z<=1&&g.layers.test(h.layers)===!0,E=g.element;E.style.display=u===!0?"":"none",u===!0&&(g.onBeforeRender(e,_,h),E.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(wi.x*s+s)+"px,"+(-wi.y*a+a)+"px)",E.parentNode!==l&&l.appendChild(E),g.onAfterRender(e,_,h));const y={distanceToCameraSquared:f(h,g)};o.objects.set(g,y)}for(let u=0,E=g.children.length;u<E;u++)d(g.children[u],_,h)}function f(g,_){return Pl.setFromMatrixPosition(g.matrixWorld),Ll.setFromMatrixPosition(_.matrixWorld),Pl.distanceToSquared(Ll)}function p(g){const _=[];return g.traverseVisible(function(h){h.isCSS2DObject&&_.push(h)}),_}function m(g){const _=p(g).sort(function(u,E){if(u.renderOrder!==E.renderOrder)return E.renderOrder-u.renderOrder;const y=o.objects.get(u).distanceToCameraSquared,T=o.objects.get(E).distanceToCameraSquared;return y-T}),h=_.length;for(let u=0,E=_.length;u<E;u++)_[u].element.style.zIndex=h-u}}}function bg(i,t){const e=document.getElementById("cinematic-control-row"),n=document.getElementById("birdseye-control-row"),r=document.getElementById("reorient-control-row");let s=null,a=null,o=!1,l=!1,c=0,d=0;const f={};let p=!1,m=new L,g=null,_=null,h=!1,u=i,E=null,y=i,T=new L,B=new L,R=1e3,w={x:Math.PI/6,y:Math.PI/4};const I={distance:1e3,angleX:Math.PI/6,angleY:Math.PI/4,panOffset:new L(0,0,0),moveSpeed:10,lookSpeed:.01,getCurrentCamera:function(){return y},updateCameraPosition:function(){if(h&&E){const v=Math.max(this.distance*2,2e3);E.position.set(this.panOffset.x,this.panOffset.y+v,this.panOffset.z),E.lookAt(this.panOffset);const x=window.innerWidth/window.innerHeight,b=this.distance*.8;E.left=-b*x,E.right=b*x,E.top=b,E.bottom=-b,E.near=.1,E.far=v*4,E.updateProjectionMatrix()}else{const v=Math.cos(this.angleY)*Math.cos(this.angleX)*this.distance,x=Math.sin(this.angleX)*this.distance,b=Math.sin(this.angleY)*Math.cos(this.angleX)*this.distance;y.position.set(v+this.panOffset.x,x+this.panOffset.y,b+this.panOffset.z),y.lookAt(this.panOffset)}},update:function(){p&&!h&&this.updateCinematic();const v=this.distance*.02,x=new L;y.getWorldDirection(x);let b;h?(b=new L(1,0,0),new L(0,0,-1)):(b=new L().crossVectors(y.up,x).normalize(),new L().crossVectors(x,b).normalize());let z=!1;if(p&&!h){const F=this.distance*.025;f.ArrowUp&&(this.distance=Math.max(30,this.distance-F),g=this.distance,z=!0),f.ArrowDown&&(this.distance+=F,g=this.distance,z=!0),f.ArrowLeft&&(this.angleY-=this.lookSpeed*1.5,z=!0),f.ArrowRight&&(this.angleY+=this.lookSpeed*1.5,z=!0)}if(f.KeyW&&(h?this.panOffset.add(new L(0,0,-v)):this.panOffset.add(x.clone().multiplyScalar(v)),z=!0),f.KeyS&&(h?this.panOffset.add(new L(0,0,v)):this.panOffset.add(x.clone().multiplyScalar(-v)),z=!0),f.KeyD&&(h?this.panOffset.add(new L(v,0,0)):this.panOffset.add(b.clone().multiplyScalar(-v)),z=!0),f.KeyA&&(h?this.panOffset.add(new L(-v,0,0)):this.panOffset.add(b.clone().multiplyScalar(v)),z=!0),h){const F=this.distance*.03;f.KeyQ&&(this.distance-=F,this.distance=Math.max(50,this.distance),z=!0),f.KeyE&&(this.distance+=F,z=!0)}else p||(f.KeyE&&(this.panOffset.add(new L(0,v,0)),z=!0),f.KeyQ&&(this.panOffset.add(new L(0,-v,0)),z=!0));!h&&!p&&(f.ArrowLeft&&(this.angleY-=this.lookSpeed,z=!0),f.ArrowRight&&(this.angleY+=this.lookSpeed,z=!0),f.ArrowUp&&(this.angleX+=this.lookSpeed,this.angleX=Math.min(Math.PI/2-.01,this.angleX),z=!0),f.ArrowDown&&(this.angleX-=this.lookSpeed,this.angleX=Math.max(-Math.PI/2+.01,this.angleX),z=!0)),z&&this.updateCameraPosition()},updateCinematic:function(){this.panOffset.lerp(m,.05);const v=g||1e3;this.distance+=(v-this.distance)*.05,this.updateCameraPosition()},toggleCinematicMode:function(){h&&this.toggleBirdseyeMode(),p=!p,p||(_=null,window.dispatchEvent(new CustomEvent("cinematicTargetChanged",{detail:{talkerId:null}}))),console.log(`Cinematic mode ${p?"enabled":"disabled"}`),e&&e.classList.toggle("active-mode",p),p&&(g=this.distance)},toggleBirdseyeMode:function(){if(h=!h,console.log(`Birdseye mode ${h?"enabled":"disabled"}`),n&&n.classList.toggle("active-mode",h),h){if(p&&(p=!1,_=null,e&&e.classList.remove("active-mode"),window.dispatchEvent(new CustomEvent("cinematicTargetChanged",{detail:{talkerId:null}}))),T.copy(u.position),B.copy(this.panOffset),R=this.distance,w.x=this.angleX,w.y=this.angleY,!E){const v=this.distance*.5;E=new La(-v,v,v,-v,.1,1e7)}this.angleX=Math.PI/2,this.angleY=0,y=E,this.updateCameraPosition()}else y=u,this.distance=R,this.angleX=w.x,this.angleY=w.y,this.panOffset.copy(B),this.updateCameraPosition()},isBirdseyeActive:function(){return h},setCinematicTarget:function(v){v instanceof L&&m.copy(v)},isCinematicActive:function(){return p},getTargetTalkerId:function(){return _},setTargetTalkerId:function(v){_=v,console.log(`Tracking ${v===null?"all tracks (latest point)":"talker: "+v}`),window.dispatchEvent(new CustomEvent("cinematicTargetChanged",{detail:{talkerId:_}}))},adjustForNewData:function(v,x){s=v,a=x;const b=Math.max(v*1.5,200);(Math.abs(this.distance-b)>this.distance*.5||this.distance===6e3)&&(this.distance=b),this.panOffset.lerp(x,.3),this.updateCameraPosition()},reset:function(v,x){p=!1,h=!1,_=null,y=u,window.dispatchEvent(new CustomEvent("cinematicTargetChanged",{detail:{talkerId:null}})),e&&e.classList.remove("active-mode"),n&&n.classList.remove("active-mode"),s=v,a=x,this.distance=Math.max(v*1.5,200),this.panOffset.copy(x),this.angleX=Math.PI/6,this.angleY=Math.PI/4,this.updateCameraPosition()}};return document.addEventListener("keydown",v=>{if(p&&v.code.startsWith("Digit")){const x=v.code.replace("Digit","");if(x==="0")I.setTargetTalkerId(null);else{const b={1:"AA",2:"BB",3:"CC",4:"DD",5:"WW",6:"XX",7:"YY",8:"ZZ",9:"JJ"};I.setTargetTalkerId(b[x]||null)}return}if(v.code==="KeyB"){I.toggleBirdseyeMode();return}if(v.code==="KeyC"){I.toggleCinematicMode();return}if(v.code==="KeyR"){r&&(r.classList.add("active-mode"),setTimeout(()=>r.classList.remove("active-mode"),150)),s!==null&&a!==null&&I.reset(s,a);return}f[v.code]=!0}),document.addEventListener("keyup",v=>{f[v.code]=!1}),window.addEventListener("blur",()=>{for(const v in f)f[v]=!1}),document.addEventListener("mousedown",v=>{v.target.closest("#info")||v.target.closest(".talker-header")||(o=!0,l=v.shiftKey||v.button===1,c=v.clientX,d=v.clientY,v.button===1&&v.preventDefault())}),document.addEventListener("mouseup",()=>{o=!1,l=!1}),document.addEventListener("mousemove",v=>{if(!o)return;const x=v.clientX-c,b=v.clientY-d;if(l){const z=I.distance*.001;if(h)I.panOffset.x-=x*z,I.panOffset.z+=b*z;else{const F=new L;y.getWorldDirection(F);const X=new L().crossVectors(F,y.up).normalize(),$=new L().crossVectors(X,F).normalize();I.panOffset.add(X.multiplyScalar(-x*z)),I.panOffset.add($.multiplyScalar(b*z))}}else h||(I.angleY+=x*.005,I.angleX+=b*.005,I.angleX=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,I.angleX)));c=v.clientX,d=v.clientY,I.updateCameraPosition()}),document.addEventListener("wheel",v=>{v.target.closest("#info")||(I.distance+=v.deltaY*.5,I.distance=Math.max(50,I.distance),p&&(g=I.distance),I.updateCameraPosition())}),document.addEventListener("contextmenu",v=>v.preventDefault()),window.addEventListener("activateCinematicForTalker",v=>{const{talkerId:x}=v.detail;p&&_===x?I.toggleCinematicMode():(p||I.toggleCinematicMode(),I.setTargetTalkerId(x))}),I}function wg(i,t={}){const{size:e=4e5,gridSize:n=100,lineWidth:r=.5,color:s=7829367,renderOrder:a=0,opacity:o=.65}=t,l=new Xe({uniforms:{uGridColor:{value:new _t(s)},uGridSize:{value:n},uLineWidth:{value:r},uOpacity:{value:o}},depthWrite:o>=.99,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-10,polygonOffsetUnits:-10,transparent:!0,alphaTest:.01,blending:o<1?Dn:pn,side:Oe,vertexShader:`
      varying vec3 vWorldPos;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,fragmentShader:`
      uniform vec3 uGridColor;
      uniform float uGridSize;
      uniform float uLineWidth;
      uniform float uOpacity;
      varying vec3 vWorldPos;
      void main() {
        vec2 coord = vWorldPos.xz / uGridSize;
        vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
        float line = min(grid.x, grid.y);
        float alpha = 1.0 - smoothstep(0.0, uLineWidth, line);
        
        // Apply overall opacity
        alpha *= uOpacity;
        
        // Discard fully transparent pixels
        if (alpha < 0.01) discard;
        
        gl_FragColor = vec4(uGridColor, alpha);
      }
    `}),c=new ze(new ci(e,e),l);return c.rotation.x=-Math.PI/2,c.position.y=-.1,c.renderOrder=a-1,i.add(c),c}const Cg=`
<svg width="2" height="10" viewBox="0 0 2 10" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="2" height="10" fill="none" stroke="black" stroke-width="2"/>
  <line x1="1" y1="0" x2="1" y2="10" stroke="currentColor" stroke-width="1"/>
</svg>`,Rg=`
<svg width="2" height="15" viewBox="0 0 2 15" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="2" height="15" fill="none" stroke="black" stroke-width="2"/>
  <line x1="1" y1="0" x2="1" y2="15" stroke="currentColor" stroke-width="1.5"/>
</svg>`,Pg=`
<svg width="2" height="20" viewBox="0 0 2 20" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="2" height="20" fill="none" stroke="black" stroke-width="2"/>
  <line x1="1" y1="0" x2="1" y2="20" stroke="currentColor" stroke-width="2"/>
</svg>`;let Ce={},Di=[];const rr=(i,t,{text:e,svg:n})=>{const r=document.createElement("div");r.className=`compass-label ${t}`;let s="";n&&(s+=n),e&&(s+=`<span class="compass-text">${e}</span>`),r.innerHTML=s;const a=new _c(r);return i.add(a),a};function Lg(i){Object.values(Ce).forEach(e=>e.parent?.remove(e)),Di.forEach(e=>e.label.parent?.remove(e.label)),Ce={},Di=[],Ce.n=rr(i,"compass-cardinal",{text:"N"}),Ce.s=rr(i,"compass-cardinal",{text:"S"}),Ce.e=rr(i,"compass-cardinal",{text:"E"}),Ce.w=rr(i,"compass-cardinal",{text:"W"});const t=1e5;for(let e=0;e<360;e+=5){if(e%90===0)continue;let n,r;e%45===0?(r="compass-tick-large",n={svg:Pg}):e%15===0?(r="compass-tick-medium",n={svg:Rg}):(r="compass-tick-small",n={svg:Cg});const s=rr(i,r,n),a=(e-90)*(Math.PI/180),o=new L(t*Math.cos(a),0,t*Math.sin(a));Di.push({label:s,relativePos:o})}}function Dg(){Object.values(Ce).forEach(i=>{i.parent&&i.parent.remove(i),i.element?.parentNode&&i.element.parentNode.removeChild(i.element)}),Di.forEach(i=>{i.label.parent&&i.label.parent.remove(i.label),i.label.element?.parentNode&&i.label.element.parentNode.removeChild(i.label.element)}),Ce={},Di=[]}function Ig(i){if(Object.keys(Ce).length===0)return;const t=1e5,e=new L(i.position.x,0,i.position.z);Ce.n.position.copy(e).add(new L(0,0,-t)),Ce.s.position.copy(e).add(new L(0,0,t)),Ce.e.position.copy(e).add(new L(t,0,0)),Ce.w.position.copy(e).add(new L(-t,0,0)),Di.forEach(n=>{n.label.position.copy(e).add(n.relativePos)})}function vc(i){const t=[],e=i.replace(/[^\x20-\x7E\r\n$]/g,"").replace(/\r\n|\r/g,`
`).replace(/\n{2,}/g,`
`).trim();if(e.split(`
`).length===0)return t;const r=/\$[A-Z0-9]{2}GGA,[^\r\n]*?\*[0-9A-Fa-f]{2}/g,s=e.match(r);if(!s)return t;let a={};const o=250,l=.5;for(const c of s){if(c.length>82&&c.length<86)continue;const d=c.split(",");if(!(d.length<15))try{const f=c.substring(1,3),p=d[1],m=d[2],g=d[3],_=d[4],h=d[5],u=parseInt(d[6]),E=parseInt(d[7]),y=d[8],T=d[9],B=d[10],R=d[11];if(!m||!_||!g||!h||!T||m.length<4||_.length<5||B!=="M"||isNaN(u)||u===0||isNaN(E)||E<3)continue;const w=parseFloat(y);if(isNaN(w)||w>5)continue;const I=parseFloat(m.substring(0,2)),v=parseFloat(m.substring(2));if(isNaN(I)||isNaN(v))continue;let x=I+v/60;g==="S"&&(x=-x);const b=parseFloat(_.substring(0,3)),z=parseFloat(_.substring(3));if(isNaN(b)||isNaN(z))continue;let F=b+z/60;if(h==="W"&&(F=-F),Math.abs(x)>360||Math.abs(F)>360)continue;const X=parseFloat(T),$=parseFloat(R)||0,W=parseInt(p.slice(0,2))||0,Y=parseInt(p.slice(2,4))||0,k=parseFloat(p.slice(4))||0,dt=W*3600+Y*60+k,ct={lat:x,lon:F,alt:X,time:dt,satellites:E,undulation:$,talkerId:f},ut=a[f];if(ut){const It=Math.abs(ct.lat-ut.lat),Gt=Math.abs(ct.lon-ut.lon);if(It>l||Gt>l)continue;const G=ct.time-ut.time;if(G>0&&qr(ut.lat,ut.lon,ct.lat,ct.lon)/G>o)continue}t.push(ct),a[f]=ct}catch{continue}}return t}function qr(i,t,e,n){const s=c=>c*(Math.PI/180),a=s(e-i),o=s(n-t),l=Math.sin(a/2)**2+Math.cos(s(i))*Math.cos(s(e))*Math.sin(o/2)**2;return 2*6371e3*Math.atan2(Math.sqrt(l),Math.sqrt(1-l))}function Ug(i){return i.reduce((t,e)=>{const{talkerId:n}=e;return t[n]||(t[n]=[]),t[n].push(e),t},{})}function Ng(i){if(!i||i.length===0)return null;const t=i[i.length-1],e=i[0],n=i.length,r=t.time-e.time,s=r>0?n/r:0,a=qr(e.lat,e.lon,t.lat,t.lon),o=t.alt-e.alt,l=Math.sqrt(Math.pow(a,2)+Math.pow(o,2)),c=t.alt,d=t.alt+(t.undulation||0),f=t.lat,p=t.lon,m=t.satellites||0;let g=0;if(i.length>=2){const u=i[i.length-2],E=t,y=qr(u.lat,u.lon,E.lat,E.lon),T=E.time-u.time;T>0&&(g=y/T)}let _=0,h=0;for(let u=1;u<i.length;u++){const E=i[u-1],y=i[u],T=qr(E.lat,E.lon,y.lat,y.lon);_+=T;const B=y.alt-E.alt,R=Math.sqrt(Math.pow(T,2)+Math.pow(B,2));h+=R}return{totalPoints:n,totalDuration:r,currentAltitude:c,currentAltWsg84:d,currentLat:f,currentLon:p,currentSatellites:m,latestSpeed:g,total2DDistance:_,total3DDistance:h,rthDistance3D:l,updateRate:s,startTime:e.time,endTime:t.time}}function Fg(i){const t=i.trim().split(`
`)[0]?.trim();if(!t)return"unknown";if(t.startsWith("{"))try{const e=JSON.parse(t);if(e.data?.aircraft!==void 0||e.receivedAt)return"adsb"}catch{}return/^\$[A-Z0-9]{2}[A-Z]{3},/.test(t)?"nmea":"unknown"}function xc(i){const t=[],e=i.split(`
`).filter(n=>n.trim());for(const n of e){let r;try{r=JSON.parse(n)}catch{continue}const s=r.data?.aircraft;if(!(!Array.isArray(s)||s.length===0))for(const a of s){if(!a.icaoAddress||a.latDD==null||a.lonDD==null||a.altitudeMM==null||!a.timeStamp||Math.abs(a.latDD)>90||Math.abs(a.lonDD)>180)continue;const o=a.altitudeMM/1e3,l=a.detail?.baroaltDiffMM!=null?a.detail.baroaltDiffMM/1e3:null;let c=null,d=null;a.altitudeType===0?(c=o,l!==null&&(d=c+l)):a.altitudeType===1&&(d=o,l!==null&&(c=d-l));const f=new Date(a.timeStamp),p=f.getUTCHours()*3600+f.getUTCMinutes()*60+f.getUTCSeconds()+f.getUTCMilliseconds()/1e3;t.push({lat:a.latDD,lon:a.lonDD,alt:d!==null?d:c,baroAlt:c,geoAlt:d,time:p,satellites:0,undulation:0,talkerId:a.icaoAddress,dataType:"adsb",icaoAddress:a.icaoAddress,heading:(a.headingDE2||0)/100,horVelocity:(a.horVelocityCMS||0)/100,verVelocity:(a.verVelocityCMS||0)/100,altitudeType:a.altitudeType??null,emitterType:a.emitterType??null,timeStamp:a.timeStamp})}}return t}function Og(i){return i.reduce((t,e)=>((t[e.icaoAddress]??=[]).push(e),t),{})}function Bg(i){if(!i?.length)return null;const t=i[0],e=i[i.length-1];let n=0;for(let r=1;r<i.length;r++)n+=Hg(i[r-1].lat,i[r-1].lon,i[r].lat,i[r].lon);return{icaoAddress:e.icaoAddress,totalPoints:i.length,currentLat:e.lat,currentLon:e.lon,currentAltM:e.alt,currentBaroAltM:e.baroAlt,currentGeoAltM:e.geoAlt,heading:e.heading,horVelocityMs:e.horVelocity,verVelocityMs:e.verVelocity,emitterType:e.emitterType,altitudeType:e.altitudeType,startTime:t.time,endTime:e.time,duration:e.time-t.time,lastSeen:e.timeStamp,totalGroundDist:n}}function zg(i){return{0:"Unknown",1:"Light",2:"Small",3:"Large",4:"High Vortex",5:"Heavy",6:"Maneuverable",7:"Rotorcraft",9:"Glider",10:"Balloon",11:"Parachutist",12:"Ultralight",14:"UAV",15:"Space"}[i]??`Type ${i}`}function Hg(i,t,e,n){const s=c=>c*(Math.PI/180),a=s(e-i),o=s(n-t),l=Math.sin(a/2)**2+Math.cos(s(i))*Math.cos(s(e))*Math.sin(o/2)**2;return 2*6371e3*Math.atan2(Math.sqrt(l),Math.sqrt(1-l))}function kg(i){if(!i)return!1;const t=(i.split(`
`)[0]||"").replace(/\r/,"");return["ID","DateTime","Lat","Lon","Alt"].every(n=>t.split(",").map(r=>r.trim()).includes(n))}function Gg(i){if(!i)return 0;try{const t=i.trim().replace(" ","T").replace(/:(\d{3})$/,".$1")+"Z",e=Date.parse(t);if(!isNaN(e))return e/1e3}catch{}try{const e=(i.trim().split(" ")[1]||"").split(":");return(parseInt(e[0])||0)*3600+(parseInt(e[1])||0)*60+(parseFloat(e[2])||0)+(parseInt(e[3])||0)/1e3}catch{}return 0}function Mc(i){if(!i||!i.trim())return[];const t=i.split(`
`).map(g=>g.trim()).filter(Boolean);if(t.length<2)return[];const e=t[0].split(",").map(g=>g.trim()),n=g=>e.indexOf(g),r=n("ID"),s=n("DateTime"),a=n("RCS"),o=n("Lat"),l=n("Lon"),c=n("Alt"),d=n("ExtID"),f=n("VelAbs");if(r<0||o<0||l<0)return console.warn("radarParser: missing required columns (ID, Lat, Lon)"),[];const p=[],m={};for(let g=1;g<t.length;g++){const _=t[g].split(",");try{const h=_[r]?.trim(),u=s>=0&&_[s]?.trim()||"",E=parseFloat(_[o]),y=parseFloat(_[l]),T=c>=0?parseFloat(_[c]):0,B=a>=0?parseFloat(_[a]):NaN,R=f>=0?parseFloat(_[f]):NaN,w=d>=0&&_[d]?.trim()||"";if(!h||isNaN(E)||isNaN(y)||Math.abs(E)>90||Math.abs(y)>180)continue;p.push({dataType:"radar",id:h,talkerId:`radar_${h}`,lat:E,lon:y,alt:isNaN(T)?0:T,time:Gg(u),rcs:isNaN(B)?null:B,velAbs:isNaN(R)?null:R,extId:w,dateTime:u}),m[h]=(m[h]||0)+1}catch{continue}}return p.filter(g=>m[g.id]>20)}function Vg(i){return i.reduce((t,e)=>(t[e.id]||(t[e.id]=[]),t[e.id].push(e),t),{})}function Wg(i){if(!i||i.length===0)return null;const t=[...i].sort((r,s)=>r.time-s.time),e=t[0],n=t[t.length-1];return{totalPoints:t.length,duration:n.time-e.time,currentLat:n.lat,currentLon:n.lon,currentAlt:n.alt,currentVel:n.velAbs,currentRcs:n.rcs,currentExtId:n.extId,startTime:e.time,endTime:n.time}}const Na="stats-search-bar",ga="stats-search-wrapper";function Sc(i){if(document.getElementById(ga))return;const t=document.createElement("div");t.id=ga,t.className="stats-search-wrapper";const e=document.createElement("input");e.id=Na,e.type="text",e.placeholder="Search Airspace",e.autocomplete="off",e.spellcheck=!1,e.className="stats-search-input",e.addEventListener("input",()=>Fa(e.value.trim().toLowerCase()));const n=a=>a.stopPropagation();e.addEventListener("keydown",n),e.addEventListener("keyup",n),e.addEventListener("keypress",n);const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.classList.add("stats-search-icon"),r.setAttribute("viewBox","0 0 512 512");const s=document.createElementNS("http://www.w3.org/2000/svg","path");s.setAttribute("d","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"),r.appendChild(s),t.appendChild(e),t.appendChild(r),i.insertBefore(t,i.firstChild)}function Xg(i){const t=document.getElementById(ga);if(t)if(i>3)t.style.display="block";else{t.style.display="none";const e=document.getElementById(Na);e&&e.value!==""&&(e.value="",Fa(""))}}function Fa(i){const t=document.querySelectorAll("#stats .stats-group");let e=null;t.forEach(n=>{if(n.classList.remove("last-visible"),!i){n.style.display="",e=n;return}const r=n.querySelector(".talker-header"),s=(r?r.textContent:"").toLowerCase(),a=(r?.dataset.talkerId||"").toLowerCase(),o=s.includes(i)||a.includes(i);n.style.display=o?"":"none",o&&(e=n)}),e&&e.classList.add("last-visible")}function $g(){const i=document.getElementById(Na);return i?i.value.trim().toLowerCase():""}const Jn=new Map,ia=new Set;async function qg(i){const t=i.toUpperCase();try{const e=await fetch(`https://hexdb.io/hex-image?hex=${t}`);if(!e.ok)return null;const n=(await e.text()).trim();if(n&&(n.startsWith("http://")||n.startsWith("https://")))return n}catch{}return null}async function Oa(i){const t=i.toUpperCase();if(!(Jn.has(t)||ia.has(t))){ia.add(t);try{const e=await fetch(`https://hexdb.io/api/v1/aircraft/${t}`);if(!e.ok){Jn.set(t,{model:"Unknown",manufacturer:"",registration:"",operator:"",type:"",fetched:!0,imageResolved:!1,imageUrl:null});return}const n=await e.json();if(n.error){Jn.set(t,{model:"Unknown",manufacturer:"",registration:"",operator:"",type:"",fetched:!0,imageResolved:!1,imageUrl:null});return}Jn.set(t,{model:n.Type||n.ICAOTypeCode||"Unknown",manufacturer:n.Manufacturer||"",registration:n.Registration||"",operator:n.RegisteredOwners||"",type:n.ICAOTypeCode||"",fetched:!0,imageResolved:!1,imageUrl:null}),yc(i),window.dispatchEvent(new CustomEvent("aircraftInfoLoaded",{detail:{talkerId:i,model:n.Type||n.ICAOTypeCode||"Unknown"}}))}catch(e){console.warn(`hexdb.io lookup failed for ${i}:`,e),Jn.set(t,{model:"Unknown",manufacturer:"",registration:"",operator:"",type:"",fetched:!0,imageResolved:!1,imageUrl:null})}finally{ia.delete(t)}}}function yc(i){const t=i.toUpperCase(),e=Jn.get(t);if(!e)return;const n=i,r=document.getElementById(`${n}-header-model`);r&&(r.textContent=e.model&&e.model!=="Unknown"?e.model:n);const s=document.getElementById(`${n}-reg-stat`);s&&(s.textContent=e.registration||"--");const a=document.getElementById(`${n}-operator-stat`);a&&(a.textContent=e.operator||"--");const o=document.getElementById(`${n}-aircraft-img`);o&&!e.imageResolved&&e.model!=="Unknown"?(e.imageResolved=!0,qg(t).then(l=>{l&&(e.imageUrl=l,o.src=l)})):o&&e.imageUrl&&(!o.src||o.src!==e.imageUrl)&&(o.src=e.imageUrl)}function Ec(i){if(!i)return"Unknown";const t=i.toUpperCase(),e=Jn.get(t);return e?e.model||"Unknown":(Oa(i),"Loading...")}let Tc=null,Dl=!1;function Yg(i){return i?i.dataType==="radar"?"radar":i.dataType==="adsb"?"adsb":i.dataType==="nmea"||typeof i.satellites=="number"&&i.icaoAddress===void 0?"nmea":i.icaoAddress!==void 0||i.heading!==void 0||i.horizontalVelocity!==void 0?"adsb":(i.talkerId&&/^[A-Z]{2}$/.test(i.talkerId),"nmea"):"nmea"}function Kg(i){const t=[],e=[],n=[];for(const r of i){const s=Yg(r);s==="adsb"?e.push(r):s==="radar"?n.push(r):t.push(r)}return{nmea:t,adsb:e,radar:n}}function Ac(){document.querySelectorAll(".talker-header").forEach(i=>{i.classList.toggle("active-track",i.dataset.talkerId===Tc)})}function Il(i){const t=Math.floor(i/3600).toString().padStart(2,"0"),e=Math.floor(i%3600/60).toString().padStart(2,"0"),n=Math.floor(i%60).toString().padStart(2,"0");return`${t}:${e}:${n}`}function Ba(i,t,e){i.querySelectorAll(`.stats-group[data-data-type="${e}"]`).forEach(n=>{const r=n.dataset.panelId;(!r||!t.includes(r))&&n.remove()})}function fs(){const i=document.getElementById("trail-tail-color"),t=new _t(i?i.value:"#00ffaa"),e=Dc(),n=Rc();document.querySelectorAll(".talker-header").forEach(r=>{const s=r.dataset.talkerId,a=e?qi(s):n?$i(s):Un(t,s);r.style.color=`#${a.getHexString()}`})}function ii(i,t){const e=document.getElementById("stats");if(!e||(Dl||(Array.from(e.children).forEach(f=>{f.id!=="stats-search-wrapper"&&f.remove()}),Dl=!0),Sc(e),!i||i.length===0))return;const{nmea:n,adsb:r,radar:s}=Kg(i),a=document.getElementById("trail-tail-color"),o=new _t(a?a.value:"#00ffaa"),l=Dc(),c=Rc();Jg(e,n,o,l,c),e_(e,r,o,l,c),r_(e,s,o,l,c);const d=e.querySelectorAll(".stats-group").length;Xg(d),Ac(),Fa($g())}function Zg(i,t){return`
        <div class="stats-group" data-data-type="nmea" data-panel-id="${i}">
            <h3 style="color: ${t};" class="talker-header" data-talker-id="${i}" tabindex="0" role="button" title="Click to follow">
                <span>Rover ${i}</span>
            </h3>
            <table><tbody>
                <tr><td>Points:</td><td><span id="${i}-points-stat">0</span></td></tr>
                <tr><td>Telemetry:</td><td><span id="${i}-hz-stat">0.0</span> Hz</td></tr>
                <tr><td>Latitude:</td><td><span id="${i}-lat-stat">0.0</span>&deg;</td></tr>
                <tr><td>Longitude:</td><td><span id="${i}-long-stat">0.0</span>&deg;</td></tr>
                <tr><td>Alt (MSL):</td><td><span id="${i}-altitude-stat">0.0</span> m</td></tr>
                <tr><td>Alt (WGS84):</td><td><span id="${i}-altwsg84-stat">0.0</span> m</td></tr>
                <tr><td>Speed:</td><td><span id="${i}-speed-stat">0.0</span> m/s</td></tr>
                <tr><td>2D Distance:</td><td><span id="${i}-twod-stat">0.0</span> m</td></tr>
                <tr><td>3D Distance:</td><td><span id="${i}-threed-stat">0.0</span> m</td></tr>
                <tr><td>RTH Distance:</td><td><span id="${i}-rth-stat">0.0</span> m</td></tr>
                <tr><td>Satellites:</td><td><span id="${i}-satellites-stat">0</span></td></tr>
                <tr><td>Start Time:</td><td><span id="${i}-start-stat">--</span></td></tr>
                <tr><td>End Time:</td><td><span id="${i}-end-stat">--</span></td></tr>
                <tr><td>Duration:</td><td><span id="${i}-duration-stat">0.0</span> s</td></tr>
            </tbody></table>
        </div>`}function jg(i,t){const e=n=>document.getElementById(`${i}-${n}`);e("points-stat")&&(e("points-stat").textContent=t.totalPoints,e("hz-stat").textContent=t.updateRate.toFixed(2),e("duration-stat").textContent=t.totalDuration.toFixed(1),e("twod-stat").textContent=t.total2DDistance.toFixed(1),e("threed-stat").textContent=t.total3DDistance.toFixed(1),e("rth-stat").textContent=t.rthDistance3D.toFixed(1),e("speed-stat").textContent=t.latestSpeed.toFixed(2),e("altitude-stat").textContent=t.currentAltitude.toFixed(2),e("altwsg84-stat").textContent=t.currentAltWsg84.toFixed(2),e("lat-stat").textContent=t.currentLat.toFixed(7),e("long-stat").textContent=t.currentLon.toFixed(7),e("satellites-stat").textContent=t.currentSatellites,e("start-stat").textContent=Il(t.startTime),e("end-stat").textContent=Il(t.endTime))}function Jg(i,t,e,n,r){if(t.length===0){i.querySelectorAll('.stats-group[data-data-type="nmea"]').forEach(o=>o.remove());return}const s=Ug(t),a=Object.keys(s).sort();Ba(i,a,"nmea"),a.forEach(o=>{if(!document.getElementById(`${o}-points-stat`)){const c=n?`#${qi(o).getHexString()}`:r?`#${$i(o).getHexString()}`:`#${Un(e,o).getHexString()}`;i.insertAdjacentHTML("beforeend",Zg(o,c))}const l=Ng(s[o]);l&&jg(o,l)})}function Qg(i,t){return`
        <div class="stats-group" data-data-type="adsb" data-panel-id="${i}">
            <h3 style="color: ${t};" class="talker-header" data-talker-id="${i}" tabindex="0" role="button" title="Click to follow">
                <span id="${i}-header-model">Loading...</span>
            </h3>
            <img id="${i}-aircraft-img"
                 alt="Aircraft photo"
                 style="display:none; width:100%; max-height:120px; object-fit:cover; border-radius:3px; margin:0px 0 6px 0; opacity:1;"
                 onerror="this.style.display='none'"
                 onload="this.style.display='block'" />
            <table><tbody>
                <tr><td>Points:</td><td><span id="${i}-points-stat">0</span></td></tr>
                <tr><td>Hex ID:</td><td><a href="https://globe.adsbexchange.com/?icao=${i}" target="_blank">${i}</a></td></tr>
                <tr><td>Registration:</td><td><span id="${i}-reg-stat">?</span></td></tr>
                <tr><td>Operator:</td><td><span id="${i}-operator-stat">?</span></td></tr>
                <tr><td>Type:</td><td><span id="${i}-type-stat">?</span></td></tr>
                <tr><td>Latitude:</td><td><span id="${i}-lat-stat">0.0</span>&deg;</td></tr>
                <tr><td>Longitude:</td><td><span id="${i}-long-stat">0.0</span>&deg;</td></tr>
                <tr><td>Alt (MSL):</td><td><span id="${i}-baroalt-stat">0.0</span> m</td></tr>
                <tr><td>Alt (WGS84):</td><td><span id="${i}-geoalt-stat">0.0</span> m</td></tr>
                <tr><td>Heading:</td><td><span id="${i}-hdg-stat">0.0</span>&deg;</td></tr>
                <tr><td>Hor Vel:</td><td><span id="${i}-hvel-stat">0.0</span> m/s</td></tr>
                <tr><td>Ver Vel:</td><td><span id="${i}-vvel-stat">0.0</span> m/s</td></tr>
                <tr><td>2D Distance:</td><td><span id="${i}-gdist-stat">0.0</span> m</td></tr>
                <tr><td>Last Seen:</td><td><span id="${i}-lastseen-stat">HH:mm:ss</span></td></tr>
                <tr><td>Duration:</td><td><span id="${i}-duration-stat">0.0</span> s</td></tr>
            </tbody></table>
        </div>`}function t_(i,t){const e=n=>document.getElementById(`${i}-${n}`);if(e("points-stat")&&(Oa(i),yc(i),e("points-stat").textContent=t.totalPoints,e("lat-stat").textContent=t.currentLat.toFixed(6),e("long-stat").textContent=t.currentLon.toFixed(6),e("baroalt-stat").textContent=t.currentBaroAltM!=null?t.currentBaroAltM.toFixed(1):"--",e("geoalt-stat").textContent=t.currentGeoAltM!=null?t.currentGeoAltM.toFixed(1):"--",e("hdg-stat").textContent=t.heading.toFixed(1),e("hvel-stat").textContent=t.horVelocityMs.toFixed(1),e("vvel-stat").textContent=t.verVelocityMs.toFixed(1),e("gdist-stat").textContent=t.totalGroundDist.toFixed(1),e("type-stat").textContent=zg(t.emitterType),e("duration-stat").textContent=t.duration.toFixed(1),t.lastSeen))try{e("lastseen-stat").textContent=new Date(t.lastSeen).toISOString().substring(11,19)}catch{e("lastseen-stat").textContent="--"}}function e_(i,t,e,n,r){if(t.length===0){i.querySelectorAll('.stats-group[data-data-type="adsb"]').forEach(o=>o.remove());return}const s=Og(t),a=Object.keys(s).sort();Ba(i,a,"adsb"),a.forEach(o=>{if(!document.getElementById(`${o}-points-stat`)){const c=n?`#${qi(o).getHexString()}`:r?`#${$i(o).getHexString()}`:`#${Un(e,o).getHexString()}`;i.insertAdjacentHTML("beforeend",Qg(o,c)),Oa(o)}const l=Bg(s[o]);l&&t_(o,l)})}function n_(i,t){const e=`radar_${i}`;return`
        <div class="stats-group" data-data-type="radar" data-panel-id="${e}">
            <h3 style="color: ${t};" class="talker-header" data-talker-id="${e}" tabindex="0" role="button" title="Click to follow">
                <span>Track ${i}</span>
            </h3>
            <table><tbody>
                <tr><td>Points:</td><td><span id="${e}-points-stat">0</span></td></tr>
                <tr><td>Ext ID:</td><td><span id="${e}-extid-stat">--</span></td></tr>
                <tr><td>RCS:</td><td><span id="${e}-rcs-stat">--</span> m&sup2;</td></tr>
                <tr><td>Latitude:</td><td><span id="${e}-lat-stat">0.0</span>&deg;</td></tr>
                <tr><td>Longitude:</td><td><span id="${e}-long-stat">0.0</span>&deg;</td></tr>
                <tr><td>Alt:</td><td><span id="${e}-alt-stat">0.0</span> m</td></tr>
                <tr><td>Vel:</td><td><span id="${e}-vel-stat">0.0</span> m/s</td></tr>
                <tr><td>Duration:</td><td><span id="${e}-duration-stat">0.0</span> s</td></tr>
            </tbody></table>
        </div>`}function i_(i,t){const e=`radar_${i}`,n=r=>document.getElementById(`${e}-${r}`);n("points-stat")&&(n("points-stat").textContent=t.totalPoints,n("extid-stat").textContent=t.currentExtId||"--",n("rcs-stat").textContent=t.currentRcs!=null?t.currentRcs.toFixed(4):"--",n("lat-stat").textContent=t.currentLat.toFixed(7),n("long-stat").textContent=t.currentLon.toFixed(7),n("alt-stat").textContent=t.currentAlt.toFixed(1),n("vel-stat").textContent=t.currentVel!=null?t.currentVel.toFixed(2):"--",n("duration-stat").textContent=t.duration.toFixed(1))}function r_(i,t,e,n,r){if(t.length===0){i.querySelectorAll('.stats-group[data-data-type="radar"]').forEach(o=>o.remove());return}const s=Vg(t),a=Object.keys(s).sort((o,l)=>Number(o)-Number(l));Ba(i,a.map(o=>`radar_${o}`),"radar"),a.forEach(o=>{const l=`radar_${o}`;if(!document.getElementById(`${l}-points-stat`)){const d=n?`#${qi(l).getHexString()}`:r?`#${$i(l).getHexString()}`:`#${Un(e,l).getHexString()}`;i.insertAdjacentHTML("beforeend",n_(o,d))}const c=Wg(s[o]);c&&i_(o,c)})}function s_(){const i=document.getElementById("stats");i&&(Sc(i),window.addEventListener("cinematicTargetChanged",t=>{Tc=t.detail.talkerId,Ac()}),i.addEventListener("click",t=>{const e=t.target.closest(".talker-header");if(!e)return;const n=e.dataset.talkerId;n&&window.dispatchEvent(new CustomEvent("activateCinematicForTalker",{detail:{talkerId:n}}))}))}s_();const tn=new Map;let _a=null,za=!0;function a_(i){za=i,tn.forEach(t=>{t.visible=i})}function o_(){const i=document.getElementById("show-label-toggle");i&&(za=i.checked,i.addEventListener("change",()=>a_(i.checked)))}function l_(i){_a=i,o_(),window.addEventListener("aircraftInfoLoaded",t=>{t.detail?.talkerId&&d_(t.detail.talkerId)})}function c_(){tn.forEach(i=>{i.parent&&i.parent.remove(i),i.element?.parentNode&&i.element.parentNode.removeChild(i.element)}),tn.clear()}function d_(i){let t=tn.get(i);if(!t){for(const[r,s]of tn.entries())if(r.toLowerCase()===i.toLowerCase()){t=s;break}}if(!t)return;const e=Ec(i),n=e&&e!=="Unknown"&&e!=="Unknown Model"&&e!=="Loading..."?e:`Aircraft ${i}`;t.element.textContent!==n&&(t.element.textContent=n)}function u_(i,t){if(!(!_a||!t)){tn.forEach((e,n)=>{n in i||(e.parent&&e.parent.remove(e),e.element?.parentNode&&e.element.parentNode.removeChild(e.element),tn.delete(n))});for(const e in i){const n=i[e];if(n.length===0)continue;const r=n[n.length-1],s=t(r.lat,r.lon,r.alt);let a=tn.get(e);if(!a){const l=document.createElement("div");l.className="track-label",l.setAttribute("data-track-label-id",e),l.style.cssText=`
                margin-top: -20px;
                color: #ffffff;
                font-size: 12px;
                font-weight: 600;
                font-family: inherit;
                white-space: nowrap;
                pointer-events: none;
                text-shadow:
                    -1px -1px 2px rgba(0,0,0,0.9),
                     1px -1px 2px rgba(0,0,0,0.9),
                    -1px  1px 2px rgba(0,0,0,0.9),
                     1px  1px 2px rgba(0,0,0,0.9),
                     0    0   6px rgba(0,0,0,0.6);
            `,a=new _c(l),a.visible=za,tn.set(e,a),_a.add(a)}let o;if(r.dataType==="radar")o=`Track ${e.startsWith("radar_")?e.slice(6):e}`;else if(r.dataType==="adsb"){const l=Ec(e);o=l&&l!=="Unknown"&&l!=="Unknown Model"?l:`Aircraft ${e}`}else o=`Rover ${e}`;a.element.textContent!==o&&(a.element.textContent=o),a.position.copy(s)}}}function ar(i,t=!1){tn.forEach((e,n)=>{if(e.element)if(t)e.element.style.color="#ffffff";else{const r=i(n);e.element.style.color=typeof r=="string"?r:`#${r.getHexString()}`}})}let he=new Map,Ii=[],bc=null,ri=!1,Bn=null,si=!1;const va={radar:new _t(16720418),adsb:new _t(2254591),nmea:new _t(16768256)};function wc(i){return i?i.dataType==="radar"?"radar":i.dataType==="adsb"?"adsb":i.dataType==="nmea"?"nmea":i.icaoAddress!==void 0||i.heading!==void 0||i.horizontalVelocity!==void 0?"adsb":(i.talkerId&&/^[A-Z]{2}$/.test(i.talkerId),"nmea"):"nmea"}const h_=.618033988749895,ra=new Map;let f_=0;function p_(i){if(!ra.has(i)){const t=f_++;ra.set(i,{index:t,hueOffset:t===0?0:t*h_%1})}return ra.get(i)}function Un(i,t){const e=p_(t);if(e.index===0)return i.clone();const n={};return i.getHSL(n),n.h=(n.h+e.hueOffset)%1,new _t().setHSL(n.h,n.s,n.l)}const m_=["trail-head-color","trail-tail-color","trail-line-color"];function ss(){const i=ri||si;m_.forEach(t=>{const e=document.getElementById(t);if(!e)return;e.disabled=i,e.style.opacity=i?"0.35":"1",e.style.cursor=i?"not-allowed":"pointer";const n=e.closest(".trail-group");n&&(n.style.cursor=i?"not-allowed":"")})}function $i(i){const t=he.get(i);if(!t||!t.gpsPoints||!t.gpsPoints.length)return new _t(16777215);const e=t.gpsPoints[0],n=wc(e);return va[n]?va[n].clone():new _t(16777215)}function Cc(){he&&he.forEach(({points:i,gpsPoints:t})=>{if(!i)return;const e=i.geometry.attributes.color.array;t.forEach((n,r)=>{const s=wc(n),a=va[s]||new _t(16777215),o=r*3;e[o]=a.r,e[o+1]=a.g,e[o+2]=a.b}),i.geometry.attributes.color.needsUpdate=!0})}function g_(){si=!0,Cc(),pr(),ar($i),fs(),ss()}function Rc(){return si}const Ul=3,sa=5,__=8;function aa(){!he||he.size===0||he.forEach(({points:i,gpsPoints:t})=>{if(!i)return;const n=i.geometry.attributes.pointSize;if(!n)return;const r=n.array,s=t.length,a=Math.max(0,s-Ul);for(let o=0;o<s;o++)if(o<a)r[o]=sa;else{const l=(o-a)/(Math.min(Ul,s)-1||1);r[o]=sa+(__-sa)*l}n.needsUpdate=!0})}function v_(i,t,e){he=i,Ii=t,bc=e;const n=document.getElementById("show-lines-toggle"),r=n?n.checked:!1;he.forEach(({line:s})=>{s&&(s.visible=r)})}function x_(){if(!Ii||Ii.length===0)return null;const i=Ii.map(r=>r.alt),t=Math.min(...i),e=Math.max(...i),n=e-t;return n===0?null:{minElevation:t,maxElevation:e,elevationRange:n}}function Pc(i,t){const{minElevation:e,elevationRange:n}=t,r=Math.max(0,Math.min(1,(i-e)/n));let s,a,o;if(r<.25){const l=r/.25;s=0,a=l*.8,o=1}else if(r<.5){const l=(r-.25)/.25;s=0,a=.8+l*.2,o=1-l}else if(r<.75)s=(r-.5)/.25,a=1,o=0;else{const l=(r-.75)/.25;s=1,a=1-l,o=0}return new _t(s,a,o)}function qi(i){const t=he.get(i);if(!t||!t.gpsPoints||!t.gpsPoints.length||!Bn)return new _t(16777215);const e=t.gpsPoints[t.gpsPoints.length-1];return Pc(e.alt,Bn)}function Lc(){!he||!Bn||!Ii.length||he.forEach(({points:i,gpsPoints:t})=>{if(!i)return;const e=i.geometry.attributes.color.array;t.forEach((n,r)=>{const s=Pc(n.alt,Bn),a=r*3;e[a]=s.r,e[a+1]=s.g,e[a+2]=s.b}),i.geometry.attributes.color.needsUpdate=!0})}function M_(){return Bn=x_(),Bn?(ri=!0,Lc(),pr(),ar(qi),fs(),ss(),!0):!1}function Dc(){return ri}function Ha(){if(!he||he.size===0||!bc||!Ii.length)return;if(ri&&Bn){Lc(),aa(),ar(qi);return}if(si){Cc(),aa(),ar($i);return}const i=new _t(document.getElementById("trail-head-color").value),t=new _t(document.getElementById("trail-tail-color").value);he.forEach(({points:e,gpsPoints:n},r)=>{if(!e||n.length===0)return;const s=Un(i,r),a=Un(t,r),o={},l={};a.getHSL(o),s.getHSL(l);const c=e.geometry.attributes.color.array,d=n.length,f=15,p=Math.max(0,d-f);for(let m=0;m<d;m++){let g;if(m<p)g=a;else{const h=(m-p)/(f-1),u=o.h+(l.h-o.h)*h,E=o.s+(l.s-o.s)*h,y=o.l+(l.l-o.l)*h;g=new _t().setHSL(u,E,y)}const _=m*3;c[_]=g.r,c[_+1]=g.g,c[_+2]=g.b}e.geometry.attributes.color.needsUpdate=!0}),aa(),ar(e=>Un(t,e))}function pr(){if(!he)return;const i=new _t(document.getElementById("trail-line-color").value),t=ri||si;he.forEach(({line:e},n)=>{if(!e||!e.material)return;const r=Un(i,n);e.material.color.copy(r),e.material.transparent=t,e.material.opacity=t?.2:1,e.material.depthWrite=!t,e.material.needsUpdate=!0})}function S_(){if(!he)return;const i=document.getElementById("show-lines-toggle").checked;he.forEach(({line:t})=>{t&&(t.visible=i)})}function y_(){return{head:new _t(document.getElementById("trail-head-color").value),tail:new _t(document.getElementById("trail-tail-color").value),line:new _t(document.getElementById("trail-line-color").value)}}function E_(){const i=document.getElementById("trail-head-color"),t=document.getElementById("trail-tail-color"),e=document.getElementById("trail-line-color"),n=document.getElementById("show-lines-toggle"),r=document.getElementById("stats");r&&r.addEventListener("wheel",o=>o.stopPropagation());const s=()=>{const o=document.getElementById("trail-preset");o&&(o.value=""),Ha(),pr(),fs()},a=()=>{S_()};i&&i.addEventListener("input",s),t&&t.addEventListener("input",s),e&&e.addEventListener("input",s),n&&n.addEventListener("change",a)}function ka(){ri&&(ri=!1,Bn=null,ss()),si&&(si=!1,ss()),Ha(),pr(),fs()}const T_=`
    attribute float pointSize;
    varying vec3 vColor;
    void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = pointSize;
        gl_Position = projectionMatrix * mvPosition;
    }
`,A_=`
    varying vec3 vColor;
    void main() {
        vec2 c = gl_PointCoord - 0.5;
        if (dot(c, c) > 0.25) discard;
        gl_FragColor = vec4(vColor, 1.0);
    }
`;let ei=null,Nn=null,ps=null,Ne=null,Ui=null,We=[],Qn=new Map,Ue=null,lr=null,Ni=null,mn=!1;function b_(i=null){if(!We||We.length===0||!Nn)return null;if(i===null){const n=We[We.length-1];return Nn(n.lat,n.lon,n.alt)}const t=We.filter(n=>n.talkerId===i);if(t.length===0)return null;const e=t[t.length-1];return Nn(e.lat,e.lon,e.alt)}function Ic(){return Ne}function w_(i){ei=i,l_(i)}function C_(){return Nn}function R_(){const i=mn?Ue:Ne,t=mn?Ni:Ui;return!i||t===null||t===void 0?0:(i.minAlt-t)*5}function Uc(i){!i||i.length===0||(Ue=i.reduce((t,e)=>({minLat:Math.min(t.minLat,e.lat),maxLat:Math.max(t.maxLat,e.lat),minLon:Math.min(t.minLon,e.lon),maxLon:Math.max(t.maxLon,e.lon),minAlt:Math.min(t.minAlt,e.alt),maxAlt:Math.max(t.maxAlt,e.alt)}),{minLat:1/0,maxLat:-1/0,minLon:1/0,maxLon:-1/0,minAlt:1/0,maxAlt:-1/0}),lr={lat:(Ue.minLat+Ue.maxLat)/2,lon:(Ue.minLon+Ue.maxLon)/2,alt:(Ue.minAlt+Ue.maxAlt)/2},Ni=i[0].alt,mn=!0,console.log("Global coordinate system initialized:",{globalCenter:lr,globalBounds:Ue}))}function P_(){Ue=null,lr=null,Ni=null,mn=!1}function L_(){ei&&(Qn.forEach(({points:i,line:t})=>{i&&(i.geometry&&i.geometry.dispose(),i.material&&(Array.isArray(i.material)?i.material.forEach(e=>e.dispose()):i.material.dispose()),ei.remove(i)),t&&(t.material&&(Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material.dispose()),ei.remove(t))}),Qn.clear(),c_(),We=[],ps=null,Ne=null,Ui=null)}function D_(i){!i||i.length===0||(Ne=i.reduce((t,e)=>({minLat:Math.min(t.minLat,e.lat),maxLat:Math.max(t.maxLat,e.lat),minLon:Math.min(t.minLon,e.lon),maxLon:Math.max(t.maxLon,e.lon),minAlt:Math.min(t.minAlt,e.alt),maxAlt:Math.max(t.maxAlt,e.alt)}),{minLat:1/0,maxLat:-1/0,minLon:1/0,maxLon:-1/0,minAlt:1/0,maxAlt:-1/0}),ps={lat:(Ne.minLat+Ne.maxLat)/2,lon:(Ne.minLon+Ne.maxLon)/2,alt:(Ne.minAlt+Ne.maxAlt)/2},Ui=i[0].alt)}function I_(){Nn=(i,t,e)=>{let n,r,s;typeof i=="object"&&i!==null&&"lat"in i?(n=i.lat,r=i.lon,s=i.alt!==void 0?i.alt:Ni||Ui):(n=i,r=t,s=e!==void 0?e:Ni||Ui);const a=mn?lr:ps,o=mn?Ni:Ui;if(n===void 0||r===void 0||s===void 0||a===null||o===null)return new L(0,0,0);const l=a.lat*Math.PI/180,c=10,d=(r-a.lon)*Math.cos(l)*111320*c,f=(s-o)*5,p=(n-a.lat)*111320*c;return new L(d,f,-p)}}function U_(i){const t=[];return i.forEach(e=>{const n=Nn(e.lat,e.lon,e.alt),r=(Math.random()-.5)*.01;t.push(n.x,n.y,n.z+r)}),{positions:t}}function N_(i,t){const e=new $e;e.setAttribute("position",new Ee(i.positions,3));const n=new Float32Array(i.positions.length);e.setAttribute("color",new Ee(n,3));const r=new Float32Array(t);r.fill(4),e.setAttribute("pointSize",new Ee(r,1));const s=new Xe({vertexColors:!0,vertexShader:T_,fragmentShader:A_,transparent:!1,depthTest:!0,depthWrite:!0}),a=new mg(e,s);a.renderOrder=0;const o=y_(),l=new Ia({color:o.line,transparent:!1,opacity:1,depthTest:!0,depthWrite:!0,linewidth:1e4}),c=new mc(e,l);c.renderOrder=0;const d=document.getElementById("show-lines-toggle");return c.visible=d?d.checked:!1,ei.add(c,a),{points:a,line:c}}function ai(i,t=!1){let e;if(t?(We.push(...i),e=We):(We=[...i],e=We),e.length===0)return L_(),null;Qn.forEach(({points:o,line:l})=>{o&&ei.remove(o),l&&ei.remove(l)}),Qn.clear(),D_(e),I_();const n=e.reduce((o,l)=>{const c=l.talkerId||"default";return o[c]||(o[c]=[]),o[c].push(l),o},{});for(const o in n){const l=n[o];if(l.length>1){const c=U_(l),d=N_(c,l.length);Qn.set(o,{points:d.points,line:d.line,gpsPoints:l})}}u_(n,Nn),console.log(`Plotted ${e.length} points across ${Qn.size} tracks.`),v_(Qn,We,mn?Ue:Ne),Ha(),pr();const s=mn?Ue:Ne,a=mn?lr:ps;return{dataSpan:Math.max((s.maxLat-s.minLat)*111320,(s.maxLon-s.minLon)*111320),firstPoint:i[0],firstPointVec:Nn(i[0].lat,i[0].lon,i[0].alt),center:a,bounds:s}}let we,Rn,Pn,un,bn,Yr,xa,xe,An=null;function F_(){we=new hg,we.background=new _t(328965),Yr=new Ri,xa=new Ri,we.add(Yr),Yr.add(xa),Rn=new Fe(75,window.innerWidth/window.innerHeight,1,1e7),Rn.position.set(610,610,610),Pn=new ug({antialias:!0}),Pn.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(Pn.domElement),un=new Ag,un.setSize(window.innerWidth,window.innerHeight),un.domElement.style.position="absolute",un.domElement.style.top="0px",un.domElement.style.pointerEvents="none",document.body.appendChild(un.domElement),bn=bg(Rn,Pn.domElement),we.add(new Eg(4210752,1.5));const i=new yg(16777215,1);i.position.set(0,100,50),we.add(i),xe=new Tg(100),xe.position.y=.1,we.add(xe),Rn.lookAt(xe.position),An=wg(we),Lg(we),Nc(),console.log("Scene initialized. Waiting for data file.")}function Yi(){return{scene:we,camera:Rn,renderer:Pn,labelRenderer:un,controls:bn,dataGroup:Yr,tileGroup:xa,axesHelper:xe}}function O_(){xe&&(we.remove(xe),xe.geometry&&xe.geometry.dispose(),xe.material&&(Array.isArray(xe.material)?xe.material.forEach(i=>i.dispose()):xe.material.dispose()),xe=null),An&&(we.remove(An),An.geometry&&An.geometry.dispose(),An.material&&An.material.dispose(),An=null)}function Nc(){if(requestAnimationFrame(Nc),bn.isCinematicActive&&bn.isCinematicActive()){const t=bn.getTargetTalkerId(),e=b_(t);e&&bn.setCinematicTarget(e)}bn.update();const i=bn.getCurrentCamera();Ig(i),Pn.render(we,i),un.render(we,i)}function B_(){Rn&&Pn&&(Rn.aspect=window.innerWidth/window.innerHeight,Rn.updateProjectionMatrix(),Pn.setSize(window.innerWidth,window.innerHeight),un.setSize(window.innerWidth,window.innerHeight))}const Ma={satellite:{url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",name:"Satellite"},streetview:{url:"https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",name:"Topographic"}},mr={initialOpacity:.5,initialTileService:"satellite",initialRenderDistance:5,initialRenderDistanceKm:2};function Nl(i,t,e){const n=Math.pow(2,e),r=Math.floor(n*((i+180)/360)),s=t*Math.PI/180,a=Math.floor(n*(1-Math.log(Math.tan(s)+1/Math.cos(s))/Math.PI)/2);return{x:Math.max(0,Math.min(n-1,r)),y:Math.max(0,Math.min(n-1,a))}}function as(i,t,e){const n=Math.pow(2,e),r=i/n*360-180,a=Math.atan(Math.sinh(Math.PI*(1-2*t/n)))*180/Math.PI;return{lon:r,lat:a}}function z_(i,t,e=5e3){return new Promise((n,r)=>{const s=setTimeout(()=>{r(new Error(`Timeout loading texture: ${t}`))},e);i.load(t,a=>{clearTimeout(s),n(a)},void 0,a=>{clearTimeout(s),r(a)})})}let Sa=mr.initialTileService,os=mr.initialOpacity,Ie=null;const H_=.51;let Ke=null;const ya=500;let Kr=null;function Fc(i){Kr=null}function k_(i,t){const e=t/111.32,n=(i.minLat+i.maxLat)/2,r=t/(111.32*Math.cos(n*Math.PI/180));return{minLat:i.minLat-e,maxLat:i.maxLat+e,minLon:i.minLon-r,maxLon:i.maxLon+r}}function G_(i){const t=Math.max(i.maxLon-i.minLon,1e-4),e=Math.max(i.maxLat-i.minLat,1e-4);for(let n=18;n>=1;n--){const r=Math.pow(2,n),s=Math.ceil(r*t/360)+1,a=Math.ceil(r*e/180)+1;if(s*a<=ya)return n}return 1}async function Ga(){const{tileGroup:i}=Yi(),t=window.getCurrentRenderDistance?window.getCurrentRenderDistance():mr.initialRenderDistanceKm,e=Ic(),n=C_();if(!e||!n){console.error("Bounding box or GPS conversion not available.");return}for(;i.children.length>0;){const y=i.children[0];i.remove(y),y.geometry&&y.geometry.dispose(),y.material&&(y.material.map&&y.material.map.dispose(),y.material.dispose())}const r=k_(e,t),s=Kr!==null?Kr:G_(r),a=Nl(r.minLon,r.maxLat,s),o=Nl(r.maxLon,r.minLat,s),l={x:Math.floor((a.x+o.x)/2),y:Math.floor((a.y+o.y)/2)},c=o.x-a.x+1,d=o.y-a.y+1,f=c*d;if(isNaN(a.x)||isNaN(a.y)||isNaN(o.x)||isNaN(o.y)||o.x<a.x||o.y<a.y||c>1e3||d>1e3){console.error("Invalid tile coordinate range:",{minTile:a,maxTile:o,bbox:r});return}if(f>ya){console.warn(`Tile count ${f} still exceeds MAX_TILE_COUNT (${ya}) after auto-zoom. Aborting tile fetch.`);return}const p=as(a.x,a.y,s),m=as(o.x+1,o.y+1,s),g=n({lat:p.lat,lon:p.lon}),_=n({lat:m.lat,lon:m.lon});Ke={minX:Math.min(g.x,_.x),maxX:Math.max(g.x,_.x),minZ:Math.min(g.z,_.z),maxZ:Math.max(g.z,_.z)};const h=[];for(let y=a.x;y<=o.x;y++)for(let T=a.y;T<=o.y;T++)h.push({x:y,y:T});h.sort((y,T)=>Math.hypot(y.x-l.x,y.y-l.y)-Math.hypot(T.x-l.x,T.y-l.y));const u=R_();console.log(`Loading ${h.length} tiles | zoom ${s} (${Kr!==null?"manual":"auto"}) | renderDist ${t} km | floorY ${u.toFixed(1)}`);const E=new xg;await Promise.all(h.map(({x:y,y:T})=>V_(y,T,s,E,n,u).catch(()=>null))),W_(u),console.log("Finished loading tiles.")}async function V_(i,t,e,n,r,s){const{tileGroup:a}=Yi(),o=Ma[Sa].url.replace("{z}",e).replace("{y}",t).replace("{x}",i),l=as(i,t,e),c=as(i+1,t+1,e),d=r({lat:l.lat,lon:l.lon}),f=r({lat:c.lat,lon:c.lon}),p=Math.abs(f.x-d.x),m=Math.abs(f.z-d.z),g=await z_(n,o,5e3);g.wrapS=hn,g.wrapT=hn,g.minFilter=Re,g.magFilter=Re;const _=new ze(new ci(p,m),new Ra({map:g,side:Oe,transparent:!0,opacity:os}));_.rotation.x=-Math.PI/2,_.position.set((d.x+f.x)/2,s-.1,(d.z+f.z)/2),a.add(_)}function W_(i){const{scene:t}=Yi();if(Ie&&(t.remove(Ie),Ie.geometry.dispose(),Ie.material.dispose(),Ie=null),!Ke)return;const e=Ke.maxX-Ke.minX,n=Ke.maxZ-Ke.minZ,r=(Ke.minX+Ke.maxX)/2,s=(Ke.minZ+Ke.maxZ)/2,a=Math.max(e,n)/80;Ie=new ze(new ci(e,n),new Xe({uniforms:{uGridColor:{value:new _t(7829367)},uGridSize:{value:a},uLineWidth:{value:.5},uOpacity:{value:.55}},depthWrite:!1,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-8,polygonOffsetUnits:-8,transparent:!0,alphaTest:.01,blending:Dn,side:Oe,vertexShader:`
                varying vec3 vWorldPos;
                void main() {
                    vec4 wp = modelMatrix * vec4(position, 1.0);
                    vWorldPos = wp.xyz;
                    gl_Position = projectionMatrix * viewMatrix * wp;
                }
            `,fragmentShader:`
                uniform vec3 uGridColor;
                uniform float uGridSize;
                uniform float uLineWidth;
                uniform float uOpacity;
                varying vec3 vWorldPos;
                void main() {
                    vec2 coord = vWorldPos.xz / uGridSize;
                    vec2 grid  = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
                    float line = min(grid.x, grid.y);
                    float alpha = (1.0 - smoothstep(0.0, uLineWidth, line)) * uOpacity;
                    if (alpha < 0.01) discard;
                    gl_FragColor = vec4(uGridColor, alpha);
                }
            `})),Ie.rotation.x=-Math.PI/2,Ie.position.set(r,i,s),Ie.renderOrder=-1,t.add(Ie),Oc()}function Oc(){Ie&&(Ie.visible=os<H_)}function Fl(i){const{tileGroup:t}=Yi();os=parseFloat(i),t.children.forEach(e=>{e.material&&(e.material.opacity=os)}),Oc()}function X_(i){i!==Sa&&Ma[i]&&(Sa=i,console.log("Switched to tile service:",Ma[i].name),Ic()&&Ga())}let Va=[],Ea=[],ie=[],Ta=[],re=0,nn=!1,_n=!0,Zr=null,Gi=1;const $_=100,Bc=100;function oi(i){return i==null||i===0?null:i<1e10?i*1e3:i}function q_(){const i=[];for(const t of Ea)t&&t.length&&i.push(...t);ie=i.sort((t,e)=>{const n=oi(t.time)??1/0,r=oi(e.time)??1/0;return n-r})}function Ol(i){const t=oi(i);return t?new Date(t).toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"}):"--:--:--"}function Y_(i){const t=oi(ie[i]?.time),e=oi(ie[i+1]?.time);return t!=null&&e!=null&&e>t?Math.max(0,(e-t)/Gi):$_/Gi}function K_(){return Va}function Z_(i){Gi=i,nn&&(Ki(),Zi()),e0()}function Aa(){return{isLiveMode:_n,isPlaying:nn,currentPointIndex:re,totalLines:Va.length,totalPoints:ie.length,progress:ie.length>0?re/(ie.length-1):0,playbackSpeed:Gi}}function Wa(i){Ta=i||[]}function ms(i){Va=i;const t=Wc();if(t==="radar"){const e=i.join(`
`);Ea=[Mc(e)||[]]}else Ea=i.map(e=>t==="adsb"?xc(e)||[]:vc(e)||[]);q_(),re=Math.max(0,ie.length-1),ji()}function j_(){const i=document.getElementById("timeSlider");i&&ie.length>0&&(i.max=ie.length-1,_n&&(re=ie.length-1,i.value=re))}function Ki(){Zr!==null&&(clearTimeout(Zr),Zr=null)}function Zi(){if(!nn)return;if(re>=ie.length-1){Xa();return}const i=Y_(re);Zr=setTimeout(()=>{nn&&(re++,ji(),gr(),Zi())},i)}function J_(){Ki(),re>=ie.length-1&&(re=0),nn=!0,Hc(),Zi()}function Xa(){Ki(),nn=!1,Hc()}function Q_(){_n&&gs(),re=Math.max(0,re-Bc),ji(),gr(),nn&&(Ki(),Zi())}function t0(){_n&&gs(),re=Math.min(ie.length-1,re+Bc),ji(),gr(),nn&&(Ki(),Zi())}function gs(){_n=!1,kc()}function zc(){_n=!0,Xa(),re=Math.max(0,ie.length-1),ji(),kc(),gr()}function gr(){Wc();const i=ie.slice(0,re+1);let t=i;if(Ta.length>0){const e=oi(ie[re]?.time)??1/0,n=Ta.filter(r=>(oi(r.time)??1/0)<=e);t=[...i,...n]}ai(t,!1),ii(t)}function ji(){const i=document.getElementById("timeSlider"),t=document.getElementById("timeDisplay");if(ie.length>0){const e=ie.length-1;if(i&&(i.max=e,i.value=re),t){const n=ie[re]?.time,r=ie[e]?.time;t.textContent=`${Ol(n)} / ${Ol(r)}`}}}function Hc(){const i=document.getElementById("playIcon"),t=document.getElementById("pauseIcon");nn?(i&&(i.style.display="none"),t&&(t.style.display="inline")):(i&&(i.style.display="inline"),t&&(t.style.display="none"))}function kc(){const i=document.getElementById("goLive");i&&(i.style.opacity=_n?"0.5":"1.0",i.disabled=_n)}function e0(){const i=document.getElementById("currentSpeedDisplay");i&&(i.textContent=`${Gi}x`),document.querySelectorAll(".speed-option").forEach(t=>{t.classList.toggle("active",parseFloat(t.dataset.speed)===Gi)})}function Gc(i){_n&&gs(),re=parseInt(i.target.value),ji(),gr(),nn&&(Ki(),Zi())}function n0(i){const t=parseFloat(i.target.dataset.speed);if(!isNaN(t)&&t>0){Z_(t);const e=document.getElementById("speedOptions");e&&e.classList.remove("show")}}function i0(){const i=document.getElementById("timeSlider");i&&(["mousedown","mousemove","mouseup","click"].forEach(t=>{i.addEventListener(t,e=>e.stopPropagation())}),i.addEventListener("input",Gc))}const r0=`<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 576 512">\r
<path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 92.9-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.8-35.7-46.1-87.7-92.9-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0a144 144 0 1 1-288 0zm144-64a64 64 0 1 1 0 128a64 64 0 0 1 0-128z"/></svg>`,s0=`<svg class="trash-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 448 512"><path fill="currentColor" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>\r
`,a0=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512">\r
<path fill="currentColor" d="M232.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 149.8C5.4 145.8 0 137.3 0 128s5.4-17.9 13.9-21.8L232.5 5.2zM48.1 218.4l164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 277.8C5.4 273.8 0 265.3 0 256s5.4-17.9 13.9-21.8l34.1-15.8zM13.9 362.2l34.1-15.8 164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 405.8C5.4 401.8 0 393.3 0 384s5.4-17.9 13.9-21.8z"/></svg>`,Se=new Map;let Pe=null,o0=1,l0=10;const Ve=new Set;function _s(i,t){return t==="adsb"?xc(i):t==="radar"?Mc(i):vc(i)}async function c0(){const i=[];for(const t of Ve){const e=Se.get(t);if(e)try{const r=await(await e.handle.getFile()).text();i.push(..._s(r,e.type))}catch(n){console.error(`Overlay read failed for file ${t}:`,n)}}return i}async function Vc(){if(!Pe)return;const i=Se.get(Pe);if(i)try{const e=await(await i.handle.getFile()).text(),n=_s(e,i.type),r=await c0();Wa(r);const s=[...n,...r];if(s.length===0)return;ai(s,!1),ii(s,i.type)}catch(t){console.error("rerenderWithOverlays failed:",t)}}function d0(i){const t=Se.get(i);if(t)if(t.watcherInterval&&clearInterval(t.watcherInterval),Ve.delete(i),Se.delete(i),i===Pe){const e=[...Se.keys()];e.length>0?(Pe=null,Xc(e[e.length-1])):(Pe=null,ms([]),ai([]),ii([]),P_(),li())}else(Ve.size>0||i!==Pe)&&Vc(),li()}function Wc(){return Pe&&Se.get(Pe)?.type||null}function li(){const i=document.getElementById("fileListContainer");if(!i)return;i.innerHTML="",Se.size===0?i.style.display="none":i.style.display="flex";const t=Array.from(Se.entries());t.forEach(([r,s],a)=>{const o=r===Pe,l=Ve.has(r),c=a===t.length-1,d=document.createElement("div");d.className=o?"active":"",d.dataset.fileId=r,d.style.cssText=`
            display: flex; align-items: center; gap: 0.5rem;
            padding: 0.6em 0.8em;
            border: 1px solid ${o?"#f0f0f0":l?"#5588cc":"#333"};
            border-radius: 2px;
            cursor: pointer;
            font-size: 0.85em;
            color: ${o?"#e0e0e0":"#eee"};
            background: #1a1a1a;
            margin-bottom: ${c?"0":"5px"};
            user-select: none;
            width: 100%;
            box-sizing: border-box;
            min-width: 0;
            font-family: inherit;
            transition: border 0.2s ease;
        `;let f=`
            <span style="flex:1; min-width:0; overflow:hidden; white-space:nowrap;" title="${s.name}">
                ${s.name}
            </span>
            ${o?`<span style="flex-shrink:0; opacity:1; line-height:0; margin-left:auto;">
                        ${r0}
                    </span>`:""}
        `;if(o||(f+=`
                <span class="overlay-btn" data-overlaid="${l}"
                      style="flex-shrink:0; line-height:0; color:${l?"#4e9bff":"#88888888"}; transition:color 0.15s ease;"
                      title="${l?"Remove overlay":"Overlay onto current scene"}">
                    ${a0}
                </span>
                <span class="trash-btn" style="flex-shrink:0; line-height:0; color:#88888888; transition:color 0.15s ease;" title="Remove">
                    ${s0}
                </span>
            `),d.innerHTML=f,d.addEventListener("click",p=>{p.target.closest(".trash-btn")||p.target.closest(".overlay-btn")||Xc(r)}),!o){const p=d.querySelector(".trash-btn");p&&(p.addEventListener("mouseenter",()=>{p.style.color="#e03c3c"}),p.addEventListener("mouseleave",()=>{p.style.color="#88888888"}),p.addEventListener("click",g=>{g.stopPropagation(),d0(r)}));const m=d.querySelector(".overlay-btn");m&&(m.addEventListener("mouseenter",()=>{Ve.has(r)||(m.style.color="#4e9bff")}),m.addEventListener("mouseleave",()=>{m.style.color=Ve.has(r)?"#4e9bff":"#88888888"}),m.addEventListener("click",async g=>{g.stopPropagation(),Ve.has(r)?Ve.delete(r):Ve.add(r),li(),await Vc()}))}i.appendChild(d)});const e=document.getElementById("addFileBtn");e&&(e.style.display=Se.size>0?"":"none");const n=document.getElementById("openFileBtn");n&&Se.size>0?n.style.display="none":n&&(n.style.display="")}async function Xc(i){if(i===Pe)return;const t=Se.get(i);if(!t)return;Ve.clear(),Wa([]),Pe=i,Fc();const n=await(await t.handle.getFile()).text(),r=t.type==="radar"?[n]:n.split(`
`).filter(o=>o.trim());ms(r);const s=_s(n,t.type);if(s.length===0){ai([]),ii([],t.type),li();return}Uc(s);const a=ai(s,!1);ii(s,t.type),li(),a&&window.dispatchEvent(new CustomEvent("fileLoaded",{detail:a}))}async function u0(i){const t=Se.get(i);if(!(!t||!t.handle||t.isWatcherRunning)&&t.type!=="radar"){t.isWatcherRunning=!0;try{const e=await t.handle.getFile();if(e.size>t.readOffset){const n=await e.slice(t.readOffset).text();if(t.readOffset=e.size,n.length>0&&i===Pe){const r=n.split(`
`).filter(a=>a.trim()),s=[...K_(),...r];ms(s),Aa().isLiveMode?zc():j_()}}}catch(e){console.error(`Error watching file ${i}:`,e)}finally{t.isWatcherRunning=!1}}}function h0(i){const t=Se.get(i);!t||t.type==="radar"||(t.watcherInterval&&clearInterval(t.watcherInterval),t.watcherInterval=setInterval(()=>u0(i),l0))}async function Bl(i){try{const[t]=await window.showOpenFilePicker({types:[{accept:{"text/plain":[".txt",".log",".csv",".ubx",".crswap",".bin",".json",".ndjson"]}}],multiple:!1});if(!t)return!1;const e=await t.getFile(),n=await e.text();let r;kg(n)?r="radar":(r=Fg(n),r==="unknown"&&(r="nmea"));const s=o0++;Se.set(s,{id:s,handle:t,name:e.name,type:r,readOffset:e.size,watcherInterval:null,isWatcherRunning:!1}),Ve.clear(),Wa([]),Pe=s,Fc(null);const a=r==="radar"?[n]:n.split(`
`).filter(c=>c.trim());ms(a);const o=_s(n,r);if(o.length===0)return alert("No valid GPS / ADS-B / Radar points found."),ai([]),ii([],r),li(),!1;Uc(o);const l=ai(o,!1);return ii(o,r),li(),i&&l&&i(l),h0(s),!0}catch(t){return t.name!=="AbortError"&&console.error("File selection failed:",t),!1}}function f0(){const i=d=>{window.dispatchEvent(new CustomEvent("fileLoaded",{detail:d}))},t=document.getElementById("openFileBtn");t&&t.addEventListener("click",()=>Bl(i));const e=document.getElementById("addFileBtn");e&&e.addEventListener("click",()=>Bl(i));const n=document.getElementById("rewind");n&&n.addEventListener("click",Q_);const r=document.getElementById("playPause");r&&r.addEventListener("click",()=>{Aa().isLiveMode&&gs(),Aa().isPlaying?Xa():J_()});const s=document.getElementById("forward");s&&s.addEventListener("click",t0);const a=document.getElementById("goLive");a&&a.addEventListener("click",zc);const o=document.getElementById("timeSlider");o&&(o.addEventListener("input",Gc),i0());const l=document.getElementById("adjustSpeed"),c=document.getElementById("speedOptions");l&&c&&(l.addEventListener("click",d=>{d.stopPropagation(),c.classList.toggle("show")}),document.querySelectorAll(".speed-option").forEach(d=>{d.addEventListener("click",n0)}),window.addEventListener("click",()=>c.classList.remove("show")))}function p0(){m0(),_0(),g0()}function m0(){const i=document.getElementById("opacitySlider");i&&(i.value=mr.initialOpacity,Fl(i.value),i.addEventListener("input",t=>{Fl(t.target.value)}))}function g0(){document.querySelectorAll(".view-option").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".view-option").forEach(e=>e.classList.remove("active")),i.classList.add("active");const t=i.dataset.view;X_(t)})})}function _0(){const i=document.getElementById("renderMinus"),t=document.getElementById("renderPlus"),e=document.getElementById("renderValue");let n=mr.initialRenderDistance;const r=1,s=50,a=()=>{e&&(e.textContent=n),i&&(i.disabled=n<=r),t&&(t.disabled=n>=s)},o=l=>{n=Math.max(r,Math.min(s,l)),a(),Ga()};i&&i.addEventListener("click",()=>o(n-1)),t&&t.addEventListener("click",()=>o(n+1)),window.getCurrentRenderDistance=()=>n,a()}let zl=!1;function v0(){const{controls:i}=Yi();window.addEventListener("resize",B_),window.addEventListener("fileLoaded",t=>{const e=t.detail;e&&(zl||(O_(),Dg(),zl=!0),i.reset(e.dataSpan,e.firstPointVec),Ga())}),E_(),f0(),p0()}function x0(){F_();const{dataGroup:i}=Yi();w_(i),v0(),console.log("Application initialized successfully")}x0();document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelectorAll(".slider-wrapper"),t=e=>{const n=e.querySelector('input[type="range"]'),r=e.querySelector(".slider-tooltip");if(!n||!r)return;document.body.appendChild(r);const s=()=>{const a=parseFloat(n.value),o=parseFloat(n.min||0),l=parseFloat(n.max||1),d=parseFloat(n.step||.1)<1||a%1!==0;r.textContent=d?a.toFixed(1):a;const f=n.getBoundingClientRect(),p=16,m=10,g=l-o,_=g===0?0:(a-o)/g,h=f.width-p,u=_*h,E=f.left+u+p+m,y=f.top+f.height/2-r.offsetHeight/2;r.style.position="fixed",r.style.left=`${E-5}px`,r.style.top=`${y}px`,r.style.zIndex="99999999"};e.addEventListener("mouseenter",()=>{s(),r.style.opacity="1"}),e.addEventListener("mouseleave",()=>{r.style.opacity="0"}),n.addEventListener("input",s),s()};i.forEach(e=>{t(e)})});class ls{constructor(){this.validCount=0,this.invalidCount=0}validateNMEAChecksum(t){if(t=t.trim(),!t.startsWith("$")||!t.includes("*"))return!1;const e=t.split("*");if(e.length!==2)return!1;const n=e[0].substring(1),r=e[1],s=parseInt(r,16);if(isNaN(s))return!1;let a=0;for(let o=0;o<n.length;o++)a^=n.charCodeAt(o);return a===s}extractTalkerID(t){try{const e=t.trim();if(!e.startsWith("$"))return null;const n=e.indexOf(",");return n===-1?null:e.substring(1,n)}catch{return null}}sortNMEAData(t,e=null){const n={};this.validCount=0,this.invalidCount=0;for(const r of t)if(!(!r||r.trim().length===0))if(this.validateNMEAChecksum(r)){this.validCount++;const s=this.extractTalkerID(r);s?(n[s]||(n[s]=[],console.log(`Creating entry for valid talker ID: ${s}`)),n[s].push(r.trim())):this.invalidCount++}else this.invalidCount++;return console.log(`
--- Processing Summary ---`),console.log(`Valid sentences processed: ${this.validCount}`),console.log(`Invalid/disregarded lines: ${this.invalidCount}`),console.log("--------------------------"),{sortedData:n,validCount:this.validCount,invalidCount:this.invalidCount}}processFileContent(t,e=null){const n=t.split(`
`).map(r=>r.trim()).filter(r=>r.length>0);return this.sortNMEAData(n,e)}createDownloadableFiles(t,e){for(const[n,r]of Object.entries(t)){const s=`RTK_${n}_${e}.txt`,a=r.join(`
`)+`
`,o=new Blob([a],{type:"text/plain"}),l=URL.createObjectURL(o),c=document.createElement("a");c.href=l,c.download=s,c.click(),URL.revokeObjectURL(l),console.log(`Downloaded ${s} with ${r.length} sentences`)}}static validate(t){return new ls().validateNMEAChecksum(t)}static getTalkerID(t){return new ls().extractTalkerID(t)}}class M0{constructor(){this.coords=null,this.pollingRateMs=6e4,this.pollingInterval=null,this.fileHandle=null,this.writableStream=null,this.encoder=new TextEncoder,this.sampleCount=0,this.active=!1}async requestLocation(){return"geolocation"in navigator?new Promise(t=>{navigator.geolocation.getCurrentPosition(e=>{this.coords={latitude:parseFloat(e.coords.latitude.toFixed(6)),longitude:parseFloat(e.coords.longitude.toFixed(6))},console.log(`[WeatherRecorder] Location acquired: ${this.coords.latitude}, ${this.coords.longitude}`),t(!0)},e=>{console.warn("[WeatherRecorder] Location denied or unavailable:",e.message),t(!1)},{enableHighAccuracy:!1,timeout:1e4,maximumAge:3e5})}):(console.warn("[WeatherRecorder] Geolocation API not available."),!1)}async start(t,e){if(!this.coords)return console.log("[WeatherRecorder] No location available — weather recording skipped."),!1;const n=`weather_${e}.ndjson`;try{this.fileHandle=await t.getFileHandle(n,{create:!0}),this.writableStream=await this.fileHandle.createWritable(),console.log(`[WeatherRecorder] File created: ${n}`)}catch(r){return console.error("[WeatherRecorder] Failed to create weather file:",r),!1}return this.sampleCount=0,this.active=!0,await this._poll(),this.pollingInterval=setInterval(()=>this._poll(),this.pollingRateMs),console.log(`[WeatherRecorder] Polling started (every ${this.pollingRateMs/1e3} s).`),!0}async stop(){this.active=!1,this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null),this.writableStream&&(await this.writableStream.close(),this.writableStream=null,console.log(`[WeatherRecorder] Stopped. ${this.sampleCount} sample(s) written.`)),this.fileHandle=null}stopEmergency(){this.active=!1,this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null),this.writableStream&&(this.writableStream.close().catch(t=>console.error("[WeatherRecorder] pagehide close error:",t.message)),this.writableStream=null)}async _poll(){if(!this.active||!this.coords)return;const{latitude:t,longitude:e}=this.coords,n=`https://api.open-meteo.com/v1/forecast?latitude=${t}&longitude=${e}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;try{const r=await fetch(n,{signal:AbortSignal.timeout(1e4)});if(!r.ok)throw new Error(`HTTP ${r.status}: ${r.statusText}`);const s=await r.json();this.writableStream&&(await this.writableStream.write(this.encoder.encode(JSON.stringify(s)+`
`)),this.sampleCount++);const a=s.current;console.log(`[WeatherRecorder] ${a?.temperature_2m} °C  RH ${a?.relative_humidity_2m}%  Wind ${a?.wind_speed_10m} km/h`)}catch(r){console.warn("[WeatherRecorder] Poll failed:",r.message)}}}class S0{constructor(){this.startButton=document.getElementById("start-button"),this.endButton=document.getElementById("end-button"),this.statusMessage=document.getElementById("status-message"),this.baudRateSelect=document.getElementById("baud-rate"),this.selectPortButton=document.getElementById("select-port-button"),this.urlInput=document.getElementById("url-input"),this.weatherRecorder=new M0,this.weatherRecorder.requestLocation(),this.urlInput.addEventListener("keydown",t=>t.stopPropagation()),this.urlInput.addEventListener("keyup",t=>t.stopPropagation()),this.urlInput.addEventListener("keypress",t=>t.stopPropagation()),this.port=null,this.reader=null,this.urlPollingInterval=null,this.urlPollingRateMs=1e3,this.trafficData=[],this.trafficFileHandle=null,this.trafficWritableStream=null,this.urlActive=!1,this.isRecording=!1,this.outputDirHandle=null,this.sessionDirHandle=null,this.currentSubDirHandle=null,this.currentTimestamp=null,this.fileHandle=null,this.writableStream=null,this.bytesReceived=0,this.lastTime=0,this.rateInterval=null,this.totalBytesWritten=0,this.capturedData=[],"serial"in navigator?navigator.serial.addEventListener("disconnect",t=>{this.port&&t.target===this.port&&(console.log("Active COM port physically disconnected."),this.port=null,this.selectPortButton.textContent="Select Port",this.isRecording&&this.endRecording())}):this.handleUnsupportedBrowser(),this.initEventListeners()}initEventListeners(){this.startButton.addEventListener("click",()=>this.startRecording()),this.endButton.addEventListener("click",()=>this.endRecording()),this.selectPortButton.addEventListener("click",()=>this.selectPort()),window.addEventListener("beforeunload",t=>this.handleBeforeUnload(t)),window.addEventListener("pagehide",()=>this.handlePageHide())}handleUnsupportedBrowser(){console.warn("Web Serial API not supported — serial recording disabled. URL reader is still available."),this.selectPortButton.disabled=!0,this.selectPortButton.textContent="Not Supported"}async validateUrl(){const t=this.urlInput.value.trim();if(!t)return!1;try{const e=await fetch(t,{signal:AbortSignal.timeout(5e3)});if(!e.ok)throw new Error(`HTTP ${e.status}: ${e.statusText}`);return await e.json(),!0}catch(e){return console.error("URL validation failed:",e),alert(`URL endpoint unreachable:
${e.message}`),!1}}async pollUrl(){const t=this.urlInput.value.trim();try{const e=await fetch(t,{signal:AbortSignal.timeout(5e3)});if(!e.ok)return;const n=await e.json(),r={receivedAt:new Date().toISOString(),data:n};if(this.trafficData.push(r),this.trafficWritableStream){const s=JSON.stringify(r)+`
`,a=new TextEncoder().encode(s);this.totalBytesWritten+=a.length,await this.trafficWritableStream.write(a)}}catch(e){console.warn("URL poll error:",e.message)}}startUrlPolling(){this.urlActive&&(this.pollUrl(),this.urlPollingInterval=setInterval(()=>this.pollUrl(),this.urlPollingRateMs),console.log(`URL polling started (every ${this.urlPollingRateMs}ms).`))}stopUrlPolling(){this.urlPollingInterval&&(clearInterval(this.urlPollingInterval),this.urlPollingInterval=null,console.log("URL polling stopped."))}async selectPort(){try{this.port=await navigator.serial.requestPort();const t=this.port.getInfo(),e=t.usbProductId?`COM ${t.usbVendorId||""}:${t.usbProductId}`:"Unknown COM Port";this.selectPortButton.textContent=e,console.log("Port selected.")}catch(t){t.name!=="AbortError"&&(console.error("Error selecting port:",t),alert(`Error selecting port: ${t.message}`))}}async startRecording(){if(this.isRecording)return;const t=!!this.port,e=!!this.urlInput.value.trim();if(!t&&!e){alert("Please select a serial port and/or enter a URL endpoint before recording.");return}let n=!1;if(e){if(this.statusMessage.textContent="Validating URL...",n=await this.validateUrl(),!n&&!t){this.statusMessage.textContent="Disconnected";return}!n&&t&&console.warn("URL validation failed — continuing with serial only.")}if(this.urlActive=n,!t&&"serial"in navigator&&!this.urlActive&&(await this.selectPort(),!this.port)){this.statusMessage.textContent="Disconnected";return}if(!this.outputDirHandle)try{this.outputDirHandle=await window.showDirectoryPicker({id:"rtk-nmea-recordings",mode:"readwrite",startIn:"documents"}),console.log("Output directory selected.")}catch(a){if(a.name==="AbortError"){console.log("Folder selection cancelled."),this.statusMessage.textContent="Disconnected";return}console.error("Error selecting output directory:",a),alert(`Error selecting output directory: ${a.message}`);return}const r=new Date().toISOString().replace("T","_").replace(/\..+Z$/,"").replace(/[:]/g,"-");this.currentTimestamp=r;const s=`UBXView_${r}`;try{this.sessionDirHandle=await this.outputDirHandle.getDirectoryHandle(s,{create:!0}),console.log(`Session directory created: ${s}`)}catch(a){console.error("Error creating session directory:",a),alert(`Failed to create session folder "${s}": ${a.message}`);return}if(this.port){const a=`NMEAmsgs_${this.currentTimestamp}`;try{this.currentSubDirHandle=await this.sessionDirHandle.getDirectoryHandle(a,{create:!0})}catch(l){console.error("Error creating NMEA sub-directory:",l),alert(`Failed to create folder "${a}": ${l.message}`);return}const o=`RTKx_${r}.txt`;try{this.fileHandle=await this.currentSubDirHandle.getFileHandle(o,{create:!0}),this.writableStream=await this.fileHandle.createWritable()}catch(l){console.error("Error creating recording file:",l),alert(`File creation failed: ${l.message}`),this.currentSubDirHandle=null;return}}if(this.urlActive){const a=`pingStation_${this.currentTimestamp}.ndjson`;try{this.trafficFileHandle=await this.sessionDirHandle.getFileHandle(a,{create:!0}),this.trafficWritableStream=await this.trafficFileHandle.createWritable()}catch(o){if(console.error("Error creating traffic file:",o),alert(`Traffic file creation failed: ${o.message}`),!this.port)return;this.urlActive=!1}}if(await this.weatherRecorder.start(this.sessionDirHandle,this.currentTimestamp),this.totalBytesWritten=0,this.bytesReceived=0,this.trafficData=[],this.capturedData=[],this.port)try{const a=parseInt(this.baudRateSelect.value);await this.port.open({baudRate:a})}catch(a){console.error(`Serial open error: ${a.message}`),this.port=null,this.selectPortButton.textContent="Select Port",this.writableStream&&await this.writableStream.close(),this.trafficWritableStream&&await this.trafficWritableStream.close(),this.resetFileState(),this.resetUIToIdle(),alert("Could not open the COM port. It may be disconnected or in use by another application.");return}this.isRecording=!0,console.log("Recording started."),this.startButton.disabled=!0,this.endButton.disabled=!1,this.baudRateSelect.disabled=!0,this.selectPortButton.disabled=!0,this.urlInput.disabled=!0,this.urlInput.style.cursor="not-allowed",this.lastTime=performance.now(),this.rateInterval=setInterval(()=>this.updateRateDisplay(),1e3),this.port&&this.readAndWriteLoop(),this.startUrlPolling()}async endRecording(){if(!this.isRecording)return;if(clearInterval(this.rateInterval),this.rateInterval=null,this.stopUrlPolling(),await this.weatherRecorder.stop(),this.reader)try{await this.reader.cancel()}catch(e){console.error("Error cancelling reader:",e)}if(this.writableStream&&await this.writableStream.close(),this.trafficWritableStream&&await this.trafficWritableStream.close(),this.port)try{await this.port.close()}catch(e){console.error("Error closing port:",e)}const t=this.currentSubDirHandle?this.currentSubDirHandle.name:"(none)";if(console.log(`Recording stopped. NMEA dir: ${t}`),this.statusMessage.textContent=`Final size: ${this.formatFileSize(this.totalBytesWritten)}`,this.capturedData.length>0&&this.currentSubDirHandle){this.statusMessage.textContent="Post-processing...";try{await this.postProcessNMEA()}catch(e){console.error("Post-processing error:",e),alert(`Post-processing failed: ${e.message}`)}}this.reader=null,this.isRecording=!1,this.urlActive=!1,this.resetFileState(),this.capturedData=[],this.trafficData=[],this.totalBytesWritten=0,this.statusMessage.textContent="Ready",this.resetUIToIdle()}resetFileState(){this.fileHandle=null,this.writableStream=null,this.sessionDirHandle=null,this.currentSubDirHandle=null,this.trafficFileHandle=null,this.trafficWritableStream=null}resetUIToIdle(){this.startButton.disabled=!1,this.endButton.disabled=!0,this.baudRateSelect.disabled=!1,"serial"in navigator&&(this.selectPortButton.disabled=!1),this.urlInput.disabled=!1,this.urlInput.style.cursor=""}async readAndWriteLoop(){if(!this.port||!this.port.readable||!this.writableStream)return;this.reader=this.port.readable.getReader();const t=new TextDecoder;try{for(;;){const{value:e,done:n}=await this.reader.read();if(n)break;if(e){this.bytesReceived+=e.length,this.totalBytesWritten+=e.length,await this.writableStream.write(e);const r=t.decode(e,{stream:!0});this.capturedData.push(r)}}}catch(e){e.name!=="NetworkError"&&e.name!=="AbortError"?console.error(`Read Error: ${e.message}`):console.log("Read loop cancelled.")}finally{this.reader.releaseLock()}}async postProcessNMEA(){const e=this.capturedData.join("").split(`
`).map(s=>s.trim()).filter(s=>s.length>0);console.log(`Processing ${e.length} lines...`);const r=new ls().sortNMEAData(e,this.currentTimestamp);Object.keys(r.sortedData).length>0?(await this.saveSortedFiles(r.sortedData),this.statusMessage.textContent=`Done! ${r.validCount} valid, ${r.invalidCount} invalid`):this.statusMessage.textContent="No valid NMEA sentences found"}async saveSortedFiles(t){try{let e=await this.outputDirHandle.queryPermission({mode:"readwrite"});if(e!=="granted"&&(e=await this.outputDirHandle.requestPermission({mode:"readwrite"})),e!=="granted")throw new Error("Permission denied to write post-processed files.");if(!this.currentSubDirHandle)throw new Error("Current sub-directory handle is missing.");const n=this.currentSubDirHandle;for(const[r,s]of Object.entries(t)){const a=`${r}_${this.currentTimestamp}.txt`,l=await(await n.getFileHandle(a,{create:!0})).createWritable();await l.write(s.join(`
`)+`
`),await l.close()}}catch(e){console.error("Error saving sorted files:",e),alert(`Error saving sorted files: ${e.message}`)}}updateRateDisplay(){if(!this.rateInterval)return;const t=performance.now(),e=(t-this.lastTime)/1e3;if(e>0){const n=this.bytesReceived/e,r=this.formatBytesPerSecond(n),s=this.formatFileSize(this.totalBytesWritten),a=[r,s];this.urlActive&&a.push(`${this.trafficData.length} pkts`),this.statusMessage.textContent=a.join(" | ")}this.lastTime=t,this.bytesReceived=0}formatBytesPerSecond(t){if(t<1024)return`${t.toFixed(0)} B/s`;const e=t/1024;return e<1024?`${e.toFixed(2)} KB/s`:`${(e/1024).toFixed(2)} MB/s`}formatFileSize(t){if(t<1024)return`${t.toFixed(0)} B`;const e=t/1024;if(e<1024)return`${e.toFixed(2)} KB`;const n=e/1024;return n<1024?`${n.toFixed(2)} MB`:`${(n/1024).toFixed(2)} GB`}handleBeforeUnload(t){if(this.isRecording)return console.log("beforeunload: Recording in progress, prompting user."),t.preventDefault(),t.returnValue="Recording is in progress. Are you sure you want to leave?",t.returnValue}handlePageHide(){this.isRecording&&(this.weatherRecorder.stopEmergency(),clearInterval(this.rateInterval),this.rateInterval=null,this.stopUrlPolling(),this.reader&&(this.reader.cancel().catch(()=>{}),this.reader=null),this.writableStream&&(this.writableStream.close().catch(()=>{}),this.writableStream=null),this.trafficWritableStream&&(this.trafficWritableStream.close().catch(()=>{}),this.trafficWritableStream=null),this.port&&(this.port.close().catch(()=>{}),this.port=null),this.isRecording=!1)}}document.addEventListener("DOMContentLoaded",()=>new S0);const y0={invincible:{head:"#ffe753",tail:"#4c9cbf",line:"#3a3b3d",showLines:!0},neon:{head:"#00FFFF",tail:"#FF00FF",line:"#00FF00",showLines:!0},elevation:{showLines:!0,isElevationBased:!0},classify:{showLines:!0,isClassifyBased:!0}},Ln={head:document.getElementById("trail-head-color").value,tail:document.getElementById("trail-tail-color").value,line:document.getElementById("trail-line-color").value,showLines:document.getElementById("show-lines-toggle").checked};function Hl(i){document.getElementById("trail-head-color").value=i.head,document.getElementById("trail-tail-color").value=i.tail,document.getElementById("trail-line-color").value=i.line,document.getElementById("show-lines-toggle").checked=i.showLines,ka()}function E0(i){const t=y0[i];t&&(t.isElevationBased?M_()||(console.warn("Elevation mode failed, falling back to preset colors."),Hl(t)):t.isClassifyBased?g_():Hl(t))}document.getElementById("trail-preset").addEventListener("change",function(){const i=this.value;i?E0(i):(document.getElementById("trail-head-color").value=Ln.head,document.getElementById("trail-tail-color").value=Ln.tail,document.getElementById("trail-line-color").value=Ln.line,document.getElementById("show-lines-toggle").checked=Ln.showLines,ka())});["trail-head-color","trail-tail-color","trail-line-color"].forEach(i=>{document.getElementById(i).addEventListener("input",function(){document.getElementById("trail-preset").value="",Ln.head=document.getElementById("trail-head-color").value,Ln.tail=document.getElementById("trail-tail-color").value,Ln.line=document.getElementById("trail-line-color").value,ka()})});document.getElementById("show-lines-toggle").addEventListener("change",function(){Ln.showLines=this.checked});console.log("Trail controls with centralized refresh logic initialized");
