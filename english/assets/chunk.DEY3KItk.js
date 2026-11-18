import{s as Yt,p as xt,b as Jt,r as J,m as Z,c as yt,t as Qt,n as Zt,d as Rt,e as to,f as oo,g as W,h as Q}from"./chunk.CUX1dNzZ.js";const C=Math.PI*2,Pt=v=>Math.min(1,Math.max(0,v));function eo(v,r,n,h){return h*(.018*Math.sin(v*37+r*11)*Math.sin(r*41+n*13)*Math.sin(n*29+v*17)+.012*Math.sin(v*4+n*3))}function _t(v,r,n,h){const i=(1+Math.sqrt(5))/2,t=[[-1,i,0],[1,i,0],[-1,-i,0],[1,-i,0],[0,-1,i],[0,1,i],[0,-1,-i],[0,1,-i],[i,0,-1],[i,0,1],[-i,0,-1],[-i,0,1]],p=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],T=(u,M,E)=>[u[0]+(M[0]-u[0])*E,u[1]+(M[1]-u[1])*E,u[2]+(M[2]-u[2])*E],e=[],o=n+1;for(let u=0;u<p.length;u+=3){const M=t[p[u]],E=t[p[u+1]],k=t[p[u+2]],P=[];for(let g=0;g<=o;g++){P[g]=[];const U=T(M,k,g/o),R=T(E,k,g/o),N=o-g;for(let w=0;w<=N;w++)P[g][w]=w===0&&g===o?U:T(U,R,w/N)}for(let g=0;g<o;g++)for(let U=0;U<2*(o-g)-1;U++){const R=Math.floor(U/2);e.push(U%2===0?[P[g][R+1],P[g+1][R],P[g][R]]:[P[g][R+1],P[g+1][R+1],P[g+1][R]])}}const c=u=>{const M=Math.hypot(u[0],u[1],u[2])||1;return[u[0]/M,u[1]/M,u[2]/M]},l=r/.5,f=u=>Math.atan2(u[2],-u[0]),a=[],x=[],b=[],$=[],L=[];for(const u of e){const M=u.map(c),E=M.map(m=>{const A=r+eo(m[0],m[1],m[2],h)*l;return[m[0]*A,m[1]*A,m[2]*A]}),k=f([M[0][0]+M[1][0]+M[2][0],M[0][1]+M[1][1]+M[2][1],M[0][2]+M[1][2]+M[2][2]]),P=M.map(m=>Math.abs(m[0])<1e-9&&Math.abs(m[2])<1e-9?k/C+.5:f(m)/C+.5),g=Math.max(...P),U=Math.min(...P);if(g>.9&&U<.1)for(let m=0;m<3;m++)P[m]<.2&&(P[m]+=1);const R=[E[1][0]-E[0][0],E[1][1]-E[0][1],E[1][2]-E[0][2]],N=[E[2][0]-E[0][0],E[2][1]-E[0][1],E[2][2]-E[0][2]],w=c([R[1]*N[2]-R[2]*N[1],R[2]*N[0]-R[0]*N[2],R[0]*N[1]-R[1]*N[0]]);for(let m=0;m<3;m++){const A=M[m],z=Math.atan2(-A[1],Math.hypot(A[0],A[2])),X=f(A),B=Math.acos(Math.max(-1,Math.min(1,A[1])));a.push(E[m][0],E[m][1],E[m][2]),x.push(w[0],w[1],w[2]),b.push(P[m],z/Math.PI+.5),$.push(Math.sin(X),0,Math.cos(X)),L.push(-Math.cos(X)*Math.cos(B),-Math.sin(B),Math.sin(X)*Math.cos(B))}}return Z(v,{position:[new Float32Array(a),3],normal:[new Float32Array(x),3],uv:[new Float32Array(b),2],aTan:[new Float32Array($),3],aBit:[new Float32Array(L),3]})}function no(v,r,n,h,i){const t=[],p=[],T=[],e=(n-r)/h;for(let o=0;o<=i;o++){const c=o/i*C,l=Math.cos(c),f=Math.sin(c),a=Math.hypot(1,e);t.push(l*r,h/2,f*r,l*n,-h/2,f*n),p.push(l/a,e/a,f/a,l/a,e/a,f/a)}for(let o=0;o<i;o++){const c=o*2;T.push(c,c+1,c+2,c+1,c+3,c+2)}for(const[o,c,l]of[[h/2,r,1],[-h/2,n,-1]]){const f=t.length/3;t.push(0,o,0),p.push(0,l,0);for(let a=0;a<=i;a++){const x=a/i*C;t.push(Math.cos(x)*c,o,Math.sin(x)*c),p.push(0,l,0)}for(let a=0;a<i;a++)T.push(f,f+1+a+(l>0?1:0),f+1+a+(l>0?0:1))}return Z(v,{position:[new Float32Array(t),3],normal:[new Float32Array(p),3]},new Uint16Array(T))}function ao(v,r,n,h,i){const t=[],p=[],T=[];for(let e=0;e<=h;e++)for(let o=0;o<=i;o++){const c=o/i*C,l=e/h*C,f=Math.cos(c),a=Math.sin(c);t.push((r+n*Math.cos(l))*f,n*Math.sin(l),(r+n*Math.cos(l))*a),p.push(Math.cos(l)*f,Math.sin(l),Math.cos(l)*a)}for(let e=1;e<=h;e++)for(let o=1;o<=i;o++){const c=(i+1)*e+o-1,l=(i+1)*(e-1)+o-1,f=(i+1)*(e-1)+o,a=(i+1)*e+o;T.push(c,l,a,l,f,a)}return Z(v,{position:[new Float32Array(t),3],normal:[new Float32Array(p),3]},new Uint16Array(T))}function so(v,r,n,h){const i=document.createElement("canvas");i.width=i.height=v;const t=i.getContext("2d");t.fillStyle=r,t.fillRect(0,0,v,v);const p=v*v/90;for(let T=0;T<p;T++){const e=h()*v,o=h()*v,c=v/110*(.6+h()*.8),l=42+h()*22,f=n-5+h()*10,a=t.createRadialGradient(e-c*.3,o-c*.3,c*.1,e,o,c);a.addColorStop(0,`hsl(${f+6},95%,${l+18}%)`),a.addColorStop(.7,`hsl(${f},90%,${l}%)`),a.addColorStop(1,`hsl(${f-6},85%,${l-18}%)`),t.fillStyle=a,t.beginPath(),t.arc(e,o,c,0,C),t.fill()}return i}const wt=3;function io(v,r,n){const h=v.getContext("2d").getImageData(0,0,r,r).data,i=document.createElement("canvas");i.width=i.height=r;const t=i.getContext("2d"),p=t.createImageData(r,r),T=(e,o)=>h[((o+r)%r*r+(e+r)%r)*4]/255;for(let e=0;e<r;e++)for(let o=0;o<r;o++){const c=n*wt*((T(o+1,e)-T(o-1,e))/2),l=n*wt*((T(o,e+1)-T(o,e-1))/2),f=Math.hypot(c,l,1),a=(e*r+o)*4;p.data[a]=Math.round((-c/f*.5+.5)*255),p.data[a+1]=Math.round((-l/f*.5+.5)*255),p.data[a+2]=Math.round((1/f*.5+.5)*255),p.data[a+3]=255}return t.putImageData(p,0,0),i}const bt=`
vec3 toLin(vec3 c){return mix(c/12.92,pow((c+.055)/1.055,vec3(2.4)),step(.04045,c));}
vec3 toSrgb(vec3 c){return mix(c*12.92,1.055*pow(c,vec3(1./2.4))-.055,step(.0031308,c));}
vec3 aces(vec3 c){
  mat3 inM=mat3(vec3(.59719,.076,.0284),vec3(.35458,.90834,.13383),vec3(.04823,.01566,.83777));
  mat3 outM=mat3(vec3(1.60475,-.10208,-.00327),vec3(-.53108,1.10813,-.07276),vec3(-.07367,-.00605,1.07602));
  c=inM*c;
  vec3 a=c*(c+.0245786)-.000090537;
  vec3 b=c*(.983729*c+.432951)+.238081;
  c=outM*(a/b);
  return clamp(c,0.,1.);
}`,uo=`attribute vec3 position;attribute vec3 normal;attribute vec2 uv;attribute vec3 aTan;attribute vec3 aBit;
uniform mat4 uM,uV,uP;uniform mat3 uNM;
varying vec3 vW,vN,vT,vB;varying vec2 vUv;
void main(){vec4 w=uM*vec4(position,1.);vW=w.xyz;vN=uNM*normal;vT=uNM*aTan;vB=uNM*aBit;vUv=uv;gl_Position=uP*uV*w;}`,ro=`${bt}
uniform sampler2D uTex,uNrm;uniform float uUseTex,uMetal,uRough,uExp;
uniform vec3 uEye,uAlbedo,uEmissive,uSky,uGround,uKeyDir,uKeyC,uRimP,uRimC,uFillP,uFillC;uniform float uRimR,uFillR;
varying vec3 vW,vN,vT,vB;varying vec2 vUv;
const float PI=3.14159265;
float dGGX(float a,float nh){float a2=a*a;float d=nh*nh*(a2-1.)+1.;return a2/(PI*d*d);}
float vGGX(float a,float nl,float nv){float a2=a*a;float gv=nl*sqrt(a2+(1.-a2)*nv*nv);float gl=nv*sqrt(a2+(1.-a2)*nl*nl);return .5/max(gv+gl,1e-6);}
vec3 light(vec3 L,vec3 col,vec3 N,vec3 V,vec3 diff,vec3 f0,float a){
  float nl=clamp(dot(N,L),0.,1.);if(nl<=0.)return vec3(0.);
  vec3 H=normalize(L+V);float nv=clamp(dot(N,V),0.,1.),nh=clamp(dot(N,H),0.,1.),vh=clamp(dot(V,H),0.,1.);
  float fr=exp2((-5.55473*vh-6.98316)*vh);vec3 F=f0*(1.-fr)+fr;
  vec3 spec=F*(vGGX(a,nl,nv)*dGGX(a,nh));
  return nl*col*(diff/PI+spec);
}
vec3 point(vec3 P,float range,vec3 col,vec3 N,vec3 V,vec3 diff,vec3 f0,float a){
  vec3 d=P-vW;float dist=length(d);
  float att=1./max(dist*dist,.01);float w=clamp(1.-pow(dist/range,4.),0.,1.);att*=w*w;
  return light(d/dist,col*att,N,V,diff,f0,a);
}
void main(){
  vec3 N=normalize(vN);
  vec3 V=normalize(uEye-vW);
  vec3 albedo=uAlbedo;
  if(uUseTex>.5){
    albedo=toLin(texture2D(uTex,vUv).rgb);
    vec3 nt=texture2D(uNrm,vUv).xyz*2.-1.;
    N=normalize(normalize(vT)*nt.x+normalize(vB)*nt.y+N*nt.z);
  }
  if(dot(N,V)<0.)N=-N;
  vec3 diff=albedo*(1.-uMetal);
  vec3 f0=mix(vec3(.04),albedo,uMetal);
  float a=max(uRough,.0525);a=a*a;
  vec3 c=uEmissive;
  c+=mix(uGround,uSky,.5*N.y+.5)*diff/PI;
  c+=light(normalize(uKeyDir),uKeyC,N,V,diff,f0,a);
  c+=point(uRimP,uRimR,uRimC,N,V,diff,f0,a);
  c+=point(uFillP,uFillR,uFillC,N,V,diff,f0,a);
  c=aces(c*uExp/.6);
  gl_FragColor=vec4(toSrgb(c),1.);
}`,co=`attribute vec3 p0;attribute float seed;
uniform mat4 uV,uP;uniform float uT,uBottom,uSpan,uRise0,uRise1,uSize,uRot;
void main(){
  float y=uBottom+mod(p0.y-uBottom+(uRise0+seed*uRise1)*60.*uT,uSpan);
  float c=cos(uRot),s=sin(uRot);
  vec3 p=vec3(c*p0.x+s*p0.z,y,-s*p0.x+c*p0.z);
  vec4 mv=uV*vec4(p,1.);
  gl_Position=uP*mv;
  gl_PointSize=uSize/max(-mv.z,.01);
}`,lo=`${bt}
uniform vec3 uCore,uMid,uEdge;uniform float uOpacity,uExp;
void main(){
  float d=length(gl_PointCoord-.5)*2.;
  if(d>=1.)discard;
  vec3 col=d<.3?mix(uCore,uMid,d/.3):mix(uMid,uEdge,(d-.3)/.7);
  float a=d<.3?mix(1.,.8,d/.3):mix(.8,0.,(d-.3)/.7);
  col=toSrgb(aces(col*uExp/.6));
  gl_FragColor=vec4(col,a*uOpacity);
}`;function mo(v,r){const n=r.params;if(typeof window<"u"&&window.innerWidth<(n.minWidth??0))return null;const h=Yt(v,!0);if(!h)return null;const{canvas:i,gl:t}=h,p=r.lite;let T=r.progress;try{const e=xt(t,uo,ro),o=xt(t,co,lo),c=Jt(n.seed??7),l=s=>J(s).map(d=>d<=.04045?d/12.92:Math.pow((d+.055)/1.055,2.4)),f=(s,d)=>[s[0]*d,s[1]*d,s[2]*d],a=n.lights,x=n.palette,b=n.plate,$=no(t,b.radius,b.radiusBottom,b.thickness,p?48:64),L=b.rim>0?ao(t,b.radius,b.rim,12,p?64:96):null,u=n.item,M=_t(t,u.radius,u.detail,u.lumpy),E=u.flecks>0&&u.top>=0?_t(t,.035,1,0):null,k=p?512:1024,P=()=>{const s=t.createTexture();return t.bindTexture(t.TEXTURE_2D,s),s},g=()=>{t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const s=t.getExtension("EXT_texture_filter_anisotropic");s&&t.texParameterf(t.TEXTURE_2D,s.TEXTURE_MAX_ANISOTROPY_EXT,4)};t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1);const U=P(),R=P(),N=u.look==="boondi";if(N){const s=so(k,x.item,u.hue,c);t.bindTexture(t.TEXTURE_2D,U),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,s),t.generateMipmap(t.TEXTURE_2D),g();const d=io(s,k,2.2*u.beads);t.bindTexture(t.TEXTURE_2D,R),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,d),t.generateMipmap(t.TEXTURE_2D),g()}const w=Math.round(p?n.dust.countLite:n.dust.count),m=new Float32Array(w*3),A=new Float32Array(w);for(let s=0;s<w;s++){const d=n.dust.radius[0]+c()*(n.dust.radius[1]-n.dust.radius[0]),F=c()*C;m[s*3]=Math.cos(F)*d,m[s*3+1]=n.dust.range[0]+c()*(n.dust.range[1]-n.dust.range[0]),m[s*3+2]=Math.sin(F)*d,A[s]=c()}const z=w>0?Z(t,{p0:[m,3],seed:[A,1]},void 0,t.POINTS):null,X=n.dust.range[0]-.1,B=n.dust.range[1]+.1-X,G=u.spots,Nt=G.length,dt=G.map((s,d)=>d===u.top&&u.flecks>0?[.55+c()*0,.2]:[c()*6,c()*6]),tt=G.map(()=>0),ot=G.map(()=>0),Ut=l(x.plate),At=l(x.item),St=l(x.fleck),Dt=f(l(x.plateGlow),b.glow),Ft=a.keyPos,Ct=f(l(x.key),a.key),kt=f(l(x.rim),a.rim),Xt=f(l(x.fill),a.fill),It=f(l(x.sky),a.sky),Lt=f(l(x.ground),a.sky),Bt=J(x.dustCore),Gt=J(x.dustMid),Vt=J(x.dustEdge),_=n.camera,S=n.group;let et=1,pt=600,nt=yt(_.fov,et,.1,50);const at=Qt(),V=r.fixedTime!==void 0,st=(s,d)=>V?1:1-Math.pow(1-s,d*60);let j=V?S.yaw:0,H=0,it=_.position[2]+T*_.pullBack,ut=_.position[1]+T*_.pullUp;const jt=()=>{t.uniform3fv(e.u("uSky"),It),t.uniform3fv(e.u("uGround"),Lt),t.uniform3fv(e.u("uKeyDir"),Ft),t.uniform3fv(e.u("uKeyC"),Ct),t.uniform3fv(e.u("uRimP"),a.rimPos),t.uniform3fv(e.u("uRimC"),kt),t.uniform1f(e.u("uRimR"),a.rimRange),t.uniform3fv(e.u("uFillP"),a.fillPos),t.uniform3fv(e.u("uFillC"),Xt),t.uniform1f(e.u("uFillR"),a.fillRange),t.uniform1f(e.u("uExp"),a.exposure)},rt=(s,d,F,I,q)=>{t.uniform3fv(e.u("uAlbedo"),s),t.uniform3fv(e.u("uEmissive"),d),t.uniform1f(e.u("uMetal"),F),t.uniform1f(e.u("uRough"),I),t.uniform1f(e.u("uUseTex"),q?1:0)},K=(s,d)=>{t.uniformMatrix4fv(e.u("uM"),!1,s),t.uniformMatrix3fv(e.u("uNM"),!1,Zt(s)),Rt(t,e,d)},ct=to({host:v,canvas:i,gl:t,dpr:p?1.25:1.75,fps:p?30:0,fixedTime:r.fixedTime,alwaysVisible:r.backdrop,onLive:r.onLive,resize:(s,d,F,I)=>{et=s/d,pt=I,nt=yt(_.fov,et,.1,50)},frame:(s,d)=>{const F=T;j+=(S.yaw+s*S.spin+at.x*S.pointerYaw-j)*st(S.follow,d),H+=(at.y*S.pointerPitch-H)*st(S.follow*.75,d),V&&(j=S.yaw+s*S.spin,H=0);const I=st(_.follow,d);it+=(_.position[2]+F*_.pullBack-it)*I,ut+=(_.position[1]+F*_.pullUp-ut)*I;const q=[_.position[0],ut,it],vt=oo(q,[_.target[0],_.target[1]-F*_.pullLook,_.target[2]]),lt=W([0,S.y,0],[H,j,0],S.scale);t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.depthMask(!0),t.disable(t.BLEND),t.useProgram(e.p),t.uniformMatrix4fv(e.u("uV"),!1,vt),t.uniformMatrix4fv(e.u("uP"),!1,nt),t.uniform3fv(e.u("uEye"),q),jt(),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,U),t.uniform1i(e.u("uTex"),0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,R),t.uniform1i(e.u("uNrm"),1),t.activeTexture(t.TEXTURE0),rt(Ut,Dt,b.metalness,b.roughness,!1),K(Q(lt,W([0,b.y,0])),$),L&&K(Q(lt,W([0,0,0])),L);const D=n.fly;for(let y=0;y<Nt;y++){const[Ot,Wt,$t,zt]=G[y],ht=1-Pt((s-y*n.intro.stagger)/n.intro.drop),ft=Pt((F-D.from-y*D.stagger)/D.span),O=ft*ft*(3-2*ft),Mt=(y%2?1:-1)*(D.x[0]+y*D.x[1])*O,Et=O*(D.z[0]+y*D.z[1]),Y=-j,Ht=Ot+Mt*Math.cos(Y)+Et*Math.sin(Y),Kt=$t-Mt*Math.sin(Y)+Et*Math.cos(Y),qt=Wt+ht*ht*n.intro.height+Math.sin(s*1.4+y)*.015+O*(D.lift[0]+y%3*D.lift[1]);V?tt[y]=O*D.tumble*60*Math.min(s,2):tt[y]+=O*D.tumble*d*60,ot[y]=V?.12*s:ot[y]+.12*d;const Tt=Q(lt,W([Ht,qt,Kt],[dt[y][0]+tt[y],dt[y][1]+ot[y],0],zt));if(rt(N?[1,1,1]:At,[0,0,0],0,.55,N),K(Tt,M),E&&y===u.top){rt(St,[0,0,0],0,.6,!1);for(let mt=0;mt<u.flecks;mt++){const gt=mt/u.flecks*C;K(Q(Tt,W([Math.cos(gt)*.18,.47,Math.sin(gt)*.18])),E)}}}return z&&(t.useProgram(o.p),t.depthMask(!1),t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE),t.uniformMatrix4fv(o.u("uV"),!1,vt),t.uniformMatrix4fv(o.u("uP"),!1,nt),t.uniform1f(o.u("uT"),s),t.uniform1f(o.u("uBottom"),X),t.uniform1f(o.u("uSpan"),B),t.uniform1f(o.u("uRise0"),n.dust.rise[0]),t.uniform1f(o.u("uRise1"),n.dust.rise[1]),t.uniform1f(o.u("uSize"),n.dust.size*pt*.5),t.uniform1f(o.u("uRot"),s*n.dust.turn),t.uniform3fv(o.u("uCore"),Bt),t.uniform3fv(o.u("uMid"),Gt),t.uniform3fv(o.u("uEdge"),Vt),t.uniform1f(o.u("uOpacity"),n.dust.opacity),t.uniform1f(o.u("uExp"),a.exposure),Rt(t,o,z),t.depthMask(!0),t.disable(t.BLEND)),!0}});return{setProgress(s){T=Math.min(1,Math.max(0,s)),ct.wake()},frameTimes:()=>ct.frameTimes.slice(),destroy(){at.stop(),ct.destroy()}}}catch(e){return i.remove(),r.onLive?.(!1),typeof console<"u"&&console.warn("scene3d laddoo-thaal:",e),null}}export{mo as default,mo as start};
