(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xa="165",kd=0,wo=1,Hd=2,yc=1,Gd=2,gn=3,Gn=0,we=1,Be=2,Sn=0,Bn=1,To=2,bo=3,Ao=4,Vd=5,ii=100,Wd=101,Xd=102,$d=103,qd=104,Yd=200,Kd=201,jd=202,Zd=203,Ea=204,wa=205,Jd=206,Qd=207,tu=208,eu=209,nu=210,iu=211,ru=212,su=213,au=214,ou=0,lu=1,cu=2,hs=3,du=4,uu=5,hu=6,fu=7,$a=0,pu=1,mu=2,zn=0,gu=1,_u=2,vu=3,xu=4,Su=5,Mu=6,yu=7,Ec=300,Hi=301,Gi=302,Ta=303,ba=304,Ts=306,Aa=1e3,vn=1001,Ca=1002,ke=1003,Eu=1004,Ir=1005,Re=1006,Fs=1007,oi=1008,Vn=1009,wu=1010,Tu=1011,fs=1012,wc=1013,Vi=1014,Dn=1015,bs=1016,Tc=1017,bc=1018,Wi=1020,bu=35902,Au=1021,Cu=1022,nn=1023,Ru=1024,Lu=1025,Fi=1026,Xi=1027,Pu=1028,Ac=1029,Iu=1030,Cc=1031,Rc=1033,Os=33776,Bs=33777,zs=33778,ks=33779,Co=35840,Ro=35841,Lo=35842,Po=35843,Io=36196,Do=37492,Uo=37496,No=37808,Fo=37809,Oo=37810,Bo=37811,zo=37812,ko=37813,Ho=37814,Go=37815,Vo=37816,Wo=37817,Xo=37818,$o=37819,qo=37820,Yo=37821,Hs=36492,Ko=36494,jo=36495,Du=36283,Zo=36284,Jo=36285,Qo=36286,Uu=3200,Nu=3201,qa=0,Fu=1,In="",Je="srgb",Xn="srgb-linear",Ya="display-p3",As="display-p3-linear",ps="linear",Yt="srgb",ms="rec709",gs="p3",_i=7680,tl=519,Ou=512,Bu=513,zu=514,Lc=515,ku=516,Hu=517,Gu=518,Vu=519,el=35044,nl="300 es",xn=2e3,_s=2001;class Ki{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gs=Math.PI/180,Ra=180/Math.PI;function Sr(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(pe[n&255]+pe[n>>8&255]+pe[n>>16&255]+pe[n>>24&255]+"-"+pe[t&255]+pe[t>>8&255]+"-"+pe[t>>16&15|64]+pe[t>>24&255]+"-"+pe[e&63|128]+pe[e>>8&255]+"-"+pe[e>>16&255]+pe[e>>24&255]+pe[i&255]+pe[i>>8&255]+pe[i>>16&255]+pe[i>>24&255]).toLowerCase()}function Ee(n,t,e){return Math.max(t,Math.min(e,n))}function Wu(n,t){return(n%t+t)%t}function Vs(n,t,e){return(1-e)*n+e*t}function rr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Me(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ot{constructor(t=0,e=0){Ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*r+t.x,this.y=s*r+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class At{constructor(t,e,i,r,s,a,o,l,c){At.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,l,c)}set(t,e,i,r,s,a,o,l,c){const d=this.elements;return d[0]=t,d[1]=r,d[2]=o,d[3]=e,d[4]=s,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],u=i[7],h=i[2],m=i[5],g=i[8],_=r[0],f=r[3],p=r[6],E=r[1],M=r[4],w=r[7],I=r[2],T=r[5],C=r[8];return s[0]=a*_+o*E+l*I,s[3]=a*f+o*M+l*T,s[6]=a*p+o*w+l*C,s[1]=c*_+d*E+u*I,s[4]=c*f+d*M+u*T,s[7]=c*p+d*w+u*C,s[2]=h*_+m*E+g*I,s[5]=h*f+m*M+g*T,s[8]=h*p+m*w+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],d=t[8];return e*a*d-e*o*c-i*s*d+i*o*l+r*s*c-r*a*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],d=t[8],u=d*a-o*c,h=o*l-d*s,m=c*s-a*l,g=e*u+i*h+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(r*c-d*i)*_,t[2]=(o*i-r*a)*_,t[3]=h*_,t[4]=(d*e-r*l)*_,t[5]=(r*s-o*e)*_,t[6]=m*_,t[7]=(i*l-c*e)*_,t[8]=(a*e-i*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ws.makeScale(t,e)),this}rotate(t){return this.premultiply(Ws.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ws.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ws=new At;function Pc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function mr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Xu(){const n=mr("canvas");return n.style.display="block",n}const il={};function Ic(n){n in il||(il[n]=!0,console.warn(n))}function $u(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}const rl=new At().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),sl=new At().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Dr={[Xn]:{transfer:ps,primaries:ms,toReference:n=>n,fromReference:n=>n},[Je]:{transfer:Yt,primaries:ms,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[As]:{transfer:ps,primaries:gs,toReference:n=>n.applyMatrix3(sl),fromReference:n=>n.applyMatrix3(rl)},[Ya]:{transfer:Yt,primaries:gs,toReference:n=>n.convertSRGBToLinear().applyMatrix3(sl),fromReference:n=>n.applyMatrix3(rl).convertLinearToSRGB()}},qu=new Set([Xn,As]),Xt={enabled:!0,_workingColorSpace:Xn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!qu.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=Dr[t].toReference,r=Dr[e].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Dr[n].primaries},getTransfer:function(n){return n===In?ps:Dr[n].transfer}};function Oi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Xs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let vi;class Yu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{vi===void 0&&(vi=mr("canvas")),vi.width=t.width,vi.height=t.height;const i=vi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=vi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=mr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Oi(s[a]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Oi(e[i]/255)*255):e[i]=Oi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ku=0;class Dc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=Sr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push($s(r[a].image)):s.push($s(r[a]))}else s=$s(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function $s(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Yu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ju=0;class xe extends Ki{constructor(t=xe.DEFAULT_IMAGE,e=xe.DEFAULT_MAPPING,i=vn,r=vn,s=Re,a=oi,o=nn,l=Vn,c=xe.DEFAULT_ANISOTROPY,d=In){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=Sr(),this.name="",this.source=new Dc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new At,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ec)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Aa:t.x=t.x-Math.floor(t.x);break;case vn:t.x=t.x<0?0:1;break;case Ca:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Aa:t.y=t.y-Math.floor(t.y);break;case vn:t.y=t.y<0?0:1;break;case Ca:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}xe.DEFAULT_IMAGE=null;xe.DEFAULT_MAPPING=Ec;xe.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,i=0,r=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],d=l[4],u=l[8],h=l[1],m=l[5],g=l[9],_=l[2],f=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-_)<.01&&Math.abs(g-f)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+_)<.1&&Math.abs(g+f)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,w=(m+1)/2,I=(p+1)/2,T=(d+h)/4,C=(u+_)/4,U=(g+f)/4;return M>w&&M>I?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=T/i,s=C/i):w>I?w<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(w),i=T/r,s=U/r):I<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),i=C/s,r=U/s),this.set(i,r,s,e),this}let E=Math.sqrt((f-g)*(f-g)+(u-_)*(u-_)+(h-d)*(h-d));return Math.abs(E)<.001&&(E=1),this.x=(f-g)/E,this.y=(u-_)/E,this.z=(h-d)/E,this.w=Math.acos((c+m+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zu extends Ki{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const r={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Re,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new xe(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Dc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends Zu{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Uc extends xe{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=ke,this.minFilter=ke,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ju extends xe{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=ke,this.minFilter=ke,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mr{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,a,o){let l=i[r+0],c=i[r+1],d=i[r+2],u=i[r+3];const h=s[a+0],m=s[a+1],g=s[a+2],_=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=d,t[e+3]=u;return}if(o===1){t[e+0]=h,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==h||c!==m||d!==g){let f=1-o;const p=l*h+c*m+d*g+u*_,E=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const I=Math.sqrt(M),T=Math.atan2(I,p*E);f=Math.sin(f*T)/I,o=Math.sin(o*T)/I}const w=o*E;if(l=l*f+h*w,c=c*f+m*w,d=d*f+g*w,u=u*f+_*w,f===1-o){const I=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=I,c*=I,d*=I,u*=I}}t[e]=l,t[e+1]=c,t[e+2]=d,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],d=i[r+3],u=s[a],h=s[a+1],m=s[a+2],g=s[a+3];return t[e]=o*g+d*u+l*m-c*h,t[e+1]=l*g+d*h+c*u-o*m,t[e+2]=c*g+d*m+o*h-l*u,t[e+3]=d*g-o*u-l*h-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(r/2),u=o(s/2),h=l(i/2),m=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=h*d*u+c*m*g,this._y=c*m*u-h*d*g,this._z=c*d*g+h*m*u,this._w=c*d*u-h*m*g;break;case"YXZ":this._x=h*d*u+c*m*g,this._y=c*m*u-h*d*g,this._z=c*d*g-h*m*u,this._w=c*d*u+h*m*g;break;case"ZXY":this._x=h*d*u-c*m*g,this._y=c*m*u+h*d*g,this._z=c*d*g+h*m*u,this._w=c*d*u-h*m*g;break;case"ZYX":this._x=h*d*u-c*m*g,this._y=c*m*u+h*d*g,this._z=c*d*g-h*m*u,this._w=c*d*u+h*m*g;break;case"YZX":this._x=h*d*u+c*m*g,this._y=c*m*u+h*d*g,this._z=c*d*g-h*m*u,this._w=c*d*u-h*m*g;break;case"XZY":this._x=h*d*u-c*m*g,this._y=c*m*u-h*d*g,this._z=c*d*g+h*m*u,this._w=c*d*u+h*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],d=e[6],u=e[10],h=i+o+u;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(d-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(i>o&&i>u){const m=2*Math.sqrt(1+i-o-u);this._w=(d-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>u){const m=2*Math.sqrt(1+o-i-u);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+u-i-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,d=e._w;return this._x=i*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-i*c,this._z=s*d+a*c+i*l-r*o,this._w=a*d-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+i*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*i+e*this._x,this._y=m*r+e*this._y,this._z=m*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-e)*d)/c,h=Math.sin(e*d)/c;return this._w=a*u+this._w*h,this._x=i*u+this._x*h,this._y=r*u+this._y*h,this._z=s*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,i=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(al.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(al.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*i),d=2*(o*e-s*r),u=2*(s*i-a*e);return this.x=e+l*c+a*u-o*d,this.y=i+l*d+o*c-s*u,this.z=r+l*u+s*d-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return qs.copy(this).projectOnVector(t),this.sub(qs)}reflect(t){return this.sub(qs.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qs=new P,al=new Mr;class yr{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Ve.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Ve.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Ve.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ve):Ve.fromBufferAttribute(s,a),Ve.applyMatrix4(t.matrixWorld),this.expandByPoint(Ve);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ur.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ur.copy(i.boundingBox)),Ur.applyMatrix4(t.matrixWorld),this.union(Ur)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Ve),Ve.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(sr),Nr.subVectors(this.max,sr),xi.subVectors(t.a,sr),Si.subVectors(t.b,sr),Mi.subVectors(t.c,sr),En.subVectors(Si,xi),wn.subVectors(Mi,Si),Kn.subVectors(xi,Mi);let e=[0,-En.z,En.y,0,-wn.z,wn.y,0,-Kn.z,Kn.y,En.z,0,-En.x,wn.z,0,-wn.x,Kn.z,0,-Kn.x,-En.y,En.x,0,-wn.y,wn.x,0,-Kn.y,Kn.x,0];return!Ys(e,xi,Si,Mi,Nr)||(e=[1,0,0,0,1,0,0,0,1],!Ys(e,xi,Si,Mi,Nr))?!1:(Fr.crossVectors(En,wn),e=[Fr.x,Fr.y,Fr.z],Ys(e,xi,Si,Mi,Nr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ve).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ve).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const cn=[new P,new P,new P,new P,new P,new P,new P,new P],Ve=new P,Ur=new yr,xi=new P,Si=new P,Mi=new P,En=new P,wn=new P,Kn=new P,sr=new P,Nr=new P,Fr=new P,jn=new P;function Ys(n,t,e,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){jn.fromArray(n,s);const o=r.x*Math.abs(jn.x)+r.y*Math.abs(jn.y)+r.z*Math.abs(jn.z),l=t.dot(jn),c=e.dot(jn),d=i.dot(jn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Qu=new yr,ar=new P,Ks=new P;class Er{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Qu.setFromPoints(t).getCenter(i);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ar.subVectors(t,this.center);const e=ar.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(ar,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ks.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ar.copy(t.center).add(Ks)),this.expandByPoint(ar.copy(t.center).sub(Ks))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const dn=new P,js=new P,Or=new P,Tn=new P,Zs=new P,Br=new P,Js=new P;class Ka{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(dn.copy(this.origin).addScaledVector(this.direction,e),dn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){js.copy(t).add(e).multiplyScalar(.5),Or.copy(e).sub(t).normalize(),Tn.copy(this.origin).sub(js);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Or),o=Tn.dot(this.direction),l=-Tn.dot(Or),c=Tn.lengthSq(),d=Math.abs(1-a*a);let u,h,m,g;if(d>0)if(u=a*l-o,h=a*o-l,g=s*d,u>=0)if(h>=-g)if(h<=g){const _=1/d;u*=_,h*=_,m=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=s,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*l)+c;else h=-s,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-a*s+o)),h=u>0?-s:Math.min(Math.max(-s,-l),s),m=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-s,-l),s),m=h*(h+2*l)+c):(u=Math.max(0,-(a*s+o)),h=u>0?s:Math.min(Math.max(-s,-l),s),m=-u*u+h*(h+2*l)+c);else h=a>0?-s:s,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(js).addScaledVector(Or,h),m}intersectSphere(t,e){dn.subVectors(t.center,this.origin);const i=dn.dot(this.direction),r=dn.dot(dn)-i*i,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,r=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,r=(t.min.x-h.x)*c),d>=0?(s=(t.min.y-h.y)*d,a=(t.max.y-h.y)*d):(s=(t.max.y-h.y)*d,a=(t.min.y-h.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(t.min.z-h.z)*u,l=(t.max.z-h.z)*u):(o=(t.max.z-h.z)*u,l=(t.min.z-h.z)*u),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,dn)!==null}intersectTriangle(t,e,i,r,s){Zs.subVectors(e,t),Br.subVectors(i,t),Js.crossVectors(Zs,Br);let a=this.direction.dot(Js),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Tn.subVectors(this.origin,t);const l=o*this.direction.dot(Br.crossVectors(Tn,Br));if(l<0)return null;const c=o*this.direction.dot(Zs.cross(Tn));if(c<0||l+c>a)return null;const d=-o*Tn.dot(Js);return d<0?null:this.at(d/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(t,e,i,r,s,a,o,l,c,d,u,h,m,g,_,f){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,l,c,d,u,h,m,g,_,f)}set(t,e,i,r,s,a,o,l,c,d,u,h,m,g,_,f){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=m,p[7]=g,p[11]=_,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/yi.setFromMatrixColumn(t,0).length(),s=1/yi.setFromMatrixColumn(t,1).length(),a=1/yi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const h=a*d,m=a*u,g=o*d,_=o*u;e[0]=l*d,e[4]=-l*u,e[8]=c,e[1]=m+g*c,e[5]=h-_*c,e[9]=-o*l,e[2]=_-h*c,e[6]=g+m*c,e[10]=a*l}else if(t.order==="YXZ"){const h=l*d,m=l*u,g=c*d,_=c*u;e[0]=h+_*o,e[4]=g*o-m,e[8]=a*c,e[1]=a*u,e[5]=a*d,e[9]=-o,e[2]=m*o-g,e[6]=_+h*o,e[10]=a*l}else if(t.order==="ZXY"){const h=l*d,m=l*u,g=c*d,_=c*u;e[0]=h-_*o,e[4]=-a*u,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*d,e[9]=_-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const h=a*d,m=a*u,g=o*d,_=o*u;e[0]=l*d,e[4]=g*c-m,e[8]=h*c+_,e[1]=l*u,e[5]=_*c+h,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const h=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*d,e[4]=_-h*u,e[8]=g*u+m,e[1]=u,e[5]=a*d,e[9]=-o*d,e[2]=-c*d,e[6]=m*u+g,e[10]=h-_*u}else if(t.order==="XZY"){const h=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*d,e[4]=-u,e[8]=c*d,e[1]=h*u+_,e[5]=a*d,e[9]=m*u-g,e[2]=g*u-m,e[6]=o*d,e[10]=_*u+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(th,t,eh)}lookAt(t,e,i){const r=this.elements;return be.subVectors(t,e),be.lengthSq()===0&&(be.z=1),be.normalize(),bn.crossVectors(i,be),bn.lengthSq()===0&&(Math.abs(i.z)===1?be.x+=1e-4:be.z+=1e-4,be.normalize(),bn.crossVectors(i,be)),bn.normalize(),zr.crossVectors(be,bn),r[0]=bn.x,r[4]=zr.x,r[8]=be.x,r[1]=bn.y,r[5]=zr.y,r[9]=be.y,r[2]=bn.z,r[6]=zr.z,r[10]=be.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],u=i[5],h=i[9],m=i[13],g=i[2],_=i[6],f=i[10],p=i[14],E=i[3],M=i[7],w=i[11],I=i[15],T=r[0],C=r[4],U=r[8],v=r[12],x=r[1],A=r[5],B=r[9],F=r[13],V=r[2],$=r[6],H=r[10],Z=r[14],G=r[3],dt=r[7],ct=r[11],ut=r[15];return s[0]=a*T+o*x+l*V+c*G,s[4]=a*C+o*A+l*$+c*dt,s[8]=a*U+o*B+l*H+c*ct,s[12]=a*v+o*F+l*Z+c*ut,s[1]=d*T+u*x+h*V+m*G,s[5]=d*C+u*A+h*$+m*dt,s[9]=d*U+u*B+h*H+m*ct,s[13]=d*v+u*F+h*Z+m*ut,s[2]=g*T+_*x+f*V+p*G,s[6]=g*C+_*A+f*$+p*dt,s[10]=g*U+_*B+f*H+p*ct,s[14]=g*v+_*F+f*Z+p*ut,s[3]=E*T+M*x+w*V+I*G,s[7]=E*C+M*A+w*$+I*dt,s[11]=E*U+M*B+w*H+I*ct,s[15]=E*v+M*F+w*Z+I*ut,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],d=t[2],u=t[6],h=t[10],m=t[14],g=t[3],_=t[7],f=t[11],p=t[15];return g*(+s*l*u-r*c*u-s*o*h+i*c*h+r*o*m-i*l*m)+_*(+e*l*m-e*c*h+s*a*h-r*a*m+r*c*d-s*l*d)+f*(+e*c*u-e*o*m-s*a*u+i*a*m+s*o*d-i*c*d)+p*(-r*o*d-e*l*u+e*o*h+r*a*u-i*a*h+i*l*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],d=t[8],u=t[9],h=t[10],m=t[11],g=t[12],_=t[13],f=t[14],p=t[15],E=u*f*c-_*h*c+_*l*m-o*f*m-u*l*p+o*h*p,M=g*h*c-d*f*c-g*l*m+a*f*m+d*l*p-a*h*p,w=d*_*c-g*u*c+g*o*m-a*_*m-d*o*p+a*u*p,I=g*u*l-d*_*l-g*o*h+a*_*h+d*o*f-a*u*f,T=e*E+i*M+r*w+s*I;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return t[0]=E*C,t[1]=(_*h*s-u*f*s-_*r*m+i*f*m+u*r*p-i*h*p)*C,t[2]=(o*f*s-_*l*s+_*r*c-i*f*c-o*r*p+i*l*p)*C,t[3]=(u*l*s-o*h*s-u*r*c+i*h*c+o*r*m-i*l*m)*C,t[4]=M*C,t[5]=(d*f*s-g*h*s+g*r*m-e*f*m-d*r*p+e*h*p)*C,t[6]=(g*l*s-a*f*s-g*r*c+e*f*c+a*r*p-e*l*p)*C,t[7]=(a*h*s-d*l*s+d*r*c-e*h*c-a*r*m+e*l*m)*C,t[8]=w*C,t[9]=(g*u*s-d*_*s-g*i*m+e*_*m+d*i*p-e*u*p)*C,t[10]=(a*_*s-g*o*s+g*i*c-e*_*c-a*i*p+e*o*p)*C,t[11]=(d*o*s-a*u*s-d*i*c+e*u*c+a*i*m-e*o*m)*C,t[12]=I*C,t[13]=(d*_*r-g*u*r+g*i*h-e*_*h-d*i*f+e*u*f)*C,t[14]=(g*o*r-a*_*r-g*i*l+e*_*l+a*i*f-e*o*f)*C,t[15]=(a*u*r-d*o*r+d*i*l-e*u*l-a*i*h+e*o*h)*C,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,a=t.x,o=t.y,l=t.z,c=s*a,d=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+i,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,a){return this.set(1,i,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,d=a+a,u=o+o,h=s*c,m=s*d,g=s*u,_=a*d,f=a*u,p=o*u,E=l*c,M=l*d,w=l*u,I=i.x,T=i.y,C=i.z;return r[0]=(1-(_+p))*I,r[1]=(m+w)*I,r[2]=(g-M)*I,r[3]=0,r[4]=(m-w)*T,r[5]=(1-(h+p))*T,r[6]=(f+E)*T,r[7]=0,r[8]=(g+M)*C,r[9]=(f-E)*C,r[10]=(1-(h+_))*C,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=yi.set(r[0],r[1],r[2]).length();const a=yi.set(r[4],r[5],r[6]).length(),o=yi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],We.copy(this);const c=1/s,d=1/a,u=1/o;return We.elements[0]*=c,We.elements[1]*=c,We.elements[2]*=c,We.elements[4]*=d,We.elements[5]*=d,We.elements[6]*=d,We.elements[8]*=u,We.elements[9]*=u,We.elements[10]*=u,e.setFromRotationMatrix(We),i.x=s,i.y=a,i.z=o,this}makePerspective(t,e,i,r,s,a,o=xn){const l=this.elements,c=2*s/(e-t),d=2*s/(i-r),u=(e+t)/(e-t),h=(i+r)/(i-r);let m,g;if(o===xn)m=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===_s)m=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,a,o=xn){const l=this.elements,c=1/(e-t),d=1/(i-r),u=1/(a-s),h=(e+t)*c,m=(i+r)*d;let g,_;if(o===xn)g=(a+s)*u,_=-2*u;else if(o===_s)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const yi=new P,We=new Kt,th=new P(0,0,0),eh=new P(1,1,1),bn=new P,zr=new P,be=new P,ol=new Kt,ll=new Mr;class qe{constructor(t=0,e=0,i=0,r=qe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],u=r[2],h=r[6],m=r[10];switch(e){case"XYZ":this._y=Math.asin(Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ol.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ol,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ll.setFromEuler(this),this.setFromQuaternion(ll,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qe.DEFAULT_ORDER="XYZ";class Nc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let nh=0;const cl=new P,Ei=new Mr,un=new Kt,kr=new P,or=new P,ih=new P,rh=new Mr,dl=new P(1,0,0),ul=new P(0,1,0),hl=new P(0,0,1),fl={type:"added"},sh={type:"removed"},wi={type:"childadded",child:null},Qs={type:"childremoved",child:null};class ae extends Ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nh++}),this.uuid=Sr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ae.DEFAULT_UP.clone();const t=new P,e=new qe,i=new Mr,r=new P(1,1,1);function s(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Kt},normalMatrix:{value:new At}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=ae.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.premultiply(Ei),this}rotateX(t){return this.rotateOnAxis(dl,t)}rotateY(t){return this.rotateOnAxis(ul,t)}rotateZ(t){return this.rotateOnAxis(hl,t)}translateOnAxis(t,e){return cl.copy(t).applyQuaternion(this.quaternion),this.position.add(cl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(dl,t)}translateY(t){return this.translateOnAxis(ul,t)}translateZ(t){return this.translateOnAxis(hl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?kr.copy(t):kr.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),or.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(or,kr,this.up):un.lookAt(kr,or,this.up),this.quaternion.setFromRotationMatrix(un),r&&(un.extractRotation(r.matrixWorld),Ei.setFromRotationMatrix(un),this.quaternion.premultiply(Ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(fl),wi.child=t,this.dispatchEvent(wi),wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(sh),Qs.child=t,this.dispatchEvent(Qs),Qs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),un.multiply(t.parent.matrixWorld)),t.applyMatrix4(un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(fl),wi.child=t,this.dispatchEvent(wi),wi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,t,ih),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,rh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++){const s=e[i];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),d=a(t.images),u=a(t.shapes),h=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}ae.DEFAULT_UP=new P(0,1,0);ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xe=new P,hn=new P,ta=new P,fn=new P,Ti=new P,bi=new P,pl=new P,ea=new P,na=new P,ia=new P;class en{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),Xe.subVectors(t,e),r.cross(Xe);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){Xe.subVectors(r,e),hn.subVectors(i,e),ta.subVectors(t,e);const a=Xe.dot(Xe),o=Xe.dot(hn),l=Xe.dot(ta),c=hn.dot(hn),d=hn.dot(ta),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const h=1/u,m=(c*l-o*d)*h,g=(a*d-o*l)*h;return s.set(1-m-g,g,m)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,fn)===null?!1:fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getInterpolation(t,e,i,r,s,a,o,l){return this.getBarycoord(t,e,i,r,fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,fn.x),l.addScaledVector(a,fn.y),l.addScaledVector(o,fn.z),l)}static isFrontFacing(t,e,i,r){return Xe.subVectors(i,e),hn.subVectors(t,e),Xe.cross(hn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xe.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),Xe.cross(hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return en.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return en.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return en.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return en.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return en.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let a,o;Ti.subVectors(r,i),bi.subVectors(s,i),ea.subVectors(t,i);const l=Ti.dot(ea),c=bi.dot(ea);if(l<=0&&c<=0)return e.copy(i);na.subVectors(t,r);const d=Ti.dot(na),u=bi.dot(na);if(d>=0&&u<=d)return e.copy(r);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),e.copy(i).addScaledVector(Ti,a);ia.subVectors(t,s);const m=Ti.dot(ia),g=bi.dot(ia);if(g>=0&&m<=g)return e.copy(s);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(bi,o);const f=d*g-m*u;if(f<=0&&u-d>=0&&m-g>=0)return pl.subVectors(s,r),o=(u-d)/(u-d+(m-g)),e.copy(r).addScaledVector(pl,o);const p=1/(f+_+h);return a=_*p,o=h*p,e.copy(i).addScaledVector(Ti,a).addScaledVector(bi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Fc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},Hr={h:0,s:0,l:0};function ra(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class pt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Xt.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=Xt.workingColorSpace){if(t=Wu(t,1),e=Ee(e,0,1),i=Ee(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,a=2*i-s;this.r=ra(a,s,t+1/3),this.g=ra(a,s,t),this.b=ra(a,s,t-1/3)}return Xt.toWorkingColorSpace(this,r),this}setStyle(t,e=Je){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Je){const i=Fc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Oi(t.r),this.g=Oi(t.g),this.b=Oi(t.b),this}copyLinearToSRGB(t){return this.r=Xs(t.r),this.g=Xs(t.g),this.b=Xs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Je){return Xt.fromWorkingColorSpace(me.copy(this),t),Math.round(Ee(me.r*255,0,255))*65536+Math.round(Ee(me.g*255,0,255))*256+Math.round(Ee(me.b*255,0,255))}getHexString(t=Je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.fromWorkingColorSpace(me.copy(this),e);const i=me.r,r=me.g,s=me.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,e=Xt.workingColorSpace){return Xt.fromWorkingColorSpace(me.copy(this),e),t.r=me.r,t.g=me.g,t.b=me.b,t}getStyle(t=Je){Xt.fromWorkingColorSpace(me.copy(this),t);const e=me.r,i=me.g,r=me.b;return t!==Je?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(An),this.setHSL(An.h+t,An.s+e,An.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(An),t.getHSL(Hr);const i=Vs(An.h,Hr.h,e),r=Vs(An.s,Hr.s,e),s=Vs(An.l,Hr.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const me=new pt;pt.NAMES=Fc;let ah=0;class an extends Ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ah++}),this.uuid=Sr(),this.name="",this.type="Material",this.blending=Bn,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ea,this.blendDst=wa,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pt(0,0,0),this.blendAlpha=0,this.depthFunc=hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_i,this.stencilZFail=_i,this.stencilZPass=_i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Bn&&(i.blending=this.blending),this.side!==Gn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ea&&(i.blendSrc=this.blendSrc),this.blendDst!==wa&&(i.blendDst=this.blendDst),this.blendEquation!==ii&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==hs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_i&&(i.stencilFail=this.stencilFail),this.stencilZFail!==_i&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==_i&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ja extends an{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qe,this.combine=$a,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ie=new P,Gr=new Ot;class Le{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=el,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Ic("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Gr.fromBufferAttribute(this,e),Gr.applyMatrix3(t),this.setXY(e,Gr.x,Gr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ie.fromBufferAttribute(this,e),ie.applyMatrix3(t),this.setXYZ(e,ie.x,ie.y,ie.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ie.fromBufferAttribute(this,e),ie.applyMatrix4(t),this.setXYZ(e,ie.x,ie.y,ie.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ie.fromBufferAttribute(this,e),ie.applyNormalMatrix(t),this.setXYZ(e,ie.x,ie.y,ie.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ie.fromBufferAttribute(this,e),ie.transformDirection(t),this.setXYZ(e,ie.x,ie.y,ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=rr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Me(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=rr(e,this.array)),e}setX(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=rr(e,this.array)),e}setY(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=rr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=rr(e,this.array)),e}setW(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),i=Me(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),i=Me(i,this.array),r=Me(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),i=Me(i,this.array),r=Me(r,this.array),s=Me(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==el&&(t.usage=this.usage),t}}class Oc extends Le{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Bc extends Le{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Qt extends Le{constructor(t,e,i){super(new Float32Array(t),e,i)}}let oh=0;const Ie=new Kt,sa=new ae,Ai=new P,Ae=new yr,lr=new yr,ue=new P;class Se extends Ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=Sr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Pc(t)?Bc:Oc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new At().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ie.makeRotationFromQuaternion(t),this.applyMatrix4(Ie),this}rotateX(t){return Ie.makeRotationX(t),this.applyMatrix4(Ie),this}rotateY(t){return Ie.makeRotationY(t),this.applyMatrix4(Ie),this}rotateZ(t){return Ie.makeRotationZ(t),this.applyMatrix4(Ie),this}translate(t,e,i){return Ie.makeTranslation(t,e,i),this.applyMatrix4(Ie),this}scale(t,e,i){return Ie.makeScale(t,e,i),this.applyMatrix4(Ie),this}lookAt(t){return sa.lookAt(t),sa.updateMatrix(),this.applyMatrix4(sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ai).negate(),this.translate(Ai.x,Ai.y,Ai.z),this}setFromPoints(t){const e=[];for(let i=0,r=t.length;i<r;i++){const s=t[i];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Qt(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];Ae.setFromBufferAttribute(s),this.morphTargetsRelative?(ue.addVectors(this.boundingBox.min,Ae.min),this.boundingBox.expandByPoint(ue),ue.addVectors(this.boundingBox.max,Ae.max),this.boundingBox.expandByPoint(ue)):(this.boundingBox.expandByPoint(Ae.min),this.boundingBox.expandByPoint(Ae.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Er);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const i=this.boundingSphere.center;if(Ae.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];lr.setFromBufferAttribute(o),this.morphTargetsRelative?(ue.addVectors(Ae.min,lr.min),Ae.expandByPoint(ue),ue.addVectors(Ae.max,lr.max),Ae.expandByPoint(ue)):(Ae.expandByPoint(lr.min),Ae.expandByPoint(lr.max))}Ae.getCenter(i);let r=0;for(let s=0,a=t.count;s<a;s++)ue.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(ue));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)ue.fromBufferAttribute(o,c),l&&(Ai.fromBufferAttribute(t,c),ue.add(Ai)),r=Math.max(r,i.distanceToSquared(ue))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Le(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<i.count;U++)o[U]=new P,l[U]=new P;const c=new P,d=new P,u=new P,h=new Ot,m=new Ot,g=new Ot,_=new P,f=new P;function p(U,v,x){c.fromBufferAttribute(i,U),d.fromBufferAttribute(i,v),u.fromBufferAttribute(i,x),h.fromBufferAttribute(s,U),m.fromBufferAttribute(s,v),g.fromBufferAttribute(s,x),d.sub(c),u.sub(c),m.sub(h),g.sub(h);const A=1/(m.x*g.y-g.x*m.y);isFinite(A)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(A),f.copy(u).multiplyScalar(m.x).addScaledVector(d,-g.x).multiplyScalar(A),o[U].add(_),o[v].add(_),o[x].add(_),l[U].add(f),l[v].add(f),l[x].add(f))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let U=0,v=E.length;U<v;++U){const x=E[U],A=x.start,B=x.count;for(let F=A,V=A+B;F<V;F+=3)p(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const M=new P,w=new P,I=new P,T=new P;function C(U){I.fromBufferAttribute(r,U),T.copy(I);const v=o[U];M.copy(v),M.sub(I.multiplyScalar(I.dot(v))).normalize(),w.crossVectors(T,v);const A=w.dot(l[U])<0?-1:1;a.setXYZW(U,M.x,M.y,M.z,A)}for(let U=0,v=E.length;U<v;++U){const x=E[U],A=x.start,B=x.count;for(let F=A,V=A+B;F<V;F+=3)C(t.getX(F+0)),C(t.getX(F+1)),C(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Le(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new P,s=new P,a=new P,o=new P,l=new P,c=new P,d=new P,u=new P;if(t)for(let h=0,m=t.count;h<m;h+=3){const g=t.getX(h+0),_=t.getX(h+1),f=t.getX(h+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,f),d.subVectors(a,s),u.subVectors(r,s),d.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,f),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(f,c.x,c.y,c.z)}else for(let h=0,m=e.count;h<m;h+=3)r.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),d.subVectors(a,s),u.subVectors(r,s),d.cross(u),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ue.fromBufferAttribute(t,e),ue.normalize(),t.setXYZ(e,ue.x,ue.y,ue.z)}toNonIndexed(){function t(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let m=0,g=0;for(let _=0,f=l.length;_<f;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*d;for(let p=0;p<d;p++)h[g++]=c[m++]}return new Le(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=t(l,i);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],m=t(h,i);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const m=c[u];d.push(m.toJSON(t.data))}d.length>0&&(r[l]=d,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const r=t.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(e))}const s=t.morphAttributes;for(const c in s){const d=[],u=s[c];for(let h=0,m=u.length;h<m;h++)d.push(u[h].clone(e));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ml=new Kt,Zn=new Ka,Vr=new Er,gl=new P,Ci=new P,Ri=new P,Li=new P,aa=new P,Wr=new P,Xr=new Ot,$r=new Ot,qr=new Ot,_l=new P,vl=new P,xl=new P,Yr=new P,Kr=new P;class ve extends ae{constructor(t=new Se,e=new ja){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){Wr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],u=s[l];d!==0&&(aa.fromBufferAttribute(u,t),a?Wr.addScaledVector(aa,d):Wr.addScaledVector(aa.sub(e),d))}e.add(Wr)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Vr.copy(i.boundingSphere),Vr.applyMatrix4(s),Zn.copy(t.ray).recast(t.near),!(Vr.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Vr,gl)===null||Zn.origin.distanceToSquared(gl)>(t.far-t.near)**2))&&(ml.copy(s).invert(),Zn.copy(t.ray).applyMatrix4(ml),!(i.boundingBox!==null&&Zn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Zn)))}_computeIntersections(t,e,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,u=s.attributes.normal,h=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const f=h[g],p=a[f.materialIndex],E=Math.max(f.start,m.start),M=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let w=E,I=M;w<I;w+=3){const T=o.getX(w),C=o.getX(w+1),U=o.getX(w+2);r=jr(this,p,t,i,c,d,u,T,C,U),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=f.materialIndex,e.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let f=g,p=_;f<p;f+=3){const E=o.getX(f),M=o.getX(f+1),w=o.getX(f+2);r=jr(this,a,t,i,c,d,u,E,M,w),r&&(r.faceIndex=Math.floor(f/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const f=h[g],p=a[f.materialIndex],E=Math.max(f.start,m.start),M=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let w=E,I=M;w<I;w+=3){const T=w,C=w+1,U=w+2;r=jr(this,p,t,i,c,d,u,T,C,U),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=f.materialIndex,e.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let f=g,p=_;f<p;f+=3){const E=f,M=f+1,w=f+2;r=jr(this,a,t,i,c,d,u,E,M,w),r&&(r.faceIndex=Math.floor(f/3),e.push(r))}}}}function lh(n,t,e,i,r,s,a,o){let l;if(t.side===we?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,t.side===Gn,o),l===null)return null;Kr.copy(o),Kr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Kr);return c<e.near||c>e.far?null:{distance:c,point:Kr.clone(),object:n}}function jr(n,t,e,i,r,s,a,o,l,c){n.getVertexPosition(o,Ci),n.getVertexPosition(l,Ri),n.getVertexPosition(c,Li);const d=lh(n,t,e,i,Ci,Ri,Li,Yr);if(d){r&&(Xr.fromBufferAttribute(r,o),$r.fromBufferAttribute(r,l),qr.fromBufferAttribute(r,c),d.uv=en.getInterpolation(Yr,Ci,Ri,Li,Xr,$r,qr,new Ot)),s&&(Xr.fromBufferAttribute(s,o),$r.fromBufferAttribute(s,l),qr.fromBufferAttribute(s,c),d.uv1=en.getInterpolation(Yr,Ci,Ri,Li,Xr,$r,qr,new Ot)),a&&(_l.fromBufferAttribute(a,o),vl.fromBufferAttribute(a,l),xl.fromBufferAttribute(a,c),d.normal=en.getInterpolation(Yr,Ci,Ri,Li,_l,vl,xl,new P),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new P,materialIndex:0};en.getNormal(Ci,Ri,Li,u.normal),d.face=u}return d}class wr extends Se{constructor(t=1,e=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],u=[];let h=0,m=0;g("z","y","x",-1,-1,i,e,t,a,s,0),g("z","y","x",1,-1,i,e,-t,a,s,1),g("x","z","y",1,1,t,i,e,r,a,2),g("x","z","y",1,-1,t,i,-e,r,a,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Qt(c,3)),this.setAttribute("normal",new Qt(d,3)),this.setAttribute("uv",new Qt(u,2));function g(_,f,p,E,M,w,I,T,C,U,v){const x=w/C,A=I/U,B=w/2,F=I/2,V=T/2,$=C+1,H=U+1;let Z=0,G=0;const dt=new P;for(let ct=0;ct<H;ct++){const ut=ct*A-F;for(let Dt=0;Dt<$;Dt++){const Gt=Dt*x-B;dt[_]=Gt*E,dt[f]=ut*M,dt[p]=V,c.push(dt.x,dt.y,dt.z),dt[_]=0,dt[f]=0,dt[p]=T>0?1:-1,d.push(dt.x,dt.y,dt.z),u.push(Dt/C),u.push(1-ct/U),Z+=1}}for(let ct=0;ct<U;ct++)for(let ut=0;ut<C;ut++){const Dt=h+ut+$*ct,Gt=h+ut+$*(ct+1),W=h+(ut+1)+$*(ct+1),J=h+(ut+1)+$*ct;l.push(Dt,Gt,J),l.push(Gt,W,J),G+=6}o.addGroup(m,G,v),m+=G,h+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function $i(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function _e(n){const t={};for(let e=0;e<n.length;e++){const i=$i(n[e]);for(const r in i)t[r]=i[r]}return t}function ch(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function zc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const dh={clone:$i,merge:_e};var uh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ye extends an{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uh,this.fragmentShader=hh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=$i(t.uniforms),this.uniformsGroups=ch(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class kc extends ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=xn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Cn=new P,Sl=new Ot,Ml=new Ot;class Oe extends kc{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ra*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Gs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ra*2*Math.atan(Math.tan(Gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Cn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Cn.x,Cn.y).multiplyScalar(-t/Cn.z),Cn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Cn.x,Cn.y).multiplyScalar(-t/Cn.z)}getViewSize(t,e){return this.getViewBounds(t,Sl,Ml),e.subVectors(Ml,Sl)}setViewOffset(t,e,i,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Gs*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Pi=-90,Ii=1;class fh extends ae{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Oe(Pi,Ii,t,e);r.layers=this.layers,this.add(r);const s=new Oe(Pi,Ii,t,e);s.layers=this.layers,this.add(s);const a=new Oe(Pi,Ii,t,e);a.layers=this.layers,this.add(a);const o=new Oe(Pi,Ii,t,e);o.layers=this.layers,this.add(o);const l=new Oe(Pi,Ii,t,e);l.layers=this.layers,this.add(l);const c=new Oe(Pi,Ii,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===xn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===_s)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,u=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,a),t.setRenderTarget(i,2,r),t.render(e,o),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,d),t.setRenderTarget(u,h,m),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Hc extends xe{constructor(t,e,i,r,s,a,o,l,c,d){t=t!==void 0?t:[],e=e!==void 0?e:Hi,super(t,e,i,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ph extends hi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Hc(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Re}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new wr(5,5,5),s=new Ye({name:"CubemapFromEquirect",uniforms:$i(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:we,blending:Sn});s.uniforms.tEquirect.value=e;const a=new ve(r,s),o=e.minFilter;return e.minFilter===oi&&(e.minFilter=Re),new fh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,r){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,r);t.setRenderTarget(s)}}const oa=new P,mh=new P,gh=new At;class ei{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=oa.subVectors(i,e).cross(mh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(oa),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||gh.getNormalMatrix(t),r=this.coplanarPoint(oa).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new Er,Zr=new P;class Za{constructor(t=new ei,e=new ei,i=new ei,r=new ei,s=new ei,a=new ei){this.planes=[t,e,i,r,s,a]}set(t,e,i,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=xn){const i=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],d=r[5],u=r[6],h=r[7],m=r[8],g=r[9],_=r[10],f=r[11],p=r[12],E=r[13],M=r[14],w=r[15];if(i[0].setComponents(l-s,h-c,f-m,w-p).normalize(),i[1].setComponents(l+s,h+c,f+m,w+p).normalize(),i[2].setComponents(l+a,h+d,f+g,w+E).normalize(),i[3].setComponents(l-a,h-d,f-g,w-E).normalize(),i[4].setComponents(l-o,h-u,f-_,w-M).normalize(),e===xn)i[5].setComponents(l+o,h+u,f+_,w+M).normalize();else if(e===_s)i[5].setComponents(o,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(t){return Jn.center.set(0,0,0),Jn.radius=.7071067811865476,Jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(Zr.x=r.normal.x>0?t.max.x:t.min.x,Zr.y=r.normal.y>0?t.max.y:t.min.y,Zr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Zr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Gc(){let n=null,t=!1,e=null,i=null;function r(s,a){e(s,a),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function _h(n){const t=new WeakMap;function e(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,d),o.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const d=l.array,u=l._updateRange,h=l.updateRanges;if(n.bindBuffer(c,o),u.count===-1&&h.length===0&&n.bufferSubData(c,0,d),h.length!==0){for(let m=0,g=h.length;m<g;m++){const _=h[m];n.bufferSubData(c,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(n.bufferSubData(c,u.offset*d.BYTES_PER_ELEMENT,d,u.offset,u.count),u.count=-1),l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class gi extends Se{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(i),l=Math.floor(r),c=o+1,d=l+1,u=t/o,h=e/l,m=[],g=[],_=[],f=[];for(let p=0;p<d;p++){const E=p*h-a;for(let M=0;M<c;M++){const w=M*u-s;g.push(w,-E,0),_.push(0,0,1),f.push(M/o),f.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<o;E++){const M=E+c*p,w=E+c*(p+1),I=E+1+c*(p+1),T=E+1+c*p;m.push(M,w,T),m.push(w,I,T)}this.setIndex(m),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gi(t.width,t.height,t.widthSegments,t.heightSegments)}}var vh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xh=`#ifdef USE_ALPHAHASH
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
#endif`,Sh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Mh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Eh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wh=`#ifdef USE_AOMAP
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
#endif`,Th=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bh=`#ifdef USE_BATCHING
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
#endif`,Ah=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Ch=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Lh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ph=`#ifdef USE_IRIDESCENCE
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
#endif`,Ih=`#ifdef USE_BUMPMAP
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
#endif`,Dh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Uh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Oh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,kh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Hh=`#define PI 3.141592653589793
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
} // validated`,Gh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Vh=`vec3 transformedNormal = objectNormal;
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
#endif`,Wh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$h=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kh=`
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
}`,jh=`#ifdef USE_ENVMAP
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
#endif`,Zh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Jh=`#ifdef USE_ENVMAP
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
#endif`,Qh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tf=`#ifdef USE_ENVMAP
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
#endif`,ef=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,af=`#ifdef USE_GRADIENTMAP
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
}`,of=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,df=`uniform bool receiveShadow;
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
#endif`,uf=`#ifdef USE_ENVMAP
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
#endif`,hf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ff=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,mf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gf=`PhysicalMaterial material;
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
#endif`,_f=`struct PhysicalMaterial {
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
}`,vf=`
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
#endif`,xf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ef=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Af=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Cf=`#if defined( USE_POINTS_UV )
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
#endif`,Rf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,If=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Df=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uf=`#ifdef USE_MORPHTARGETS
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
#endif`,Nf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ff=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Of=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Hf=`#ifdef USE_NORMALMAP
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
#endif`,Gf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$f=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ep=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,np=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ip=`float getShadowMask() {
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
}`,rp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sp=`#ifdef USE_SKINNING
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
#endif`,ap=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,op=`#ifdef USE_SKINNING
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
#endif`,lp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,up=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hp=`#ifdef USE_TRANSMISSION
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
#endif`,fp=`#ifdef USE_TRANSMISSION
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
#endif`,pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_p=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xp=`uniform sampler2D t2D;
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
}`,Sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`#include <common>
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
}`,Tp=`#if DEPTH_PACKING == 3200
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
}`,bp=`#define DISTANCE
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
}`,Ap=`#define DISTANCE
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
}`,Cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lp=`uniform float scale;
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
}`,Pp=`uniform vec3 diffuse;
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
}`,Ip=`#include <common>
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
}`,Dp=`uniform vec3 diffuse;
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
}`,Up=`#define LAMBERT
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
}`,Np=`#define LAMBERT
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
}`,Fp=`#define MATCAP
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
}`,Op=`#define MATCAP
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
}`,Bp=`#define NORMAL
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
}`,zp=`#define NORMAL
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
}`,kp=`#define PHONG
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
}`,Hp=`#define PHONG
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
}`,Gp=`#define STANDARD
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
}`,Vp=`#define STANDARD
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
}`,Wp=`#define TOON
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
}`,Xp=`#define TOON
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
}`,$p=`uniform float size;
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
}`,qp=`uniform vec3 diffuse;
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
}`,Yp=`#include <common>
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
}`,Kp=`uniform vec3 color;
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
}`,jp=`uniform float rotation;
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
}`,Zp=`uniform vec3 diffuse;
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
}`,bt={alphahash_fragment:vh,alphahash_pars_fragment:xh,alphamap_fragment:Sh,alphamap_pars_fragment:Mh,alphatest_fragment:yh,alphatest_pars_fragment:Eh,aomap_fragment:wh,aomap_pars_fragment:Th,batching_pars_vertex:bh,batching_vertex:Ah,begin_vertex:Ch,beginnormal_vertex:Rh,bsdfs:Lh,iridescence_fragment:Ph,bumpmap_pars_fragment:Ih,clipping_planes_fragment:Dh,clipping_planes_pars_fragment:Uh,clipping_planes_pars_vertex:Nh,clipping_planes_vertex:Fh,color_fragment:Oh,color_pars_fragment:Bh,color_pars_vertex:zh,color_vertex:kh,common:Hh,cube_uv_reflection_fragment:Gh,defaultnormal_vertex:Vh,displacementmap_pars_vertex:Wh,displacementmap_vertex:Xh,emissivemap_fragment:$h,emissivemap_pars_fragment:qh,colorspace_fragment:Yh,colorspace_pars_fragment:Kh,envmap_fragment:jh,envmap_common_pars_fragment:Zh,envmap_pars_fragment:Jh,envmap_pars_vertex:Qh,envmap_physical_pars_fragment:uf,envmap_vertex:tf,fog_vertex:ef,fog_pars_vertex:nf,fog_fragment:rf,fog_pars_fragment:sf,gradientmap_pars_fragment:af,lightmap_pars_fragment:of,lights_lambert_fragment:lf,lights_lambert_pars_fragment:cf,lights_pars_begin:df,lights_toon_fragment:hf,lights_toon_pars_fragment:ff,lights_phong_fragment:pf,lights_phong_pars_fragment:mf,lights_physical_fragment:gf,lights_physical_pars_fragment:_f,lights_fragment_begin:vf,lights_fragment_maps:xf,lights_fragment_end:Sf,logdepthbuf_fragment:Mf,logdepthbuf_pars_fragment:yf,logdepthbuf_pars_vertex:Ef,logdepthbuf_vertex:wf,map_fragment:Tf,map_pars_fragment:bf,map_particle_fragment:Af,map_particle_pars_fragment:Cf,metalnessmap_fragment:Rf,metalnessmap_pars_fragment:Lf,morphinstance_vertex:Pf,morphcolor_vertex:If,morphnormal_vertex:Df,morphtarget_pars_vertex:Uf,morphtarget_vertex:Nf,normal_fragment_begin:Ff,normal_fragment_maps:Of,normal_pars_fragment:Bf,normal_pars_vertex:zf,normal_vertex:kf,normalmap_pars_fragment:Hf,clearcoat_normal_fragment_begin:Gf,clearcoat_normal_fragment_maps:Vf,clearcoat_pars_fragment:Wf,iridescence_pars_fragment:Xf,opaque_fragment:$f,packing:qf,premultiplied_alpha_fragment:Yf,project_vertex:Kf,dithering_fragment:jf,dithering_pars_fragment:Zf,roughnessmap_fragment:Jf,roughnessmap_pars_fragment:Qf,shadowmap_pars_fragment:tp,shadowmap_pars_vertex:ep,shadowmap_vertex:np,shadowmask_pars_fragment:ip,skinbase_vertex:rp,skinning_pars_vertex:sp,skinning_vertex:ap,skinnormal_vertex:op,specularmap_fragment:lp,specularmap_pars_fragment:cp,tonemapping_fragment:dp,tonemapping_pars_fragment:up,transmission_fragment:hp,transmission_pars_fragment:fp,uv_pars_fragment:pp,uv_pars_vertex:mp,uv_vertex:gp,worldpos_vertex:_p,background_vert:vp,background_frag:xp,backgroundCube_vert:Sp,backgroundCube_frag:Mp,cube_vert:yp,cube_frag:Ep,depth_vert:wp,depth_frag:Tp,distanceRGBA_vert:bp,distanceRGBA_frag:Ap,equirect_vert:Cp,equirect_frag:Rp,linedashed_vert:Lp,linedashed_frag:Pp,meshbasic_vert:Ip,meshbasic_frag:Dp,meshlambert_vert:Up,meshlambert_frag:Np,meshmatcap_vert:Fp,meshmatcap_frag:Op,meshnormal_vert:Bp,meshnormal_frag:zp,meshphong_vert:kp,meshphong_frag:Hp,meshphysical_vert:Gp,meshphysical_frag:Vp,meshtoon_vert:Wp,meshtoon_frag:Xp,points_vert:$p,points_frag:qp,shadow_vert:Yp,shadow_frag:Kp,sprite_vert:jp,sprite_frag:Zp},nt={common:{diffuse:{value:new pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new At},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new At}},envmap:{envMap:{value:null},envMapRotation:{value:new At},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new At}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new At}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new At},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new At},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new At},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new At}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new At}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new At}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0},uvTransform:{value:new At}},sprite:{diffuse:{value:new pt(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new At},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0}}},Qe={basic:{uniforms:_e([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:bt.meshbasic_vert,fragmentShader:bt.meshbasic_frag},lambert:{uniforms:_e([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new pt(0)}}]),vertexShader:bt.meshlambert_vert,fragmentShader:bt.meshlambert_frag},phong:{uniforms:_e([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new pt(0)},specular:{value:new pt(1118481)},shininess:{value:30}}]),vertexShader:bt.meshphong_vert,fragmentShader:bt.meshphong_frag},standard:{uniforms:_e([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag},toon:{uniforms:_e([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new pt(0)}}]),vertexShader:bt.meshtoon_vert,fragmentShader:bt.meshtoon_frag},matcap:{uniforms:_e([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:bt.meshmatcap_vert,fragmentShader:bt.meshmatcap_frag},points:{uniforms:_e([nt.points,nt.fog]),vertexShader:bt.points_vert,fragmentShader:bt.points_frag},dashed:{uniforms:_e([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:bt.linedashed_vert,fragmentShader:bt.linedashed_frag},depth:{uniforms:_e([nt.common,nt.displacementmap]),vertexShader:bt.depth_vert,fragmentShader:bt.depth_frag},normal:{uniforms:_e([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:bt.meshnormal_vert,fragmentShader:bt.meshnormal_frag},sprite:{uniforms:_e([nt.sprite,nt.fog]),vertexShader:bt.sprite_vert,fragmentShader:bt.sprite_frag},background:{uniforms:{uvTransform:{value:new At},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:bt.background_vert,fragmentShader:bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new At}},vertexShader:bt.backgroundCube_vert,fragmentShader:bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:bt.cube_vert,fragmentShader:bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:bt.equirect_vert,fragmentShader:bt.equirect_frag},distanceRGBA:{uniforms:_e([nt.common,nt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:bt.distanceRGBA_vert,fragmentShader:bt.distanceRGBA_frag},shadow:{uniforms:_e([nt.lights,nt.fog,{color:{value:new pt(0)},opacity:{value:1}}]),vertexShader:bt.shadow_vert,fragmentShader:bt.shadow_frag}};Qe.physical={uniforms:_e([Qe.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new At},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new At},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new At},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new At},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new At},sheen:{value:0},sheenColor:{value:new pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new At},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new At},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new At},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new At},attenuationDistance:{value:0},attenuationColor:{value:new pt(0)},specularColor:{value:new pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new At},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new At},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new At}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag};const Jr={r:0,b:0,g:0},Qn=new qe,Jp=new Kt;function Qp(n,t,e,i,r,s,a){const o=new pt(0);let l=s===!0?0:1,c,d,u=null,h=0,m=null;function g(E){let M=E.isScene===!0?E.background:null;return M&&M.isTexture&&(M=(E.backgroundBlurriness>0?e:t).get(M)),M}function _(E){let M=!1;const w=g(E);w===null?p(o,l):w&&w.isColor&&(p(w,1),M=!0);const I=n.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function f(E,M){const w=g(M);w&&(w.isCubeTexture||w.mapping===Ts)?(d===void 0&&(d=new ve(new wr(1,1,1),new Ye({name:"BackgroundCubeMaterial",uniforms:$i(Qe.backgroundCube.uniforms),vertexShader:Qe.backgroundCube.vertexShader,fragmentShader:Qe.backgroundCube.fragmentShader,side:we,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(I,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),Qn.copy(M.backgroundRotation),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),d.material.uniforms.envMap.value=w,d.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Jp.makeRotationFromEuler(Qn)),d.material.toneMapped=Xt.getTransfer(w.colorSpace)!==Yt,(u!==w||h!==w.version||m!==n.toneMapping)&&(d.material.needsUpdate=!0,u=w,h=w.version,m=n.toneMapping),d.layers.enableAll(),E.unshift(d,d.geometry,d.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new ve(new gi(2,2),new Ye({name:"BackgroundMaterial",uniforms:$i(Qe.background.uniforms),vertexShader:Qe.background.vertexShader,fragmentShader:Qe.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(w.colorSpace)!==Yt,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||h!==w.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,u=w,h=w.version,m=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,M){E.getRGB(Jr,zc(n)),i.buffers.color.setClear(Jr.r,Jr.g,Jr.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(E,M=1){o.set(E),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(o,l)},render:_,addToRenderList:f}}function tm(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(x,A,B,F,V){let $=!1;const H=u(F,B,A);s!==H&&(s=H,c(s.object)),$=m(x,F,B,V),$&&g(x,F,B,V),V!==null&&t.update(V,n.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,w(x,A,B,F),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return n.createVertexArray()}function c(x){return n.bindVertexArray(x)}function d(x){return n.deleteVertexArray(x)}function u(x,A,B){const F=B.wireframe===!0;let V=i[x.id];V===void 0&&(V={},i[x.id]=V);let $=V[A.id];$===void 0&&($={},V[A.id]=$);let H=$[F];return H===void 0&&(H=h(l()),$[F]=H),H}function h(x){const A=[],B=[],F=[];for(let V=0;V<e;V++)A[V]=0,B[V]=0,F[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:B,attributeDivisors:F,object:x,attributes:{},index:null}}function m(x,A,B,F){const V=s.attributes,$=A.attributes;let H=0;const Z=B.getAttributes();for(const G in Z)if(Z[G].location>=0){const ct=V[G];let ut=$[G];if(ut===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(ut=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(ut=x.instanceColor)),ct===void 0||ct.attribute!==ut||ut&&ct.data!==ut.data)return!0;H++}return s.attributesNum!==H||s.index!==F}function g(x,A,B,F){const V={},$=A.attributes;let H=0;const Z=B.getAttributes();for(const G in Z)if(Z[G].location>=0){let ct=$[G];ct===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(ct=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(ct=x.instanceColor));const ut={};ut.attribute=ct,ct&&ct.data&&(ut.data=ct.data),V[G]=ut,H++}s.attributes=V,s.attributesNum=H,s.index=F}function _(){const x=s.newAttributes;for(let A=0,B=x.length;A<B;A++)x[A]=0}function f(x){p(x,0)}function p(x,A){const B=s.newAttributes,F=s.enabledAttributes,V=s.attributeDivisors;B[x]=1,F[x]===0&&(n.enableVertexAttribArray(x),F[x]=1),V[x]!==A&&(n.vertexAttribDivisor(x,A),V[x]=A)}function E(){const x=s.newAttributes,A=s.enabledAttributes;for(let B=0,F=A.length;B<F;B++)A[B]!==x[B]&&(n.disableVertexAttribArray(B),A[B]=0)}function M(x,A,B,F,V,$,H){H===!0?n.vertexAttribIPointer(x,A,B,V,$):n.vertexAttribPointer(x,A,B,F,V,$)}function w(x,A,B,F){_();const V=F.attributes,$=B.getAttributes(),H=A.defaultAttributeValues;for(const Z in $){const G=$[Z];if(G.location>=0){let dt=V[Z];if(dt===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(dt=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(dt=x.instanceColor)),dt!==void 0){const ct=dt.normalized,ut=dt.itemSize,Dt=t.get(dt);if(Dt===void 0)continue;const Gt=Dt.buffer,W=Dt.type,J=Dt.bytesPerElement,ht=W===n.INT||W===n.UNSIGNED_INT||dt.gpuType===wc;if(dt.isInterleavedBufferAttribute){const st=dt.data,Pt=st.stride,Ct=dt.offset;if(st.isInstancedInterleavedBuffer){for(let zt=0;zt<G.locationSize;zt++)p(G.location+zt,st.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let zt=0;zt<G.locationSize;zt++)f(G.location+zt);n.bindBuffer(n.ARRAY_BUFFER,Gt);for(let zt=0;zt<G.locationSize;zt++)M(G.location+zt,ut/G.locationSize,W,ct,Pt*J,(Ct+ut/G.locationSize*zt)*J,ht)}else{if(dt.isInstancedBufferAttribute){for(let st=0;st<G.locationSize;st++)p(G.location+st,dt.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let st=0;st<G.locationSize;st++)f(G.location+st);n.bindBuffer(n.ARRAY_BUFFER,Gt);for(let st=0;st<G.locationSize;st++)M(G.location+st,ut/G.locationSize,W,ct,ut*J,ut/G.locationSize*st*J,ht)}}else if(H!==void 0){const ct=H[Z];if(ct!==void 0)switch(ct.length){case 2:n.vertexAttrib2fv(G.location,ct);break;case 3:n.vertexAttrib3fv(G.location,ct);break;case 4:n.vertexAttrib4fv(G.location,ct);break;default:n.vertexAttrib1fv(G.location,ct)}}}}E()}function I(){U();for(const x in i){const A=i[x];for(const B in A){const F=A[B];for(const V in F)d(F[V].object),delete F[V];delete A[B]}delete i[x]}}function T(x){if(i[x.id]===void 0)return;const A=i[x.id];for(const B in A){const F=A[B];for(const V in F)d(F[V].object),delete F[V];delete A[B]}delete i[x.id]}function C(x){for(const A in i){const B=i[A];if(B[x.id]===void 0)continue;const F=B[x.id];for(const V in F)d(F[V].object),delete F[V];delete B[x.id]}}function U(){v(),a=!0,s!==r&&(s=r,c(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:U,resetDefaultState:v,dispose:I,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:f,disableUnusedAttributes:E}}function em(n,t,e){let i;function r(c){i=c}function s(c,d){n.drawArrays(i,c,d),e.update(d,i,1)}function a(c,d,u){u!==0&&(n.drawArraysInstanced(i,c,d,u),e.update(d,i,u))}function o(c,d,u){if(u===0)return;const h=t.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<u;m++)this.render(c[m],d[m]);else{h.multiDrawArraysWEBGL(i,c,0,d,0,u);let m=0;for(let g=0;g<u;g++)m+=d[g];e.update(m,i,1)}}function l(c,d,u,h){if(u===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)a(c[g],d[g],h[g]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,d,0,h,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_];for(let _=0;_<h.length;_++)e.update(g,i,h[_])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function nm(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==nn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const C=T===bs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Vn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Dn&&!C)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=e.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=m>0,I=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:_,maxAttributes:f,maxVertexUniforms:p,maxVaryings:E,maxFragmentUniforms:M,vertexTextures:w,maxSamples:I}}function im(n){const t=this;let e=null,i=0,r=!1,s=!1;const a=new ei,o=new At,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const m=u.length!==0||h||i!==0||r;return r=h,i=u.length,m},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,h){e=d(u,h,0)},this.setState=function(u,h,m){const g=u.clippingPlanes,_=u.clipIntersection,f=u.clipShadows,p=n.get(u);if(!r||g===null||g.length===0||s&&!f)s?d(null):c();else{const E=s?0:i,M=E*4;let w=p.clippingState||null;l.value=w,w=d(g,h,M,m);for(let I=0;I!==M;++I)w[I]=e[I];p.clippingState=w,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(u,h,m,g){const _=u!==null?u.length:0;let f=null;if(_!==0){if(f=l.value,g!==!0||f===null){const p=m+_*4,E=h.matrixWorldInverse;o.getNormalMatrix(E),(f===null||f.length<p)&&(f=new Float32Array(p));for(let M=0,w=m;M!==_;++M,w+=4)a.copy(u[M]).applyMatrix4(E,o),a.normal.toArray(f,w),f[w+3]=a.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,f}}function rm(n){let t=new WeakMap;function e(a,o){return o===Ta?a.mapping=Hi:o===ba&&(a.mapping=Gi),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ta||o===ba)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ph(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",r),e(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class Ja extends kc{constructor(t=-1,e=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ni=4,yl=[.125,.215,.35,.446,.526,.582],ri=20,la=new Ja,El=new pt;let ca=null,da=0,ua=0,ha=!1;const ni=(1+Math.sqrt(5))/2,Di=1/ni,wl=[new P(-ni,Di,0),new P(ni,Di,0),new P(-Di,0,ni),new P(Di,0,ni),new P(0,ni,-Di),new P(0,ni,Di),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class Tl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){ca=this._renderer.getRenderTarget(),da=this._renderer.getActiveCubeFace(),ua=this._renderer.getActiveMipmapLevel(),ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Al(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ca,da,ua),this._renderer.xr.enabled=ha,t.scissorTest=!1,Qr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hi||t.mapping===Gi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ca=this._renderer.getRenderTarget(),da=this._renderer.getActiveCubeFace(),ua=this._renderer.getActiveMipmapLevel(),ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Re,minFilter:Re,generateMipmaps:!1,type:bs,format:nn,colorSpace:Xn,depthBuffer:!1},r=bl(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bl(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sm(s)),this._blurMaterial=am(s,t,e)}return r}_compileMaterial(t){const e=new ve(this._lodPlanes[0],t);this._renderer.compile(e,la)}_sceneToCubeUV(t,e,i,r){const o=new Oe(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(El),d.toneMapping=zn,d.autoClear=!1;const m=new ja({name:"PMREM.Background",side:we,depthWrite:!1,depthTest:!1}),g=new ve(new wr,m);let _=!1;const f=t.background;f?f.isColor&&(m.color.copy(f),t.background=null,_=!0):(m.color.copy(El),_=!0);for(let p=0;p<6;p++){const E=p%3;E===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):E===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const M=this._cubeSize;Qr(r,E*M,p>2?M:0,M,M),d.setRenderTarget(r),_&&d.render(g,o),d.render(t,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=u,t.background=f}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===Hi||t.mapping===Gi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Al());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new ve(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Qr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,la)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=wl[(r-s-1)%wl.length];this._blur(t,s-1,s,a,o)}e.autoClear=i}_blur(t,e,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,r,"latitudinal",s),this._halfBlur(a,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new ve(this._lodPlanes[r],c),h=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*ri-1),_=s/g,f=isFinite(s)?1+Math.floor(d*_):ri;f>ri&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${ri}`);const p=[];let E=0;for(let C=0;C<ri;++C){const U=C/_,v=Math.exp(-U*U/2);p.push(v),C===0?E+=v:C<f&&(E+=2*v)}for(let C=0;C<p.length;C++)p[C]=p[C]/E;h.envMap.value=t.texture,h.samples.value=f,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:M}=this;h.dTheta.value=g,h.mipInt.value=M-i;const w=this._sizeLods[r],I=3*w*(r>M-Ni?r-M+Ni:0),T=4*(this._cubeSize-w);Qr(e,I,T,3*w,2*w),l.setRenderTarget(e),l.render(u,la)}}function sm(n){const t=[],e=[],i=[];let r=n;const s=n-Ni+1+yl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-Ni?l=yl[a-n+Ni-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],m=6,g=6,_=3,f=2,p=1,E=new Float32Array(_*g*m),M=new Float32Array(f*g*m),w=new Float32Array(p*g*m);for(let T=0;T<m;T++){const C=T%3*2/3-1,U=T>2?0:-1,v=[C,U,0,C+2/3,U,0,C+2/3,U+1,0,C,U,0,C+2/3,U+1,0,C,U+1,0];E.set(v,_*g*T),M.set(h,f*g*T);const x=[T,T,T,T,T,T];w.set(x,p*g*T)}const I=new Se;I.setAttribute("position",new Le(E,_)),I.setAttribute("uv",new Le(M,f)),I.setAttribute("faceIndex",new Le(w,p)),t.push(I),r>Ni&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function bl(n,t,e){const i=new hi(n,t,e);return i.texture.mapping=Ts,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Qr(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function am(n,t,e){const i=new Float32Array(ri),r=new P(0,1,0);return new Ye({name:"SphericalGaussianBlur",defines:{n:ri,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Qa(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Al(){return new Ye({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qa(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Cl(){return new Ye({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function Qa(){return`

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
	`}function om(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ta||l===ba,d=l===Hi||l===Gi;if(c||d){let u=t.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return e===null&&(e=new Tl(n)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return c&&m&&m.height>0||d&&m&&r(m)?(e===null&&(e=new Tl(n)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function r(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function lm(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&Ic("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function cm(n,t,e,i){const r={},s=new WeakMap;function a(u){const h=u.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let f=0,p=_.length;f<p;f++)t.remove(_[f])}h.removeEventListener("dispose",a),delete r[h.id];const m=s.get(h);m&&(t.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(u,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,e.memory.geometries++),h}function l(u){const h=u.attributes;for(const g in h)t.update(h[g],n.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const _=m[g];for(let f=0,p=_.length;f<p;f++)t.update(_[f],n.ARRAY_BUFFER)}}function c(u){const h=[],m=u.index,g=u.attributes.position;let _=0;if(m!==null){const E=m.array;_=m.version;for(let M=0,w=E.length;M<w;M+=3){const I=E[M+0],T=E[M+1],C=E[M+2];h.push(I,T,T,C,C,I)}}else if(g!==void 0){const E=g.array;_=g.version;for(let M=0,w=E.length/3-1;M<w;M+=3){const I=M+0,T=M+1,C=M+2;h.push(I,T,T,C,C,I)}}else return;const f=new(Pc(h)?Bc:Oc)(h,1);f.version=_;const p=s.get(u);p&&t.remove(p),s.set(u,f)}function d(u){const h=s.get(u);if(h){const m=u.index;m!==null&&h.version<m.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function dm(n,t,e){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,m){n.drawElements(i,m,s,h*a),e.update(m,i,1)}function c(h,m,g){g!==0&&(n.drawElementsInstanced(i,m,s,h*a,g),e.update(m,i,g))}function d(h,m,g){if(g===0)return;const _=t.get("WEBGL_multi_draw");if(_===null)for(let f=0;f<g;f++)this.render(h[f]/a,m[f]);else{_.multiDrawElementsWEBGL(i,m,0,s,h,0,g);let f=0;for(let p=0;p<g;p++)f+=m[p];e.update(f,i,1)}}function u(h,m,g,_){if(g===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<h.length;p++)c(h[p]/a,m[p],_[p]);else{f.multiDrawElementsInstancedWEBGL(i,m,0,s,h,0,_,0,g);let p=0;for(let E=0;E<g;E++)p+=m[E];for(let E=0;E<_.length;E++)e.update(p,i,_[E])}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function um(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(s/3);break;case n.LINES:e.lines+=o*(s/2);break;case n.LINE_STRIP:e.lines+=o*(s-1);break;case n.LINE_LOOP:e.lines+=o*s;break;case n.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function hm(n,t,e){const i=new WeakMap,r=new he;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=i.get(o);if(h===void 0||h.count!==u){let v=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",v)};h!==void 0&&h.texture.dispose();const m=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let M=0;m===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let w=o.attributes.position.count*M,I=1;w>t.maxTextureSize&&(I=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const T=new Float32Array(w*I*4*u),C=new Uc(T,w,I,u);C.type=Dn,C.needsUpdate=!0;const U=M*4;for(let x=0;x<u;x++){const A=f[x],B=p[x],F=E[x],V=w*I*4*x;for(let $=0;$<A.count;$++){const H=$*U;m===!0&&(r.fromBufferAttribute(A,$),T[V+H+0]=r.x,T[V+H+1]=r.y,T[V+H+2]=r.z,T[V+H+3]=0),g===!0&&(r.fromBufferAttribute(B,$),T[V+H+4]=r.x,T[V+H+5]=r.y,T[V+H+6]=r.z,T[V+H+7]=0),_===!0&&(r.fromBufferAttribute(F,$),T[V+H+8]=r.x,T[V+H+9]=r.y,T[V+H+10]=r.z,T[V+H+11]=F.itemSize===4?r.w:1)}}h={count:u,texture:C,size:new Ot(w,I)},i.set(o,h),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let m=0;for(let _=0;_<c.length;_++)m+=c[_];const g=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function fm(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,d=l.geometry,u=t.get(l,d);if(r.get(u)!==c&&(t.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return u}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}class Vc extends xe{constructor(t,e,i,r,s,a,o,l,c,d=Fi){if(d!==Fi&&d!==Xi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Fi&&(i=Vi),i===void 0&&d===Xi&&(i=Wi),super(null,r,s,a,o,l,d,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:ke,this.minFilter=l!==void 0?l:ke,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Wc=new xe,Xc=new Vc(1,1);Xc.compareFunction=Lc;const $c=new Uc,qc=new Ju,Yc=new Hc,Rl=[],Ll=[],Pl=new Float32Array(16),Il=new Float32Array(9),Dl=new Float32Array(4);function ji(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=Rl[r];if(s===void 0&&(s=new Float32Array(r),Rl[r]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(s,o)}return s}function oe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function le(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Cs(n,t){let e=Ll[t];e===void 0&&(e=new Int32Array(t),Ll[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function pm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function mm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;n.uniform2fv(this.addr,t),le(e,t)}}function gm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(oe(e,t))return;n.uniform3fv(this.addr,t),le(e,t)}}function _m(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;n.uniform4fv(this.addr,t),le(e,t)}}function vm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(oe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),le(e,t)}else{if(oe(e,i))return;Dl.set(i),n.uniformMatrix2fv(this.addr,!1,Dl),le(e,i)}}function xm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(oe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),le(e,t)}else{if(oe(e,i))return;Il.set(i),n.uniformMatrix3fv(this.addr,!1,Il),le(e,i)}}function Sm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(oe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),le(e,t)}else{if(oe(e,i))return;Pl.set(i),n.uniformMatrix4fv(this.addr,!1,Pl),le(e,i)}}function Mm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function ym(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;n.uniform2iv(this.addr,t),le(e,t)}}function Em(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(oe(e,t))return;n.uniform3iv(this.addr,t),le(e,t)}}function wm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;n.uniform4iv(this.addr,t),le(e,t)}}function Tm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function bm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;n.uniform2uiv(this.addr,t),le(e,t)}}function Am(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(oe(e,t))return;n.uniform3uiv(this.addr,t),le(e,t)}}function Cm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;n.uniform4uiv(this.addr,t),le(e,t)}}function Rm(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Xc:Wc;e.setTexture2D(t||s,r)}function Lm(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||qc,r)}function Pm(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||Yc,r)}function Im(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||$c,r)}function Dm(n){switch(n){case 5126:return pm;case 35664:return mm;case 35665:return gm;case 35666:return _m;case 35674:return vm;case 35675:return xm;case 35676:return Sm;case 5124:case 35670:return Mm;case 35667:case 35671:return ym;case 35668:case 35672:return Em;case 35669:case 35673:return wm;case 5125:return Tm;case 36294:return bm;case 36295:return Am;case 36296:return Cm;case 35678:case 36198:case 36298:case 36306:case 35682:return Rm;case 35679:case 36299:case 36307:return Lm;case 35680:case 36300:case 36308:case 36293:return Pm;case 36289:case 36303:case 36311:case 36292:return Im}}function Um(n,t){n.uniform1fv(this.addr,t)}function Nm(n,t){const e=ji(t,this.size,2);n.uniform2fv(this.addr,e)}function Fm(n,t){const e=ji(t,this.size,3);n.uniform3fv(this.addr,e)}function Om(n,t){const e=ji(t,this.size,4);n.uniform4fv(this.addr,e)}function Bm(n,t){const e=ji(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function zm(n,t){const e=ji(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function km(n,t){const e=ji(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Hm(n,t){n.uniform1iv(this.addr,t)}function Gm(n,t){n.uniform2iv(this.addr,t)}function Vm(n,t){n.uniform3iv(this.addr,t)}function Wm(n,t){n.uniform4iv(this.addr,t)}function Xm(n,t){n.uniform1uiv(this.addr,t)}function $m(n,t){n.uniform2uiv(this.addr,t)}function qm(n,t){n.uniform3uiv(this.addr,t)}function Ym(n,t){n.uniform4uiv(this.addr,t)}function Km(n,t,e){const i=this.cache,r=t.length,s=Cs(e,r);oe(i,s)||(n.uniform1iv(this.addr,s),le(i,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||Wc,s[a])}function jm(n,t,e){const i=this.cache,r=t.length,s=Cs(e,r);oe(i,s)||(n.uniform1iv(this.addr,s),le(i,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||qc,s[a])}function Zm(n,t,e){const i=this.cache,r=t.length,s=Cs(e,r);oe(i,s)||(n.uniform1iv(this.addr,s),le(i,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||Yc,s[a])}function Jm(n,t,e){const i=this.cache,r=t.length,s=Cs(e,r);oe(i,s)||(n.uniform1iv(this.addr,s),le(i,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||$c,s[a])}function Qm(n){switch(n){case 5126:return Um;case 35664:return Nm;case 35665:return Fm;case 35666:return Om;case 35674:return Bm;case 35675:return zm;case 35676:return km;case 5124:case 35670:return Hm;case 35667:case 35671:return Gm;case 35668:case 35672:return Vm;case 35669:case 35673:return Wm;case 5125:return Xm;case 36294:return $m;case 36295:return qm;case 36296:return Ym;case 35678:case 36198:case 36298:case 36306:case 35682:return Km;case 35679:case 36299:case 36307:return jm;case 35680:case 36300:case 36308:case 36293:return Zm;case 36289:case 36303:case 36311:case 36292:return Jm}}class tg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Dm(e.type)}}class eg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Qm(e.type)}}class ng{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],i)}}}const fa=/(\w+)(\])?(\[|\.)?/g;function Ul(n,t){n.seq.push(t),n.map[t.id]=t}function ig(n,t,e){const i=n.name,r=i.length;for(fa.lastIndex=0;;){const s=fa.exec(i),a=fa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Ul(e,c===void 0?new tg(o,n,t):new eg(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new ng(o),Ul(e,u)),e=u}}}class ss{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);ig(s,a,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&i.push(a)}return i}}function Nl(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const rg=37297;let sg=0;function ag(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function og(n){const t=Xt.getPrimaries(Xt.workingColorSpace),e=Xt.getPrimaries(n);let i;switch(t===e?i="":t===gs&&e===ms?i="LinearDisplayP3ToLinearSRGB":t===ms&&e===gs&&(i="LinearSRGBToLinearDisplayP3"),n){case Xn:case As:return[i,"LinearTransferOETF"];case Je:case Ya:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Fl(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+ag(n.getShaderSource(t),a)}else return r}function lg(n,t){const e=og(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function cg(n,t){let e;switch(t){case gu:e="Linear";break;case _u:e="Reinhard";break;case vu:e="OptimizedCineon";break;case xu:e="ACESFilmic";break;case Mu:e="AgX";break;case yu:e="Neutral";break;case Su:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function dg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hr).join(`
`)}function ug(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function hg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function hr(n){return n!==""}function Ol(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Bl(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const fg=/^[ \t]*#include +<([\w\d./]+)>/gm;function La(n){return n.replace(fg,mg)}const pg=new Map;function mg(n,t){let e=bt[t];if(e===void 0){const i=pg.get(t);if(i!==void 0)e=bt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return La(e)}const gg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zl(n){return n.replace(gg,_g)}function _g(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function kl(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function vg(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===yc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Gd?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===gn&&(t="SHADOWMAP_TYPE_VSM"),t}function xg(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Hi:case Gi:t="ENVMAP_TYPE_CUBE";break;case Ts:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Sg(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Gi:t="ENVMAP_MODE_REFRACTION";break}return t}function Mg(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case $a:t="ENVMAP_BLENDING_MULTIPLY";break;case pu:t="ENVMAP_BLENDING_MIX";break;case mu:t="ENVMAP_BLENDING_ADD";break}return t}function yg(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Eg(n,t,e,i){const r=n.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=vg(e),c=xg(e),d=Sg(e),u=Mg(e),h=yg(e),m=dg(e),g=ug(s),_=r.createProgram();let f,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(hr).join(`
`),f.length>0&&(f+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(hr).join(`
`),p.length>0&&(p+=`
`)):(f=[kl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hr).join(`
`),p=[kl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",e.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zn?"#define TONE_MAPPING":"",e.toneMapping!==zn?bt.tonemapping_pars_fragment:"",e.toneMapping!==zn?cg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",bt.colorspace_pars_fragment,lg("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(hr).join(`
`)),a=La(a),a=Ol(a,e),a=Bl(a,e),o=La(o),o=Ol(o,e),o=Bl(o,e),a=zl(a),o=zl(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,p=["#define varying in",e.glslVersion===nl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===nl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=E+f+a,w=E+p+o,I=Nl(r,r.VERTEX_SHADER,M),T=Nl(r,r.FRAGMENT_SHADER,w);r.attachShader(_,I),r.attachShader(_,T),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(A){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(_).trim(),F=r.getShaderInfoLog(I).trim(),V=r.getShaderInfoLog(T).trim();let $=!0,H=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,I,T);else{const Z=Fl(r,I,"vertex"),G=Fl(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+B+`
`+Z+`
`+G)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(F===""||V==="")&&(H=!1);H&&(A.diagnostics={runnable:$,programLog:B,vertexShader:{log:F,prefix:f},fragmentShader:{log:V,prefix:p}})}r.deleteShader(I),r.deleteShader(T),U=new ss(r,_),v=hg(r,_)}let U;this.getUniforms=function(){return U===void 0&&C(this),U};let v;this.getAttributes=function(){return v===void 0&&C(this),v};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(_,rg)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=sg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=T,this}let wg=0;class Tg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new bg(t),e.set(t,i)),i}}class bg{constructor(t){this.id=wg++,this.code=t,this.usedTimes=0}}function Ag(n,t,e,i,r,s,a){const o=new Nc,l=new Tg,c=new Set,d=[],u=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function f(v,x,A,B,F){const V=B.fog,$=F.geometry,H=v.isMeshStandardMaterial?B.environment:null,Z=(v.isMeshStandardMaterial?e:t).get(v.envMap||H),G=Z&&Z.mapping===Ts?Z.image.height:null,dt=g[v.type];v.precision!==null&&(m=r.getMaxPrecision(v.precision),m!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",m,"instead."));const ct=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ut=ct!==void 0?ct.length:0;let Dt=0;$.morphAttributes.position!==void 0&&(Dt=1),$.morphAttributes.normal!==void 0&&(Dt=2),$.morphAttributes.color!==void 0&&(Dt=3);let Gt,W,J,ht;if(dt){const $t=Qe[dt];Gt=$t.vertexShader,W=$t.fragmentShader}else Gt=v.vertexShader,W=v.fragmentShader,l.update(v),J=l.getVertexShaderID(v),ht=l.getFragmentShaderID(v);const st=n.getRenderTarget(),Pt=F.isInstancedMesh===!0,Ct=F.isBatchedMesh===!0,zt=!!v.map,L=!!v.matcap,Bt=!!Z,Nt=!!v.aoMap,jt=!!v.lightMap,St=!!v.bumpMap,kt=!!v.normalMap,It=!!v.displacementMap,Tt=!!v.emissiveMap,ne=!!v.metalnessMap,b=!!v.roughnessMap,S=v.anisotropy>0,k=v.clearcoat>0,Y=v.dispersion>0,K=v.iridescence>0,j=v.sheen>0,vt=v.transmission>0,it=S&&!!v.anisotropyMap,rt=k&&!!v.clearcoatMap,Rt=k&&!!v.clearcoatNormalMap,Q=k&&!!v.clearcoatRoughnessMap,gt=K&&!!v.iridescenceMap,Ut=K&&!!v.iridescenceThicknessMap,Et=j&&!!v.sheenColorMap,at=j&&!!v.sheenRoughnessMap,Lt=!!v.specularMap,Ft=!!v.specularColorMap,te=!!v.specularIntensityMap,R=vt&&!!v.transmissionMap,ot=vt&&!!v.thicknessMap,X=!!v.gradientMap,q=!!v.alphaMap,et=v.alphaTest>0,wt=!!v.alphaHash,Ht=!!v.extensions;let ee=zn;v.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(ee=n.toneMapping);const ce={shaderID:dt,shaderType:v.type,shaderName:v.name,vertexShader:Gt,fragmentShader:W,defines:v.defines,customVertexShaderID:J,customFragmentShaderID:ht,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:m,batching:Ct,batchingColor:Ct&&F._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&F.instanceColor!==null,instancingMorph:Pt&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:st===null?n.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:Xn,alphaToCoverage:!!v.alphaToCoverage,map:zt,matcap:L,envMap:Bt,envMapMode:Bt&&Z.mapping,envMapCubeUVHeight:G,aoMap:Nt,lightMap:jt,bumpMap:St,normalMap:kt,displacementMap:h&&It,emissiveMap:Tt,normalMapObjectSpace:kt&&v.normalMapType===Fu,normalMapTangentSpace:kt&&v.normalMapType===qa,metalnessMap:ne,roughnessMap:b,anisotropy:S,anisotropyMap:it,clearcoat:k,clearcoatMap:rt,clearcoatNormalMap:Rt,clearcoatRoughnessMap:Q,dispersion:Y,iridescence:K,iridescenceMap:gt,iridescenceThicknessMap:Ut,sheen:j,sheenColorMap:Et,sheenRoughnessMap:at,specularMap:Lt,specularColorMap:Ft,specularIntensityMap:te,transmission:vt,transmissionMap:R,thicknessMap:ot,gradientMap:X,opaque:v.transparent===!1&&v.blending===Bn&&v.alphaToCoverage===!1,alphaMap:q,alphaTest:et,alphaHash:wt,combine:v.combine,mapUv:zt&&_(v.map.channel),aoMapUv:Nt&&_(v.aoMap.channel),lightMapUv:jt&&_(v.lightMap.channel),bumpMapUv:St&&_(v.bumpMap.channel),normalMapUv:kt&&_(v.normalMap.channel),displacementMapUv:It&&_(v.displacementMap.channel),emissiveMapUv:Tt&&_(v.emissiveMap.channel),metalnessMapUv:ne&&_(v.metalnessMap.channel),roughnessMapUv:b&&_(v.roughnessMap.channel),anisotropyMapUv:it&&_(v.anisotropyMap.channel),clearcoatMapUv:rt&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Rt&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:at&&_(v.sheenRoughnessMap.channel),specularMapUv:Lt&&_(v.specularMap.channel),specularColorMapUv:Ft&&_(v.specularColorMap.channel),specularIntensityMapUv:te&&_(v.specularIntensityMap.channel),transmissionMapUv:R&&_(v.transmissionMap.channel),thicknessMapUv:ot&&_(v.thicknessMap.channel),alphaMapUv:q&&_(v.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(kt||S),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!$.attributes.uv&&(zt||q),fog:!!V,useFog:v.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:F.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:Dt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:ee,decodeVideoTexture:zt&&v.map.isVideoTexture===!0&&Xt.getTransfer(v.map.colorSpace)===Yt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Be,flipSided:v.side===we,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ht&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Ht&&v.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ce.vertexUv1s=c.has(1),ce.vertexUv2s=c.has(2),ce.vertexUv3s=c.has(3),c.clear(),ce}function p(v){const x=[];if(v.shaderID?x.push(v.shaderID):(x.push(v.customVertexShaderID),x.push(v.customFragmentShaderID)),v.defines!==void 0)for(const A in v.defines)x.push(A),x.push(v.defines[A]);return v.isRawShaderMaterial===!1&&(E(x,v),M(x,v),x.push(n.outputColorSpace)),x.push(v.customProgramCacheKey),x.join()}function E(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}function M(v,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),v.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.skinning&&o.enable(4),x.morphTargets&&o.enable(5),x.morphNormals&&o.enable(6),x.morphColors&&o.enable(7),x.premultipliedAlpha&&o.enable(8),x.shadowMapEnabled&&o.enable(9),x.doubleSided&&o.enable(10),x.flipSided&&o.enable(11),x.useDepthPacking&&o.enable(12),x.dithering&&o.enable(13),x.transmission&&o.enable(14),x.sheen&&o.enable(15),x.opaque&&o.enable(16),x.pointsUvs&&o.enable(17),x.decodeVideoTexture&&o.enable(18),x.alphaToCoverage&&o.enable(19),v.push(o.mask)}function w(v){const x=g[v.type];let A;if(x){const B=Qe[x];A=dh.clone(B.uniforms)}else A=v.uniforms;return A}function I(v,x){let A;for(let B=0,F=d.length;B<F;B++){const V=d[B];if(V.cacheKey===x){A=V,++A.usedTimes;break}}return A===void 0&&(A=new Eg(n,x,v,s),d.push(A)),A}function T(v){if(--v.usedTimes===0){const x=d.indexOf(v);d[x]=d[d.length-1],d.pop(),v.destroy()}}function C(v){l.remove(v)}function U(){l.dispose()}return{getParameters:f,getProgramCacheKey:p,getUniforms:w,acquireProgram:I,releaseProgram:T,releaseShaderCache:C,programs:d,dispose:U}}function Cg(){let n=new WeakMap;function t(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function e(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:t,remove:e,update:i,dispose:r}}function Rg(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Hl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Gl(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function a(u,h,m,g,_,f){let p=n[t];return p===void 0?(p={id:u.id,object:u,geometry:h,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:f},n[t]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=m,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=f),t++,p}function o(u,h,m,g,_,f){const p=a(u,h,m,g,_,f);m.transmission>0?i.push(p):m.transparent===!0?r.push(p):e.push(p)}function l(u,h,m,g,_,f){const p=a(u,h,m,g,_,f);m.transmission>0?i.unshift(p):m.transparent===!0?r.unshift(p):e.unshift(p)}function c(u,h){e.length>1&&e.sort(u||Rg),i.length>1&&i.sort(h||Hl),r.length>1&&r.sort(h||Hl)}function d(){for(let u=t,h=n.length;u<h;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:d,sort:c}}function Lg(){let n=new WeakMap;function t(i,r){const s=n.get(i);let a;return s===void 0?(a=new Gl,n.set(i,[a])):r>=s.length?(a=new Gl,s.push(a)):a=s[r],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function Pg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new pt};break;case"SpotLight":e={position:new P,direction:new P,color:new pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new pt,groundColor:new pt};break;case"RectAreaLight":e={color:new pt,position:new P,halfWidth:new P,halfHeight:new P};break}return n[t.id]=e,e}}}function Ig(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Dg=0;function Ug(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Ng(n){const t=new Pg,e=Ig(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const r=new P,s=new Kt,a=new Kt;function o(c){let d=0,u=0,h=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let m=0,g=0,_=0,f=0,p=0,E=0,M=0,w=0,I=0,T=0,C=0;c.sort(Ug);for(let v=0,x=c.length;v<x;v++){const A=c[v],B=A.color,F=A.intensity,V=A.distance,$=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)d+=B.r*F,u+=B.g*F,h+=B.b*F;else if(A.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(A.sh.coefficients[H],F);C++}else if(A.isDirectionalLight){const H=t.get(A);if(H.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const Z=A.shadow,G=e.get(A);G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,i.directionalShadow[m]=G,i.directionalShadowMap[m]=$,i.directionalShadowMatrix[m]=A.shadow.matrix,E++}i.directional[m]=H,m++}else if(A.isSpotLight){const H=t.get(A);H.position.setFromMatrixPosition(A.matrixWorld),H.color.copy(B).multiplyScalar(F),H.distance=V,H.coneCos=Math.cos(A.angle),H.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),H.decay=A.decay,i.spot[_]=H;const Z=A.shadow;if(A.map&&(i.spotLightMap[I]=A.map,I++,Z.updateMatrices(A),A.castShadow&&T++),i.spotLightMatrix[_]=Z.matrix,A.castShadow){const G=e.get(A);G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,i.spotShadow[_]=G,i.spotShadowMap[_]=$,w++}_++}else if(A.isRectAreaLight){const H=t.get(A);H.color.copy(B).multiplyScalar(F),H.halfWidth.set(A.width*.5,0,0),H.halfHeight.set(0,A.height*.5,0),i.rectArea[f]=H,f++}else if(A.isPointLight){const H=t.get(A);if(H.color.copy(A.color).multiplyScalar(A.intensity),H.distance=A.distance,H.decay=A.decay,A.castShadow){const Z=A.shadow,G=e.get(A);G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,G.shadowCameraNear=Z.camera.near,G.shadowCameraFar=Z.camera.far,i.pointShadow[g]=G,i.pointShadowMap[g]=$,i.pointShadowMatrix[g]=A.shadow.matrix,M++}i.point[g]=H,g++}else if(A.isHemisphereLight){const H=t.get(A);H.skyColor.copy(A.color).multiplyScalar(F),H.groundColor.copy(A.groundColor).multiplyScalar(F),i.hemi[p]=H,p++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=nt.LTC_FLOAT_1,i.rectAreaLTC2=nt.LTC_FLOAT_2):(i.rectAreaLTC1=nt.LTC_HALF_1,i.rectAreaLTC2=nt.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=h;const U=i.hash;(U.directionalLength!==m||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==f||U.hemiLength!==p||U.numDirectionalShadows!==E||U.numPointShadows!==M||U.numSpotShadows!==w||U.numSpotMaps!==I||U.numLightProbes!==C)&&(i.directional.length=m,i.spot.length=_,i.rectArea.length=f,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=w+I-T,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=C,U.directionalLength=m,U.pointLength=g,U.spotLength=_,U.rectAreaLength=f,U.hemiLength=p,U.numDirectionalShadows=E,U.numPointShadows=M,U.numSpotShadows=w,U.numSpotMaps=I,U.numLightProbes=C,i.version=Dg++)}function l(c,d){let u=0,h=0,m=0,g=0,_=0;const f=d.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){const M=c[p];if(M.isDirectionalLight){const w=i.directional[u];w.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(f),u++}else if(M.isSpotLight){const w=i.spot[m];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(f),w.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(f),m++}else if(M.isRectAreaLight){const w=i.rectArea[g];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(f),a.identity(),s.copy(M.matrixWorld),s.premultiply(f),a.extractRotation(s),w.halfWidth.set(M.width*.5,0,0),w.halfHeight.set(0,M.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const w=i.point[h];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(f),h++}else if(M.isHemisphereLight){const w=i.hemi[_];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(f),_++}}}return{setup:o,setupView:l,state:i}}function Vl(n){const t=new Ng(n),e=[],i=[];function r(d){c.camera=d,e.length=0,i.length=0}function s(d){e.push(d)}function a(d){i.push(d)}function o(){t.setup(e)}function l(d){t.setupView(e,d)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function Fg(n){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new Vl(n),t.set(r,[o])):s>=a.length?(o=new Vl(n),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class Og extends an{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Bg extends an{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const zg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kg=`uniform sampler2D shadow_pass;
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
}`;function Hg(n,t,e){let i=new Za;const r=new Ot,s=new Ot,a=new he,o=new Og({depthPacking:Nu}),l=new Bg,c={},d=e.maxTextureSize,u={[Gn]:we,[we]:Gn,[Be]:Be},h=new Ye({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:zg,fragmentShader:kg}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new Se;g.setAttribute("position",new Le(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ve(g,h),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yc;let p=this.type;this.render=function(T,C,U){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||T.length===0)return;const v=n.getRenderTarget(),x=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),B=n.state;B.setBlending(Sn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const F=p!==gn&&this.type===gn,V=p===gn&&this.type!==gn;for(let $=0,H=T.length;$<H;$++){const Z=T[$],G=Z.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const dt=G.getFrameExtents();if(r.multiply(dt),s.copy(G.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/dt.x),r.x=s.x*dt.x,G.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/dt.y),r.y=s.y*dt.y,G.mapSize.y=s.y)),G.map===null||F===!0||V===!0){const ut=this.type!==gn?{minFilter:ke,magFilter:ke}:{};G.map!==null&&G.map.dispose(),G.map=new hi(r.x,r.y,ut),G.map.texture.name=Z.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const ct=G.getViewportCount();for(let ut=0;ut<ct;ut++){const Dt=G.getViewport(ut);a.set(s.x*Dt.x,s.y*Dt.y,s.x*Dt.z,s.y*Dt.w),B.viewport(a),G.updateMatrices(Z,ut),i=G.getFrustum(),w(C,U,G.camera,Z,this.type)}G.isPointLightShadow!==!0&&this.type===gn&&E(G,U),G.needsUpdate=!1}p=this.type,f.needsUpdate=!1,n.setRenderTarget(v,x,A)};function E(T,C){const U=t.update(_);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new hi(r.x,r.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(C,null,U,h,_,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(C,null,U,m,_,null)}function M(T,C,U,v){let x=null;const A=U.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(A!==void 0)x=A;else if(x=U.isPointLight===!0?l:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const B=x.uuid,F=C.uuid;let V=c[B];V===void 0&&(V={},c[B]=V);let $=V[F];$===void 0&&($=x.clone(),V[F]=$,C.addEventListener("dispose",I)),x=$}if(x.visible=C.visible,x.wireframe=C.wireframe,v===gn?x.side=C.shadowSide!==null?C.shadowSide:C.side:x.side=C.shadowSide!==null?C.shadowSide:u[C.side],x.alphaMap=C.alphaMap,x.alphaTest=C.alphaTest,x.map=C.map,x.clipShadows=C.clipShadows,x.clippingPlanes=C.clippingPlanes,x.clipIntersection=C.clipIntersection,x.displacementMap=C.displacementMap,x.displacementScale=C.displacementScale,x.displacementBias=C.displacementBias,x.wireframeLinewidth=C.wireframeLinewidth,x.linewidth=C.linewidth,U.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const B=n.properties.get(x);B.light=U}return x}function w(T,C,U,v,x){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&x===gn)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,T.matrixWorld);const F=t.update(T),V=T.material;if(Array.isArray(V)){const $=F.groups;for(let H=0,Z=$.length;H<Z;H++){const G=$[H],dt=V[G.materialIndex];if(dt&&dt.visible){const ct=M(T,dt,v,x);T.onBeforeShadow(n,T,C,U,F,ct,G),n.renderBufferDirect(U,null,F,ct,T,G),T.onAfterShadow(n,T,C,U,F,ct,G)}}}else if(V.visible){const $=M(T,V,v,x);T.onBeforeShadow(n,T,C,U,F,$,null),n.renderBufferDirect(U,null,F,$,T,null),T.onAfterShadow(n,T,C,U,F,$,null)}}const B=T.children;for(let F=0,V=B.length;F<V;F++)w(B[F],C,U,v,x)}function I(T){T.target.removeEventListener("dispose",I);for(const U in c){const v=c[U],x=T.target.uuid;x in v&&(v[x].dispose(),delete v[x])}}}function Gg(n){function t(){let R=!1;const ot=new he;let X=null;const q=new he(0,0,0,0);return{setMask:function(et){X!==et&&!R&&(n.colorMask(et,et,et,et),X=et)},setLocked:function(et){R=et},setClear:function(et,wt,Ht,ee,ce){ce===!0&&(et*=ee,wt*=ee,Ht*=ee),ot.set(et,wt,Ht,ee),q.equals(ot)===!1&&(n.clearColor(et,wt,Ht,ee),q.copy(ot))},reset:function(){R=!1,X=null,q.set(-1,0,0,0)}}}function e(){let R=!1,ot=null,X=null,q=null;return{setTest:function(et){et?ht(n.DEPTH_TEST):st(n.DEPTH_TEST)},setMask:function(et){ot!==et&&!R&&(n.depthMask(et),ot=et)},setFunc:function(et){if(X!==et){switch(et){case ou:n.depthFunc(n.NEVER);break;case lu:n.depthFunc(n.ALWAYS);break;case cu:n.depthFunc(n.LESS);break;case hs:n.depthFunc(n.LEQUAL);break;case du:n.depthFunc(n.EQUAL);break;case uu:n.depthFunc(n.GEQUAL);break;case hu:n.depthFunc(n.GREATER);break;case fu:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}X=et}},setLocked:function(et){R=et},setClear:function(et){q!==et&&(n.clearDepth(et),q=et)},reset:function(){R=!1,ot=null,X=null,q=null}}}function i(){let R=!1,ot=null,X=null,q=null,et=null,wt=null,Ht=null,ee=null,ce=null;return{setTest:function($t){R||($t?ht(n.STENCIL_TEST):st(n.STENCIL_TEST))},setMask:function($t){ot!==$t&&!R&&(n.stencilMask($t),ot=$t)},setFunc:function($t,Ke,je){(X!==$t||q!==Ke||et!==je)&&(n.stencilFunc($t,Ke,je),X=$t,q=Ke,et=je)},setOp:function($t,Ke,je){(wt!==$t||Ht!==Ke||ee!==je)&&(n.stencilOp($t,Ke,je),wt=$t,Ht=Ke,ee=je)},setLocked:function($t){R=$t},setClear:function($t){ce!==$t&&(n.clearStencil($t),ce=$t)},reset:function(){R=!1,ot=null,X=null,q=null,et=null,wt=null,Ht=null,ee=null,ce=null}}}const r=new t,s=new e,a=new i,o=new WeakMap,l=new WeakMap;let c={},d={},u=new WeakMap,h=[],m=null,g=!1,_=null,f=null,p=null,E=null,M=null,w=null,I=null,T=new pt(0,0,0),C=0,U=!1,v=null,x=null,A=null,B=null,F=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,H=0;const Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(Z)[1]),$=H>=1):Z.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),$=H>=2);let G=null,dt={};const ct=n.getParameter(n.SCISSOR_BOX),ut=n.getParameter(n.VIEWPORT),Dt=new he().fromArray(ct),Gt=new he().fromArray(ut);function W(R,ot,X,q){const et=new Uint8Array(4),wt=n.createTexture();n.bindTexture(R,wt),n.texParameteri(R,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(R,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ht=0;Ht<X;Ht++)R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY?n.texImage3D(ot,0,n.RGBA,1,1,q,0,n.RGBA,n.UNSIGNED_BYTE,et):n.texImage2D(ot+Ht,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,et);return wt}const J={};J[n.TEXTURE_2D]=W(n.TEXTURE_2D,n.TEXTURE_2D,1),J[n.TEXTURE_CUBE_MAP]=W(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[n.TEXTURE_2D_ARRAY]=W(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),J[n.TEXTURE_3D]=W(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ht(n.DEPTH_TEST),s.setFunc(hs),St(!1),kt(wo),ht(n.CULL_FACE),Nt(Sn);function ht(R){c[R]!==!0&&(n.enable(R),c[R]=!0)}function st(R){c[R]!==!1&&(n.disable(R),c[R]=!1)}function Pt(R,ot){return d[R]!==ot?(n.bindFramebuffer(R,ot),d[R]=ot,R===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ot),R===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ot),!0):!1}function Ct(R,ot){let X=h,q=!1;if(R){X=u.get(ot),X===void 0&&(X=[],u.set(ot,X));const et=R.textures;if(X.length!==et.length||X[0]!==n.COLOR_ATTACHMENT0){for(let wt=0,Ht=et.length;wt<Ht;wt++)X[wt]=n.COLOR_ATTACHMENT0+wt;X.length=et.length,q=!0}}else X[0]!==n.BACK&&(X[0]=n.BACK,q=!0);q&&n.drawBuffers(X)}function zt(R){return m!==R?(n.useProgram(R),m=R,!0):!1}const L={[ii]:n.FUNC_ADD,[Wd]:n.FUNC_SUBTRACT,[Xd]:n.FUNC_REVERSE_SUBTRACT};L[$d]=n.MIN,L[qd]=n.MAX;const Bt={[Yd]:n.ZERO,[Kd]:n.ONE,[jd]:n.SRC_COLOR,[Ea]:n.SRC_ALPHA,[nu]:n.SRC_ALPHA_SATURATE,[tu]:n.DST_COLOR,[Jd]:n.DST_ALPHA,[Zd]:n.ONE_MINUS_SRC_COLOR,[wa]:n.ONE_MINUS_SRC_ALPHA,[eu]:n.ONE_MINUS_DST_COLOR,[Qd]:n.ONE_MINUS_DST_ALPHA,[iu]:n.CONSTANT_COLOR,[ru]:n.ONE_MINUS_CONSTANT_COLOR,[su]:n.CONSTANT_ALPHA,[au]:n.ONE_MINUS_CONSTANT_ALPHA};function Nt(R,ot,X,q,et,wt,Ht,ee,ce,$t){if(R===Sn){g===!0&&(st(n.BLEND),g=!1);return}if(g===!1&&(ht(n.BLEND),g=!0),R!==Vd){if(R!==_||$t!==U){if((f!==ii||M!==ii)&&(n.blendEquation(n.FUNC_ADD),f=ii,M=ii),$t)switch(R){case Bn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case To:n.blendFunc(n.ONE,n.ONE);break;case bo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ao:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case Bn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case To:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case bo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ao:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}p=null,E=null,w=null,I=null,T.set(0,0,0),C=0,_=R,U=$t}return}et=et||ot,wt=wt||X,Ht=Ht||q,(ot!==f||et!==M)&&(n.blendEquationSeparate(L[ot],L[et]),f=ot,M=et),(X!==p||q!==E||wt!==w||Ht!==I)&&(n.blendFuncSeparate(Bt[X],Bt[q],Bt[wt],Bt[Ht]),p=X,E=q,w=wt,I=Ht),(ee.equals(T)===!1||ce!==C)&&(n.blendColor(ee.r,ee.g,ee.b,ce),T.copy(ee),C=ce),_=R,U=!1}function jt(R,ot){R.side===Be?st(n.CULL_FACE):ht(n.CULL_FACE);let X=R.side===we;ot&&(X=!X),St(X),R.blending===Bn&&R.transparent===!1?Nt(Sn):Nt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),s.setFunc(R.depthFunc),s.setTest(R.depthTest),s.setMask(R.depthWrite),r.setMask(R.colorWrite);const q=R.stencilWrite;a.setTest(q),q&&(a.setMask(R.stencilWriteMask),a.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),a.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),Tt(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?ht(n.SAMPLE_ALPHA_TO_COVERAGE):st(n.SAMPLE_ALPHA_TO_COVERAGE)}function St(R){v!==R&&(R?n.frontFace(n.CW):n.frontFace(n.CCW),v=R)}function kt(R){R!==kd?(ht(n.CULL_FACE),R!==x&&(R===wo?n.cullFace(n.BACK):R===Hd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):st(n.CULL_FACE),x=R}function It(R){R!==A&&($&&n.lineWidth(R),A=R)}function Tt(R,ot,X){R?(ht(n.POLYGON_OFFSET_FILL),(B!==ot||F!==X)&&(n.polygonOffset(ot,X),B=ot,F=X)):st(n.POLYGON_OFFSET_FILL)}function ne(R){R?ht(n.SCISSOR_TEST):st(n.SCISSOR_TEST)}function b(R){R===void 0&&(R=n.TEXTURE0+V-1),G!==R&&(n.activeTexture(R),G=R)}function S(R,ot,X){X===void 0&&(G===null?X=n.TEXTURE0+V-1:X=G);let q=dt[X];q===void 0&&(q={type:void 0,texture:void 0},dt[X]=q),(q.type!==R||q.texture!==ot)&&(G!==X&&(n.activeTexture(X),G=X),n.bindTexture(R,ot||J[R]),q.type=R,q.texture=ot)}function k(){const R=dt[G];R!==void 0&&R.type!==void 0&&(n.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function Y(){try{n.compressedTexImage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function K(){try{n.compressedTexImage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function j(){try{n.texSubImage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function vt(){try{n.texSubImage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function it(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function rt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Rt(){try{n.texStorage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Q(){try{n.texStorage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function gt(){try{n.texImage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ut(){try{n.texImage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Et(R){Dt.equals(R)===!1&&(n.scissor(R.x,R.y,R.z,R.w),Dt.copy(R))}function at(R){Gt.equals(R)===!1&&(n.viewport(R.x,R.y,R.z,R.w),Gt.copy(R))}function Lt(R,ot){let X=l.get(ot);X===void 0&&(X=new WeakMap,l.set(ot,X));let q=X.get(R);q===void 0&&(q=n.getUniformBlockIndex(ot,R.name),X.set(R,q))}function Ft(R,ot){const q=l.get(ot).get(R);o.get(ot)!==q&&(n.uniformBlockBinding(ot,q,R.__bindingPointIndex),o.set(ot,q))}function te(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},G=null,dt={},d={},u=new WeakMap,h=[],m=null,g=!1,_=null,f=null,p=null,E=null,M=null,w=null,I=null,T=new pt(0,0,0),C=0,U=!1,v=null,x=null,A=null,B=null,F=null,Dt.set(0,0,n.canvas.width,n.canvas.height),Gt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:ht,disable:st,bindFramebuffer:Pt,drawBuffers:Ct,useProgram:zt,setBlending:Nt,setMaterial:jt,setFlipSided:St,setCullFace:kt,setLineWidth:It,setPolygonOffset:Tt,setScissorTest:ne,activeTexture:b,bindTexture:S,unbindTexture:k,compressedTexImage2D:Y,compressedTexImage3D:K,texImage2D:gt,texImage3D:Ut,updateUBOMapping:Lt,uniformBlockBinding:Ft,texStorage2D:Rt,texStorage3D:Q,texSubImage2D:j,texSubImage3D:vt,compressedTexSubImage2D:it,compressedTexSubImage3D:rt,scissor:Et,viewport:at,reset:te}}function Vg(n,t,e,i,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ot,d=new WeakMap;let u;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,S){return m?new OffscreenCanvas(b,S):mr("canvas")}function _(b,S,k){let Y=1;const K=ne(b);if((K.width>k||K.height>k)&&(Y=k/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const j=Math.floor(Y*K.width),vt=Math.floor(Y*K.height);u===void 0&&(u=g(j,vt));const it=S?g(j,vt):u;return it.width=j,it.height=vt,it.getContext("2d").drawImage(b,0,0,j,vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+j+"x"+vt+")."),it}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),b;return b}function f(b){return b.generateMipmaps&&b.minFilter!==ke&&b.minFilter!==Re}function p(b){n.generateMipmap(b)}function E(b,S,k,Y,K=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let j=S;if(S===n.RED&&(k===n.FLOAT&&(j=n.R32F),k===n.HALF_FLOAT&&(j=n.R16F),k===n.UNSIGNED_BYTE&&(j=n.R8)),S===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(j=n.R8UI),k===n.UNSIGNED_SHORT&&(j=n.R16UI),k===n.UNSIGNED_INT&&(j=n.R32UI),k===n.BYTE&&(j=n.R8I),k===n.SHORT&&(j=n.R16I),k===n.INT&&(j=n.R32I)),S===n.RG&&(k===n.FLOAT&&(j=n.RG32F),k===n.HALF_FLOAT&&(j=n.RG16F),k===n.UNSIGNED_BYTE&&(j=n.RG8)),S===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(j=n.RG8UI),k===n.UNSIGNED_SHORT&&(j=n.RG16UI),k===n.UNSIGNED_INT&&(j=n.RG32UI),k===n.BYTE&&(j=n.RG8I),k===n.SHORT&&(j=n.RG16I),k===n.INT&&(j=n.RG32I)),S===n.RGB&&k===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),S===n.RGBA){const vt=K?ps:Xt.getTransfer(Y);k===n.FLOAT&&(j=n.RGBA32F),k===n.HALF_FLOAT&&(j=n.RGBA16F),k===n.UNSIGNED_BYTE&&(j=vt===Yt?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function M(b,S){let k;return b?S===null||S===Vi||S===Wi?k=n.DEPTH24_STENCIL8:S===Dn?k=n.DEPTH32F_STENCIL8:S===fs&&(k=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Vi||S===Wi?k=n.DEPTH_COMPONENT24:S===Dn?k=n.DEPTH_COMPONENT32F:S===fs&&(k=n.DEPTH_COMPONENT16),k}function w(b,S){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==ke&&b.minFilter!==Re?Math.log2(Math.max(S.width,S.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?S.mipmaps.length:1}function I(b){const S=b.target;S.removeEventListener("dispose",I),C(S),S.isVideoTexture&&d.delete(S)}function T(b){const S=b.target;S.removeEventListener("dispose",T),v(S)}function C(b){const S=i.get(b);if(S.__webglInit===void 0)return;const k=b.source,Y=h.get(k);if(Y){const K=Y[S.__cacheKey];K.usedTimes--,K.usedTimes===0&&U(b),Object.keys(Y).length===0&&h.delete(k)}i.remove(b)}function U(b){const S=i.get(b);n.deleteTexture(S.__webglTexture);const k=b.source,Y=h.get(k);delete Y[S.__cacheKey],a.memory.textures--}function v(b){const S=i.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(S.__webglFramebuffer[Y]))for(let K=0;K<S.__webglFramebuffer[Y].length;K++)n.deleteFramebuffer(S.__webglFramebuffer[Y][K]);else n.deleteFramebuffer(S.__webglFramebuffer[Y]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[Y])}else{if(Array.isArray(S.__webglFramebuffer))for(let Y=0;Y<S.__webglFramebuffer.length;Y++)n.deleteFramebuffer(S.__webglFramebuffer[Y]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Y=0;Y<S.__webglColorRenderbuffer.length;Y++)S.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[Y]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=b.textures;for(let Y=0,K=k.length;Y<K;Y++){const j=i.get(k[Y]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),a.memory.textures--),i.remove(k[Y])}i.remove(b)}let x=0;function A(){x=0}function B(){const b=x;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),x+=1,b}function F(b){const S=[];return S.push(b.wrapS),S.push(b.wrapT),S.push(b.wrapR||0),S.push(b.magFilter),S.push(b.minFilter),S.push(b.anisotropy),S.push(b.internalFormat),S.push(b.format),S.push(b.type),S.push(b.generateMipmaps),S.push(b.premultiplyAlpha),S.push(b.flipY),S.push(b.unpackAlignment),S.push(b.colorSpace),S.join()}function V(b,S){const k=i.get(b);if(b.isVideoTexture&&It(b),b.isRenderTargetTexture===!1&&b.version>0&&k.__version!==b.version){const Y=b.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Gt(k,b,S);return}}e.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+S)}function $(b,S){const k=i.get(b);if(b.version>0&&k.__version!==b.version){Gt(k,b,S);return}e.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+S)}function H(b,S){const k=i.get(b);if(b.version>0&&k.__version!==b.version){Gt(k,b,S);return}e.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+S)}function Z(b,S){const k=i.get(b);if(b.version>0&&k.__version!==b.version){W(k,b,S);return}e.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+S)}const G={[Aa]:n.REPEAT,[vn]:n.CLAMP_TO_EDGE,[Ca]:n.MIRRORED_REPEAT},dt={[ke]:n.NEAREST,[Eu]:n.NEAREST_MIPMAP_NEAREST,[Ir]:n.NEAREST_MIPMAP_LINEAR,[Re]:n.LINEAR,[Fs]:n.LINEAR_MIPMAP_NEAREST,[oi]:n.LINEAR_MIPMAP_LINEAR},ct={[Ou]:n.NEVER,[Vu]:n.ALWAYS,[Bu]:n.LESS,[Lc]:n.LEQUAL,[zu]:n.EQUAL,[Gu]:n.GEQUAL,[ku]:n.GREATER,[Hu]:n.NOTEQUAL};function ut(b,S){if(S.type===Dn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Re||S.magFilter===Fs||S.magFilter===Ir||S.magFilter===oi||S.minFilter===Re||S.minFilter===Fs||S.minFilter===Ir||S.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,G[S.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,G[S.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,G[S.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,dt[S.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,dt[S.minFilter]),S.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,ct[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===ke||S.minFilter!==Ir&&S.minFilter!==oi||S.type===Dn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");n.texParameterf(b,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Dt(b,S){let k=!1;b.__webglInit===void 0&&(b.__webglInit=!0,S.addEventListener("dispose",I));const Y=S.source;let K=h.get(Y);K===void 0&&(K={},h.set(Y,K));const j=F(S);if(j!==b.__cacheKey){K[j]===void 0&&(K[j]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,k=!0),K[j].usedTimes++;const vt=K[b.__cacheKey];vt!==void 0&&(K[b.__cacheKey].usedTimes--,vt.usedTimes===0&&U(S)),b.__cacheKey=j,b.__webglTexture=K[j].texture}return k}function Gt(b,S,k){let Y=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Y=n.TEXTURE_3D);const K=Dt(b,S),j=S.source;e.bindTexture(Y,b.__webglTexture,n.TEXTURE0+k);const vt=i.get(j);if(j.version!==vt.__version||K===!0){e.activeTexture(n.TEXTURE0+k);const it=Xt.getPrimaries(Xt.workingColorSpace),rt=S.colorSpace===In?null:Xt.getPrimaries(S.colorSpace),Rt=S.colorSpace===In||it===rt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let Q=_(S.image,!1,r.maxTextureSize);Q=Tt(S,Q);const gt=s.convert(S.format,S.colorSpace),Ut=s.convert(S.type);let Et=E(S.internalFormat,gt,Ut,S.colorSpace,S.isVideoTexture);ut(Y,S);let at;const Lt=S.mipmaps,Ft=S.isVideoTexture!==!0,te=vt.__version===void 0||K===!0,R=j.dataReady,ot=w(S,Q);if(S.isDepthTexture)Et=M(S.format===Xi,S.type),te&&(Ft?e.texStorage2D(n.TEXTURE_2D,1,Et,Q.width,Q.height):e.texImage2D(n.TEXTURE_2D,0,Et,Q.width,Q.height,0,gt,Ut,null));else if(S.isDataTexture)if(Lt.length>0){Ft&&te&&e.texStorage2D(n.TEXTURE_2D,ot,Et,Lt[0].width,Lt[0].height);for(let X=0,q=Lt.length;X<q;X++)at=Lt[X],Ft?R&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,at.width,at.height,gt,Ut,at.data):e.texImage2D(n.TEXTURE_2D,X,Et,at.width,at.height,0,gt,Ut,at.data);S.generateMipmaps=!1}else Ft?(te&&e.texStorage2D(n.TEXTURE_2D,ot,Et,Q.width,Q.height),R&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Q.width,Q.height,gt,Ut,Q.data)):e.texImage2D(n.TEXTURE_2D,0,Et,Q.width,Q.height,0,gt,Ut,Q.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ft&&te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ot,Et,Lt[0].width,Lt[0].height,Q.depth);for(let X=0,q=Lt.length;X<q;X++)if(at=Lt[X],S.format!==nn)if(gt!==null)if(Ft){if(R)if(S.layerUpdates.size>0){for(const et of S.layerUpdates){const wt=at.width*at.height;e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,et,at.width,at.height,1,gt,at.data.slice(wt*et,wt*(et+1)),0,0)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,at.width,at.height,Q.depth,gt,at.data,0,0)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,X,Et,at.width,at.height,Q.depth,0,at.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?R&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,at.width,at.height,Q.depth,gt,Ut,at.data):e.texImage3D(n.TEXTURE_2D_ARRAY,X,Et,at.width,at.height,Q.depth,0,gt,Ut,at.data)}else{Ft&&te&&e.texStorage2D(n.TEXTURE_2D,ot,Et,Lt[0].width,Lt[0].height);for(let X=0,q=Lt.length;X<q;X++)at=Lt[X],S.format!==nn?gt!==null?Ft?R&&e.compressedTexSubImage2D(n.TEXTURE_2D,X,0,0,at.width,at.height,gt,at.data):e.compressedTexImage2D(n.TEXTURE_2D,X,Et,at.width,at.height,0,at.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?R&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,at.width,at.height,gt,Ut,at.data):e.texImage2D(n.TEXTURE_2D,X,Et,at.width,at.height,0,gt,Ut,at.data)}else if(S.isDataArrayTexture)if(Ft){if(te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ot,Et,Q.width,Q.height,Q.depth),R)if(S.layerUpdates.size>0){let X;switch(Ut){case n.UNSIGNED_BYTE:switch(gt){case n.ALPHA:X=1;break;case n.LUMINANCE:X=1;break;case n.LUMINANCE_ALPHA:X=2;break;case n.RGB:X=3;break;case n.RGBA:X=4;break;default:throw new Error(`Unknown texel size for format ${gt}.`)}break;case n.UNSIGNED_SHORT_4_4_4_4:case n.UNSIGNED_SHORT_5_5_5_1:case n.UNSIGNED_SHORT_5_6_5:X=1;break;default:throw new Error(`Unknown texel size for type ${Ut}.`)}const q=Q.width*Q.height*X;for(const et of S.layerUpdates)e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,et,Q.width,Q.height,1,gt,Ut,Q.data.slice(q*et,q*(et+1)));S.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,gt,Ut,Q.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Et,Q.width,Q.height,Q.depth,0,gt,Ut,Q.data);else if(S.isData3DTexture)Ft?(te&&e.texStorage3D(n.TEXTURE_3D,ot,Et,Q.width,Q.height,Q.depth),R&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,gt,Ut,Q.data)):e.texImage3D(n.TEXTURE_3D,0,Et,Q.width,Q.height,Q.depth,0,gt,Ut,Q.data);else if(S.isFramebufferTexture){if(te)if(Ft)e.texStorage2D(n.TEXTURE_2D,ot,Et,Q.width,Q.height);else{let X=Q.width,q=Q.height;for(let et=0;et<ot;et++)e.texImage2D(n.TEXTURE_2D,et,Et,X,q,0,gt,Ut,null),X>>=1,q>>=1}}else if(Lt.length>0){if(Ft&&te){const X=ne(Lt[0]);e.texStorage2D(n.TEXTURE_2D,ot,Et,X.width,X.height)}for(let X=0,q=Lt.length;X<q;X++)at=Lt[X],Ft?R&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,gt,Ut,at):e.texImage2D(n.TEXTURE_2D,X,Et,gt,Ut,at);S.generateMipmaps=!1}else if(Ft){if(te){const X=ne(Q);e.texStorage2D(n.TEXTURE_2D,ot,Et,X.width,X.height)}R&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,gt,Ut,Q)}else e.texImage2D(n.TEXTURE_2D,0,Et,gt,Ut,Q);f(S)&&p(Y),vt.__version=j.version,S.onUpdate&&S.onUpdate(S)}b.__version=S.version}function W(b,S,k){if(S.image.length!==6)return;const Y=Dt(b,S),K=S.source;e.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+k);const j=i.get(K);if(K.version!==j.__version||Y===!0){e.activeTexture(n.TEXTURE0+k);const vt=Xt.getPrimaries(Xt.workingColorSpace),it=S.colorSpace===In?null:Xt.getPrimaries(S.colorSpace),rt=S.colorSpace===In||vt===it?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt);const Rt=S.isCompressedTexture||S.image[0].isCompressedTexture,Q=S.image[0]&&S.image[0].isDataTexture,gt=[];for(let q=0;q<6;q++)!Rt&&!Q?gt[q]=_(S.image[q],!0,r.maxCubemapSize):gt[q]=Q?S.image[q].image:S.image[q],gt[q]=Tt(S,gt[q]);const Ut=gt[0],Et=s.convert(S.format,S.colorSpace),at=s.convert(S.type),Lt=E(S.internalFormat,Et,at,S.colorSpace),Ft=S.isVideoTexture!==!0,te=j.__version===void 0||Y===!0,R=K.dataReady;let ot=w(S,Ut);ut(n.TEXTURE_CUBE_MAP,S);let X;if(Rt){Ft&&te&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ot,Lt,Ut.width,Ut.height);for(let q=0;q<6;q++){X=gt[q].mipmaps;for(let et=0;et<X.length;et++){const wt=X[et];S.format!==nn?Et!==null?Ft?R&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,0,0,wt.width,wt.height,Et,wt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,Lt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?R&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,0,0,wt.width,wt.height,Et,at,wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,Lt,wt.width,wt.height,0,Et,at,wt.data)}}}else{if(X=S.mipmaps,Ft&&te){X.length>0&&ot++;const q=ne(gt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ot,Lt,q.width,q.height)}for(let q=0;q<6;q++)if(Q){Ft?R&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,gt[q].width,gt[q].height,Et,at,gt[q].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Lt,gt[q].width,gt[q].height,0,Et,at,gt[q].data);for(let et=0;et<X.length;et++){const Ht=X[et].image[q].image;Ft?R&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,0,0,Ht.width,Ht.height,Et,at,Ht.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,Lt,Ht.width,Ht.height,0,Et,at,Ht.data)}}else{Ft?R&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Et,at,gt[q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Lt,Et,at,gt[q]);for(let et=0;et<X.length;et++){const wt=X[et];Ft?R&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,0,0,Et,at,wt.image[q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,Lt,Et,at,wt.image[q])}}}f(S)&&p(n.TEXTURE_CUBE_MAP),j.__version=K.version,S.onUpdate&&S.onUpdate(S)}b.__version=S.version}function J(b,S,k,Y,K,j){const vt=s.convert(k.format,k.colorSpace),it=s.convert(k.type),rt=E(k.internalFormat,vt,it,k.colorSpace);if(!i.get(S).__hasExternalTextures){const Q=Math.max(1,S.width>>j),gt=Math.max(1,S.height>>j);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?e.texImage3D(K,j,rt,Q,gt,S.depth,0,vt,it,null):e.texImage2D(K,j,rt,Q,gt,0,vt,it,null)}e.bindFramebuffer(n.FRAMEBUFFER,b),kt(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,K,i.get(k).__webglTexture,0,St(S)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,K,i.get(k).__webglTexture,j),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ht(b,S,k){if(n.bindRenderbuffer(n.RENDERBUFFER,b),S.depthBuffer){const Y=S.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,j=M(S.stencilBuffer,K),vt=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=St(S);kt(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,it,j,S.width,S.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,it,j,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,j,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,vt,n.RENDERBUFFER,b)}else{const Y=S.textures;for(let K=0;K<Y.length;K++){const j=Y[K],vt=s.convert(j.format,j.colorSpace),it=s.convert(j.type),rt=E(j.internalFormat,vt,it,j.colorSpace),Rt=St(S);k&&kt(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Rt,rt,S.width,S.height):kt(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Rt,rt,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,rt,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function st(b,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,b),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),V(S.depthTexture,0);const Y=i.get(S.depthTexture).__webglTexture,K=St(S);if(S.depthTexture.format===Fi)kt(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Y,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Y,0);else if(S.depthTexture.format===Xi)kt(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Y,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function Pt(b){const S=i.get(b),k=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");st(S.__webglFramebuffer,b)}else if(k){S.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[Y]),S.__webglDepthbuffer[Y]=n.createRenderbuffer(),ht(S.__webglDepthbuffer[Y],b,!1)}else e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=n.createRenderbuffer(),ht(S.__webglDepthbuffer,b,!1);e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ct(b,S,k){const Y=i.get(b);S!==void 0&&J(Y.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&Pt(b)}function zt(b){const S=b.texture,k=i.get(b),Y=i.get(S);b.addEventListener("dispose",T);const K=b.textures,j=b.isWebGLCubeRenderTarget===!0,vt=K.length>1;if(vt||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=S.version,a.memory.textures++),j){k.__webglFramebuffer=[];for(let it=0;it<6;it++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[it]=[];for(let rt=0;rt<S.mipmaps.length;rt++)k.__webglFramebuffer[it][rt]=n.createFramebuffer()}else k.__webglFramebuffer[it]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let it=0;it<S.mipmaps.length;it++)k.__webglFramebuffer[it]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(vt)for(let it=0,rt=K.length;it<rt;it++){const Rt=i.get(K[it]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&kt(b)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let it=0;it<K.length;it++){const rt=K[it];k.__webglColorRenderbuffer[it]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[it]);const Rt=s.convert(rt.format,rt.colorSpace),Q=s.convert(rt.type),gt=E(rt.internalFormat,Rt,Q,rt.colorSpace,b.isXRRenderTarget===!0),Ut=St(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ut,gt,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+it,n.RENDERBUFFER,k.__webglColorRenderbuffer[it])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),ht(k.__webglDepthRenderbuffer,b,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){e.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),ut(n.TEXTURE_CUBE_MAP,S);for(let it=0;it<6;it++)if(S.mipmaps&&S.mipmaps.length>0)for(let rt=0;rt<S.mipmaps.length;rt++)J(k.__webglFramebuffer[it][rt],b,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+it,rt);else J(k.__webglFramebuffer[it],b,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);f(S)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let it=0,rt=K.length;it<rt;it++){const Rt=K[it],Q=i.get(Rt);e.bindTexture(n.TEXTURE_2D,Q.__webglTexture),ut(n.TEXTURE_2D,Rt),J(k.__webglFramebuffer,b,Rt,n.COLOR_ATTACHMENT0+it,n.TEXTURE_2D,0),f(Rt)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let it=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(it=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(it,Y.__webglTexture),ut(it,S),S.mipmaps&&S.mipmaps.length>0)for(let rt=0;rt<S.mipmaps.length;rt++)J(k.__webglFramebuffer[rt],b,S,n.COLOR_ATTACHMENT0,it,rt);else J(k.__webglFramebuffer,b,S,n.COLOR_ATTACHMENT0,it,0);f(S)&&p(it),e.unbindTexture()}b.depthBuffer&&Pt(b)}function L(b){const S=b.textures;for(let k=0,Y=S.length;k<Y;k++){const K=S[k];if(f(K)){const j=b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,vt=i.get(K).__webglTexture;e.bindTexture(j,vt),p(j),e.unbindTexture()}}}const Bt=[],Nt=[];function jt(b){if(b.samples>0){if(kt(b)===!1){const S=b.textures,k=b.width,Y=b.height;let K=n.COLOR_BUFFER_BIT;const j=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,vt=i.get(b),it=S.length>1;if(it)for(let rt=0;rt<S.length;rt++)e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+rt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+rt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let rt=0;rt<S.length;rt++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),it){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,vt.__webglColorRenderbuffer[rt]);const Rt=i.get(S[rt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Rt,0)}n.blitFramebuffer(0,0,k,Y,0,0,k,Y,K,n.NEAREST),l===!0&&(Bt.length=0,Nt.length=0,Bt.push(n.COLOR_ATTACHMENT0+rt),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Bt.push(j),Nt.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Nt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Bt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),it)for(let rt=0;rt<S.length;rt++){e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+rt,n.RENDERBUFFER,vt.__webglColorRenderbuffer[rt]);const Rt=i.get(S[rt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+rt,n.TEXTURE_2D,Rt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const S=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function St(b){return Math.min(r.maxSamples,b.samples)}function kt(b){const S=i.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function It(b){const S=a.render.frame;d.get(b)!==S&&(d.set(b,S),b.update())}function Tt(b,S){const k=b.colorSpace,Y=b.format,K=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||k!==Xn&&k!==In&&(Xt.getTransfer(k)===Yt?(Y!==nn||K!==Vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}function ne(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=A,this.setTexture2D=V,this.setTexture2DArray=$,this.setTexture3D=H,this.setTextureCube=Z,this.rebindTextures=Ct,this.setupRenderTarget=zt,this.updateRenderTargetMipmap=L,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=J,this.useMultisampledRTT=kt}function Wg(n,t){function e(i,r=In){let s;const a=Xt.getTransfer(r);if(i===Vn)return n.UNSIGNED_BYTE;if(i===Tc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===bc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===bu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===wu)return n.BYTE;if(i===Tu)return n.SHORT;if(i===fs)return n.UNSIGNED_SHORT;if(i===wc)return n.INT;if(i===Vi)return n.UNSIGNED_INT;if(i===Dn)return n.FLOAT;if(i===bs)return n.HALF_FLOAT;if(i===Au)return n.ALPHA;if(i===Cu)return n.RGB;if(i===nn)return n.RGBA;if(i===Ru)return n.LUMINANCE;if(i===Lu)return n.LUMINANCE_ALPHA;if(i===Fi)return n.DEPTH_COMPONENT;if(i===Xi)return n.DEPTH_STENCIL;if(i===Pu)return n.RED;if(i===Ac)return n.RED_INTEGER;if(i===Iu)return n.RG;if(i===Cc)return n.RG_INTEGER;if(i===Rc)return n.RGBA_INTEGER;if(i===Os||i===Bs||i===zs||i===ks)if(a===Yt)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Os)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Bs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===zs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ks)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Os)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Bs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===zs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ks)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Co||i===Ro||i===Lo||i===Po)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Co)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ro)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Lo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Po)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Io||i===Do||i===Uo)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Io||i===Do)return a===Yt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Uo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===No||i===Fo||i===Oo||i===Bo||i===zo||i===ko||i===Ho||i===Go||i===Vo||i===Wo||i===Xo||i===$o||i===qo||i===Yo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===No)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Fo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Oo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Bo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===zo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ko)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ho)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Go)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Wo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Xo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===$o)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===qo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Yo)return a===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Hs||i===Ko||i===jo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Hs)return a===Yt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ko)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===jo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Du||i===Zo||i===Jo||i===Qo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Hs)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Zo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Jo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Qo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Wi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Xg extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class li extends ae{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $g={type:"move"};class pa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new li,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new li,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new li,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const f=e.getJointPose(_,i),p=this._getHandJoint(c,_);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&h>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($g)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new li;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const qg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yg=`
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

}`;class Kg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new xe,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Ye({vertexShader:qg,fragmentShader:Yg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ve(new gi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class jg extends Ki{constructor(t,e){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,m=null,g=null;const _=new Kg,f=e.getContextAttributes();let p=null,E=null;const M=[],w=[],I=new Ot;let T=null;const C=new Oe;C.layers.enable(1),C.viewport=new he;const U=new Oe;U.layers.enable(2),U.viewport=new he;const v=[C,U],x=new Xg;x.layers.enable(1),x.layers.enable(2);let A=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let J=M[W];return J===void 0&&(J=new pa,M[W]=J),J.getTargetRaySpace()},this.getControllerGrip=function(W){let J=M[W];return J===void 0&&(J=new pa,M[W]=J),J.getGripSpace()},this.getHand=function(W){let J=M[W];return J===void 0&&(J=new pa,M[W]=J),J.getHandSpace()};function F(W){const J=w.indexOf(W.inputSource);if(J===-1)return;const ht=M[J];ht!==void 0&&(ht.update(W.inputSource,W.frame,c||a),ht.dispatchEvent({type:W.type,data:W.inputSource}))}function V(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",$);for(let W=0;W<M.length;W++){const J=w[W];J!==null&&(w[W]=null,M[W].disconnect(J))}A=null,B=null,_.reset(),t.setRenderTarget(p),m=null,h=null,u=null,r=null,E=null,Gt.stop(),i.isPresenting=!1,t.setPixelRatio(T),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",V),r.addEventListener("inputsourceschange",$),f.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(I),r.renderState.layers===void 0){const J={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,e,J),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new hi(m.framebufferWidth,m.framebufferHeight,{format:nn,type:Vn,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil})}else{let J=null,ht=null,st=null;f.depth&&(st=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,J=f.stencil?Xi:Fi,ht=f.stencil?Wi:Vi);const Pt={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:s};u=new XRWebGLBinding(r,e),h=u.createProjectionLayer(Pt),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),E=new hi(h.textureWidth,h.textureHeight,{format:nn,type:Vn,depthTexture:new Vc(h.textureWidth,h.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Gt.setContext(r),Gt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function $(W){for(let J=0;J<W.removed.length;J++){const ht=W.removed[J],st=w.indexOf(ht);st>=0&&(w[st]=null,M[st].disconnect(ht))}for(let J=0;J<W.added.length;J++){const ht=W.added[J];let st=w.indexOf(ht);if(st===-1){for(let Ct=0;Ct<M.length;Ct++)if(Ct>=w.length){w.push(ht),st=Ct;break}else if(w[Ct]===null){w[Ct]=ht,st=Ct;break}if(st===-1)break}const Pt=M[st];Pt&&Pt.connect(ht)}}const H=new P,Z=new P;function G(W,J,ht){H.setFromMatrixPosition(J.matrixWorld),Z.setFromMatrixPosition(ht.matrixWorld);const st=H.distanceTo(Z),Pt=J.projectionMatrix.elements,Ct=ht.projectionMatrix.elements,zt=Pt[14]/(Pt[10]-1),L=Pt[14]/(Pt[10]+1),Bt=(Pt[9]+1)/Pt[5],Nt=(Pt[9]-1)/Pt[5],jt=(Pt[8]-1)/Pt[0],St=(Ct[8]+1)/Ct[0],kt=zt*jt,It=zt*St,Tt=st/(-jt+St),ne=Tt*-jt;J.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(ne),W.translateZ(Tt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const b=zt+Tt,S=L+Tt,k=kt-ne,Y=It+(st-ne),K=Bt*L/S*b,j=Nt*L/S*b;W.projectionMatrix.makePerspective(k,Y,K,j,b,S),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function dt(W,J){J===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(J.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;_.texture!==null&&(W.near=_.depthNear,W.far=_.depthFar),x.near=U.near=C.near=W.near,x.far=U.far=C.far=W.far,(A!==x.near||B!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),A=x.near,B=x.far,C.near=A,C.far=B,U.near=A,U.far=B,C.updateProjectionMatrix(),U.updateProjectionMatrix(),W.updateProjectionMatrix());const J=W.parent,ht=x.cameras;dt(x,J);for(let st=0;st<ht.length;st++)dt(ht[st],J);ht.length===2?G(x,C,U):x.projectionMatrix.copy(C.projectionMatrix),ct(W,x,J)};function ct(W,J,ht){ht===null?W.matrix.copy(J.matrixWorld):(W.matrix.copy(ht.matrixWorld),W.matrix.invert(),W.matrix.multiply(J.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(J.projectionMatrix),W.projectionMatrixInverse.copy(J.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ra*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(W){l=W,h!==null&&(h.fixedFoveation=W),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let ut=null;function Dt(W,J){if(d=J.getViewerPose(c||a),g=J,d!==null){const ht=d.views;m!==null&&(t.setRenderTargetFramebuffer(E,m.framebuffer),t.setRenderTarget(E));let st=!1;ht.length!==x.cameras.length&&(x.cameras.length=0,st=!0);for(let Ct=0;Ct<ht.length;Ct++){const zt=ht[Ct];let L=null;if(m!==null)L=m.getViewport(zt);else{const Nt=u.getViewSubImage(h,zt);L=Nt.viewport,Ct===0&&(t.setRenderTargetTextures(E,Nt.colorTexture,h.ignoreDepthValues?void 0:Nt.depthStencilTexture),t.setRenderTarget(E))}let Bt=v[Ct];Bt===void 0&&(Bt=new Oe,Bt.layers.enable(Ct),Bt.viewport=new he,v[Ct]=Bt),Bt.matrix.fromArray(zt.transform.matrix),Bt.matrix.decompose(Bt.position,Bt.quaternion,Bt.scale),Bt.projectionMatrix.fromArray(zt.projectionMatrix),Bt.projectionMatrixInverse.copy(Bt.projectionMatrix).invert(),Bt.viewport.set(L.x,L.y,L.width,L.height),Ct===0&&(x.matrix.copy(Bt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),st===!0&&x.cameras.push(Bt)}const Pt=r.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const Ct=u.getDepthInformation(ht[0]);Ct&&Ct.isValid&&Ct.texture&&_.init(t,Ct,r.renderState)}}for(let ht=0;ht<M.length;ht++){const st=w[ht],Pt=M[ht];st!==null&&Pt!==void 0&&Pt.update(st,J,c||a)}ut&&ut(W,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),g=null}const Gt=new Gc;Gt.setAnimationLoop(Dt),this.setAnimationLoop=function(W){ut=W},this.dispose=function(){}}}const ti=new qe,Zg=new Kt;function Jg(n,t){function e(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function i(f,p){p.color.getRGB(f.fogColor.value,zc(n)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function r(f,p,E,M,w){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(f,p):p.isMeshToonMaterial?(s(f,p),u(f,p)):p.isMeshPhongMaterial?(s(f,p),d(f,p)):p.isMeshStandardMaterial?(s(f,p),h(f,p),p.isMeshPhysicalMaterial&&m(f,p,w)):p.isMeshMatcapMaterial?(s(f,p),g(f,p)):p.isMeshDepthMaterial?s(f,p):p.isMeshDistanceMaterial?(s(f,p),_(f,p)):p.isMeshNormalMaterial?s(f,p):p.isLineBasicMaterial?(a(f,p),p.isLineDashedMaterial&&o(f,p)):p.isPointsMaterial?l(f,p,E,M):p.isSpriteMaterial?c(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,e(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===we&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,e(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===we&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,e(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,e(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const E=t.get(p),M=E.envMap,w=E.envMapRotation;M&&(f.envMap.value=M,ti.copy(w),ti.x*=-1,ti.y*=-1,ti.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),f.envMapRotation.value.setFromMatrix4(Zg.makeRotationFromEuler(ti)),f.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,f.aoMapTransform))}function a(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform))}function o(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function l(f,p,E,M){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*E,f.scale.value=M*.5,p.map&&(f.map.value=p.map,e(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function d(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function u(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function h(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function m(f,p,E){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===we&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=E.texture,f.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,p){p.matcap&&(f.matcap.value=p.matcap)}function _(f,p){const E=t.get(p).light;f.referencePosition.value.setFromMatrixPosition(E.matrixWorld),f.nearDistance.value=E.shadow.camera.near,f.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Qg(n,t,e,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,M){const w=M.program;i.uniformBlockBinding(E,w)}function c(E,M){let w=r[E.id];w===void 0&&(g(E),w=d(E),r[E.id]=w,E.addEventListener("dispose",f));const I=M.program;i.updateUBOMapping(E,I);const T=t.render.frame;s[E.id]!==T&&(h(E),s[E.id]=T)}function d(E){const M=u();E.__bindingPointIndex=M;const w=n.createBuffer(),I=E.__size,T=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,I,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,w),w}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(E){const M=r[E.id],w=E.uniforms,I=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let T=0,C=w.length;T<C;T++){const U=Array.isArray(w[T])?w[T]:[w[T]];for(let v=0,x=U.length;v<x;v++){const A=U[v];if(m(A,T,v,I)===!0){const B=A.__offset,F=Array.isArray(A.value)?A.value:[A.value];let V=0;for(let $=0;$<F.length;$++){const H=F[$],Z=_(H);typeof H=="number"||typeof H=="boolean"?(A.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,B+V,A.__data)):H.isMatrix3?(A.__data[0]=H.elements[0],A.__data[1]=H.elements[1],A.__data[2]=H.elements[2],A.__data[3]=0,A.__data[4]=H.elements[3],A.__data[5]=H.elements[4],A.__data[6]=H.elements[5],A.__data[7]=0,A.__data[8]=H.elements[6],A.__data[9]=H.elements[7],A.__data[10]=H.elements[8],A.__data[11]=0):(H.toArray(A.__data,V),V+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(E,M,w,I){const T=E.value,C=M+"_"+w;if(I[C]===void 0)return typeof T=="number"||typeof T=="boolean"?I[C]=T:I[C]=T.clone(),!0;{const U=I[C];if(typeof T=="number"||typeof T=="boolean"){if(U!==T)return I[C]=T,!0}else if(U.equals(T)===!1)return U.copy(T),!0}return!1}function g(E){const M=E.uniforms;let w=0;const I=16;for(let C=0,U=M.length;C<U;C++){const v=Array.isArray(M[C])?M[C]:[M[C]];for(let x=0,A=v.length;x<A;x++){const B=v[x],F=Array.isArray(B.value)?B.value:[B.value];for(let V=0,$=F.length;V<$;V++){const H=F[V],Z=_(H),G=w%I;G!==0&&I-G<Z.boundary&&(w+=I-G),B.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=w,w+=Z.storage}}}const T=w%I;return T>0&&(w+=I-T),E.__size=w,E.__cache={},this}function _(E){const M={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(M.boundary=4,M.storage=4):E.isVector2?(M.boundary=8,M.storage=8):E.isVector3||E.isColor?(M.boundary=16,M.storage=12):E.isVector4?(M.boundary=16,M.storage=16):E.isMatrix3?(M.boundary=48,M.storage=48):E.isMatrix4?(M.boundary=64,M.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),M}function f(E){const M=E.target;M.removeEventListener("dispose",f);const w=a.indexOf(M.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function p(){for(const E in r)n.deleteBuffer(r[E]);a=[],r={},s={}}return{bind:l,update:c,dispose:p}}class t_{constructor(t={}){const{canvas:e=Xu(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,f=null;const p=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Je,this.toneMapping=zn,this.toneMappingExposure=1;const M=this;let w=!1,I=0,T=0,C=null,U=-1,v=null;const x=new he,A=new he;let B=null;const F=new pt(0);let V=0,$=e.width,H=e.height,Z=1,G=null,dt=null;const ct=new he(0,0,$,H),ut=new he(0,0,$,H);let Dt=!1;const Gt=new Za;let W=!1,J=!1;const ht=new Kt,st=new P,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ct=!1;function zt(){return C===null?Z:1}let L=i;function Bt(y,D){return e.getContext(y,D)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Xa}`),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",X,!1),e.addEventListener("webglcontextcreationerror",q,!1),L===null){const D="webgl2";if(L=Bt(D,y),L===null)throw Bt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Nt,jt,St,kt,It,Tt,ne,b,S,k,Y,K,j,vt,it,rt,Rt,Q,gt,Ut,Et,at,Lt,Ft;function te(){Nt=new lm(L),Nt.init(),at=new Wg(L,Nt),jt=new nm(L,Nt,t,at),St=new Gg(L),kt=new um(L),It=new Cg,Tt=new Vg(L,Nt,St,It,jt,at,kt),ne=new rm(M),b=new om(M),S=new _h(L),Lt=new tm(L,S),k=new cm(L,S,kt,Lt),Y=new fm(L,k,S,kt),gt=new hm(L,jt,Tt),rt=new im(It),K=new Ag(M,ne,b,Nt,jt,Lt,rt),j=new Jg(M,It),vt=new Lg,it=new Fg(Nt),Q=new Qp(M,ne,b,St,Y,h,l),Rt=new Hg(M,Y,jt),Ft=new Qg(L,kt,jt,St),Ut=new em(L,Nt,kt),Et=new dm(L,Nt,kt),kt.programs=K.programs,M.capabilities=jt,M.extensions=Nt,M.properties=It,M.renderLists=vt,M.shadowMap=Rt,M.state=St,M.info=kt}te();const R=new jg(M,L);this.xr=R,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const y=Nt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Nt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(y){y!==void 0&&(Z=y,this.setSize($,H,!1))},this.getSize=function(y){return y.set($,H)},this.setSize=function(y,D,O=!0){if(R.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=y,H=D,e.width=Math.floor(y*Z),e.height=Math.floor(D*Z),O===!0&&(e.style.width=y+"px",e.style.height=D+"px"),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set($*Z,H*Z).floor()},this.setDrawingBufferSize=function(y,D,O){$=y,H=D,Z=O,e.width=Math.floor(y*O),e.height=Math.floor(D*O),this.setViewport(0,0,y,D)},this.getCurrentViewport=function(y){return y.copy(x)},this.getViewport=function(y){return y.copy(ct)},this.setViewport=function(y,D,O,z){y.isVector4?ct.set(y.x,y.y,y.z,y.w):ct.set(y,D,O,z),St.viewport(x.copy(ct).multiplyScalar(Z).round())},this.getScissor=function(y){return y.copy(ut)},this.setScissor=function(y,D,O,z){y.isVector4?ut.set(y.x,y.y,y.z,y.w):ut.set(y,D,O,z),St.scissor(A.copy(ut).multiplyScalar(Z).round())},this.getScissorTest=function(){return Dt},this.setScissorTest=function(y){St.setScissorTest(Dt=y)},this.setOpaqueSort=function(y){G=y},this.setTransparentSort=function(y){dt=y},this.getClearColor=function(y){return y.copy(Q.getClearColor())},this.setClearColor=function(){Q.setClearColor.apply(Q,arguments)},this.getClearAlpha=function(){return Q.getClearAlpha()},this.setClearAlpha=function(){Q.setClearAlpha.apply(Q,arguments)},this.clear=function(y=!0,D=!0,O=!0){let z=0;if(y){let N=!1;if(C!==null){const tt=C.texture.format;N=tt===Rc||tt===Cc||tt===Ac}if(N){const tt=C.texture.type,lt=tt===Vn||tt===Vi||tt===fs||tt===Wi||tt===Tc||tt===bc,ft=Q.getClearColor(),mt=Q.getClearAlpha(),Mt=ft.r,yt=ft.g,xt=ft.b;lt?(m[0]=Mt,m[1]=yt,m[2]=xt,m[3]=mt,L.clearBufferuiv(L.COLOR,0,m)):(g[0]=Mt,g[1]=yt,g[2]=xt,g[3]=mt,L.clearBufferiv(L.COLOR,0,g))}else z|=L.COLOR_BUFFER_BIT}D&&(z|=L.DEPTH_BUFFER_BIT),O&&(z|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",X,!1),e.removeEventListener("webglcontextcreationerror",q,!1),vt.dispose(),it.dispose(),It.dispose(),ne.dispose(),b.dispose(),Y.dispose(),Lt.dispose(),Ft.dispose(),K.dispose(),R.dispose(),R.removeEventListener("sessionstart",Ke),R.removeEventListener("sessionend",je),qn.stop()};function ot(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function X(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const y=kt.autoReset,D=Rt.enabled,O=Rt.autoUpdate,z=Rt.needsUpdate,N=Rt.type;te(),kt.autoReset=y,Rt.enabled=D,Rt.autoUpdate=O,Rt.needsUpdate=z,Rt.type=N}function q(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function et(y){const D=y.target;D.removeEventListener("dispose",et),wt(D)}function wt(y){Ht(y),It.remove(y)}function Ht(y){const D=It.get(y).programs;D!==void 0&&(D.forEach(function(O){K.releaseProgram(O)}),y.isShaderMaterial&&K.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,O,z,N,tt){D===null&&(D=Pt);const lt=N.isMesh&&N.matrixWorld.determinant()<0,ft=Fd(y,D,O,z,N);St.setMaterial(z,lt);let mt=O.index,Mt=1;if(z.wireframe===!0){if(mt=k.getWireframeAttribute(O),mt===void 0)return;Mt=2}const yt=O.drawRange,xt=O.attributes.position;let Vt=yt.start*Mt,Zt=(yt.start+yt.count)*Mt;tt!==null&&(Vt=Math.max(Vt,tt.start*Mt),Zt=Math.min(Zt,(tt.start+tt.count)*Mt)),mt!==null?(Vt=Math.max(Vt,0),Zt=Math.min(Zt,mt.count)):xt!=null&&(Vt=Math.max(Vt,0),Zt=Math.min(Zt,xt.count));const Jt=Zt-Vt;if(Jt<0||Jt===1/0)return;Lt.setup(N,z,ft,O,mt);let Te,Wt=Ut;if(mt!==null&&(Te=S.get(mt),Wt=Et,Wt.setIndex(Te)),N.isMesh)z.wireframe===!0?(St.setLineWidth(z.wireframeLinewidth*zt()),Wt.setMode(L.LINES)):Wt.setMode(L.TRIANGLES);else if(N.isLine){let _t=z.linewidth;_t===void 0&&(_t=1),St.setLineWidth(_t*zt()),N.isLineSegments?Wt.setMode(L.LINES):N.isLineLoop?Wt.setMode(L.LINE_LOOP):Wt.setMode(L.LINE_STRIP)}else N.isPoints?Wt.setMode(L.POINTS):N.isSprite&&Wt.setMode(L.TRIANGLES);if(N.isBatchedMesh)N._multiDrawInstances!==null?Wt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances):Wt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else if(N.isInstancedMesh)Wt.renderInstances(Vt,Jt,N.count);else if(O.isInstancedBufferGeometry){const _t=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,ge=Math.min(O.instanceCount,_t);Wt.renderInstances(Vt,Jt,ge)}else Wt.render(Vt,Jt)};function ee(y,D,O){y.transparent===!0&&y.side===Be&&y.forceSinglePass===!1?(y.side=we,y.needsUpdate=!0,Lr(y,D,O),y.side=Gn,y.needsUpdate=!0,Lr(y,D,O),y.side=Be):Lr(y,D,O)}this.compile=function(y,D,O=null){O===null&&(O=y),f=it.get(O),f.init(D),E.push(f),O.traverseVisible(function(N){N.isLight&&N.layers.test(D.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),y!==O&&y.traverseVisible(function(N){N.isLight&&N.layers.test(D.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),f.setupLights();const z=new Set;return y.traverse(function(N){const tt=N.material;if(tt)if(Array.isArray(tt))for(let lt=0;lt<tt.length;lt++){const ft=tt[lt];ee(ft,O,N),z.add(ft)}else ee(tt,O,N),z.add(tt)}),E.pop(),f=null,z},this.compileAsync=function(y,D,O=null){const z=this.compile(y,D,O);return new Promise(N=>{function tt(){if(z.forEach(function(lt){It.get(lt).currentProgram.isReady()&&z.delete(lt)}),z.size===0){N(y);return}setTimeout(tt,10)}Nt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let ce=null;function $t(y){ce&&ce(y)}function Ke(){qn.stop()}function je(){qn.start()}const qn=new Gc;qn.setAnimationLoop($t),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(y){ce=y,R.setAnimationLoop(y),y===null?qn.stop():qn.start()},R.addEventListener("sessionstart",Ke),R.addEventListener("sessionend",je),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),R.enabled===!0&&R.isPresenting===!0&&(R.cameraAutoUpdate===!0&&R.updateCamera(D),D=R.getCamera()),y.isScene===!0&&y.onBeforeRender(M,y,D,C),f=it.get(y,E.length),f.init(D),E.push(f),ht.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Gt.setFromProjectionMatrix(ht),J=this.localClippingEnabled,W=rt.init(this.clippingPlanes,J),_=vt.get(y,p.length),_.init(),p.push(_),R.enabled===!0&&R.isPresenting===!0){const tt=M.xr.getDepthSensingMesh();tt!==null&&Is(tt,D,-1/0,M.sortObjects)}Is(y,D,0,M.sortObjects),_.finish(),M.sortObjects===!0&&_.sort(G,dt),Ct=R.enabled===!1||R.isPresenting===!1||R.hasDepthSensing()===!1,Ct&&Q.addToRenderList(_,y),this.info.render.frame++,W===!0&&rt.beginShadows();const O=f.state.shadowsArray;Rt.render(O,y,D),W===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=_.opaque,N=_.transmissive;if(f.setupLights(),D.isArrayCamera){const tt=D.cameras;if(N.length>0)for(let lt=0,ft=tt.length;lt<ft;lt++){const mt=tt[lt];xo(z,N,y,mt)}Ct&&Q.render(y);for(let lt=0,ft=tt.length;lt<ft;lt++){const mt=tt[lt];vo(_,y,mt,mt.viewport)}}else N.length>0&&xo(z,N,y,D),Ct&&Q.render(y),vo(_,y,D);C!==null&&(Tt.updateMultisampleRenderTarget(C),Tt.updateRenderTargetMipmap(C)),y.isScene===!0&&y.onAfterRender(M,y,D),Lt.resetDefaultState(),U=-1,v=null,E.pop(),E.length>0?(f=E[E.length-1],W===!0&&rt.setGlobalState(M.clippingPlanes,f.state.camera)):f=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Is(y,D,O,z){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)O=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLight)f.pushLight(y),y.castShadow&&f.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Gt.intersectsSprite(y)){z&&st.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ht);const lt=Y.update(y),ft=y.material;ft.visible&&_.push(y,lt,ft,O,st.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Gt.intersectsObject(y))){const lt=Y.update(y),ft=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),st.copy(y.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),st.copy(lt.boundingSphere.center)),st.applyMatrix4(y.matrixWorld).applyMatrix4(ht)),Array.isArray(ft)){const mt=lt.groups;for(let Mt=0,yt=mt.length;Mt<yt;Mt++){const xt=mt[Mt],Vt=ft[xt.materialIndex];Vt&&Vt.visible&&_.push(y,lt,Vt,O,st.z,xt)}}else ft.visible&&_.push(y,lt,ft,O,st.z,null)}}const tt=y.children;for(let lt=0,ft=tt.length;lt<ft;lt++)Is(tt[lt],D,O,z)}function vo(y,D,O,z){const N=y.opaque,tt=y.transmissive,lt=y.transparent;f.setupLightsView(O),W===!0&&rt.setGlobalState(M.clippingPlanes,O),z&&St.viewport(x.copy(z)),N.length>0&&Rr(N,D,O),tt.length>0&&Rr(tt,D,O),lt.length>0&&Rr(lt,D,O),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function xo(y,D,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[z.id]===void 0&&(f.state.transmissionRenderTarget[z.id]=new hi(1,1,{generateMipmaps:!0,type:Nt.has("EXT_color_buffer_half_float")||Nt.has("EXT_color_buffer_float")?bs:Vn,minFilter:oi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));const tt=f.state.transmissionRenderTarget[z.id],lt=z.viewport||x;tt.setSize(lt.z,lt.w);const ft=M.getRenderTarget();M.setRenderTarget(tt),M.getClearColor(F),V=M.getClearAlpha(),V<1&&M.setClearColor(16777215,.5),Ct?Q.render(O):M.clear();const mt=M.toneMapping;M.toneMapping=zn;const Mt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),f.setupLightsView(z),W===!0&&rt.setGlobalState(M.clippingPlanes,z),Rr(y,O,z),Tt.updateMultisampleRenderTarget(tt),Tt.updateRenderTargetMipmap(tt),Nt.has("WEBGL_multisampled_render_to_texture")===!1){let yt=!1;for(let xt=0,Vt=D.length;xt<Vt;xt++){const Zt=D[xt],Jt=Zt.object,Te=Zt.geometry,Wt=Zt.material,_t=Zt.group;if(Wt.side===Be&&Jt.layers.test(z.layers)){const ge=Wt.side;Wt.side=we,Wt.needsUpdate=!0,So(Jt,O,z,Te,Wt,_t),Wt.side=ge,Wt.needsUpdate=!0,yt=!0}}yt===!0&&(Tt.updateMultisampleRenderTarget(tt),Tt.updateRenderTargetMipmap(tt))}M.setRenderTarget(ft),M.setClearColor(F,V),Mt!==void 0&&(z.viewport=Mt),M.toneMapping=mt}function Rr(y,D,O){const z=D.isScene===!0?D.overrideMaterial:null;for(let N=0,tt=y.length;N<tt;N++){const lt=y[N],ft=lt.object,mt=lt.geometry,Mt=z===null?lt.material:z,yt=lt.group;ft.layers.test(O.layers)&&So(ft,D,O,mt,Mt,yt)}}function So(y,D,O,z,N,tt){y.onBeforeRender(M,D,O,z,N,tt),y.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),N.onBeforeRender(M,D,O,z,y,tt),N.transparent===!0&&N.side===Be&&N.forceSinglePass===!1?(N.side=we,N.needsUpdate=!0,M.renderBufferDirect(O,D,z,N,y,tt),N.side=Gn,N.needsUpdate=!0,M.renderBufferDirect(O,D,z,N,y,tt),N.side=Be):M.renderBufferDirect(O,D,z,N,y,tt),y.onAfterRender(M,D,O,z,N,tt)}function Lr(y,D,O){D.isScene!==!0&&(D=Pt);const z=It.get(y),N=f.state.lights,tt=f.state.shadowsArray,lt=N.state.version,ft=K.getParameters(y,N.state,tt,D,O),mt=K.getProgramCacheKey(ft);let Mt=z.programs;z.environment=y.isMeshStandardMaterial?D.environment:null,z.fog=D.fog,z.envMap=(y.isMeshStandardMaterial?b:ne).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?D.environmentRotation:y.envMapRotation,Mt===void 0&&(y.addEventListener("dispose",et),Mt=new Map,z.programs=Mt);let yt=Mt.get(mt);if(yt!==void 0){if(z.currentProgram===yt&&z.lightsStateVersion===lt)return yo(y,ft),yt}else ft.uniforms=K.getUniforms(y),y.onBuild(O,ft,M),y.onBeforeCompile(ft,M),yt=K.acquireProgram(ft,mt),Mt.set(mt,yt),z.uniforms=ft.uniforms;const xt=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(xt.clippingPlanes=rt.uniform),yo(y,ft),z.needsLights=Bd(y),z.lightsStateVersion=lt,z.needsLights&&(xt.ambientLightColor.value=N.state.ambient,xt.lightProbe.value=N.state.probe,xt.directionalLights.value=N.state.directional,xt.directionalLightShadows.value=N.state.directionalShadow,xt.spotLights.value=N.state.spot,xt.spotLightShadows.value=N.state.spotShadow,xt.rectAreaLights.value=N.state.rectArea,xt.ltc_1.value=N.state.rectAreaLTC1,xt.ltc_2.value=N.state.rectAreaLTC2,xt.pointLights.value=N.state.point,xt.pointLightShadows.value=N.state.pointShadow,xt.hemisphereLights.value=N.state.hemi,xt.directionalShadowMap.value=N.state.directionalShadowMap,xt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,xt.spotShadowMap.value=N.state.spotShadowMap,xt.spotLightMatrix.value=N.state.spotLightMatrix,xt.spotLightMap.value=N.state.spotLightMap,xt.pointShadowMap.value=N.state.pointShadowMap,xt.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=yt,z.uniformsList=null,yt}function Mo(y){if(y.uniformsList===null){const D=y.currentProgram.getUniforms();y.uniformsList=ss.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function yo(y,D){const O=It.get(y);O.outputColorSpace=D.outputColorSpace,O.batching=D.batching,O.batchingColor=D.batchingColor,O.instancing=D.instancing,O.instancingColor=D.instancingColor,O.instancingMorph=D.instancingMorph,O.skinning=D.skinning,O.morphTargets=D.morphTargets,O.morphNormals=D.morphNormals,O.morphColors=D.morphColors,O.morphTargetsCount=D.morphTargetsCount,O.numClippingPlanes=D.numClippingPlanes,O.numIntersection=D.numClipIntersection,O.vertexAlphas=D.vertexAlphas,O.vertexTangents=D.vertexTangents,O.toneMapping=D.toneMapping}function Fd(y,D,O,z,N){D.isScene!==!0&&(D=Pt),Tt.resetTextureUnits();const tt=D.fog,lt=z.isMeshStandardMaterial?D.environment:null,ft=C===null?M.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Xn,mt=(z.isMeshStandardMaterial?b:ne).get(z.envMap||lt),Mt=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,yt=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),xt=!!O.morphAttributes.position,Vt=!!O.morphAttributes.normal,Zt=!!O.morphAttributes.color;let Jt=zn;z.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Jt=M.toneMapping);const Te=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Wt=Te!==void 0?Te.length:0,_t=It.get(z),ge=f.state.lights;if(W===!0&&(J===!0||y!==v)){const Pe=y===v&&z.id===U;rt.setState(z,y,Pe)}let qt=!1;z.version===_t.__version?(_t.needsLights&&_t.lightsStateVersion!==ge.state.version||_t.outputColorSpace!==ft||N.isBatchedMesh&&_t.batching===!1||!N.isBatchedMesh&&_t.batching===!0||N.isBatchedMesh&&_t.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&_t.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&_t.instancing===!1||!N.isInstancedMesh&&_t.instancing===!0||N.isSkinnedMesh&&_t.skinning===!1||!N.isSkinnedMesh&&_t.skinning===!0||N.isInstancedMesh&&_t.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&_t.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&_t.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&_t.instancingMorph===!1&&N.morphTexture!==null||_t.envMap!==mt||z.fog===!0&&_t.fog!==tt||_t.numClippingPlanes!==void 0&&(_t.numClippingPlanes!==rt.numPlanes||_t.numIntersection!==rt.numIntersection)||_t.vertexAlphas!==Mt||_t.vertexTangents!==yt||_t.morphTargets!==xt||_t.morphNormals!==Vt||_t.morphColors!==Zt||_t.toneMapping!==Jt||_t.morphTargetsCount!==Wt)&&(qt=!0):(qt=!0,_t.__version=z.version);let ln=_t.currentProgram;qt===!0&&(ln=Lr(z,D,N));let Pr=!1,Yn=!1,Ds=!1;const de=ln.getUniforms(),yn=_t.uniforms;if(St.useProgram(ln.program)&&(Pr=!0,Yn=!0,Ds=!0),z.id!==U&&(U=z.id,Yn=!0),Pr||v!==y){de.setValue(L,"projectionMatrix",y.projectionMatrix),de.setValue(L,"viewMatrix",y.matrixWorldInverse);const Pe=de.map.cameraPosition;Pe!==void 0&&Pe.setValue(L,st.setFromMatrixPosition(y.matrixWorld)),jt.logarithmicDepthBuffer&&de.setValue(L,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&de.setValue(L,"isOrthographic",y.isOrthographicCamera===!0),v!==y&&(v=y,Yn=!0,Ds=!0)}if(N.isSkinnedMesh){de.setOptional(L,N,"bindMatrix"),de.setOptional(L,N,"bindMatrixInverse");const Pe=N.skeleton;Pe&&(Pe.boneTexture===null&&Pe.computeBoneTexture(),de.setValue(L,"boneTexture",Pe.boneTexture,Tt))}N.isBatchedMesh&&(de.setOptional(L,N,"batchingTexture"),de.setValue(L,"batchingTexture",N._matricesTexture,Tt),de.setOptional(L,N,"batchingColorTexture"),N._colorsTexture!==null&&de.setValue(L,"batchingColorTexture",N._colorsTexture,Tt));const Us=O.morphAttributes;if((Us.position!==void 0||Us.normal!==void 0||Us.color!==void 0)&&gt.update(N,O,ln),(Yn||_t.receiveShadow!==N.receiveShadow)&&(_t.receiveShadow=N.receiveShadow,de.setValue(L,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(yn.envMap.value=mt,yn.flipEnvMap.value=mt.isCubeTexture&&mt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&D.environment!==null&&(yn.envMapIntensity.value=D.environmentIntensity),Yn&&(de.setValue(L,"toneMappingExposure",M.toneMappingExposure),_t.needsLights&&Od(yn,Ds),tt&&z.fog===!0&&j.refreshFogUniforms(yn,tt),j.refreshMaterialUniforms(yn,z,Z,H,f.state.transmissionRenderTarget[y.id]),ss.upload(L,Mo(_t),yn,Tt)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ss.upload(L,Mo(_t),yn,Tt),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&de.setValue(L,"center",N.center),de.setValue(L,"modelViewMatrix",N.modelViewMatrix),de.setValue(L,"normalMatrix",N.normalMatrix),de.setValue(L,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Pe=z.uniformsGroups;for(let Ns=0,zd=Pe.length;Ns<zd;Ns++){const Eo=Pe[Ns];Ft.update(Eo,ln),Ft.bind(Eo,ln)}}return ln}function Od(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function Bd(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(y,D,O){It.get(y.texture).__webglTexture=D,It.get(y.depthTexture).__webglTexture=O;const z=It.get(y);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=O===void 0,z.__autoAllocateDepthBuffer||Nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,D){const O=It.get(y);O.__webglFramebuffer=D,O.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(y,D=0,O=0){C=y,I=D,T=O;let z=!0,N=null,tt=!1,lt=!1;if(y){const mt=It.get(y);mt.__useDefaultFramebuffer!==void 0?(St.bindFramebuffer(L.FRAMEBUFFER,null),z=!1):mt.__webglFramebuffer===void 0?Tt.setupRenderTarget(y):mt.__hasExternalTextures&&Tt.rebindTextures(y,It.get(y.texture).__webglTexture,It.get(y.depthTexture).__webglTexture);const Mt=y.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(lt=!0);const yt=It.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(yt[D])?N=yt[D][O]:N=yt[D],tt=!0):y.samples>0&&Tt.useMultisampledRTT(y)===!1?N=It.get(y).__webglMultisampledFramebuffer:Array.isArray(yt)?N=yt[O]:N=yt,x.copy(y.viewport),A.copy(y.scissor),B=y.scissorTest}else x.copy(ct).multiplyScalar(Z).floor(),A.copy(ut).multiplyScalar(Z).floor(),B=Dt;if(St.bindFramebuffer(L.FRAMEBUFFER,N)&&z&&St.drawBuffers(y,N),St.viewport(x),St.scissor(A),St.setScissorTest(B),tt){const mt=It.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+D,mt.__webglTexture,O)}else if(lt){const mt=It.get(y.texture),Mt=D||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,mt.__webglTexture,O||0,Mt)}U=-1},this.readRenderTargetPixels=function(y,D,O,z,N,tt,lt){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=It.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&lt!==void 0&&(ft=ft[lt]),ft){St.bindFramebuffer(L.FRAMEBUFFER,ft);try{const mt=y.texture,Mt=mt.format,yt=mt.type;if(!jt.textureFormatReadable(Mt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!jt.textureTypeReadable(yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-z&&O>=0&&O<=y.height-N&&L.readPixels(D,O,z,N,at.convert(Mt),at.convert(yt),tt)}finally{const mt=C!==null?It.get(C).__webglFramebuffer:null;St.bindFramebuffer(L.FRAMEBUFFER,mt)}}},this.readRenderTargetPixelsAsync=async function(y,D,O,z,N,tt,lt){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=It.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&lt!==void 0&&(ft=ft[lt]),ft){St.bindFramebuffer(L.FRAMEBUFFER,ft);try{const mt=y.texture,Mt=mt.format,yt=mt.type;if(!jt.textureFormatReadable(Mt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!jt.textureTypeReadable(yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=y.width-z&&O>=0&&O<=y.height-N){const xt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,xt),L.bufferData(L.PIXEL_PACK_BUFFER,tt.byteLength,L.STREAM_READ),L.readPixels(D,O,z,N,at.convert(Mt),at.convert(yt),0),L.flush();const Vt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);await $u(L,Vt,4);try{L.bindBuffer(L.PIXEL_PACK_BUFFER,xt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,tt)}finally{L.deleteBuffer(xt),L.deleteSync(Vt)}return tt}}finally{const mt=C!==null?It.get(C).__webglFramebuffer:null;St.bindFramebuffer(L.FRAMEBUFFER,mt)}}},this.copyFramebufferToTexture=function(y,D=null,O=0){y.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,y=arguments[1]);const z=Math.pow(2,-O),N=Math.floor(y.image.width*z),tt=Math.floor(y.image.height*z),lt=D!==null?D.x:0,ft=D!==null?D.y:0;Tt.setTexture2D(y,0),L.copyTexSubImage2D(L.TEXTURE_2D,O,0,0,lt,ft,N,tt),St.unbindTexture()},this.copyTextureToTexture=function(y,D,O=null,z=null,N=0){y.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,y=arguments[1],D=arguments[2],N=arguments[3]||0,O=null);let tt,lt,ft,mt,Mt,yt;O!==null?(tt=O.max.x-O.min.x,lt=O.max.y-O.min.y,ft=O.min.x,mt=O.min.y):(tt=y.image.width,lt=y.image.height,ft=0,mt=0),z!==null?(Mt=z.x,yt=z.y):(Mt=0,yt=0);const xt=at.convert(D.format),Vt=at.convert(D.type);Tt.setTexture2D(D,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const Zt=L.getParameter(L.UNPACK_ROW_LENGTH),Jt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Te=L.getParameter(L.UNPACK_SKIP_PIXELS),Wt=L.getParameter(L.UNPACK_SKIP_ROWS),_t=L.getParameter(L.UNPACK_SKIP_IMAGES),ge=y.isCompressedTexture?y.mipmaps[N]:y.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,ge.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ge.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ft),L.pixelStorei(L.UNPACK_SKIP_ROWS,mt),y.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,N,Mt,yt,tt,lt,xt,Vt,ge.data):y.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,N,Mt,yt,ge.width,ge.height,xt,ge.data):L.texSubImage2D(L.TEXTURE_2D,N,Mt,yt,xt,Vt,ge),L.pixelStorei(L.UNPACK_ROW_LENGTH,Zt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Jt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Te),L.pixelStorei(L.UNPACK_SKIP_ROWS,Wt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,_t),N===0&&D.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),St.unbindTexture()},this.copyTextureToTexture3D=function(y,D,O=null,z=null,N=0){y.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,z=arguments[1]||null,y=arguments[2],D=arguments[3],N=arguments[4]||0);let tt,lt,ft,mt,Mt,yt,xt,Vt,Zt;const Jt=y.isCompressedTexture?y.mipmaps[N]:y.image;O!==null?(tt=O.max.x-O.min.x,lt=O.max.y-O.min.y,ft=O.max.z-O.min.z,mt=O.min.x,Mt=O.min.y,yt=O.min.z):(tt=Jt.width,lt=Jt.height,ft=Jt.depth,mt=0,Mt=0,yt=0),z!==null?(xt=z.x,Vt=z.y,Zt=z.z):(xt=0,Vt=0,Zt=0);const Te=at.convert(D.format),Wt=at.convert(D.type);let _t;if(D.isData3DTexture)Tt.setTexture3D(D,0),_t=L.TEXTURE_3D;else if(D.isDataArrayTexture||D.isCompressedArrayTexture)Tt.setTexture2DArray(D,0),_t=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);const ge=L.getParameter(L.UNPACK_ROW_LENGTH),qt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ln=L.getParameter(L.UNPACK_SKIP_PIXELS),Pr=L.getParameter(L.UNPACK_SKIP_ROWS),Yn=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Jt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Jt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,mt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Mt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,yt),y.isDataTexture||y.isData3DTexture?L.texSubImage3D(_t,N,xt,Vt,Zt,tt,lt,ft,Te,Wt,Jt.data):D.isCompressedArrayTexture?L.compressedTexSubImage3D(_t,N,xt,Vt,Zt,tt,lt,ft,Te,Jt.data):L.texSubImage3D(_t,N,xt,Vt,Zt,tt,lt,ft,Te,Wt,Jt),L.pixelStorei(L.UNPACK_ROW_LENGTH,ge),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,qt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ln),L.pixelStorei(L.UNPACK_SKIP_ROWS,Pr),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Yn),N===0&&D.generateMipmaps&&L.generateMipmap(_t),St.unbindTexture()},this.initRenderTarget=function(y){It.get(y).__webglFramebuffer===void 0&&Tt.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Tt.setTextureCube(y,0):y.isData3DTexture?Tt.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Tt.setTexture2DArray(y,0):Tt.setTexture2D(y,0),St.unbindTexture()},this.resetState=function(){I=0,T=0,C=null,St.reset(),Lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Ya?"display-p3":"srgb",e.unpackColorSpace=Xt.workingColorSpace===As?"display-p3":"srgb"}}class e_ extends ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qe,this.environmentIntensity=1,this.environmentRotation=new qe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Bi extends an{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new pt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const vs=new P,xs=new P,Wl=new Kt,cr=new Ka,ts=new Er,ma=new P,Xl=new P;class Kc extends ae{constructor(t=new Se,e=new Bi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let r=1,s=e.count;r<s;r++)vs.fromBufferAttribute(e,r-1),xs.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=vs.distanceTo(xs);t.setAttribute("lineDistance",new Qt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ts.copy(i.boundingSphere),ts.applyMatrix4(r),ts.radius+=s,t.ray.intersectsSphere(ts)===!1)return;Wl.copy(r).invert(),cr.copy(t.ray).applyMatrix4(Wl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,h=i.attributes.position;if(d!==null){const m=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=m,f=g-1;_<f;_+=c){const p=d.getX(_),E=d.getX(_+1),M=es(this,t,cr,l,p,E);M&&e.push(M)}if(this.isLineLoop){const _=d.getX(g-1),f=d.getX(m),p=es(this,t,cr,l,_,f);p&&e.push(p)}}else{const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=m,f=g-1;_<f;_+=c){const p=es(this,t,cr,l,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=es(this,t,cr,l,g-1,m);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function es(n,t,e,i,r,s){const a=n.geometry.attributes.position;if(vs.fromBufferAttribute(a,r),xs.fromBufferAttribute(a,s),e.distanceSqToSegment(vs,xs,ma,Xl)>i)return;ma.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ma);if(!(l<t.near||l>t.far))return{distance:l,point:Xl.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,object:n}}const $l=new P,ql=new P;class Pa extends Kc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let r=0,s=e.count;r<s;r+=2)$l.fromBufferAttribute(e,r),ql.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+$l.distanceTo(ql);t.setAttribute("lineDistance",new Qt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class fr extends an{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Yl=new Kt,Ia=new Ka,ns=new Er,is=new P;class as extends ae{constructor(t=new Se,e=new fr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ns.copy(i.boundingSphere),ns.applyMatrix4(r),ns.radius+=s,t.ray.intersectsSphere(ns)===!1)return;Yl.copy(r).invert(),Ia.copy(t.ray).applyMatrix4(Yl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const h=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=h,_=m;g<_;g++){const f=c.getX(g);is.fromBufferAttribute(u,f),Kl(is,f,l,r,t,e,this)}}else{const h=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let g=h,_=m;g<_;g++)is.fromBufferAttribute(u,g),Kl(is,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Kl(n,t,e,i,r,s,a){const o=Ia.distanceSqToPoint(n);if(o<e){const l=new P;Ia.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,object:a})}}class n_ extends an{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qa,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class i_ extends an{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new pt(16777215),this.specular=new pt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qa,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qe,this.combine=$a,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Ss={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(this.files[n]=t)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class r_{constructor(t,e,i){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(d){o++,s===!1&&r.onStart!==void 0&&r.onStart(d,a,o),s=!0},this.itemEnd=function(d){a++,r.onProgress!==void 0&&r.onProgress(d,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){const m=c[u],g=c[u+1];if(m.global&&(m.lastIndex=0),m.test(d))return g}return null}}}const s_=new r_;class Zi{constructor(t){this.manager=t!==void 0?t:s_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const i=this;return new Promise(function(r,s){i.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Zi.DEFAULT_MATERIAL_NAME="__DEFAULT";const pn={};class a_ extends Error{constructor(t,e){super(t),this.response=e}}class jc extends Zi{constructor(t){super(t)}load(t,e,i,r){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=Ss.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(pn[t]!==void 0){pn[t].push({onLoad:e,onProgress:i,onError:r});return}pn[t]=[],pn[t].push({onLoad:e,onProgress:i,onError:r});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const d=pn[t],u=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),m=h?parseInt(h):0,g=m!==0;let _=0;const f=new ReadableStream({start(p){E();function E(){u.read().then(({done:M,value:w})=>{if(M)p.close();else{_+=w.byteLength;const I=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:m});for(let T=0,C=d.length;T<C;T++){const U=d[T];U.onProgress&&U.onProgress(I)}p.enqueue(w),E()}},M=>{p.error(M)})}}});return new Response(f)}else throw new a_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),h=u&&u[1]?u[1].toLowerCase():void 0,m=new TextDecoder(h);return c.arrayBuffer().then(g=>m.decode(g))}}}).then(c=>{Ss.add(t,c);const d=pn[t];delete pn[t];for(let u=0,h=d.length;u<h;u++){const m=d[u];m.onLoad&&m.onLoad(c)}}).catch(c=>{const d=pn[t];if(d===void 0)throw this.manager.itemError(t),c;delete pn[t];for(let u=0,h=d.length;u<h;u++){const m=d[u];m.onError&&m.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class o_ extends Zi{constructor(t){super(t)}load(t,e,i,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=Ss.get(t);if(a!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0),a;const o=mr("img");function l(){d(),Ss.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(u){d(),r&&r(u),s.manager.itemError(t),s.manager.itemEnd(t)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(t),o.src=t,o}}class l_ extends Zi{constructor(t){super(t)}load(t,e,i,r){const s=new xe,a=new o_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){s.image=o,s.needsUpdate=!0,e!==void 0&&e(s)},i,r),s}}class Zc extends ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new pt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const ga=new Kt,jl=new P,Zl=new P;class c_{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ot(512,512),this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Za,this._frameExtents=new Ot(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;jl.setFromMatrixPosition(t.matrixWorld),e.position.copy(jl),Zl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Zl),e.updateMatrixWorld(),ga.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ga),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ga)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class d_ extends c_{constructor(){super(new Ja(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class u_ extends Zc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ae.DEFAULT_UP),this.updateMatrix(),this.target=new ae,this.shadow=new d_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class h_ extends Zc{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class f_ extends Pa{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new Se;r.setAttribute("position",new Qt(e,3)),r.setAttribute("color",new Qt(i,3));const s=new Bi({vertexColors:!0,toneMapped:!1});super(r,s),this.type="AxesHelper"}setColors(t,e,i){const r=new pt,s=this.geometry.attributes.color.array;return r.set(t),r.toArray(s,0),r.toArray(s,3),r.set(e),r.toArray(s,6),r.toArray(s,9),r.set(i),r.toArray(s,12),r.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xa);class Jc extends ae{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Ot(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof Element&&e.element.parentNode!==null&&e.element.parentNode.removeChild(e.element)})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const Ui=new P,Jl=new Kt,Ql=new Kt,tc=new P,ec=new P;class p_{constructor(t={}){const e=this;let i,r,s,a;const o={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:r}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),Jl.copy(_.matrixWorldInverse),Ql.multiplyMatrices(_.projectionMatrix,Jl),d(g,g,_),m(g)},this.setSize=function(g,_){i=g,r=_,s=i/2,a=r/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,f=g.children.length;_<f;_++)c(g.children[_])}function d(g,_,f){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Ui.setFromMatrixPosition(g.matrixWorld),Ui.applyMatrix4(Ql);const p=Ui.z>=-1&&Ui.z<=1&&g.layers.test(f.layers)===!0,E=g.element;E.style.display=p===!0?"":"none",p===!0&&(g.onBeforeRender(e,_,f),E.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Ui.x*s+s)+"px,"+(-Ui.y*a+a)+"px)",E.parentNode!==l&&l.appendChild(E),g.onAfterRender(e,_,f));const M={distanceToCameraSquared:u(f,g)};o.objects.set(g,M)}for(let p=0,E=g.children.length;p<E;p++)d(g.children[p],_,f)}function u(g,_){return tc.setFromMatrixPosition(g.matrixWorld),ec.setFromMatrixPosition(_.matrixWorld),tc.distanceToSquared(ec)}function h(g){const _=[];return g.traverseVisible(function(f){f.isCSS2DObject&&_.push(f)}),_}function m(g){const _=h(g).sort(function(p,E){if(p.renderOrder!==E.renderOrder)return E.renderOrder-p.renderOrder;const M=o.objects.get(p).distanceToCameraSquared,w=o.objects.get(E).distanceToCameraSquared;return M-w}),f=_.length;for(let p=0,E=_.length;p<E;p++)_[p].element.style.zIndex=f-p}}}function m_(n,t){const e=document.getElementById("cinematic-control-row"),i=document.getElementById("birdseye-control-row"),r=document.getElementById("reorient-control-row");let s=null,a=null,o=!1,l=!1,c=0,d=0;const u={};let h=!1,m=new P,g=null,_=null,f=!1,p=n,E=null,M=n,w=new P,I=new P,T=1e3,C={x:Math.PI/6,y:Math.PI/4};const U={distance:1e3,angleX:Math.PI/6,angleY:Math.PI/4,panOffset:new P(0,0,0),moveSpeed:10,lookSpeed:.01,getCurrentCamera:function(){return M},updateCameraPosition:function(){if(f&&E){const v=Math.max(this.distance*2,2e3);E.position.set(this.panOffset.x,this.panOffset.y+v,this.panOffset.z),E.lookAt(this.panOffset);const x=window.innerWidth/window.innerHeight,A=this.distance*.8;E.left=-A*x,E.right=A*x,E.top=A,E.bottom=-A,E.near=.1,E.far=v*4,E.updateProjectionMatrix()}else{const v=Math.cos(this.angleY)*Math.cos(this.angleX)*this.distance,x=Math.sin(this.angleX)*this.distance,A=Math.sin(this.angleY)*Math.cos(this.angleX)*this.distance;M.position.set(v+this.panOffset.x,x+this.panOffset.y,A+this.panOffset.z),M.lookAt(this.panOffset)}},update:function(){h&&!f&&this.updateCinematic();const v=this.distance*.02,x=new P;M.getWorldDirection(x);let A;f?(A=new P(1,0,0),new P(0,0,-1)):(A=new P().crossVectors(M.up,x).normalize(),new P().crossVectors(x,A).normalize());let B=!1;if(h&&!f){const F=this.distance*.025;u.ArrowUp&&(this.distance=Math.max(30,this.distance-F),g=this.distance,B=!0),u.ArrowDown&&(this.distance+=F,g=this.distance,B=!0),u.ArrowLeft&&(this.angleY-=this.lookSpeed*1.5,B=!0),u.ArrowRight&&(this.angleY+=this.lookSpeed*1.5,B=!0)}if(u.KeyW&&(f?this.panOffset.add(new P(0,0,-v)):this.panOffset.add(x.clone().multiplyScalar(v)),B=!0),u.KeyS&&(f?this.panOffset.add(new P(0,0,v)):this.panOffset.add(x.clone().multiplyScalar(-v)),B=!0),u.KeyD&&(f?this.panOffset.add(new P(v,0,0)):this.panOffset.add(A.clone().multiplyScalar(-v)),B=!0),u.KeyA&&(f?this.panOffset.add(new P(-v,0,0)):this.panOffset.add(A.clone().multiplyScalar(v)),B=!0),f){const F=this.distance*.03;u.KeyQ&&(this.distance-=F,this.distance=Math.max(50,this.distance),B=!0),u.KeyE&&(this.distance+=F,B=!0)}else h||(u.KeyE&&(this.panOffset.add(new P(0,v,0)),B=!0),u.KeyQ&&(this.panOffset.add(new P(0,-v,0)),B=!0));!f&&!h&&(u.ArrowLeft&&(this.angleY-=this.lookSpeed,B=!0),u.ArrowRight&&(this.angleY+=this.lookSpeed,B=!0),u.ArrowUp&&(this.angleX+=this.lookSpeed,this.angleX=Math.min(Math.PI/2-.01,this.angleX),B=!0),u.ArrowDown&&(this.angleX-=this.lookSpeed,this.angleX=Math.max(-Math.PI/2+.01,this.angleX),B=!0)),B&&this.updateCameraPosition()},updateCinematic:function(){this.panOffset.lerp(m,.05);const v=g||1e3;this.distance+=(v-this.distance)*.05,this.updateCameraPosition()},toggleCinematicMode:function(){f&&this.toggleBirdseyeMode(),h=!h,h||(_=null,window.dispatchEvent(new CustomEvent("cinematicTargetChanged",{detail:{talkerId:null}}))),console.log(`Cinematic mode ${h?"enabled":"disabled"}`),e&&e.classList.toggle("active-mode",h),h&&(g=this.distance)},toggleBirdseyeMode:function(){if(f=!f,console.log(`Birdseye mode ${f?"enabled":"disabled"}`),i&&i.classList.toggle("active-mode",f),f){if(h&&(h=!1,_=null,e&&e.classList.remove("active-mode"),window.dispatchEvent(new CustomEvent("cinematicTargetChanged",{detail:{talkerId:null}}))),w.copy(p.position),I.copy(this.panOffset),T=this.distance,C.x=this.angleX,C.y=this.angleY,!E){const v=this.distance*.5;E=new Ja(-v,v,v,-v,.1,1e7)}this.angleX=Math.PI/2,this.angleY=0,M=E,this.updateCameraPosition()}else M=p,this.distance=T,this.angleX=C.x,this.angleY=C.y,this.panOffset.y=I.y,this.updateCameraPosition()},isBirdseyeActive:function(){return f},setCinematicTarget:function(v){v instanceof P&&m.copy(v)},isCinematicActive:function(){return h},getTargetTalkerId:function(){return _},setTargetTalkerId:function(v){_=v,console.log(`Tracking ${v===null?"all tracks (latest point)":"talker: "+v}`),window.dispatchEvent(new CustomEvent("cinematicTargetChanged",{detail:{talkerId:_}}))},adjustForNewData:function(v,x){s=v,a=x;const A=Math.max(v*1.5,200);(Math.abs(this.distance-A)>this.distance*.5||this.distance===6e3)&&(this.distance=A),this.panOffset.lerp(x,.3),this.updateCameraPosition()},reset:function(v,x){h=!1,f=!1,_=null,M=p,window.dispatchEvent(new CustomEvent("cinematicTargetChanged",{detail:{talkerId:null}})),e&&e.classList.remove("active-mode"),i&&i.classList.remove("active-mode"),s=v,a=x,this.distance=Math.max(v*1.5,200),this.panOffset.copy(x),this.angleX=Math.PI/6,this.angleY=Math.PI/4,this.updateCameraPosition()}};return document.addEventListener("keydown",v=>{if(h&&v.code.startsWith("Digit")){const x=v.code.replace("Digit","");if(x==="0")U.setTargetTalkerId(null);else{const A={1:"AA",2:"BB",3:"CC",4:"DD",5:"WW",6:"XX",7:"YY",8:"ZZ",9:"JJ"};U.setTargetTalkerId(A[x]||null)}return}if(v.code==="KeyB"){U.toggleBirdseyeMode();return}if(v.code==="KeyC"){U.toggleCinematicMode();return}if(v.code==="KeyR"){r&&(r.classList.add("active-mode"),setTimeout(()=>r.classList.remove("active-mode"),150)),s!==null&&a!==null&&U.reset(s,a);return}u[v.code]=!0}),document.addEventListener("keyup",v=>{u[v.code]=!1}),window.addEventListener("blur",()=>{for(const v in u)u[v]=!1}),document.addEventListener("mousedown",v=>{v.target.closest("#info")||v.target.closest(".talker-header")||(o=!0,l=v.shiftKey||v.button===1,c=v.clientX,d=v.clientY,v.button===1&&v.preventDefault())}),document.addEventListener("mouseup",()=>{o=!1,l=!1}),document.addEventListener("mousemove",v=>{if(!o)return;const x=v.clientX-c,A=v.clientY-d;if(l){const B=U.distance*.001;if(f)U.panOffset.x-=x*B,U.panOffset.z+=A*B;else{const F=new P;M.getWorldDirection(F);const V=new P().crossVectors(F,M.up).normalize(),$=new P().crossVectors(V,F).normalize();U.panOffset.add(V.multiplyScalar(-x*B)),U.panOffset.add($.multiplyScalar(A*B))}}else f||(U.angleY+=x*.005,U.angleX+=A*.005,U.angleX=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,U.angleX)));c=v.clientX,d=v.clientY,U.updateCameraPosition()}),document.addEventListener("wheel",v=>{v.target.closest("#info")||(U.distance+=v.deltaY*.5,U.distance=Math.max(50,U.distance),h&&(g=U.distance),U.updateCameraPosition())}),document.addEventListener("contextmenu",v=>v.preventDefault()),window.addEventListener("activateCinematicForTalker",v=>{const{talkerId:x}=v.detail;h&&_===x?U.toggleCinematicMode():(h||U.toggleCinematicMode(),U.setTargetTalkerId(x))}),U}function g_(n,t={}){const{size:e=4e5,gridSize:i=100,lineWidth:r=.5,color:s=7829367,renderOrder:a=0,opacity:o=.65}=t,l=new Ye({uniforms:{uGridColor:{value:new pt(s)},uGridSize:{value:i},uLineWidth:{value:r},uOpacity:{value:o}},depthWrite:o>=.99,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-10,polygonOffsetUnits:-10,transparent:!0,alphaTest:.01,blending:o<1?Bn:Sn,side:Be,vertexShader:`
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
    `}),c=new ve(new gi(e,e),l);return c.rotation.x=-Math.PI/2,c.position.y=-.1,c.renderOrder=a-1,n.add(c),c}const __=`
<svg width="2" height="10" viewBox="0 0 2 10" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="2" height="10" fill="none" stroke="black" stroke-width="2"/>
  <line x1="1" y1="0" x2="1" y2="10" stroke="currentColor" stroke-width="1"/>
</svg>`,v_=`
<svg width="2" height="15" viewBox="0 0 2 15" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="2" height="15" fill="none" stroke="black" stroke-width="2"/>
  <line x1="1" y1="0" x2="1" y2="15" stroke="currentColor" stroke-width="1.5"/>
</svg>`,x_=`
<svg width="2" height="20" viewBox="0 0 2 20" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="2" height="20" fill="none" stroke="black" stroke-width="2"/>
  <line x1="1" y1="0" x2="1" y2="20" stroke="currentColor" stroke-width="2"/>
</svg>`;let Ce={},zi=[];const dr=(n,t,{text:e,svg:i})=>{const r=document.createElement("div");r.className=`compass-label ${t}`;let s="";i&&(s+=i),e&&(s+=`<span class="compass-text">${e}</span>`),r.innerHTML=s;const a=new Jc(r);return n.add(a),a};function S_(n){Object.values(Ce).forEach(e=>e.parent?.remove(e)),zi.forEach(e=>e.label.parent?.remove(e.label)),Ce={},zi=[],Ce.n=dr(n,"compass-cardinal",{text:"N"}),Ce.s=dr(n,"compass-cardinal",{text:"S"}),Ce.e=dr(n,"compass-cardinal",{text:"E"}),Ce.w=dr(n,"compass-cardinal",{text:"W"});const t=1e5;for(let e=0;e<360;e+=5){if(e%90===0)continue;let i,r;e%45===0?(r="compass-tick-large",i={svg:x_}):e%15===0?(r="compass-tick-medium",i={svg:v_}):(r="compass-tick-small",i={svg:__});const s=dr(n,r,i),a=(e-90)*(Math.PI/180),o=new P(t*Math.cos(a),0,t*Math.sin(a));zi.push({label:s,relativePos:o})}}function M_(){Object.values(Ce).forEach(n=>{n.parent&&n.parent.remove(n),n.element?.parentNode&&n.element.parentNode.removeChild(n.element)}),zi.forEach(n=>{n.label.parent&&n.label.parent.remove(n.label),n.label.element?.parentNode&&n.label.element.parentNode.removeChild(n.label.element)}),Ce={},zi=[]}function y_(n){if(Object.keys(Ce).length===0)return;const t=1e5,e=new P(n.position.x,0,n.position.z);Ce.n.position.copy(e).add(new P(0,0,-t)),Ce.s.position.copy(e).add(new P(0,0,t)),Ce.e.position.copy(e).add(new P(t,0,0)),Ce.w.position.copy(e).add(new P(-t,0,0)),zi.forEach(i=>{i.label.position.copy(e).add(i.relativePos)})}function Qc(n){const t=[],e=n.replace(/[^\x20-\x7E\r\n$]/g,"").replace(/\r\n|\r/g,`
`).replace(/\n{2,}/g,`
`).trim();if(e.split(`
`).length===0)return t;const r=/\$[A-Z0-9]{2}GGA,[^\r\n]*?\*[0-9A-Fa-f]{2}/g,s=e.match(r);if(!s)return t;let a={};const o=250,l=.5;for(const c of s){if(c.length>82&&c.length<86)continue;const d=c.split(",");if(!(d.length<15))try{const u=c.substring(1,3),h=d[1],m=d[2],g=d[3],_=d[4],f=d[5],p=parseInt(d[6]),E=parseInt(d[7]),M=d[8],w=d[9],I=d[10],T=d[11];if(!m||!_||!g||!f||!w||m.length<4||_.length<5||I!=="M"||isNaN(p)||p===0||isNaN(E)||E<3)continue;const C=parseFloat(M);if(isNaN(C)||C>5)continue;const U=parseFloat(m.substring(0,2)),v=parseFloat(m.substring(2));if(isNaN(U)||isNaN(v))continue;let x=U+v/60;g==="S"&&(x=-x);const A=parseFloat(_.substring(0,3)),B=parseFloat(_.substring(3));if(isNaN(A)||isNaN(B))continue;let F=A+B/60;if(f==="W"&&(F=-F),Math.abs(x)>360||Math.abs(F)>360)continue;const V=parseFloat(w),$=parseFloat(T)||0,H=parseInt(h.slice(0,2))||0,Z=parseInt(h.slice(2,4))||0,G=parseFloat(h.slice(4))||0,dt=H*3600+Z*60+G,ct={lat:x,lon:F,alt:V,time:dt,satellites:E,undulation:$,talkerId:u},ut=a[u];if(ut){const Dt=Math.abs(ct.lat-ut.lat),Gt=Math.abs(ct.lon-ut.lon);if(Dt>l||Gt>l)continue;const W=ct.time-ut.time;if(W>0&&os(ut.lat,ut.lon,ct.lat,ct.lon)/W>o)continue}t.push(ct),a[u]=ct}catch{continue}}return t}function os(n,t,e,i){const s=c=>c*(Math.PI/180),a=s(e-n),o=s(i-t),l=Math.sin(a/2)**2+Math.cos(s(n))*Math.cos(s(e))*Math.sin(o/2)**2;return 2*6371e3*Math.atan2(Math.sqrt(l),Math.sqrt(1-l))}function E_(n){return n.reduce((t,e)=>{const{talkerId:i}=e;return t[i]||(t[i]=[]),t[i].push(e),t},{})}function w_(n){if(!n||n.length===0)return null;const t=n[n.length-1],e=n[0],i=n.length,r=t.time-e.time,s=r>0?i/r:0,a=os(e.lat,e.lon,t.lat,t.lon),o=t.alt-e.alt,l=Math.sqrt(Math.pow(a,2)+Math.pow(o,2)),c=t.alt,d=t.alt+(t.undulation||0),u=t.lat,h=t.lon,m=t.satellites||0;let g=0;if(n.length>=2){const p=n[n.length-2],E=t,M=os(p.lat,p.lon,E.lat,E.lon),w=E.time-p.time;w>0&&(g=M/w)}let _=0,f=0;for(let p=1;p<n.length;p++){const E=n[p-1],M=n[p],w=os(E.lat,E.lon,M.lat,M.lon);_+=w;const I=M.alt-E.alt,T=Math.sqrt(Math.pow(w,2)+Math.pow(I,2));f+=T}return{totalPoints:i,totalDuration:r,currentAltitude:c,currentAltWsg84:d,currentLat:u,currentLon:h,currentSatellites:m,latestSpeed:g,total2DDistance:_,total3DDistance:f,rthDistance3D:l,updateRate:s,startTime:e.time,endTime:t.time}}function T_(n){const t=n.trim().split(`
`)[0]?.trim();if(!t)return"unknown";if(t.startsWith("{"))try{const e=JSON.parse(t);if(e.data?.aircraft!==void 0||e.receivedAt)return"adsb"}catch{}return/^\$[A-Z0-9]{2}[A-Z]{3},/.test(t)?"nmea":"unknown"}function td(n){const t=[],e=n.split(`
`).filter(i=>i.trim());for(const i of e){let r;try{r=JSON.parse(i)}catch{continue}const s=r.data?.aircraft;if(!(!Array.isArray(s)||s.length===0))for(const a of s){if(!a.icaoAddress||a.latDD==null||a.lonDD==null||a.altitudeMM==null||!a.timeStamp||Math.abs(a.latDD)>90||Math.abs(a.lonDD)>180)continue;const o=a.altitudeMM/1e3,l=a.detail?.baroaltDiffMM!=null?a.detail.baroaltDiffMM/1e3:null;let c=null,d=null;a.altitudeType===0?(c=o,l!==null&&(d=c+l)):a.altitudeType===1&&(d=o,l!==null&&(c=d-l));const u=new Date(a.timeStamp),h=u.getUTCHours()*3600+u.getUTCMinutes()*60+u.getUTCSeconds()+u.getUTCMilliseconds()/1e3;t.push({lat:a.latDD,lon:a.lonDD,alt:d!==null?d:c,baroAlt:c,geoAlt:d,time:h,satellites:0,undulation:0,talkerId:a.icaoAddress,dataType:"adsb",icaoAddress:a.icaoAddress,heading:(a.headingDE2||0)/100,horVelocity:(a.horVelocityCMS||0)/100,verVelocity:(a.verVelocityCMS||0)/100,altitudeType:a.altitudeType??null,emitterType:a.emitterType??null,timeStamp:a.timeStamp})}}return t}function b_(n){return n.reduce((t,e)=>((t[e.icaoAddress]??=[]).push(e),t),{})}function A_(n){if(!n?.length)return null;const t=n[0],e=n[n.length-1];let i=0;for(let r=1;r<n.length;r++)i+=R_(n[r-1].lat,n[r-1].lon,n[r].lat,n[r].lon);return{icaoAddress:e.icaoAddress,totalPoints:n.length,currentLat:e.lat,currentLon:e.lon,currentAltM:e.alt,currentBaroAltM:e.baroAlt,currentGeoAltM:e.geoAlt,heading:e.heading,horVelocityMs:e.horVelocity,verVelocityMs:e.verVelocity,emitterType:e.emitterType,altitudeType:e.altitudeType,startTime:t.time,endTime:e.time,duration:e.time-t.time,lastSeen:e.timeStamp,totalGroundDist:i}}function C_(n){return{0:"Unknown",1:"Light",2:"Small",3:"Large",4:"High Vortex",5:"Heavy",6:"Maneuverable",7:"Rotorcraft",9:"Glider",10:"Balloon",11:"Parachutist",12:"Ultralight",14:"UAV",15:"Space"}[n]??`Type ${n}`}function R_(n,t,e,i){const s=c=>c*(Math.PI/180),a=s(e-n),o=s(i-t),l=Math.sin(a/2)**2+Math.cos(s(n))*Math.cos(s(e))*Math.sin(o/2)**2;return 2*6371e3*Math.atan2(Math.sqrt(l),Math.sqrt(1-l))}function L_(n){if(!n)return!1;const t=(n.split(`
`)[0]||"").replace(/\r/,"");return["ID","DateTime","Lat","Lon","Alt"].every(i=>t.split(",").map(r=>r.trim()).includes(i))}function P_(n){if(!n)return 0;try{const e=(n.trim().split(" ")[1]||"").split(":"),i=parseInt(e[0])||0,r=parseInt(e[1])||0,s=parseFloat(e[2])||0,a=e[3]?parseInt(e[3])/1e3:0;return i*3600+r*60+s+a}catch{}return 0}function ed(n){if(!n||!n.trim())return[];const t=n.split(`
`).map(g=>g.trim()).filter(Boolean);if(t.length<2)return[];const e=t[0].split(",").map(g=>g.trim()),i=g=>e.indexOf(g),r=i("ID"),s=i("DateTime"),a=i("RCS"),o=i("Lat"),l=i("Lon"),c=i("Alt"),d=i("ExtID"),u=i("VelAbs");if(r<0||o<0||l<0)return console.warn("radarParser: missing required columns (ID, Lat, Lon)"),[];const h=[],m={};for(let g=1;g<t.length;g++){const _=t[g].split(",");try{const f=_[r]?.trim(),p=s>=0&&_[s]?.trim()||"",E=parseFloat(_[o]),M=parseFloat(_[l]),w=c>=0?parseFloat(_[c]):0,I=a>=0?parseFloat(_[a]):NaN,T=u>=0?parseFloat(_[u]):NaN,C=d>=0&&_[d]?.trim()||"";if(!f||isNaN(E)||isNaN(M)||Math.abs(E)>90||Math.abs(M)>180)continue;h.push({dataType:"radar",id:f,talkerId:`radar_${f}`,lat:E,lon:M,alt:isNaN(w)?0:w,time:P_(p),rcs:isNaN(I)?null:I,velAbs:isNaN(T)?null:T,extId:C,dateTime:p}),m[f]=(m[f]||0)+1}catch{continue}}return h.filter(g=>m[g.id]>20)}function I_(n){return n.reduce((t,e)=>(t[e.id]||(t[e.id]=[]),t[e.id].push(e),t),{})}function D_(n){if(!n||n.length===0)return null;const t=[...n].sort((r,s)=>r.time-s.time),e=t[0],i=t[t.length-1];return{totalPoints:t.length,duration:i.time-e.time,currentLat:i.lat,currentLon:i.lon,currentAlt:i.alt,currentVel:i.velAbs,currentRcs:i.rcs,currentExtId:i.extId,startTime:e.time,endTime:i.time}}const to="stats-search-bar",Da="stats-search-wrapper";function nd(n){if(document.getElementById(Da))return;const t=document.createElement("div");t.id=Da,t.className="stats-search-wrapper",t.style.display="none";const e=document.createElement("input");e.id=to,e.type="text",e.placeholder="Search Airspace",e.autocomplete="off",e.spellcheck=!1,e.className="stats-search-input",e.addEventListener("input",()=>eo(e.value.trim().toLowerCase()));const i=a=>a.stopPropagation();e.addEventListener("keydown",i),e.addEventListener("keyup",i),e.addEventListener("keypress",i);const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.classList.add("stats-search-icon"),r.setAttribute("viewBox","0 0 512 512");const s=document.createElementNS("http://www.w3.org/2000/svg","path");s.setAttribute("d","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"),r.appendChild(s),t.appendChild(e),t.appendChild(r),n.insertBefore(t,n.firstChild)}function U_(n){const t=document.getElementById(Da);if(t)if(n>3)t.style.display="block";else{t.style.display="none";const e=document.getElementById(to);e&&e.value!==""&&(e.value="",eo(""))}}function eo(n){const t=document.querySelectorAll("#stats-groups .stats-group");let e=null;t.forEach(i=>{if(i.classList.remove("last-visible"),!n){i.style.display="",e=i;return}const r=i.querySelector(".talker-header"),s=(r?r.textContent:"").toLowerCase(),a=(r?.dataset.talkerId||"").toLowerCase(),o=s.includes(n)||a.includes(n);i.style.display=o?"":"none",o&&(e=i)}),e&&e.classList.add("last-visible")}function N_(){const n=document.getElementById(to);return n?n.value.trim().toLowerCase():""}const si=new Map,_a=new Set;async function F_(n){const t=n.toUpperCase();try{const e=await fetch(`https://hexdb.io/hex-image?hex=${t}`);if(!e.ok)return null;const i=(await e.text()).trim();if(i&&(i.startsWith("http://")||i.startsWith("https://")))return i}catch{}return null}async function no(n){const t=n.toUpperCase();if(!(si.has(t)||_a.has(t))){_a.add(t);try{const e=await fetch(`https://hexdb.io/api/v1/aircraft/${t}`);if(!e.ok){si.set(t,{model:"Unknown",manufacturer:"",registration:"",operator:"",type:"",fetched:!0,imageResolved:!1,imageUrl:null});return}const i=await e.json();if(i.error){si.set(t,{model:"Unknown",manufacturer:"",registration:"",operator:"",type:"",fetched:!0,imageResolved:!1,imageUrl:null});return}si.set(t,{model:i.Type||i.ICAOTypeCode||"Unknown",manufacturer:i.Manufacturer||"",registration:i.Registration||"",operator:i.RegisteredOwners||"",type:i.ICAOTypeCode||"",fetched:!0,imageResolved:!1,imageUrl:null}),id(n),window.dispatchEvent(new CustomEvent("aircraftInfoLoaded",{detail:{talkerId:n,model:i.Type||i.ICAOTypeCode||"Unknown"}}))}catch(e){console.warn(`hexdb.io lookup failed for ${n}:`,e),si.set(t,{model:"Unknown",manufacturer:"",registration:"",operator:"",type:"",fetched:!0,imageResolved:!1,imageUrl:null})}finally{_a.delete(t)}}}function id(n){const t=n.toUpperCase(),e=si.get(t);if(!e)return;const i=n,r=document.getElementById(`${i}-header-model`);r&&(r.textContent=e.model&&e.model!=="Unknown"?e.model:i);const s=document.getElementById(`${i}-reg-stat`);s&&(s.textContent=e.registration||"--");const a=document.getElementById(`${i}-operator-stat`);a&&(a.textContent=e.operator||"--");const o=document.getElementById(`${i}-aircraft-img`);o&&!e.imageResolved&&e.model!=="Unknown"?(e.imageResolved=!0,F_(t).then(l=>{l&&(e.imageUrl=l,o.src=l)})):o&&e.imageUrl&&(!o.src||o.src!==e.imageUrl)&&(o.src=e.imageUrl)}function rd(n){if(!n)return"Unknown";const t=n.toUpperCase(),e=si.get(t);return e?e.model||"Unknown":(no(n),"Loading...")}let sd=null,nc=!1;function O_(n){return n?n.dataType==="radar"?"radar":n.dataType==="adsb"?"adsb":n.dataType==="nmea"||typeof n.satellites=="number"&&n.icaoAddress===void 0?"nmea":n.icaoAddress!==void 0||n.heading!==void 0||n.horizontalVelocity!==void 0?"adsb":(n.talkerId&&/^[A-Z]{2}$/.test(n.talkerId),"nmea"):"nmea"}function B_(n){const t=[],e=[],i=[];for(const r of n){const s=O_(r);s==="adsb"?e.push(r):s==="radar"?i.push(r):t.push(r)}return{nmea:t,adsb:e,radar:i}}function z_(n){let t=document.getElementById("stats-groups");return t||(t=document.createElement("div"),t.id="stats-groups",n.appendChild(t)),t}function ad(){document.querySelectorAll(".talker-header").forEach(n=>{n.classList.toggle("active-track",n.dataset.talkerId===sd)})}function ic(n){const t=Math.floor(n/3600).toString().padStart(2,"0"),e=Math.floor(n%3600/60).toString().padStart(2,"0"),i=Math.floor(n%60).toString().padStart(2,"0");return`${t}:${e}:${i}`}function io(n,t,e){n.querySelectorAll(`.stats-group[data-data-type="${e}"]`).forEach(i=>{const r=i.dataset.panelId;(!r||!t.includes(r))&&i.remove()})}function Rs(){const n=document.getElementById("trail-tail-color"),t=new pt(n?n.value:"#00ffaa"),e=fd(),i=dd();document.querySelectorAll(".talker-header").forEach(r=>{const s=r.dataset.talkerId,a=e?Qi(s):i?Ji(s):kn(t,s);r.style.color=`#${a.getHexString()}`})}function gr(n,t){const e=document.getElementById("stats");if(!e)return;nc||(Array.from(e.children).forEach(h=>{h.id!=="stats-search-wrapper"&&h.id!=="stats-groups"&&h.remove()}),nc=!0),nd(e);const i=z_(e);if(!n||n.length===0)return;const{nmea:r,adsb:s,radar:a}=B_(n),o=document.getElementById("trail-tail-color"),l=new pt(o?o.value:"#00ffaa"),c=fd(),d=dd();G_(i,r,l,c,d),X_(i,s,l,c,d),Y_(i,a,l,c,d);const u=i.querySelectorAll(".stats-group").length;U_(u),ad(),eo(N_())}function k_(n,t){return`
        <div class="stats-group" data-data-type="nmea" data-panel-id="${n}">
            <h3 style="color: ${t};" class="talker-header" data-talker-id="${n}" tabindex="0" role="button" title="Click to follow">
                <span>Rover ${n}</span>
            </h3>
            <table><tbody>
                <tr><td>Points:</td><td><span id="${n}-points-stat">0</span></td></tr>
                <tr><td>Telemetry:</td><td><span id="${n}-hz-stat">0.0</span> Hz</td></tr>
                <tr><td>Latitude:</td><td><span id="${n}-lat-stat">0.0</span>&deg;</td></tr>
                <tr><td>Longitude:</td><td><span id="${n}-long-stat">0.0</span>&deg;</td></tr>
                <tr><td>Alt (MSL):</td><td><span id="${n}-altitude-stat">0.0</span> m</td></tr>
                <tr><td>Alt (WGS84):</td><td><span id="${n}-altwsg84-stat">0.0</span> m</td></tr>
                <tr><td>Speed:</td><td><span id="${n}-speed-stat">0.0</span> m/s</td></tr>
                <tr><td>2D Distance:</td><td><span id="${n}-twod-stat">0.0</span> m</td></tr>
                <tr><td>3D Distance:</td><td><span id="${n}-threed-stat">0.0</span> m</td></tr>
                <tr><td>RTH Distance:</td><td><span id="${n}-rth-stat">0.0</span> m</td></tr>
                <tr><td>Satellites:</td><td><span id="${n}-satellites-stat">0</span></td></tr>
                <tr><td>Start Time:</td><td><span id="${n}-start-stat">--</span></td></tr>
                <tr><td>End Time:</td><td><span id="${n}-end-stat">--</span></td></tr>
                <tr><td>Duration:</td><td><span id="${n}-duration-stat">0.0</span> s</td></tr>
            </tbody></table>
        </div>`}function H_(n,t){const e=i=>document.getElementById(`${n}-${i}`);e("points-stat")&&(e("points-stat").textContent=t.totalPoints,e("hz-stat").textContent=t.updateRate.toFixed(2),e("duration-stat").textContent=t.totalDuration.toFixed(1),e("twod-stat").textContent=t.total2DDistance.toFixed(1),e("threed-stat").textContent=t.total3DDistance.toFixed(1),e("rth-stat").textContent=t.rthDistance3D.toFixed(1),e("speed-stat").textContent=t.latestSpeed.toFixed(2),e("altitude-stat").textContent=t.currentAltitude.toFixed(2),e("altwsg84-stat").textContent=t.currentAltWsg84.toFixed(2),e("lat-stat").textContent=t.currentLat.toFixed(7),e("long-stat").textContent=t.currentLon.toFixed(7),e("satellites-stat").textContent=t.currentSatellites,e("start-stat").textContent=ic(t.startTime),e("end-stat").textContent=ic(t.endTime))}function G_(n,t,e,i,r){if(t.length===0){n.querySelectorAll('.stats-group[data-data-type="nmea"]').forEach(o=>o.remove());return}const s=E_(t),a=Object.keys(s).sort();io(n,a,"nmea"),a.forEach(o=>{if(!document.getElementById(`${o}-points-stat`)){const c=i?`#${Qi(o).getHexString()}`:r?`#${Ji(o).getHexString()}`:`#${kn(e,o).getHexString()}`;n.insertAdjacentHTML("beforeend",k_(o,c))}const l=w_(s[o]);l&&H_(o,l)})}function V_(n,t){return`
        <div class="stats-group" data-data-type="adsb" data-panel-id="${n}">
            <h3 style="color: ${t};" class="talker-header" data-talker-id="${n}" tabindex="0" role="button" title="Click to follow">
                <span id="${n}-header-model">Loading...</span>
            </h3>
            <img id="${n}-aircraft-img"
                 alt="Aircraft photo"
                 style="display:none; width:100%; max-height:120px; object-fit:cover; border-radius:3px; margin:0px 0 6px 0; opacity:1;"
                 onerror="this.style.display='none'"
                 onload="this.style.display='block'" />
            <table><tbody>
                <tr><td>Points:</td><td><span id="${n}-points-stat">0</span></td></tr>
                <tr><td>Hex ID:</td><td><a href="https://globe.adsbexchange.com/?icao=${n}" target="_blank">${n}</a></td></tr>
                <tr><td>Registration:</td><td><span id="${n}-reg-stat">?</span></td></tr>
                <tr><td>Operator:</td><td><span id="${n}-operator-stat">?</span></td></tr>
                <tr><td>Type:</td><td><span id="${n}-type-stat">?</span></td></tr>
                <tr><td>Latitude:</td><td><span id="${n}-lat-stat">0.0</span>&deg;</td></tr>
                <tr><td>Longitude:</td><td><span id="${n}-long-stat">0.0</span>&deg;</td></tr>
                <tr><td>Alt (MSL):</td><td><span id="${n}-baroalt-stat">0.0</span> m</td></tr>
                <tr><td>Alt (WGS84):</td><td><span id="${n}-geoalt-stat">0.0</span> m</td></tr>
                <tr><td>Heading:</td><td><span id="${n}-hdg-stat">0.0</span>&deg;</td></tr>
                <tr><td>Hor Vel:</td><td><span id="${n}-hvel-stat">0.0</span> m/s</td></tr>
                <tr><td>Ver Vel:</td><td><span id="${n}-vvel-stat">0.0</span> m/s</td></tr>
                <tr><td>2D Distance:</td><td><span id="${n}-gdist-stat">0.0</span> m</td></tr>
                <tr><td>Last Seen:</td><td><span id="${n}-lastseen-stat">HH:mm:ss</span></td></tr>
                <tr><td>Duration:</td><td><span id="${n}-duration-stat">0.0</span> s</td></tr>
            </tbody></table>
        </div>`}function W_(n,t){const e=i=>document.getElementById(`${n}-${i}`);if(e("points-stat")&&(no(n),id(n),e("points-stat").textContent=t.totalPoints,e("lat-stat").textContent=t.currentLat.toFixed(6),e("long-stat").textContent=t.currentLon.toFixed(6),e("baroalt-stat").textContent=t.currentBaroAltM!=null?t.currentBaroAltM.toFixed(1):"--",e("geoalt-stat").textContent=t.currentGeoAltM!=null?t.currentGeoAltM.toFixed(1):"--",e("hdg-stat").textContent=t.heading.toFixed(1),e("hvel-stat").textContent=t.horVelocityMs.toFixed(1),e("vvel-stat").textContent=t.verVelocityMs.toFixed(1),e("gdist-stat").textContent=t.totalGroundDist.toFixed(1),e("type-stat").textContent=C_(t.emitterType),e("duration-stat").textContent=t.duration.toFixed(1),t.lastSeen))try{e("lastseen-stat").textContent=new Date(t.lastSeen).toISOString().substring(11,19)}catch{e("lastseen-stat").textContent="--"}}function X_(n,t,e,i,r){if(t.length===0){n.querySelectorAll('.stats-group[data-data-type="adsb"]').forEach(o=>o.remove());return}const s=b_(t),a=Object.keys(s).sort();io(n,a,"adsb"),a.forEach(o=>{if(!document.getElementById(`${o}-points-stat`)){const c=i?`#${Qi(o).getHexString()}`:r?`#${Ji(o).getHexString()}`:`#${kn(e,o).getHexString()}`;n.insertAdjacentHTML("beforeend",V_(o,c)),no(o)}const l=A_(s[o]);l&&W_(o,l)})}function $_(n,t){const e=`radar_${n}`;return`
        <div class="stats-group" data-data-type="radar" data-panel-id="${e}">
            <h3 style="color: ${t};" class="talker-header" data-talker-id="${e}" tabindex="0" role="button" title="Click to follow">
                <span>Track ${n}</span>
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
        </div>`}function q_(n,t){const e=`radar_${n}`,i=r=>document.getElementById(`${e}-${r}`);i("points-stat")&&(i("points-stat").textContent=t.totalPoints,i("extid-stat").textContent=t.currentExtId||"--",i("rcs-stat").textContent=t.currentRcs!=null?t.currentRcs.toFixed(4):"--",i("lat-stat").textContent=t.currentLat.toFixed(7),i("long-stat").textContent=t.currentLon.toFixed(7),i("alt-stat").textContent=t.currentAlt.toFixed(1),i("vel-stat").textContent=t.currentVel!=null?t.currentVel.toFixed(2):"--",i("duration-stat").textContent=t.duration.toFixed(1))}function Y_(n,t,e,i,r){if(t.length===0){n.querySelectorAll('.stats-group[data-data-type="radar"]').forEach(o=>o.remove());return}const s=I_(t),a=Object.keys(s).sort((o,l)=>Number(o)-Number(l));io(n,a.map(o=>`radar_${o}`),"radar"),a.forEach(o=>{const l=`radar_${o}`;if(!document.getElementById(`${l}-points-stat`)){const d=i?`#${Qi(l).getHexString()}`:r?`#${Ji(l).getHexString()}`:`#${kn(e,l).getHexString()}`;n.insertAdjacentHTML("beforeend",$_(o,d))}const c=D_(s[o]);c&&q_(o,c)})}function K_(){const n=document.getElementById("stats");n&&(nd(n),window.addEventListener("cinematicTargetChanged",t=>{if(sd=t.detail.talkerId,ad(),t.detail.talkerId){const e=document.getElementById("stats-groups"),i=e?.querySelector(`.stats-group[data-panel-id="${t.detail.talkerId}"]`);i&&e&&e.scrollTo({top:i.offsetTop-60,behavior:"instant"})}}),n.addEventListener("click",t=>{const e=t.target.closest(".talker-header");if(!e)return;const i=e.dataset.talkerId;i&&window.dispatchEvent(new CustomEvent("activateCinematicForTalker",{detail:{talkerId:i}}))}))}K_();const rn=new Map;let Ua=null,ro=!0;function j_(n){const t=document.getElementById("stats");if(!t)return;const e=t.querySelector(`.stats-group[data-panel-id="${n}"], .stats-group[data-panel-id="radar_${n}"]`);e&&t.scrollTo({top:e.offsetTop-t.offsetTop-10,behavior:"smooth"})}function Z_(n){ro=n,rn.forEach(t=>{t.visible=n})}function J_(){const n=document.getElementById("show-label-toggle");n&&(ro=n.checked,n.addEventListener("change",()=>Z_(n.checked)))}function Q_(n){Ua=n,J_(),window.addEventListener("aircraftInfoLoaded",t=>{t.detail?.talkerId&&e0(t.detail.talkerId)})}function t0(){rn.forEach(n=>{n.parent&&n.parent.remove(n),n.element?.parentNode&&n.element.parentNode.removeChild(n.element)}),rn.clear()}function e0(n){let t=rn.get(n);if(!t){for(const[r,s]of rn.entries())if(r.toLowerCase()===n.toLowerCase()){t=s;break}}if(!t)return;const e=rd(n),i=e&&e!=="Unknown"&&e!=="Unknown Model"&&e!=="Loading..."?e:`Aircraft ${n}`;t.element.textContent!==i&&(t.element.textContent=i)}function n0(n,t){if(!(!Ua||!t)){rn.forEach((e,i)=>{i in n||(e.parent&&e.parent.remove(e),e.element?.parentNode&&e.element.parentNode.removeChild(e.element),rn.delete(i))});for(const e in n){const i=n[e];if(i.length===0)continue;const r=i[i.length-1],s=t(r.lat,r.lon,r.alt);let a=rn.get(e);if(!a){const l=document.createElement("div");l.className="track-label",l.setAttribute("data-track-label-id",e),l.style.cssText=`
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
                    -1px -1px 1px rgba(0,0,0,0.9),
                     1px -1px 1px rgba(0,0,0,0.9),
                    -1px  1px 1px rgba(0,0,0,0.9),
                     1px  1px 1px rgba(0,0,0,0.9),
                     0    0   1px rgba(0,0,0,0.6);
            `,l.addEventListener("click",c=>{c.stopPropagation(),window.dispatchEvent(new CustomEvent("activateCinematicForTalker",{detail:{talkerId:e}})),j_(e)}),l.addEventListener("mouseenter",()=>{l.style.opacity="0.7"}),l.addEventListener("mouseleave",()=>{l.style.opacity="1"}),a=new Jc(l),a.visible=ro,rn.set(e,a),Ua.add(a)}let o;if(r.dataType==="radar")o=`Track ${e.startsWith("radar_")?e.slice(6):e}`;else if(r.dataType==="adsb"){const l=rd(e);o=l&&l!=="Unknown"&&l!=="Unknown Model"?l:`Aircraft ${e}`}else o=`Rover ${e}`;a.element.textContent!==o&&(a.element.textContent=o),a.position.copy(s)}}}function pr(n,t=!1){rn.forEach((e,i)=>{if(e.element)if(t)e.element.style.color="#ffffff";else{const r=n(i);e.element.style.color=typeof r=="string"?r:`#${r.getHexString()}`}})}let fe=new Map,ki=[],od=null,fi=!1,Wn=null,pi=!1;const Na={radar:new pt(16720418),adsb:new pt(44287),nmea:new pt(16768256)};function ld(n){return n?n.dataType==="radar"?"radar":n.dataType==="adsb"?"adsb":n.dataType==="nmea"?"nmea":n.icaoAddress!==void 0||n.heading!==void 0||n.horizontalVelocity!==void 0?"adsb":(n.talkerId&&/^[A-Z]{2}$/.test(n.talkerId),"nmea"):"nmea"}const i0=.618033988749895,va=new Map;let r0=0;function s0(n){if(!va.has(n)){const t=r0++;va.set(n,{index:t,hueOffset:t===0?0:t*i0%1})}return va.get(n)}function kn(n,t){const e=s0(t);if(e.index===0)return n.clone();const i={};return n.getHSL(i),i.h=(i.h+e.hueOffset)%1,new pt().setHSL(i.h,i.s,i.l)}const a0=["trail-head-color","trail-tail-color","trail-line-color"];function Ms(){const n=fi||pi;a0.forEach(t=>{const e=document.getElementById(t);if(!e)return;e.disabled=n,e.style.opacity=n?"0.35":"1",e.style.cursor=n?"not-allowed":"pointer";const i=e.closest(".trail-group");i&&(i.style.cursor=n?"not-allowed":"")})}function Ji(n){const t=fe.get(n);if(!t||!t.gpsPoints||!t.gpsPoints.length)return new pt(16777215);const e=t.gpsPoints[0],i=ld(e);return Na[i]?Na[i].clone():new pt(16777215)}function cd(){fe&&fe.forEach(({points:n,gpsPoints:t})=>{if(!n)return;const e=n.geometry.attributes.color.array;t.forEach((i,r)=>{const s=ld(i),a=Na[s]||new pt(16777215),o=r*3;e[o]=a.r,e[o+1]=a.g,e[o+2]=a.b}),n.geometry.attributes.color.needsUpdate=!0})}function o0(){pi=!0,cd(),Tr(),pr(Ji),Rs(),Ms()}function dd(){return pi}const rc=3,xa=5,l0=8;function Sa(){!fe||fe.size===0||fe.forEach(({points:n,gpsPoints:t})=>{if(!n)return;const i=n.geometry.attributes.pointSize;if(!i)return;const r=i.array,s=t.length,a=Math.max(0,s-rc);for(let o=0;o<s;o++)if(o<a)r[o]=xa;else{const l=(o-a)/(Math.min(rc,s)-1||1);r[o]=xa+(l0-xa)*l}i.needsUpdate=!0})}function c0(n,t,e){fe=n,ki=t,od=e;const i=document.getElementById("show-lines-toggle"),r=i?i.checked:!1;fe.forEach(({line:s})=>{s&&(s.visible=r)})}function d0(){if(!ki||ki.length===0)return null;const n=ki.map(r=>r.alt),t=Math.min(...n),e=Math.max(...n),i=e-t;return i===0?null:{minElevation:t,maxElevation:e,elevationRange:i}}function ud(n,t){const{minElevation:e,elevationRange:i}=t,r=Math.max(0,Math.min(1,(n-e)/i));let s,a,o;if(r<.25){const l=r/.25;s=0,a=l*.8,o=1}else if(r<.5){const l=(r-.25)/.25;s=0,a=.8+l*.2,o=1-l}else if(r<.75)s=(r-.5)/.25,a=1,o=0;else{const l=(r-.75)/.25;s=1,a=1-l,o=0}return new pt(s,a,o)}function Qi(n){const t=fe.get(n);if(!t||!t.gpsPoints||!t.gpsPoints.length||!Wn)return new pt(16777215);const e=t.gpsPoints[t.gpsPoints.length-1];return ud(e.alt,Wn)}function hd(){!fe||!Wn||!ki.length||fe.forEach(({points:n,gpsPoints:t})=>{if(!n)return;const e=n.geometry.attributes.color.array;t.forEach((i,r)=>{const s=ud(i.alt,Wn),a=r*3;e[a]=s.r,e[a+1]=s.g,e[a+2]=s.b}),n.geometry.attributes.color.needsUpdate=!0})}function u0(){return Wn=d0(),Wn?(fi=!0,hd(),Tr(),pr(Qi),Rs(),Ms(),!0):!1}function fd(){return fi}function so(){if(!fe||fe.size===0||!od||!ki.length)return;if(fi&&Wn){hd(),Sa(),pr(Qi);return}if(pi){cd(),Sa(),pr(Ji);return}const n=new pt(document.getElementById("trail-head-color").value),t=new pt(document.getElementById("trail-tail-color").value);fe.forEach(({points:e,gpsPoints:i},r)=>{if(!e||i.length===0)return;const s=kn(n,r),a=kn(t,r),o={},l={};a.getHSL(o),s.getHSL(l);const c=e.geometry.attributes.color.array,d=i.length,u=15,h=Math.max(0,d-u);for(let m=0;m<d;m++){let g;if(m<h)g=a;else{const f=(m-h)/(u-1),p=o.h+(l.h-o.h)*f,E=o.s+(l.s-o.s)*f,M=o.l+(l.l-o.l)*f;g=new pt().setHSL(p,E,M)}const _=m*3;c[_]=g.r,c[_+1]=g.g,c[_+2]=g.b}e.geometry.attributes.color.needsUpdate=!0}),Sa(),pr(e=>kn(t,e))}function Tr(){if(!fe)return;const n=new pt(document.getElementById("trail-line-color").value),t=fi||pi;fe.forEach(({line:e},i)=>{if(!e||!e.material)return;const r=kn(n,i);e.material.color.copy(r),e.material.transparent=t,e.material.opacity=t?.2:1,e.material.depthWrite=!t,e.material.needsUpdate=!0})}function h0(){if(!fe)return;const n=document.getElementById("show-lines-toggle").checked;fe.forEach(({line:t})=>{t&&(t.visible=n)})}function f0(){return{head:new pt(document.getElementById("trail-head-color").value),tail:new pt(document.getElementById("trail-tail-color").value),line:new pt(document.getElementById("trail-line-color").value)}}function p0(){const n=document.getElementById("trail-head-color"),t=document.getElementById("trail-tail-color"),e=document.getElementById("trail-line-color"),i=document.getElementById("show-lines-toggle"),r=document.getElementById("stats");r&&r.addEventListener("wheel",o=>o.stopPropagation());const s=()=>{const o=document.getElementById("trail-preset");o&&(o.value=""),so(),Tr(),Rs()},a=()=>{h0()};n&&n.addEventListener("input",s),t&&t.addEventListener("input",s),e&&e.addEventListener("input",s),i&&i.addEventListener("change",a)}function ao(){fi&&(fi=!1,Wn=null,Ms()),pi&&(pi=!1,Ms()),so(),Tr(),Rs()}const m0=`
    attribute float pointSize;
    varying vec3 vColor;
    void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = pointSize;
        gl_Position = projectionMatrix * mvPosition;
    }
`,g0=`
    varying vec3 vColor;
    void main() {
        vec2 c = gl_PointCoord - 0.5;
        if (dot(c, c) > 0.25) discard;
        gl_FragColor = vec4(vColor, 1.0);
    }
`;let ci=null,Hn=null,Ls=null,Fe=null,di=null,ze=[],ai=new Map,Ne=null,_r=null,ui=null,sn=!1;function _0(n=null){if(!ze||ze.length===0||!Hn)return null;if(n===null){const i=ze[ze.length-1];return Hn(i.lat,i.lon,i.alt)}const t=ze.filter(i=>i.talkerId===n);if(t.length===0)return null;const e=t[t.length-1];return Hn(e.lat,e.lon,e.alt)}function br(){return Fe}function v0(n){ci=n,Q_(n)}function pd(){return Hn}function x0(){return ze}function S0(){const n=sn?Ne:Fe,t=sn?ui:di;return!n||t===null||t===void 0?0:(n.minAlt-t)*1}function M0(){return sn?ui:di}function y0(n){!n||n.length===0||(Ne=n.reduce((t,e)=>({minLat:Math.min(t.minLat,e.lat),maxLat:Math.max(t.maxLat,e.lat),minLon:Math.min(t.minLon,e.lon),maxLon:Math.max(t.maxLon,e.lon),minAlt:Math.min(t.minAlt,e.alt),maxAlt:Math.max(t.maxAlt,e.alt)}),{minLat:1/0,maxLat:-1/0,minLon:1/0,maxLon:-1/0,minAlt:1/0,maxAlt:-1/0}),_r={lat:(Ne.minLat+Ne.maxLat)/2,lon:(Ne.minLon+Ne.maxLon)/2,alt:(Ne.minAlt+Ne.maxAlt)/2},ui=n[0].alt,sn=!0,console.log("Global coordinate system initialized:",{globalCenter:_r,globalBounds:Ne}))}function E0(){Ne=null,_r=null,ui=null,sn=!1}function w0(){ci&&(ai.forEach(({points:n,line:t})=>{n&&(n.geometry&&n.geometry.dispose(),n.material&&(Array.isArray(n.material)?n.material.forEach(e=>e.dispose()):n.material.dispose()),ci.remove(n)),t&&(t.material&&(Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material.dispose()),ci.remove(t))}),ai.clear(),t0(),ze=[],Ls=null,Fe=null,di=null)}function T0(n){!n||n.length===0||(Fe=n.reduce((t,e)=>({minLat:Math.min(t.minLat,e.lat),maxLat:Math.max(t.maxLat,e.lat),minLon:Math.min(t.minLon,e.lon),maxLon:Math.max(t.maxLon,e.lon),minAlt:Math.min(t.minAlt,e.alt),maxAlt:Math.max(t.maxAlt,e.alt)}),{minLat:1/0,maxLat:-1/0,minLon:1/0,maxLon:-1/0,minAlt:1/0,maxAlt:-1/0}),Ls={lat:(Fe.minLat+Fe.maxLat)/2,lon:(Fe.minLon+Fe.maxLon)/2,alt:(Fe.minAlt+Fe.maxAlt)/2},di=n[0].alt)}function b0(){Hn=(n,t,e)=>{let i,r,s;typeof n=="object"&&n!==null&&"lat"in n?(i=n.lat,r=n.lon,s=n.alt!==void 0?n.alt:ui||di):(i=n,r=t,s=e!==void 0?e:ui||di);const a=sn?_r:Ls,o=sn?ui:di;if(i===void 0||r===void 0||s===void 0||a===null||o===null)return new P(0,0,0);const l=a.lat*Math.PI/180,c=10,d=(r-a.lon)*Math.cos(l)*111320*c,u=(s-o)*10,h=(i-a.lat)*111320*c;return new P(d,u,-h)}}function A0(n){const t=[];return n.forEach(e=>{const i=Hn(e.lat,e.lon,e.alt),r=(Math.random()-.5)*.01;t.push(i.x,i.y,i.z+r)}),{positions:t}}function C0(n,t){const e=new Se;e.setAttribute("position",new Qt(n.positions,3));const i=new Float32Array(n.positions.length);e.setAttribute("color",new Qt(i,3));const r=new Float32Array(t);r.fill(4),e.setAttribute("pointSize",new Qt(r,1));const s=new Ye({vertexColors:!0,vertexShader:m0,fragmentShader:g0,transparent:!1,depthTest:!0,depthWrite:!0}),a=new as(e,s);a.renderOrder=0;const o=f0(),l=new Bi({color:o.line,transparent:!1,opacity:1,depthTest:!0,depthWrite:!0,linewidth:1e4}),c=new Kc(e,l);c.renderOrder=0;const d=document.getElementById("show-lines-toggle");return c.visible=d?d.checked:!1,ci.add(c,a),{points:a,line:c}}function vr(n,t=!1){let e;if(t?(ze.push(...n),e=ze):(ze=[...n],e=ze),e.length===0)return w0(),null;ai.forEach(({points:o,line:l})=>{o&&ci.remove(o),l&&ci.remove(l)}),ai.clear(),T0(e),b0();const i=e.reduce((o,l)=>{const c=l.talkerId||"default";return o[c]||(o[c]=[]),o[c].push(l),o},{});for(const o in i){const l=i[o];if(l.length>1){const c=A0(l),d=C0(c,l.length);ai.set(o,{points:d.points,line:d.line,gpsPoints:l})}}n0(i,Hn),console.log(`Plotted ${e.length} points across ${ai.size} tracks.`),c0(ai,ze,sn?Ne:Fe),so(),Tr();const s=sn?Ne:Fe,a=sn?_r:Ls;return{dataSpan:Math.max((s.maxLat-s.minLat)*111320,(s.maxLon-s.minLon)*111320),firstPoint:n[0],firstPointVec:Hn(n[0].lat,n[0].lon,n[0].alt),center:a,bounds:s}}let $e,Un,Nn,_n,Pn,ls,Fa,ye,Ln=null;function R0(){$e=new e_,$e.background=new pt(328965),ls=new li,Fa=new li,$e.add(ls),ls.add(Fa),Un=new Oe(75,window.innerWidth/window.innerHeight,1,1e7),Un.position.set(610,610,610),Nn=new t_({antialias:!0}),Nn.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(Nn.domElement),_n=new p_,_n.setSize(window.innerWidth,window.innerHeight),_n.domElement.style.position="absolute",_n.domElement.style.top="0px",_n.domElement.style.pointerEvents="none",document.body.appendChild(_n.domElement),Pn=m_(Un,Nn.domElement),ye=new f_(100),ye.position.y=.1,$e.add(ye),Un.lookAt(ye.position),Ln=g_($e),S_($e),md(),console.log("Scene initialized. Waiting for data file.")}function $n(){return{scene:$e,camera:Un,renderer:Nn,labelRenderer:_n,controls:Pn,dataGroup:ls,tileGroup:Fa,axesHelper:ye}}function L0(){ye&&($e.remove(ye),ye.geometry&&ye.geometry.dispose(),ye.material&&(Array.isArray(ye.material)?ye.material.forEach(n=>n.dispose()):ye.material.dispose()),ye=null),Ln&&($e.remove(Ln),Ln.geometry&&Ln.geometry.dispose(),Ln.material&&Ln.material.dispose(),Ln=null)}function md(){if(requestAnimationFrame(md),Pn.isCinematicActive&&Pn.isCinematicActive()){const t=Pn.getTargetTalkerId(),e=_0(t);e&&Pn.setCinematicTarget(e)}Pn.update();const n=Pn.getCurrentCamera();y_(n),Nn.render($e,n),_n.render($e,n)}function P0(){Un&&Nn&&(Un.aspect=window.innerWidth/window.innerHeight,Un.updateProjectionMatrix(),Nn.setSize(window.innerWidth,window.innerHeight),_n.setSize(window.innerWidth,window.innerHeight))}const Oa={satellite:{url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",name:"Satellite"},streetview:{url:"https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",name:"Topographic"}},Ar={initialOpacity:.5,initialTileService:"satellite",initialRenderDistance:5,initialRenderDistanceKm:2};async function sc(n,t){if(window.__TAURI__){const e=await window.__TAURI__.core.invoke("fetch_url",{url:n});return{ok:!0,json:async()=>JSON.parse(e),text:async()=>e}}return fetch(n,{signal:AbortSignal.timeout(5e3)})}function ac(n,t,e){const i=Math.pow(2,e),r=Math.floor(i*((n+180)/360)),s=t*Math.PI/180,a=Math.floor(i*(1-Math.log(Math.tan(s)+1/Math.cos(s))/Math.PI)/2);return{x:Math.max(0,Math.min(i-1,r)),y:Math.max(0,Math.min(i-1,a))}}function ys(n,t,e){const i=Math.pow(2,e),r=n/i*360-180,a=Math.atan(Math.sinh(Math.PI*(1-2*t/i)))*180/Math.PI;return{lon:r,lat:a}}function I0(n,t,e=5e3){return new Promise((i,r)=>{const s=setTimeout(()=>{r(new Error(`Timeout loading texture: ${t}`))},e);n.load(t,a=>{clearTimeout(s),i(a)},void 0,a=>{clearTimeout(s),r(a)})})}let Ba=Ar.initialTileService,Es=Ar.initialOpacity,Ue=null;const D0=.51;let Ze=null;const za=650;let cs=null;function U0(n){cs=null}const N0="https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png";let gd=32,_d=10,Fn=!1;function F0(n){_d=parseFloat(n),Fn&&br()&&tr()}function O0(n){gd=parseInt(n,10),Fn&&br()&&tr()}function B0(n){Fn=!!n,br()&&tr()}async function z0(n,t,e){const i=N0.replace("{z}",e).replace("{x}",n).replace("{y}",t);return new Promise(r=>{const s=new Image;s.crossOrigin="Anonymous",s.onload=()=>{try{const a=document.createElement("canvas");a.width=s.width,a.height=s.height;const o=a.getContext("2d");o.drawImage(s,0,0),r(o.getImageData(0,0,a.width,a.height))}catch(a){console.warn(`Elevation canvas read failed for ${n},${t},${e}:`,a),r(null)}},s.onerror=()=>{console.warn(`Elevation tile load failed: ${i}`),r(null)},setTimeout(()=>r(null),6e3),s.src=i})}function k0(n,t,e){const{data:i,width:r,height:s}=n;return((o,l)=>{const c=Math.max(0,Math.min(r-1,Math.round(l))),u=(Math.max(0,Math.min(s-1,Math.round(o)))*r+c)*4;return i[u]*256+i[u+1]+i[u+2]/256-32768})(t,e)}function H0(n,t){const e=t/111.32,i=(n.minLat+n.maxLat)/2,r=t/(111.32*Math.cos(i*Math.PI/180));return{minLat:n.minLat-e,maxLat:n.maxLat+e,minLon:n.minLon-r,maxLon:n.maxLon+r}}function G0(n){const t=Math.max(n.maxLon-n.minLon,1e-4),e=Math.max(n.maxLat-n.minLat,1e-4);for(let i=18;i>=1;i--){const r=Math.pow(2,i),s=Math.ceil(r*t/360)+1,a=Math.ceil(r*e/180)+1;if(s*a<=za)return i}return 1}async function tr(){const{tileGroup:n}=$n(),t=window.getCurrentRenderDistance?window.getCurrentRenderDistance():Ar.initialRenderDistanceKm,e=br(),i=pd();if(!e||!i){console.error("Bounding box or GPS conversion not available.");return}for(;n.children.length>0;){const w=n.children[0];n.remove(w),w.geometry&&w.geometry.dispose(),w.material&&(w.material.map&&w.material.map.dispose(),w.material.dispose())}const r=H0(e,t),s=cs!==null?cs:G0(r),a=ac(r.minLon,r.maxLat,s),o=ac(r.maxLon,r.minLat,s),l={x:Math.floor((a.x+o.x)/2),y:Math.floor((a.y+o.y)/2)},c=o.x-a.x+1,d=o.y-a.y+1,u=c*d;if(isNaN(a.x)||isNaN(a.y)||isNaN(o.x)||isNaN(o.y)||o.x<a.x||o.y<a.y||c>1e3||d>1e3){console.error("Invalid tile coordinate range:",{minTile:a,maxTile:o,bbox:r});return}if(u>za){console.warn(`Tile count ${u} exceeds MAX_TILE_COUNT (${za}). Aborting.`);return}const h=ys(a.x,a.y,s),m=ys(o.x+1,o.y+1,s),g=i({lat:h.lat,lon:h.lon}),_=i({lat:m.lat,lon:m.lon});Ze={minX:Math.min(g.x,_.x),maxX:Math.max(g.x,_.x),minZ:Math.min(g.z,_.z),maxZ:Math.max(g.z,_.z)};const f=[];for(let w=a.x;w<=o.x;w++)for(let I=a.y;I<=o.y;I++)f.push({x:w,y:I});f.sort((w,I)=>Math.hypot(w.x-l.x,w.y-l.y)-Math.hypot(I.x-l.x,I.y-l.y));const p=S0(),E=M0();console.log(`Loading ${f.length} tiles | zoom ${s} (${cs!==null?"manual":"auto"}) | renderDist ${t} km | floorY ${p.toFixed(1)} | topo ${Fn?"ON":"OFF"}`);const M=new l_;await Promise.all(f.map(({x:w,y:I})=>V0(w,I,s,M,i,p,E).catch(()=>null))),X0(p),console.log("Finished loading tiles.")}async function V0(n,t,e,i,r,s,a){const{tileGroup:o}=$n(),l=Oa[Ba].url.replace("{z}",e).replace("{y}",t).replace("{x}",n),c=ys(n,t,e),d=ys(n+1,t+1,e),u=r({lat:c.lat,lon:c.lon}),h=r({lat:d.lat,lon:d.lon}),m=Math.abs(h.x-u.x),g=Math.abs(h.z-u.z),[_,f]=await Promise.all([I0(i,l,5e3),Fn&&a!==null?z0(n,t,e):Promise.resolve(null)]);_.wrapS=vn,_.wrapT=vn,_.minFilter=Re,_.magFilter=Re;const p=Fn&&f?gd:1,E=new gi(m,g,p,p);Fn&&f&&W0(E,f,s,a,p);const M=new ja({map:_,side:Be,transparent:!0,opacity:Es}),w=new ve(E,M);w.rotation.x=-Math.PI/2,Fn&&f?w.position.set((u.x+h.x)/2,s,(u.z+h.z)/2):w.position.set((u.x+h.x)/2,s-.1,(u.z+h.z)/2),o.add(w)}function W0(n,t,e,i,r){const s=n.attributes.position,a=r+1,o=r+1,l=t.height,c=t.width;for(let d=0;d<a;d++)for(let u=0;u<o;u++){const h=d*o+u,m=d/(a-1)*(l-1),g=u/(o-1)*(c-1),p=(k0(t,m,g)-i)*_d-e;s.setZ(h,p)}s.needsUpdate=!0,n.computeVertexNormals()}function X0(n){const{scene:t}=$n();if(Ue&&(t.remove(Ue),Ue.geometry.dispose(),Ue.material.dispose(),Ue=null),!Ze)return;const e=Ze.maxX-Ze.minX,i=Ze.maxZ-Ze.minZ,r=(Ze.minX+Ze.maxX)/2,s=(Ze.minZ+Ze.maxZ)/2,a=Math.max(e,i)/80;Ue=new ve(new gi(e,i),new Ye({uniforms:{uGridColor:{value:new pt(7829367)},uGridSize:{value:a},uLineWidth:{value:.5},uOpacity:{value:.55}},depthWrite:!1,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-8,polygonOffsetUnits:-8,transparent:!0,alphaTest:.01,blending:Bn,side:Be,vertexShader:`
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
            `})),Ue.rotation.x=-Math.PI/2,Ue.position.set(r,n,s),Ue.renderOrder=-1,t.add(Ue),vd()}function vd(){Ue&&(Ue.visible=Es<D0)}function oc(n){const{tileGroup:t}=$n();Es=parseFloat(n),t.children.forEach(e=>{e.material&&(e.material.opacity=Es)}),vd()}function $0(n){n!==Ba&&Oa[n]&&(Ba=n,console.log("Switched to tile service:",Oa[n].name),br()&&tr())}let oo=[],ka=[],re=[],Ha=[],se=0,on=!1,Mn=!0,ds=null,qi=1;const q0=100,xd=100;function mi(n){return n==null||n===0?null:n<1e10?n*1e3:n}function Y0(){const n=[];for(const t of ka)t&&t.length&&n.push(...t);re=n.sort((t,e)=>{const i=mi(t.time)??1/0,r=mi(e.time)??1/0;return i-r})}function K0(n){const t=mi(n);return t?new Date(t).toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"}):"--:--:--"}function j0(n){const t=mi(re[n]?.time),e=mi(re[n+1]?.time);return t!=null&&e!=null&&e>t?Math.max(0,(e-t)/qi):q0/qi}function Z0(){return oo}function J0(n){qi=n,on&&(er(),nr()),iv()}function Ga(){return{isLiveMode:Mn,isPlaying:on,currentPointIndex:se,totalLines:oo.length,totalPoints:re.length,progress:re.length>0?se/(re.length-1):0,playbackSpeed:qi}}function Sd(n){Ha=n||[]}function lo(n){oo=n;const t=Ad();if(t==="radar"){const e=n.join(`
`);ka=[ed(e)||[]]}else ka=n.map(e=>t==="adsb"?td(e)||[]:Qc(e)||[]);Y0(),se=Math.max(0,re.length-1),ir()}function Q0(){const n=document.getElementById("timeSlider");n&&re.length>0&&(n.max=re.length-1,Mn&&(se=re.length-1,n.value=se))}function er(){ds!==null&&(clearTimeout(ds),ds=null)}function nr(){if(!on)return;if(se>=re.length-1){co();return}const n=j0(se);ds=setTimeout(()=>{on&&(se++,ir(),Cr(),nr())},n)}function tv(){er(),se>=re.length-1&&(se=0),on=!0,yd(),nr()}function co(){er(),on=!1,yd()}function ev(){Mn&&Ps(),se=Math.max(0,se-xd),ir(),Cr(),on&&(er(),nr())}function nv(){Mn&&Ps(),se=Math.min(re.length-1,se+xd),ir(),Cr(),on&&(er(),nr())}function Ps(){Mn=!1,Ed()}function Md(){Mn=!0,co(),se=Math.max(0,re.length-1),ir(),Ed(),Cr()}function Cr(){Ad();const n=re.slice(0,se+1);let t=n;if(Ha.length>0){const e=mi(re[se]?.time)??1/0,i=Ha.filter(r=>(mi(r.time)??1/0)<=e);t=[...n,...i]}vr(t,!1),gr(t)}function ir(){const n=document.getElementById("timeSlider"),t=document.getElementById("timeDisplay");if(re.length>0){const e=re.length-1;if(n&&(n.max=e,n.value=se),t){const i=re[se]?.time;re[e]?.time,t.textContent=`${K0(i)}`}}}function yd(){const n=document.getElementById("playIcon"),t=document.getElementById("pauseIcon");on?(n&&(n.style.display="none"),t&&(t.style.display="inline")):(n&&(n.style.display="inline"),t&&(t.style.display="none"))}function Ed(){const n=document.getElementById("goLive");n&&(n.style.opacity=Mn?"0.5":"1.0",n.disabled=Mn)}function iv(){const n=document.getElementById("currentSpeedDisplay");n&&(n.textContent=`${qi}x`),document.querySelectorAll(".speed-option").forEach(t=>{t.classList.toggle("active",parseFloat(t.dataset.speed)===qi)})}function wd(n){Mn&&Ps(),se=parseInt(n.target.value),ir(),Cr(),on&&(er(),nr())}function rv(n){const t=parseFloat(n.target.dataset.speed);if(!isNaN(t)&&t>0){J0(t);const e=document.getElementById("speedOptions");e&&e.classList.remove("show")}}function sv(){const n=document.getElementById("timeSlider");n&&(["mousedown","mousemove","mouseup","click"].forEach(t=>{n.addEventListener(t,e=>e.stopPropagation())}),n.addEventListener("input",wd))}const av=`<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 576 512">\r
<path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 92.9-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.8-35.7-46.1-87.7-92.9-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0a144 144 0 1 1-288 0zm144-64a64 64 0 1 1 0 128a64 64 0 0 1 0-128z"/></svg>`,Td=`<svg class="trash-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 448 512"><path fill="currentColor" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>\r
`,ov=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512">\r
<path fill="currentColor" d="M232.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 149.8C5.4 145.8 0 137.3 0 128s5.4-17.9 13.9-21.8L232.5 5.2zM48.1 218.4l164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 277.8C5.4 273.8 0 265.3 0 256s5.4-17.9 13.9-21.8l34.1-15.8zM13.9 362.2l34.1-15.8 164.3 75.9c27.7 12.8 59.6 12.8 87.3 0l164.3-75.9 34.1 15.8c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L13.9 405.8C5.4 401.8 0 393.3 0 384s5.4-17.9 13.9-21.8z"/></svg>`,Ge=new Map;let He=null,lv=1;const cv=10,tn=new Set;function uo(n,t){return t==="adsb"?td(n):t==="radar"?ed(n):Qc(n)}async function dv(){const n=[];for(const t of tn){const e=Ge.get(t);if(e)try{const r=await(await e.handle.getFile()).text();n.push(...uo(r,e.type))}catch(i){console.error(`Overlay read failed for file ${t}:`,i)}}return n}async function bd(){if(!He)return;const n=Ge.get(He);if(n)try{const e=await(await n.handle.getFile()).text(),i=uo(e,n.type),r=await dv();Sd(r);const s=[...i,...r];if(s.length===0)return;vr(s,!1),gr(s,n.type)}catch(t){console.error("rerenderWithOverlays failed:",t)}}function uv(n){const t=Ge.get(n);if(t)if(t.watcherInterval&&clearInterval(t.watcherInterval),tn.delete(n),Ge.delete(n),n===He){const e=[...Ge.keys()];e.length>0?(He=null,ho(e[e.length-1])):(He=null,lo([]),vr([]),gr([]),E0(),xr())}else(tn.size>0||n!==He)&&bd(),xr()}function Ad(){return He&&Ge.get(He)?.type||null}function xr(){const n=document.getElementById("fileListContainer");if(!n)return;n.querySelectorAll("[data-file-id]").forEach(s=>s.remove());const t=Ge.size>0,e=n.querySelectorAll("[data-obj-id]").length>0;n.style.display=t||e?"flex":"none",(t||e)&&(n.style.flexDirection="column");const i=n.querySelector("[data-obj-id]")||null,r=Array.from(Ge.entries());r.forEach(([s,a],o)=>{const l=s===He,c=tn.has(s);r.length-1;const d=document.createElement("div");d.className=l?"active":"",d.dataset.fileId=s,d.style.cssText=`
            display: flex; align-items: center; gap: 0.5em;
            padding: 0.6em 0.8em;
            border: 1px solid ${l?"#f0f0f0":c?"#5588cc":"#333"};
            border-radius: 2px;
            cursor: pointer;
            font-size: 0.85em;
            color: ${l?"#e0e0e0":"#eee"};
            background: #1a1a1a;
            user-select: none;
            width: 100%;
            box-sizing: border-box;
            min-width: 0;
            font-family: inherit;
            transition: border 0.2s ease;
        `;let u=`
            <span style="flex:1; min-width:0; overflow:hidden; white-space:nowrap;" title="${a.name}">
                ${a.name}
            </span>
            ${l?`<span style="flex-shrink:0; opacity:1; line-height:0; margin-left:auto;">${av}</span>`:""}
        `;if(l||(u+=`
                <span class="overlay-btn" data-overlaid="${c}"
                      style="flex-shrink:0; line-height:0; color:${c?"#1c7eff":"#88888888"}; transition:color 0.15s ease;"
                      title="${c?"Remove overlay":"Overlay onto current scene"}">
                    ${ov}
                </span>
                <span class="trash-btn"
                      style="flex-shrink:0; line-height:0; color:#88888888; transition:color 0.15s ease;"
                      title="Remove">
                    ${Td}
                </span>
            `),d.innerHTML=u,d.addEventListener("click",h=>{h.target.closest(".trash-btn")||h.target.closest(".overlay-btn")||ho(s)}),!l){const h=d.querySelector(".trash-btn");h&&(h.addEventListener("mouseenter",()=>{h.style.color="#e03c3c"}),h.addEventListener("mouseleave",()=>{h.style.color="#88888888"}),h.addEventListener("click",g=>{g.stopPropagation(),uv(s)}));const m=d.querySelector(".overlay-btn");m&&(m.addEventListener("mouseenter",()=>{tn.has(s)||(m.style.color="#1c7eff")}),m.addEventListener("mouseleave",()=>{m.style.color=tn.has(s)?"#1c7eff":"#88888888"}),m.addEventListener("click",async g=>{g.stopPropagation(),tn.has(s)?tn.delete(s):tn.add(s),xr(),await bd()}))}n.insertBefore(d,i)})}async function hv(n){const t=await n.getFile(),e=await t.text();let i;L_(e)?i="radar":(i=T_(e),i==="unknown"&&(i="nmea"));const r=lv++;return Ge.set(r,{id:r,handle:n,name:t.name,type:i,readOffset:t.size,watcherInterval:null,isWatcherRunning:!1}),pv(r),r}async function ho(n){if(n===He)return;const t=Ge.get(n);if(!t)return;tn.clear(),Sd([]),He=n,U0();const i=await(await t.handle.getFile()).text(),r=t.type==="radar"?[i]:i.split(`
`).filter(o=>o.trim());lo(r);const s=uo(i,t.type);if(s.length===0){vr([]),gr([],t.type),xr();return}y0(s);const a=vr(s,!1);gr(s,t.type),xr(),a&&window.dispatchEvent(new CustomEvent("fileLoaded",{detail:a}))}async function fv(n){const t=Ge.get(n);if(!(!t||!t.handle||t.isWatcherRunning||t.type==="radar")){t.isWatcherRunning=!0;try{const e=await t.handle.getFile();if(e.size>t.readOffset){const i=await e.slice(t.readOffset).text();if(t.readOffset=e.size,i.length>0&&n===He){const r=i.split(`
`).filter(a=>a.trim()),s=[...Z0(),...r];lo(s),Ga().isLiveMode?Md():Q0()}}}catch(e){console.error(`Error watching file ${n}:`,e)}finally{t.isWatcherRunning=!1}}}function pv(n){const t=Ge.get(n);!t||t.type==="radar"||(t.watcherInterval&&clearInterval(t.watcherInterval),t.watcherInterval=setInterval(()=>fv(n),cv))}function mv(){window.addEventListener("gpsFilesSelected",async o=>{const l=o.detail;if(l.length===0)return;let c=null;for(const d of l)c=await hv(d);c!==null&&await ho(c)});const n=document.getElementById("rewind");n&&n.addEventListener("click",ev);const t=document.getElementById("playPause");t&&t.addEventListener("click",()=>{Ga().isLiveMode&&Ps(),Ga().isPlaying?co():tv()});const e=document.getElementById("forward");e&&e.addEventListener("click",nv);const i=document.getElementById("goLive");i&&i.addEventListener("click",Md);const r=document.getElementById("timeSlider");r&&(r.addEventListener("input",wd),sv());const s=document.getElementById("adjustSpeed"),a=document.getElementById("speedOptions");s&&a&&(s.addEventListener("click",o=>{o.stopPropagation(),a.classList.toggle("show")}),document.querySelectorAll(".speed-option").forEach(o=>{o.addEventListener("click",rv)}),window.addEventListener("click",()=>a.classList.remove("show")))}document.getElementById("topo-toggle").addEventListener("change",n=>{B0(n.target.checked)});document.getElementById("topo-scale").addEventListener("change",n=>{F0(n.target.value)});document.getElementById("topo-segments").addEventListener("change",n=>{O0(n.target.value)});function gv(){_v(),xv(),vv()}const us=document.getElementById("topo-segments"),lc=1,cc=256;let ur=parseInt(us.value,10);us.addEventListener("change",()=>{let n=parseInt(us.value,10);isNaN(n)||(n>ur?n=ur*2:n<ur&&(n=Math.floor(ur/2)),n>cc&&(n=cc),n<lc&&(n=lc),us.value=n,ur=n)});function _v(){const n=document.getElementById("opacitySlider");n&&(n.value=Ar.initialOpacity,oc(n.value),n.addEventListener("input",t=>{oc(t.target.value)}))}function vv(){document.querySelectorAll(".view-option").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll(".view-option").forEach(e=>e.classList.remove("active")),n.classList.add("active");const t=n.dataset.view;$0(t)})})}function xv(){const n=document.getElementById("renderMinus"),t=document.getElementById("renderPlus"),e=document.getElementById("renderValue");let i=Ar.initialRenderDistance;const r=1,s=50,a=()=>{e&&(e.textContent=i),n&&(n.disabled=i<=r),t&&(t.disabled=i>=s)},o=l=>{i=Math.max(r,Math.min(s,l)),a(),tr()};n&&n.addEventListener("click",()=>o(i-1)),t&&t.addEventListener("click",()=>o(i+1)),window.getCurrentRenderDistance=()=>i,a()}const Sv="modulepreload",Mv=function(n,t){return new URL(n,t).href},dc={},uc=function(t,e,i){let r=Promise.resolve();if(e&&e.length>0){let c=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");r=c(e.map(d=>{if(d=Mv(d,i),d in dc)return;dc[d]=!0;const u=d.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(!!i)for(let _=a.length-1;_>=0;_--){const f=a[_];if(f.href===d&&(!u||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${h}`))return;const g=document.createElement("link");if(g.rel=u?"stylesheet":Sv,u||(g.as="script"),g.crossOrigin="",g.href=d,l&&g.setAttribute("nonce",l),document.head.appendChild(g),u)return new Promise((_,f)=>{g.addEventListener("load",_),g.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return t().catch(s)})};async function fo(n,t={},e){return window.__TAURI_INTERNALS__.invoke(n,t,e)}var hc;(function(n){n[n.Audio=1]="Audio",n[n.Cache=2]="Cache",n[n.Config=3]="Config",n[n.Data=4]="Data",n[n.LocalData=5]="LocalData",n[n.Document=6]="Document",n[n.Download=7]="Download",n[n.Picture=8]="Picture",n[n.Public=9]="Public",n[n.Video=10]="Video",n[n.Resource=11]="Resource",n[n.Temp=12]="Temp",n[n.AppConfig=13]="AppConfig",n[n.AppData=14]="AppData",n[n.AppLocalData=15]="AppLocalData",n[n.AppCache=16]="AppCache",n[n.AppLog=17]="AppLog",n[n.Desktop=18]="Desktop",n[n.Executable=19]="Executable",n[n.Font=20]="Font",n[n.Home=21]="Home",n[n.Runtime=22]="Runtime",n[n.Template=23]="Template"})(hc||(hc={}));var fc;(function(n){n[n.Start=0]="Start",n[n.Current=1]="Current",n[n.End=2]="End"})(fc||(fc={}));function yv(n){return{isFile:n.isFile,isDirectory:n.isDirectory,isSymlink:n.isSymlink,size:n.size,mtime:n.mtime!==null?new Date(n.mtime):null,atime:n.atime!==null?new Date(n.atime):null,birthtime:n.birthtime!==null?new Date(n.birthtime):null,readonly:n.readonly,fileAttributes:n.fileAttributes,dev:n.dev,ino:n.ino,mode:n.mode,nlink:n.nlink,uid:n.uid,gid:n.gid,rdev:n.rdev,blksize:n.blksize,blocks:n.blocks}}async function Ev(n,t){if(n instanceof URL&&n.protocol!=="file:")throw new TypeError("Must be a file URL.");return await fo("plugin:fs|read_dir",{path:n instanceof URL?n.toString():n,options:t})}async function wv(n,t){if(n instanceof URL&&n.protocol!=="file:")throw new TypeError("Must be a file URL.");const e=await fo("plugin:fs|read_file",{path:n instanceof URL?n.toString():n,options:t});return e instanceof ArrayBuffer?new Uint8Array(e):Uint8Array.from(e)}async function Tv(n,t){const e=await fo("plugin:fs|stat",{path:n instanceof URL?n.toString():n,options:t});return yv(e)}const Cd=()=>!!window.__TAURI_INTERNALS__;async function bv(n){try{return(await Tv(n)).isDirectory}catch{return!1}}async function Rd(n){const t=await Ev(n),e=[];for(const i of t){const r=n.replace(/[/\\]$/,"")+"/"+i.name;i.isDirectory?e.push(...await Rd(r)):e.push(r)}return e}async function Av(n){const t=n.replace(/\\/g,"/").split("/").pop(),e=await wv(n),i=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength),r={name:t,size:e.byteLength,text:async()=>new TextDecoder().decode(e),arrayBuffer:async()=>i};return{kind:"file",name:t,getFile:async()=>r}}const Cv=Object.freeze(Object.defineProperty({__proto__:null,collectFilePathsRecursive:Rd,createHandleFromPath:Av,isDirectory:bv,isTauri:Cd},Symbol.toStringTag,{value:"Module"}));class Rv extends Zi{constructor(t){super(t)}load(t,e,i,r){const s=this,a=new jc(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(o){try{e(s.parse(o))}catch(l){r?r(l):console.error(l),s.manager.itemError(t)}},i,r)}parse(t){function e(c){const d=new DataView(c),u=32/8*3+32/8*3*3+16/8,h=d.getUint32(80,!0);if(80+32/8+h*u===d.byteLength)return!0;const g=[115,111,108,105,100];for(let _=0;_<5;_++)if(i(g,d,_))return!1;return!0}function i(c,d,u){for(let h=0,m=c.length;h<m;h++)if(c[h]!==d.getUint8(u+h))return!1;return!0}function r(c){const d=new DataView(c),u=d.getUint32(80,!0);let h,m,g,_=!1,f,p,E,M,w;for(let A=0;A<70;A++)d.getUint32(A,!1)==1129270351&&d.getUint8(A+4)==82&&d.getUint8(A+5)==61&&(_=!0,f=new Float32Array(u*3*3),p=d.getUint8(A+6)/255,E=d.getUint8(A+7)/255,M=d.getUint8(A+8)/255,w=d.getUint8(A+9)/255);const I=84,T=12*4+2,C=new Se,U=new Float32Array(u*3*3),v=new Float32Array(u*3*3),x=new pt;for(let A=0;A<u;A++){const B=I+A*T,F=d.getFloat32(B,!0),V=d.getFloat32(B+4,!0),$=d.getFloat32(B+8,!0);if(_){const H=d.getUint16(B+48,!0);(H&32768)===0?(h=(H&31)/31,m=(H>>5&31)/31,g=(H>>10&31)/31):(h=p,m=E,g=M)}for(let H=1;H<=3;H++){const Z=B+H*12,G=A*3*3+(H-1)*3;U[G]=d.getFloat32(Z,!0),U[G+1]=d.getFloat32(Z+4,!0),U[G+2]=d.getFloat32(Z+8,!0),v[G]=F,v[G+1]=V,v[G+2]=$,_&&(x.set(h,m,g).convertSRGBToLinear(),f[G]=x.r,f[G+1]=x.g,f[G+2]=x.b)}}return C.setAttribute("position",new Le(U,3)),C.setAttribute("normal",new Le(v,3)),_&&(C.setAttribute("color",new Le(f,3)),C.hasColors=!0,C.alpha=w),C}function s(c){const d=new Se,u=/solid([\s\S]*?)endsolid/g,h=/facet([\s\S]*?)endfacet/g,m=/solid\s(.+)/;let g=0;const _=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,f=new RegExp("vertex"+_+_+_,"g"),p=new RegExp("normal"+_+_+_,"g"),E=[],M=[],w=[],I=new P;let T,C=0,U=0,v=0;for(;(T=u.exec(c))!==null;){U=v;const x=T[0],A=(T=m.exec(x))!==null?T[1]:"";for(w.push(A);(T=h.exec(x))!==null;){let V=0,$=0;const H=T[0];for(;(T=p.exec(H))!==null;)I.x=parseFloat(T[1]),I.y=parseFloat(T[2]),I.z=parseFloat(T[3]),$++;for(;(T=f.exec(H))!==null;)E.push(parseFloat(T[1]),parseFloat(T[2]),parseFloat(T[3])),M.push(I.x,I.y,I.z),V++,v++;$!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+g),V!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+g),g++}const B=U,F=v-U;d.userData.groupNames=w,d.addGroup(B,F,C),C++}return d.setAttribute("position",new Qt(E,3)),d.setAttribute("normal",new Qt(M,3)),d}function a(c){return typeof c!="string"?new TextDecoder().decode(c):c}function o(c){if(typeof c=="string"){const d=new Uint8Array(c.length);for(let u=0;u<c.length;u++)d[u]=c.charCodeAt(u)&255;return d.buffer||d}else return c}const l=o(t);return e(l)?r(l):s(a(t))}}const Lv=/^[og]\s*(.+)?/,Pv=/^mtllib /,Iv=/^usemtl /,Dv=/^usemap /,pc=/\s+/,mc=new P,Ma=new P,gc=new P,_c=new P,De=new P,rs=new pt;function Uv(){const n={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(t,e){if(this.object&&this.object.fromDeclaration===!1){this.object.name=t,this.object.fromDeclaration=e!==!1;return}const i=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:t||"",fromDeclaration:e!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(r,s){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const o={index:this.materials.length,name:r||"",mtllib:Array.isArray(s)&&s.length>0?s[s.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(l){const c={index:typeof l=="number"?l:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return c.clone=this.clone.bind(c),c}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(r){const s=this.currentMaterial();if(s&&s.groupEnd===-1&&(s.groupEnd=this.geometry.vertices.length/3,s.groupCount=s.groupEnd-s.groupStart,s.inherited=!1),r&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return r&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),s}},i&&i.name&&typeof i.clone=="function"){const r=i.clone(0);r.inherited=!0,this.object.materials.push(r)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(t,e){const i=parseInt(t,10);return(i>=0?i-1:i+e/3)*3},parseNormalIndex:function(t,e){const i=parseInt(t,10);return(i>=0?i-1:i+e/3)*3},parseUVIndex:function(t,e){const i=parseInt(t,10);return(i>=0?i-1:i+e/2)*2},addVertex:function(t,e,i){const r=this.vertices,s=this.object.geometry.vertices;s.push(r[t+0],r[t+1],r[t+2]),s.push(r[e+0],r[e+1],r[e+2]),s.push(r[i+0],r[i+1],r[i+2])},addVertexPoint:function(t){const e=this.vertices;this.object.geometry.vertices.push(e[t+0],e[t+1],e[t+2])},addVertexLine:function(t){const e=this.vertices;this.object.geometry.vertices.push(e[t+0],e[t+1],e[t+2])},addNormal:function(t,e,i){const r=this.normals,s=this.object.geometry.normals;s.push(r[t+0],r[t+1],r[t+2]),s.push(r[e+0],r[e+1],r[e+2]),s.push(r[i+0],r[i+1],r[i+2])},addFaceNormal:function(t,e,i){const r=this.vertices,s=this.object.geometry.normals;mc.fromArray(r,t),Ma.fromArray(r,e),gc.fromArray(r,i),De.subVectors(gc,Ma),_c.subVectors(mc,Ma),De.cross(_c),De.normalize(),s.push(De.x,De.y,De.z),s.push(De.x,De.y,De.z),s.push(De.x,De.y,De.z)},addColor:function(t,e,i){const r=this.colors,s=this.object.geometry.colors;r[t]!==void 0&&s.push(r[t+0],r[t+1],r[t+2]),r[e]!==void 0&&s.push(r[e+0],r[e+1],r[e+2]),r[i]!==void 0&&s.push(r[i+0],r[i+1],r[i+2])},addUV:function(t,e,i){const r=this.uvs,s=this.object.geometry.uvs;s.push(r[t+0],r[t+1]),s.push(r[e+0],r[e+1]),s.push(r[i+0],r[i+1])},addDefaultUV:function(){const t=this.object.geometry.uvs;t.push(0,0),t.push(0,0),t.push(0,0)},addUVLine:function(t){const e=this.uvs;this.object.geometry.uvs.push(e[t+0],e[t+1])},addFace:function(t,e,i,r,s,a,o,l,c){const d=this.vertices.length;let u=this.parseVertexIndex(t,d),h=this.parseVertexIndex(e,d),m=this.parseVertexIndex(i,d);if(this.addVertex(u,h,m),this.addColor(u,h,m),o!==void 0&&o!==""){const g=this.normals.length;u=this.parseNormalIndex(o,g),h=this.parseNormalIndex(l,g),m=this.parseNormalIndex(c,g),this.addNormal(u,h,m)}else this.addFaceNormal(u,h,m);if(r!==void 0&&r!==""){const g=this.uvs.length;u=this.parseUVIndex(r,g),h=this.parseUVIndex(s,g),m=this.parseUVIndex(a,g),this.addUV(u,h,m),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(t){this.object.geometry.type="Points";const e=this.vertices.length;for(let i=0,r=t.length;i<r;i++){const s=this.parseVertexIndex(t[i],e);this.addVertexPoint(s),this.addColor(s)}},addLineGeometry:function(t,e){this.object.geometry.type="Line";const i=this.vertices.length,r=this.uvs.length;for(let s=0,a=t.length;s<a;s++)this.addVertexLine(this.parseVertexIndex(t[s],i));for(let s=0,a=e.length;s<a;s++)this.addUVLine(this.parseUVIndex(e[s],r))}};return n.startObject("",!1),n}class Nv extends Zi{constructor(t){super(t),this.materials=null}load(t,e,i,r){const s=this,a=new jc(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(o){try{e(s.parse(o))}catch(l){r?r(l):console.error(l),s.manager.itemError(t)}},i,r)}setMaterials(t){return this.materials=t,this}parse(t){const e=new Uv;t.indexOf(`\r
`)!==-1&&(t=t.replace(/\r\n/g,`
`)),t.indexOf(`\\
`)!==-1&&(t=t.replace(/\\\n/g,""));const i=t.split(`
`);let r=[];for(let o=0,l=i.length;o<l;o++){const c=i[o].trimStart();if(c.length===0)continue;const d=c.charAt(0);if(d!=="#")if(d==="v"){const u=c.split(pc);switch(u[0]){case"v":e.vertices.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3])),u.length>=7?(rs.setRGB(parseFloat(u[4]),parseFloat(u[5]),parseFloat(u[6])).convertSRGBToLinear(),e.colors.push(rs.r,rs.g,rs.b)):e.colors.push(void 0,void 0,void 0);break;case"vn":e.normals.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3]));break;case"vt":e.uvs.push(parseFloat(u[1]),parseFloat(u[2]));break}}else if(d==="f"){const h=c.slice(1).trim().split(pc),m=[];for(let _=0,f=h.length;_<f;_++){const p=h[_];if(p.length>0){const E=p.split("/");m.push(E)}}const g=m[0];for(let _=1,f=m.length-1;_<f;_++){const p=m[_],E=m[_+1];e.addFace(g[0],p[0],E[0],g[1],p[1],E[1],g[2],p[2],E[2])}}else if(d==="l"){const u=c.substring(1).trim().split(" ");let h=[];const m=[];if(c.indexOf("/")===-1)h=u;else for(let g=0,_=u.length;g<_;g++){const f=u[g].split("/");f[0]!==""&&h.push(f[0]),f[1]!==""&&m.push(f[1])}e.addLineGeometry(h,m)}else if(d==="p"){const h=c.slice(1).trim().split(" ");e.addPointGeometry(h)}else if((r=Lv.exec(c))!==null){const u=(" "+r[0].slice(1).trim()).slice(1);e.startObject(u)}else if(Iv.test(c))e.object.startMaterial(c.substring(7).trim(),e.materialLibraries);else if(Pv.test(c))e.materialLibraries.push(c.substring(7).trim());else if(Dv.test(c))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(d==="s"){if(r=c.split(" "),r.length>1){const h=r[1].trim().toLowerCase();e.object.smooth=h!=="0"&&h!=="off"}else e.object.smooth=!0;const u=e.object.currentMaterial();u&&(u.smooth=e.object.smooth)}else{if(c==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+c+'"')}}e.finalize();const s=new li;if(s.materialLibraries=[].concat(e.materialLibraries),!(e.objects.length===1&&e.objects[0].geometry.vertices.length===0)===!0)for(let o=0,l=e.objects.length;o<l;o++){const c=e.objects[o],d=c.geometry,u=c.materials,h=d.type==="Line",m=d.type==="Points";let g=!1;if(d.vertices.length===0)continue;const _=new Se;_.setAttribute("position",new Qt(d.vertices,3)),d.normals.length>0&&_.setAttribute("normal",new Qt(d.normals,3)),d.colors.length>0&&(g=!0,_.setAttribute("color",new Qt(d.colors,3))),d.hasUVIndices===!0&&_.setAttribute("uv",new Qt(d.uvs,2));const f=[];for(let E=0,M=u.length;E<M;E++){const w=u[E],I=w.name+"_"+w.smooth+"_"+g;let T=e.materials[I];if(this.materials!==null){if(T=this.materials.create(w.name),h&&T&&!(T instanceof Bi)){const C=new Bi;an.prototype.copy.call(C,T),C.color.copy(T.color),T=C}else if(m&&T&&!(T instanceof fr)){const C=new fr({size:10,sizeAttenuation:!1});an.prototype.copy.call(C,T),C.color.copy(T.color),C.map=T.map,T=C}}T===void 0&&(h?T=new Bi:m?T=new fr({size:1,sizeAttenuation:!1}):T=new i_,T.name=w.name,T.flatShading=!w.smooth,T.vertexColors=g,e.materials[I]=T),f.push(T)}let p;if(f.length>1){for(let E=0,M=u.length;E<M;E++){const w=u[E];_.addGroup(w.groupStart,w.groupCount,E)}h?p=new Pa(_,f):m?p=new as(_,f):p=new ve(_,f)}else h?p=new Pa(_,f[0]):m?p=new as(_,f[0]):p=new ve(_,f[0]);p.name=c.name,s.add(p)}else if(e.vertices.length>0){const o=new fr({size:1,sizeAttenuation:!1}),l=new Se;l.setAttribute("position",new Qt(e.vertices,3)),e.colors.length>0&&e.colors[0]!==void 0&&(l.setAttribute("color",new Qt(e.colors,3)),o.vertexColors=!0);const c=new as(l,o);s.add(c)}return s}}const Fv=`<svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512">\r
<path fill="currentColor" d="M284-1.3c-17.3-10-38.7-10-56 0L143.8 47.3c-17.3 10-28 28.5-28 48.5l0 101.9-88.3 51c-17.3 10-28 28.5-28 48.5l0 97.3c0 20 10.7 38.5 28 48.5l84.3 48.6c17.3 10 38.7 10 56 0l88.3-51 88.3 51c17.3 10 38.7 10 56 0L484.5 443c17.3-10 28-28.5 28-48.5l0-97.3c0-20-10.7-38.5-28-48.5l-88.3-51 0-101.9c0-20-10.7-38.5-28-48.5L284-1.3zM232 292.6l0 106.5-88.3 51c-1.2 .7-2.6 1.1-4 1.1l0-105.3 92.3-53.3zm231.4 .6c.7 1.2 1.1 2.6 1.1 4l0 97.3c0 2.9-1.5 5.5-4 6.9l-84.3 48.6c-1.2 .7-2.6 1.1-4 1.1l0-105.3 91.2-52.6zM348.3 95.8l0 101.9-92.3 53.3 0-106.5 91.2-52.6c.7 1.2 1.1 2.6 1.1 4z"/>\r
</svg>`,Yi=new Map;let Ov=1;const po=new Set(["stl","obj"]);async function Ld(n){if(n.kind==="file")return[n];if(n.kind==="directory"){const t=[];for await(const e of n.values())t.push(...await Ld(e));return t}return[]}async function Bv(n){const t=await n.getFile(),e=t.name.split(".").pop().toLowerCase(),i=await t.arrayBuffer();if(e==="stl"){const r=new Rv().parse(i);r.computeVertexNormals();const s=new n_({color:10070732,roughness:1,metalness:.3});return new ve(r,s)}if(e==="obj"){const r=new TextDecoder().decode(i);return new Nv().parse(r)}throw new Error(`Unsupported format: .${e}`)}function mo(n){if(!n.mesh)return;const t=pd(),e=t?t(n.lat,n.lon,n.alt):new P(0,0,0);n.mesh.position.copy(e),n.mesh.rotation.set(n.pitch*Math.PI/180,n.yaw*Math.PI/180,n.roll*Math.PI/180),n.mesh.scale.setScalar(n.scale)}function Pd(n){const t=new pt(n.color);n.mesh.traverse(e=>{if(!e.isMesh)return;(Array.isArray(e.material)?e.material:[e.material]).forEach(r=>{r.color&&r.color.set(t)})})}function Id(n){const t=Math.min(1,Math.max(0,n.opacity/100));n.mesh.traverse(e=>{if(!e.isMesh)return;(Array.isArray(e.material)?e.material:[e.material]).forEach(r=>{r.transparent=t<1,r.opacity=t,r.needsUpdate=!0})})}function zv(n){const t=Yi.get(n);if(!t)return;const{scene:e}=$n();e.remove(t.mesh),t.mesh.traverse(i=>{i.isMesh&&(i.geometry?.dispose(),(Array.isArray(i.material)?i.material:[i.material]).forEach(r=>r?.dispose()))}),Yi.delete(n),Dd()}function Rn(n,t,{step:e,min:i,max:r},s){const a=document.createElement("input");return a.type="number",a.value=n[t],a.step=e,a.min=i,a.max=r,a.style.cssText=`
        width: 100%; box-sizing: border-box;
        background: #111; color: #ddd;
        border: 1px solid #333; border-radius: 2px;
        padding: 3px 5px;
        font-family: inherit; font-size: 1em;
        color-scheme: dark;
        -moz-appearance: textfield;
        appearance: textfield;
    `,kv(),a.addEventListener("input",()=>{const o=parseFloat(a.value);isNaN(o)||(n[t]=o,s?s(o):mo(n))}),a.addEventListener("keydown",o=>{(o.key==="ArrowUp"||o.key==="ArrowDown")&&o.stopPropagation()}),a}function kv(){const n="__obj-input-no-spin";if(document.getElementById(n))return;const t=document.createElement("style");t.id=n,t.textContent="input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }",document.head.appendChild(t)}function mn(n,t){const e=document.createElement("label");e.style.cssText="display:flex; flex-direction:column; gap:3px; font-size:0.8em; color:#aaa;";const i=document.createElement("span");return i.textContent=n,e.appendChild(i),e.appendChild(t),e}function ya(n,...t){const e=document.createElement("div");return e.className="form-row",e.style.gridTemplateColumns=`repeat(${n}, 1fr)`,t.forEach(i=>e.appendChild(i)),e}function Dd(){const n=document.getElementById("fileListContainer");if(n){if(n.querySelectorAll("[data-obj-id]").forEach(t=>t.remove()),Yi.size===0){n.style.display="none";return}n.style.display="flex",Array.from(Yi.entries()).forEach(([t,e])=>{const i=document.createElement("div");i.dataset.objId=t,i.className="file-list-item",i.style.cssText=`
            border: 1px solid #333; border-radius: 2px;
            background: #1a1a1a;
            overflow: hidden; font-family: inherit;
        `;const r=document.createElement("div");r.style.cssText=`
            display: flex; align-items: center; gap: 0.5em;
            padding: 0.6em 0.8em;
            cursor: pointer; font-size: 0.85em; color: #e0e0e0;
            user-select: none;
        `,r.innerHTML=`
            <span style="flex:1; min-width:0; overflow:hidden; white-space:nowrap;
                         text-overflow:ellipsis;" title="${e.name}">${e.name}</span>
            <span class="vis-btn"
                  style="flex-shrink:0; line-height:0; opacity:${e.visible?1:.3};
                         transition:opacity 0.15s ease;"
                  title="Toggle visibility">${Fv}</span>
            <span class="trash-btn"
                  style="flex-shrink:0; line-height:0; color:#88888888;
                         transition:color 0.15s ease;"
                  title="Remove">${Td}</span>
        `;const s=document.createElement("div");s.style.cssText=`
            display: ${e.expanded?"block":"none"};
            padding: 0.6em 0.8em 0.8em;
            border-top: 1px solid #2a2a2a;
        `,s.appendChild(ya(3,mn("Roll (°)",Rn(e,"roll",{step:"1",min:"-360",max:"360"})),mn("Pitch (°)",Rn(e,"pitch",{step:"1",min:"-360",max:"360"})),mn("Yaw (°)",Rn(e,"yaw",{step:"1",min:"-360",max:"360"})))),s.appendChild(ya(3,mn("Lat",Rn(e,"lat",{step:"0.000001",min:"-90",max:"90"})),mn("Lon",Rn(e,"lon",{step:"0.000001",min:"-180",max:"180"})),mn("Alt (m)",Rn(e,"alt",{step:"1",min:"-1000",max:"100000"}))));const a=document.createElement("input");a.type="color",a.value=e.color,a.className="color-picker",a.style.cssText="width:100%; height:24px;",a.addEventListener("input",()=>{e.color=a.value,Pd(e)}),s.appendChild(ya(3,mn("Scale",Rn(e,"scale",{step:"0.01",min:"0.0001",max:"100000"})),mn("Opacity (%)",Rn(e,"opacity",{step:"1",min:"0",max:"100"},c=>{e.opacity=Math.min(100,Math.max(0,c)),Id(e)})),mn("Color",a))),r.addEventListener("click",c=>{c.target.closest(".vis-btn")||c.target.closest(".trash-btn")||(e.expanded=!e.expanded,s.style.display=e.expanded?"block":"none")});const o=r.querySelector(".vis-btn");o.addEventListener("click",c=>{c.stopPropagation(),e.visible=!e.visible,e.mesh.visible=e.visible,o.style.opacity=e.visible?1:.3});const l=r.querySelector(".trash-btn");l.addEventListener("mouseenter",()=>l.style.color="#e03c3c"),l.addEventListener("mouseleave",()=>l.style.color="#88888888"),l.addEventListener("click",c=>{c.stopPropagation(),zv(t)}),i.appendChild(r),i.appendChild(s),n.appendChild(i)})}}function Hv(){const n=x0();return n?.length>0?{lat:n[0].lat,lon:n[0].lon,alt:n[0].alt}:{lat:0,lon:0,alt:0}}async function go(n){const t=await Bv(n),e=await n.getFile(),{scene:i}=$n();Vv(i);const r=Hv(),s=Ov++,a={id:s,name:e.name,mesh:t,lat:r.lat,lon:r.lon,alt:r.alt,roll:0,pitch:0,yaw:0,scale:1,opacity:50,color:"#ff4d74",visible:!0,expanded:!0};Yi.set(s,a),i.add(t),mo(a),Pd(a),Id(a),Dd()}async function Gv(){try{const n=await window.showOpenFilePicker({types:[{description:"All Supported Files",accept:{"model/*":[".stl",".obj"],"text/plain":[".ubx",".txt",".csv",".log",".ndjson",".crswap"]}}],multiple:!0}),t=[];for(const e of n){const r=(await e.getFile()).name.split(".").pop().toLowerCase();po.has(r)?await go(e):t.push(e)}t.length>0&&window.dispatchEvent(new CustomEvent("gpsFilesSelected",{detail:t}))}catch(n){n.name!=="AbortError"&&console.error("File load failed:",n)}}let vc=!1;function Vv(n){if(vc)return;n.add(new h_(16777215,.8));const t=new u_(16777215,.6);t.position.set(500,1e3,500),n.add(t),vc=!0}function Wv(){Yi.forEach(n=>mo(n))}function Xv(){const n=document.getElementById("openFileBtn");n&&n.addEventListener("click",Gv),Cd()?$v():qv()}async function $v(){const{getCurrentWebviewWindow:n}=await uc(async()=>{const{getCurrentWebviewWindow:s}=await import("./webviewWindow-CUhjzfuM.js");return{getCurrentWebviewWindow:s}},[],import.meta.url),{collectFilePathsRecursive:t,isDirectory:e,createHandleFromPath:i}=await uc(async()=>{const{collectFilePathsRecursive:s,isDirectory:a,createHandleFromPath:o}=await Promise.resolve().then(()=>Cv);return{collectFilePathsRecursive:s,isDirectory:a,createHandleFromPath:o}},void 0,import.meta.url);n().onDragDropEvent(async s=>{const{type:a}=s.payload;if(a==="enter"||a==="over"){document.body.classList.add("drag-active");return}if(a==="leave"||a==="cancelled"){document.body.classList.remove("drag-active");return}if(a==="drop"){document.body.classList.remove("drag-active");const o=s.payload.paths??[];if(o.length===0)return;const l=[];for(const d of o)await e(d)?l.push(...await t(d)):l.push(d);const c=[];for(const d of l)try{const u=await i(d),h=d.split(".").pop().toLowerCase();po.has(h)?await go(u):c.push(u)}catch(u){console.error(`Failed to load dropped file: ${d}`,u)}c.length>0&&window.dispatchEvent(new CustomEvent("gpsFilesSelected",{detail:c}))}})}function qv(){let n=0;["dragenter","dragover","dragleave","drop"].forEach(t=>{window.addEventListener(t,e=>{e.preventDefault(),e.stopPropagation()})}),window.addEventListener("dragenter",t=>{t.dataTransfer?.types.includes("Files")&&(n++,document.body.classList.add("drag-active"))}),window.addEventListener("dragleave",()=>{--n===0&&document.body.classList.remove("drag-active")}),window.addEventListener("drop",async t=>{n=0,document.body.classList.remove("drag-active");const e=t.dataTransfer?.items;if(!e)return;const i=[];for(const s of e){if(s.kind!=="file")continue;const a=await s.getAsFileSystemHandle().catch(()=>null);a&&i.push(...await Ld(a))}const r=[];for(const s of i){const o=(await s.getFile()).name.split(".").pop().toLowerCase();po.has(o)?await go(s):r.push(s)}r.length>0&&window.dispatchEvent(new CustomEvent("gpsFilesSelected",{detail:r}))})}let xc=!1;function Yv(){const{controls:n}=$n();window.addEventListener("resize",P0),window.addEventListener("fileLoaded",t=>{const e=t.detail;e&&(xc||(L0(),M_(),xc=!0),n.reset(e.dataSpan,e.firstPointVec),tr(),Wv())}),Xv(),p0(),mv(),gv()}function Kv(){R0();const{dataGroup:n}=$n();v0(n),Yv(),console.log("Application initialized successfully")}Kv();document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelectorAll(".slider-wrapper"),t=e=>{const i=e.querySelector('input[type="range"]'),r=e.querySelector(".slider-tooltip");if(!i||!r)return;document.body.appendChild(r);const s=()=>{const a=parseFloat(i.value),o=parseFloat(i.min||0),l=parseFloat(i.max||1),d=parseFloat(i.step||.1)<1||a%1!==0;r.textContent=d?a.toFixed(1):a;const u=i.getBoundingClientRect(),h=16,m=10,g=l-o,_=g===0?0:(a-o)/g,f=u.width-h,p=_*f,E=u.left+p+h+m,M=u.top+u.height/2-r.offsetHeight/2;r.style.position="fixed",r.style.left=`${E-5}px`,r.style.top=`${M}px`,r.style.zIndex="99999999"};e.addEventListener("mouseenter",()=>{s(),r.style.opacity="1"}),e.addEventListener("mouseleave",()=>{r.style.opacity="0"}),i.addEventListener("input",s),s()};n.forEach(e=>{t(e)})});class ws{constructor(){this.validCount=0,this.invalidCount=0}validateNMEAChecksum(t){if(t=t.trim(),!t.startsWith("$")||!t.includes("*"))return!1;const e=t.split("*");if(e.length!==2)return!1;const i=e[0].substring(1),r=e[1],s=parseInt(r,16);if(isNaN(s))return!1;let a=0;for(let o=0;o<i.length;o++)a^=i.charCodeAt(o);return a===s}extractTalkerID(t){try{const e=t.trim();if(!e.startsWith("$"))return null;const i=e.indexOf(",");return i===-1?null:e.substring(1,i)}catch{return null}}sortNMEAData(t,e=null){const i={};this.validCount=0,this.invalidCount=0;for(const r of t)if(!(!r||r.trim().length===0))if(this.validateNMEAChecksum(r)){this.validCount++;const s=this.extractTalkerID(r);s?(i[s]||(i[s]=[],console.log(`Creating entry for valid talker ID: ${s}`)),i[s].push(r.trim())):this.invalidCount++}else this.invalidCount++;return console.log(`
--- Processing Summary ---`),console.log(`Valid sentences processed: ${this.validCount}`),console.log(`Invalid/disregarded lines: ${this.invalidCount}`),console.log("--------------------------"),{sortedData:i,validCount:this.validCount,invalidCount:this.invalidCount}}processFileContent(t,e=null){const i=t.split(`
`).map(r=>r.trim()).filter(r=>r.length>0);return this.sortNMEAData(i,e)}createDownloadableFiles(t,e){for(const[i,r]of Object.entries(t)){const s=`RTK_${i}_${e}.txt`,a=r.join(`
`)+`
`,o=new Blob([a],{type:"text/plain"}),l=URL.createObjectURL(o),c=document.createElement("a");c.href=l,c.download=s,c.click(),URL.revokeObjectURL(l),console.log(`Downloaded ${s} with ${r.length} sentences`)}}static validate(t){return new ws().validateNMEAChecksum(t)}static getTalkerID(t){return new ws().extractTalkerID(t)}}class jv{constructor(){this.coords=null,this.pollingRateMs=6e4,this.pollingInterval=null,this.fileHandle=null,this.writableStream=null,this.encoder=new TextEncoder,this.sampleCount=0,this.active=!1}async requestLocation(){return"geolocation"in navigator?new Promise(t=>{navigator.geolocation.getCurrentPosition(e=>{this.coords={latitude:parseFloat(e.coords.latitude.toFixed(6)),longitude:parseFloat(e.coords.longitude.toFixed(6))},console.log(`[WeatherRecorder] Location acquired: ${this.coords.latitude}, ${this.coords.longitude}`),t(!0)},e=>{console.warn("[WeatherRecorder] Location denied or unavailable:",e.message),t(!1)},{enableHighAccuracy:!1,timeout:1e4,maximumAge:3e5})}):(console.warn("[WeatherRecorder] Geolocation API not available."),!1)}async start(t,e){if(!this.coords)return console.log("[WeatherRecorder] No location available — weather recording skipped."),!1;const i=`weather_${e}.ndjson`;try{this.fileHandle=await t.getFileHandle(i,{create:!0}),this.writableStream=await this.fileHandle.createWritable(),console.log(`[WeatherRecorder] File created: ${i}`)}catch(r){return console.error("[WeatherRecorder] Failed to create weather file:",r),!1}return this.sampleCount=0,this.active=!0,await this._poll(),this.pollingInterval=setInterval(()=>this._poll(),this.pollingRateMs),console.log(`[WeatherRecorder] Polling started (every ${this.pollingRateMs/1e3} s).`),!0}async stop(){this.active=!1,this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null),this.writableStream&&(await this.writableStream.close(),this.writableStream=null,console.log(`[WeatherRecorder] Stopped. ${this.sampleCount} sample(s) written.`)),this.fileHandle=null}stopEmergency(){this.active=!1,this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null),this.writableStream&&(this.writableStream.close().catch(t=>console.error("[WeatherRecorder] pagehide close error:",t.message)),this.writableStream=null)}async _poll(){if(!this.active||!this.coords)return;const{latitude:t,longitude:e}=this.coords,i=`https://api.open-meteo.com/v1/forecast?latitude=${t}&longitude=${e}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;try{const r=await fetch(i,{signal:AbortSignal.timeout(1e4)});if(!r.ok)throw new Error(`HTTP ${r.status}: ${r.statusText}`);const s=await r.json();this.writableStream&&(await this.writableStream.write(this.encoder.encode(JSON.stringify(s)+`
`)),this.sampleCount++);const a=s.current;console.log(`[WeatherRecorder] ${a?.temperature_2m} °C  RH ${a?.relative_humidity_2m}%  Wind ${a?.wind_speed_10m} km/h`)}catch(r){console.warn("[WeatherRecorder] Poll failed:",r.message)}}}function Zv(n){let t=0,e=0;for(const i of n)t=t+i&255,e=e+t&255;return[t,e]}function Ud(n,t,e){const i=e.length,r=new Uint8Array(4+i);r[0]=n,r[1]=t,r[2]=i&255,r[3]=i>>8&255,r.set(e,4);const[s,a]=Zv(r),o=new Uint8Array(2+r.length+2);return o[0]=181,o[1]=98,o.set(r,2),o[2+r.length]=s,o[2+r.length+1]=a,o}function _o(n,t){const e=[new Uint8Array([0,n,0,0])];for(const[a,o,l]of t){const c=new Uint8Array(4);if(new DataView(c.buffer).setUint32(0,a,!0),e.push(c),o==="B")e.push(new Uint8Array([l&255]));else if(o==="I"||o==="U4"){const d=new Uint8Array(4);new DataView(d.buffer).setUint32(0,l>>>0,!0),e.push(d)}else if(o==="U2"){const d=new Uint8Array(2);new DataView(d.buffer).setUint16(0,l&65535,!0),e.push(d)}}const i=e.reduce((a,o)=>a+o.length,0),r=new Uint8Array(i);let s=0;for(const a of e)r.set(a,s),s+=a.length;return Ud(6,138,r)}const Nd=537067521,Jv=1073938448,Qv=1073938449,tx=276234241,ex=276234242,nx=276234244,ix=276299777,rx=276299778,sx=276299780,ax=807469057,ox=807469058,lx=546373785,Va=.02,Wa=60,cx=_o(3,[[Nd,"B",0]]);function dx(n,t){return _o(3,[[Nd,"B",1],[Jv,"U4",t],[Qv,"U4",Math.round(n*1e4)]])}function ux(){return _o(3,[[tx,"B",1],[ex,"B",1],[nx,"B",1],[ix,"B",1],[rx,"B",1],[sx,"B",1],[ax,"U2",1e3],[ox,"U2",1],[lx,"B",1]])}function hx(n){if(n.length<40)return null;const t=new DataView(n.buffer,n.byteOffset);return{dur:t.getUint32(8,!0),meanAcc:t.getUint32(28,!0)/1e4,obs:t.getUint32(32,!0),valid:n[36]!==0,active:n[37]!==0}}function fx(n){return n.length<8?null:n[5]}const px=["No fix","Dead reckoning","2D","3D","GNSS+DR","Time only"],mx=["None","Float","Fixed"];function Sc(n){if(n.length<24)return null;const t=n[20],i=n[21]>>6&3;return{fixType:t,fixLabel:px[t]??`Unknown(${t})`,carrSoln:i,carrLabel:mx[i]??`Unknown(${i})`}}function gx(n){let t=0;for(const e of n)t^=e.charCodeAt(0);return t.toString(16).toUpperCase().padStart(2,"0")}function _x(n=0,t=0){const e=new Date,i=String(e.getUTCHours()).padStart(2,"0"),r=String(e.getUTCMinutes()).padStart(2,"0"),s=String(e.getUTCSeconds()).padStart(2,"0"),a=`${i}${r}${s}.00`,o=Math.abs(n),l=Math.floor(o),c=((o-l)*60).toFixed(4).padStart(7,"0"),d=n>=0?"N":"S",u=Math.abs(t),h=Math.floor(u),m=((u-h)*60).toFixed(4).padStart(7,"0"),g=t>=0?"E":"W",_=`GPGGA,${a},${String(l).padStart(2,"0")}${c},${d},${String(h).padStart(3,"0")}${m},${g},1,08,1.0,0.0,M,0.0,M,,`;return`$${_}*${gx(_)}\r
`}function vx(n){if(!n.match(/^\$(GP|GN|GL)GGA,/))return null;const t=n.split(",");if(t.length<6)return null;const e=parseFloat(t[2]),i=t[3],r=parseFloat(t[4]),s=t[5];if(!parseInt(t[6])||isNaN(e)||isNaN(r))return null;const o=Math.floor(e/100),l=(o+(e-o*100)/60)*(i==="S"?-1:1),c=Math.floor(r/100),d=(c+(r-c*100)/60)*(s==="W"?-1:1);return{lat:l,lon:d}}class xx{constructor(t){this.host=t.host,this.port=t.port||2101,this.mountpoint=t.mountpoint,this.user=t.user||"",this.pass=t.pass||"",this.lat=t.lat??0,this.lon=t.lon??0,this.ggaInterval=(t.ggaInterval??300)*1e3,this._stopped=!1,this._controller=null,this._totalBytes=0}async start(t,e=()=>{}){for(this._stopped=!1,this._totalBytes=0;!this._stopped;){try{await this._streamOnce(t,e)}catch(i){if(this._stopped)break;e(`[NTRIP] Error: ${i.message} — reconnecting in 5 s…`),await this._delay(5e3);continue}this._stopped||e("[NTRIP] GGA refresh — reconnecting…")}e(`[NTRIP] Stopped. Total RTCM forwarded: ${this._totalBytes} B`)}stop(){this._stopped=!0,this._controller&&(this._controller.abort(),this._controller=null)}async _streamOnce(t,e){this._controller=new AbortController;const i=this._controller.signal,r=btoa(`${this.user}:${this.pass}`),s=_x(this.lat,this.lon),a=`http://${this.host}:${this.port}/${this.mountpoint}`;e(`[NTRIP] Connecting → ${a}`),e(`[NTRIP] GGA position: lat=${this.lat.toFixed(6)}, lon=${this.lon.toFixed(6)}`);const o=await fetch(a,{method:"GET",headers:{Authorization:`Basic ${r}`,"Ntrip-Version":"Ntrip/2.0","User-Agent":"NTRIP JSClient/1.0","Ntrip-GGA":s.trim(),Connection:"keep-alive"},signal:i});if(!o.ok)throw new Error(`HTTP ${o.status} ${o.statusText}`);e(`[NTRIP] Connected (${o.status}). GGA sent: ${s.trim()}`);const l=o.body.getReader();let c=0,d=!1;e(`[NTRIP] GGA refresh interval: ${this.ggaInterval/1e3}s`);const u=setTimeout(()=>{d=!0,l.cancel().catch(()=>{})},this.ggaInterval);try{for(;!this._stopped;){const{value:h,done:m}=await l.read();if(m){e(d?`[NTRIP] GGA refresh timer fired after ${this.ggaInterval/1e3}s — reconnecting with fresh GGA.`:"[NTRIP] Stream ended by caster.");break}if(h?.length){this._totalBytes+=h.length,c++;try{await t(h),(c<=5||c%10===0)&&e(`[NTRIP] RTCM chunk #${c}: ${h.length} B → serial (total ${this._totalBytes} B)`)}catch(g){e(`[NTRIP] Serial write failed: ${g.message}`)}}}}finally{clearTimeout(u),l.cancel().catch(()=>{})}this._totalBytes===0&&e("[NTRIP] WARNING: Connected but received 0 bytes. Check credentials, mountpoint, and that GGA position is valid (not 0,0).")}_delay(t){return new Promise(e=>setTimeout(e,t))}}function Sx(n=null){return new Promise(t=>{const e=n?.latitude??"",i=n?.longitude??"",r=document.createElement("div");r.id="ntrip-overlay",r.innerHTML=`
            <form id="ntrip-form" autocomplete="on">
                <div id="ntrip-dialog">
                    <h2>Survey-In Configuration</h2>

                    <div class="section-title">Parameters</div>

                    <div class="row">
                        <div>
                            <label>Min Duration <span class="inline-label">seconds</span></label>
                            <input id="ni-dur" type="number" min="1" step="1"
                                   value="${Wa}" placeholder="${Wa}">
                        </div>
                        <div>
                            <label>Target Accuracy <span class="inline-label">metres</span></label>
                            <input id="ni-acc" type="number" min="0.01" step="0.01"
                                   value="${Va}" placeholder="${Va}">
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
                                   value="${i}" placeholder="">
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
        `,document.body.appendChild(r);const s=()=>r.remove(),a=()=>{const o=parseFloat(document.getElementById("ni-acc").value),l=parseInt(document.getElementById("ni-dur").value);return!isFinite(o)||o<=0?(alert("Target accuracy must be a positive number (metres)."),null):!isFinite(l)||l<1?(alert("Minimum duration must be a positive integer (seconds)."),null):{targetAccuracyM:o,minDurS:l}};document.getElementById("ntrip-btn-cancel").addEventListener("click",()=>{s(),t(null)}),document.getElementById("ntrip-btn-skip").addEventListener("click",()=>{const o=a();o&&(s(),t({ntrip:null,...o}))}),document.getElementById("ntrip-form").addEventListener("submit",o=>{o.preventDefault();const l=a();if(!l)return;const c=document.getElementById("ni-host").value.trim(),d=parseInt(document.getElementById("ni-port").value)||2101,u=document.getElementById("ni-mount").value.trim(),h=document.getElementById("ni-user").value.trim(),m=document.getElementById("ni-pass").value,g=parseFloat(document.getElementById("ni-lat").value)||e||0,_=parseFloat(document.getElementById("ni-lon").value)||i||0;if(s(),!h&&!m){console.log("[NTRIP] No credentials entered — skipping NTRIP."),t({ntrip:null,...l});return}if(!c||!u){console.warn("[NTRIP] Host or mountpoint missing — skipping NTRIP."),t({ntrip:null,...l});return}g===0&&_===0&&console.warn("[NTRIP] GGA position is 0,0 — RTCM corrections may not be delivered by caster."),t({ntrip:{host:c,port:d,mountpoint:u,user:h,pass:m,lat:g,lon:_},...l})}),r.addEventListener("keydown",o=>{o.key==="Escape"&&document.getElementById("ntrip-btn-cancel").click()})})}class Mx{constructor(){this._aborted=!1,this._rxBuf=[],this._reader=null,this._readLoopPromise=null,this._ntrip=null,this._writer=null}async run(t,e,i,r,s,a=null,o=Va,l=Wa){this._aborted=!1,this._rxBuf=[];const c=dx(o,l),d=ux();try{if(await t.open({baudRate:e}),this._writer=t.writable.getWriter(),this._startReadLoop(t),await this._delay(500),console.log("[RTKSurvey] Step 0: Configuring USB protocols (RTCM3 in, 1 Hz nav)…"),await this._sendAndWaitAck(d,"CFG-VALSET PortConfig")||console.warn("[RTKSurvey] Port config NAK/timeout — receiver may already have correct settings."),await this._delay(300),a){if(!a.lat&&!a.lon){console.log("[RTKSurvey] No position in ntripConfig — sniffing NMEA for 5 s…");const I=await this._waitForNmeaFix(5e3);I?(a.lat=I.lat,a.lon=I.lon,console.log(`[RTKSurvey] NMEA fix: ${I.lat.toFixed(6)}, ${I.lon.toFixed(6)}`)):console.warn("[RTKSurvey] No NMEA fix — NTRIP GGA will be 0,0. Corrections unlikely.")}console.log("[RTKSurvey] Starting NTRIP client…"),this._ntrip=new xx(a);const E=I=>this._writer.write(I);this._ntrip.start(E,I=>console.log(I)).catch(I=>console.warn("[NTRIP] Background error:",I)),console.log("[RTKSurvey] Waiting for RTK Float/Fixed before starting survey-in…");const M=Date.now()+9e4;let w=!1;for(;Date.now()<M&&!this._aborted;){await this._delay(2e3);const I=await this._pollUbx(1,7,2e3);if(I){const T=Sc(I);if(T&&(console.log(`[RTKSurvey] Fix: ${T.fixLabel}, carrier: ${T.carrLabel}`),T.carrSoln>=1)){console.log(`[RTKSurvey] RTK ${T.carrLabel} achieved — proceeding to survey-in.`),w=!0;break}}}!w&&!this._aborted&&console.warn("[RTKSurvey] ⚠ Timed out waiting for RTK convergence. Starting survey-in anyway, but accuracy will converge slowly. Check: (1) RTCM3 input enabled on USB, (2) NTRIP credentials/mountpoint, (3) antenna has clear sky view.")}if(console.log("[RTKSurvey] Step 1: Disabling TMODE…"),!await this._sendAndWaitAck(cx,"CFG-VALSET Disable"))throw new Error("NAK or timeout on TMODE disable");if(await this._delay(500),this._aborted){await this._cleanup(t);return}if(console.log(`[RTKSurvey] Step 2: Starting Survey-In (acc ≤ ${o}m, dur ≥ ${l}s)…`),!await this._sendAndWaitAck(c,"CFG-VALSET Survey-In"))throw new Error("NAK or timeout on Survey-In command");console.log("[RTKSurvey] Step 3: Monitoring NAV-SVIN…"),await this._delay(2500);let g=0,_=0,f="?",p=!1;for(;!this._aborted;){const E=await this._pollUbx(1,53,500);if(E!==null){const w=fx(E);w!==null&&(g=w)}if(a){const w=await this._pollUbx(1,7,500);if(w){const I=Sc(w);if(I){f=I.carrLabel;const T=Date.now();T-_>1e4&&(console.log(`[RTKSurvey] Fix: ${I.fixLabel}, carrier: ${I.carrLabel}`),_=T)}}}const M=await this._pollUbx(1,59,2e3);if(M){const w=hx(M);if(w){a&&!p&&w.dur>30&&f==="None"&&(console.warn('[RTKSurvey] ⚠ NTRIP has been streaming for >30 s but carrier solution is still "None". RTCM corrections may not be reaching the receiver. Check that RTCM3 input is enabled on USB.'),p=!0);const I=a?` | Carr: ${f}`:"";if(console.log(`[RTKSurvey] Dur: ${w.dur}s | Obs: ${w.obs} | SVs: ${g} | Acc: ${w.meanAcc.toFixed(4)}m (Target: ${o}m)${I} | Active: ${w.active} | Valid: ${w.valid}`),i&&i({...w,numSvs:g,carrLabel:f}),w.valid){console.log(`[RTKSurvey] Survey-in complete! Final Accuracy: ${w.meanAcc.toFixed(4)}m`),this._stopNtrip(),await this._cleanup(t),r&&r({...w,numSvs:g});return}}}await this._delay(1e3)}this._stopNtrip(),await this._cleanup(t)}catch(u){console.error("[RTKSurvey] Fatal error:",u),this._stopNtrip(),await this._cleanup(t).catch(()=>{}),s&&s(u)}}abort(){console.log("[RTKSurvey] Abort requested."),this._aborted=!0,this._stopNtrip()}_stopNtrip(){this._ntrip&&(this._ntrip.stop(),this._ntrip=null,console.log("[RTKSurvey] NTRIP client stopped."))}async _waitForNmeaFix(t){const e=Date.now()+t;let i="";for(;Date.now()<e;){if(this._rxBuf.length>0){const r=this._rxBuf.splice(0);i+=new TextDecoder().decode(new Uint8Array(r));const s=i.split(`
`);i=s.pop();for(const a of s){const o=vx(a.trim());if(o)return o}}await this._delay(100)}return null}_startReadLoop(t){this._rxBuf=[];const e=t.readable.getReader();this._reader=e,this._readLoopPromise=(async()=>{try{for(;;){const{value:i,done:r}=await e.read();if(r)break;if(i)for(const s of i)this._rxBuf.push(s)}}catch{}finally{e.releaseLock()}})()}async _stopReadLoop(){if(this._reader){try{await this._reader.cancel()}catch{}this._reader=null}this._readLoopPromise&&(await this._readLoopPromise,this._readLoopPromise=null)}async _cleanup(t){if(await this._stopReadLoop(),this._writer){try{this._writer.releaseLock()}catch{}this._writer=null}try{await t.close()}catch{}}async _writeFrame(t){await this._writer.write(t)}async _sendAndWaitAck(t,e){const i=[181,98,5,1],r=[181,98,5,0],s=this._rxBuf.length;await this._writeFrame(t),console.log(`[RTKSurvey] Sent ${e}, waiting for ACK…`);const a=Date.now();for(;Date.now()-a<5e3;){const o=this._rxBuf.slice(s);if(this._findSeq(o,i)!==-1)return console.log(`[RTKSurvey] ACK ✓ ${e}`),!0;if(this._findSeq(o,r)!==-1)return console.warn(`[RTKSurvey] NAK ✗ ${e}`),!1;await this._delay(50)}return console.warn(`[RTKSurvey] Timeout waiting for ACK: ${e}`),!1}async _pollUbx(t,e,i){const r=[181,98,t,e],s=this._rxBuf.length;await this._writeFrame(Ud(t,e,new Uint8Array(0)));const a=Date.now();for(;Date.now()-a<i;){const o=this._rxBuf.slice(s),l=this._findSeq(o,r);if(l!==-1&&o.length>=l+6){const c=o[l+4]|o[l+5]<<8,d=l+6+c+2;if(o.length>=d)return new Uint8Array(o.slice(l+6,l+6+c))}await this._delay(50)}return null}_findSeq(t,e){t:for(let i=0;i<=t.length-e.length;i++){for(let r=0;r<e.length;r++)if(t[i+r]!==e[r])continue t;return i}return-1}_delay(t){return new Promise(e=>setTimeout(e,t))}}const yx={"5446:425":"u-blox GNSS (COM 5446:425)","1027:24597":"Rover Receiver (COM 1027:24597)"};class Ex{constructor(){this.startButton=document.getElementById("start-button"),this.startButtonLabel=document.getElementById("start-button-label"),this.statusMessage=document.getElementById("status-message"),this.baudRateSelect=document.getElementById("baud-rate"),this.selectPortButton=document.getElementById("select-port-button"),this.surveyButton=document.getElementById("survey-button"),this.urlInput=document.getElementById("url-input"),this.portNameSpan=document.getElementById("port-name"),this.portRateSpan=document.getElementById("port-rate"),this.urlPacketsSpan=document.getElementById("url-packets"),this.weatherRecorder=new jv,this.weatherRecorder.requestLocation(),this.urlInput.addEventListener("keydown",t=>t.stopPropagation()),this.urlInput.addEventListener("keyup",t=>t.stopPropagation()),this.urlInput.addEventListener("keypress",t=>t.stopPropagation()),this.port=null,this.reader=null,this.urlPollingInterval=null,this.urlPollingRateMs=2e3,this.trafficData=[],this.trafficFileHandle=null,this.trafficWritableStream=null,this.urlActive=!1,this.isRecording=!1,this.outputDirHandle=null,this.sessionDirHandle=null,this.currentSubDirHandle=null,this.currentTimestamp=null,this.fileHandle=null,this.writableStream=null,this.bytesReceived=0,this.lastTime=0,this.rateInterval=null,this.totalBytesWritten=0,this.capturedData=[],this._survey=null,this._isSurveying=!1,"serial"in navigator?navigator.serial.addEventListener("disconnect",t=>{this.port&&t.target===this.port&&(console.log("Active COM port physically disconnected."),this.port=null,this.portNameSpan&&(this.portNameSpan.textContent="Select Port"),this.surveyButton.disabled=!0,this._isSurveying&&this._abortSurvey(),this.isRecording&&this.endRecording())}):this.handleUnsupportedBrowser(),this.initEventListeners()}initEventListeners(){this.startButton.addEventListener("click",()=>{this.isRecording?this.endRecording():this.startRecording()}),this.selectPortButton.addEventListener("click",()=>this.selectPort()),this.surveyButton.addEventListener("click",()=>this._onSurveyClick()),window.addEventListener("beforeunload",t=>this.handleBeforeUnload(t)),window.addEventListener("pagehide",()=>this.handlePageHide())}handleUnsupportedBrowser(){console.warn("Web Serial API not supported."),this.selectPortButton.disabled=!0,this.portNameSpan&&(this.portNameSpan.textContent="Not Supported"),this.surveyButton.disabled=!0}async validateUrl(){const t=this.urlInput.value.trim();if(!t)return!1;try{const e=await sc(t);if(!e.ok)throw new Error(`HTTP ${e.status}: ${e.statusText}`);return await e.json(),!0}catch(e){const i=e?.message??(typeof e=="string"?e:JSON.stringify(e));return console.error("URL validation failed:",e),alert(`URL endpoint unreachable:
${i}`),!1}}async pollUrl(){const t=this.urlInput.value.trim();try{const e=await sc(t);if(!e.ok)return;const i=await e.json(),r={receivedAt:new Date().toISOString(),data:i};if(this.trafficData.push(r),this.trafficWritableStream){const s=new TextEncoder().encode(JSON.stringify(r)+`
`);this.totalBytesWritten+=s.length,await this.trafficWritableStream.write(s)}}catch(e){console.warn("URL poll error:",e.message)}}startUrlPolling(){this.urlActive&&(this.pollUrl(),this.urlPollingInterval=setInterval(()=>this.pollUrl(),this.urlPollingRateMs),console.log(`URL polling started (every ${this.urlPollingRateMs}ms).`))}stopUrlPolling(){this.urlPollingInterval&&(clearInterval(this.urlPollingInterval),this.urlPollingInterval=null,console.log("URL polling stopped."))}async selectPort(){try{this.port=await navigator.serial.requestPort();const t=this.port.getInfo();let e="Unknown COM Port";if(t.usbProductId){const i=`${t.usbVendorId||""}:${t.usbProductId}`;e=yx[i]||`COM ${i}`}this.portNameSpan&&(this.portNameSpan.textContent=e),this.surveyButton.disabled=!1,console.log(`Port selected: ${e}`)}catch(t){t.name!=="AbortError"&&(console.error("Error selecting port:",t),alert(`Error selecting port: ${t.message}`))}}async _onSurveyClick(){if(this._isSurveying){this._abortSurvey();return}if(!this.port||this.isRecording)return;const t=await Sx(this.weatherRecorder.coords);if(t===null){console.log("[readcom] Survey cancelled by user.");return}const{ntrip:e,targetAccuracyM:i,minDurS:r}=t;e?console.log("[readcom] NTRIP enabled:",e.host,e.mountpoint):console.log("[readcom] NTRIP skipped — survey-only mode."),console.log(`[readcom] Survey params: acc ≤ ${i}m, dur ≥ ${r}s`),this._isSurveying=!0,this._survey=new Mx,this._setSurveyUI(!0),this.statusMessage.textContent=e?"Survey-In + NTRIP running…":"Survey-In running…";const s=parseInt(this.baudRateSelect.value);await this._survey.run(this.port,s,({dur:a,obs:o,meanAcc:l,valid:c,numSvs:d})=>{const u=e?"[NTRIP] ":"";this.statusMessage.textContent=`${u}SVs ${d} | 3Dσ: ${l.toFixed(3)}m | ${a}s`},a=>{console.log(`[RTKSurvey] Done — Accuracy: ${a.meanAcc.toFixed(4)}m`),this.statusMessage.textContent=`[RTKSurvey] Done - Acc: ${a.meanAcc.toFixed(4)}m`,this._finishSurvey()},a=>{alert(`Survey-In failed: ${a.message}`),this.statusMessage.textContent="Survey failed",this._finishSurvey()},e,i,r)}_abortSurvey(){this._survey&&this._survey.abort(),this.statusMessage.textContent="Survey aborted",this._finishSurvey()}_finishSurvey(){this._isSurveying=!1,this._survey=null,this._setSurveyUI(!1)}_setSurveyUI(t){this.surveyButton.classList.toggle("survey-active",t),this.surveyButton.title=t?"Abort Survey-In":"RTK BASE Survey-In",this.startButton.disabled=t,this.baudRateSelect.disabled=t,this.selectPortButton.disabled=t,this.urlInput.disabled=t,this.urlInput.style.cursor=t?"not-allowed":""}async startRecording(){if(this.isRecording||this._isSurveying)return;const t=!!this.port,e=!!this.urlInput.value.trim();if(!t&&!e){alert("Please select a serial port and/or enter a URL endpoint before recording.");return}let i=!1;if(e){if(this.statusMessage.textContent="Validating URL...",i=await this.validateUrl(),!i&&!t){this.statusMessage.textContent="Disconnected";return}!i&&t&&console.warn("URL validation failed — continuing with serial only.")}if(this.urlActive=i,!t&&"serial"in navigator&&!this.urlActive&&(await this.selectPort(),!this.port)){this.statusMessage.textContent="Disconnected";return}if(!this.outputDirHandle)try{this.outputDirHandle=await window.showDirectoryPicker({id:"rtk-nmea-recordings",mode:"readwrite",startIn:"documents"}),console.log("Output directory selected.")}catch(a){if(a.name==="AbortError"){this.statusMessage.textContent="Disconnected";return}console.error("Error selecting output directory:",a),alert(`Error selecting output directory: ${a.message}`);return}const r=new Date().toISOString().replace("T","_").replace(/\..+Z$/,"").replace(/[:]/g,"-");this.currentTimestamp=r;const s=`ARCView_${r}`;try{this.sessionDirHandle=await this.outputDirHandle.getDirectoryHandle(s,{create:!0}),console.log(`Session directory created: ${s}`)}catch(a){console.error("Error creating session directory:",a),alert(`Failed to create session folder "${s}": ${a.message}`);return}if(this.port){const a=`NMEAmsgs_${this.currentTimestamp}`;try{this.currentSubDirHandle=await this.sessionDirHandle.getDirectoryHandle(a,{create:!0})}catch(o){console.error("Error creating NMEA sub-directory:",o),alert(`Failed to create folder "${a}": ${o.message}`);return}try{this.fileHandle=await this.currentSubDirHandle.getFileHandle(`RTKx_${r}.txt`,{create:!0}),this.writableStream=await this.fileHandle.createWritable()}catch(o){console.error("Error creating recording file:",o),alert(`File creation failed: ${o.message}`),this.currentSubDirHandle=null;return}}if(this.urlActive)try{this.trafficFileHandle=await this.sessionDirHandle.getFileHandle(`pingStation_${this.currentTimestamp}.ndjson`,{create:!0}),this.trafficWritableStream=await this.trafficFileHandle.createWritable()}catch(a){if(console.error("Error creating traffic file:",a),alert(`Traffic file creation failed: ${a.message}`),!this.port)return;this.urlActive=!1}if(this.totalBytesWritten=0,this.bytesReceived=0,this.trafficData=[],this.capturedData=[],this.port)try{await this.port.open({baudRate:parseInt(this.baudRateSelect.value)})}catch(a){console.error(`Serial open error: ${a.message}`),this.port=null,this.portNameSpan&&(this.portNameSpan.textContent="Select Port"),this.surveyButton.disabled=!0,this.writableStream&&await this.writableStream.close(),this.trafficWritableStream&&await this.trafficWritableStream.close(),this.resetFileState(),this.resetUIToIdle(),alert("Could not open the COM port. It may be disconnected or in use by another application.");return}this.isRecording=!0,console.log("Recording started."),this.startButton.classList.add("recording"),this.startButtonLabel&&(this.startButtonLabel.textContent="Recording..."),this.baudRateSelect.disabled=!0,this.selectPortButton.disabled=!0,this.surveyButton.disabled=!0,this.urlInput.disabled=!0,this.urlInput.style.cursor="not-allowed",this.lastTime=performance.now(),this.rateInterval=setInterval(()=>this.updateRateDisplay(),1e3),this.port&&this.readAndWriteLoop(),this.startUrlPolling()}async endRecording(){if(!this.isRecording)return;if(clearInterval(this.rateInterval),this.rateInterval=null,this.stopUrlPolling(),this.reader)try{await this.reader.cancel()}catch(e){console.error("Error cancelling reader:",e)}if(this.writableStream&&await this.writableStream.close(),this.trafficWritableStream&&await this.trafficWritableStream.close(),this.port)try{await this.port.close()}catch(e){console.error("Error closing port:",e)}const t=this.currentSubDirHandle?.name??"(none)";if(console.log(`Recording stopped. NMEA dir: ${t}`),this.statusMessage.textContent=`Final size: ${this.formatFileSize(this.totalBytesWritten)}`,this.capturedData.length>0&&this.currentSubDirHandle){this.statusMessage.textContent="Post-processing...";try{await this.postProcessNMEA()}catch(e){console.error("Post-processing error:",e),alert(`Post-processing failed: ${e.message}`)}}this.reader=null,this.isRecording=!1,this.urlActive=!1,this.resetFileState(),this.capturedData=[],this.trafficData=[],this.totalBytesWritten=0,this.statusMessage.textContent="Ready",this.resetUIToIdle()}resetFileState(){this.fileHandle=null,this.writableStream=null,this.sessionDirHandle=null,this.currentSubDirHandle=null,this.trafficFileHandle=null,this.trafficWritableStream=null}resetUIToIdle(){this.startButton.classList.remove("recording"),this.startButtonLabel&&(this.startButtonLabel.textContent="Record"),this.startButton.disabled=!1,this.baudRateSelect.disabled=!1,"serial"in navigator&&(this.selectPortButton.disabled=!1,this.surveyButton.disabled=!this.port),this.urlInput.disabled=!1,this.urlInput.style.cursor="",this.portRateSpan&&(this.portRateSpan.textContent=""),this.urlPacketsSpan&&(this.urlPacketsSpan.textContent="")}async readAndWriteLoop(){if(!this.port?.readable||!this.writableStream)return;this.reader=this.port.readable.getReader();const t=new TextDecoder;try{for(;;){const{value:e,done:i}=await this.reader.read();if(i)break;e&&(this.bytesReceived+=e.length,this.totalBytesWritten+=e.length,await this.writableStream.write(e),this.capturedData.push(t.decode(e,{stream:!0})))}}catch(e){e.name!=="NetworkError"&&e.name!=="AbortError"?console.error(`Read Error: ${e.message}`):console.log("Read loop cancelled.")}finally{this.reader.releaseLock()}}async postProcessNMEA(){const t=this.capturedData.join("").split(`
`).map(r=>r.trim()).filter(r=>r.length);console.log(`Processing ${t.length} lines...`);const i=new ws().sortNMEAData(t,this.currentTimestamp);Object.keys(i.sortedData).length>0?(await this.saveSortedFiles(i.sortedData),this.statusMessage.textContent=`Done! ${i.validCount} valid, ${i.invalidCount} invalid`):this.statusMessage.textContent="No valid NMEA sentences found"}async saveSortedFiles(t){try{let e=await this.outputDirHandle.queryPermission({mode:"readwrite"});if(e!=="granted"&&(e=await this.outputDirHandle.requestPermission({mode:"readwrite"})),e!=="granted")throw new Error("Permission denied to write post-processed files.");if(!this.currentSubDirHandle)throw new Error("Current sub-directory handle is missing.");for(const[i,r]of Object.entries(t)){const a=await(await this.currentSubDirHandle.getFileHandle(`${i}_${this.currentTimestamp}.txt`,{create:!0})).createWritable();await a.write(r.join(`
`)+`
`),await a.close()}}catch(e){console.error("Error saving sorted files:",e),alert(`Error saving sorted files: ${e.message}`)}}updateRateDisplay(){if(!this.rateInterval)return;const t=performance.now(),e=(t-this.lastTime)/1e3;e>0&&(this.portRateSpan&&(this.portRateSpan.textContent=this.formatBytesPerSecond(this.bytesReceived/e)),this.urlActive&&this.urlPacketsSpan&&(this.urlPacketsSpan.textContent=`${this.trafficData.length} pkts`),this.statusMessage.textContent=this.formatFileSize(this.totalBytesWritten)),this.lastTime=t,this.bytesReceived=0}formatBytesPerSecond(t){if(t<1024)return`${t.toFixed(0)} B/s`;const e=t/1024;return e<1024?`${e.toFixed(2)} KB/s`:`${(e/1024).toFixed(2)} MB/s`}formatFileSize(t){if(t<1024)return`${t.toFixed(0)} B`;const e=t/1024;if(e<1024)return`${e.toFixed(2)} KB`;const i=e/1024;return i<1024?`${i.toFixed(2)} MB`:`${(i/1024).toFixed(2)} GB`}handleBeforeUnload(t){if(this.isRecording||this._isSurveying)return t.preventDefault(),t.returnValue="Operation in progress. Are you sure you want to leave?",t.returnValue}handlePageHide(){this._isSurveying&&this._survey?.abort(),this.isRecording&&(clearInterval(this.rateInterval),this.rateInterval=null,this.stopUrlPolling(),this.reader?.cancel().catch(()=>{}),this.reader=null,this.writableStream?.close().catch(()=>{}),this.writableStream=null,this.trafficWritableStream?.close().catch(()=>{}),this.trafficWritableStream=null,this.port?.close().catch(()=>{}),this.port=null,this.isRecording=!1)}}document.addEventListener("DOMContentLoaded",()=>new Ex);const wx={invincible:{head:"#ffe753",tail:"#4c9cbf",line:"#3a3b3d",showLines:!0},neon:{head:"#00FFFF",tail:"#FF00FF",line:"#00FF00",showLines:!0},elevation:{showLines:!0,isElevationBased:!0},classify:{showLines:!0,isClassifyBased:!0}},On={head:document.getElementById("trail-head-color").value,tail:document.getElementById("trail-tail-color").value,line:document.getElementById("trail-line-color").value,showLines:document.getElementById("show-lines-toggle").checked};function Mc(n){document.getElementById("trail-head-color").value=n.head,document.getElementById("trail-tail-color").value=n.tail,document.getElementById("trail-line-color").value=n.line,document.getElementById("show-lines-toggle").checked=n.showLines,ao()}function Tx(n){const t=wx[n];t&&(t.isElevationBased?u0()||(console.warn("Elevation mode failed, falling back to preset colors."),Mc(t)):t.isClassifyBased?o0():Mc(t))}document.getElementById("trail-preset").addEventListener("change",function(){const n=this.value;n?Tx(n):(document.getElementById("trail-head-color").value=On.head,document.getElementById("trail-tail-color").value=On.tail,document.getElementById("trail-line-color").value=On.line,document.getElementById("show-lines-toggle").checked=On.showLines,ao())});["trail-head-color","trail-tail-color","trail-line-color"].forEach(n=>{document.getElementById(n).addEventListener("input",function(){document.getElementById("trail-preset").value="",On.head=document.getElementById("trail-head-color").value,On.tail=document.getElementById("trail-tail-color").value,On.line=document.getElementById("trail-line-color").value,ao()})});document.getElementById("show-lines-toggle").addEventListener("change",function(){On.showLines=this.checked});console.log("Trail controls with centralized refresh logic initialized");
