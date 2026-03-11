(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qa="165",Id=0,Mo=1,Dd=2,mc=1,Ud=2,gn=3,Gn=0,Te=1,ze=2,Sn=0,Bn=1,yo=2,Eo=3,To=4,Nd=5,ii=100,Fd=101,Od=102,Bd=103,zd=104,Hd=200,kd=201,Gd=202,Vd=203,wa=204,ba=205,Wd=206,Xd=207,$d=208,qd=209,Yd=210,Kd=211,jd=212,Zd=213,Jd=214,Qd=0,tu=1,eu=2,hs=3,nu=4,iu=5,ru=6,su=7,Ya=0,au=1,ou=2,zn=0,lu=1,cu=2,du=3,uu=4,hu=5,fu=6,pu=7,gc=300,Wi=301,Xi=302,Aa=303,Ca=304,ws=306,Ra=1e3,vn=1001,La=1002,ke=1003,mu=1004,Ir=1005,Re=1006,Bs=1007,oi=1008,Vn=1009,gu=1010,_u=1011,fs=1012,_c=1013,$i=1014,Dn=1015,bs=1016,vc=1017,xc=1018,qi=1020,vu=35902,xu=1021,Su=1022,nn=1023,Mu=1024,yu=1025,zi=1026,Yi=1027,Eu=1028,Sc=1029,Tu=1030,Mc=1031,yc=1033,zs=33776,Hs=33777,ks=33778,Gs=33779,wo=35840,bo=35841,Ao=35842,Co=35843,Ro=36196,Lo=37492,Po=37496,Io=37808,Do=37809,Uo=37810,No=37811,Fo=37812,Oo=37813,Bo=37814,zo=37815,Ho=37816,ko=37817,Go=37818,Vo=37819,Wo=37820,Xo=37821,Vs=36492,$o=36494,qo=36495,wu=36283,Yo=36284,Ko=36285,jo=36286,bu=3200,Au=3201,Ka=0,Cu=1,In="",Qe="srgb",Xn="srgb-linear",ja="display-p3",As="display-p3-linear",ps="linear",Yt="srgb",ms="rec709",gs="p3",Si=7680,Zo=519,Ru=512,Lu=513,Pu=514,Ec=515,Iu=516,Du=517,Uu=518,Nu=519,Jo=35044,Qo="300 es",xn=2e3,_s=2001;class Ji{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ws=Math.PI/180,Pa=180/Math.PI;function Sr(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(pe[i&255]+pe[i>>8&255]+pe[i>>16&255]+pe[i>>24&255]+"-"+pe[t&255]+pe[t>>8&255]+"-"+pe[t>>16&15|64]+pe[t>>24&255]+"-"+pe[e&63|128]+pe[e>>8&255]+"-"+pe[e>>16&255]+pe[e>>24&255]+pe[n&255]+pe[n>>8&255]+pe[n>>16&255]+pe[n>>24&255]).toLowerCase()}function Ee(i,t,e){return Math.max(t,Math.min(e,i))}function Fu(i,t){return(i%t+t)%t}function Xs(i,t,e){return(1-e)*i+e*t}function or(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Me(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Ot{constructor(t=0,e=0){Ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class At{constructor(t,e,n,r,s,a,o,l,c){At.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c)}set(t,e,n,r,s,a,o,l,c){const d=this.elements;return d[0]=t,d[1]=r,d[2]=o,d[3]=e,d[4]=s,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],m=n[5],g=n[8],_=r[0],p=r[3],f=r[6],M=r[1],E=r[4],T=r[7],U=r[2],w=r[5],A=r[8];return s[0]=a*_+o*M+l*U,s[3]=a*p+o*E+l*w,s[6]=a*f+o*T+l*A,s[1]=c*_+d*M+u*U,s[4]=c*p+d*E+u*w,s[7]=c*f+d*T+u*A,s[2]=h*_+m*M+g*U,s[5]=h*p+m*E+g*w,s[8]=h*f+m*T+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],d=t[8];return e*a*d-e*o*c-n*s*d+n*o*l+r*s*c-r*a*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],d=t[8],u=d*a-o*c,h=o*l-d*s,m=c*s-a*l,g=e*u+n*h+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(r*c-d*n)*_,t[2]=(o*n-r*a)*_,t[3]=h*_,t[4]=(d*e-r*l)*_,t[5]=(r*s-o*e)*_,t[6]=m*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply($s.makeScale(t,e)),this}rotate(t){return this.premultiply($s.makeRotation(-t)),this}translate(t,e){return this.premultiply($s.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const $s=new At;function Tc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function vr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ou(){const i=vr("canvas");return i.style.display="block",i}const tl={};function wc(i){i in tl||(tl[i]=!0,console.warn(i))}function Bu(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const el=new At().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),nl=new At().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Dr={[Xn]:{transfer:ps,primaries:ms,toReference:i=>i,fromReference:i=>i},[Qe]:{transfer:Yt,primaries:ms,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[As]:{transfer:ps,primaries:gs,toReference:i=>i.applyMatrix3(nl),fromReference:i=>i.applyMatrix3(el)},[ja]:{transfer:Yt,primaries:gs,toReference:i=>i.convertSRGBToLinear().applyMatrix3(nl),fromReference:i=>i.applyMatrix3(el).convertLinearToSRGB()}},zu=new Set([Xn,As]),Xt={enabled:!0,_workingColorSpace:Xn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!zu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Dr[t].toReference,r=Dr[e].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Dr[i].primaries},getTransfer:function(i){return i===In?ps:Dr[i].transfer}};function Hi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Mi;class Hu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Mi===void 0&&(Mi=vr("canvas")),Mi.width=t.width,Mi.height=t.height;const n=Mi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Mi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=vr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Hi(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Hi(e[n]/255)*255):e[n]=Hi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ku=0;class bc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=Sr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ys(r[a].image)):s.push(Ys(r[a]))}else s=Ys(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Ys(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Hu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Gu=0;class xe extends Ji{constructor(t=xe.DEFAULT_IMAGE,e=xe.DEFAULT_MAPPING,n=vn,r=vn,s=Re,a=oi,o=nn,l=Vn,c=xe.DEFAULT_ANISOTROPY,d=In){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=Sr(),this.name="",this.source=new bc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new At,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ra:t.x=t.x-Math.floor(t.x);break;case vn:t.x=t.x<0?0:1;break;case La:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ra:t.y=t.y-Math.floor(t.y);break;case vn:t.y=t.y<0?0:1;break;case La:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}xe.DEFAULT_IMAGE=null;xe.DEFAULT_MAPPING=gc;xe.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,n=0,r=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],d=l[4],u=l[8],h=l[1],m=l[5],g=l[9],_=l[2],p=l[6],f=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,T=(m+1)/2,U=(f+1)/2,w=(d+h)/4,A=(u+_)/4,I=(g+p)/4;return E>T&&E>U?E<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(E),r=w/n,s=A/n):T>U?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=w/r,s=I/r):U<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(U),n=A/s,r=I/s),this.set(n,r,s,e),this}let M=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(h-d)*(h-d));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(u-_)/M,this.z=(h-d)/M,this.w=Math.acos((c+m+f-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vu extends Ji{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Re,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new xe(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new bc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends Vu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ac extends xe{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=ke,this.minFilter=ke,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Wu extends xe{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=ke,this.minFilter=ke,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mr{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let l=n[r+0],c=n[r+1],d=n[r+2],u=n[r+3];const h=s[a+0],m=s[a+1],g=s[a+2],_=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=d,t[e+3]=u;return}if(o===1){t[e+0]=h,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==h||c!==m||d!==g){let p=1-o;const f=l*h+c*m+d*g+u*_,M=f>=0?1:-1,E=1-f*f;if(E>Number.EPSILON){const U=Math.sqrt(E),w=Math.atan2(U,f*M);p=Math.sin(p*w)/U,o=Math.sin(o*w)/U}const T=o*M;if(l=l*p+h*T,c=c*p+m*T,d=d*p+g*T,u=u*p+_*T,p===1-o){const U=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=U,c*=U,d*=U,u*=U}}t[e]=l,t[e+1]=c,t[e+2]=d,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],d=n[r+3],u=s[a],h=s[a+1],m=s[a+2],g=s[a+3];return t[e]=o*g+d*u+l*m-c*h,t[e+1]=l*g+d*h+c*u-o*m,t[e+2]=c*g+d*m+o*h-l*u,t[e+3]=d*g-o*u-l*h-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(r/2),u=o(s/2),h=l(n/2),m=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*d*u+c*m*g,this._y=c*m*u-h*d*g,this._z=c*d*g+h*m*u,this._w=c*d*u-h*m*g;break;case"YXZ":this._x=h*d*u+c*m*g,this._y=c*m*u-h*d*g,this._z=c*d*g-h*m*u,this._w=c*d*u+h*m*g;break;case"ZXY":this._x=h*d*u-c*m*g,this._y=c*m*u+h*d*g,this._z=c*d*g+h*m*u,this._w=c*d*u-h*m*g;break;case"ZYX":this._x=h*d*u-c*m*g,this._y=c*m*u+h*d*g,this._z=c*d*g-h*m*u,this._w=c*d*u+h*m*g;break;case"YZX":this._x=h*d*u+c*m*g,this._y=c*m*u+h*d*g,this._z=c*d*g-h*m*u,this._w=c*d*u-h*m*g;break;case"XZY":this._x=h*d*u-c*m*g,this._y=c*m*u-h*d*g,this._z=c*d*g+h*m*u,this._w=c*d*u+h*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],d=e[6],u=e[10],h=n+o+u;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(d-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(n>o&&n>u){const m=2*Math.sqrt(1+n-o-u);this._w=(d-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>u){const m=2*Math.sqrt(1+o-n-u);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+u-n-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,d=e._w;return this._x=n*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-n*c,this._z=s*d+a*c+n*l-r*o,this._w=a*d-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*r+e*this._y,this._z=m*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-e)*d)/c,h=Math.sin(e*d)/c;return this._w=a*u+this._w*h,this._x=n*u+this._x*h,this._y=r*u+this._y*h,this._z=s*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(il.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(il.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*n),d=2*(o*e-s*r),u=2*(s*n-a*e);return this.x=e+l*c+a*u-o*d,this.y=n+l*d+o*c-s*u,this.z=r+l*u+s*d-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ks.copy(this).projectOnVector(t),this.sub(Ks)}reflect(t){return this.sub(Ks.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ks=new P,il=new Mr;class yr{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ve.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ve.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ve.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ve):Ve.fromBufferAttribute(s,a),Ve.applyMatrix4(t.matrixWorld),this.expandByPoint(Ve);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ur.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ur.copy(n.boundingBox)),Ur.applyMatrix4(t.matrixWorld),this.union(Ur)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Ve),Ve.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(lr),Nr.subVectors(this.max,lr),yi.subVectors(t.a,lr),Ei.subVectors(t.b,lr),Ti.subVectors(t.c,lr),En.subVectors(Ei,yi),Tn.subVectors(Ti,Ei),Kn.subVectors(yi,Ti);let e=[0,-En.z,En.y,0,-Tn.z,Tn.y,0,-Kn.z,Kn.y,En.z,0,-En.x,Tn.z,0,-Tn.x,Kn.z,0,-Kn.x,-En.y,En.x,0,-Tn.y,Tn.x,0,-Kn.y,Kn.x,0];return!js(e,yi,Ei,Ti,Nr)||(e=[1,0,0,0,1,0,0,0,1],!js(e,yi,Ei,Ti,Nr))?!1:(Fr.crossVectors(En,Tn),e=[Fr.x,Fr.y,Fr.z],js(e,yi,Ei,Ti,Nr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ve).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ve).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const cn=[new P,new P,new P,new P,new P,new P,new P,new P],Ve=new P,Ur=new yr,yi=new P,Ei=new P,Ti=new P,En=new P,Tn=new P,Kn=new P,lr=new P,Nr=new P,Fr=new P,jn=new P;function js(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){jn.fromArray(i,s);const o=r.x*Math.abs(jn.x)+r.y*Math.abs(jn.y)+r.z*Math.abs(jn.z),l=t.dot(jn),c=e.dot(jn),d=n.dot(jn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Xu=new yr,cr=new P,Zs=new P;class Er{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Xu.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;cr.subVectors(t,this.center);const e=cr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(cr,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Zs.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(cr.copy(t.center).add(Zs)),this.expandByPoint(cr.copy(t.center).sub(Zs))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const dn=new P,Js=new P,Or=new P,wn=new P,Qs=new P,Br=new P,ta=new P;class Za{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(dn.copy(this.origin).addScaledVector(this.direction,e),dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Js.copy(t).add(e).multiplyScalar(.5),Or.copy(e).sub(t).normalize(),wn.copy(this.origin).sub(Js);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Or),o=wn.dot(this.direction),l=-wn.dot(Or),c=wn.lengthSq(),d=Math.abs(1-a*a);let u,h,m,g;if(d>0)if(u=a*l-o,h=a*o-l,g=s*d,u>=0)if(h>=-g)if(h<=g){const _=1/d;u*=_,h*=_,m=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=s,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*l)+c;else h=-s,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-a*s+o)),h=u>0?-s:Math.min(Math.max(-s,-l),s),m=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-s,-l),s),m=h*(h+2*l)+c):(u=Math.max(0,-(a*s+o)),h=u>0?s:Math.min(Math.max(-s,-l),s),m=-u*u+h*(h+2*l)+c);else h=a>0?-s:s,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Js).addScaledVector(Or,h),m}intersectSphere(t,e){dn.subVectors(t.center,this.origin);const n=dn.dot(this.direction),r=dn.dot(dn)-n*n,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,r=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,r=(t.min.x-h.x)*c),d>=0?(s=(t.min.y-h.y)*d,a=(t.max.y-h.y)*d):(s=(t.max.y-h.y)*d,a=(t.min.y-h.y)*d),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(t.min.z-h.z)*u,l=(t.max.z-h.z)*u):(o=(t.max.z-h.z)*u,l=(t.min.z-h.z)*u),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,dn)!==null}intersectTriangle(t,e,n,r,s){Qs.subVectors(e,t),Br.subVectors(n,t),ta.crossVectors(Qs,Br);let a=this.direction.dot(ta),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;wn.subVectors(this.origin,t);const l=o*this.direction.dot(Br.crossVectors(wn,Br));if(l<0)return null;const c=o*this.direction.dot(Qs.cross(wn));if(c<0||l+c>a)return null;const d=-o*wn.dot(ta);return d<0?null:this.at(d/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(t,e,n,r,s,a,o,l,c,d,u,h,m,g,_,p){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c,d,u,h,m,g,_,p)}set(t,e,n,r,s,a,o,l,c,d,u,h,m,g,_,p){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=d,f[10]=u,f[14]=h,f[3]=m,f[7]=g,f[11]=_,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/wi.setFromMatrixColumn(t,0).length(),s=1/wi.setFromMatrixColumn(t,1).length(),a=1/wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const h=a*d,m=a*u,g=o*d,_=o*u;e[0]=l*d,e[4]=-l*u,e[8]=c,e[1]=m+g*c,e[5]=h-_*c,e[9]=-o*l,e[2]=_-h*c,e[6]=g+m*c,e[10]=a*l}else if(t.order==="YXZ"){const h=l*d,m=l*u,g=c*d,_=c*u;e[0]=h+_*o,e[4]=g*o-m,e[8]=a*c,e[1]=a*u,e[5]=a*d,e[9]=-o,e[2]=m*o-g,e[6]=_+h*o,e[10]=a*l}else if(t.order==="ZXY"){const h=l*d,m=l*u,g=c*d,_=c*u;e[0]=h-_*o,e[4]=-a*u,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*d,e[9]=_-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const h=a*d,m=a*u,g=o*d,_=o*u;e[0]=l*d,e[4]=g*c-m,e[8]=h*c+_,e[1]=l*u,e[5]=_*c+h,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const h=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*d,e[4]=_-h*u,e[8]=g*u+m,e[1]=u,e[5]=a*d,e[9]=-o*d,e[2]=-c*d,e[6]=m*u+g,e[10]=h-_*u}else if(t.order==="XZY"){const h=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*d,e[4]=-u,e[8]=c*d,e[1]=h*u+_,e[5]=a*d,e[9]=m*u-g,e[2]=g*u-m,e[6]=o*d,e[10]=_*u+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose($u,t,qu)}lookAt(t,e,n){const r=this.elements;return be.subVectors(t,e),be.lengthSq()===0&&(be.z=1),be.normalize(),bn.crossVectors(n,be),bn.lengthSq()===0&&(Math.abs(n.z)===1?be.x+=1e-4:be.z+=1e-4,be.normalize(),bn.crossVectors(n,be)),bn.normalize(),zr.crossVectors(be,bn),r[0]=bn.x,r[4]=zr.x,r[8]=be.x,r[1]=bn.y,r[5]=zr.y,r[9]=be.y,r[2]=bn.z,r[6]=zr.z,r[10]=be.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],m=n[13],g=n[2],_=n[6],p=n[10],f=n[14],M=n[3],E=n[7],T=n[11],U=n[15],w=r[0],A=r[4],I=r[8],v=r[12],x=r[1],C=r[5],B=r[9],F=r[13],X=r[2],$=r[6],G=r[10],Y=r[14],k=r[3],dt=r[7],ct=r[11],ut=r[15];return s[0]=a*w+o*x+l*X+c*k,s[4]=a*A+o*C+l*$+c*dt,s[8]=a*I+o*B+l*G+c*ct,s[12]=a*v+o*F+l*Y+c*ut,s[1]=d*w+u*x+h*X+m*k,s[5]=d*A+u*C+h*$+m*dt,s[9]=d*I+u*B+h*G+m*ct,s[13]=d*v+u*F+h*Y+m*ut,s[2]=g*w+_*x+p*X+f*k,s[6]=g*A+_*C+p*$+f*dt,s[10]=g*I+_*B+p*G+f*ct,s[14]=g*v+_*F+p*Y+f*ut,s[3]=M*w+E*x+T*X+U*k,s[7]=M*A+E*C+T*$+U*dt,s[11]=M*I+E*B+T*G+U*ct,s[15]=M*v+E*F+T*Y+U*ut,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],d=t[2],u=t[6],h=t[10],m=t[14],g=t[3],_=t[7],p=t[11],f=t[15];return g*(+s*l*u-r*c*u-s*o*h+n*c*h+r*o*m-n*l*m)+_*(+e*l*m-e*c*h+s*a*h-r*a*m+r*c*d-s*l*d)+p*(+e*c*u-e*o*m-s*a*u+n*a*m+s*o*d-n*c*d)+f*(-r*o*d-e*l*u+e*o*h+r*a*u-n*a*h+n*l*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],d=t[8],u=t[9],h=t[10],m=t[11],g=t[12],_=t[13],p=t[14],f=t[15],M=u*p*c-_*h*c+_*l*m-o*p*m-u*l*f+o*h*f,E=g*h*c-d*p*c-g*l*m+a*p*m+d*l*f-a*h*f,T=d*_*c-g*u*c+g*o*m-a*_*m-d*o*f+a*u*f,U=g*u*l-d*_*l-g*o*h+a*_*h+d*o*p-a*u*p,w=e*M+n*E+r*T+s*U;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return t[0]=M*A,t[1]=(_*h*s-u*p*s-_*r*m+n*p*m+u*r*f-n*h*f)*A,t[2]=(o*p*s-_*l*s+_*r*c-n*p*c-o*r*f+n*l*f)*A,t[3]=(u*l*s-o*h*s-u*r*c+n*h*c+o*r*m-n*l*m)*A,t[4]=E*A,t[5]=(d*p*s-g*h*s+g*r*m-e*p*m-d*r*f+e*h*f)*A,t[6]=(g*l*s-a*p*s-g*r*c+e*p*c+a*r*f-e*l*f)*A,t[7]=(a*h*s-d*l*s+d*r*c-e*h*c-a*r*m+e*l*m)*A,t[8]=T*A,t[9]=(g*u*s-d*_*s-g*n*m+e*_*m+d*n*f-e*u*f)*A,t[10]=(a*_*s-g*o*s+g*n*c-e*_*c-a*n*f+e*o*f)*A,t[11]=(d*o*s-a*u*s-d*n*c+e*u*c+a*n*m-e*o*m)*A,t[12]=U*A,t[13]=(d*_*r-g*u*r+g*n*h-e*_*h-d*n*p+e*u*p)*A,t[14]=(g*o*r-a*_*r-g*n*l+e*_*l+a*n*p-e*o*p)*A,t[15]=(a*u*r-d*o*r+d*n*l-e*u*l-a*n*h+e*o*h)*A,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,d=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+n,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,d=a+a,u=o+o,h=s*c,m=s*d,g=s*u,_=a*d,p=a*u,f=o*u,M=l*c,E=l*d,T=l*u,U=n.x,w=n.y,A=n.z;return r[0]=(1-(_+f))*U,r[1]=(m+T)*U,r[2]=(g-E)*U,r[3]=0,r[4]=(m-T)*w,r[5]=(1-(h+f))*w,r[6]=(p+M)*w,r[7]=0,r[8]=(g+E)*A,r[9]=(p-M)*A,r[10]=(1-(h+_))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=wi.set(r[0],r[1],r[2]).length();const a=wi.set(r[4],r[5],r[6]).length(),o=wi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],We.copy(this);const c=1/s,d=1/a,u=1/o;return We.elements[0]*=c,We.elements[1]*=c,We.elements[2]*=c,We.elements[4]*=d,We.elements[5]*=d,We.elements[6]*=d,We.elements[8]*=u,We.elements[9]*=u,We.elements[10]*=u,e.setFromRotationMatrix(We),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,r,s,a,o=xn){const l=this.elements,c=2*s/(e-t),d=2*s/(n-r),u=(e+t)/(e-t),h=(n+r)/(n-r);let m,g;if(o===xn)m=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===_s)m=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=xn){const l=this.elements,c=1/(e-t),d=1/(n-r),u=1/(a-s),h=(e+t)*c,m=(n+r)*d;let g,_;if(o===xn)g=(a+s)*u,_=-2*u;else if(o===_s)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const wi=new P,We=new Kt,$u=new P(0,0,0),qu=new P(1,1,1),bn=new P,zr=new P,be=new P,rl=new Kt,sl=new Mr;class Ye{constructor(t=0,e=0,n=0,r=Ye.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],u=r[2],h=r[6],m=r[10];switch(e){case"XYZ":this._y=Math.asin(Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return rl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(rl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return sl.setFromEuler(this),this.setFromQuaternion(sl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ye.DEFAULT_ORDER="XYZ";class Cc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Yu=0;const al=new P,bi=new Mr,un=new Kt,Hr=new P,dr=new P,Ku=new P,ju=new Mr,ol=new P(1,0,0),ll=new P(0,1,0),cl=new P(0,0,1),dl={type:"added"},Zu={type:"removed"},Ai={type:"childadded",child:null},ea={type:"childremoved",child:null};class ae extends Ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=Sr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ae.DEFAULT_UP.clone();const t=new P,e=new Ye,n=new Mr,r=new P(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Kt},normalMatrix:{value:new At}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=ae.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return bi.setFromAxisAngle(t,e),this.quaternion.multiply(bi),this}rotateOnWorldAxis(t,e){return bi.setFromAxisAngle(t,e),this.quaternion.premultiply(bi),this}rotateX(t){return this.rotateOnAxis(ol,t)}rotateY(t){return this.rotateOnAxis(ll,t)}rotateZ(t){return this.rotateOnAxis(cl,t)}translateOnAxis(t,e){return al.copy(t).applyQuaternion(this.quaternion),this.position.add(al.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ol,t)}translateY(t){return this.translateOnAxis(ll,t)}translateZ(t){return this.translateOnAxis(cl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Hr.copy(t):Hr.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(dr,Hr,this.up):un.lookAt(Hr,dr,this.up),this.quaternion.setFromRotationMatrix(un),r&&(un.extractRotation(r.matrixWorld),bi.setFromRotationMatrix(un),this.quaternion.premultiply(bi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(dl),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Zu),ea.child=t,this.dispatchEvent(ea),ea.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),un.multiply(t.parent.matrixWorld)),t.applyMatrix4(un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(dl),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,t,Ku),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,ju,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++){const s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),d=a(t.images),u=a(t.shapes),h=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}ae.DEFAULT_UP=new P(0,1,0);ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xe=new P,hn=new P,na=new P,fn=new P,Ci=new P,Ri=new P,ul=new P,ia=new P,ra=new P,sa=new P;class en{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Xe.subVectors(t,e),r.cross(Xe);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Xe.subVectors(r,e),hn.subVectors(n,e),na.subVectors(t,e);const a=Xe.dot(Xe),o=Xe.dot(hn),l=Xe.dot(na),c=hn.dot(hn),d=hn.dot(na),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const h=1/u,m=(c*l-o*d)*h,g=(a*d-o*l)*h;return s.set(1-m-g,g,m)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,fn)===null?!1:fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getInterpolation(t,e,n,r,s,a,o,l){return this.getBarycoord(t,e,n,r,fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,fn.x),l.addScaledVector(a,fn.y),l.addScaledVector(o,fn.z),l)}static isFrontFacing(t,e,n,r){return Xe.subVectors(n,e),hn.subVectors(t,e),Xe.cross(hn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xe.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),Xe.cross(hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return en.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return en.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return en.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return en.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return en.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let a,o;Ci.subVectors(r,n),Ri.subVectors(s,n),ia.subVectors(t,n);const l=Ci.dot(ia),c=Ri.dot(ia);if(l<=0&&c<=0)return e.copy(n);ra.subVectors(t,r);const d=Ci.dot(ra),u=Ri.dot(ra);if(d>=0&&u<=d)return e.copy(r);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),e.copy(n).addScaledVector(Ci,a);sa.subVectors(t,s);const m=Ci.dot(sa),g=Ri.dot(sa);if(g>=0&&m<=g)return e.copy(s);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Ri,o);const p=d*g-m*u;if(p<=0&&u-d>=0&&m-g>=0)return ul.subVectors(s,r),o=(u-d)/(u-d+(m-g)),e.copy(r).addScaledVector(ul,o);const f=1/(p+_+h);return a=_*f,o=h*f,e.copy(n).addScaledVector(Ci,a).addScaledVector(Ri,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Rc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},kr={h:0,s:0,l:0};function aa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class pt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=Xt.workingColorSpace){if(t=Fu(t,1),e=Ee(e,0,1),n=Ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=aa(a,s,t+1/3),this.g=aa(a,s,t),this.b=aa(a,s,t-1/3)}return Xt.toWorkingColorSpace(this,r),this}setStyle(t,e=Qe){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qe){const n=Rc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Hi(t.r),this.g=Hi(t.g),this.b=Hi(t.b),this}copyLinearToSRGB(t){return this.r=qs(t.r),this.g=qs(t.g),this.b=qs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qe){return Xt.fromWorkingColorSpace(me.copy(this),t),Math.round(Ee(me.r*255,0,255))*65536+Math.round(Ee(me.g*255,0,255))*256+Math.round(Ee(me.b*255,0,255))}getHexString(t=Qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.fromWorkingColorSpace(me.copy(this),e);const n=me.r,r=me.g,s=me.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,e=Xt.workingColorSpace){return Xt.fromWorkingColorSpace(me.copy(this),e),t.r=me.r,t.g=me.g,t.b=me.b,t}getStyle(t=Qe){Xt.fromWorkingColorSpace(me.copy(this),t);const e=me.r,n=me.g,r=me.b;return t!==Qe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(An),this.setHSL(An.h+t,An.s+e,An.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(An),t.getHSL(kr);const n=Xs(An.h,kr.h,e),r=Xs(An.s,kr.s,e),s=Xs(An.l,kr.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const me=new pt;pt.NAMES=Rc;let Ju=0;class an extends Ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=Sr(),this.name="",this.type="Material",this.blending=Bn,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wa,this.blendDst=ba,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pt(0,0,0),this.blendAlpha=0,this.depthFunc=hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bn&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wa&&(n.blendSrc=this.blendSrc),this.blendDst!==ba&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ja extends an{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ye,this.combine=Ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ie=new P,Gr=new Ot;class Pe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Jo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return wc("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Gr.fromBufferAttribute(this,e),Gr.applyMatrix3(t),this.setXY(e,Gr.x,Gr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ie.fromBufferAttribute(this,e),ie.applyMatrix3(t),this.setXYZ(e,ie.x,ie.y,ie.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ie.fromBufferAttribute(this,e),ie.applyMatrix4(t),this.setXYZ(e,ie.x,ie.y,ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ie.fromBufferAttribute(this,e),ie.applyNormalMatrix(t),this.setXYZ(e,ie.x,ie.y,ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ie.fromBufferAttribute(this,e),ie.transformDirection(t),this.setXYZ(e,ie.x,ie.y,ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=or(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=or(e,this.array)),e}setX(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=or(e,this.array)),e}setY(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=or(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=or(e,this.array)),e}setW(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),r=Me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),r=Me(r,this.array),s=Me(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Jo&&(t.usage=this.usage),t}}class Lc extends Pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Pc extends Pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Qt extends Pe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Qu=0;const De=new Kt,oa=new ae,Li=new P,Ae=new yr,ur=new yr,ue=new P;class Se extends Ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=Sr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Tc(t)?Pc:Lc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new At().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return De.makeRotationFromQuaternion(t),this.applyMatrix4(De),this}rotateX(t){return De.makeRotationX(t),this.applyMatrix4(De),this}rotateY(t){return De.makeRotationY(t),this.applyMatrix4(De),this}rotateZ(t){return De.makeRotationZ(t),this.applyMatrix4(De),this}translate(t,e,n){return De.makeTranslation(t,e,n),this.applyMatrix4(De),this}scale(t,e,n){return De.makeScale(t,e,n),this.applyMatrix4(De),this}lookAt(t){return oa.lookAt(t),oa.updateMatrix(),this.applyMatrix4(oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Li).negate(),this.translate(Li.x,Li.y,Li.z),this}setFromPoints(t){const e=[];for(let n=0,r=t.length;n<r;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Qt(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Ae.setFromBufferAttribute(s),this.morphTargetsRelative?(ue.addVectors(this.boundingBox.min,Ae.min),this.boundingBox.expandByPoint(ue),ue.addVectors(this.boundingBox.max,Ae.max),this.boundingBox.expandByPoint(ue)):(this.boundingBox.expandByPoint(Ae.min),this.boundingBox.expandByPoint(Ae.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Er);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(Ae.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];ur.setFromBufferAttribute(o),this.morphTargetsRelative?(ue.addVectors(Ae.min,ur.min),Ae.expandByPoint(ue),ue.addVectors(Ae.max,ur.max),Ae.expandByPoint(ue)):(Ae.expandByPoint(ur.min),Ae.expandByPoint(ur.max))}Ae.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)ue.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(ue));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)ue.fromBufferAttribute(o,c),l&&(Li.fromBufferAttribute(t,c),ue.add(Li)),r=Math.max(r,n.distanceToSquared(ue))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new P,l[I]=new P;const c=new P,d=new P,u=new P,h=new Ot,m=new Ot,g=new Ot,_=new P,p=new P;function f(I,v,x){c.fromBufferAttribute(n,I),d.fromBufferAttribute(n,v),u.fromBufferAttribute(n,x),h.fromBufferAttribute(s,I),m.fromBufferAttribute(s,v),g.fromBufferAttribute(s,x),d.sub(c),u.sub(c),m.sub(h),g.sub(h);const C=1/(m.x*g.y-g.x*m.y);isFinite(C)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(C),p.copy(u).multiplyScalar(m.x).addScaledVector(d,-g.x).multiplyScalar(C),o[I].add(_),o[v].add(_),o[x].add(_),l[I].add(p),l[v].add(p),l[x].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let I=0,v=M.length;I<v;++I){const x=M[I],C=x.start,B=x.count;for(let F=C,X=C+B;F<X;F+=3)f(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const E=new P,T=new P,U=new P,w=new P;function A(I){U.fromBufferAttribute(r,I),w.copy(U);const v=o[I];E.copy(v),E.sub(U.multiplyScalar(U.dot(v))).normalize(),T.crossVectors(w,v);const C=T.dot(l[I])<0?-1:1;a.setXYZW(I,E.x,E.y,E.z,C)}for(let I=0,v=M.length;I<v;++I){const x=M[I],C=x.start,B=x.count;for(let F=C,X=C+B;F<X;F+=3)A(t.getX(F+0)),A(t.getX(F+1)),A(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,m=n.count;h<m;h++)n.setXYZ(h,0,0,0);const r=new P,s=new P,a=new P,o=new P,l=new P,c=new P,d=new P,u=new P;if(t)for(let h=0,m=t.count;h<m;h+=3){const g=t.getX(h+0),_=t.getX(h+1),p=t.getX(h+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),d.subVectors(a,s),u.subVectors(r,s),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,m=e.count;h<m;h+=3)r.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),d.subVectors(a,s),u.subVectors(r,s),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ue.fromBufferAttribute(t,e),ue.normalize(),t.setXYZ(e,ue.x,ue.y,ue.z)}toNonIndexed(){function t(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*d;for(let f=0;f<d;f++)h[g++]=c[m++]}return new Pe(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=t(l,n);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],m=t(h,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const m=c[u];d.push(m.toJSON(t.data))}d.length>0&&(r[l]=d,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(e))}const s=t.morphAttributes;for(const c in s){const d=[],u=s[c];for(let h=0,m=u.length;h<m;h++)d.push(u[h].clone(e));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hl=new Kt,Zn=new Za,Vr=new Er,fl=new P,Pi=new P,Ii=new P,Di=new P,la=new P,Wr=new P,Xr=new Ot,$r=new Ot,qr=new Ot,pl=new P,ml=new P,gl=new P,Yr=new P,Kr=new P;class ve extends ae{constructor(t=new Se,e=new Ja){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){Wr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],u=s[l];d!==0&&(la.fromBufferAttribute(u,t),a?Wr.addScaledVector(la,d):Wr.addScaledVector(la.sub(e),d))}e.add(Wr)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vr.copy(n.boundingSphere),Vr.applyMatrix4(s),Zn.copy(t.ray).recast(t.near),!(Vr.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Vr,fl)===null||Zn.origin.distanceToSquared(fl)>(t.far-t.near)**2))&&(hl.copy(s).invert(),Zn.copy(t.ray).applyMatrix4(hl),!(n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Zn)))}_computeIntersections(t,e,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,u=s.attributes.normal,h=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const p=h[g],f=a[p.materialIndex],M=Math.max(p.start,m.start),E=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let T=M,U=E;T<U;T+=3){const w=o.getX(T),A=o.getX(T+1),I=o.getX(T+2);r=jr(this,f,t,n,c,d,u,w,A,I),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const M=o.getX(p),E=o.getX(p+1),T=o.getX(p+2);r=jr(this,a,t,n,c,d,u,M,E,T),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const p=h[g],f=a[p.materialIndex],M=Math.max(p.start,m.start),E=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let T=M,U=E;T<U;T+=3){const w=T,A=T+1,I=T+2;r=jr(this,f,t,n,c,d,u,w,A,I),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=p.materialIndex,e.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const M=p,E=p+1,T=p+2;r=jr(this,a,t,n,c,d,u,M,E,T),r&&(r.faceIndex=Math.floor(p/3),e.push(r))}}}}function th(i,t,e,n,r,s,a,o){let l;if(t.side===Te?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,t.side===Gn,o),l===null)return null;Kr.copy(o),Kr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Kr);return c<e.near||c>e.far?null:{distance:c,point:Kr.clone(),object:i}}function jr(i,t,e,n,r,s,a,o,l,c){i.getVertexPosition(o,Pi),i.getVertexPosition(l,Ii),i.getVertexPosition(c,Di);const d=th(i,t,e,n,Pi,Ii,Di,Yr);if(d){r&&(Xr.fromBufferAttribute(r,o),$r.fromBufferAttribute(r,l),qr.fromBufferAttribute(r,c),d.uv=en.getInterpolation(Yr,Pi,Ii,Di,Xr,$r,qr,new Ot)),s&&(Xr.fromBufferAttribute(s,o),$r.fromBufferAttribute(s,l),qr.fromBufferAttribute(s,c),d.uv1=en.getInterpolation(Yr,Pi,Ii,Di,Xr,$r,qr,new Ot)),a&&(pl.fromBufferAttribute(a,o),ml.fromBufferAttribute(a,l),gl.fromBufferAttribute(a,c),d.normal=en.getInterpolation(Yr,Pi,Ii,Di,pl,ml,gl,new P),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new P,materialIndex:0};en.getNormal(Pi,Ii,Di,u.normal),d.face=u}return d}class Tr extends Se{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],u=[];let h=0,m=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,r,a,2),g("x","z","y",1,-1,t,n,-e,r,a,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Qt(c,3)),this.setAttribute("normal",new Qt(d,3)),this.setAttribute("uv",new Qt(u,2));function g(_,p,f,M,E,T,U,w,A,I,v){const x=T/A,C=U/I,B=T/2,F=U/2,X=w/2,$=A+1,G=I+1;let Y=0,k=0;const dt=new P;for(let ct=0;ct<G;ct++){const ut=ct*C-F;for(let Dt=0;Dt<$;Dt++){const Gt=Dt*x-B;dt[_]=Gt*M,dt[p]=ut*E,dt[f]=X,c.push(dt.x,dt.y,dt.z),dt[_]=0,dt[p]=0,dt[f]=w>0?1:-1,d.push(dt.x,dt.y,dt.z),u.push(Dt/A),u.push(1-ct/I),Y+=1}}for(let ct=0;ct<I;ct++)for(let ut=0;ut<A;ut++){const Dt=h+ut+$*ct,Gt=h+ut+$*(ct+1),V=h+(ut+1)+$*(ct+1),J=h+(ut+1)+$*ct;l.push(Dt,Gt,J),l.push(Gt,V,J),k+=6}o.addGroup(m,k,v),m+=k,h+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ki(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function _e(i){const t={};for(let e=0;e<i.length;e++){const n=Ki(i[e]);for(const r in n)t[r]=n[r]}return t}function eh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ic(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const nh={clone:Ki,merge:_e};var ih=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ke extends an{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ih,this.fragmentShader=rh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ki(t.uniforms),this.uniformsGroups=eh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Dc extends ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=xn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Cn=new P,_l=new Ot,vl=new Ot;class Be extends Dc{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Pa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ws*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Pa*2*Math.atan(Math.tan(Ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Cn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Cn.x,Cn.y).multiplyScalar(-t/Cn.z),Cn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Cn.x,Cn.y).multiplyScalar(-t/Cn.z)}getViewSize(t,e){return this.getViewBounds(t,_l,vl),e.subVectors(vl,_l)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ws*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ui=-90,Ni=1;class sh extends ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Be(Ui,Ni,t,e);r.layers=this.layers,this.add(r);const s=new Be(Ui,Ni,t,e);s.layers=this.layers,this.add(s);const a=new Be(Ui,Ni,t,e);a.layers=this.layers,this.add(a);const o=new Be(Ui,Ni,t,e);o.layers=this.layers,this.add(o);const l=new Be(Ui,Ni,t,e);l.layers=this.layers,this.add(l);const c=new Be(Ui,Ni,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===xn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===_s)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,u=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,a),t.setRenderTarget(n,2,r),t.render(e,o),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,d),t.setRenderTarget(u,h,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Uc extends xe{constructor(t,e,n,r,s,a,o,l,c,d){t=t!==void 0?t:[],e=e!==void 0?e:Wi,super(t,e,n,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ah extends hi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Uc(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Re}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Tr(5,5,5),s=new Ke({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Te,blending:Sn});s.uniforms.tEquirect.value=e;const a=new ve(r,s),o=e.minFilter;return e.minFilter===oi&&(e.minFilter=Re),new sh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}}const ca=new P,oh=new P,lh=new At;class ei{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=ca.subVectors(n,e).cross(oh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ca),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||lh.getNormalMatrix(t),r=this.coplanarPoint(ca).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new Er,Zr=new P;class Qa{constructor(t=new ei,e=new ei,n=new ei,r=new ei,s=new ei,a=new ei){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xn){const n=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],d=r[5],u=r[6],h=r[7],m=r[8],g=r[9],_=r[10],p=r[11],f=r[12],M=r[13],E=r[14],T=r[15];if(n[0].setComponents(l-s,h-c,p-m,T-f).normalize(),n[1].setComponents(l+s,h+c,p+m,T+f).normalize(),n[2].setComponents(l+a,h+d,p+g,T+M).normalize(),n[3].setComponents(l-a,h-d,p-g,T-M).normalize(),n[4].setComponents(l-o,h-u,p-_,T-E).normalize(),e===xn)n[5].setComponents(l+o,h+u,p+_,T+E).normalize();else if(e===_s)n[5].setComponents(o,u,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(t){return Jn.center.set(0,0,0),Jn.radius=.7071067811865476,Jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(Zr.x=r.normal.x>0?t.max.x:t.min.x,Zr.y=r.normal.y>0?t.max.y:t.min.y,Zr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Zr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Nc(){let i=null,t=!1,e=null,n=null;function r(s,a){e(s,a),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function ch(i){const t=new WeakMap;function e(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,d),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l._updateRange,h=l.updateRanges;if(i.bindBuffer(c,o),u.count===-1&&h.length===0&&i.bufferSubData(c,0,d),h.length!==0){for(let m=0,g=h.length;m<g;m++){const _=h[m];i.bufferSubData(c,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(i.bufferSubData(c,u.offset*d.BYTES_PER_ELEMENT,d,u.offset,u.count),u.count=-1),l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class xi extends Se{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(r),c=o+1,d=l+1,u=t/o,h=e/l,m=[],g=[],_=[],p=[];for(let f=0;f<d;f++){const M=f*h-a;for(let E=0;E<c;E++){const T=E*u-s;g.push(T,-M,0),_.push(0,0,1),p.push(E/o),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<o;M++){const E=M+c*f,T=M+c*(f+1),U=M+1+c*(f+1),w=M+1+c*f;m.push(E,T,w),m.push(T,U,w)}this.setIndex(m),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xi(t.width,t.height,t.widthSegments,t.heightSegments)}}var dh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uh=`#ifdef USE_ALPHAHASH
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
#endif`,hh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ph=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gh=`#ifdef USE_AOMAP
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
#endif`,_h=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vh=`#ifdef USE_BATCHING
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
#endif`,xh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Sh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Eh=`#ifdef USE_IRIDESCENCE
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
#endif`,Th=`#ifdef USE_BUMPMAP
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
#endif`,wh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,bh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ah=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ch=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Lh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ph=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ih=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Dh=`#define PI 3.141592653589793
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
} // validated`,Uh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Nh=`vec3 transformedNormal = objectNormal;
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
#endif`,Fh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Oh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hh="gl_FragColor = linearToOutputTexel( gl_FragColor );",kh=`
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
}`,Gh=`#ifdef USE_ENVMAP
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
#endif`,Vh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Wh=`#ifdef USE_ENVMAP
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
#endif`,Xh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$h=`#ifdef USE_ENVMAP
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
#endif`,qh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zh=`#ifdef USE_GRADIENTMAP
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
}`,Jh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ef=`uniform bool receiveShadow;
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
#endif`,nf=`#ifdef USE_ENVMAP
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
#endif`,rf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,af=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,of=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lf=`PhysicalMaterial material;
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
#endif`,cf=`struct PhysicalMaterial {
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
}`,df=`
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
#endif`,uf=`#if defined( RE_IndirectDiffuse )
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
#endif`,hf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ff=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_f=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Sf=`#if defined( USE_POINTS_UV )
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
#endif`,Mf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ef=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Tf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bf=`#ifdef USE_MORPHTARGETS
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
#endif`,Af=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Rf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Lf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,If=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Df=`#ifdef USE_NORMALMAP
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
#endif`,Uf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Nf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ff=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Of=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Hf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$f=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Kf=`float getShadowMask() {
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
}`,jf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zf=`#ifdef USE_SKINNING
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
#endif`,Jf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qf=`#ifdef USE_SKINNING
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
#endif`,tp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ep=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,np=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ip=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,rp=`#ifdef USE_TRANSMISSION
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
#endif`,sp=`#ifdef USE_TRANSMISSION
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
#endif`,ap=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,up=`uniform sampler2D t2D;
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
}`,hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gp=`#include <common>
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
}`,_p=`#if DEPTH_PACKING == 3200
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
}`,vp=`#define DISTANCE
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
}`,xp=`#define DISTANCE
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
}`,Sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Mp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yp=`uniform float scale;
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
}`,Ep=`uniform vec3 diffuse;
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
}`,Tp=`#include <common>
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
}`,wp=`uniform vec3 diffuse;
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
}`,bp=`#define LAMBERT
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
}`,Ap=`#define LAMBERT
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
}`,Cp=`#define MATCAP
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
}`,Rp=`#define MATCAP
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
}`,Lp=`#define NORMAL
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
}`,Pp=`#define NORMAL
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
}`,Ip=`#define PHONG
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
}`,Dp=`#define PHONG
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
}`,Up=`#define STANDARD
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
}`,Np=`#define STANDARD
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
}`,Fp=`#define TOON
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
}`,Op=`#define TOON
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
}`,Bp=`uniform float size;
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
}`,zp=`uniform vec3 diffuse;
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
}`,Hp=`#include <common>
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
}`,kp=`uniform vec3 color;
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
}`,Gp=`uniform float rotation;
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
}`,Vp=`uniform vec3 diffuse;
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
}`,bt={alphahash_fragment:dh,alphahash_pars_fragment:uh,alphamap_fragment:hh,alphamap_pars_fragment:fh,alphatest_fragment:ph,alphatest_pars_fragment:mh,aomap_fragment:gh,aomap_pars_fragment:_h,batching_pars_vertex:vh,batching_vertex:xh,begin_vertex:Sh,beginnormal_vertex:Mh,bsdfs:yh,iridescence_fragment:Eh,bumpmap_pars_fragment:Th,clipping_planes_fragment:wh,clipping_planes_pars_fragment:bh,clipping_planes_pars_vertex:Ah,clipping_planes_vertex:Ch,color_fragment:Rh,color_pars_fragment:Lh,color_pars_vertex:Ph,color_vertex:Ih,common:Dh,cube_uv_reflection_fragment:Uh,defaultnormal_vertex:Nh,displacementmap_pars_vertex:Fh,displacementmap_vertex:Oh,emissivemap_fragment:Bh,emissivemap_pars_fragment:zh,colorspace_fragment:Hh,colorspace_pars_fragment:kh,envmap_fragment:Gh,envmap_common_pars_fragment:Vh,envmap_pars_fragment:Wh,envmap_pars_vertex:Xh,envmap_physical_pars_fragment:nf,envmap_vertex:$h,fog_vertex:qh,fog_pars_vertex:Yh,fog_fragment:Kh,fog_pars_fragment:jh,gradientmap_pars_fragment:Zh,lightmap_pars_fragment:Jh,lights_lambert_fragment:Qh,lights_lambert_pars_fragment:tf,lights_pars_begin:ef,lights_toon_fragment:rf,lights_toon_pars_fragment:sf,lights_phong_fragment:af,lights_phong_pars_fragment:of,lights_physical_fragment:lf,lights_physical_pars_fragment:cf,lights_fragment_begin:df,lights_fragment_maps:uf,lights_fragment_end:hf,logdepthbuf_fragment:ff,logdepthbuf_pars_fragment:pf,logdepthbuf_pars_vertex:mf,logdepthbuf_vertex:gf,map_fragment:_f,map_pars_fragment:vf,map_particle_fragment:xf,map_particle_pars_fragment:Sf,metalnessmap_fragment:Mf,metalnessmap_pars_fragment:yf,morphinstance_vertex:Ef,morphcolor_vertex:Tf,morphnormal_vertex:wf,morphtarget_pars_vertex:bf,morphtarget_vertex:Af,normal_fragment_begin:Cf,normal_fragment_maps:Rf,normal_pars_fragment:Lf,normal_pars_vertex:Pf,normal_vertex:If,normalmap_pars_fragment:Df,clearcoat_normal_fragment_begin:Uf,clearcoat_normal_fragment_maps:Nf,clearcoat_pars_fragment:Ff,iridescence_pars_fragment:Of,opaque_fragment:Bf,packing:zf,premultiplied_alpha_fragment:Hf,project_vertex:kf,dithering_fragment:Gf,dithering_pars_fragment:Vf,roughnessmap_fragment:Wf,roughnessmap_pars_fragment:Xf,shadowmap_pars_fragment:$f,shadowmap_pars_vertex:qf,shadowmap_vertex:Yf,shadowmask_pars_fragment:Kf,skinbase_vertex:jf,skinning_pars_vertex:Zf,skinning_vertex:Jf,skinnormal_vertex:Qf,specularmap_fragment:tp,specularmap_pars_fragment:ep,tonemapping_fragment:np,tonemapping_pars_fragment:ip,transmission_fragment:rp,transmission_pars_fragment:sp,uv_pars_fragment:ap,uv_pars_vertex:op,uv_vertex:lp,worldpos_vertex:cp,background_vert:dp,background_frag:up,backgroundCube_vert:hp,backgroundCube_frag:fp,cube_vert:pp,cube_frag:mp,depth_vert:gp,depth_frag:_p,distanceRGBA_vert:vp,distanceRGBA_frag:xp,equirect_vert:Sp,equirect_frag:Mp,linedashed_vert:yp,linedashed_frag:Ep,meshbasic_vert:Tp,meshbasic_frag:wp,meshlambert_vert:bp,meshlambert_frag:Ap,meshmatcap_vert:Cp,meshmatcap_frag:Rp,meshnormal_vert:Lp,meshnormal_frag:Pp,meshphong_vert:Ip,meshphong_frag:Dp,meshphysical_vert:Up,meshphysical_frag:Np,meshtoon_vert:Fp,meshtoon_frag:Op,points_vert:Bp,points_frag:zp,shadow_vert:Hp,shadow_frag:kp,sprite_vert:Gp,sprite_frag:Vp},nt={common:{diffuse:{value:new pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new At},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new At}},envmap:{envMap:{value:null},envMapRotation:{value:new At},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new At}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new At}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new At},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new At},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new At},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new At}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new At}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new At}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0},uvTransform:{value:new At}},sprite:{diffuse:{value:new pt(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new At},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0}}},tn={basic:{uniforms:_e([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:bt.meshbasic_vert,fragmentShader:bt.meshbasic_frag},lambert:{uniforms:_e([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new pt(0)}}]),vertexShader:bt.meshlambert_vert,fragmentShader:bt.meshlambert_frag},phong:{uniforms:_e([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new pt(0)},specular:{value:new pt(1118481)},shininess:{value:30}}]),vertexShader:bt.meshphong_vert,fragmentShader:bt.meshphong_frag},standard:{uniforms:_e([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag},toon:{uniforms:_e([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new pt(0)}}]),vertexShader:bt.meshtoon_vert,fragmentShader:bt.meshtoon_frag},matcap:{uniforms:_e([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:bt.meshmatcap_vert,fragmentShader:bt.meshmatcap_frag},points:{uniforms:_e([nt.points,nt.fog]),vertexShader:bt.points_vert,fragmentShader:bt.points_frag},dashed:{uniforms:_e([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:bt.linedashed_vert,fragmentShader:bt.linedashed_frag},depth:{uniforms:_e([nt.common,nt.displacementmap]),vertexShader:bt.depth_vert,fragmentShader:bt.depth_frag},normal:{uniforms:_e([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:bt.meshnormal_vert,fragmentShader:bt.meshnormal_frag},sprite:{uniforms:_e([nt.sprite,nt.fog]),vertexShader:bt.sprite_vert,fragmentShader:bt.sprite_frag},background:{uniforms:{uvTransform:{value:new At},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:bt.background_vert,fragmentShader:bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new At}},vertexShader:bt.backgroundCube_vert,fragmentShader:bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:bt.cube_vert,fragmentShader:bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:bt.equirect_vert,fragmentShader:bt.equirect_frag},distanceRGBA:{uniforms:_e([nt.common,nt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:bt.distanceRGBA_vert,fragmentShader:bt.distanceRGBA_frag},shadow:{uniforms:_e([nt.lights,nt.fog,{color:{value:new pt(0)},opacity:{value:1}}]),vertexShader:bt.shadow_vert,fragmentShader:bt.shadow_frag}};tn.physical={uniforms:_e([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new At},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new At},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new At},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new At},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new At},sheen:{value:0},sheenColor:{value:new pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new At},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new At},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new At},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new At},attenuationDistance:{value:0},attenuationColor:{value:new pt(0)},specularColor:{value:new pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new At},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new At},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new At}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag};const Jr={r:0,b:0,g:0},Qn=new Ye,Wp=new Kt;function Xp(i,t,e,n,r,s,a){const o=new pt(0);let l=s===!0?0:1,c,d,u=null,h=0,m=null;function g(M){let E=M.isScene===!0?M.background:null;return E&&E.isTexture&&(E=(M.backgroundBlurriness>0?e:t).get(E)),E}function _(M){let E=!1;const T=g(M);T===null?f(o,l):T&&T.isColor&&(f(T,1),E=!0);const U=i.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,a):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(M,E){const T=g(E);T&&(T.isCubeTexture||T.mapping===ws)?(d===void 0&&(d=new ve(new Tr(1,1,1),new Ke({name:"BackgroundCubeMaterial",uniforms:Ki(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:Te,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(U,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),Qn.copy(E.backgroundRotation),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),d.material.uniforms.envMap.value=T,d.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Wp.makeRotationFromEuler(Qn)),d.material.toneMapped=Xt.getTransfer(T.colorSpace)!==Yt,(u!==T||h!==T.version||m!==i.toneMapping)&&(d.material.needsUpdate=!0,u=T,h=T.version,m=i.toneMapping),d.layers.enableAll(),M.unshift(d,d.geometry,d.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new ve(new xi(2,2),new Ke({name:"BackgroundMaterial",uniforms:Ki(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(T.colorSpace)!==Yt,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||h!==T.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,h=T.version,m=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function f(M,E){M.getRGB(Jr,Ic(i)),n.buffers.color.setClear(Jr.r,Jr.g,Jr.b,E,a)}return{getClearColor:function(){return o},setClearColor:function(M,E=1){o.set(M),l=E,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,f(o,l)},render:_,addToRenderList:p}}function $p(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,a=!1;function o(x,C,B,F,X){let $=!1;const G=u(F,B,C);s!==G&&(s=G,c(s.object)),$=m(x,F,B,X),$&&g(x,F,B,X),X!==null&&t.update(X,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,T(x,C,B,F),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function d(x){return i.deleteVertexArray(x)}function u(x,C,B){const F=B.wireframe===!0;let X=n[x.id];X===void 0&&(X={},n[x.id]=X);let $=X[C.id];$===void 0&&($={},X[C.id]=$);let G=$[F];return G===void 0&&(G=h(l()),$[F]=G),G}function h(x){const C=[],B=[],F=[];for(let X=0;X<e;X++)C[X]=0,B[X]=0,F[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:B,attributeDivisors:F,object:x,attributes:{},index:null}}function m(x,C,B,F){const X=s.attributes,$=C.attributes;let G=0;const Y=B.getAttributes();for(const k in Y)if(Y[k].location>=0){const ct=X[k];let ut=$[k];if(ut===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(ut=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(ut=x.instanceColor)),ct===void 0||ct.attribute!==ut||ut&&ct.data!==ut.data)return!0;G++}return s.attributesNum!==G||s.index!==F}function g(x,C,B,F){const X={},$=C.attributes;let G=0;const Y=B.getAttributes();for(const k in Y)if(Y[k].location>=0){let ct=$[k];ct===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(ct=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(ct=x.instanceColor));const ut={};ut.attribute=ct,ct&&ct.data&&(ut.data=ct.data),X[k]=ut,G++}s.attributes=X,s.attributesNum=G,s.index=F}function _(){const x=s.newAttributes;for(let C=0,B=x.length;C<B;C++)x[C]=0}function p(x){f(x,0)}function f(x,C){const B=s.newAttributes,F=s.enabledAttributes,X=s.attributeDivisors;B[x]=1,F[x]===0&&(i.enableVertexAttribArray(x),F[x]=1),X[x]!==C&&(i.vertexAttribDivisor(x,C),X[x]=C)}function M(){const x=s.newAttributes,C=s.enabledAttributes;for(let B=0,F=C.length;B<F;B++)C[B]!==x[B]&&(i.disableVertexAttribArray(B),C[B]=0)}function E(x,C,B,F,X,$,G){G===!0?i.vertexAttribIPointer(x,C,B,X,$):i.vertexAttribPointer(x,C,B,F,X,$)}function T(x,C,B,F){_();const X=F.attributes,$=B.getAttributes(),G=C.defaultAttributeValues;for(const Y in $){const k=$[Y];if(k.location>=0){let dt=X[Y];if(dt===void 0&&(Y==="instanceMatrix"&&x.instanceMatrix&&(dt=x.instanceMatrix),Y==="instanceColor"&&x.instanceColor&&(dt=x.instanceColor)),dt!==void 0){const ct=dt.normalized,ut=dt.itemSize,Dt=t.get(dt);if(Dt===void 0)continue;const Gt=Dt.buffer,V=Dt.type,J=Dt.bytesPerElement,ht=V===i.INT||V===i.UNSIGNED_INT||dt.gpuType===_c;if(dt.isInterleavedBufferAttribute){const st=dt.data,Pt=st.stride,Ct=dt.offset;if(st.isInstancedInterleavedBuffer){for(let zt=0;zt<k.locationSize;zt++)f(k.location+zt,st.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let zt=0;zt<k.locationSize;zt++)p(k.location+zt);i.bindBuffer(i.ARRAY_BUFFER,Gt);for(let zt=0;zt<k.locationSize;zt++)E(k.location+zt,ut/k.locationSize,V,ct,Pt*J,(Ct+ut/k.locationSize*zt)*J,ht)}else{if(dt.isInstancedBufferAttribute){for(let st=0;st<k.locationSize;st++)f(k.location+st,dt.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let st=0;st<k.locationSize;st++)p(k.location+st);i.bindBuffer(i.ARRAY_BUFFER,Gt);for(let st=0;st<k.locationSize;st++)E(k.location+st,ut/k.locationSize,V,ct,ut*J,ut/k.locationSize*st*J,ht)}}else if(G!==void 0){const ct=G[Y];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(k.location,ct);break;case 3:i.vertexAttrib3fv(k.location,ct);break;case 4:i.vertexAttrib4fv(k.location,ct);break;default:i.vertexAttrib1fv(k.location,ct)}}}}M()}function U(){I();for(const x in n){const C=n[x];for(const B in C){const F=C[B];for(const X in F)d(F[X].object),delete F[X];delete C[B]}delete n[x]}}function w(x){if(n[x.id]===void 0)return;const C=n[x.id];for(const B in C){const F=C[B];for(const X in F)d(F[X].object),delete F[X];delete C[B]}delete n[x.id]}function A(x){for(const C in n){const B=n[C];if(B[x.id]===void 0)continue;const F=B[x.id];for(const X in F)d(F[X].object),delete F[X];delete B[x.id]}}function I(){v(),a=!0,s!==r&&(s=r,c(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:v,dispose:U,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:p,disableUnusedAttributes:M}}function qp(i,t,e){let n;function r(c){n=c}function s(c,d){i.drawArrays(n,c,d),e.update(d,n,1)}function a(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),e.update(d,n,u))}function o(c,d,u){if(u===0)return;const h=t.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<u;m++)this.render(c[m],d[m]);else{h.multiDrawArraysWEBGL(n,c,0,d,0,u);let m=0;for(let g=0;g<u;g++)m+=d[g];e.update(m,n,1)}}function l(c,d,u,h){if(u===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)a(c[g],d[g],h[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,d,0,h,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_];for(let _=0;_<h.length;_++)e.update(g,n,h[_])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Yp(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(w){return!(w!==nn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const A=w===bs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Vn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Dn&&!A)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=e.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),f=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,U=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:f,maxVaryings:M,maxFragmentUniforms:E,vertexTextures:T,maxSamples:U}}function Kp(i){const t=this;let e=null,n=0,r=!1,s=!1;const a=new ei,o=new At,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const m=u.length!==0||h||n!==0||r;return r=h,n=u.length,m},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,h){e=d(u,h,0)},this.setState=function(u,h,m){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,f=i.get(u);if(!r||g===null||g.length===0||s&&!p)s?d(null):c();else{const M=s?0:n,E=M*4;let T=f.clippingState||null;l.value=T,T=d(g,h,E,m);for(let U=0;U!==E;++U)T[U]=e[U];f.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(u,h,m,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const f=m+_*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<f)&&(p=new Float32Array(f));for(let E=0,T=m;E!==_;++E,T+=4)a.copy(u[E]).applyMatrix4(M,o),a.normal.toArray(p,T),p[T+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function jp(i){let t=new WeakMap;function e(a,o){return o===Aa?a.mapping=Wi:o===Ca&&(a.mapping=Xi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Aa||o===Ca)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ah(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",r),e(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class to extends Dc{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Bi=4,xl=[.125,.215,.35,.446,.526,.582],ri=20,da=new to,Sl=new pt;let ua=null,ha=0,fa=0,pa=!1;const ni=(1+Math.sqrt(5))/2,Fi=1/ni,Ml=[new P(-ni,Fi,0),new P(ni,Fi,0),new P(-Fi,0,ni),new P(Fi,0,ni),new P(0,ni,-Fi),new P(0,ni,Fi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class yl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){ua=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ua,ha,fa),this._renderer.xr.enabled=pa,t.scissorTest=!1,Qr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wi||t.mapping===Xi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ua=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Re,minFilter:Re,generateMipmaps:!1,type:bs,format:nn,colorSpace:Xn,depthBuffer:!1},r=El(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=El(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zp(s)),this._blurMaterial=Jp(s,t,e)}return r}_compileMaterial(t){const e=new ve(this._lodPlanes[0],t);this._renderer.compile(e,da)}_sceneToCubeUV(t,e,n,r){const o=new Be(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(Sl),d.toneMapping=zn,d.autoClear=!1;const m=new Ja({name:"PMREM.Background",side:Te,depthWrite:!1,depthTest:!1}),g=new ve(new Tr,m);let _=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,_=!0):(m.color.copy(Sl),_=!0);for(let f=0;f<6;f++){const M=f%3;M===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):M===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const E=this._cubeSize;Qr(r,M*E,f>2?E:0,E,E),d.setRenderTarget(r),_&&d.render(g,o),d.render(t,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=u,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===Wi||t.mapping===Xi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=wl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new ve(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Qr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,da)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ml[(r-s-1)%Ml.length];this._blur(t,s-1,s,a,o)}e.autoClear=n}_blur(t,e,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,r,"latitudinal",s),this._halfBlur(a,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new ve(this._lodPlanes[r],c),h=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*ri-1),_=s/g,p=isFinite(s)?1+Math.floor(d*_):ri;p>ri&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ri}`);const f=[];let M=0;for(let A=0;A<ri;++A){const I=A/_,v=Math.exp(-I*I/2);f.push(v),A===0?M+=v:A<p&&(M+=2*v)}for(let A=0;A<f.length;A++)f[A]=f[A]/M;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:E}=this;h.dTheta.value=g,h.mipInt.value=E-n;const T=this._sizeLods[r],U=3*T*(r>E-Bi?r-E+Bi:0),w=4*(this._cubeSize-T);Qr(e,U,w,3*T,2*T),l.setRenderTarget(e),l.render(u,da)}}function Zp(i){const t=[],e=[],n=[];let r=i;const s=i-Bi+1+xl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-Bi?l=xl[a-i+Bi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],m=6,g=6,_=3,p=2,f=1,M=new Float32Array(_*g*m),E=new Float32Array(p*g*m),T=new Float32Array(f*g*m);for(let w=0;w<m;w++){const A=w%3*2/3-1,I=w>2?0:-1,v=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];M.set(v,_*g*w),E.set(h,p*g*w);const x=[w,w,w,w,w,w];T.set(x,f*g*w)}const U=new Se;U.setAttribute("position",new Pe(M,_)),U.setAttribute("uv",new Pe(E,p)),U.setAttribute("faceIndex",new Pe(T,f)),t.push(U),r>Bi&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function El(i,t,e){const n=new hi(i,t,e);return n.texture.mapping=ws,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qr(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function Jp(i,t,e){const n=new Float32Array(ri),r=new P(0,1,0);return new Ke({name:"SphericalGaussianBlur",defines:{n:ri,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:eo(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Tl(){return new Ke({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eo(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function wl(){return new Ke({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function eo(){return`

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
	`}function Qp(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Aa||l===Ca,d=l===Wi||l===Xi;if(c||d){let u=t.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return e===null&&(e=new yl(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return c&&m&&m.height>0||d&&m&&r(m)?(e===null&&(e=new yl(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function r(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function tm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&wc("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function em(i,t,e,n){const r={},s=new WeakMap;function a(u){const h=u.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let p=0,f=_.length;p<f;p++)t.remove(_[p])}h.removeEventListener("dispose",a),delete r[h.id];const m=s.get(h);m&&(t.remove(m),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(u,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,e.memory.geometries++),h}function l(u){const h=u.attributes;for(const g in h)t.update(h[g],i.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const _=m[g];for(let p=0,f=_.length;p<f;p++)t.update(_[p],i.ARRAY_BUFFER)}}function c(u){const h=[],m=u.index,g=u.attributes.position;let _=0;if(m!==null){const M=m.array;_=m.version;for(let E=0,T=M.length;E<T;E+=3){const U=M[E+0],w=M[E+1],A=M[E+2];h.push(U,w,w,A,A,U)}}else if(g!==void 0){const M=g.array;_=g.version;for(let E=0,T=M.length/3-1;E<T;E+=3){const U=E+0,w=E+1,A=E+2;h.push(U,w,w,A,A,U)}}else return;const p=new(Tc(h)?Pc:Lc)(h,1);p.version=_;const f=s.get(u);f&&t.remove(f),s.set(u,p)}function d(u){const h=s.get(u);if(h){const m=u.index;m!==null&&h.version<m.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function nm(i,t,e){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,m){i.drawElements(n,m,s,h*a),e.update(m,n,1)}function c(h,m,g){g!==0&&(i.drawElementsInstanced(n,m,s,h*a,g),e.update(m,n,g))}function d(h,m,g){if(g===0)return;const _=t.get("WEBGL_multi_draw");if(_===null)for(let p=0;p<g;p++)this.render(h[p]/a,m[p]);else{_.multiDrawElementsWEBGL(n,m,0,s,h,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];e.update(p,n,1)}}function u(h,m,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<h.length;f++)c(h[f]/a,m[f],_[f]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,s,h,0,_,0,g);let f=0;for(let M=0;M<g;M++)f+=m[M];for(let M=0;M<_.length;M++)e.update(f,n,_[M])}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function im(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function rm(i,t,e){const n=new WeakMap,r=new he;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=n.get(o);if(h===void 0||h.count!==u){let x=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",x)};var m=x;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let T=0;g===!0&&(T=1),_===!0&&(T=2),p===!0&&(T=3);let U=o.attributes.position.count*T,w=1;U>t.maxTextureSize&&(w=Math.ceil(U/t.maxTextureSize),U=t.maxTextureSize);const A=new Float32Array(U*w*4*u),I=new Ac(A,U,w,u);I.type=Dn,I.needsUpdate=!0;const v=T*4;for(let C=0;C<u;C++){const B=f[C],F=M[C],X=E[C],$=U*w*4*C;for(let G=0;G<B.count;G++){const Y=G*v;g===!0&&(r.fromBufferAttribute(B,G),A[$+Y+0]=r.x,A[$+Y+1]=r.y,A[$+Y+2]=r.z,A[$+Y+3]=0),_===!0&&(r.fromBufferAttribute(F,G),A[$+Y+4]=r.x,A[$+Y+5]=r.y,A[$+Y+6]=r.z,A[$+Y+7]=0),p===!0&&(r.fromBufferAttribute(X,G),A[$+Y+8]=r.x,A[$+Y+9]=r.y,A[$+Y+10]=r.z,A[$+Y+11]=X.itemSize===4?r.w:1)}}h={count:u,texture:I,size:new Ot(U,w)},n.set(o,h),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function sm(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,d=l.geometry,u=t.get(l,d);if(r.get(u)!==c&&(t.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return u}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}class Fc extends xe{constructor(t,e,n,r,s,a,o,l,c,d=zi){if(d!==zi&&d!==Yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===zi&&(n=$i),n===void 0&&d===Yi&&(n=qi),super(null,r,s,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:ke,this.minFilter=l!==void 0?l:ke,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Oc=new xe,Bc=new Fc(1,1);Bc.compareFunction=Ec;const zc=new Ac,Hc=new Wu,kc=new Uc,bl=[],Al=[],Cl=new Float32Array(16),Rl=new Float32Array(9),Ll=new Float32Array(4);function Qi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=bl[r];if(s===void 0&&(s=new Float32Array(r),bl[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function oe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Cs(i,t){let e=Al[t];e===void 0&&(e=new Int32Array(t),Al[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function am(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function om(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;i.uniform2fv(this.addr,t),le(e,t)}}function lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(oe(e,t))return;i.uniform3fv(this.addr,t),le(e,t)}}function cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;i.uniform4fv(this.addr,t),le(e,t)}}function dm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(oe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),le(e,t)}else{if(oe(e,n))return;Ll.set(n),i.uniformMatrix2fv(this.addr,!1,Ll),le(e,n)}}function um(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(oe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),le(e,t)}else{if(oe(e,n))return;Rl.set(n),i.uniformMatrix3fv(this.addr,!1,Rl),le(e,n)}}function hm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(oe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),le(e,t)}else{if(oe(e,n))return;Cl.set(n),i.uniformMatrix4fv(this.addr,!1,Cl),le(e,n)}}function fm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function pm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;i.uniform2iv(this.addr,t),le(e,t)}}function mm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(oe(e,t))return;i.uniform3iv(this.addr,t),le(e,t)}}function gm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;i.uniform4iv(this.addr,t),le(e,t)}}function _m(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function vm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;i.uniform2uiv(this.addr,t),le(e,t)}}function xm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(oe(e,t))return;i.uniform3uiv(this.addr,t),le(e,t)}}function Sm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;i.uniform4uiv(this.addr,t),le(e,t)}}function Mm(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?Bc:Oc;e.setTexture2D(t||s,r)}function ym(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Hc,r)}function Em(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||kc,r)}function Tm(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||zc,r)}function wm(i){switch(i){case 5126:return am;case 35664:return om;case 35665:return lm;case 35666:return cm;case 35674:return dm;case 35675:return um;case 35676:return hm;case 5124:case 35670:return fm;case 35667:case 35671:return pm;case 35668:case 35672:return mm;case 35669:case 35673:return gm;case 5125:return _m;case 36294:return vm;case 36295:return xm;case 36296:return Sm;case 35678:case 36198:case 36298:case 36306:case 35682:return Mm;case 35679:case 36299:case 36307:return ym;case 35680:case 36300:case 36308:case 36293:return Em;case 36289:case 36303:case 36311:case 36292:return Tm}}function bm(i,t){i.uniform1fv(this.addr,t)}function Am(i,t){const e=Qi(t,this.size,2);i.uniform2fv(this.addr,e)}function Cm(i,t){const e=Qi(t,this.size,3);i.uniform3fv(this.addr,e)}function Rm(i,t){const e=Qi(t,this.size,4);i.uniform4fv(this.addr,e)}function Lm(i,t){const e=Qi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Pm(i,t){const e=Qi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Im(i,t){const e=Qi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Dm(i,t){i.uniform1iv(this.addr,t)}function Um(i,t){i.uniform2iv(this.addr,t)}function Nm(i,t){i.uniform3iv(this.addr,t)}function Fm(i,t){i.uniform4iv(this.addr,t)}function Om(i,t){i.uniform1uiv(this.addr,t)}function Bm(i,t){i.uniform2uiv(this.addr,t)}function zm(i,t){i.uniform3uiv(this.addr,t)}function Hm(i,t){i.uniform4uiv(this.addr,t)}function km(i,t,e){const n=this.cache,r=t.length,s=Cs(e,r);oe(n,s)||(i.uniform1iv(this.addr,s),le(n,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||Oc,s[a])}function Gm(i,t,e){const n=this.cache,r=t.length,s=Cs(e,r);oe(n,s)||(i.uniform1iv(this.addr,s),le(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||Hc,s[a])}function Vm(i,t,e){const n=this.cache,r=t.length,s=Cs(e,r);oe(n,s)||(i.uniform1iv(this.addr,s),le(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||kc,s[a])}function Wm(i,t,e){const n=this.cache,r=t.length,s=Cs(e,r);oe(n,s)||(i.uniform1iv(this.addr,s),le(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||zc,s[a])}function Xm(i){switch(i){case 5126:return bm;case 35664:return Am;case 35665:return Cm;case 35666:return Rm;case 35674:return Lm;case 35675:return Pm;case 35676:return Im;case 5124:case 35670:return Dm;case 35667:case 35671:return Um;case 35668:case 35672:return Nm;case 35669:case 35673:return Fm;case 5125:return Om;case 36294:return Bm;case 36295:return zm;case 36296:return Hm;case 35678:case 36198:case 36298:case 36306:case 35682:return km;case 35679:case 36299:case 36307:return Gm;case 35680:case 36300:case 36308:case 36293:return Vm;case 36289:case 36303:case 36311:case 36292:return Wm}}class $m{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=wm(e.type)}}class qm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Xm(e.type)}}class Ym{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],n)}}}const ma=/(\w+)(\])?(\[|\.)?/g;function Pl(i,t){i.seq.push(t),i.map[t.id]=t}function Km(i,t,e){const n=i.name,r=n.length;for(ma.lastIndex=0;;){const s=ma.exec(n),a=ma.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Pl(e,c===void 0?new $m(o,i,t):new qm(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Ym(o),Pl(e,u)),e=u}}}class ss{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);Km(s,a,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&n.push(a)}return n}}function Il(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const jm=37297;let Zm=0;function Jm(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Qm(i){const t=Xt.getPrimaries(Xt.workingColorSpace),e=Xt.getPrimaries(i);let n;switch(t===e?n="":t===gs&&e===ms?n="LinearDisplayP3ToLinearSRGB":t===ms&&e===gs&&(n="LinearSRGBToLinearDisplayP3"),i){case Xn:case As:return[n,"LinearTransferOETF"];case Qe:case ja:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Dl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Jm(i.getShaderSource(t),a)}else return r}function tg(i,t){const e=Qm(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function eg(i,t){let e;switch(t){case lu:e="Linear";break;case cu:e="Reinhard";break;case du:e="OptimizedCineon";break;case uu:e="ACESFilmic";break;case fu:e="AgX";break;case pu:e="Neutral";break;case hu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function ng(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(mr).join(`
`)}function ig(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function rg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function mr(i){return i!==""}function Ul(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Nl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const sg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ia(i){return i.replace(sg,og)}const ag=new Map;function og(i,t){let e=bt[t];if(e===void 0){const n=ag.get(t);if(n!==void 0)e=bt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ia(e)}const lg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fl(i){return i.replace(lg,cg)}function cg(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ol(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function dg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===mc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ud?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===gn&&(t="SHADOWMAP_TYPE_VSM"),t}function ug(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Wi:case Xi:t="ENVMAP_TYPE_CUBE";break;case ws:t="ENVMAP_TYPE_CUBE_UV";break}return t}function hg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Xi:t="ENVMAP_MODE_REFRACTION";break}return t}function fg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ya:t="ENVMAP_BLENDING_MULTIPLY";break;case au:t="ENVMAP_BLENDING_MIX";break;case ou:t="ENVMAP_BLENDING_ADD";break}return t}function pg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function mg(i,t,e,n){const r=i.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=dg(e),c=ug(e),d=hg(e),u=fg(e),h=pg(e),m=ng(e),g=ig(s),_=r.createProgram();let p,f,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(mr).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(mr).join(`
`),f.length>0&&(f+=`
`)):(p=[Ol(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mr).join(`
`),f=[Ol(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",e.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zn?"#define TONE_MAPPING":"",e.toneMapping!==zn?bt.tonemapping_pars_fragment:"",e.toneMapping!==zn?eg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",bt.colorspace_pars_fragment,tg("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(mr).join(`
`)),a=Ia(a),a=Ul(a,e),a=Nl(a,e),o=Ia(o),o=Ul(o,e),o=Nl(o,e),a=Fl(a),o=Fl(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",e.glslVersion===Qo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=M+p+a,T=M+f+o,U=Il(r,r.VERTEX_SHADER,E),w=Il(r,r.FRAGMENT_SHADER,T);r.attachShader(_,U),r.attachShader(_,w),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function A(C){if(i.debug.checkShaderErrors){const B=r.getProgramInfoLog(_).trim(),F=r.getShaderInfoLog(U).trim(),X=r.getShaderInfoLog(w).trim();let $=!0,G=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,U,w);else{const Y=Dl(r,U,"vertex"),k=Dl(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+Y+`
`+k)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(F===""||X==="")&&(G=!1);G&&(C.diagnostics={runnable:$,programLog:B,vertexShader:{log:F,prefix:p},fragmentShader:{log:X,prefix:f}})}r.deleteShader(U),r.deleteShader(w),I=new ss(r,_),v=rg(r,_)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let v;this.getAttributes=function(){return v===void 0&&A(this),v};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(_,jm)),x},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Zm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=U,this.fragmentShader=w,this}let gg=0;class _g{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new vg(t),e.set(t,n)),n}}class vg{constructor(t){this.id=gg++,this.code=t,this.usedTimes=0}}function xg(i,t,e,n,r,s,a){const o=new Cc,l=new _g,c=new Set,d=[],u=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function p(v,x,C,B,F){const X=B.fog,$=F.geometry,G=v.isMeshStandardMaterial?B.environment:null,Y=(v.isMeshStandardMaterial?e:t).get(v.envMap||G),k=Y&&Y.mapping===ws?Y.image.height:null,dt=g[v.type];v.precision!==null&&(m=r.getMaxPrecision(v.precision),m!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",m,"instead."));const ct=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ut=ct!==void 0?ct.length:0;let Dt=0;$.morphAttributes.position!==void 0&&(Dt=1),$.morphAttributes.normal!==void 0&&(Dt=2),$.morphAttributes.color!==void 0&&(Dt=3);let Gt,V,J,ht;if(dt){const $t=tn[dt];Gt=$t.vertexShader,V=$t.fragmentShader}else Gt=v.vertexShader,V=v.fragmentShader,l.update(v),J=l.getVertexShaderID(v),ht=l.getFragmentShaderID(v);const st=i.getRenderTarget(),Pt=F.isInstancedMesh===!0,Ct=F.isBatchedMesh===!0,zt=!!v.map,L=!!v.matcap,Bt=!!Y,Nt=!!v.aoMap,jt=!!v.lightMap,St=!!v.bumpMap,Ht=!!v.normalMap,It=!!v.displacementMap,wt=!!v.emissiveMap,ne=!!v.metalnessMap,b=!!v.roughnessMap,S=v.anisotropy>0,H=v.clearcoat>0,K=v.dispersion>0,j=v.iridescence>0,Z=v.sheen>0,vt=v.transmission>0,it=S&&!!v.anisotropyMap,rt=H&&!!v.clearcoatMap,Rt=H&&!!v.clearcoatNormalMap,Q=H&&!!v.clearcoatRoughnessMap,gt=j&&!!v.iridescenceMap,Ut=j&&!!v.iridescenceThicknessMap,Et=Z&&!!v.sheenColorMap,at=Z&&!!v.sheenRoughnessMap,Lt=!!v.specularMap,Ft=!!v.specularColorMap,te=!!v.specularIntensityMap,R=vt&&!!v.transmissionMap,ot=vt&&!!v.thicknessMap,W=!!v.gradientMap,q=!!v.alphaMap,et=v.alphaTest>0,Tt=!!v.alphaHash,kt=!!v.extensions;let ee=zn;v.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(ee=i.toneMapping);const ce={shaderID:dt,shaderType:v.type,shaderName:v.name,vertexShader:Gt,fragmentShader:V,defines:v.defines,customVertexShaderID:J,customFragmentShaderID:ht,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:m,batching:Ct,batchingColor:Ct&&F._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&F.instanceColor!==null,instancingMorph:Pt&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:st===null?i.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:Xn,alphaToCoverage:!!v.alphaToCoverage,map:zt,matcap:L,envMap:Bt,envMapMode:Bt&&Y.mapping,envMapCubeUVHeight:k,aoMap:Nt,lightMap:jt,bumpMap:St,normalMap:Ht,displacementMap:h&&It,emissiveMap:wt,normalMapObjectSpace:Ht&&v.normalMapType===Cu,normalMapTangentSpace:Ht&&v.normalMapType===Ka,metalnessMap:ne,roughnessMap:b,anisotropy:S,anisotropyMap:it,clearcoat:H,clearcoatMap:rt,clearcoatNormalMap:Rt,clearcoatRoughnessMap:Q,dispersion:K,iridescence:j,iridescenceMap:gt,iridescenceThicknessMap:Ut,sheen:Z,sheenColorMap:Et,sheenRoughnessMap:at,specularMap:Lt,specularColorMap:Ft,specularIntensityMap:te,transmission:vt,transmissionMap:R,thicknessMap:ot,gradientMap:W,opaque:v.transparent===!1&&v.blending===Bn&&v.alphaToCoverage===!1,alphaMap:q,alphaTest:et,alphaHash:Tt,combine:v.combine,mapUv:zt&&_(v.map.channel),aoMapUv:Nt&&_(v.aoMap.channel),lightMapUv:jt&&_(v.lightMap.channel),bumpMapUv:St&&_(v.bumpMap.channel),normalMapUv:Ht&&_(v.normalMap.channel),displacementMapUv:It&&_(v.displacementMap.channel),emissiveMapUv:wt&&_(v.emissiveMap.channel),metalnessMapUv:ne&&_(v.metalnessMap.channel),roughnessMapUv:b&&_(v.roughnessMap.channel),anisotropyMapUv:it&&_(v.anisotropyMap.channel),clearcoatMapUv:rt&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Rt&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:at&&_(v.sheenRoughnessMap.channel),specularMapUv:Lt&&_(v.specularMap.channel),specularColorMapUv:Ft&&_(v.specularColorMap.channel),specularIntensityMapUv:te&&_(v.specularIntensityMap.channel),transmissionMapUv:R&&_(v.transmissionMap.channel),thicknessMapUv:ot&&_(v.thicknessMap.channel),alphaMapUv:q&&_(v.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Ht||S),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!$.attributes.uv&&(zt||q),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:F.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:Dt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:ee,decodeVideoTexture:zt&&v.map.isVideoTexture===!0&&Xt.getTransfer(v.map.colorSpace)===Yt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===ze,flipSided:v.side===Te,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:kt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:kt&&v.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ce.vertexUv1s=c.has(1),ce.vertexUv2s=c.has(2),ce.vertexUv3s=c.has(3),c.clear(),ce}function f(v){const x=[];if(v.shaderID?x.push(v.shaderID):(x.push(v.customVertexShaderID),x.push(v.customFragmentShaderID)),v.defines!==void 0)for(const C in v.defines)x.push(C),x.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(M(x,v),E(x,v),x.push(i.outputColorSpace)),x.push(v.customProgramCacheKey),x.join()}function M(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}function E(v,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),v.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.skinning&&o.enable(4),x.morphTargets&&o.enable(5),x.morphNormals&&o.enable(6),x.morphColors&&o.enable(7),x.premultipliedAlpha&&o.enable(8),x.shadowMapEnabled&&o.enable(9),x.doubleSided&&o.enable(10),x.flipSided&&o.enable(11),x.useDepthPacking&&o.enable(12),x.dithering&&o.enable(13),x.transmission&&o.enable(14),x.sheen&&o.enable(15),x.opaque&&o.enable(16),x.pointsUvs&&o.enable(17),x.decodeVideoTexture&&o.enable(18),x.alphaToCoverage&&o.enable(19),v.push(o.mask)}function T(v){const x=g[v.type];let C;if(x){const B=tn[x];C=nh.clone(B.uniforms)}else C=v.uniforms;return C}function U(v,x){let C;for(let B=0,F=d.length;B<F;B++){const X=d[B];if(X.cacheKey===x){C=X,++C.usedTimes;break}}return C===void 0&&(C=new mg(i,x,v,s),d.push(C)),C}function w(v){if(--v.usedTimes===0){const x=d.indexOf(v);d[x]=d[d.length-1],d.pop(),v.destroy()}}function A(v){l.remove(v)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:T,acquireProgram:U,releaseProgram:w,releaseShaderCache:A,programs:d,dispose:I}}function Sg(){let i=new WeakMap;function t(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function e(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:r}}function Mg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Bl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function zl(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(u,h,m,g,_,p){let f=i[t];return f===void 0?(f={id:u.id,object:u,geometry:h,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},i[t]=f):(f.id=u.id,f.object=u,f.geometry=h,f.material=m,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=p),t++,f}function o(u,h,m,g,_,p){const f=a(u,h,m,g,_,p);m.transmission>0?n.push(f):m.transparent===!0?r.push(f):e.push(f)}function l(u,h,m,g,_,p){const f=a(u,h,m,g,_,p);m.transmission>0?n.unshift(f):m.transparent===!0?r.unshift(f):e.unshift(f)}function c(u,h){e.length>1&&e.sort(u||Mg),n.length>1&&n.sort(h||Bl),r.length>1&&r.sort(h||Bl)}function d(){for(let u=t,h=i.length;u<h;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:d,sort:c}}function yg(){let i=new WeakMap;function t(n,r){const s=i.get(n);let a;return s===void 0?(a=new zl,i.set(n,[a])):r>=s.length?(a=new zl,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Eg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new pt};break;case"SpotLight":e={position:new P,direction:new P,color:new pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new pt,groundColor:new pt};break;case"RectAreaLight":e={color:new pt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function Tg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let wg=0;function bg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Ag(i){const t=new Eg,e=Tg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const r=new P,s=new Kt,a=new Kt;function o(c){let d=0,u=0,h=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let m=0,g=0,_=0,p=0,f=0,M=0,E=0,T=0,U=0,w=0,A=0;c.sort(bg);for(let v=0,x=c.length;v<x;v++){const C=c[v],B=C.color,F=C.intensity,X=C.distance,$=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)d+=B.r*F,u+=B.g*F,h+=B.b*F;else if(C.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(C.sh.coefficients[G],F);A++}else if(C.isDirectionalLight){const G=t.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Y=C.shadow,k=e.get(C);k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,n.directionalShadow[m]=k,n.directionalShadowMap[m]=$,n.directionalShadowMatrix[m]=C.shadow.matrix,M++}n.directional[m]=G,m++}else if(C.isSpotLight){const G=t.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(B).multiplyScalar(F),G.distance=X,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,n.spot[_]=G;const Y=C.shadow;if(C.map&&(n.spotLightMap[U]=C.map,U++,Y.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[_]=Y.matrix,C.castShadow){const k=e.get(C);k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=$,T++}_++}else if(C.isRectAreaLight){const G=t.get(C);G.color.copy(B).multiplyScalar(F),G.halfWidth.set(C.width*.5,0,0),G.halfHeight.set(0,C.height*.5,0),n.rectArea[p]=G,p++}else if(C.isPointLight){const G=t.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),G.distance=C.distance,G.decay=C.decay,C.castShadow){const Y=C.shadow,k=e.get(C);k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,k.shadowCameraNear=Y.camera.near,k.shadowCameraFar=Y.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=C.shadow.matrix,E++}n.point[g]=G,g++}else if(C.isHemisphereLight){const G=t.get(C);G.skyColor.copy(C.color).multiplyScalar(F),G.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[f]=G,f++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=nt.LTC_FLOAT_1,n.rectAreaLTC2=nt.LTC_FLOAT_2):(n.rectAreaLTC1=nt.LTC_HALF_1,n.rectAreaLTC2=nt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;const I=n.hash;(I.directionalLength!==m||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==p||I.hemiLength!==f||I.numDirectionalShadows!==M||I.numPointShadows!==E||I.numSpotShadows!==T||I.numSpotMaps!==U||I.numLightProbes!==A)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=T+U-w,n.spotLightMap.length=U,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,I.directionalLength=m,I.pointLength=g,I.spotLength=_,I.rectAreaLength=p,I.hemiLength=f,I.numDirectionalShadows=M,I.numPointShadows=E,I.numSpotShadows=T,I.numSpotMaps=U,I.numLightProbes=A,n.version=wg++)}function l(c,d){let u=0,h=0,m=0,g=0,_=0;const p=d.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){const E=c[f];if(E.isDirectionalLight){const T=n.directional[u];T.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(p),u++}else if(E.isSpotLight){const T=n.spot[m];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(p),m++}else if(E.isRectAreaLight){const T=n.rectArea[g];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(p),a.identity(),s.copy(E.matrixWorld),s.premultiply(p),a.extractRotation(s),T.halfWidth.set(E.width*.5,0,0),T.halfHeight.set(0,E.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const T=n.point[h];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(p),h++}else if(E.isHemisphereLight){const T=n.hemi[_];T.direction.setFromMatrixPosition(E.matrixWorld),T.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function Hl(i){const t=new Ag(i),e=[],n=[];function r(d){c.camera=d,e.length=0,n.length=0}function s(d){e.push(d)}function a(d){n.push(d)}function o(){t.setup(e)}function l(d){t.setupView(e,d)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function Cg(i){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new Hl(i),t.set(r,[o])):s>=a.length?(o=new Hl(i),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Rg extends an{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Lg extends an{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Pg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ig=`uniform sampler2D shadow_pass;
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
}`;function Dg(i,t,e){let n=new Qa;const r=new Ot,s=new Ot,a=new he,o=new Rg({depthPacking:Au}),l=new Lg,c={},d=e.maxTextureSize,u={[Gn]:Te,[Te]:Gn,[ze]:ze},h=new Ke({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:Pg,fragmentShader:Ig}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new Se;g.setAttribute("position",new Pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ve(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mc;let f=this.type;this.render=function(w,A,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const v=i.getRenderTarget(),x=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Sn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const F=f!==gn&&this.type===gn,X=f===gn&&this.type!==gn;for(let $=0,G=w.length;$<G;$++){const Y=w[$],k=Y.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const dt=k.getFrameExtents();if(r.multiply(dt),s.copy(k.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/dt.x),r.x=s.x*dt.x,k.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/dt.y),r.y=s.y*dt.y,k.mapSize.y=s.y)),k.map===null||F===!0||X===!0){const ut=this.type!==gn?{minFilter:ke,magFilter:ke}:{};k.map!==null&&k.map.dispose(),k.map=new hi(r.x,r.y,ut),k.map.texture.name=Y.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const ct=k.getViewportCount();for(let ut=0;ut<ct;ut++){const Dt=k.getViewport(ut);a.set(s.x*Dt.x,s.y*Dt.y,s.x*Dt.z,s.y*Dt.w),B.viewport(a),k.updateMatrices(Y,ut),n=k.getFrustum(),T(A,I,k.camera,Y,this.type)}k.isPointLightShadow!==!0&&this.type===gn&&M(k,I),k.needsUpdate=!1}f=this.type,p.needsUpdate=!1,i.setRenderTarget(v,x,C)};function M(w,A){const I=t.update(_);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new hi(r.x,r.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,I,h,_,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,I,m,_,null)}function E(w,A,I,v){let x=null;const C=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)x=C;else if(x=I.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const B=x.uuid,F=A.uuid;let X=c[B];X===void 0&&(X={},c[B]=X);let $=X[F];$===void 0&&($=x.clone(),X[F]=$,A.addEventListener("dispose",U)),x=$}if(x.visible=A.visible,x.wireframe=A.wireframe,v===gn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:u[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,I.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const B=i.properties.get(x);B.light=I}return x}function T(w,A,I,v,x){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===gn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);const F=t.update(w),X=w.material;if(Array.isArray(X)){const $=F.groups;for(let G=0,Y=$.length;G<Y;G++){const k=$[G],dt=X[k.materialIndex];if(dt&&dt.visible){const ct=E(w,dt,v,x);w.onBeforeShadow(i,w,A,I,F,ct,k),i.renderBufferDirect(I,null,F,ct,w,k),w.onAfterShadow(i,w,A,I,F,ct,k)}}}else if(X.visible){const $=E(w,X,v,x);w.onBeforeShadow(i,w,A,I,F,$,null),i.renderBufferDirect(I,null,F,$,w,null),w.onAfterShadow(i,w,A,I,F,$,null)}}const B=w.children;for(let F=0,X=B.length;F<X;F++)T(B[F],A,I,v,x)}function U(w){w.target.removeEventListener("dispose",U);for(const I in c){const v=c[I],x=w.target.uuid;x in v&&(v[x].dispose(),delete v[x])}}}function Ug(i){function t(){let R=!1;const ot=new he;let W=null;const q=new he(0,0,0,0);return{setMask:function(et){W!==et&&!R&&(i.colorMask(et,et,et,et),W=et)},setLocked:function(et){R=et},setClear:function(et,Tt,kt,ee,ce){ce===!0&&(et*=ee,Tt*=ee,kt*=ee),ot.set(et,Tt,kt,ee),q.equals(ot)===!1&&(i.clearColor(et,Tt,kt,ee),q.copy(ot))},reset:function(){R=!1,W=null,q.set(-1,0,0,0)}}}function e(){let R=!1,ot=null,W=null,q=null;return{setTest:function(et){et?ht(i.DEPTH_TEST):st(i.DEPTH_TEST)},setMask:function(et){ot!==et&&!R&&(i.depthMask(et),ot=et)},setFunc:function(et){if(W!==et){switch(et){case Qd:i.depthFunc(i.NEVER);break;case tu:i.depthFunc(i.ALWAYS);break;case eu:i.depthFunc(i.LESS);break;case hs:i.depthFunc(i.LEQUAL);break;case nu:i.depthFunc(i.EQUAL);break;case iu:i.depthFunc(i.GEQUAL);break;case ru:i.depthFunc(i.GREATER);break;case su:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}W=et}},setLocked:function(et){R=et},setClear:function(et){q!==et&&(i.clearDepth(et),q=et)},reset:function(){R=!1,ot=null,W=null,q=null}}}function n(){let R=!1,ot=null,W=null,q=null,et=null,Tt=null,kt=null,ee=null,ce=null;return{setTest:function($t){R||($t?ht(i.STENCIL_TEST):st(i.STENCIL_TEST))},setMask:function($t){ot!==$t&&!R&&(i.stencilMask($t),ot=$t)},setFunc:function($t,je,Ze){(W!==$t||q!==je||et!==Ze)&&(i.stencilFunc($t,je,Ze),W=$t,q=je,et=Ze)},setOp:function($t,je,Ze){(Tt!==$t||kt!==je||ee!==Ze)&&(i.stencilOp($t,je,Ze),Tt=$t,kt=je,ee=Ze)},setLocked:function($t){R=$t},setClear:function($t){ce!==$t&&(i.clearStencil($t),ce=$t)},reset:function(){R=!1,ot=null,W=null,q=null,et=null,Tt=null,kt=null,ee=null,ce=null}}}const r=new t,s=new e,a=new n,o=new WeakMap,l=new WeakMap;let c={},d={},u=new WeakMap,h=[],m=null,g=!1,_=null,p=null,f=null,M=null,E=null,T=null,U=null,w=new pt(0,0,0),A=0,I=!1,v=null,x=null,C=null,B=null,F=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,G=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(Y)[1]),$=G>=1):Y.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),$=G>=2);let k=null,dt={};const ct=i.getParameter(i.SCISSOR_BOX),ut=i.getParameter(i.VIEWPORT),Dt=new he().fromArray(ct),Gt=new he().fromArray(ut);function V(R,ot,W,q){const et=new Uint8Array(4),Tt=i.createTexture();i.bindTexture(R,Tt),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let kt=0;kt<W;kt++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,q,0,i.RGBA,i.UNSIGNED_BYTE,et):i.texImage2D(ot+kt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,et);return Tt}const J={};J[i.TEXTURE_2D]=V(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=V(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=V(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=V(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ht(i.DEPTH_TEST),s.setFunc(hs),St(!1),Ht(Mo),ht(i.CULL_FACE),Nt(Sn);function ht(R){c[R]!==!0&&(i.enable(R),c[R]=!0)}function st(R){c[R]!==!1&&(i.disable(R),c[R]=!1)}function Pt(R,ot){return d[R]!==ot?(i.bindFramebuffer(R,ot),d[R]=ot,R===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ot),R===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function Ct(R,ot){let W=h,q=!1;if(R){W=u.get(ot),W===void 0&&(W=[],u.set(ot,W));const et=R.textures;if(W.length!==et.length||W[0]!==i.COLOR_ATTACHMENT0){for(let Tt=0,kt=et.length;Tt<kt;Tt++)W[Tt]=i.COLOR_ATTACHMENT0+Tt;W.length=et.length,q=!0}}else W[0]!==i.BACK&&(W[0]=i.BACK,q=!0);q&&i.drawBuffers(W)}function zt(R){return m!==R?(i.useProgram(R),m=R,!0):!1}const L={[ii]:i.FUNC_ADD,[Fd]:i.FUNC_SUBTRACT,[Od]:i.FUNC_REVERSE_SUBTRACT};L[Bd]=i.MIN,L[zd]=i.MAX;const Bt={[Hd]:i.ZERO,[kd]:i.ONE,[Gd]:i.SRC_COLOR,[wa]:i.SRC_ALPHA,[Yd]:i.SRC_ALPHA_SATURATE,[$d]:i.DST_COLOR,[Wd]:i.DST_ALPHA,[Vd]:i.ONE_MINUS_SRC_COLOR,[ba]:i.ONE_MINUS_SRC_ALPHA,[qd]:i.ONE_MINUS_DST_COLOR,[Xd]:i.ONE_MINUS_DST_ALPHA,[Kd]:i.CONSTANT_COLOR,[jd]:i.ONE_MINUS_CONSTANT_COLOR,[Zd]:i.CONSTANT_ALPHA,[Jd]:i.ONE_MINUS_CONSTANT_ALPHA};function Nt(R,ot,W,q,et,Tt,kt,ee,ce,$t){if(R===Sn){g===!0&&(st(i.BLEND),g=!1);return}if(g===!1&&(ht(i.BLEND),g=!0),R!==Nd){if(R!==_||$t!==I){if((p!==ii||E!==ii)&&(i.blendEquation(i.FUNC_ADD),p=ii,E=ii),$t)switch(R){case Bn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yo:i.blendFunc(i.ONE,i.ONE);break;case Eo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case To:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case Bn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Eo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case To:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}f=null,M=null,T=null,U=null,w.set(0,0,0),A=0,_=R,I=$t}return}et=et||ot,Tt=Tt||W,kt=kt||q,(ot!==p||et!==E)&&(i.blendEquationSeparate(L[ot],L[et]),p=ot,E=et),(W!==f||q!==M||Tt!==T||kt!==U)&&(i.blendFuncSeparate(Bt[W],Bt[q],Bt[Tt],Bt[kt]),f=W,M=q,T=Tt,U=kt),(ee.equals(w)===!1||ce!==A)&&(i.blendColor(ee.r,ee.g,ee.b,ce),w.copy(ee),A=ce),_=R,I=!1}function jt(R,ot){R.side===ze?st(i.CULL_FACE):ht(i.CULL_FACE);let W=R.side===Te;ot&&(W=!W),St(W),R.blending===Bn&&R.transparent===!1?Nt(Sn):Nt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),s.setFunc(R.depthFunc),s.setTest(R.depthTest),s.setMask(R.depthWrite),r.setMask(R.colorWrite);const q=R.stencilWrite;a.setTest(q),q&&(a.setMask(R.stencilWriteMask),a.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),a.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),wt(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?ht(i.SAMPLE_ALPHA_TO_COVERAGE):st(i.SAMPLE_ALPHA_TO_COVERAGE)}function St(R){v!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),v=R)}function Ht(R){R!==Id?(ht(i.CULL_FACE),R!==x&&(R===Mo?i.cullFace(i.BACK):R===Dd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):st(i.CULL_FACE),x=R}function It(R){R!==C&&($&&i.lineWidth(R),C=R)}function wt(R,ot,W){R?(ht(i.POLYGON_OFFSET_FILL),(B!==ot||F!==W)&&(i.polygonOffset(ot,W),B=ot,F=W)):st(i.POLYGON_OFFSET_FILL)}function ne(R){R?ht(i.SCISSOR_TEST):st(i.SCISSOR_TEST)}function b(R){R===void 0&&(R=i.TEXTURE0+X-1),k!==R&&(i.activeTexture(R),k=R)}function S(R,ot,W){W===void 0&&(k===null?W=i.TEXTURE0+X-1:W=k);let q=dt[W];q===void 0&&(q={type:void 0,texture:void 0},dt[W]=q),(q.type!==R||q.texture!==ot)&&(k!==W&&(i.activeTexture(W),k=W),i.bindTexture(R,ot||J[R]),q.type=R,q.texture=ot)}function H(){const R=dt[k];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function j(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function vt(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function it(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function rt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Rt(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Q(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function gt(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ut(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Et(R){Dt.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),Dt.copy(R))}function at(R){Gt.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),Gt.copy(R))}function Lt(R,ot){let W=l.get(ot);W===void 0&&(W=new WeakMap,l.set(ot,W));let q=W.get(R);q===void 0&&(q=i.getUniformBlockIndex(ot,R.name),W.set(R,q))}function Ft(R,ot){const q=l.get(ot).get(R);o.get(ot)!==q&&(i.uniformBlockBinding(ot,q,R.__bindingPointIndex),o.set(ot,q))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},k=null,dt={},d={},u=new WeakMap,h=[],m=null,g=!1,_=null,p=null,f=null,M=null,E=null,T=null,U=null,w=new pt(0,0,0),A=0,I=!1,v=null,x=null,C=null,B=null,F=null,Dt.set(0,0,i.canvas.width,i.canvas.height),Gt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:ht,disable:st,bindFramebuffer:Pt,drawBuffers:Ct,useProgram:zt,setBlending:Nt,setMaterial:jt,setFlipSided:St,setCullFace:Ht,setLineWidth:It,setPolygonOffset:wt,setScissorTest:ne,activeTexture:b,bindTexture:S,unbindTexture:H,compressedTexImage2D:K,compressedTexImage3D:j,texImage2D:gt,texImage3D:Ut,updateUBOMapping:Lt,uniformBlockBinding:Ft,texStorage2D:Rt,texStorage3D:Q,texSubImage2D:Z,texSubImage3D:vt,compressedTexSubImage2D:it,compressedTexSubImage3D:rt,scissor:Et,viewport:at,reset:te}}function Ng(i,t,e,n,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ot,d=new WeakMap;let u;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,S){return m?new OffscreenCanvas(b,S):vr("canvas")}function _(b,S,H){let K=1;const j=ne(b);if((j.width>H||j.height>H)&&(K=H/Math.max(j.width,j.height)),K<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const Z=Math.floor(K*j.width),vt=Math.floor(K*j.height);u===void 0&&(u=g(Z,vt));const it=S?g(Z,vt):u;return it.width=Z,it.height=vt,it.getContext("2d").drawImage(b,0,0,Z,vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+Z+"x"+vt+")."),it}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),b;return b}function p(b){return b.generateMipmaps&&b.minFilter!==ke&&b.minFilter!==Re}function f(b){i.generateMipmap(b)}function M(b,S,H,K,j=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Z=S;if(S===i.RED&&(H===i.FLOAT&&(Z=i.R32F),H===i.HALF_FLOAT&&(Z=i.R16F),H===i.UNSIGNED_BYTE&&(Z=i.R8)),S===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.R8UI),H===i.UNSIGNED_SHORT&&(Z=i.R16UI),H===i.UNSIGNED_INT&&(Z=i.R32UI),H===i.BYTE&&(Z=i.R8I),H===i.SHORT&&(Z=i.R16I),H===i.INT&&(Z=i.R32I)),S===i.RG&&(H===i.FLOAT&&(Z=i.RG32F),H===i.HALF_FLOAT&&(Z=i.RG16F),H===i.UNSIGNED_BYTE&&(Z=i.RG8)),S===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RG8UI),H===i.UNSIGNED_SHORT&&(Z=i.RG16UI),H===i.UNSIGNED_INT&&(Z=i.RG32UI),H===i.BYTE&&(Z=i.RG8I),H===i.SHORT&&(Z=i.RG16I),H===i.INT&&(Z=i.RG32I)),S===i.RGB&&H===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),S===i.RGBA){const vt=j?ps:Xt.getTransfer(K);H===i.FLOAT&&(Z=i.RGBA32F),H===i.HALF_FLOAT&&(Z=i.RGBA16F),H===i.UNSIGNED_BYTE&&(Z=vt===Yt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function E(b,S){let H;return b?S===null||S===$i||S===qi?H=i.DEPTH24_STENCIL8:S===Dn?H=i.DEPTH32F_STENCIL8:S===fs&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===$i||S===qi?H=i.DEPTH_COMPONENT24:S===Dn?H=i.DEPTH_COMPONENT32F:S===fs&&(H=i.DEPTH_COMPONENT16),H}function T(b,S){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==ke&&b.minFilter!==Re?Math.log2(Math.max(S.width,S.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?S.mipmaps.length:1}function U(b){const S=b.target;S.removeEventListener("dispose",U),A(S),S.isVideoTexture&&d.delete(S)}function w(b){const S=b.target;S.removeEventListener("dispose",w),v(S)}function A(b){const S=n.get(b);if(S.__webglInit===void 0)return;const H=b.source,K=h.get(H);if(K){const j=K[S.__cacheKey];j.usedTimes--,j.usedTimes===0&&I(b),Object.keys(K).length===0&&h.delete(H)}n.remove(b)}function I(b){const S=n.get(b);i.deleteTexture(S.__webglTexture);const H=b.source,K=h.get(H);delete K[S.__cacheKey],a.memory.textures--}function v(b){const S=n.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(S.__webglFramebuffer[K]))for(let j=0;j<S.__webglFramebuffer[K].length;j++)i.deleteFramebuffer(S.__webglFramebuffer[K][j]);else i.deleteFramebuffer(S.__webglFramebuffer[K]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[K])}else{if(Array.isArray(S.__webglFramebuffer))for(let K=0;K<S.__webglFramebuffer.length;K++)i.deleteFramebuffer(S.__webglFramebuffer[K]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let K=0;K<S.__webglColorRenderbuffer.length;K++)S.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[K]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const H=b.textures;for(let K=0,j=H.length;K<j;K++){const Z=n.get(H[K]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),a.memory.textures--),n.remove(H[K])}n.remove(b)}let x=0;function C(){x=0}function B(){const b=x;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),x+=1,b}function F(b){const S=[];return S.push(b.wrapS),S.push(b.wrapT),S.push(b.wrapR||0),S.push(b.magFilter),S.push(b.minFilter),S.push(b.anisotropy),S.push(b.internalFormat),S.push(b.format),S.push(b.type),S.push(b.generateMipmaps),S.push(b.premultiplyAlpha),S.push(b.flipY),S.push(b.unpackAlignment),S.push(b.colorSpace),S.join()}function X(b,S){const H=n.get(b);if(b.isVideoTexture&&It(b),b.isRenderTargetTexture===!1&&b.version>0&&H.__version!==b.version){const K=b.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Gt(H,b,S);return}}e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+S)}function $(b,S){const H=n.get(b);if(b.version>0&&H.__version!==b.version){Gt(H,b,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+S)}function G(b,S){const H=n.get(b);if(b.version>0&&H.__version!==b.version){Gt(H,b,S);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+S)}function Y(b,S){const H=n.get(b);if(b.version>0&&H.__version!==b.version){V(H,b,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+S)}const k={[Ra]:i.REPEAT,[vn]:i.CLAMP_TO_EDGE,[La]:i.MIRRORED_REPEAT},dt={[ke]:i.NEAREST,[mu]:i.NEAREST_MIPMAP_NEAREST,[Ir]:i.NEAREST_MIPMAP_LINEAR,[Re]:i.LINEAR,[Bs]:i.LINEAR_MIPMAP_NEAREST,[oi]:i.LINEAR_MIPMAP_LINEAR},ct={[Ru]:i.NEVER,[Nu]:i.ALWAYS,[Lu]:i.LESS,[Ec]:i.LEQUAL,[Pu]:i.EQUAL,[Uu]:i.GEQUAL,[Iu]:i.GREATER,[Du]:i.NOTEQUAL};function ut(b,S){if(S.type===Dn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Re||S.magFilter===Bs||S.magFilter===Ir||S.magFilter===oi||S.minFilter===Re||S.minFilter===Bs||S.minFilter===Ir||S.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,k[S.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,k[S.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,k[S.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,dt[S.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,dt[S.minFilter]),S.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,ct[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===ke||S.minFilter!==Ir&&S.minFilter!==oi||S.type===Dn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(b,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Dt(b,S){let H=!1;b.__webglInit===void 0&&(b.__webglInit=!0,S.addEventListener("dispose",U));const K=S.source;let j=h.get(K);j===void 0&&(j={},h.set(K,j));const Z=F(S);if(Z!==b.__cacheKey){j[Z]===void 0&&(j[Z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),j[Z].usedTimes++;const vt=j[b.__cacheKey];vt!==void 0&&(j[b.__cacheKey].usedTimes--,vt.usedTimes===0&&I(S)),b.__cacheKey=Z,b.__webglTexture=j[Z].texture}return H}function Gt(b,S,H){let K=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(K=i.TEXTURE_3D);const j=Dt(b,S),Z=S.source;e.bindTexture(K,b.__webglTexture,i.TEXTURE0+H);const vt=n.get(Z);if(Z.version!==vt.__version||j===!0){e.activeTexture(i.TEXTURE0+H);const it=Xt.getPrimaries(Xt.workingColorSpace),rt=S.colorSpace===In?null:Xt.getPrimaries(S.colorSpace),Rt=S.colorSpace===In||it===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let Q=_(S.image,!1,r.maxTextureSize);Q=wt(S,Q);const gt=s.convert(S.format,S.colorSpace),Ut=s.convert(S.type);let Et=M(S.internalFormat,gt,Ut,S.colorSpace,S.isVideoTexture);ut(K,S);let at;const Lt=S.mipmaps,Ft=S.isVideoTexture!==!0,te=vt.__version===void 0||j===!0,R=Z.dataReady,ot=T(S,Q);if(S.isDepthTexture)Et=E(S.format===Yi,S.type),te&&(Ft?e.texStorage2D(i.TEXTURE_2D,1,Et,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,Et,Q.width,Q.height,0,gt,Ut,null));else if(S.isDataTexture)if(Lt.length>0){Ft&&te&&e.texStorage2D(i.TEXTURE_2D,ot,Et,Lt[0].width,Lt[0].height);for(let W=0,q=Lt.length;W<q;W++)at=Lt[W],Ft?R&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,at.width,at.height,gt,Ut,at.data):e.texImage2D(i.TEXTURE_2D,W,Et,at.width,at.height,0,gt,Ut,at.data);S.generateMipmaps=!1}else Ft?(te&&e.texStorage2D(i.TEXTURE_2D,ot,Et,Q.width,Q.height),R&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,gt,Ut,Q.data)):e.texImage2D(i.TEXTURE_2D,0,Et,Q.width,Q.height,0,gt,Ut,Q.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ft&&te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,Et,Lt[0].width,Lt[0].height,Q.depth);for(let W=0,q=Lt.length;W<q;W++)if(at=Lt[W],S.format!==nn)if(gt!==null)if(Ft){if(R)if(S.layerUpdates.size>0){for(const et of S.layerUpdates){const Tt=at.width*at.height;e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,et,at.width,at.height,1,gt,at.data.slice(Tt*et,Tt*(et+1)),0,0)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,at.width,at.height,Q.depth,gt,at.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,W,Et,at.width,at.height,Q.depth,0,at.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?R&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,at.width,at.height,Q.depth,gt,Ut,at.data):e.texImage3D(i.TEXTURE_2D_ARRAY,W,Et,at.width,at.height,Q.depth,0,gt,Ut,at.data)}else{Ft&&te&&e.texStorage2D(i.TEXTURE_2D,ot,Et,Lt[0].width,Lt[0].height);for(let W=0,q=Lt.length;W<q;W++)at=Lt[W],S.format!==nn?gt!==null?Ft?R&&e.compressedTexSubImage2D(i.TEXTURE_2D,W,0,0,at.width,at.height,gt,at.data):e.compressedTexImage2D(i.TEXTURE_2D,W,Et,at.width,at.height,0,at.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?R&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,at.width,at.height,gt,Ut,at.data):e.texImage2D(i.TEXTURE_2D,W,Et,at.width,at.height,0,gt,Ut,at.data)}else if(S.isDataArrayTexture)if(Ft){if(te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,Et,Q.width,Q.height,Q.depth),R)if(S.layerUpdates.size>0){let W;switch(Ut){case i.UNSIGNED_BYTE:switch(gt){case i.ALPHA:W=1;break;case i.LUMINANCE:W=1;break;case i.LUMINANCE_ALPHA:W=2;break;case i.RGB:W=3;break;case i.RGBA:W=4;break;default:throw new Error(`Unknown texel size for format ${gt}.`)}break;case i.UNSIGNED_SHORT_4_4_4_4:case i.UNSIGNED_SHORT_5_5_5_1:case i.UNSIGNED_SHORT_5_6_5:W=1;break;default:throw new Error(`Unknown texel size for type ${Ut}.`)}const q=Q.width*Q.height*W;for(const et of S.layerUpdates)e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,et,Q.width,Q.height,1,gt,Ut,Q.data.slice(q*et,q*(et+1)));S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,gt,Ut,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Et,Q.width,Q.height,Q.depth,0,gt,Ut,Q.data);else if(S.isData3DTexture)Ft?(te&&e.texStorage3D(i.TEXTURE_3D,ot,Et,Q.width,Q.height,Q.depth),R&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,gt,Ut,Q.data)):e.texImage3D(i.TEXTURE_3D,0,Et,Q.width,Q.height,Q.depth,0,gt,Ut,Q.data);else if(S.isFramebufferTexture){if(te)if(Ft)e.texStorage2D(i.TEXTURE_2D,ot,Et,Q.width,Q.height);else{let W=Q.width,q=Q.height;for(let et=0;et<ot;et++)e.texImage2D(i.TEXTURE_2D,et,Et,W,q,0,gt,Ut,null),W>>=1,q>>=1}}else if(Lt.length>0){if(Ft&&te){const W=ne(Lt[0]);e.texStorage2D(i.TEXTURE_2D,ot,Et,W.width,W.height)}for(let W=0,q=Lt.length;W<q;W++)at=Lt[W],Ft?R&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,gt,Ut,at):e.texImage2D(i.TEXTURE_2D,W,Et,gt,Ut,at);S.generateMipmaps=!1}else if(Ft){if(te){const W=ne(Q);e.texStorage2D(i.TEXTURE_2D,ot,Et,W.width,W.height)}R&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,Ut,Q)}else e.texImage2D(i.TEXTURE_2D,0,Et,gt,Ut,Q);p(S)&&f(K),vt.__version=Z.version,S.onUpdate&&S.onUpdate(S)}b.__version=S.version}function V(b,S,H){if(S.image.length!==6)return;const K=Dt(b,S),j=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+H);const Z=n.get(j);if(j.version!==Z.__version||K===!0){e.activeTexture(i.TEXTURE0+H);const vt=Xt.getPrimaries(Xt.workingColorSpace),it=S.colorSpace===In?null:Xt.getPrimaries(S.colorSpace),rt=S.colorSpace===In||vt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt);const Rt=S.isCompressedTexture||S.image[0].isCompressedTexture,Q=S.image[0]&&S.image[0].isDataTexture,gt=[];for(let q=0;q<6;q++)!Rt&&!Q?gt[q]=_(S.image[q],!0,r.maxCubemapSize):gt[q]=Q?S.image[q].image:S.image[q],gt[q]=wt(S,gt[q]);const Ut=gt[0],Et=s.convert(S.format,S.colorSpace),at=s.convert(S.type),Lt=M(S.internalFormat,Et,at,S.colorSpace),Ft=S.isVideoTexture!==!0,te=Z.__version===void 0||K===!0,R=j.dataReady;let ot=T(S,Ut);ut(i.TEXTURE_CUBE_MAP,S);let W;if(Rt){Ft&&te&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ot,Lt,Ut.width,Ut.height);for(let q=0;q<6;q++){W=gt[q].mipmaps;for(let et=0;et<W.length;et++){const Tt=W[et];S.format!==nn?Et!==null?Ft?R&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,0,0,Tt.width,Tt.height,Et,Tt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,Lt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?R&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,0,0,Tt.width,Tt.height,Et,at,Tt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,Lt,Tt.width,Tt.height,0,Et,at,Tt.data)}}}else{if(W=S.mipmaps,Ft&&te){W.length>0&&ot++;const q=ne(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ot,Lt,q.width,q.height)}for(let q=0;q<6;q++)if(Q){Ft?R&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,gt[q].width,gt[q].height,Et,at,gt[q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Lt,gt[q].width,gt[q].height,0,Et,at,gt[q].data);for(let et=0;et<W.length;et++){const kt=W[et].image[q].image;Ft?R&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,0,0,kt.width,kt.height,Et,at,kt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,Lt,kt.width,kt.height,0,Et,at,kt.data)}}else{Ft?R&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Et,at,gt[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Lt,Et,at,gt[q]);for(let et=0;et<W.length;et++){const Tt=W[et];Ft?R&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,0,0,Et,at,Tt.image[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,Lt,Et,at,Tt.image[q])}}}p(S)&&f(i.TEXTURE_CUBE_MAP),Z.__version=j.version,S.onUpdate&&S.onUpdate(S)}b.__version=S.version}function J(b,S,H,K,j,Z){const vt=s.convert(H.format,H.colorSpace),it=s.convert(H.type),rt=M(H.internalFormat,vt,it,H.colorSpace);if(!n.get(S).__hasExternalTextures){const Q=Math.max(1,S.width>>Z),gt=Math.max(1,S.height>>Z);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?e.texImage3D(j,Z,rt,Q,gt,S.depth,0,vt,it,null):e.texImage2D(j,Z,rt,Q,gt,0,vt,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,b),Ht(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,j,n.get(H).__webglTexture,0,St(S)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,j,n.get(H).__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ht(b,S,H){if(i.bindRenderbuffer(i.RENDERBUFFER,b),S.depthBuffer){const K=S.depthTexture,j=K&&K.isDepthTexture?K.type:null,Z=E(S.stencilBuffer,j),vt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=St(S);Ht(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,Z,S.width,S.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,it,Z,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Z,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,vt,i.RENDERBUFFER,b)}else{const K=S.textures;for(let j=0;j<K.length;j++){const Z=K[j],vt=s.convert(Z.format,Z.colorSpace),it=s.convert(Z.type),rt=M(Z.internalFormat,vt,it,Z.colorSpace),Rt=St(S);H&&Ht(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,rt,S.width,S.height):Ht(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt,rt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,rt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function st(b,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,b),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),X(S.depthTexture,0);const K=n.get(S.depthTexture).__webglTexture,j=St(S);if(S.depthTexture.format===zi)Ht(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(S.depthTexture.format===Yi)Ht(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Pt(b){const S=n.get(b),H=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!S.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");st(S.__webglFramebuffer,b)}else if(H){S.__webglDepthbuffer=[];for(let K=0;K<6;K++)e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[K]),S.__webglDepthbuffer[K]=i.createRenderbuffer(),ht(S.__webglDepthbuffer[K],b,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=i.createRenderbuffer(),ht(S.__webglDepthbuffer,b,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ct(b,S,H){const K=n.get(b);S!==void 0&&J(K.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Pt(b)}function zt(b){const S=b.texture,H=n.get(b),K=n.get(S);b.addEventListener("dispose",w);const j=b.textures,Z=b.isWebGLCubeRenderTarget===!0,vt=j.length>1;if(vt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=S.version,a.memory.textures++),Z){H.__webglFramebuffer=[];for(let it=0;it<6;it++)if(S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer[it]=[];for(let rt=0;rt<S.mipmaps.length;rt++)H.__webglFramebuffer[it][rt]=i.createFramebuffer()}else H.__webglFramebuffer[it]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer=[];for(let it=0;it<S.mipmaps.length;it++)H.__webglFramebuffer[it]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(vt)for(let it=0,rt=j.length;it<rt;it++){const Rt=n.get(j[it]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=i.createTexture(),a.memory.textures++)}if(b.samples>0&&Ht(b)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let it=0;it<j.length;it++){const rt=j[it];H.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[it]);const Rt=s.convert(rt.format,rt.colorSpace),Q=s.convert(rt.type),gt=M(rt.internalFormat,Rt,Q,rt.colorSpace,b.isXRRenderTarget===!0),Ut=St(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut,gt,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,H.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),ht(H.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),ut(i.TEXTURE_CUBE_MAP,S);for(let it=0;it<6;it++)if(S.mipmaps&&S.mipmaps.length>0)for(let rt=0;rt<S.mipmaps.length;rt++)J(H.__webglFramebuffer[it][rt],b,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,rt);else J(H.__webglFramebuffer[it],b,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);p(S)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let it=0,rt=j.length;it<rt;it++){const Rt=j[it],Q=n.get(Rt);e.bindTexture(i.TEXTURE_2D,Q.__webglTexture),ut(i.TEXTURE_2D,Rt),J(H.__webglFramebuffer,b,Rt,i.COLOR_ATTACHMENT0+it,i.TEXTURE_2D,0),p(Rt)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(it=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,K.__webglTexture),ut(it,S),S.mipmaps&&S.mipmaps.length>0)for(let rt=0;rt<S.mipmaps.length;rt++)J(H.__webglFramebuffer[rt],b,S,i.COLOR_ATTACHMENT0,it,rt);else J(H.__webglFramebuffer,b,S,i.COLOR_ATTACHMENT0,it,0);p(S)&&f(it),e.unbindTexture()}b.depthBuffer&&Pt(b)}function L(b){const S=b.textures;for(let H=0,K=S.length;H<K;H++){const j=S[H];if(p(j)){const Z=b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,vt=n.get(j).__webglTexture;e.bindTexture(Z,vt),f(Z),e.unbindTexture()}}}const Bt=[],Nt=[];function jt(b){if(b.samples>0){if(Ht(b)===!1){const S=b.textures,H=b.width,K=b.height;let j=i.COLOR_BUFFER_BIT;const Z=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=n.get(b),it=S.length>1;if(it)for(let rt=0;rt<S.length;rt++)e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let rt=0;rt<S.length;rt++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,vt.__webglColorRenderbuffer[rt]);const Rt=n.get(S[rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Rt,0)}i.blitFramebuffer(0,0,H,K,0,0,H,K,j,i.NEAREST),l===!0&&(Bt.length=0,Nt.length=0,Bt.push(i.COLOR_ATTACHMENT0+rt),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Bt.push(Z),Nt.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Nt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Bt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let rt=0;rt<S.length;rt++){e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,vt.__webglColorRenderbuffer[rt]);const Rt=n.get(S[rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,Rt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const S=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function St(b){return Math.min(r.maxSamples,b.samples)}function Ht(b){const S=n.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function It(b){const S=a.render.frame;d.get(b)!==S&&(d.set(b,S),b.update())}function wt(b,S){const H=b.colorSpace,K=b.format,j=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||H!==Xn&&H!==In&&(Xt.getTransfer(H)===Yt?(K!==nn||j!==Vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),S}function ne(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=C,this.setTexture2D=X,this.setTexture2DArray=$,this.setTexture3D=G,this.setTextureCube=Y,this.rebindTextures=Ct,this.setupRenderTarget=zt,this.updateRenderTargetMipmap=L,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Ht}function Fg(i,t){function e(n,r=In){let s;const a=Xt.getTransfer(r);if(n===Vn)return i.UNSIGNED_BYTE;if(n===vc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===xc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===vu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gu)return i.BYTE;if(n===_u)return i.SHORT;if(n===fs)return i.UNSIGNED_SHORT;if(n===_c)return i.INT;if(n===$i)return i.UNSIGNED_INT;if(n===Dn)return i.FLOAT;if(n===bs)return i.HALF_FLOAT;if(n===xu)return i.ALPHA;if(n===Su)return i.RGB;if(n===nn)return i.RGBA;if(n===Mu)return i.LUMINANCE;if(n===yu)return i.LUMINANCE_ALPHA;if(n===zi)return i.DEPTH_COMPONENT;if(n===Yi)return i.DEPTH_STENCIL;if(n===Eu)return i.RED;if(n===Sc)return i.RED_INTEGER;if(n===Tu)return i.RG;if(n===Mc)return i.RG_INTEGER;if(n===yc)return i.RGBA_INTEGER;if(n===zs||n===Hs||n===ks||n===Gs)if(a===Yt)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===zs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Hs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ks)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Gs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===zs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Hs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ks)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Gs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wo||n===bo||n===Ao||n===Co)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===wo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ao)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Co)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ro||n===Lo||n===Po)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ro||n===Lo)return a===Yt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Po)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Io||n===Do||n===Uo||n===No||n===Fo||n===Oo||n===Bo||n===zo||n===Ho||n===ko||n===Go||n===Vo||n===Wo||n===Xo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Io)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Do)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Uo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===No)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Oo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Bo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===zo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ho)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ko)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Go)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vs||n===$o||n===qo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Vs)return a===Yt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===$o)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wu||n===Yo||n===Ko||n===jo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Vs)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Yo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ko)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===jo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Og extends Be{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class li extends ae{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bg={type:"move"};class ga{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new li,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new li,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new li,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),f=this._getHandJoint(c,_);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&h>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bg)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new li;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const zg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hg=`
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

}`;class kg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new xe,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ke({vertexShader:zg,fragmentShader:Hg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ve(new xi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class Gg extends Ji{constructor(t,e){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,m=null,g=null;const _=new kg,p=e.getContextAttributes();let f=null,M=null;const E=[],T=[],U=new Ot;let w=null;const A=new Be;A.layers.enable(1),A.viewport=new he;const I=new Be;I.layers.enable(2),I.viewport=new he;const v=[A,I],x=new Og;x.layers.enable(1),x.layers.enable(2);let C=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let J=E[V];return J===void 0&&(J=new ga,E[V]=J),J.getTargetRaySpace()},this.getControllerGrip=function(V){let J=E[V];return J===void 0&&(J=new ga,E[V]=J),J.getGripSpace()},this.getHand=function(V){let J=E[V];return J===void 0&&(J=new ga,E[V]=J),J.getHandSpace()};function F(V){const J=T.indexOf(V.inputSource);if(J===-1)return;const ht=E[J];ht!==void 0&&(ht.update(V.inputSource,V.frame,c||a),ht.dispatchEvent({type:V.type,data:V.inputSource}))}function X(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",$);for(let V=0;V<E.length;V++){const J=T[V];J!==null&&(T[V]=null,E[V].disconnect(J))}C=null,B=null,_.reset(),t.setRenderTarget(f),m=null,h=null,u=null,r=null,M=null,Gt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){s=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(V){if(r=V,r!==null){if(f=t.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",X),r.addEventListener("inputsourceschange",$),p.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(U),r.renderState.layers===void 0){const J={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,e,J),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),M=new hi(m.framebufferWidth,m.framebufferHeight,{format:nn,type:Vn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let J=null,ht=null,st=null;p.depth&&(st=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,J=p.stencil?Yi:zi,ht=p.stencil?qi:$i);const Pt={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:s};u=new XRWebGLBinding(r,e),h=u.createProjectionLayer(Pt),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),M=new hi(h.textureWidth,h.textureHeight,{format:nn,type:Vn,depthTexture:new Fc(h.textureWidth,h.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Gt.setContext(r),Gt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function $(V){for(let J=0;J<V.removed.length;J++){const ht=V.removed[J],st=T.indexOf(ht);st>=0&&(T[st]=null,E[st].disconnect(ht))}for(let J=0;J<V.added.length;J++){const ht=V.added[J];let st=T.indexOf(ht);if(st===-1){for(let Ct=0;Ct<E.length;Ct++)if(Ct>=T.length){T.push(ht),st=Ct;break}else if(T[Ct]===null){T[Ct]=ht,st=Ct;break}if(st===-1)break}const Pt=E[st];Pt&&Pt.connect(ht)}}const G=new P,Y=new P;function k(V,J,ht){G.setFromMatrixPosition(J.matrixWorld),Y.setFromMatrixPosition(ht.matrixWorld);const st=G.distanceTo(Y),Pt=J.projectionMatrix.elements,Ct=ht.projectionMatrix.elements,zt=Pt[14]/(Pt[10]-1),L=Pt[14]/(Pt[10]+1),Bt=(Pt[9]+1)/Pt[5],Nt=(Pt[9]-1)/Pt[5],jt=(Pt[8]-1)/Pt[0],St=(Ct[8]+1)/Ct[0],Ht=zt*jt,It=zt*St,wt=st/(-jt+St),ne=wt*-jt;J.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(ne),V.translateZ(wt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const b=zt+wt,S=L+wt,H=Ht-ne,K=It+(st-ne),j=Bt*L/S*b,Z=Nt*L/S*b;V.projectionMatrix.makePerspective(H,K,j,Z,b,S),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function dt(V,J){J===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(J.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(r===null)return;_.texture!==null&&(V.near=_.depthNear,V.far=_.depthFar),x.near=I.near=A.near=V.near,x.far=I.far=A.far=V.far,(C!==x.near||B!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,B=x.far,A.near=C,A.far=B,I.near=C,I.far=B,A.updateProjectionMatrix(),I.updateProjectionMatrix(),V.updateProjectionMatrix());const J=V.parent,ht=x.cameras;dt(x,J);for(let st=0;st<ht.length;st++)dt(ht[st],J);ht.length===2?k(x,A,I):x.projectionMatrix.copy(A.projectionMatrix),ct(V,x,J)};function ct(V,J,ht){ht===null?V.matrix.copy(J.matrixWorld):(V.matrix.copy(ht.matrixWorld),V.matrix.invert(),V.matrix.multiply(J.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(J.projectionMatrix),V.projectionMatrixInverse.copy(J.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Pa*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(V){l=V,h!==null&&(h.fixedFoveation=V),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=V)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let ut=null;function Dt(V,J){if(d=J.getViewerPose(c||a),g=J,d!==null){const ht=d.views;m!==null&&(t.setRenderTargetFramebuffer(M,m.framebuffer),t.setRenderTarget(M));let st=!1;ht.length!==x.cameras.length&&(x.cameras.length=0,st=!0);for(let Ct=0;Ct<ht.length;Ct++){const zt=ht[Ct];let L=null;if(m!==null)L=m.getViewport(zt);else{const Nt=u.getViewSubImage(h,zt);L=Nt.viewport,Ct===0&&(t.setRenderTargetTextures(M,Nt.colorTexture,h.ignoreDepthValues?void 0:Nt.depthStencilTexture),t.setRenderTarget(M))}let Bt=v[Ct];Bt===void 0&&(Bt=new Be,Bt.layers.enable(Ct),Bt.viewport=new he,v[Ct]=Bt),Bt.matrix.fromArray(zt.transform.matrix),Bt.matrix.decompose(Bt.position,Bt.quaternion,Bt.scale),Bt.projectionMatrix.fromArray(zt.projectionMatrix),Bt.projectionMatrixInverse.copy(Bt.projectionMatrix).invert(),Bt.viewport.set(L.x,L.y,L.width,L.height),Ct===0&&(x.matrix.copy(Bt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),st===!0&&x.cameras.push(Bt)}const Pt=r.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const Ct=u.getDepthInformation(ht[0]);Ct&&Ct.isValid&&Ct.texture&&_.init(t,Ct,r.renderState)}}for(let ht=0;ht<E.length;ht++){const st=T[ht],Pt=E[ht];st!==null&&Pt!==void 0&&Pt.update(st,J,c||a)}ut&&ut(V,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const Gt=new Nc;Gt.setAnimationLoop(Dt),this.setAnimationLoop=function(V){ut=V},this.dispose=function(){}}}const ti=new Ye,Vg=new Kt;function Wg(i,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,Ic(i)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,M,E,T){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),u(p,f)):f.isMeshPhongMaterial?(s(p,f),d(p,f)):f.isMeshStandardMaterial?(s(p,f),h(p,f),f.isMeshPhysicalMaterial&&m(p,f,T)):f.isMeshMatcapMaterial?(s(p,f),g(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),_(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?l(p,f,M,E):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Te&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Te&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const M=t.get(f),E=M.envMap,T=M.envMapRotation;E&&(p.envMap.value=E,ti.copy(T),ti.x*=-1,ti.y*=-1,ti.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),p.envMapRotation.value.setFromMatrix4(Vg.makeRotationFromEuler(ti)),p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,M,E){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*M,p.scale.value=E*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function d(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function u(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function h(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,M){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Te&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function _(p,f){const M=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Xg(i,t,e,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,E){const T=E.program;n.uniformBlockBinding(M,T)}function c(M,E){let T=r[M.id];T===void 0&&(g(M),T=d(M),r[M.id]=T,M.addEventListener("dispose",p));const U=E.program;n.updateUBOMapping(M,U);const w=t.render.frame;s[M.id]!==w&&(h(M),s[M.id]=w)}function d(M){const E=u();M.__bindingPointIndex=E;const T=i.createBuffer(),U=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,U,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,T),T}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const E=r[M.id],T=M.uniforms,U=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let w=0,A=T.length;w<A;w++){const I=Array.isArray(T[w])?T[w]:[T[w]];for(let v=0,x=I.length;v<x;v++){const C=I[v];if(m(C,w,v,U)===!0){const B=C.__offset,F=Array.isArray(C.value)?C.value:[C.value];let X=0;for(let $=0;$<F.length;$++){const G=F[$],Y=_(G);typeof G=="number"||typeof G=="boolean"?(C.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,B+X,C.__data)):G.isMatrix3?(C.__data[0]=G.elements[0],C.__data[1]=G.elements[1],C.__data[2]=G.elements[2],C.__data[3]=0,C.__data[4]=G.elements[3],C.__data[5]=G.elements[4],C.__data[6]=G.elements[5],C.__data[7]=0,C.__data[8]=G.elements[6],C.__data[9]=G.elements[7],C.__data[10]=G.elements[8],C.__data[11]=0):(G.toArray(C.__data,X),X+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(M,E,T,U){const w=M.value,A=E+"_"+T;if(U[A]===void 0)return typeof w=="number"||typeof w=="boolean"?U[A]=w:U[A]=w.clone(),!0;{const I=U[A];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return U[A]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function g(M){const E=M.uniforms;let T=0;const U=16;for(let A=0,I=E.length;A<I;A++){const v=Array.isArray(E[A])?E[A]:[E[A]];for(let x=0,C=v.length;x<C;x++){const B=v[x],F=Array.isArray(B.value)?B.value:[B.value];for(let X=0,$=F.length;X<$;X++){const G=F[X],Y=_(G),k=T%U;k!==0&&U-k<Y.boundary&&(T+=U-k),B.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=T,T+=Y.storage}}}const w=T%U;return w>0&&(T+=U-w),M.__size=T,M.__cache={},this}function _(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function p(M){const E=M.target;E.removeEventListener("dispose",p);const T=a.indexOf(E.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function f(){for(const M in r)i.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:c,dispose:f}}class $g{constructor(t={}){const{canvas:e=Ou(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const f=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qe,this.toneMapping=zn,this.toneMappingExposure=1;const E=this;let T=!1,U=0,w=0,A=null,I=-1,v=null;const x=new he,C=new he;let B=null;const F=new pt(0);let X=0,$=e.width,G=e.height,Y=1,k=null,dt=null;const ct=new he(0,0,$,G),ut=new he(0,0,$,G);let Dt=!1;const Gt=new Qa;let V=!1,J=!1;const ht=new Kt,st=new P,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ct=!1;function zt(){return A===null?Y:1}let L=n;function Bt(y,D){return e.getContext(y,D)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${qa}`),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",W,!1),e.addEventListener("webglcontextcreationerror",q,!1),L===null){const D="webgl2";if(L=Bt(D,y),L===null)throw Bt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Nt,jt,St,Ht,It,wt,ne,b,S,H,K,j,Z,vt,it,rt,Rt,Q,gt,Ut,Et,at,Lt,Ft;function te(){Nt=new tm(L),Nt.init(),at=new Fg(L,Nt),jt=new Yp(L,Nt,t,at),St=new Ug(L),Ht=new im(L),It=new Sg,wt=new Ng(L,Nt,St,It,jt,at,Ht),ne=new jp(E),b=new Qp(E),S=new ch(L),Lt=new $p(L,S),H=new em(L,S,Ht,Lt),K=new sm(L,H,S,Ht),gt=new rm(L,jt,wt),rt=new Kp(It),j=new xg(E,ne,b,Nt,jt,Lt,rt),Z=new Wg(E,It),vt=new yg,it=new Cg(Nt),Q=new Xp(E,ne,b,St,K,h,l),Rt=new Dg(E,K,jt),Ft=new Xg(L,Ht,jt,St),Ut=new qp(L,Nt,Ht),Et=new nm(L,Nt,Ht),Ht.programs=j.programs,E.capabilities=jt,E.extensions=Nt,E.properties=It,E.renderLists=vt,E.shadowMap=Rt,E.state=St,E.info=Ht}te();const R=new Gg(E,L);this.xr=R,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const y=Nt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Nt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(y){y!==void 0&&(Y=y,this.setSize($,G,!1))},this.getSize=function(y){return y.set($,G)},this.setSize=function(y,D,O=!0){if(R.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=y,G=D,e.width=Math.floor(y*Y),e.height=Math.floor(D*Y),O===!0&&(e.style.width=y+"px",e.style.height=D+"px"),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set($*Y,G*Y).floor()},this.setDrawingBufferSize=function(y,D,O){$=y,G=D,Y=O,e.width=Math.floor(y*O),e.height=Math.floor(D*O),this.setViewport(0,0,y,D)},this.getCurrentViewport=function(y){return y.copy(x)},this.getViewport=function(y){return y.copy(ct)},this.setViewport=function(y,D,O,z){y.isVector4?ct.set(y.x,y.y,y.z,y.w):ct.set(y,D,O,z),St.viewport(x.copy(ct).multiplyScalar(Y).round())},this.getScissor=function(y){return y.copy(ut)},this.setScissor=function(y,D,O,z){y.isVector4?ut.set(y.x,y.y,y.z,y.w):ut.set(y,D,O,z),St.scissor(C.copy(ut).multiplyScalar(Y).round())},this.getScissorTest=function(){return Dt},this.setScissorTest=function(y){St.setScissorTest(Dt=y)},this.setOpaqueSort=function(y){k=y},this.setTransparentSort=function(y){dt=y},this.getClearColor=function(y){return y.copy(Q.getClearColor())},this.setClearColor=function(){Q.setClearColor.apply(Q,arguments)},this.getClearAlpha=function(){return Q.getClearAlpha()},this.setClearAlpha=function(){Q.setClearAlpha.apply(Q,arguments)},this.clear=function(y=!0,D=!0,O=!0){let z=0;if(y){let N=!1;if(A!==null){const tt=A.texture.format;N=tt===yc||tt===Mc||tt===Sc}if(N){const tt=A.texture.type,lt=tt===Vn||tt===$i||tt===fs||tt===qi||tt===vc||tt===xc,ft=Q.getClearColor(),mt=Q.getClearAlpha(),Mt=ft.r,yt=ft.g,xt=ft.b;lt?(m[0]=Mt,m[1]=yt,m[2]=xt,m[3]=mt,L.clearBufferuiv(L.COLOR,0,m)):(g[0]=Mt,g[1]=yt,g[2]=xt,g[3]=mt,L.clearBufferiv(L.COLOR,0,g))}else z|=L.COLOR_BUFFER_BIT}D&&(z|=L.DEPTH_BUFFER_BIT),O&&(z|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",W,!1),e.removeEventListener("webglcontextcreationerror",q,!1),vt.dispose(),it.dispose(),It.dispose(),ne.dispose(),b.dispose(),K.dispose(),Lt.dispose(),Ft.dispose(),j.dispose(),R.dispose(),R.removeEventListener("sessionstart",je),R.removeEventListener("sessionend",Ze),qn.stop()};function ot(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function W(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const y=Ht.autoReset,D=Rt.enabled,O=Rt.autoUpdate,z=Rt.needsUpdate,N=Rt.type;te(),Ht.autoReset=y,Rt.enabled=D,Rt.autoUpdate=O,Rt.needsUpdate=z,Rt.type=N}function q(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function et(y){const D=y.target;D.removeEventListener("dispose",et),Tt(D)}function Tt(y){kt(y),It.remove(y)}function kt(y){const D=It.get(y).programs;D!==void 0&&(D.forEach(function(O){j.releaseProgram(O)}),y.isShaderMaterial&&j.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,O,z,N,tt){D===null&&(D=Pt);const lt=N.isMesh&&N.matrixWorld.determinant()<0,ft=Cd(y,D,O,z,N);St.setMaterial(z,lt);let mt=O.index,Mt=1;if(z.wireframe===!0){if(mt=H.getWireframeAttribute(O),mt===void 0)return;Mt=2}const yt=O.drawRange,xt=O.attributes.position;let Vt=yt.start*Mt,Zt=(yt.start+yt.count)*Mt;tt!==null&&(Vt=Math.max(Vt,tt.start*Mt),Zt=Math.min(Zt,(tt.start+tt.count)*Mt)),mt!==null?(Vt=Math.max(Vt,0),Zt=Math.min(Zt,mt.count)):xt!=null&&(Vt=Math.max(Vt,0),Zt=Math.min(Zt,xt.count));const Jt=Zt-Vt;if(Jt<0||Jt===1/0)return;Lt.setup(N,z,ft,O,mt);let we,Wt=Ut;if(mt!==null&&(we=S.get(mt),Wt=Et,Wt.setIndex(we)),N.isMesh)z.wireframe===!0?(St.setLineWidth(z.wireframeLinewidth*zt()),Wt.setMode(L.LINES)):Wt.setMode(L.TRIANGLES);else if(N.isLine){let _t=z.linewidth;_t===void 0&&(_t=1),St.setLineWidth(_t*zt()),N.isLineSegments?Wt.setMode(L.LINES):N.isLineLoop?Wt.setMode(L.LINE_LOOP):Wt.setMode(L.LINE_STRIP)}else N.isPoints?Wt.setMode(L.POINTS):N.isSprite&&Wt.setMode(L.TRIANGLES);if(N.isBatchedMesh)N._multiDrawInstances!==null?Wt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances):Wt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else if(N.isInstancedMesh)Wt.renderInstances(Vt,Jt,N.count);else if(O.isInstancedBufferGeometry){const _t=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,ge=Math.min(O.instanceCount,_t);Wt.renderInstances(Vt,Jt,ge)}else Wt.render(Vt,Jt)};function ee(y,D,O){y.transparent===!0&&y.side===ze&&y.forceSinglePass===!1?(y.side=Te,y.needsUpdate=!0,Lr(y,D,O),y.side=Gn,y.needsUpdate=!0,Lr(y,D,O),y.side=ze):Lr(y,D,O)}this.compile=function(y,D,O=null){O===null&&(O=y),p=it.get(O),p.init(D),M.push(p),O.traverseVisible(function(N){N.isLight&&N.layers.test(D.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),y!==O&&y.traverseVisible(function(N){N.isLight&&N.layers.test(D.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const z=new Set;return y.traverse(function(N){const tt=N.material;if(tt)if(Array.isArray(tt))for(let lt=0;lt<tt.length;lt++){const ft=tt[lt];ee(ft,O,N),z.add(ft)}else ee(tt,O,N),z.add(tt)}),M.pop(),p=null,z},this.compileAsync=function(y,D,O=null){const z=this.compile(y,D,O);return new Promise(N=>{function tt(){if(z.forEach(function(lt){It.get(lt).currentProgram.isReady()&&z.delete(lt)}),z.size===0){N(y);return}setTimeout(tt,10)}Nt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let ce=null;function $t(y){ce&&ce(y)}function je(){qn.stop()}function Ze(){qn.start()}const qn=new Nc;qn.setAnimationLoop($t),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(y){ce=y,R.setAnimationLoop(y),y===null?qn.stop():qn.start()},R.addEventListener("sessionstart",je),R.addEventListener("sessionend",Ze),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),R.enabled===!0&&R.isPresenting===!0&&(R.cameraAutoUpdate===!0&&R.updateCamera(D),D=R.getCamera()),y.isScene===!0&&y.onBeforeRender(E,y,D,A),p=it.get(y,M.length),p.init(D),M.push(p),ht.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Gt.setFromProjectionMatrix(ht),J=this.localClippingEnabled,V=rt.init(this.clippingPlanes,J),_=vt.get(y,f.length),_.init(),f.push(_),R.enabled===!0&&R.isPresenting===!0){const tt=E.xr.getDepthSensingMesh();tt!==null&&Us(tt,D,-1/0,E.sortObjects)}Us(y,D,0,E.sortObjects),_.finish(),E.sortObjects===!0&&_.sort(k,dt),Ct=R.enabled===!1||R.isPresenting===!1||R.hasDepthSensing()===!1,Ct&&Q.addToRenderList(_,y),this.info.render.frame++,V===!0&&rt.beginShadows();const O=p.state.shadowsArray;Rt.render(O,y,D),V===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=_.opaque,N=_.transmissive;if(p.setupLights(),D.isArrayCamera){const tt=D.cameras;if(N.length>0)for(let lt=0,ft=tt.length;lt<ft;lt++){const mt=tt[lt];go(z,N,y,mt)}Ct&&Q.render(y);for(let lt=0,ft=tt.length;lt<ft;lt++){const mt=tt[lt];mo(_,y,mt,mt.viewport)}}else N.length>0&&go(z,N,y,D),Ct&&Q.render(y),mo(_,y,D);A!==null&&(wt.updateMultisampleRenderTarget(A),wt.updateRenderTargetMipmap(A)),y.isScene===!0&&y.onAfterRender(E,y,D),Lt.resetDefaultState(),I=-1,v=null,M.pop(),M.length>0?(p=M[M.length-1],V===!0&&rt.setGlobalState(E.clippingPlanes,p.state.camera)):p=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function Us(y,D,O,z){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)O=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Gt.intersectsSprite(y)){z&&st.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ht);const lt=K.update(y),ft=y.material;ft.visible&&_.push(y,lt,ft,O,st.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Gt.intersectsObject(y))){const lt=K.update(y),ft=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),st.copy(y.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),st.copy(lt.boundingSphere.center)),st.applyMatrix4(y.matrixWorld).applyMatrix4(ht)),Array.isArray(ft)){const mt=lt.groups;for(let Mt=0,yt=mt.length;Mt<yt;Mt++){const xt=mt[Mt],Vt=ft[xt.materialIndex];Vt&&Vt.visible&&_.push(y,lt,Vt,O,st.z,xt)}}else ft.visible&&_.push(y,lt,ft,O,st.z,null)}}const tt=y.children;for(let lt=0,ft=tt.length;lt<ft;lt++)Us(tt[lt],D,O,z)}function mo(y,D,O,z){const N=y.opaque,tt=y.transmissive,lt=y.transparent;p.setupLightsView(O),V===!0&&rt.setGlobalState(E.clippingPlanes,O),z&&St.viewport(x.copy(z)),N.length>0&&Rr(N,D,O),tt.length>0&&Rr(tt,D,O),lt.length>0&&Rr(lt,D,O),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function go(y,D,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new hi(1,1,{generateMipmaps:!0,type:Nt.has("EXT_color_buffer_half_float")||Nt.has("EXT_color_buffer_float")?bs:Vn,minFilter:oi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));const tt=p.state.transmissionRenderTarget[z.id],lt=z.viewport||x;tt.setSize(lt.z,lt.w);const ft=E.getRenderTarget();E.setRenderTarget(tt),E.getClearColor(F),X=E.getClearAlpha(),X<1&&E.setClearColor(16777215,.5),Ct?Q.render(O):E.clear();const mt=E.toneMapping;E.toneMapping=zn;const Mt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),V===!0&&rt.setGlobalState(E.clippingPlanes,z),Rr(y,O,z),wt.updateMultisampleRenderTarget(tt),wt.updateRenderTargetMipmap(tt),Nt.has("WEBGL_multisampled_render_to_texture")===!1){let yt=!1;for(let xt=0,Vt=D.length;xt<Vt;xt++){const Zt=D[xt],Jt=Zt.object,we=Zt.geometry,Wt=Zt.material,_t=Zt.group;if(Wt.side===ze&&Jt.layers.test(z.layers)){const ge=Wt.side;Wt.side=Te,Wt.needsUpdate=!0,_o(Jt,O,z,we,Wt,_t),Wt.side=ge,Wt.needsUpdate=!0,yt=!0}}yt===!0&&(wt.updateMultisampleRenderTarget(tt),wt.updateRenderTargetMipmap(tt))}E.setRenderTarget(ft),E.setClearColor(F,X),Mt!==void 0&&(z.viewport=Mt),E.toneMapping=mt}function Rr(y,D,O){const z=D.isScene===!0?D.overrideMaterial:null;for(let N=0,tt=y.length;N<tt;N++){const lt=y[N],ft=lt.object,mt=lt.geometry,Mt=z===null?lt.material:z,yt=lt.group;ft.layers.test(O.layers)&&_o(ft,D,O,mt,Mt,yt)}}function _o(y,D,O,z,N,tt){y.onBeforeRender(E,D,O,z,N,tt),y.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),N.onBeforeRender(E,D,O,z,y,tt),N.transparent===!0&&N.side===ze&&N.forceSinglePass===!1?(N.side=Te,N.needsUpdate=!0,E.renderBufferDirect(O,D,z,N,y,tt),N.side=Gn,N.needsUpdate=!0,E.renderBufferDirect(O,D,z,N,y,tt),N.side=ze):E.renderBufferDirect(O,D,z,N,y,tt),y.onAfterRender(E,D,O,z,N,tt)}function Lr(y,D,O){D.isScene!==!0&&(D=Pt);const z=It.get(y),N=p.state.lights,tt=p.state.shadowsArray,lt=N.state.version,ft=j.getParameters(y,N.state,tt,D,O),mt=j.getProgramCacheKey(ft);let Mt=z.programs;z.environment=y.isMeshStandardMaterial?D.environment:null,z.fog=D.fog,z.envMap=(y.isMeshStandardMaterial?b:ne).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?D.environmentRotation:y.envMapRotation,Mt===void 0&&(y.addEventListener("dispose",et),Mt=new Map,z.programs=Mt);let yt=Mt.get(mt);if(yt!==void 0){if(z.currentProgram===yt&&z.lightsStateVersion===lt)return xo(y,ft),yt}else ft.uniforms=j.getUniforms(y),y.onBuild(O,ft,E),y.onBeforeCompile(ft,E),yt=j.acquireProgram(ft,mt),Mt.set(mt,yt),z.uniforms=ft.uniforms;const xt=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(xt.clippingPlanes=rt.uniform),xo(y,ft),z.needsLights=Ld(y),z.lightsStateVersion=lt,z.needsLights&&(xt.ambientLightColor.value=N.state.ambient,xt.lightProbe.value=N.state.probe,xt.directionalLights.value=N.state.directional,xt.directionalLightShadows.value=N.state.directionalShadow,xt.spotLights.value=N.state.spot,xt.spotLightShadows.value=N.state.spotShadow,xt.rectAreaLights.value=N.state.rectArea,xt.ltc_1.value=N.state.rectAreaLTC1,xt.ltc_2.value=N.state.rectAreaLTC2,xt.pointLights.value=N.state.point,xt.pointLightShadows.value=N.state.pointShadow,xt.hemisphereLights.value=N.state.hemi,xt.directionalShadowMap.value=N.state.directionalShadowMap,xt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,xt.spotShadowMap.value=N.state.spotShadowMap,xt.spotLightMatrix.value=N.state.spotLightMatrix,xt.spotLightMap.value=N.state.spotLightMap,xt.pointShadowMap.value=N.state.pointShadowMap,xt.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=yt,z.uniformsList=null,yt}function vo(y){if(y.uniformsList===null){const D=y.currentProgram.getUniforms();y.uniformsList=ss.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function xo(y,D){const O=It.get(y);O.outputColorSpace=D.outputColorSpace,O.batching=D.batching,O.batchingColor=D.batchingColor,O.instancing=D.instancing,O.instancingColor=D.instancingColor,O.instancingMorph=D.instancingMorph,O.skinning=D.skinning,O.morphTargets=D.morphTargets,O.morphNormals=D.morphNormals,O.morphColors=D.morphColors,O.morphTargetsCount=D.morphTargetsCount,O.numClippingPlanes=D.numClippingPlanes,O.numIntersection=D.numClipIntersection,O.vertexAlphas=D.vertexAlphas,O.vertexTangents=D.vertexTangents,O.toneMapping=D.toneMapping}function Cd(y,D,O,z,N){D.isScene!==!0&&(D=Pt),wt.resetTextureUnits();const tt=D.fog,lt=z.isMeshStandardMaterial?D.environment:null,ft=A===null?E.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Xn,mt=(z.isMeshStandardMaterial?b:ne).get(z.envMap||lt),Mt=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,yt=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),xt=!!O.morphAttributes.position,Vt=!!O.morphAttributes.normal,Zt=!!O.morphAttributes.color;let Jt=zn;z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Jt=E.toneMapping);const we=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Wt=we!==void 0?we.length:0,_t=It.get(z),ge=p.state.lights;if(V===!0&&(J===!0||y!==v)){const Ie=y===v&&z.id===I;rt.setState(z,y,Ie)}let qt=!1;z.version===_t.__version?(_t.needsLights&&_t.lightsStateVersion!==ge.state.version||_t.outputColorSpace!==ft||N.isBatchedMesh&&_t.batching===!1||!N.isBatchedMesh&&_t.batching===!0||N.isBatchedMesh&&_t.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&_t.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&_t.instancing===!1||!N.isInstancedMesh&&_t.instancing===!0||N.isSkinnedMesh&&_t.skinning===!1||!N.isSkinnedMesh&&_t.skinning===!0||N.isInstancedMesh&&_t.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&_t.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&_t.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&_t.instancingMorph===!1&&N.morphTexture!==null||_t.envMap!==mt||z.fog===!0&&_t.fog!==tt||_t.numClippingPlanes!==void 0&&(_t.numClippingPlanes!==rt.numPlanes||_t.numIntersection!==rt.numIntersection)||_t.vertexAlphas!==Mt||_t.vertexTangents!==yt||_t.morphTargets!==xt||_t.morphNormals!==Vt||_t.morphColors!==Zt||_t.toneMapping!==Jt||_t.morphTargetsCount!==Wt)&&(qt=!0):(qt=!0,_t.__version=z.version);let ln=_t.currentProgram;qt===!0&&(ln=Lr(z,D,N));let Pr=!1,Yn=!1,Ns=!1;const de=ln.getUniforms(),yn=_t.uniforms;if(St.useProgram(ln.program)&&(Pr=!0,Yn=!0,Ns=!0),z.id!==I&&(I=z.id,Yn=!0),Pr||v!==y){de.setValue(L,"projectionMatrix",y.projectionMatrix),de.setValue(L,"viewMatrix",y.matrixWorldInverse);const Ie=de.map.cameraPosition;Ie!==void 0&&Ie.setValue(L,st.setFromMatrixPosition(y.matrixWorld)),jt.logarithmicDepthBuffer&&de.setValue(L,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&de.setValue(L,"isOrthographic",y.isOrthographicCamera===!0),v!==y&&(v=y,Yn=!0,Ns=!0)}if(N.isSkinnedMesh){de.setOptional(L,N,"bindMatrix"),de.setOptional(L,N,"bindMatrixInverse");const Ie=N.skeleton;Ie&&(Ie.boneTexture===null&&Ie.computeBoneTexture(),de.setValue(L,"boneTexture",Ie.boneTexture,wt))}N.isBatchedMesh&&(de.setOptional(L,N,"batchingTexture"),de.setValue(L,"batchingTexture",N._matricesTexture,wt),de.setOptional(L,N,"batchingColorTexture"),N._colorsTexture!==null&&de.setValue(L,"batchingColorTexture",N._colorsTexture,wt));const Fs=O.morphAttributes;if((Fs.position!==void 0||Fs.normal!==void 0||Fs.color!==void 0)&&gt.update(N,O,ln),(Yn||_t.receiveShadow!==N.receiveShadow)&&(_t.receiveShadow=N.receiveShadow,de.setValue(L,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(yn.envMap.value=mt,yn.flipEnvMap.value=mt.isCubeTexture&&mt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&D.environment!==null&&(yn.envMapIntensity.value=D.environmentIntensity),Yn&&(de.setValue(L,"toneMappingExposure",E.toneMappingExposure),_t.needsLights&&Rd(yn,Ns),tt&&z.fog===!0&&Z.refreshFogUniforms(yn,tt),Z.refreshMaterialUniforms(yn,z,Y,G,p.state.transmissionRenderTarget[y.id]),ss.upload(L,vo(_t),yn,wt)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ss.upload(L,vo(_t),yn,wt),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&de.setValue(L,"center",N.center),de.setValue(L,"modelViewMatrix",N.modelViewMatrix),de.setValue(L,"normalMatrix",N.normalMatrix),de.setValue(L,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ie=z.uniformsGroups;for(let Os=0,Pd=Ie.length;Os<Pd;Os++){const So=Ie[Os];Ft.update(So,ln),Ft.bind(So,ln)}}return ln}function Rd(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function Ld(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(y,D,O){It.get(y.texture).__webglTexture=D,It.get(y.depthTexture).__webglTexture=O;const z=It.get(y);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=O===void 0,z.__autoAllocateDepthBuffer||Nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,D){const O=It.get(y);O.__webglFramebuffer=D,O.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(y,D=0,O=0){A=y,U=D,w=O;let z=!0,N=null,tt=!1,lt=!1;if(y){const mt=It.get(y);mt.__useDefaultFramebuffer!==void 0?(St.bindFramebuffer(L.FRAMEBUFFER,null),z=!1):mt.__webglFramebuffer===void 0?wt.setupRenderTarget(y):mt.__hasExternalTextures&&wt.rebindTextures(y,It.get(y.texture).__webglTexture,It.get(y.depthTexture).__webglTexture);const Mt=y.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(lt=!0);const yt=It.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(yt[D])?N=yt[D][O]:N=yt[D],tt=!0):y.samples>0&&wt.useMultisampledRTT(y)===!1?N=It.get(y).__webglMultisampledFramebuffer:Array.isArray(yt)?N=yt[O]:N=yt,x.copy(y.viewport),C.copy(y.scissor),B=y.scissorTest}else x.copy(ct).multiplyScalar(Y).floor(),C.copy(ut).multiplyScalar(Y).floor(),B=Dt;if(St.bindFramebuffer(L.FRAMEBUFFER,N)&&z&&St.drawBuffers(y,N),St.viewport(x),St.scissor(C),St.setScissorTest(B),tt){const mt=It.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+D,mt.__webglTexture,O)}else if(lt){const mt=It.get(y.texture),Mt=D||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,mt.__webglTexture,O||0,Mt)}I=-1},this.readRenderTargetPixels=function(y,D,O,z,N,tt,lt){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=It.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&lt!==void 0&&(ft=ft[lt]),ft){St.bindFramebuffer(L.FRAMEBUFFER,ft);try{const mt=y.texture,Mt=mt.format,yt=mt.type;if(!jt.textureFormatReadable(Mt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!jt.textureTypeReadable(yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-z&&O>=0&&O<=y.height-N&&L.readPixels(D,O,z,N,at.convert(Mt),at.convert(yt),tt)}finally{const mt=A!==null?It.get(A).__webglFramebuffer:null;St.bindFramebuffer(L.FRAMEBUFFER,mt)}}},this.readRenderTargetPixelsAsync=async function(y,D,O,z,N,tt,lt){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=It.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&lt!==void 0&&(ft=ft[lt]),ft){St.bindFramebuffer(L.FRAMEBUFFER,ft);try{const mt=y.texture,Mt=mt.format,yt=mt.type;if(!jt.textureFormatReadable(Mt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!jt.textureTypeReadable(yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=y.width-z&&O>=0&&O<=y.height-N){const xt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,xt),L.bufferData(L.PIXEL_PACK_BUFFER,tt.byteLength,L.STREAM_READ),L.readPixels(D,O,z,N,at.convert(Mt),at.convert(yt),0),L.flush();const Vt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);await Bu(L,Vt,4);try{L.bindBuffer(L.PIXEL_PACK_BUFFER,xt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,tt)}finally{L.deleteBuffer(xt),L.deleteSync(Vt)}return tt}}finally{const mt=A!==null?It.get(A).__webglFramebuffer:null;St.bindFramebuffer(L.FRAMEBUFFER,mt)}}},this.copyFramebufferToTexture=function(y,D=null,O=0){y.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,y=arguments[1]);const z=Math.pow(2,-O),N=Math.floor(y.image.width*z),tt=Math.floor(y.image.height*z),lt=D!==null?D.x:0,ft=D!==null?D.y:0;wt.setTexture2D(y,0),L.copyTexSubImage2D(L.TEXTURE_2D,O,0,0,lt,ft,N,tt),St.unbindTexture()},this.copyTextureToTexture=function(y,D,O=null,z=null,N=0){y.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,y=arguments[1],D=arguments[2],N=arguments[3]||0,O=null);let tt,lt,ft,mt,Mt,yt;O!==null?(tt=O.max.x-O.min.x,lt=O.max.y-O.min.y,ft=O.min.x,mt=O.min.y):(tt=y.image.width,lt=y.image.height,ft=0,mt=0),z!==null?(Mt=z.x,yt=z.y):(Mt=0,yt=0);const xt=at.convert(D.format),Vt=at.convert(D.type);wt.setTexture2D(D,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const Zt=L.getParameter(L.UNPACK_ROW_LENGTH),Jt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),we=L.getParameter(L.UNPACK_SKIP_PIXELS),Wt=L.getParameter(L.UNPACK_SKIP_ROWS),_t=L.getParameter(L.UNPACK_SKIP_IMAGES),ge=y.isCompressedTexture?y.mipmaps[N]:y.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,ge.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ge.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ft),L.pixelStorei(L.UNPACK_SKIP_ROWS,mt),y.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,N,Mt,yt,tt,lt,xt,Vt,ge.data):y.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,N,Mt,yt,ge.width,ge.height,xt,ge.data):L.texSubImage2D(L.TEXTURE_2D,N,Mt,yt,xt,Vt,ge),L.pixelStorei(L.UNPACK_ROW_LENGTH,Zt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Jt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,we),L.pixelStorei(L.UNPACK_SKIP_ROWS,Wt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,_t),N===0&&D.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),St.unbindTexture()},this.copyTextureToTexture3D=function(y,D,O=null,z=null,N=0){y.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,z=arguments[1]||null,y=arguments[2],D=arguments[3],N=arguments[4]||0);let tt,lt,ft,mt,Mt,yt,xt,Vt,Zt;const Jt=y.isCompressedTexture?y.mipmaps[N]:y.image;O!==null?(tt=O.max.x-O.min.x,lt=O.max.y-O.min.y,ft=O.max.z-O.min.z,mt=O.min.x,Mt=O.min.y,yt=O.min.z):(tt=Jt.width,lt=Jt.height,ft=Jt.depth,mt=0,Mt=0,yt=0),z!==null?(xt=z.x,Vt=z.y,Zt=z.z):(xt=0,Vt=0,Zt=0);const we=at.convert(D.format),Wt=at.convert(D.type);let _t;if(D.isData3DTexture)wt.setTexture3D(D,0),_t=L.TEXTURE_3D;else if(D.isDataArrayTexture||D.isCompressedArrayTexture)wt.setTexture2DArray(D,0),_t=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const ge=L.getParameter(L.UNPACK_ROW_LENGTH),qt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ln=L.getParameter(L.UNPACK_SKIP_PIXELS),Pr=L.getParameter(L.UNPACK_SKIP_ROWS),Yn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Jt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Jt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,mt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Mt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,yt),y.isDataTexture||y.isData3DTexture?L.texSubImage3D(_t,N,xt,Vt,Zt,tt,lt,ft,we,Wt,Jt.data):D.isCompressedArrayTexture?L.compressedTexSubImage3D(_t,N,xt,Vt,Zt,tt,lt,ft,we,Jt.data):L.texSubImage3D(_t,N,xt,Vt,Zt,tt,lt,ft,we,Wt,Jt),L.pixelStorei(L.UNPACK_ROW_LENGTH,ge),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,qt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ln),L.pixelStorei(L.UNPACK_SKIP_ROWS,Pr),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Yn),N===0&&D.generateMipmaps&&L.generateMipmap(_t),St.unbindTexture()},this.initRenderTarget=function(y){It.get(y).__webglFramebuffer===void 0&&wt.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?wt.setTextureCube(y,0):y.isData3DTexture?wt.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?wt.setTexture2DArray(y,0):wt.setTexture2D(y,0),St.unbindTexture()},this.resetState=function(){U=0,w=0,A=null,St.reset(),Lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ja?"display-p3":"srgb",e.unpackColorSpace=Xt.workingColorSpace===As?"display-p3":"srgb"}}class qg extends ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ye,this.environmentIntensity=1,this.environmentRotation=new Ye,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ki extends an{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new pt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const vs=new P,xs=new P,kl=new Kt,hr=new Za,ts=new Er,_a=new P,Gl=new P;class Gc extends ae{constructor(t=new Se,e=new ki){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)vs.fromBufferAttribute(e,r-1),xs.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=vs.distanceTo(xs);t.setAttribute("lineDistance",new Qt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ts.copy(n.boundingSphere),ts.applyMatrix4(r),ts.radius+=s,t.ray.intersectsSphere(ts)===!1)return;kl.copy(r).invert(),hr.copy(t.ray).applyMatrix4(kl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,h=n.attributes.position;if(d!==null){const m=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=m,p=g-1;_<p;_+=c){const f=d.getX(_),M=d.getX(_+1),E=es(this,t,hr,l,f,M);E&&e.push(E)}if(this.isLineLoop){const _=d.getX(g-1),p=d.getX(m),f=es(this,t,hr,l,_,p);f&&e.push(f)}}else{const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=m,p=g-1;_<p;_+=c){const f=es(this,t,hr,l,_,_+1);f&&e.push(f)}if(this.isLineLoop){const _=es(this,t,hr,l,g-1,m);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function es(i,t,e,n,r,s){const a=i.geometry.attributes.position;if(vs.fromBufferAttribute(a,r),xs.fromBufferAttribute(a,s),e.distanceSqToSegment(vs,xs,_a,Gl)>n)return;_a.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(_a);if(!(l<t.near||l>t.far))return{distance:l,point:Gl.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,object:i}}const Vl=new P,Wl=new P;class Da extends Gc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)Vl.fromBufferAttribute(e,r),Wl.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Vl.distanceTo(Wl);t.setAttribute("lineDistance",new Qt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class gr extends an{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Xl=new Kt,Ua=new Za,ns=new Er,is=new P;class as extends ae{constructor(t=new Se,e=new gr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ns.copy(n.boundingSphere),ns.applyMatrix4(r),ns.radius+=s,t.ray.intersectsSphere(ns)===!1)return;Xl.copy(r).invert(),Ua.copy(t.ray).applyMatrix4(Xl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=h,_=m;g<_;g++){const p=c.getX(g);is.fromBufferAttribute(u,p),$l(is,p,l,r,t,e,this)}}else{const h=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let g=h,_=m;g<_;g++)is.fromBufferAttribute(u,g),$l(is,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function $l(i,t,e,n,r,s,a){const o=Ua.distanceSqToPoint(i);if(o<e){const l=new P;Ua.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,object:a})}}class Yg extends an{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ka,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ye,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Kg extends an{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new pt(16777215),this.specular=new pt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ka,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ye,this.combine=Ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Ss={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class jg{constructor(t,e,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(d){o++,s===!1&&r.onStart!==void 0&&r.onStart(d,a,o),s=!0},this.itemEnd=function(d){a++,r.onProgress!==void 0&&r.onProgress(d,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){const m=c[u],g=c[u+1];if(m.global&&(m.lastIndex=0),m.test(d))return g}return null}}}const Zg=new jg;class tr{constructor(t){this.manager=t!==void 0?t:Zg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(r,s){n.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}tr.DEFAULT_MATERIAL_NAME="__DEFAULT";const pn={};class Jg extends Error{constructor(t,e){super(t),this.response=e}}class Vc extends tr{constructor(t){super(t)}load(t,e,n,r){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=Ss.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(pn[t]!==void 0){pn[t].push({onLoad:e,onProgress:n,onError:r});return}pn[t]=[],pn[t].push({onLoad:e,onProgress:n,onError:r});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const d=pn[t],u=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),m=h?parseInt(h):0,g=m!==0;let _=0;const p=new ReadableStream({start(f){M();function M(){u.read().then(({done:E,value:T})=>{if(E)f.close();else{_+=T.byteLength;const U=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:m});for(let w=0,A=d.length;w<A;w++){const I=d[w];I.onProgress&&I.onProgress(U)}f.enqueue(T),M()}},E=>{f.error(E)})}}});return new Response(p)}else throw new Jg(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),h=u&&u[1]?u[1].toLowerCase():void 0,m=new TextDecoder(h);return c.arrayBuffer().then(g=>m.decode(g))}}}).then(c=>{Ss.add(t,c);const d=pn[t];delete pn[t];for(let u=0,h=d.length;u<h;u++){const m=d[u];m.onLoad&&m.onLoad(c)}}).catch(c=>{const d=pn[t];if(d===void 0)throw this.manager.itemError(t),c;delete pn[t];for(let u=0,h=d.length;u<h;u++){const m=d[u];m.onError&&m.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class Qg extends tr{constructor(t){super(t)}load(t,e,n,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=Ss.get(t);if(a!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0),a;const o=vr("img");function l(){d(),Ss.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(u){d(),r&&r(u),s.manager.itemError(t),s.manager.itemEnd(t)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(t),o.src=t,o}}class t_ extends tr{constructor(t){super(t)}load(t,e,n,r){const s=new xe,a=new Qg(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){s.image=o,s.needsUpdate=!0,e!==void 0&&e(s)},n,r),s}}class Wc extends ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new pt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const va=new Kt,ql=new P,Yl=new P;class e_{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ot(512,512),this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qa,this._frameExtents=new Ot(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ql.setFromMatrixPosition(t.matrixWorld),e.position.copy(ql),Yl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Yl),e.updateMatrixWorld(),va.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(va),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(va)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class n_ extends e_{constructor(){super(new to(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class i_ extends Wc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ae.DEFAULT_UP),this.updateMatrix(),this.target=new ae,this.shadow=new n_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class r_ extends Wc{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class s_ extends Da{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new Se;r.setAttribute("position",new Qt(e,3)),r.setAttribute("color",new Qt(n,3));const s=new ki({vertexColors:!0,toneMapped:!1});super(r,s),this.type="AxesHelper"}setColors(t,e,n){const r=new pt,s=this.geometry.attributes.color.array;return r.set(t),r.toArray(s,0),r.toArray(s,3),r.set(e),r.toArray(s,6),r.toArray(s,9),r.set(n),r.toArray(s,12),r.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qa);class Xc extends ae{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Ot(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof Element&&e.element.parentNode!==null&&e.element.parentNode.removeChild(e.element)})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const Oi=new P,Kl=new Kt,jl=new Kt,Zl=new P,Jl=new P;class a_{constructor(t={}){const e=this;let n,r,s,a;const o={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:r}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),Kl.copy(_.matrixWorldInverse),jl.multiplyMatrices(_.projectionMatrix,Kl),d(g,g,_),m(g)},this.setSize=function(g,_){n=g,r=_,s=n/2,a=r/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,p=g.children.length;_<p;_++)c(g.children[_])}function d(g,_,p){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Oi.setFromMatrixPosition(g.matrixWorld),Oi.applyMatrix4(jl);const f=Oi.z>=-1&&Oi.z<=1&&g.layers.test(p.layers)===!0,M=g.element;M.style.display=f===!0?"":"none",f===!0&&(g.onBeforeRender(e,_,p),M.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Oi.x*s+s)+"px,"+(-Oi.y*a+a)+"px)",M.parentNode!==l&&l.appendChild(M),g.onAfterRender(e,_,p));const E={distanceToCameraSquared:u(p,g)};o.objects.set(g,E)}for(let f=0,M=g.children.length;f<M;f++)d(g.children[f],_,p)}function u(g,_){return Zl.setFromMatrixPosition(g.matrixWorld),Jl.setFromMatrixPosition(_.matrixWorld),Zl.distanceToSquared(Jl)}function h(g){const _=[];return g.traverseVisible(function(p){p.isCSS2DObject&&_.push(p)}),_}function m(g){const _=h(g).sort(function(f,M){if(f.renderOrder!==M.renderOrder)return M.renderOrder-f.renderOrder;const E=o.objects.get(f).distanceToCameraSquared,T=o.objects.get(M).distanceToCameraSquared;return E-T}),p=_.length;for(let f=0,M=_.length;f<M;f++)_[f].element.style.zIndex=p-f}}}function o_(i,t){const e=document.getElementById("cinematic-control-row"),n=document.getElementById("birdseye-control-row"),r=document.getElementById("reorient-control-row");let s=null,a=null,o=!1,l=!1,c=0,d=0;const u={};let h=!1,m=new P,g=null,_=null,p=!1,f=i,M=null,E=i,T=new P,U=new P,w=1e3,A={x:Math.PI/6,y:Math.PI/4};const I={distance:1e3,angleX:Math.PI/6,angleY:Math.PI/4,panOffset:new P(0,0,0),moveSpeed:10,lookSpeed:.01,getCurrentCamera:function(){return E},updateCameraPosition:function(){if(p&&M){const v=Math.max(this.distance*2,2e3);M.position.set(this.panOffset.x,this.panOffset.y+v,this.panOffset.z),M.lookAt(this.panOffset);const x=window.innerWidth/window.innerHeight,C=this.distance*.8;M.left=-C*x,M.right=C*x,M.top=C,M.bottom=-C,M.near=.1,M.far=v*4,M.updateProjectionMatrix()}else{const v=Math.cos(this.angleY)*Math.cos(this.angleX)*this.distance,x=Math.sin(this.angleX)*this.distance,C=Math.sin(this.angleY)*Math.cos(this.angleX)*this.distance;E.position.set(v+this.panOffset.x,x+this.panOffset.y,C+this.panOffset.z),E.lookAt(this.panOffset)}},update:function(){h&&!p&&this.updateCinematic();const v=this.distance*.02,x=new P;E.getWorldDirection(x);let C;p?(C=new P(1,0,0),new P(0,0,-1)):(C=new P().crossVectors(E.up,x).normalize(),new P().crossVectors(x,C).normalize());let B=!1;if(h&&!p){const F=this.distance*.025;u.ArrowUp&&(this.distance=Math.max(30,this.distance-F),g=this.distance,B=!0),u.ArrowDown&&(this.distance+=F,g=this.distance,B=!0),u.ArrowLeft&&(this.angleY-=this.lookSpeed*1.5,B=!0),u.ArrowRight&&(this.angleY+=this.lookSpeed*1.5,B=!0)}if(u.KeyW&&(p?this.panOffset.add(new P(0,0,-v)):this.panOffset.add(x.clone().multiplyScalar(v)),B=!0),u.KeyS&&(p?this.panOffset.add(new P(0,0,v)):this.panOffset.add(x.clone().multiplyScalar(-v)),B=!0),u.KeyD&&(p?this.panOffset.add(new P(v,0,0)):this.panOffset.add(C.clone().multiplyScalar(-v)),B=!0),u.KeyA&&(p?this.panOffset.add(new P(-v,0,0)):this.panOffset.add(C.clone().multiplyScalar(v)),B=!0),p){const F=this.distance*.03;u.KeyQ&&(this.distance-=F,this.distance=Math.max(50,this.distance),B=!0),u.KeyE&&(this.distance+=F,B=!0)}else h||(u.KeyE&&(this.panOffset.add(new P(0,v,0)),B=!0),u.KeyQ&&(this.panOffset.add(new P(0,-v,0)),B=!0));!p&&!h&&(u.ArrowLeft&&(this.angleY-=this.lookSpeed,B=!0),u.ArrowRight&&(this.angleY+=this.lookSpeed,B=!0),u.ArrowUp&&(this.angleX+=this.lookSpeed,this.angleX=Math.min(Math.PI/2-.01,this.angleX),B=!0),u.ArrowDown&&(this.angleX-=this.lookSpeed,this.angleX=Math.max(-Math.PI/2+.01,this.angleX),B=!0)),B&&this.updateCameraPosition()},updateCinematic:function(){this.panOffset.lerp(m,.05);const v=g||1e3;this.distance+=(v-this.distance)*.05,this.updateCameraPosition()},toggleCinematicMode:function(){p&&this.toggleBirdseyeMode(),h=!h,h||(_=null,window.dispatchEvent(new CustomEvent("cinematicTargetChanged",{detail:{talkerId:null}}))),console.log(`Cinematic mode ${h?"enabled":"disabled"}`),e&&e.classList.toggle("active-mode",h),h&&(g=this.distance)},toggleBirdseyeMode:function(){if(p=!p,console.log(`Birdseye mode ${p?"enabled":"disabled"}`),n&&n.classList.toggle("active-mode",p),p){if(h&&(h=!1,_=null,e&&e.classList.remove("active-mode"),window.dispatchEvent(new CustomEvent("cinematicTargetChanged",{detail:{talkerId:null}}))),T.copy(f.position),U.copy(this.panOffset),w=this.distance,A.x=this.angleX,A.y=this.angleY,!M){const v=this.distance*.5;M=new to(-v,v,v,-v,.1,1e7)}this.angleX=Math.PI/2,this.angleY=0,E=M,this.updateCameraPosition()}else E=f,this.distance=w,this.angleX=A.x,this.angleY=A.y,this.panOffset.y=U.y,this.updateCameraPosition()},isBirdseyeActive:function(){return p},setCinematicTarget:function(v){v instanceof P&&m.copy(v)},isCinematicActive:function(){return h},getTargetTalkerId:function(){return _},setTargetTalkerId:function(v){_=v,console.log(`Tracking ${v===null?"all tracks (latest point)":"talker: "+v}`),window.dispatchEvent(new CustomEvent("cinematicTargetChanged",{detail:{talkerId:_}}))},adjustForNewData:function(v,x){s=v,a=x;const C=Math.max(v*1.5,200);(Math.abs(this.distance-C)>this.distance*.5||this.distance===6e3)&&(this.distance=C),this.panOffset.lerp(x,.3),this.updateCameraPosition()},reset:function(v,x){h=!1,p=!1,_=null,E=f,window.dispatchEvent(new CustomEvent("cinematicTargetChanged",{detail:{talkerId:null}})),e&&e.classList.remove("active-mode"),n&&n.classList.remove("active-mode"),s=v,a=x,this.distance=Math.max(v*1.5,200),this.panOffset.copy(x),this.angleX=Math.PI/6,this.angleY=Math.PI/4,this.updateCameraPosition()}};return document.addEventListener("keydown",v=>{if(h&&v.code.startsWith("Digit")){const x=v.code.replace("Digit","");if(x==="0")I.setTargetTalkerId(null);else{const C={1:"AA",2:"BB",3:"CC",4:"DD",5:"WW",6:"XX",7:"YY",8:"ZZ",9:"JJ"};I.setTargetTalkerId(C[x]||null)}return}if(v.code==="KeyB"){I.toggleBirdseyeMode();return}if(v.code==="KeyC"){I.toggleCinematicMode();return}if(v.code==="KeyR"){r&&(r.classList.add("active-mode"),setTimeout(()=>r.classList.remove("active-mode"),150)),s!==null&&a!==null&&I.reset(s,a);return}u[v.code]=!0}),document.addEventListener("keyup",v=>{u[v.code]=!1}),window.addEventListener("blur",()=>{for(const v in u)u[v]=!1}),document.addEventListener("mousedown",v=>{v.target.closest("#info")||v.target.closest(".talker-header")||(o=!0,l=v.shiftKey||v.button===1,c=v.clientX,d=v.clientY,v.button===1&&v.preventDefault())}),document.addEventListener("mouseup",()=>{o=!1,l=!1}),document.addEventListener("mousemove",v=>{if(!o)return;const x=v.clientX-c,C=v.clientY-d;if(l){const B=I.distance*.001;if(p)I.panOffset.x-=x*B,I.panOffset.z+=C*B;else{const F=new P;E.getWorldDirection(F);const X=new P().crossVectors(F,E.up).normalize(),$=new P().crossVectors(X,F).normalize();I.panOffset.add(X.multiplyScalar(-x*B)),I.panOffset.add($.multiplyScalar(C*B))}}else p||(I.angleY+=x*.005,I.angleX+=C*.005,I.angleX=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,I.angleX)));c=v.clientX,d=v.clientY,I.updateCameraPosition()}),document.addEventListener("wheel",v=>{v.target.closest("#info")||(I.distance+=v.deltaY*.5,I.distance=Math.max(50,I.distance),h&&(g=I.distance),I.updateCameraPosition())}),document.addEventListener("contextmenu",v=>v.preventDefault()),window.addEventListener("activateCinematicForTalker",v=>{const{talkerId:x}=v.detail;h&&_===x?I.toggleCinematicMode():(h||I.toggleCinematicMode(),I.setTargetTalkerId(x))}),I}function l_(i,t={}){const{size:e=4e5,gridSize:n=100,lineWidth:r=.5,color:s=7829367,renderOrder:a=0,opacity:o=.65}=t,l=new Ke({uniforms:{uGridColor:{value:new pt(s)},uGridSize:{value:n},uLineWidth:{value:r},uOpacity:{value:o}},depthWrite:o>=.99,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-10,polygonOffsetUnits:-10,transparent:!0,alphaTest:.01,blending:o<1?Bn:Sn,side:ze,vertexShader:`
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
    `}),c=new ve(new xi(e,e),l);return c.rotation.x=-Math.PI/2,c.position.y=-.1,c.renderOrder=a-1,i.add(c),c}const c_=`
<svg width="2" height="10" viewBox="0 0 2 10" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="2" height="10" fill="none" stroke="black" stroke-width="2"/>
  <line x1="1" y1="0" x2="1" y2="10" stroke="currentColor" stroke-width="1"/>
</svg>`,d_=`
<svg width="2" height="15" viewBox="0 0 2 15" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="2" height="15" fill="none" stroke="black" stroke-width="2"/>
  <line x1="1" y1="0" x2="1" y2="15" stroke="currentColor" stroke-width="1.5"/>
</svg>`,u_=`
<svg width="2" height="20" viewBox="0 0 2 20" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="2" height="20" fill="none" stroke="black" stroke-width="2"/>
  <line x1="1" y1="0" x2="1" y2="20" stroke="currentColor" stroke-width="2"/>
</svg>`;let Ce={},Gi=[];const fr=(i,t,{text:e,svg:n})=>{const r=document.createElement("div");r.className=`compass-label ${t}`;let s="";n&&(s+=n),e&&(s+=`<span class="compass-text">${e}</span>`),r.innerHTML=s;const a=new Xc(r);return i.add(a),a};function h_(i){Object.values(Ce).forEach(e=>e.parent?.remove(e)),Gi.forEach(e=>e.label.parent?.remove(e.label)),Ce={},Gi=[],Ce.n=fr(i,"compass-cardinal",{text:"N"}),Ce.s=fr(i,"compass-cardinal",{text:"S"}),Ce.e=fr(i,"compass-cardinal",{text:"E"}),Ce.w=fr(i,"compass-cardinal",{text:"W"});const t=1e5;for(let e=0;e<360;e+=5){if(e%90===0)continue;let n,r;e%45===0?(r="compass-tick-large",n={svg:u_}):e%15===0?(r="compass-tick-medium",n={svg:d_}):(r="compass-tick-small",n={svg:c_});const s=fr(i,r,n),a=(e-90)*(Math.PI/180),o=new P(t*Math.cos(a),0,t*Math.sin(a));Gi.push({label:s,relativePos:o})}}function f_(){Object.values(Ce).forEach(i=>{i.parent&&i.parent.remove(i),i.element?.parentNode&&i.element.parentNode.removeChild(i.element)}),Gi.forEach(i=>{i.label.parent&&i.label.parent.remove(i.label),i.label.element?.parentNode&&i.label.element.parentNode.removeChild(i.label.element)}),Ce={},Gi=[]}function p_(i){if(Object.keys(Ce).length===0)return;const t=1e5,e=new P(i.position.x,0,i.position.z);Ce.n.position.copy(e).add(new P(0,0,-t)),Ce.s.position.copy(e).add(new P(0,0,t)),Ce.e.position.copy(e).add(new P(t,0,0)),Ce.w.position.copy(e).add(new P(-t,0,0)),Gi.forEach(n=>{n.label.position.copy(e).add(n.relativePos)})}function $c(i){const t=[],e=i.replace(/[^\x20-\x7E\r\n$]/g,"").replace(/\r\n|\r/g,`
`).replace(/\n{2,}/g,`
`).trim();if(e.split(`
`).length===0)return t;const r=/\$[A-Z0-9]{2}GGA,[^\r\n]*?\*[0-9A-Fa-f]{2}/g,s=e.match(r);if(!s)return t;let a={};const o=250,l=.5;for(const c of s){if(c.length>82&&c.length<86)continue;const d=c.split(",");if(!(d.length<15))try{const u=c.substring(1,3),h=d[1],m=d[2],g=d[3],_=d[4],p=d[5],f=parseInt(d[6]),M=parseInt(d[7]),E=d[8],T=d[9],U=d[10],w=d[11];if(!m||!_||!g||!p||!T||m.length<4||_.length<5||U!=="M"||isNaN(f)||f===0||isNaN(M)||M<3)continue;const A=parseFloat(E);if(isNaN(A)||A>5)continue;const I=parseFloat(m.substring(0,2)),v=parseFloat(m.substring(2));if(isNaN(I)||isNaN(v))continue;let x=I+v/60;g==="S"&&(x=-x);const C=parseFloat(_.substring(0,3)),B=parseFloat(_.substring(3));if(isNaN(C)||isNaN(B))continue;let F=C+B/60;if(p==="W"&&(F=-F),Math.abs(x)>360||Math.abs(F)>360)continue;const X=parseFloat(T),$=parseFloat(w)||0,G=parseInt(h.slice(0,2))||0,Y=parseInt(h.slice(2,4))||0,k=parseFloat(h.slice(4))||0,dt=G*3600+Y*60+k,ct={lat:x,lon:F,alt:X,time:dt,satellites:M,undulation:$,talkerId:u},ut=a[u];if(ut){const Dt=Math.abs(ct.lat-ut.lat),Gt=Math.abs(ct.lon-ut.lon);if(Dt>l||Gt>l)continue;const V=ct.time-ut.time;if(V>0&&os(ut.lat,ut.lon,ct.lat,ct.lon)/V>o)continue}t.push(ct),a[u]=ct}catch{continue}}return t}function os(i,t,e,n){const s=c=>c*(Math.PI/180),a=s(e-i),o=s(n-t),l=Math.sin(a/2)**2+Math.cos(s(i))*Math.cos(s(e))*Math.sin(o/2)**2;return 2*6371e3*Math.atan2(Math.sqrt(l),Math.sqrt(1-l))}function m_(i){return i.reduce((t,e)=>{const{talkerId:n}=e;return t[n]||(t[n]=[]),t[n].push(e),t},{})}function g_(i){if(!i||i.length===0)return null;const t=i[i.length-1],e=i[0],n=i.length,r=t.time-e.time,s=r>0?n/r:0,a=os(e.lat,e.lon,t.lat,t.lon),o=t.alt-e.alt,l=Math.sqrt(Math.pow(a,2)+Math.pow(o,2)),c=t.alt,d=t.alt+(t.undulation||0),u=t.lat,h=t.lon,m=t.satellites||0;let g=0;if(i.length>=2){const f=i[i.length-2],M=t,E=os(f.lat,f.lon,M.lat,M.lon),T=M.time-f.time;T>0&&(g=E/T)}let _=0,p=0;for(let f=1;f<i.length;f++){const M=i[f-1],E=i[f],T=os(M.lat,M.lon,E.lat,E.lon);_+=T;const U=E.alt-M.alt,w=Math.sqrt(Math.pow(T,2)+Math.pow(U,2));p+=w}return{totalPoints:n,totalDuration:r,currentAltitude:c,currentAltWsg84:d,currentLat:u,currentLon:h,currentSatellites:m,latestSpeed:g,total2DDistance:_,total3DDistance:p,rthDistance3D:l,updateRate:s,startTime:e.time,endTime:t.time}}function __(i){const t=i.trim().split(`
`)[0]?.trim();if(!t)return"unknown";if(t.startsWith("{"))try{const e=JSON.parse(t);if(e.data?.aircraft!==void 0||e.receivedAt)return"adsb"}catch{}return/^\$[A-Z0-9]{2}[A-Z]{3},/.test(t)?"nmea":"unknown"}function qc(i){const t=[],e=i.split(`
`).filter(n=>n.trim());for(const n of e){let r;try{r=JSON.parse(n)}catch{continue}const s=r.data?.aircraft;if(!(!Array.isArray(s)||s.length===0))for(const a of s){if(!a.icaoAddress||a.latDD==null||a.lonDD==null||a.altitudeMM==null||!a.timeStamp||Math.abs(a.latDD)>90||Math.abs(a.lonDD)>180)continue;const o=a.altitudeMM/1e3,l=a.detail?.baroaltDiffMM!=null?a.detail.baroaltDiffMM/1e3:null;let c=null,d=null;a.altitudeType===0?(c=o,l!==null&&(d=c+l)):a.altitudeType===1&&(d=o,l!==null&&(c=d-l));const u=new Date(a.timeStamp),h=u.getUTCHours()*3600+u.getUTCMinutes()*60+u.getUTCSeconds()+u.getUTCMilliseconds()/1e3;t.push({lat:a.latDD,lon:a.lonDD,alt:d!==null?d:c,baroAlt:c,geoAlt:d,time:h,satellites:0,undulation:0,talkerId:a.icaoAddress,dataType:"adsb",icaoAddress:a.icaoAddress,heading:(a.headingDE2||0)/100,horVelocity:(a.horVelocityCMS||0)/100,verVelocity:(a.verVelocityCMS||0)/100,altitudeType:a.altitudeType??null,emitterType:a.emitterType??null,timeStamp:a.timeStamp})}}return t}function v_(i){return i.reduce((t,e)=>((t[e.icaoAddress]??=[]).push(e),t),{})}function x_(i){if(!i?.length)return null;const t=i[0],e=i[i.length-1];let n=0;for(let r=1;r<i.length;r++)n+=M_(i[r-1].lat,i[r-1].lon,i[r].lat,i[r].lon);return{icaoAddress:e.icaoAddress,totalPoints:i.length,currentLat:e.lat,currentLon:e.lon,currentAltM:e.alt,currentBaroAltM:e.baroAlt,currentGeoAltM:e.geoAlt,heading:e.heading,horVelocityMs:e.horVelocity,verVelocityMs:e.verVelocity,emitterType:e.emitterType,altitudeType:e.altitudeType,startTime:t.time,endTime:e.time,duration:e.time-t.time,lastSeen:e.timeStamp,totalGroundDist:n}}function S_(i){return{0:"Unknown",1:"Light",2:"Small",3:"Large",4:"High Vortex",5:"Heavy",6:"Maneuverable",7:"Rotorcraft",9:"Glider",10:"Balloon",11:"Parachutist",12:"Ultralight",14:"UAV",15:"Space"}[i]??`Type ${i}`}function M_(i,t,e,n){const s=c=>c*(Math.PI/180),a=s(e-i),o=s(n-t),l=Math.sin(a/2)**2+Math.cos(s(i))*Math.cos(s(e))*Math.sin(o/2)**2;return 2*6371e3*Math.atan2(Math.sqrt(l),Math.sqrt(1-l))}function y_(i){if(!i)return!1;const t=(i.split(`
`)[0]||"").replace(/\r/,"");return["ID","DateTime","Lat","Lon","Alt"].every(n=>t.split(",").map(r=>r.trim()).includes(n))}function E_(i){if(!i)return 0;try{const e=(i.trim().split(" ")[1]||"").split(":"),n=parseInt(e[0])||0,r=parseInt(e[1])||0,s=parseFloat(e[2])||0,a=e[3]?parseInt(e[3])/1e3:0;return n*3600+r*60+s+a}catch{}return 0}function Yc(i){if(!i||!i.trim())return[];const t=i.split(`
`).map(g=>g.trim()).filter(Boolean);if(t.length<2)return[];const e=t[0].split(",").map(g=>g.trim()),n=g=>e.indexOf(g),r=n("ID"),s=n("DateTime"),a=n("RCS"),o=n("Lat"),l=n("Lon"),c=n("Alt"),d=n("ExtID"),u=n("VelAbs");if(r<0||o<0||l<0)return console.warn("radarParser: missing required columns (ID, Lat, Lon)"),[];const h=[],m={};for(let g=1;g<t.length;g++){const _=t[g].split(",");try{const p=_[r]?.trim(),f=s>=0&&_[s]?.trim()||"",M=parseFloat(_[o]),E=parseFloat(_[l]),T=c>=0?parseFloat(_[c]):0,U=a>=0?parseFloat(_[a]):NaN,w=u>=0?parseFloat(_[u]):NaN,A=d>=0&&_[d]?.trim()||"";if(!p||isNaN(M)||isNaN(E)||Math.abs(M)>90||Math.abs(E)>180)continue;h.push({dataType:"radar",id:p,talkerId:`radar_${p}`,lat:M,lon:E,alt:isNaN(T)?0:T,time:E_(f),rcs:isNaN(U)?null:U,velAbs:isNaN(w)?null:w,extId:A,dateTime:f}),m[p]=(m[p]||0)+1}catch{continue}}return h.filter(g=>m[g.id]>20)}function T_(i){return i.reduce((t,e)=>(t[e.id]||(t[e.id]=[]),t[e.id].push(e),t),{})}function w_(i){if(!i||i.length===0)return null;const t=[...i].sort((r,s)=>r.time-s.time),e=t[0],n=t[t.length-1];return{totalPoints:t.length,duration:n.time-e.time,currentLat:n.lat,currentLon:n.lon,currentAlt:n.alt,currentVel:n.velAbs,currentRcs:n.rcs,currentExtId:n.extId,startTime:e.time,endTime:n.time}}const no="stats-search-bar",Na="stats-search-wrapper";function Kc(i){if(document.getElementById(Na))return;const t=document.createElement("div");t.id=Na,t.className="stats-search-wrapper",t.style.display="none";const e=document.createElement("input");e.id=no,e.type="text",e.placeholder="Search Airspace",e.autocomplete="off",e.spellcheck=!1,e.className="stats-search-input",e.addEventListener("input",()=>io(e.value.trim().toLowerCase()));const n=a=>a.stopPropagation();e.addEventListener("keydown",n),e.addEventListener("keyup",n),e.addEventListener("keypress",n);const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.classList.add("stats-search-icon"),r.setAttribute("viewBox","0 0 512 512");const s=document.createElementNS("http://www.w3.org/2000/svg","path");s.setAttribute("d","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"),r.appendChild(s),t.appendChild(e),t.appendChild(r),i.insertBefore(t,i.firstChild)}function b_(i){const t=document.getElementById(Na);if(t)if(i>3)t.style.display="block";else{t.style.display="none";const e=document.getElementById(no);e&&e.value!==""&&(e.value="",io(""))}}function io(i){const t=document.querySelectorAll("#stats-groups .stats-group");let e=null;t.forEach(n=>{if(n.classList.remove("last-visible"),!i){n.style.display="",e=n;return}const r=n.querySelector(".talker-header"),s=(r?r.textContent:"").toLowerCase(),a=(r?.dataset.talkerId||"").toLowerCase(),o=s.includes(i)||a.includes(i);n.style.display=o?"":"none",o&&(e=n)}),e&&e.classList.add("last-visible")}function A_(){const i=document.getElementById(no);return i?i.value.trim().toLowerCase():""}const si=new Map,xa=new Set;async function C_(i){const t=i.toUpperCase();try{const e=await fetch(`https://hexdb.io/hex-image?hex=${t}`);if(!e.ok)return null;const n=(await e.text()).trim();if(n&&(n.startsWith("http://")||n.startsWith("https://")))return n}catch{}return null}async function ro(i){const t=i.toUpperCase();if(!(si.has(t)||xa.has(t))){xa.add(t);try{const e=await fetch(`https://hexdb.io/api/v1/aircraft/${t}`);if(!e.ok){si.set(t,{model:"Unknown",manufacturer:"",registration:"",operator:"",type:"",fetched:!0,imageResolved:!1,imageUrl:null});return}const n=await e.json();if(n.error){si.set(t,{model:"Unknown",manufacturer:"",registration:"",operator:"",type:"",fetched:!0,imageResolved:!1,imageUrl:null});return}si.set(t,{model:n.Type||n.ICAOTypeCode||"Unknown",manufacturer:n.Manufacturer||"",registration:n.Registration||"",operator:n.RegisteredOwners||"",type:n.ICAOTypeCode||"",fetched:!0,imageResolved:!1,imageUrl:null}),jc(i),window.dispatchEvent(new CustomEvent("aircraftInfoLoaded",{detail:{talkerId:i,model:n.Type||n.ICAOTypeCode||"Unknown"}}))}catch(e){console.warn(`hexdb.io lookup failed for ${i}:`,e),si.set(t,{model:"Unknown",manufacturer:"",registration:"",operator:"",type:"",fetched:!0,imageResolved:!1,imageUrl:null})}finally{xa.delete(t)}}}function jc(i){const t=i.toUpperCase(),e=si.get(t);if(!e)return;const n=i,r=document.getElementById(`${n}-header-model`);r&&(r.textContent=e.model&&e.model!=="Unknown"?e.model:n);const s=document.getElementById(`${n}-reg-stat`);s&&(s.textContent=e.registration||"--");const a=document.getElementById(`${n}-operator-stat`);a&&(a.textContent=e.operator||"--");const o=document.getElementById(`${n}-aircraft-img`);o&&!e.imageResolved&&e.model!=="Unknown"?(e.imageResolved=!0,C_(t).then(l=>{l&&(e.imageUrl=l,o.src=l)})):o&&e.imageUrl&&(!o.src||o.src!==e.imageUrl)&&(o.src=e.imageUrl)}function Zc(i){if(!i)return"Unknown";const t=i.toUpperCase(),e=si.get(t);return e?e.model||"Unknown":(ro(i),"Loading...")}let Jc=null,Ql=!1;function R_(i){return i?i.dataType==="radar"?"radar":i.dataType==="adsb"?"adsb":i.dataType==="nmea"||typeof i.satellites=="number"&&i.icaoAddress===void 0?"nmea":i.icaoAddress!==void 0||i.heading!==void 0||i.horizontalVelocity!==void 0?"adsb":(i.talkerId&&/^[A-Z]{2}$/.test(i.talkerId),"nmea"):"nmea"}function L_(i){const t=[],e=[],n=[];for(const r of i){const s=R_(r);s==="adsb"?e.push(r):s==="radar"?n.push(r):t.push(r)}return{nmea:t,adsb:e,radar:n}}function P_(i){let t=document.getElementById("stats-groups");return t||(t=document.createElement("div"),t.id="stats-groups",i.appendChild(t)),t}function Qc(){document.querySelectorAll(".talker-header").forEach(i=>{i.classList.toggle("active-track",i.dataset.talkerId===Jc)})}function tc(i){const t=Math.floor(i/3600).toString().padStart(2,"0"),e=Math.floor(i%3600/60).toString().padStart(2,"0"),n=Math.floor(i%60).toString().padStart(2,"0");return`${t}:${e}:${n}`}function so(i,t,e){i.querySelectorAll(`.stats-group[data-data-type="${e}"]`).forEach(n=>{const r=n.dataset.panelId;(!r||!t.includes(r))&&n.remove()})}function Rs(){const i=document.getElementById("trail-tail-color"),t=new pt(i?i.value:"#00ffaa"),e=ad(),n=id();document.querySelectorAll(".talker-header").forEach(r=>{const s=r.dataset.talkerId,a=e?nr(s):n?er(s):Hn(t,s);r.style.color=`#${a.getHexString()}`})}function fi(i,t){const e=document.getElementById("stats");if(!e)return;Ql||(Array.from(e.children).forEach(h=>{h.id!=="stats-search-wrapper"&&h.id!=="stats-groups"&&h.remove()}),Ql=!0),Kc(e);const n=P_(e);if(!i||i.length===0)return;const{nmea:r,adsb:s,radar:a}=L_(i),o=document.getElementById("trail-tail-color"),l=new pt(o?o.value:"#00ffaa"),c=ad(),d=id();U_(n,r,l,c,d),O_(n,s,l,c,d),H_(n,a,l,c,d);const u=n.querySelectorAll(".stats-group").length;b_(u),Qc(),io(A_())}function I_(i,t){return`
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
        </div>`}function D_(i,t){const e=n=>document.getElementById(`${i}-${n}`);e("points-stat")&&(e("points-stat").textContent=t.totalPoints,e("hz-stat").textContent=t.updateRate.toFixed(2),e("duration-stat").textContent=t.totalDuration.toFixed(1),e("twod-stat").textContent=t.total2DDistance.toFixed(1),e("threed-stat").textContent=t.total3DDistance.toFixed(1),e("rth-stat").textContent=t.rthDistance3D.toFixed(1),e("speed-stat").textContent=t.latestSpeed.toFixed(2),e("altitude-stat").textContent=t.currentAltitude.toFixed(2),e("altwsg84-stat").textContent=t.currentAltWsg84.toFixed(2),e("lat-stat").textContent=t.currentLat.toFixed(7),e("long-stat").textContent=t.currentLon.toFixed(7),e("satellites-stat").textContent=t.currentSatellites,e("start-stat").textContent=tc(t.startTime),e("end-stat").textContent=tc(t.endTime))}function U_(i,t,e,n,r){if(t.length===0){i.querySelectorAll('.stats-group[data-data-type="nmea"]').forEach(o=>o.remove());return}const s=m_(t),a=Object.keys(s).sort();so(i,a,"nmea"),a.forEach(o=>{if(!document.getElementById(`${o}-points-stat`)){const c=n?`#${nr(o).getHexString()}`:r?`#${er(o).getHexString()}`:`#${Hn(e,o).getHexString()}`;i.insertAdjacentHTML("beforeend",I_(o,c))}const l=g_(s[o]);l&&D_(o,l)})}function N_(i,t){return`
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
        </div>`}function F_(i,t){const e=n=>document.getElementById(`${i}-${n}`);if(e("points-stat")&&(ro(i),jc(i),e("points-stat").textContent=t.totalPoints,e("lat-stat").textContent=t.currentLat.toFixed(6),e("long-stat").textContent=t.currentLon.toFixed(6),e("baroalt-stat").textContent=t.currentBaroAltM!=null?t.currentBaroAltM.toFixed(1):"--",e("geoalt-stat").textContent=t.currentGeoAltM!=null?t.currentGeoAltM.toFixed(1):"--",e("hdg-stat").textContent=t.heading.toFixed(1),e("hvel-stat").textContent=t.horVelocityMs.toFixed(1),e("vvel-stat").textContent=t.verVelocityMs.toFixed(1),e("gdist-stat").textContent=t.totalGroundDist.toFixed(1),e("type-stat").textContent=S_(t.emitterType),e("duration-stat").textContent=t.duration.toFixed(1),t.lastSeen))try{e("lastseen-stat").textContent=new Date(t.lastSeen).toISOString().substring(11,19)}catch{e("lastseen-stat").textContent="--"}}function O_(i,t,e,n,r){if(t.length===0){i.querySelectorAll('.stats-group[data-data-type="adsb"]').forEach(o=>o.remove());return}const s=v_(t),a=Object.keys(s).sort();so(i,a,"adsb"),a.forEach(o=>{if(!document.getElementById(`${o}-points-stat`)){const c=n?`#${nr(o).getHexString()}`:r?`#${er(o).getHexString()}`:`#${Hn(e,o).getHexString()}`;i.insertAdjacentHTML("beforeend",N_(o,c)),ro(o)}const l=x_(s[o]);l&&F_(o,l)})}function B_(i,t){const e=`radar_${i}`;return`
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
        </div>`}function z_(i,t){const e=`radar_${i}`,n=r=>document.getElementById(`${e}-${r}`);n("points-stat")&&(n("points-stat").textContent=t.totalPoints,n("extid-stat").textContent=t.currentExtId||"--",n("rcs-stat").textContent=t.currentRcs!=null?t.currentRcs.toFixed(4):"--",n("lat-stat").textContent=t.currentLat.toFixed(7),n("long-stat").textContent=t.currentLon.toFixed(7),n("alt-stat").textContent=t.currentAlt.toFixed(1),n("vel-stat").textContent=t.currentVel!=null?t.currentVel.toFixed(2):"--",n("duration-stat").textContent=t.duration.toFixed(1))}function H_(i,t,e,n,r){if(t.length===0){i.querySelectorAll('.stats-group[data-data-type="radar"]').forEach(o=>o.remove());return}const s=T_(t),a=Object.keys(s).sort((o,l)=>Number(o)-Number(l));so(i,a.map(o=>`radar_${o}`),"radar"),a.forEach(o=>{const l=`radar_${o}`;if(!document.getElementById(`${l}-points-stat`)){const d=n?`#${nr(l).getHexString()}`:r?`#${er(l).getHexString()}`:`#${Hn(e,l).getHexString()}`;i.insertAdjacentHTML("beforeend",B_(o,d))}const c=w_(s[o]);c&&z_(o,c)})}function k_(){const i=document.getElementById("stats");i&&(Kc(i),window.addEventListener("cinematicTargetChanged",t=>{if(Jc=t.detail.talkerId,Qc(),t.detail.talkerId){const e=document.getElementById("stats-groups"),n=e?.querySelector(`.stats-group[data-panel-id="${t.detail.talkerId}"]`);n&&e&&e.scrollTo({top:n.offsetTop-60,behavior:"instant"})}}),i.addEventListener("click",t=>{const e=t.target.closest(".talker-header");if(!e)return;const n=e.dataset.talkerId;n&&window.dispatchEvent(new CustomEvent("activateCinematicForTalker",{detail:{talkerId:n}}))}))}k_();const rn=new Map;let Fa=null,ao=!0;function G_(i){const t=document.getElementById("stats");if(!t)return;const e=t.querySelector(`.stats-group[data-panel-id="${i}"], .stats-group[data-panel-id="radar_${i}"]`);e&&t.scrollTo({top:e.offsetTop-t.offsetTop-10,behavior:"smooth"})}function V_(i){ao=i,rn.forEach(t=>{t.visible=i})}function W_(){const i=document.getElementById("show-label-toggle");i&&(ao=i.checked,i.addEventListener("change",()=>V_(i.checked)))}function X_(i){Fa=i,W_(),window.addEventListener("aircraftInfoLoaded",t=>{t.detail?.talkerId&&q_(t.detail.talkerId)})}function $_(){rn.forEach(i=>{i.parent&&i.parent.remove(i),i.element?.parentNode&&i.element.parentNode.removeChild(i.element)}),rn.clear()}function q_(i){let t=rn.get(i);if(!t){for(const[r,s]of rn.entries())if(r.toLowerCase()===i.toLowerCase()){t=s;break}}if(!t)return;const e=Zc(i),n=e&&e!=="Unknown"&&e!=="Unknown Model"&&e!=="Loading..."?e:`Aircraft ${i}`;t.element.textContent!==n&&(t.element.textContent=n)}function Y_(i,t){if(!(!Fa||!t)){rn.forEach((e,n)=>{n in i||(e.parent&&e.parent.remove(e),e.element?.parentNode&&e.element.parentNode.removeChild(e.element),rn.delete(n))});for(const e in i){const n=i[e];if(n.length===0)continue;const r=n[n.length-1],s=t(r.lat,r.lon,r.alt);let a=rn.get(e);if(!a){const l=document.createElement("div");l.className="track-label",l.setAttribute("data-track-label-id",e),l.style.cssText=`
                margin-top: -20px;
                color: #ffffff;
                font-size: 12px;
                font-weight: 600;
                font-family: inherit;
                white-space: nowrap;
                pointer-events: auto;
                cursor: pointer;
                transition: opacity 0.15s ease;
                text-shadow:
                    -1px -1px 2px rgba(0,0,0,0.9),
                     1px -1px 2px rgba(0,0,0,0.9),
                    -1px  1px 2px rgba(0,0,0,0.9),
                     1px  1px 2px rgba(0,0,0,0.9),
                     0    0   6px rgba(0,0,0,0.6);
            `,l.addEventListener("click",c=>{c.stopPropagation(),window.dispatchEvent(new CustomEvent("activateCinematicForTalker",{detail:{talkerId:e}})),G_(e)}),l.addEventListener("mouseenter",()=>{l.style.opacity="0.7"}),l.addEventListener("mouseleave",()=>{l.style.opacity="1"}),a=new Xc(l),a.visible=ao,rn.set(e,a),Fa.add(a)}let o;if(r.dataType==="radar")o=`Track ${e.startsWith("radar_")?e.slice(6):e}`;else if(r.dataType==="adsb"){const l=Zc(e);o=l&&l!=="Unknown"&&l!=="Unknown Model"?l:`Aircraft ${e}`}else o=`Rover ${e}`;a.element.textContent!==o&&(a.element.textContent=o),a.position.copy(s)}}}function _r(i,t=!1){rn.forEach((e,n)=>{if(e.element)if(t)e.element.style.color="#ffffff";else{const r=i(n);e.element.style.color=typeof r=="string"?r:`#${r.getHexString()}`}})}let fe=new Map,Vi=[],td=null,pi=!1,Wn=null,mi=!1;const Oa={radar:new pt(16720418),adsb:new pt(44287),nmea:new pt(16768256)};function ed(i){return i?i.dataType==="radar"?"radar":i.dataType==="adsb"?"adsb":i.dataType==="nmea"?"nmea":i.icaoAddress!==void 0||i.heading!==void 0||i.horizontalVelocity!==void 0?"adsb":(i.talkerId&&/^[A-Z]{2}$/.test(i.talkerId),"nmea"):"nmea"}const K_=.618033988749895,Sa=new Map;let j_=0;function Z_(i){if(!Sa.has(i)){const t=j_++;Sa.set(i,{index:t,hueOffset:t===0?0:t*K_%1})}return Sa.get(i)}function Hn(i,t){const e=Z_(t);if(e.index===0)return i.clone();const n={};return i.getHSL(n),n.h=(n.h+e.hueOffset)%1,new pt().setHSL(n.h,n.s,n.l)}const J_=["trail-head-color","trail-tail-color","trail-line-color"];function Ms(){const i=pi||mi;J_.forEach(t=>{const e=document.getElementById(t);if(!e)return;e.disabled=i,e.style.opacity=i?"0.35":"1",e.style.cursor=i?"not-allowed":"pointer";const n=e.closest(".trail-group");n&&(n.style.cursor=i?"not-allowed":"")})}function er(i){const t=fe.get(i);if(!t||!t.gpsPoints||!t.gpsPoints.length)return new pt(16777215);const e=t.gpsPoints[0],n=ed(e);return Oa[n]?Oa[n].clone():new pt(16777215)}function nd(){fe&&fe.forEach(({points:i,gpsPoints:t})=>{if(!i)return;const e=i.geometry.attributes.color.array;t.forEach((n,r)=>{const s=ed(n),a=Oa[s]||new pt(16777215),o=r*3;e[o]=a.r,e[o+1]=a.g,e[o+2]=a.b}),i.geometry.attributes.color.needsUpdate=!0})}function Q_(){mi=!0,nd(),wr(),_r(er),Rs(),Ms()}function id(){return mi}const ec=3,Ma=5,t0=8;function ya(){!fe||fe.size===0||fe.forEach(({points:i,gpsPoints:t})=>{if(!i)return;const n=i.geometry.attributes.pointSize;if(!n)return;const r=n.array,s=t.length,a=Math.max(0,s-ec);for(let o=0;o<s;o++)if(o<a)r[o]=Ma;else{const l=(o-a)/(Math.min(ec,s)-1||1);r[o]=Ma+(t0-Ma)*l}n.needsUpdate=!0})}function e0(i,t,e){fe=i,Vi=t,td=e;const n=document.getElementById("show-lines-toggle"),r=n?n.checked:!1;fe.forEach(({line:s})=>{s&&(s.visible=r)})}function n0(){if(!Vi||Vi.length===0)return null;const i=Vi.map(r=>r.alt),t=Math.min(...i),e=Math.max(...i),n=e-t;return n===0?null:{minElevation:t,maxElevation:e,elevationRange:n}}function rd(i,t){const{minElevation:e,elevationRange:n}=t,r=Math.max(0,Math.min(1,(i-e)/n));let s,a,o;if(r<.25){const l=r/.25;s=0,a=l*.8,o=1}else if(r<.5){const l=(r-.25)/.25;s=0,a=.8+l*.2,o=1-l}else if(r<.75)s=(r-.5)/.25,a=1,o=0;else{const l=(r-.75)/.25;s=1,a=1-l,o=0}return new pt(s,a,o)}function nr(i){const t=fe.get(i);if(!t||!t.gpsPoints||!t.gpsPoints.length||!Wn)return new pt(16777215);const e=t.gpsPoints[t.gpsPoints.length-1];return rd(e.alt,Wn)}function sd(){!fe||!Wn||!Vi.length||fe.forEach(({points:i,gpsPoints:t})=>{if(!i)return;const e=i.geometry.attributes.color.array;t.forEach((n,r)=>{const s=rd(n.alt,Wn),a=r*3;e[a]=s.r,e[a+1]=s.g,e[a+2]=s.b}),i.geometry.attributes.color.needsUpdate=!0})}function i0(){return Wn=n0(),Wn?(pi=!0,sd(),wr(),_r(nr),Rs(),Ms(),!0):!1}function ad(){return pi}function oo(){if(!fe||fe.size===0||!td||!Vi.length)return;if(pi&&Wn){sd(),ya(),_r(nr);return}if(mi){nd(),ya(),_r(er);return}const i=new pt(document.getElementById("trail-head-color").value),t=new pt(document.getElementById("trail-tail-color").value);fe.forEach(({points:e,gpsPoints:n},r)=>{if(!e||n.length===0)return;const s=Hn(i,r),a=Hn(t,r),o={},l={};a.getHSL(o),s.getHSL(l);const c=e.geometry.attributes.color.array,d=n.length,u=15,h=Math.max(0,d-u);for(let m=0;m<d;m++){let g;if(m<h)g=a;else{const p=(m-h)/(u-1),f=o.h+(l.h-o.h)*p,M=o.s+(l.s-o.s)*p,E=o.l+(l.l-o.l)*p;g=new pt().setHSL(f,M,E)}const _=m*3;c[_]=g.r,c[_+1]=g.g,c[_+2]=g.b}e.geometry.attributes.color.needsUpdate=!0}),ya(),_r(e=>Hn(t,e))}function wr(){if(!fe)return;const i=new pt(document.getElementById("trail-line-color").value),t=pi||mi;fe.forEach(({line:e},n)=>{if(!e||!e.material)return;const r=Hn(i,n);e.material.color.copy(r),e.material.transparent=t,e.material.opacity=t?.2:1,e.material.depthWrite=!t,e.material.needsUpdate=!0})}function r0(){if(!fe)return;const i=document.getElementById("show-lines-toggle").checked;fe.forEach(({line:t})=>{t&&(t.visible=i)})}function s0(){return{head:new pt(document.getElementById("trail-head-color").value),tail:new pt(document.getElementById("trail-tail-color").value),line:new pt(document.getElementById("trail-line-color").value)}}function a0(){const i=document.getElementById("trail-head-color"),t=document.getElementById("trail-tail-color"),e=document.getElementById("trail-line-color"),n=document.getElementById("show-lines-toggle"),r=document.getElementById("stats");r&&r.addEventListener("wheel",o=>o.stopPropagation());const s=()=>{const o=document.getElementById("trail-preset");o&&(o.value=""),oo(),wr(),Rs()},a=()=>{r0()};i&&i.addEventListener("input",s),t&&t.addEventListener("input",s),e&&e.addEventListener("input",s),n&&n.addEventListener("change",a)}function lo(){pi&&(pi=!1,Wn=null,Ms()),mi&&(mi=!1,Ms()),oo(),wr(),Rs()}const o0=`
    attribute float pointSize;
    varying vec3 vColor;
    void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = pointSize;
        gl_Position = projectionMatrix * mvPosition;
    }
`,l0=`
    varying vec3 vColor;
    void main() {
        vec2 c = gl_PointCoord - 0.5;
        if (dot(c, c) > 0.25) discard;
        gl_FragColor = vec4(vColor, 1.0);
    }
`;let ci=null,kn=null,Ls=null,Oe=null,di=null,He=[],ai=new Map,Fe=null,xr=null,ui=null,sn=!1;function c0(i=null){if(!He||He.length===0||!kn)return null;if(i===null){const n=He[He.length-1];return kn(n.lat,n.lon,n.alt)}const t=He.filter(n=>n.talkerId===i);if(t.length===0)return null;const e=t[t.length-1];return kn(e.lat,e.lon,e.alt)}function br(){return Oe}function d0(i){ci=i,X_(i)}function od(){return kn}function u0(){return He}function h0(){const i=sn?Fe:Oe,t=sn?ui:di;return!i||t===null||t===void 0?0:(i.minAlt-t)*1}function f0(){return sn?ui:di}function ld(i){!i||i.length===0||(Fe=i.reduce((t,e)=>({minLat:Math.min(t.minLat,e.lat),maxLat:Math.max(t.maxLat,e.lat),minLon:Math.min(t.minLon,e.lon),maxLon:Math.max(t.maxLon,e.lon),minAlt:Math.min(t.minAlt,e.alt),maxAlt:Math.max(t.maxAlt,e.alt)}),{minLat:1/0,maxLat:-1/0,minLon:1/0,maxLon:-1/0,minAlt:1/0,maxAlt:-1/0}),xr={lat:(Fe.minLat+Fe.maxLat)/2,lon:(Fe.minLon+Fe.maxLon)/2,alt:(Fe.minAlt+Fe.maxAlt)/2},ui=i[0].alt,sn=!0,console.log("Global coordinate system initialized:",{globalCenter:xr,globalBounds:Fe}))}function p0(){Fe=null,xr=null,ui=null,sn=!1}function m0(){ci&&(ai.forEach(({points:i,line:t})=>{i&&(i.geometry&&i.geometry.dispose(),i.material&&(Array.isArray(i.material)?i.material.forEach(e=>e.dispose()):i.material.dispose()),ci.remove(i)),t&&(t.material&&(Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material.dispose()),ci.remove(t))}),ai.clear(),$_(),He=[],Ls=null,Oe=null,di=null)}function g0(i){!i||i.length===0||(Oe=i.reduce((t,e)=>({minLat:Math.min(t.minLat,e.lat),maxLat:Math.max(t.maxLat,e.lat),minLon:Math.min(t.minLon,e.lon),maxLon:Math.max(t.maxLon,e.lon),minAlt:Math.min(t.minAlt,e.alt),maxAlt:Math.max(t.maxAlt,e.alt)}),{minLat:1/0,maxLat:-1/0,minLon:1/0,maxLon:-1/0,minAlt:1/0,maxAlt:-1/0}),Ls={lat:(Oe.minLat+Oe.maxLat)/2,lon:(Oe.minLon+Oe.maxLon)/2,alt:(Oe.minAlt+Oe.maxAlt)/2},di=i[0].alt)}function _0(){kn=(i,t,e)=>{let n,r,s;typeof i=="object"&&i!==null&&"lat"in i?(n=i.lat,r=i.lon,s=i.alt!==void 0?i.alt:ui||di):(n=i,r=t,s=e!==void 0?e:ui||di);const a=sn?xr:Ls,o=sn?ui:di;if(n===void 0||r===void 0||s===void 0||a===null||o===null)return new P(0,0,0);const l=a.lat*Math.PI/180,c=10,d=(r-a.lon)*Math.cos(l)*111320*c,u=(s-o)*10,h=(n-a.lat)*111320*c;return new P(d,u,-h)}}function v0(i){const t=[];return i.forEach(e=>{const n=kn(e.lat,e.lon,e.alt),r=(Math.random()-.5)*.01;t.push(n.x,n.y,n.z+r)}),{positions:t}}function x0(i,t){const e=new Se;e.setAttribute("position",new Qt(i.positions,3));const n=new Float32Array(i.positions.length);e.setAttribute("color",new Qt(n,3));const r=new Float32Array(t);r.fill(4),e.setAttribute("pointSize",new Qt(r,1));const s=new Ke({vertexColors:!0,vertexShader:o0,fragmentShader:l0,transparent:!1,depthTest:!0,depthWrite:!0}),a=new as(e,s);a.renderOrder=0;const o=s0(),l=new ki({color:o.line,transparent:!1,opacity:1,depthTest:!0,depthWrite:!0,linewidth:1e4}),c=new Gc(e,l);c.renderOrder=0;const d=document.getElementById("show-lines-toggle");return c.visible=d?d.checked:!1,ci.add(c,a),{points:a,line:c}}function gi(i,t=!1){let e;if(t?(He.push(...i),e=He):(He=[...i],e=He),e.length===0)return m0(),null;ai.forEach(({points:o,line:l})=>{o&&ci.remove(o),l&&ci.remove(l)}),ai.clear(),g0(e),_0();const n=e.reduce((o,l)=>{const c=l.talkerId||"default";return o[c]||(o[c]=[]),o[c].push(l),o},{});for(const o in n){const l=n[o];if(l.length>1){const c=v0(l),d=x0(c,l.length);ai.set(o,{points:d.points,line:d.line,gpsPoints:l})}}Y_(n,kn),console.log(`Plotted ${e.length} points across ${ai.size} tracks.`),e0(ai,He,sn?Fe:Oe),oo(),wr();const s=sn?Fe:Oe,a=sn?xr:Ls;return{dataSpan:Math.max((s.maxLat-s.minLat)*111320,(s.maxLon-s.minLon)*111320),firstPoint:i[0],firstPointVec:kn(i[0].lat,i[0].lon,i[0].alt),center:a,bounds:s}}let $e,Un,Nn,_n,Pn,ls,Ba,ye,Ln=null;function S0(){$e=new qg,$e.background=new pt(328965),ls=new li,Ba=new li,$e.add(ls),ls.add(Ba),Un=new Be(75,window.innerWidth/window.innerHeight,1,1e7),Un.position.set(610,610,610),Nn=new $g({antialias:!0}),Nn.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(Nn.domElement),_n=new a_,_n.setSize(window.innerWidth,window.innerHeight),_n.domElement.style.position="absolute",_n.domElement.style.top="0px",_n.domElement.style.pointerEvents="none",document.body.appendChild(_n.domElement),Pn=o_(Un,Nn.domElement),ye=new s_(100),ye.position.y=.1,$e.add(ye),Un.lookAt(ye.position),Ln=l_($e),h_($e),cd(),console.log("Scene initialized. Waiting for data file.")}function $n(){return{scene:$e,camera:Un,renderer:Nn,labelRenderer:_n,controls:Pn,dataGroup:ls,tileGroup:Ba,axesHelper:ye}}function M0(){ye&&($e.remove(ye),ye.geometry&&ye.geometry.dispose(),ye.material&&(Array.isArray(ye.material)?ye.material.forEach(i=>i.dispose()):ye.material.dispose()),ye=null),Ln&&($e.remove(Ln),Ln.geometry&&Ln.geometry.dispose(),Ln.material&&Ln.material.dispose(),Ln=null)}function cd(){if(requestAnimationFrame(cd),Pn.isCinematicActive&&Pn.isCinematicActive()){const t=Pn.getTargetTalkerId(),e=c0(t);e&&Pn.setCinematicTarget(e)}Pn.update();const i=Pn.getCurrentCamera();p_(i),Nn.render($e,i),_n.render($e,i)}function y0(){Un&&Nn&&(Un.aspect=window.innerWidth/window.innerHeight,Un.updateProjectionMatrix(),Nn.setSize(window.innerWidth,window.innerHeight),_n.setSize(window.innerWidth,window.innerHeight))}const za={satellite:{url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",name:"Satellite"},streetview:{url:"https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",name:"Topographic"}},Ar={initialOpacity:.5,initialTileService:"satellite",initialRenderDistance:5,initialRenderDistanceKm:2};async function nc(i,t){if(window.__TAURI__){const e=await window.__TAURI__.core.invoke("fetch_url",{url:i});return{ok:!0,json:async()=>JSON.parse(e),text:async()=>e}}return fetch(i,{signal:AbortSignal.timeout(5e3)})}function ic(i,t,e){const n=Math.pow(2,e),r=Math.floor(n*((i+180)/360)),s=t*Math.PI/180,a=Math.floor(n*(1-Math.log(Math.tan(s)+1/Math.cos(s))/Math.PI)/2);return{x:Math.max(0,Math.min(n-1,r)),y:Math.max(0,Math.min(n-1,a))}}function ys(i,t,e){const n=Math.pow(2,e),r=i/n*360-180,a=Math.atan(Math.sinh(Math.PI*(1-2*t/n)))*180/Math.PI;return{lon:r,lat:a}}function E0(i,t,e=5e3){return new Promise((n,r)=>{const s=setTimeout(()=>{r(new Error(`Timeout loading texture: ${t}`))},e);i.load(t,a=>{clearTimeout(s),n(a)},void 0,a=>{clearTimeout(s),r(a)})})}let Ha=Ar.initialTileService,Es=Ar.initialOpacity,Ne=null;const T0=.51;let Je=null;const ka=500;let cs=null;function dd(i){cs=null}const w0="https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png";let ud=32,hd=10,Fn=!1;function b0(i){hd=parseFloat(i),Fn&&br()&&ir()}function A0(i){ud=parseInt(i,10),Fn&&br()&&ir()}function C0(i){Fn=!!i,br()&&ir()}async function R0(i,t,e){const n=w0.replace("{z}",e).replace("{x}",i).replace("{y}",t);return new Promise(r=>{const s=new Image;s.crossOrigin="Anonymous",s.onload=()=>{try{const a=document.createElement("canvas");a.width=s.width,a.height=s.height;const o=a.getContext("2d");o.drawImage(s,0,0),r(o.getImageData(0,0,a.width,a.height))}catch(a){console.warn(`Elevation canvas read failed for ${i},${t},${e}:`,a),r(null)}},s.onerror=()=>{console.warn(`Elevation tile load failed: ${n}`),r(null)},setTimeout(()=>r(null),6e3),s.src=n})}function L0(i,t,e){const{data:n,width:r,height:s}=i;return((o,l)=>{const c=Math.max(0,Math.min(r-1,Math.round(l))),u=(Math.max(0,Math.min(s-1,Math.round(o)))*r+c)*4;return n[u]*256+n[u+1]+n[u+2]/256-32768})(t,e)}function P0(i,t){const e=t/111.32,n=(i.minLat+i.maxLat)/2,r=t/(111.32*Math.cos(n*Math.PI/180));return{minLat:i.minLat-e,maxLat:i.maxLat+e,minLon:i.minLon-r,maxLon:i.maxLon+r}}function I0(i){const t=Math.max(i.maxLon-i.minLon,1e-4),e=Math.max(i.maxLat-i.minLat,1e-4);for(let n=18;n>=1;n--){const r=Math.pow(2,n),s=Math.ceil(r*t/360)+1,a=Math.ceil(r*e/180)+1;if(s*a<=ka)return n}return 1}async function ir(){const{tileGroup:i}=$n(),t=window.getCurrentRenderDistance?window.getCurrentRenderDistance():Ar.initialRenderDistanceKm,e=br(),n=od();if(!e||!n){console.error("Bounding box or GPS conversion not available.");return}for(;i.children.length>0;){const T=i.children[0];i.remove(T),T.geometry&&T.geometry.dispose(),T.material&&(T.material.map&&T.material.map.dispose(),T.material.dispose())}const r=P0(e,t),s=cs!==null?cs:I0(r),a=ic(r.minLon,r.maxLat,s),o=ic(r.maxLon,r.minLat,s),l={x:Math.floor((a.x+o.x)/2),y:Math.floor((a.y+o.y)/2)},c=o.x-a.x+1,d=o.y-a.y+1,u=c*d;if(isNaN(a.x)||isNaN(a.y)||isNaN(o.x)||isNaN(o.y)||o.x<a.x||o.y<a.y||c>1e3||d>1e3){console.error("Invalid tile coordinate range:",{minTile:a,maxTile:o,bbox:r});return}if(u>ka){console.warn(`Tile count ${u} exceeds MAX_TILE_COUNT (${ka}). Aborting.`);return}const h=ys(a.x,a.y,s),m=ys(o.x+1,o.y+1,s),g=n({lat:h.lat,lon:h.lon}),_=n({lat:m.lat,lon:m.lon});Je={minX:Math.min(g.x,_.x),maxX:Math.max(g.x,_.x),minZ:Math.min(g.z,_.z),maxZ:Math.max(g.z,_.z)};const p=[];for(let T=a.x;T<=o.x;T++)for(let U=a.y;U<=o.y;U++)p.push({x:T,y:U});p.sort((T,U)=>Math.hypot(T.x-l.x,T.y-l.y)-Math.hypot(U.x-l.x,U.y-l.y));const f=h0(),M=f0();console.log(`Loading ${p.length} tiles | zoom ${s} (${cs!==null?"manual":"auto"}) | renderDist ${t} km | floorY ${f.toFixed(1)} | topo ${Fn?"ON":"OFF"}`);const E=new t_;await Promise.all(p.map(({x:T,y:U})=>D0(T,U,s,E,n,f,M).catch(()=>null))),N0(f),console.log("Finished loading tiles.")}async function D0(i,t,e,n,r,s,a){const{tileGroup:o}=$n(),l=za[Ha].url.replace("{z}",e).replace("{y}",t).replace("{x}",i),c=ys(i,t,e),d=ys(i+1,t+1,e),u=r({lat:c.lat,lon:c.lon}),h=r({lat:d.lat,lon:d.lon}),m=Math.abs(h.x-u.x),g=Math.abs(h.z-u.z),[_,p]=await Promise.all([E0(n,l,5e3),Fn&&a!==null?R0(i,t,e):Promise.resolve(null)]);_.wrapS=vn,_.wrapT=vn,_.minFilter=Re,_.magFilter=Re;const f=Fn&&p?ud:1,M=new xi(m,g,f,f);Fn&&p&&U0(M,p,s,a,f);const E=new Ja({map:_,side:ze,transparent:!0,opacity:Es}),T=new ve(M,E);T.rotation.x=-Math.PI/2,Fn&&p?T.position.set((u.x+h.x)/2,s,(u.z+h.z)/2):T.position.set((u.x+h.x)/2,s-.1,(u.z+h.z)/2),o.add(T)}function U0(i,t,e,n,r){const s=i.attributes.position,a=r+1,o=r+1,l=t.height,c=t.width;for(let d=0;d<a;d++)for(let u=0;u<o;u++){const h=d*o+u,m=d/(a-1)*(l-1),g=u/(o-1)*(c-1),f=(L0(t,m,g)-n)*hd-e;s.setZ(h,f)}s.needsUpdate=!0,i.computeVertexNormals()}function N0(i){const{scene:t}=$n();if(Ne&&(t.remove(Ne),Ne.geometry.dispose(),Ne.material.dispose(),Ne=null),!Je)return;const e=Je.maxX-Je.minX,n=Je.maxZ-Je.minZ,r=(Je.minX+Je.maxX)/2,s=(Je.minZ+Je.maxZ)/2,a=Math.max(e,n)/80;Ne=new ve(new xi(e,n),new Ke({uniforms:{uGridColor:{value:new pt(7829367)},uGridSize:{value:a},uLineWidth:{value:.5},uOpacity:{value:.55}},depthWrite:!1,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-8,polygonOffsetUnits:-8,transparent:!0,alphaTest:.01,blending:Bn,side:ze,vertexShader:`
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
            `})),Ne.rotation.x=-Math.PI/2,Ne.position.set(r,i,s),Ne.renderOrder=-1,t.add(Ne),fd()}function fd(){Ne&&(Ne.visible=Es<T0)}function rc(i){const{tileGroup:t}=$n();Es=parseFloat(i),t.children.forEach(e=>{e.material&&(e.material.opacity=Es)}),fd()}function F0(i){i!==Ha&&za[i]&&(Ha=i,console.log("Switched to tile service:",za[i].name),br()&&ir())}let co=[],Ga=[],re=[],Va=[],se=0,on=!1,Mn=!0,ds=null,ji=1;const O0=100,pd=100;function _i(i){return i==null||i===0?null:i<1e10?i*1e3:i}function B0(){const i=[];for(const t of Ga)t&&t.length&&i.push(...t);re=i.sort((t,e)=>{const n=_i(t.time)??1/0,r=_i(e.time)??1/0;return n-r})}function z0(i){const t=_i(i);return t?new Date(t).toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"}):"--:--:--"}function H0(i){const t=_i(re[i]?.time),e=_i(re[i+1]?.time);return t!=null&&e!=null&&e>t?Math.max(0,(e-t)/ji):O0/ji}function k0(){return co}function G0(i){ji=i,on&&(rr(),sr()),q0()}function Wa(){return{isLiveMode:Mn,isPlaying:on,currentPointIndex:se,totalLines:co.length,totalPoints:re.length,progress:re.length>0?se/(re.length-1):0,playbackSpeed:ji}}function uo(i){Va=i||[]}function Ps(i){co=i;const t=Md();if(t==="radar"){const e=i.join(`
`);Ga=[Yc(e)||[]]}else Ga=i.map(e=>t==="adsb"?qc(e)||[]:$c(e)||[]);B0(),se=Math.max(0,re.length-1),ar()}function V0(){const i=document.getElementById("timeSlider");i&&re.length>0&&(i.max=re.length-1,Mn&&(se=re.length-1,i.value=se))}function rr(){ds!==null&&(clearTimeout(ds),ds=null)}function sr(){if(!on)return;if(se>=re.length-1){ho();return}const i=H0(se);ds=setTimeout(()=>{on&&(se++,ar(),Cr(),sr())},i)}function W0(){rr(),se>=re.length-1&&(se=0),on=!0,gd(),sr()}function ho(){rr(),on=!1,gd()}function X0(){Mn&&Is(),se=Math.max(0,se-pd),ar(),Cr(),on&&(rr(),sr())}function $0(){Mn&&Is(),se=Math.min(re.length-1,se+pd),ar(),Cr(),on&&(rr(),sr())}function Is(){Mn=!1,_d()}function md(){Mn=!0,ho(),se=Math.max(0,re.length-1),ar(),_d(),Cr()}function Cr(){Md();const i=re.slice(0,se+1);let t=i;if(Va.length>0){const e=_i(re[se]?.time)??1/0,n=Va.filter(r=>(_i(r.time)??1/0)<=e);t=[...i,...n]}gi(t,!1),fi(t)}function ar(){const i=document.getElementById("timeSlider"),t=document.getElementById("timeDisplay");if(re.length>0){const e=re.length-1;if(i&&(i.max=e,i.value=se),t){const n=re[se]?.time;re[e]?.time,t.textContent=`${z0(n)}`}}}function gd(){const i=document.getElementById("playIcon"),t=document.getElementById("pauseIcon");on?(i&&(i.style.display="none"),t&&(t.style.display="inline")):(i&&(i.style.display="inline"),t&&(t.style.display="none"))}function _d(){const i=document.getElementById("goLive");i&&(i.style.opacity=Mn?"0.5":"1.0",i.disabled=Mn)}function q0(){const i=document.getElementById("currentSpeedDisplay");i&&(i.textContent=`${ji}x`),document.querySelectorAll(".speed-option").forEach(t=>{t.classList.toggle("active",parseFloat(t.dataset.speed)===ji)})}function vd(i){Mn&&Is(),se=parseInt(i.target.value),ar(),Cr(),on&&(rr(),sr())}function Y0(i){const t=parseFloat(i.target.dataset.speed);if(!isNaN(t)&&t>0){G0(t);const e=document.getElementById("speedOptions");e&&e.classList.remove("show")}}function K0(){const i=document.getElementById("timeSlider");i&&(["mousedown","mousemove","mouseup","click"].forEach(t=>{i.addEventListener(t,e=>e.stopPropagation())}),i.addEventListener("input",vd))}const j0=`<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 576 512">\r
<path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 92.9-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.8-35.7-46.1-87.7-92.9-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0a144 144 0 1 1-288 0zm144-64a64 64 0 1 1 0 128a64 64 0 0 1 0-128z"/></svg>`,xd=`<svg class="trash-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 448 512"><path fill="currentColor" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>\r
`,Z0=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512">\r
<path fill="currentColor" d="M232.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 149.8C5.4 145.8 0 137.3 0 128s5.4-17.9 13.9-21.8L232.5 5.2zM48.1 218.4l164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 277.8C5.4 273.8 0 265.3 0 256s5.4-17.9 13.9-21.8l34.1-15.8zM13.9 362.2l34.1-15.8 164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 405.8C5.4 401.8 0 393.3 0 384s5.4-17.9 13.9-21.8z"/></svg>`,Ge=new Map;let Le=null,J0=1;const Q0=10,qe=new Set;function Ds(i,t){return t==="adsb"?qc(i):t==="radar"?Yc(i):$c(i)}async function tv(){const i=[];for(const t of qe){const e=Ge.get(t);if(e)try{const r=await(await e.handle.getFile()).text();i.push(...Ds(r,e.type))}catch(n){console.error(`Overlay read failed for file ${t}:`,n)}}return i}async function Sd(){if(!Le)return;const i=Ge.get(Le);if(i)try{const e=await(await i.handle.getFile()).text(),n=Ds(e,i.type),r=await tv();uo(r);const s=[...n,...r];if(s.length===0)return;gi(s,!1),fi(s,i.type)}catch(t){console.error("rerenderWithOverlays failed:",t)}}function ev(i){const t=Ge.get(i);if(t)if(t.watcherInterval&&clearInterval(t.watcherInterval),qe.delete(i),Ge.delete(i),i===Le){const e=[...Ge.keys()];e.length>0?(Le=null,yd(e[e.length-1])):(Le=null,Ps([]),gi([]),fi([]),p0(),vi())}else(qe.size>0||i!==Le)&&Sd(),vi()}function Md(){return Le&&Ge.get(Le)?.type||null}function vi(){const i=document.getElementById("fileListContainer");if(!i)return;i.querySelectorAll("[data-file-id]").forEach(s=>s.remove());const t=Ge.size>0,e=i.querySelectorAll("[data-obj-id]").length>0;i.style.display=t||e?"flex":"none",(t||e)&&(i.style.flexDirection="column");const n=i.querySelector("[data-obj-id]")||null,r=Array.from(Ge.entries());r.forEach(([s,a],o)=>{const l=s===Le,c=qe.has(s),d=o===r.length-1,u=document.createElement("div");u.className=l?"active":"",u.dataset.fileId=s,u.style.cssText=`
            display: flex; align-items: center; gap: 0.5em;
            padding: 0.6em 0.8em;
            border: 1px solid ${l?"#f0f0f0":c?"#5588cc":"#333"};
            border-radius: 2px;
            cursor: pointer;
            font-size: 0.85em;
            color: ${l?"#e0e0e0":"#eee"};
            background: #1a1a1a;
            margin-bottom: ${d&&!e?"0":"5px"};
            user-select: none;
            width: 100%;
            box-sizing: border-box;
            min-width: 0;
            font-family: inherit;
            transition: border 0.2s ease;
        `;let h=`
            <span style="flex:1; min-width:0; overflow:hidden; white-space:nowrap;" title="${a.name}">
                ${a.name}
            </span>
            ${l?`<span style="flex-shrink:0; opacity:1; line-height:0; margin-left:auto;">${j0}</span>`:""}
        `;if(l||(h+=`
                <span class="overlay-btn" data-overlaid="${c}"
                      style="flex-shrink:0; line-height:0; color:${c?"#1c7eff":"#88888888"}; transition:color 0.15s ease;"
                      title="${c?"Remove overlay":"Overlay onto current scene"}">
                    ${Z0}
                </span>
                <span class="trash-btn"
                      style="flex-shrink:0; line-height:0; color:#88888888; transition:color 0.15s ease;"
                      title="Remove">
                    ${xd}
                </span>
            `),u.innerHTML=h,u.addEventListener("click",m=>{m.target.closest(".trash-btn")||m.target.closest(".overlay-btn")||yd(s)}),!l){const m=u.querySelector(".trash-btn");m&&(m.addEventListener("mouseenter",()=>{m.style.color="#e03c3c"}),m.addEventListener("mouseleave",()=>{m.style.color="#88888888"}),m.addEventListener("click",_=>{_.stopPropagation(),ev(s)}));const g=u.querySelector(".overlay-btn");g&&(g.addEventListener("mouseenter",()=>{qe.has(s)||(g.style.color="#1c7eff")}),g.addEventListener("mouseleave",()=>{g.style.color=qe.has(s)?"#1c7eff":"#88888888"}),g.addEventListener("click",async _=>{_.stopPropagation(),qe.has(s)?qe.delete(s):qe.add(s),vi(),await Sd()}))}i.insertBefore(u,n)})}async function yd(i){if(i===Le)return;const t=Ge.get(i);if(!t)return;qe.clear(),uo([]),Le=i,dd();const n=await(await t.handle.getFile()).text(),r=t.type==="radar"?[n]:n.split(`
`).filter(o=>o.trim());Ps(r);const s=Ds(n,t.type);if(s.length===0){gi([]),fi([],t.type),vi();return}ld(s);const a=gi(s,!1);fi(s,t.type),vi(),a&&window.dispatchEvent(new CustomEvent("fileLoaded",{detail:a}))}async function nv(i){const t=Ge.get(i);if(!(!t||!t.handle||t.isWatcherRunning||t.type==="radar")){t.isWatcherRunning=!0;try{const e=await t.handle.getFile();if(e.size>t.readOffset){const n=await e.slice(t.readOffset).text();if(t.readOffset=e.size,n.length>0&&i===Le){const r=n.split(`
`).filter(a=>a.trim()),s=[...k0(),...r];Ps(s),Wa().isLiveMode?md():V0()}}}catch(e){console.error(`Error watching file ${i}:`,e)}finally{t.isWatcherRunning=!1}}}function iv(i){const t=Ge.get(i);!t||t.type==="radar"||(t.watcherInterval&&clearInterval(t.watcherInterval),t.watcherInterval=setInterval(()=>nv(i),Q0))}async function rv(i,t){const e=await i.getFile(),n=await e.text();let r;y_(n)?r="radar":(r=__(n),r==="unknown"&&(r="nmea"));const s=J0++;Ge.set(s,{id:s,handle:i,name:e.name,type:r,readOffset:e.size,watcherInterval:null,isWatcherRunning:!1}),qe.clear(),uo([]),Le=s,dd();const a=r==="radar"?[n]:n.split(`
`).filter(c=>c.trim());Ps(a);const o=Ds(n,r);if(o.length===0)return alert("No valid GPS / ADS-B / Radar points found."),gi([]),fi([]),vi(),!1;ld(o);const l=gi(o,!1);return fi(o),vi(),t&&l&&t(l),iv(s),!0}function sv(){const i=l=>{window.dispatchEvent(new CustomEvent("fileLoaded",{detail:l}))};window.addEventListener("gpsFilesSelected",async l=>{const c=l.detail;for(const d of c)await rv(d,i)});const t=document.getElementById("rewind");t&&t.addEventListener("click",X0);const e=document.getElementById("playPause");e&&e.addEventListener("click",()=>{Wa().isLiveMode&&Is(),Wa().isPlaying?ho():W0()});const n=document.getElementById("forward");n&&n.addEventListener("click",$0);const r=document.getElementById("goLive");r&&r.addEventListener("click",md);const s=document.getElementById("timeSlider");s&&(s.addEventListener("input",vd),K0());const a=document.getElementById("adjustSpeed"),o=document.getElementById("speedOptions");a&&o&&(a.addEventListener("click",l=>{l.stopPropagation(),o.classList.toggle("show")}),document.querySelectorAll(".speed-option").forEach(l=>{l.addEventListener("click",Y0)}),window.addEventListener("click",()=>o.classList.remove("show")))}document.getElementById("topo-toggle").addEventListener("change",i=>{C0(i.target.checked)});document.getElementById("topo-scale").addEventListener("change",i=>{b0(i.target.value)});document.getElementById("topo-segments").addEventListener("change",i=>{A0(i.target.value)});function av(){ov(),cv(),lv()}const us=document.getElementById("topo-segments"),sc=1,ac=256;let pr=parseInt(us.value,10);us.addEventListener("change",()=>{let i=parseInt(us.value,10);isNaN(i)||(i>pr?i=pr*2:i<pr&&(i=Math.floor(pr/2)),i>ac&&(i=ac),i<sc&&(i=sc),us.value=i,pr=i)});function ov(){const i=document.getElementById("opacitySlider");i&&(i.value=Ar.initialOpacity,rc(i.value),i.addEventListener("input",t=>{rc(t.target.value)}))}function lv(){document.querySelectorAll(".view-option").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".view-option").forEach(e=>e.classList.remove("active")),i.classList.add("active");const t=i.dataset.view;F0(t)})})}function cv(){const i=document.getElementById("renderMinus"),t=document.getElementById("renderPlus"),e=document.getElementById("renderValue");let n=Ar.initialRenderDistance;const r=1,s=50,a=()=>{e&&(e.textContent=n),i&&(i.disabled=n<=r),t&&(t.disabled=n>=s)},o=l=>{n=Math.max(r,Math.min(s,l)),a(),ir()};i&&i.addEventListener("click",()=>o(n-1)),t&&t.addEventListener("click",()=>o(n+1)),window.getCurrentRenderDistance=()=>n,a()}class dv extends tr{constructor(t){super(t)}load(t,e,n,r){const s=this,a=new Vc(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(o){try{e(s.parse(o))}catch(l){r?r(l):console.error(l),s.manager.itemError(t)}},n,r)}parse(t){function e(c){const d=new DataView(c),u=32/8*3+32/8*3*3+16/8,h=d.getUint32(80,!0);if(80+32/8+h*u===d.byteLength)return!0;const g=[115,111,108,105,100];for(let _=0;_<5;_++)if(n(g,d,_))return!1;return!0}function n(c,d,u){for(let h=0,m=c.length;h<m;h++)if(c[h]!==d.getUint8(u+h))return!1;return!0}function r(c){const d=new DataView(c),u=d.getUint32(80,!0);let h,m,g,_=!1,p,f,M,E,T;for(let C=0;C<70;C++)d.getUint32(C,!1)==1129270351&&d.getUint8(C+4)==82&&d.getUint8(C+5)==61&&(_=!0,p=new Float32Array(u*3*3),f=d.getUint8(C+6)/255,M=d.getUint8(C+7)/255,E=d.getUint8(C+8)/255,T=d.getUint8(C+9)/255);const U=84,w=12*4+2,A=new Se,I=new Float32Array(u*3*3),v=new Float32Array(u*3*3),x=new pt;for(let C=0;C<u;C++){const B=U+C*w,F=d.getFloat32(B,!0),X=d.getFloat32(B+4,!0),$=d.getFloat32(B+8,!0);if(_){const G=d.getUint16(B+48,!0);(G&32768)===0?(h=(G&31)/31,m=(G>>5&31)/31,g=(G>>10&31)/31):(h=f,m=M,g=E)}for(let G=1;G<=3;G++){const Y=B+G*12,k=C*3*3+(G-1)*3;I[k]=d.getFloat32(Y,!0),I[k+1]=d.getFloat32(Y+4,!0),I[k+2]=d.getFloat32(Y+8,!0),v[k]=F,v[k+1]=X,v[k+2]=$,_&&(x.set(h,m,g).convertSRGBToLinear(),p[k]=x.r,p[k+1]=x.g,p[k+2]=x.b)}}return A.setAttribute("position",new Pe(I,3)),A.setAttribute("normal",new Pe(v,3)),_&&(A.setAttribute("color",new Pe(p,3)),A.hasColors=!0,A.alpha=T),A}function s(c){const d=new Se,u=/solid([\s\S]*?)endsolid/g,h=/facet([\s\S]*?)endfacet/g,m=/solid\s(.+)/;let g=0;const _=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,p=new RegExp("vertex"+_+_+_,"g"),f=new RegExp("normal"+_+_+_,"g"),M=[],E=[],T=[],U=new P;let w,A=0,I=0,v=0;for(;(w=u.exec(c))!==null;){I=v;const x=w[0],C=(w=m.exec(x))!==null?w[1]:"";for(T.push(C);(w=h.exec(x))!==null;){let X=0,$=0;const G=w[0];for(;(w=f.exec(G))!==null;)U.x=parseFloat(w[1]),U.y=parseFloat(w[2]),U.z=parseFloat(w[3]),$++;for(;(w=p.exec(G))!==null;)M.push(parseFloat(w[1]),parseFloat(w[2]),parseFloat(w[3])),E.push(U.x,U.y,U.z),X++,v++;$!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+g),X!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+g),g++}const B=I,F=v-I;d.userData.groupNames=T,d.addGroup(B,F,A),A++}return d.setAttribute("position",new Qt(M,3)),d.setAttribute("normal",new Qt(E,3)),d}function a(c){return typeof c!="string"?new TextDecoder().decode(c):c}function o(c){if(typeof c=="string"){const d=new Uint8Array(c.length);for(let u=0;u<c.length;u++)d[u]=c.charCodeAt(u)&255;return d.buffer||d}else return c}const l=o(t);return e(l)?r(l):s(a(t))}}const uv=/^[og]\s*(.+)?/,hv=/^mtllib /,fv=/^usemtl /,pv=/^usemap /,oc=/\s+/,lc=new P,Ea=new P,cc=new P,dc=new P,Ue=new P,rs=new pt;function mv(){const i={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(t,e){if(this.object&&this.object.fromDeclaration===!1){this.object.name=t,this.object.fromDeclaration=e!==!1;return}const n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:t||"",fromDeclaration:e!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(r,s){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const o={index:this.materials.length,name:r||"",mtllib:Array.isArray(s)&&s.length>0?s[s.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(l){const c={index:typeof l=="number"?l:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return c.clone=this.clone.bind(c),c}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(r){const s=this.currentMaterial();if(s&&s.groupEnd===-1&&(s.groupEnd=this.geometry.vertices.length/3,s.groupCount=s.groupEnd-s.groupStart,s.inherited=!1),r&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return r&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),s}},n&&n.name&&typeof n.clone=="function"){const r=n.clone(0);r.inherited=!0,this.object.materials.push(r)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(t,e){const n=parseInt(t,10);return(n>=0?n-1:n+e/3)*3},parseNormalIndex:function(t,e){const n=parseInt(t,10);return(n>=0?n-1:n+e/3)*3},parseUVIndex:function(t,e){const n=parseInt(t,10);return(n>=0?n-1:n+e/2)*2},addVertex:function(t,e,n){const r=this.vertices,s=this.object.geometry.vertices;s.push(r[t+0],r[t+1],r[t+2]),s.push(r[e+0],r[e+1],r[e+2]),s.push(r[n+0],r[n+1],r[n+2])},addVertexPoint:function(t){const e=this.vertices;this.object.geometry.vertices.push(e[t+0],e[t+1],e[t+2])},addVertexLine:function(t){const e=this.vertices;this.object.geometry.vertices.push(e[t+0],e[t+1],e[t+2])},addNormal:function(t,e,n){const r=this.normals,s=this.object.geometry.normals;s.push(r[t+0],r[t+1],r[t+2]),s.push(r[e+0],r[e+1],r[e+2]),s.push(r[n+0],r[n+1],r[n+2])},addFaceNormal:function(t,e,n){const r=this.vertices,s=this.object.geometry.normals;lc.fromArray(r,t),Ea.fromArray(r,e),cc.fromArray(r,n),Ue.subVectors(cc,Ea),dc.subVectors(lc,Ea),Ue.cross(dc),Ue.normalize(),s.push(Ue.x,Ue.y,Ue.z),s.push(Ue.x,Ue.y,Ue.z),s.push(Ue.x,Ue.y,Ue.z)},addColor:function(t,e,n){const r=this.colors,s=this.object.geometry.colors;r[t]!==void 0&&s.push(r[t+0],r[t+1],r[t+2]),r[e]!==void 0&&s.push(r[e+0],r[e+1],r[e+2]),r[n]!==void 0&&s.push(r[n+0],r[n+1],r[n+2])},addUV:function(t,e,n){const r=this.uvs,s=this.object.geometry.uvs;s.push(r[t+0],r[t+1]),s.push(r[e+0],r[e+1]),s.push(r[n+0],r[n+1])},addDefaultUV:function(){const t=this.object.geometry.uvs;t.push(0,0),t.push(0,0),t.push(0,0)},addUVLine:function(t){const e=this.uvs;this.object.geometry.uvs.push(e[t+0],e[t+1])},addFace:function(t,e,n,r,s,a,o,l,c){const d=this.vertices.length;let u=this.parseVertexIndex(t,d),h=this.parseVertexIndex(e,d),m=this.parseVertexIndex(n,d);if(this.addVertex(u,h,m),this.addColor(u,h,m),o!==void 0&&o!==""){const g=this.normals.length;u=this.parseNormalIndex(o,g),h=this.parseNormalIndex(l,g),m=this.parseNormalIndex(c,g),this.addNormal(u,h,m)}else this.addFaceNormal(u,h,m);if(r!==void 0&&r!==""){const g=this.uvs.length;u=this.parseUVIndex(r,g),h=this.parseUVIndex(s,g),m=this.parseUVIndex(a,g),this.addUV(u,h,m),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(t){this.object.geometry.type="Points";const e=this.vertices.length;for(let n=0,r=t.length;n<r;n++){const s=this.parseVertexIndex(t[n],e);this.addVertexPoint(s),this.addColor(s)}},addLineGeometry:function(t,e){this.object.geometry.type="Line";const n=this.vertices.length,r=this.uvs.length;for(let s=0,a=t.length;s<a;s++)this.addVertexLine(this.parseVertexIndex(t[s],n));for(let s=0,a=e.length;s<a;s++)this.addUVLine(this.parseUVIndex(e[s],r))}};return i.startObject("",!1),i}class gv extends tr{constructor(t){super(t),this.materials=null}load(t,e,n,r){const s=this,a=new Vc(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(o){try{e(s.parse(o))}catch(l){r?r(l):console.error(l),s.manager.itemError(t)}},n,r)}setMaterials(t){return this.materials=t,this}parse(t){const e=new mv;t.indexOf(`\r
`)!==-1&&(t=t.replace(/\r\n/g,`
`)),t.indexOf(`\\
`)!==-1&&(t=t.replace(/\\\n/g,""));const n=t.split(`
`);let r=[];for(let o=0,l=n.length;o<l;o++){const c=n[o].trimStart();if(c.length===0)continue;const d=c.charAt(0);if(d!=="#")if(d==="v"){const u=c.split(oc);switch(u[0]){case"v":e.vertices.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3])),u.length>=7?(rs.setRGB(parseFloat(u[4]),parseFloat(u[5]),parseFloat(u[6])).convertSRGBToLinear(),e.colors.push(rs.r,rs.g,rs.b)):e.colors.push(void 0,void 0,void 0);break;case"vn":e.normals.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3]));break;case"vt":e.uvs.push(parseFloat(u[1]),parseFloat(u[2]));break}}else if(d==="f"){const h=c.slice(1).trim().split(oc),m=[];for(let _=0,p=h.length;_<p;_++){const f=h[_];if(f.length>0){const M=f.split("/");m.push(M)}}const g=m[0];for(let _=1,p=m.length-1;_<p;_++){const f=m[_],M=m[_+1];e.addFace(g[0],f[0],M[0],g[1],f[1],M[1],g[2],f[2],M[2])}}else if(d==="l"){const u=c.substring(1).trim().split(" ");let h=[];const m=[];if(c.indexOf("/")===-1)h=u;else for(let g=0,_=u.length;g<_;g++){const p=u[g].split("/");p[0]!==""&&h.push(p[0]),p[1]!==""&&m.push(p[1])}e.addLineGeometry(h,m)}else if(d==="p"){const h=c.slice(1).trim().split(" ");e.addPointGeometry(h)}else if((r=uv.exec(c))!==null){const u=(" "+r[0].slice(1).trim()).slice(1);e.startObject(u)}else if(fv.test(c))e.object.startMaterial(c.substring(7).trim(),e.materialLibraries);else if(hv.test(c))e.materialLibraries.push(c.substring(7).trim());else if(pv.test(c))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(d==="s"){if(r=c.split(" "),r.length>1){const h=r[1].trim().toLowerCase();e.object.smooth=h!=="0"&&h!=="off"}else e.object.smooth=!0;const u=e.object.currentMaterial();u&&(u.smooth=e.object.smooth)}else{if(c==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+c+'"')}}e.finalize();const s=new li;if(s.materialLibraries=[].concat(e.materialLibraries),!(e.objects.length===1&&e.objects[0].geometry.vertices.length===0)===!0)for(let o=0,l=e.objects.length;o<l;o++){const c=e.objects[o],d=c.geometry,u=c.materials,h=d.type==="Line",m=d.type==="Points";let g=!1;if(d.vertices.length===0)continue;const _=new Se;_.setAttribute("position",new Qt(d.vertices,3)),d.normals.length>0&&_.setAttribute("normal",new Qt(d.normals,3)),d.colors.length>0&&(g=!0,_.setAttribute("color",new Qt(d.colors,3))),d.hasUVIndices===!0&&_.setAttribute("uv",new Qt(d.uvs,2));const p=[];for(let M=0,E=u.length;M<E;M++){const T=u[M],U=T.name+"_"+T.smooth+"_"+g;let w=e.materials[U];if(this.materials!==null){if(w=this.materials.create(T.name),h&&w&&!(w instanceof ki)){const A=new ki;an.prototype.copy.call(A,w),A.color.copy(w.color),w=A}else if(m&&w&&!(w instanceof gr)){const A=new gr({size:10,sizeAttenuation:!1});an.prototype.copy.call(A,w),A.color.copy(w.color),A.map=w.map,w=A}}w===void 0&&(h?w=new ki:m?w=new gr({size:1,sizeAttenuation:!1}):w=new Kg,w.name=T.name,w.flatShading=!T.smooth,w.vertexColors=g,e.materials[U]=w),p.push(w)}let f;if(p.length>1){for(let M=0,E=u.length;M<E;M++){const T=u[M];_.addGroup(T.groupStart,T.groupCount,M)}h?f=new Da(_,p):m?f=new as(_,p):f=new ve(_,p)}else h?f=new Da(_,p[0]):m?f=new as(_,p[0]):f=new ve(_,p[0]);f.name=c.name,s.add(f)}else if(e.vertices.length>0){const o=new gr({size:1,sizeAttenuation:!1}),l=new Se;l.setAttribute("position",new Qt(e.vertices,3)),e.colors.length>0&&e.colors[0]!==void 0&&(l.setAttribute("color",new Qt(e.colors,3)),o.vertexColors=!0);const c=new as(l,o);s.add(c)}return s}}const _v=`<svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512">\r
<path fill="currentColor" d="M284-1.3c-17.3-10-38.7-10-56 0L143.8 47.3c-17.3 10-28 28.5-28 48.5l0 101.9-88.3 51c-17.3 10-28 28.5-28 48.5l0 97.3c0 20 10.7 38.5 28 48.5l84.3 48.6c17.3 10 38.7 10 56 0l88.3-51 88.3 51c17.3 10 38.7 10 56 0L484.5 443c17.3-10 28-28.5 28-48.5l0-97.3c0-20-10.7-38.5-28-48.5l-88.3-51 0-101.9c0-20-10.7-38.5-28-48.5L284-1.3zM232 292.6l0 106.5-88.3 51c-1.2 .7-2.6 1.1-4 1.1l0-105.3 92.3-53.3zm231.4 .6c.7 1.2 1.1 2.6 1.1 4l0 97.3c0 2.9-1.5 5.5-4 6.9l-84.3 48.6c-1.2 .7-2.6 1.1-4 1.1l0-105.3 91.2-52.6zM348.3 95.8l0 101.9-92.3 53.3 0-106.5 91.2-52.6c.7 1.2 1.1 2.6 1.1 4z"/>\r
</svg>`,Zi=new Map;let vv=1;const xv=new Set(["stl","obj"]);async function Sv(i){const t=await i.getFile(),e=t.name.split(".").pop().toLowerCase(),n=await t.arrayBuffer();if(e==="stl"){const r=new dv().parse(n);r.computeVertexNormals();const s=new Yg({color:10070732,roughness:1,metalness:.3});return new ve(r,s)}if(e==="obj"){const r=new TextDecoder().decode(n);return new gv().parse(r)}throw new Error(`Unsupported format: .${e}`)}function fo(i){if(!i.mesh)return;const t=od(),e=t?t(i.lat,i.lon,i.alt):new P(0,0,0);i.mesh.position.copy(e),i.mesh.rotation.set(i.pitch*Math.PI/180,i.yaw*Math.PI/180,i.roll*Math.PI/180),i.mesh.scale.setScalar(i.scale)}function Ed(i){const t=new pt(i.color);i.mesh.traverse(e=>{if(!e.isMesh)return;(Array.isArray(e.material)?e.material:[e.material]).forEach(r=>{r.color&&r.color.set(t)})})}function Td(i){const t=Math.min(1,Math.max(0,i.opacity/100));i.mesh.traverse(e=>{if(!e.isMesh)return;(Array.isArray(e.material)?e.material:[e.material]).forEach(r=>{r.transparent=t<1,r.opacity=t,r.needsUpdate=!0})})}function Mv(i){const t=Zi.get(i);if(!t)return;const{scene:e}=$n();e.remove(t.mesh),t.mesh.traverse(n=>{n.isMesh&&(n.geometry?.dispose(),(Array.isArray(n.material)?n.material:[n.material]).forEach(r=>r?.dispose()))}),Zi.delete(i),wd()}function Rn(i,t,{step:e,min:n,max:r},s){const a=document.createElement("input");return a.type="number",a.value=i[t],a.step=e,a.min=n,a.max=r,a.style.cssText=`
        width: 100%; box-sizing: border-box;
        background: #111; color: #ddd;
        border: 1px solid #333; border-radius: 2px;
        padding: 3px 5px;
        font-family: inherit; font-size: 1em;
        color-scheme: dark;
        -moz-appearance: textfield;
        appearance: textfield;
    `,yv(),a.addEventListener("input",()=>{const o=parseFloat(a.value);isNaN(o)||(i[t]=o,s?s(o):fo(i))}),a.addEventListener("keydown",o=>{(o.key==="ArrowUp"||o.key==="ArrowDown")&&o.stopPropagation()}),a}function yv(){const i="__obj-input-no-spin";if(document.getElementById(i))return;const t=document.createElement("style");t.id=i,t.textContent="input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }",document.head.appendChild(t)}function mn(i,t){const e=document.createElement("label");e.style.cssText="display:flex; flex-direction:column; gap:3px; font-size:0.8em; color:#aaa;";const n=document.createElement("span");return n.textContent=i,e.appendChild(n),e.appendChild(t),e}function Ta(i,...t){const e=document.createElement("div");return e.className="form-row",e.style.gridTemplateColumns=`repeat(${i}, 1fr)`,t.forEach(n=>e.appendChild(n)),e}function wd(){const i=document.getElementById("fileListContainer");i&&(i.querySelectorAll("[data-obj-id]").forEach(t=>t.remove()),Zi.size!==0&&Array.from(Zi.entries()).forEach(([t,e])=>{const n=document.createElement("div");n.dataset.objId=t,n.className="file-list-item";const r=i.children.length>0;n.style.cssText=`
            border: 1px solid #333; border-radius: 2px;
            background: #1a1a1a;
            ${r?"margin-top: 5px;":""}
            overflow: hidden; font-family: inherit;
        `;const s=document.createElement("div");s.style.cssText=`
            display: flex; align-items: center; gap: 0.5em;
            padding: 0.6em 0.8em;
            cursor: pointer; font-size: 0.85em; color: #e0e0e0;
            user-select: none;
        `,s.innerHTML=`
            <span style="flex:1; min-width:0; overflow:hidden; white-space:nowrap;
                         text-overflow:ellipsis;" title="${e.name}">${e.name}</span>
            <span class="vis-btn"
                  style="flex-shrink:0; line-height:0; opacity:${e.visible?1:.3};
                         transition:opacity 0.15s ease;"
                  title="Toggle visibility">${_v}</span>
            <span class="trash-btn"
                  style="flex-shrink:0; line-height:0; color:#88888888;
                         transition:color 0.15s ease;"
                  title="Remove">${xd}</span>
        `;const a=document.createElement("div");a.style.cssText=`
            display: ${e.expanded?"block":"none"};
            padding: 0.6em 0.8em 0.8em;
            border-top: 1px solid #2a2a2a;
        `,a.appendChild(Ta(3,mn("Roll (°)",Rn(e,"roll",{step:"1",min:"-360",max:"360"})),mn("Pitch (°)",Rn(e,"pitch",{step:"1",min:"-360",max:"360"})),mn("Yaw (°)",Rn(e,"yaw",{step:"1",min:"-360",max:"360"})))),a.appendChild(Ta(3,mn("Lat",Rn(e,"lat",{step:"0.000001",min:"-90",max:"90"})),mn("Lon",Rn(e,"lon",{step:"0.000001",min:"-180",max:"180"})),mn("Alt (m)",Rn(e,"alt",{step:"1",min:"-1000",max:"100000"}))));const o=document.createElement("input");o.type="color",o.value=e.color,o.className="color-picker",o.style.cssText="width:100%; height:24px;",o.addEventListener("input",()=>{e.color=o.value,Ed(e)}),a.appendChild(Ta(3,mn("Scale",Rn(e,"scale",{step:"0.01",min:"0.0001",max:"100000"})),mn("Opacity (%)",Rn(e,"opacity",{step:"1",min:"0",max:"100"},d=>{e.opacity=Math.min(100,Math.max(0,d)),Td(e)})),mn("Color",o))),s.addEventListener("click",d=>{d.target.closest(".vis-btn")||d.target.closest(".trash-btn")||(e.expanded=!e.expanded,a.style.display=e.expanded?"block":"none")});const l=s.querySelector(".vis-btn");l.addEventListener("click",d=>{d.stopPropagation(),e.visible=!e.visible,e.mesh.visible=e.visible,l.style.opacity=e.visible?1:.3});const c=s.querySelector(".trash-btn");c.addEventListener("mouseenter",()=>c.style.color="#e03c3c"),c.addEventListener("mouseleave",()=>c.style.color="#88888888"),c.addEventListener("click",d=>{d.stopPropagation(),Mv(t)}),n.appendChild(s),n.appendChild(a),i.appendChild(n)}))}function Ev(){const i=u0();return i?.length>0?{lat:i[0].lat,lon:i[0].lon,alt:i[0].alt}:{lat:0,lon:0,alt:0}}async function Tv(i){const t=await Sv(i),e=await i.getFile(),{scene:n}=$n();bv(n);const r=Ev(),s=vv++,a={id:s,name:e.name,mesh:t,lat:r.lat,lon:r.lon,alt:r.alt,roll:0,pitch:0,yaw:0,scale:1,opacity:100,color:"#f6d983",visible:!0,expanded:!0};Zi.set(s,a),n.add(t),fo(a),Ed(a),Td(a),wd()}async function wv(){try{const i=await window.showOpenFilePicker({types:[{description:"All Supported Files",accept:{"model/*":[".stl",".obj"],"text/plain":[".ubx",".txt",".csv",".log",".ndjson",".crswap"]}}],multiple:!0}),t=[];for(const e of i){const r=(await e.getFile()).name.split(".").pop().toLowerCase();xv.has(r)?await Tv(e):t.push(e)}t.length>0&&window.dispatchEvent(new CustomEvent("gpsFilesSelected",{detail:t}))}catch(i){i.name!=="AbortError"&&console.error("File load failed:",i)}}let uc=!1;function bv(i){if(uc)return;i.add(new r_(16777215,.8));const t=new i_(16777215,.6);t.position.set(500,1e3,500),i.add(t),uc=!0}function Av(){Zi.forEach(i=>fo(i))}function Cv(){const i=document.getElementById("openFileBtn");i&&i.addEventListener("click",wv)}let hc=!1;function Rv(){const{controls:i}=$n();window.addEventListener("resize",y0),window.addEventListener("fileLoaded",t=>{const e=t.detail;e&&(hc||(M0(),f_(),hc=!0),i.reset(e.dataSpan,e.firstPointVec),ir(),Av())}),Cv(),a0(),sv(),av()}function Lv(){S0();const{dataGroup:i}=$n();d0(i),Rv(),console.log("Application initialized successfully")}Lv();document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelectorAll(".slider-wrapper"),t=e=>{const n=e.querySelector('input[type="range"]'),r=e.querySelector(".slider-tooltip");if(!n||!r)return;document.body.appendChild(r);const s=()=>{const a=parseFloat(n.value),o=parseFloat(n.min||0),l=parseFloat(n.max||1),d=parseFloat(n.step||.1)<1||a%1!==0;r.textContent=d?a.toFixed(1):a;const u=n.getBoundingClientRect(),h=16,m=10,g=l-o,_=g===0?0:(a-o)/g,p=u.width-h,f=_*p,M=u.left+f+h+m,E=u.top+u.height/2-r.offsetHeight/2;r.style.position="fixed",r.style.left=`${M-5}px`,r.style.top=`${E}px`,r.style.zIndex="99999999"};e.addEventListener("mouseenter",()=>{s(),r.style.opacity="1"}),e.addEventListener("mouseleave",()=>{r.style.opacity="0"}),n.addEventListener("input",s),s()};i.forEach(e=>{t(e)})});class Ts{constructor(){this.validCount=0,this.invalidCount=0}validateNMEAChecksum(t){if(t=t.trim(),!t.startsWith("$")||!t.includes("*"))return!1;const e=t.split("*");if(e.length!==2)return!1;const n=e[0].substring(1),r=e[1],s=parseInt(r,16);if(isNaN(s))return!1;let a=0;for(let o=0;o<n.length;o++)a^=n.charCodeAt(o);return a===s}extractTalkerID(t){try{const e=t.trim();if(!e.startsWith("$"))return null;const n=e.indexOf(",");return n===-1?null:e.substring(1,n)}catch{return null}}sortNMEAData(t,e=null){const n={};this.validCount=0,this.invalidCount=0;for(const r of t)if(!(!r||r.trim().length===0))if(this.validateNMEAChecksum(r)){this.validCount++;const s=this.extractTalkerID(r);s?(n[s]||(n[s]=[],console.log(`Creating entry for valid talker ID: ${s}`)),n[s].push(r.trim())):this.invalidCount++}else this.invalidCount++;return console.log(`
--- Processing Summary ---`),console.log(`Valid sentences processed: ${this.validCount}`),console.log(`Invalid/disregarded lines: ${this.invalidCount}`),console.log("--------------------------"),{sortedData:n,validCount:this.validCount,invalidCount:this.invalidCount}}processFileContent(t,e=null){const n=t.split(`
`).map(r=>r.trim()).filter(r=>r.length>0);return this.sortNMEAData(n,e)}createDownloadableFiles(t,e){for(const[n,r]of Object.entries(t)){const s=`RTK_${n}_${e}.txt`,a=r.join(`
`)+`
`,o=new Blob([a],{type:"text/plain"}),l=URL.createObjectURL(o),c=document.createElement("a");c.href=l,c.download=s,c.click(),URL.revokeObjectURL(l),console.log(`Downloaded ${s} with ${r.length} sentences`)}}static validate(t){return new Ts().validateNMEAChecksum(t)}static getTalkerID(t){return new Ts().extractTalkerID(t)}}class Pv{constructor(){this.coords=null,this.pollingRateMs=6e4,this.pollingInterval=null,this.fileHandle=null,this.writableStream=null,this.encoder=new TextEncoder,this.sampleCount=0,this.active=!1}async requestLocation(){return"geolocation"in navigator?new Promise(t=>{navigator.geolocation.getCurrentPosition(e=>{this.coords={latitude:parseFloat(e.coords.latitude.toFixed(6)),longitude:parseFloat(e.coords.longitude.toFixed(6))},console.log(`[WeatherRecorder] Location acquired: ${this.coords.latitude}, ${this.coords.longitude}`),t(!0)},e=>{console.warn("[WeatherRecorder] Location denied or unavailable:",e.message),t(!1)},{enableHighAccuracy:!1,timeout:1e4,maximumAge:3e5})}):(console.warn("[WeatherRecorder] Geolocation API not available."),!1)}async start(t,e){if(!this.coords)return console.log("[WeatherRecorder] No location available — weather recording skipped."),!1;const n=`weather_${e}.ndjson`;try{this.fileHandle=await t.getFileHandle(n,{create:!0}),this.writableStream=await this.fileHandle.createWritable(),console.log(`[WeatherRecorder] File created: ${n}`)}catch(r){return console.error("[WeatherRecorder] Failed to create weather file:",r),!1}return this.sampleCount=0,this.active=!0,await this._poll(),this.pollingInterval=setInterval(()=>this._poll(),this.pollingRateMs),console.log(`[WeatherRecorder] Polling started (every ${this.pollingRateMs/1e3} s).`),!0}async stop(){this.active=!1,this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null),this.writableStream&&(await this.writableStream.close(),this.writableStream=null,console.log(`[WeatherRecorder] Stopped. ${this.sampleCount} sample(s) written.`)),this.fileHandle=null}stopEmergency(){this.active=!1,this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null),this.writableStream&&(this.writableStream.close().catch(t=>console.error("[WeatherRecorder] pagehide close error:",t.message)),this.writableStream=null)}async _poll(){if(!this.active||!this.coords)return;const{latitude:t,longitude:e}=this.coords,n=`https://api.open-meteo.com/v1/forecast?latitude=${t}&longitude=${e}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;try{const r=await fetch(n,{signal:AbortSignal.timeout(1e4)});if(!r.ok)throw new Error(`HTTP ${r.status}: ${r.statusText}`);const s=await r.json();this.writableStream&&(await this.writableStream.write(this.encoder.encode(JSON.stringify(s)+`
`)),this.sampleCount++);const a=s.current;console.log(`[WeatherRecorder] ${a?.temperature_2m} °C  RH ${a?.relative_humidity_2m}%  Wind ${a?.wind_speed_10m} km/h`)}catch(r){console.warn("[WeatherRecorder] Poll failed:",r.message)}}}function Iv(i){let t=0,e=0;for(const n of i)t=t+n&255,e=e+t&255;return[t,e]}function bd(i,t,e){const n=e.length,r=new Uint8Array(4+n);r[0]=i,r[1]=t,r[2]=n&255,r[3]=n>>8&255,r.set(e,4);const[s,a]=Iv(r),o=new Uint8Array(2+r.length+2);return o[0]=181,o[1]=98,o.set(r,2),o[2+r.length]=s,o[2+r.length+1]=a,o}function po(i,t){const e=[new Uint8Array([0,i,0,0])];for(const[a,o,l]of t){const c=new Uint8Array(4);if(new DataView(c.buffer).setUint32(0,a,!0),e.push(c),o==="B")e.push(new Uint8Array([l&255]));else if(o==="I"||o==="U4"){const d=new Uint8Array(4);new DataView(d.buffer).setUint32(0,l>>>0,!0),e.push(d)}else if(o==="U2"){const d=new Uint8Array(2);new DataView(d.buffer).setUint16(0,l&65535,!0),e.push(d)}}const n=e.reduce((a,o)=>a+o.length,0),r=new Uint8Array(n);let s=0;for(const a of e)r.set(a,s),s+=a.length;return bd(6,138,r)}const Ad=537067521,Dv=1073938448,Uv=1073938449,Nv=276234241,Fv=276234242,Ov=276234244,Bv=276299777,zv=276299778,Hv=276299780,kv=807469057,Gv=807469058,Vv=546373785,Xa=.02,$a=60,Wv=po(3,[[Ad,"B",0]]);function Xv(i,t){return po(3,[[Ad,"B",1],[Dv,"U4",t],[Uv,"U4",Math.round(i*1e4)]])}function $v(){return po(3,[[Nv,"B",1],[Fv,"B",1],[Ov,"B",1],[Bv,"B",1],[zv,"B",1],[Hv,"B",1],[kv,"U2",1e3],[Gv,"U2",1],[Vv,"B",1]])}function qv(i){if(i.length<40)return null;const t=new DataView(i.buffer,i.byteOffset);return{dur:t.getUint32(8,!0),meanAcc:t.getUint32(28,!0)/1e4,obs:t.getUint32(32,!0),valid:i[36]!==0,active:i[37]!==0}}function Yv(i){return i.length<8?null:i[5]}const Kv=["No fix","Dead reckoning","2D","3D","GNSS+DR","Time only"],jv=["None","Float","Fixed"];function fc(i){if(i.length<24)return null;const t=i[20],n=i[21]>>6&3;return{fixType:t,fixLabel:Kv[t]??`Unknown(${t})`,carrSoln:n,carrLabel:jv[n]??`Unknown(${n})`}}function Zv(i){let t=0;for(const e of i)t^=e.charCodeAt(0);return t.toString(16).toUpperCase().padStart(2,"0")}function Jv(i=0,t=0){const e=new Date,n=String(e.getUTCHours()).padStart(2,"0"),r=String(e.getUTCMinutes()).padStart(2,"0"),s=String(e.getUTCSeconds()).padStart(2,"0"),a=`${n}${r}${s}.00`,o=Math.abs(i),l=Math.floor(o),c=((o-l)*60).toFixed(4).padStart(7,"0"),d=i>=0?"N":"S",u=Math.abs(t),h=Math.floor(u),m=((u-h)*60).toFixed(4).padStart(7,"0"),g=t>=0?"E":"W",_=`GPGGA,${a},${String(l).padStart(2,"0")}${c},${d},${String(h).padStart(3,"0")}${m},${g},1,08,1.0,0.0,M,0.0,M,,`;return`$${_}*${Zv(_)}\r
`}function Qv(i){if(!i.match(/^\$(GP|GN|GL)GGA,/))return null;const t=i.split(",");if(t.length<6)return null;const e=parseFloat(t[2]),n=t[3],r=parseFloat(t[4]),s=t[5];if(!parseInt(t[6])||isNaN(e)||isNaN(r))return null;const o=Math.floor(e/100),l=(o+(e-o*100)/60)*(n==="S"?-1:1),c=Math.floor(r/100),d=(c+(r-c*100)/60)*(s==="W"?-1:1);return{lat:l,lon:d}}class tx{constructor(t){this.host=t.host,this.port=t.port||2101,this.mountpoint=t.mountpoint,this.user=t.user||"",this.pass=t.pass||"",this.lat=t.lat??0,this.lon=t.lon??0,this.ggaInterval=(t.ggaInterval??30)*1e3,this._stopped=!1,this._controller=null,this._totalBytes=0}async start(t,e=()=>{}){for(this._stopped=!1,this._totalBytes=0;!this._stopped;){try{await this._streamOnce(t,e)}catch(n){if(this._stopped)break;e(`[NTRIP] Error: ${n.message} — reconnecting in 5 s…`),await this._delay(5e3);continue}this._stopped||e("[NTRIP] GGA refresh — reconnecting…")}e(`[NTRIP] Stopped. Total RTCM forwarded: ${this._totalBytes} B`)}stop(){this._stopped=!0,this._controller&&(this._controller.abort(),this._controller=null)}async _streamOnce(t,e){this._controller=new AbortController;const n=this._controller.signal,r=btoa(`${this.user}:${this.pass}`),s=Jv(this.lat,this.lon),a=`http://${this.host}:${this.port}/${this.mountpoint}`;e(`[NTRIP] Connecting → ${a}`),e(`[NTRIP] GGA position: lat=${this.lat.toFixed(6)}, lon=${this.lon.toFixed(6)}`);const o=await fetch(a,{method:"GET",headers:{Authorization:`Basic ${r}`,"Ntrip-Version":"Ntrip/2.0","User-Agent":"NTRIP JSClient/1.0","Ntrip-GGA":s.trim(),Connection:"keep-alive"},signal:n});if(!o.ok)throw new Error(`HTTP ${o.status} ${o.statusText}`);e(`[NTRIP] Connected (${o.status}). GGA sent: ${s.trim()}`);const l=o.body.getReader();let c=0;const d=setTimeout(()=>l.cancel().catch(()=>{}),this.ggaInterval);try{for(;!this._stopped;){const{value:u,done:h}=await l.read();if(h){e("[NTRIP] Stream ended by caster.");break}if(u?.length){this._totalBytes+=u.length,c++;try{await t(u),(c<=5||c%10===0)&&e(`[NTRIP] RTCM chunk #${c}: ${u.length} B → serial (total ${this._totalBytes} B)`)}catch(m){e(`[NTRIP] Serial write failed: ${m.message}`)}}}}finally{clearTimeout(d),l.cancel().catch(()=>{})}this._totalBytes===0&&e("[NTRIP] WARNING: Connected but received 0 bytes. Check credentials, mountpoint, and that GGA position is valid (not 0,0).")}_delay(t){return new Promise(e=>setTimeout(e,t))}}function ex(i=null){return new Promise(t=>{const e=i?.latitude??"",n=i?.longitude??"",r=document.createElement("div");r.id="ntrip-overlay",r.innerHTML=`
            <form id="ntrip-form" autocomplete="on">
                <div id="ntrip-dialog">
                    <h2>Survey-In Configuration</h2>

                    <div class="section-title">Parameters</div>

                    <div class="row">
                        <div>
                            <label>Min Duration <span class="inline-label">seconds</span></label>
                            <input id="ni-dur" type="number" min="1" step="1"
                                   value="${$a}" placeholder="${$a}">
                        </div>
                        <div>
                            <label>Target Accuracy <span class="inline-label">metres</span></label>
                            <input id="ni-acc" type="number" min="0.01" step="0.01"
                                   value="${Xa}" placeholder="${Xa}">
                        </div>
                    </div>

                    <div class="section-title">NTRIP Corrections</div>

                    <label>Caster</label>
                    <input id="ni-host" type="text" placeholder="polaris.pointonenav.com"
                           value="polaris.pointonenav.com" autocomplete="url">

                    
                    <div class="row">
                        <div>
                        <label>Mountpoint</label>
                        <input id="ni-mount" type="text"   placeholder="POLARIS" value="POLARIS">
                        </div>
                        
                        <div>
                        <label>Port</label>
                        <input id="ni-port"  type="number" placeholder="2101"    value="2101">
                        </div>
                    </div>

                    <div class="row">
                        <div>
                            <label>Latitude</label>
                            <input id="ni-lat" type="number" step="0.000001"
                                   value="${e}" placeholder="">
                        </div>
                        <div>
                            <label>Longitude</label>
                            <input id="ni-lon" type="number" step="0.000001"
                                   value="${n}" placeholder="">
                        </div>
                    </div>

                    <label>Username</label>
                    <input id="ni-user" type="text" name="username" autocomplete="given-name">

                    <label>Password</label>
                    <input id="ni-pass" type="password" name="password" autocomplete="family-name">

                    <div class="actions">
                        <button type="button" id="ntrip-btn-cancel">Cancel</button>
                        <button type="button" id="ntrip-btn-skip">Skip NTRIP</button>
                        <button type="submit" id="ntrip-btn-connect">Connect</button>
                    </div>
                </div>
            </form>
        `,document.body.appendChild(r);const s=()=>r.remove(),a=()=>{const o=parseFloat(document.getElementById("ni-acc").value),l=parseInt(document.getElementById("ni-dur").value);return!isFinite(o)||o<=0?(alert("Target accuracy must be a positive number (metres)."),null):!isFinite(l)||l<1?(alert("Minimum duration must be a positive integer (seconds)."),null):{targetAccuracyM:o,minDurS:l}};document.getElementById("ntrip-btn-cancel").addEventListener("click",()=>{s(),t(null)}),document.getElementById("ntrip-btn-skip").addEventListener("click",()=>{const o=a();o&&(s(),t({ntrip:null,...o}))}),document.getElementById("ntrip-form").addEventListener("submit",o=>{o.preventDefault();const l=a();if(!l)return;const c=document.getElementById("ni-host").value.trim(),d=parseInt(document.getElementById("ni-port").value)||2101,u=document.getElementById("ni-mount").value.trim(),h=document.getElementById("ni-user").value.trim(),m=document.getElementById("ni-pass").value,g=parseFloat(document.getElementById("ni-lat").value)||e||0,_=parseFloat(document.getElementById("ni-lon").value)||n||0;if(s(),!h&&!m){console.log("[NTRIP] No credentials entered — skipping NTRIP."),t({ntrip:null,...l});return}if(!c||!u){console.warn("[NTRIP] Host or mountpoint missing — skipping NTRIP."),t({ntrip:null,...l});return}g===0&&_===0&&console.warn("[NTRIP] GGA position is 0,0 — RTCM corrections may not be delivered by caster."),t({ntrip:{host:c,port:d,mountpoint:u,user:h,pass:m,lat:g,lon:_},...l})}),r.addEventListener("keydown",o=>{o.key==="Escape"&&document.getElementById("ntrip-btn-cancel").click()})})}class nx{constructor(){this._aborted=!1,this._rxBuf=[],this._reader=null,this._readLoopPromise=null,this._ntrip=null,this._writer=null}async run(t,e,n,r,s,a=null,o=Xa,l=$a){this._aborted=!1,this._rxBuf=[];const c=Xv(o,l),d=$v();try{if(await t.open({baudRate:e}),this._writer=t.writable.getWriter(),this._startReadLoop(t),await this._delay(500),console.log("[RTKSurvey] Step 0: Configuring USB protocols (RTCM3 in, 1 Hz nav)…"),await this._sendAndWaitAck(d,"CFG-VALSET PortConfig")||console.warn("[RTKSurvey] Port config NAK/timeout — receiver may already have correct settings."),await this._delay(300),a){if(!a.lat&&!a.lon){console.log("[RTKSurvey] No position in ntripConfig — sniffing NMEA for 5 s…");const M=await this._waitForNmeaFix(5e3);M?(a.lat=M.lat,a.lon=M.lon,console.log(`[RTKSurvey] NMEA fix: ${M.lat.toFixed(6)}, ${M.lon.toFixed(6)}`)):console.warn("[RTKSurvey] No NMEA fix — NTRIP GGA will be 0,0. Corrections unlikely.")}console.log("[RTKSurvey] Starting NTRIP client…"),this._ntrip=new tx(a);const p=M=>this._writer.write(M);this._ntrip.start(p,M=>console.log(M)).catch(M=>console.warn("[NTRIP] Background error:",M)),await this._delay(3e3);const f=await this._pollUbx(1,7,2e3);if(f){const M=fc(f);M&&(console.log(`[RTKSurvey] Current fix: ${M.fixLabel}, carrier: ${M.carrLabel}`),M.carrSoln===0&&console.warn("[RTKSurvey] No carrier solution yet — RTCM may not be reaching the receiver."))}}if(console.log("[RTKSurvey] Step 1: Disabling TMODE…"),!await this._sendAndWaitAck(Wv,"CFG-VALSET Disable"))throw new Error("NAK or timeout on TMODE disable");if(await this._delay(500),this._aborted){await this._cleanup(t);return}if(console.log(`[RTKSurvey] Step 2: Starting Survey-In (acc ≤ ${o}m, dur ≥ ${l}s)…`),!await this._sendAndWaitAck(c,"CFG-VALSET Survey-In"))throw new Error("NAK or timeout on Survey-In command");console.log("[RTKSurvey] Step 3: Monitoring NAV-SVIN…"),await this._delay(2500);let g=0,_=0;for(;!this._aborted;){const p=await this._pollUbx(1,53,500);if(p!==null){const M=Yv(p);M!==null&&(g=M)}const f=await this._pollUbx(1,59,2e3);if(f){const M=qv(f);if(M){const E=Date.now();if(a&&E-_>15e3){const T=await this._pollUbx(1,7,500);if(T){const U=fc(T);U&&console.log(`[RTKSurvey] Fix: ${U.fixLabel}, carrier: ${U.carrLabel}`)}_=E}if(console.log(`[RTKSurvey] Dur: ${M.dur}s | Obs: ${M.obs} | SVs: ${g} | Acc: ${M.meanAcc.toFixed(4)}m (Target: ${o}m) | Active: ${M.active} | Valid: ${M.valid}`),n&&n({...M,numSvs:g}),M.valid){console.log(`[RTKSurvey] Survey-in complete! Final Accuracy: ${M.meanAcc.toFixed(4)}m`),this._stopNtrip(),await this._cleanup(t),r&&r({...M,numSvs:g});return}}}await this._delay(1e3)}this._stopNtrip(),await this._cleanup(t)}catch(u){console.error("[RTKSurvey] Fatal error:",u),this._stopNtrip(),await this._cleanup(t).catch(()=>{}),s&&s(u)}}abort(){console.log("[RTKSurvey] Abort requested."),this._aborted=!0,this._stopNtrip()}_stopNtrip(){this._ntrip&&(this._ntrip.stop(),this._ntrip=null,console.log("[RTKSurvey] NTRIP client stopped."))}async _waitForNmeaFix(t){const e=Date.now()+t;let n="";for(;Date.now()<e;){if(this._rxBuf.length>0){const r=this._rxBuf.splice(0);n+=new TextDecoder().decode(new Uint8Array(r));const s=n.split(`
`);n=s.pop();for(const a of s){const o=Qv(a.trim());if(o)return o}}await this._delay(100)}return null}_startReadLoop(t){this._rxBuf=[];const e=t.readable.getReader();this._reader=e,this._readLoopPromise=(async()=>{try{for(;;){const{value:n,done:r}=await e.read();if(r)break;if(n)for(const s of n)this._rxBuf.push(s)}}catch{}finally{e.releaseLock()}})()}async _stopReadLoop(){if(this._reader){try{await this._reader.cancel()}catch{}this._reader=null}this._readLoopPromise&&(await this._readLoopPromise,this._readLoopPromise=null)}async _cleanup(t){if(await this._stopReadLoop(),this._writer){try{this._writer.releaseLock()}catch{}this._writer=null}try{await t.close()}catch{}}async _writeFrame(t){await this._writer.write(t)}async _sendAndWaitAck(t,e){const n=[181,98,5,1],r=[181,98,5,0],s=this._rxBuf.length;await this._writeFrame(t),console.log(`[RTKSurvey] Sent ${e}, waiting for ACK…`);const a=Date.now();for(;Date.now()-a<5e3;){const o=this._rxBuf.slice(s);if(this._findSeq(o,n)!==-1)return console.log(`[RTKSurvey] ACK ✓ ${e}`),!0;if(this._findSeq(o,r)!==-1)return console.warn(`[RTKSurvey] NAK ✗ ${e}`),!1;await this._delay(50)}return console.warn(`[RTKSurvey] Timeout waiting for ACK: ${e}`),!1}async _pollUbx(t,e,n){const r=[181,98,t,e],s=this._rxBuf.length;await this._writeFrame(bd(t,e,new Uint8Array(0)));const a=Date.now();for(;Date.now()-a<n;){const o=this._rxBuf.slice(s),l=this._findSeq(o,r);if(l!==-1&&o.length>=l+6){const c=o[l+4]|o[l+5]<<8,d=l+6+c+2;if(o.length>=d)return new Uint8Array(o.slice(l+6,l+6+c))}await this._delay(50)}return null}_findSeq(t,e){t:for(let n=0;n<=t.length-e.length;n++){for(let r=0;r<e.length;r++)if(t[n+r]!==e[r])continue t;return n}return-1}_delay(t){return new Promise(e=>setTimeout(e,t))}}class ix{constructor(){this.startButton=document.getElementById("start-button"),this.endButton=document.getElementById("end-button"),this.statusMessage=document.getElementById("status-message"),this.baudRateSelect=document.getElementById("baud-rate"),this.selectPortButton=document.getElementById("select-port-button"),this.surveyButton=document.getElementById("survey-button"),this.urlInput=document.getElementById("url-input"),this.weatherRecorder=new Pv,this.weatherRecorder.requestLocation(),this.urlInput.addEventListener("keydown",t=>t.stopPropagation()),this.urlInput.addEventListener("keyup",t=>t.stopPropagation()),this.urlInput.addEventListener("keypress",t=>t.stopPropagation()),this.port=null,this.reader=null,this.urlPollingInterval=null,this.urlPollingRateMs=2e3,this.trafficData=[],this.trafficFileHandle=null,this.trafficWritableStream=null,this.urlActive=!1,this.isRecording=!1,this.outputDirHandle=null,this.sessionDirHandle=null,this.currentSubDirHandle=null,this.currentTimestamp=null,this.fileHandle=null,this.writableStream=null,this.bytesReceived=0,this.lastTime=0,this.rateInterval=null,this.totalBytesWritten=0,this.capturedData=[],this._survey=null,this._isSurveying=!1,"serial"in navigator?navigator.serial.addEventListener("disconnect",t=>{this.port&&t.target===this.port&&(console.log("Active COM port physically disconnected."),this.port=null,this.selectPortButton.textContent="Select Port",this.surveyButton.disabled=!0,this._isSurveying&&this._abortSurvey(),this.isRecording&&this.endRecording())}):this.handleUnsupportedBrowser(),this.initEventListeners()}initEventListeners(){this.startButton.addEventListener("click",()=>this.startRecording()),this.endButton.addEventListener("click",()=>this.endRecording()),this.selectPortButton.addEventListener("click",()=>this.selectPort()),this.surveyButton.addEventListener("click",()=>this._onSurveyClick()),window.addEventListener("beforeunload",t=>this.handleBeforeUnload(t)),window.addEventListener("pagehide",()=>this.handlePageHide())}handleUnsupportedBrowser(){console.warn("Web Serial API not supported."),this.selectPortButton.disabled=!0,this.selectPortButton.textContent="Not Supported",this.surveyButton.disabled=!0}async validateUrl(){const t=this.urlInput.value.trim();if(!t)return!1;try{const e=await nc(t);if(!e.ok)throw new Error(`HTTP ${e.status}: ${e.statusText}`);return await e.json(),!0}catch(e){const n=e?.message??(typeof e=="string"?e:JSON.stringify(e));return console.error("URL validation failed:",e),alert(`URL endpoint unreachable:
${n}`),!1}}async pollUrl(){const t=this.urlInput.value.trim();try{const e=await nc(t);if(!e.ok)return;const n=await e.json(),r={receivedAt:new Date().toISOString(),data:n};if(this.trafficData.push(r),this.trafficWritableStream){const s=new TextEncoder().encode(JSON.stringify(r)+`
`);this.totalBytesWritten+=s.length,await this.trafficWritableStream.write(s)}}catch(e){console.warn("URL poll error:",e.message)}}startUrlPolling(){this.urlActive&&(this.pollUrl(),this.urlPollingInterval=setInterval(()=>this.pollUrl(),this.urlPollingRateMs),console.log(`URL polling started (every ${this.urlPollingRateMs}ms).`))}stopUrlPolling(){this.urlPollingInterval&&(clearInterval(this.urlPollingInterval),this.urlPollingInterval=null,console.log("URL polling stopped."))}async selectPort(){try{this.port=await navigator.serial.requestPort();const t=this.port.getInfo(),e=t.usbProductId?`COM ${t.usbVendorId||""}:${t.usbProductId}`:"Unknown COM Port";this.selectPortButton.textContent=e,this.surveyButton.disabled=!1,console.log("Port selected.")}catch(t){t.name!=="AbortError"&&(console.error("Error selecting port:",t),alert(`Error selecting port: ${t.message}`))}}async _onSurveyClick(){if(this._isSurveying){this._abortSurvey();return}if(!this.port||this.isRecording)return;const t=await ex(this.weatherRecorder.coords);if(t===null){console.log("[readcom] Survey cancelled by user.");return}const{ntrip:e,targetAccuracyM:n,minDurS:r}=t;e?console.log("[readcom] NTRIP enabled:",e.host,e.mountpoint):console.log("[readcom] NTRIP skipped — survey-only mode."),console.log(`[readcom] Survey params: acc ≤ ${n}m, dur ≥ ${r}s`),this._isSurveying=!0,this._survey=new nx,this._setSurveyUI(!0),this.statusMessage.textContent=e?"Survey-In + NTRIP running…":"Survey-In running…";const s=parseInt(this.baudRateSelect.value);await this._survey.run(this.port,s,({dur:a,obs:o,meanAcc:l,valid:c,numSvs:d})=>{const u=e?"[NTRIP] ":"";this.statusMessage.textContent=`${u}SVs ${d} | 3Dσ: ${l.toFixed(3)}m | ${a}s`},a=>{console.log(`[RTKSurvey] Done — Accuracy: ${a.meanAcc.toFixed(4)}m`),this.statusMessage.textContent=`[RTKSurvey] Done - Acc: ${a.meanAcc.toFixed(4)}m`,this._finishSurvey()},a=>{alert(`Survey-In failed: ${a.message}`),this.statusMessage.textContent="Survey failed",this._finishSurvey()},e,n,r)}_abortSurvey(){this._survey&&this._survey.abort(),this.statusMessage.textContent="Survey aborted",this._finishSurvey()}_finishSurvey(){this._isSurveying=!1,this._survey=null,this._setSurveyUI(!1)}_setSurveyUI(t){this.surveyButton.classList.toggle("survey-active",t),this.surveyButton.title=t?"Abort Survey-In":"RTK BASE Survey-In",this.startButton.disabled=t,this.baudRateSelect.disabled=t,this.selectPortButton.disabled=t,this.urlInput.disabled=t,this.urlInput.style.cursor=t?"not-allowed":""}async startRecording(){if(this.isRecording||this._isSurveying)return;const t=!!this.port,e=!!this.urlInput.value.trim();if(!t&&!e){alert("Please select a serial port and/or enter a URL endpoint before recording.");return}let n=!1;if(e){if(this.statusMessage.textContent="Validating URL...",n=await this.validateUrl(),!n&&!t){this.statusMessage.textContent="Disconnected";return}!n&&t&&console.warn("URL validation failed — continuing with serial only.")}if(this.urlActive=n,!t&&"serial"in navigator&&!this.urlActive&&(await this.selectPort(),!this.port)){this.statusMessage.textContent="Disconnected";return}if(!this.outputDirHandle)try{this.outputDirHandle=await window.showDirectoryPicker({id:"rtk-nmea-recordings",mode:"readwrite",startIn:"documents"}),console.log("Output directory selected.")}catch(a){if(a.name==="AbortError"){this.statusMessage.textContent="Disconnected";return}console.error("Error selecting output directory:",a),alert(`Error selecting output directory: ${a.message}`);return}const r=new Date().toISOString().replace("T","_").replace(/\..+Z$/,"").replace(/[:]/g,"-");this.currentTimestamp=r;const s=`ARCView_${r}`;try{this.sessionDirHandle=await this.outputDirHandle.getDirectoryHandle(s,{create:!0}),console.log(`Session directory created: ${s}`)}catch(a){console.error("Error creating session directory:",a),alert(`Failed to create session folder "${s}": ${a.message}`);return}if(this.port){const a=`NMEAmsgs_${this.currentTimestamp}`;try{this.currentSubDirHandle=await this.sessionDirHandle.getDirectoryHandle(a,{create:!0})}catch(o){console.error("Error creating NMEA sub-directory:",o),alert(`Failed to create folder "${a}": ${o.message}`);return}try{this.fileHandle=await this.currentSubDirHandle.getFileHandle(`RTKx_${r}.txt`,{create:!0}),this.writableStream=await this.fileHandle.createWritable()}catch(o){console.error("Error creating recording file:",o),alert(`File creation failed: ${o.message}`),this.currentSubDirHandle=null;return}}if(this.urlActive)try{this.trafficFileHandle=await this.sessionDirHandle.getFileHandle(`pingStation_${this.currentTimestamp}.ndjson`,{create:!0}),this.trafficWritableStream=await this.trafficFileHandle.createWritable()}catch(a){if(console.error("Error creating traffic file:",a),alert(`Traffic file creation failed: ${a.message}`),!this.port)return;this.urlActive=!1}if(await this.weatherRecorder.start(this.sessionDirHandle,this.currentTimestamp),this.totalBytesWritten=0,this.bytesReceived=0,this.trafficData=[],this.capturedData=[],this.port)try{await this.port.open({baudRate:parseInt(this.baudRateSelect.value)})}catch(a){console.error(`Serial open error: ${a.message}`),this.port=null,this.selectPortButton.textContent="Select Port",this.surveyButton.disabled=!0,this.writableStream&&await this.writableStream.close(),this.trafficWritableStream&&await this.trafficWritableStream.close(),this.resetFileState(),this.resetUIToIdle(),alert("Could not open the COM port. It may be disconnected or in use by another application.");return}this.isRecording=!0,console.log("Recording started."),this.startButton.disabled=!0,this.endButton.disabled=!1,this.baudRateSelect.disabled=!0,this.selectPortButton.disabled=!0,this.surveyButton.disabled=!0,this.urlInput.disabled=!0,this.urlInput.style.cursor="not-allowed",this.lastTime=performance.now(),this.rateInterval=setInterval(()=>this.updateRateDisplay(),1e3),this.port&&this.readAndWriteLoop(),this.startUrlPolling()}async endRecording(){if(!this.isRecording)return;if(clearInterval(this.rateInterval),this.rateInterval=null,this.stopUrlPolling(),await this.weatherRecorder.stop(),this.reader)try{await this.reader.cancel()}catch(e){console.error("Error cancelling reader:",e)}if(this.writableStream&&await this.writableStream.close(),this.trafficWritableStream&&await this.trafficWritableStream.close(),this.port)try{await this.port.close()}catch(e){console.error("Error closing port:",e)}const t=this.currentSubDirHandle?.name??"(none)";if(console.log(`Recording stopped. NMEA dir: ${t}`),this.statusMessage.textContent=`Final size: ${this.formatFileSize(this.totalBytesWritten)}`,this.capturedData.length>0&&this.currentSubDirHandle){this.statusMessage.textContent="Post-processing...";try{await this.postProcessNMEA()}catch(e){console.error("Post-processing error:",e),alert(`Post-processing failed: ${e.message}`)}}this.reader=null,this.isRecording=!1,this.urlActive=!1,this.resetFileState(),this.capturedData=[],this.trafficData=[],this.totalBytesWritten=0,this.statusMessage.textContent="Ready",this.resetUIToIdle()}resetFileState(){this.fileHandle=null,this.writableStream=null,this.sessionDirHandle=null,this.currentSubDirHandle=null,this.trafficFileHandle=null,this.trafficWritableStream=null}resetUIToIdle(){this.startButton.disabled=!1,this.endButton.disabled=!0,this.baudRateSelect.disabled=!1,"serial"in navigator&&(this.selectPortButton.disabled=!1,this.surveyButton.disabled=!this.port),this.urlInput.disabled=!1,this.urlInput.style.cursor=""}async readAndWriteLoop(){if(!this.port?.readable||!this.writableStream)return;this.reader=this.port.readable.getReader();const t=new TextDecoder;try{for(;;){const{value:e,done:n}=await this.reader.read();if(n)break;e&&(this.bytesReceived+=e.length,this.totalBytesWritten+=e.length,await this.writableStream.write(e),this.capturedData.push(t.decode(e,{stream:!0})))}}catch(e){e.name!=="NetworkError"&&e.name!=="AbortError"?console.error(`Read Error: ${e.message}`):console.log("Read loop cancelled.")}finally{this.reader.releaseLock()}}async postProcessNMEA(){const t=this.capturedData.join("").split(`
`).map(r=>r.trim()).filter(r=>r.length);console.log(`Processing ${t.length} lines...`);const n=new Ts().sortNMEAData(t,this.currentTimestamp);Object.keys(n.sortedData).length>0?(await this.saveSortedFiles(n.sortedData),this.statusMessage.textContent=`Done! ${n.validCount} valid, ${n.invalidCount} invalid`):this.statusMessage.textContent="No valid NMEA sentences found"}async saveSortedFiles(t){try{let e=await this.outputDirHandle.queryPermission({mode:"readwrite"});if(e!=="granted"&&(e=await this.outputDirHandle.requestPermission({mode:"readwrite"})),e!=="granted")throw new Error("Permission denied to write post-processed files.");if(!this.currentSubDirHandle)throw new Error("Current sub-directory handle is missing.");for(const[n,r]of Object.entries(t)){const a=await(await this.currentSubDirHandle.getFileHandle(`${n}_${this.currentTimestamp}.txt`,{create:!0})).createWritable();await a.write(r.join(`
`)+`
`),await a.close()}}catch(e){console.error("Error saving sorted files:",e),alert(`Error saving sorted files: ${e.message}`)}}updateRateDisplay(){if(!this.rateInterval)return;const t=performance.now(),e=(t-this.lastTime)/1e3;if(e>0){const n=[this.formatBytesPerSecond(this.bytesReceived/e),this.formatFileSize(this.totalBytesWritten)];this.urlActive&&n.push(`${this.trafficData.length} pkts`),this.statusMessage.textContent=n.join(" | ")}this.lastTime=t,this.bytesReceived=0}formatBytesPerSecond(t){if(t<1024)return`${t.toFixed(0)} B/s`;const e=t/1024;return e<1024?`${e.toFixed(2)} KB/s`:`${(e/1024).toFixed(2)} MB/s`}formatFileSize(t){if(t<1024)return`${t.toFixed(0)} B`;const e=t/1024;if(e<1024)return`${e.toFixed(2)} KB`;const n=e/1024;return n<1024?`${n.toFixed(2)} MB`:`${(n/1024).toFixed(2)} GB`}handleBeforeUnload(t){if(this.isRecording||this._isSurveying)return t.preventDefault(),t.returnValue="Operation in progress. Are you sure you want to leave?",t.returnValue}handlePageHide(){this._isSurveying&&this._survey?.abort(),this.isRecording&&(this.weatherRecorder.stopEmergency(),clearInterval(this.rateInterval),this.rateInterval=null,this.stopUrlPolling(),this.reader?.cancel().catch(()=>{}),this.reader=null,this.writableStream?.close().catch(()=>{}),this.writableStream=null,this.trafficWritableStream?.close().catch(()=>{}),this.trafficWritableStream=null,this.port?.close().catch(()=>{}),this.port=null,this.isRecording=!1)}}document.addEventListener("DOMContentLoaded",()=>new ix);const rx={invincible:{head:"#ffe753",tail:"#4c9cbf",line:"#3a3b3d",showLines:!0},neon:{head:"#00FFFF",tail:"#FF00FF",line:"#00FF00",showLines:!0},elevation:{showLines:!0,isElevationBased:!0},classify:{showLines:!0,isClassifyBased:!0}},On={head:document.getElementById("trail-head-color").value,tail:document.getElementById("trail-tail-color").value,line:document.getElementById("trail-line-color").value,showLines:document.getElementById("show-lines-toggle").checked};function pc(i){document.getElementById("trail-head-color").value=i.head,document.getElementById("trail-tail-color").value=i.tail,document.getElementById("trail-line-color").value=i.line,document.getElementById("show-lines-toggle").checked=i.showLines,lo()}function sx(i){const t=rx[i];t&&(t.isElevationBased?i0()||(console.warn("Elevation mode failed, falling back to preset colors."),pc(t)):t.isClassifyBased?Q_():pc(t))}document.getElementById("trail-preset").addEventListener("change",function(){const i=this.value;i?sx(i):(document.getElementById("trail-head-color").value=On.head,document.getElementById("trail-tail-color").value=On.tail,document.getElementById("trail-line-color").value=On.line,document.getElementById("show-lines-toggle").checked=On.showLines,lo())});["trail-head-color","trail-tail-color","trail-line-color"].forEach(i=>{document.getElementById(i).addEventListener("input",function(){document.getElementById("trail-preset").value="",On.head=document.getElementById("trail-head-color").value,On.tail=document.getElementById("trail-tail-color").value,On.line=document.getElementById("trail-line-color").value,lo()})});document.getElementById("show-lines-toggle").addEventListener("change",function(){On.showLines=this.checked});console.log("Trail controls with centralized refresh logic initialized");
