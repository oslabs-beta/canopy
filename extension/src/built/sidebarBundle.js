var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,e){t.appendChild(e)}function l(t,e,n){t.insertBefore(e,n||null)}function s(t){t.parentNode.removeChild(t)}function u(t){return document.createElement(t)}function a(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function d(t){return document.createTextNode(t)}function f(){return d(" ")}function p(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function m(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}let g;function $(t){g=t}function b(){if(!g)throw new Error("Function called outside component initialization");return g}const v=[],y=[],x=[],w=[],_=Promise.resolve();let A=!1;function z(t){x.push(t)}const C=new Set;let E=0;function N(){const t=g;do{for(;E<v.length;){const t=v[E];E++,$(t),j(t.$$)}for($(null),v.length=0,E=0;y.length;)y.pop()();for(let t=0;t<x.length;t+=1){const e=x[t];C.has(e)||(C.add(e),e())}x.length=0}while(v.length);for(;w.length;)w.pop()();A=!1,C.clear(),$(t)}function j(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(z)}}const k=new Set;let M;function B(){M={r:0,c:[],p:M}}function O(){M.r||o(M.c),M=M.p}function P(t,e){t&&t.i&&(k.delete(t),t.i(e))}function K(t,e,n,o){if(t&&t.o){if(k.has(t))return;k.add(t),M.c.push((()=>{k.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}function S(t){t&&t.c()}function L(t,n,c,i){const{fragment:l,on_mount:s,on_destroy:u,after_update:a}=t.$$;l&&l.m(n,c),i||z((()=>{const n=s.map(e).filter(r);u?u.push(...n):o(n),t.$$.on_mount=[]})),a.forEach(z)}function T(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function D(t,e){-1===t.$$.dirty[0]&&(v.push(t),A||(A=!0,_.then(N)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function W(e,r,c,i,l,u,a,d=[-1]){const f=g;$(e);const p=e.$$={fragment:null,ctx:null,props:u,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(f?f.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:r.target||f.$$.root};a&&a(p.root);let h=!1;if(p.ctx=c?c(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return p.ctx&&l(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),h&&D(e,t)),n})):[],p.update(),h=!0,o(p.before_update),p.fragment=!!i&&i(p.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);p.fragment&&p.fragment.l(t),t.forEach(s)}else p.fragment&&p.fragment.c();r.intro&&P(e.$$.fragment),L(e,r.target,r.anchor,r.customElement),N()}$(f)}class Y{$destroy(){T(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function q(t,e,n){const o=t.slice();return o[4]=e[n],o}function F(e){let n,o;return{c(){n=a("svg"),o=a("path"),h(o,"d","M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"),h(n,"width","16"),h(n,"height","16"),h(n,"fill","currentColor"),h(n,"viewBox","0 0 16 16")},m(t,e){l(t,n,e),i(n,o)},p:t,d(t){t&&s(n)}}}function I(t){let e;function n(t,e){return t[0]?G:R}let o=n(t),r=o(t);return{c(){r.c(),e=d("")},m(t,n){r.m(t,n),l(t,e,n)},p(t,c){o===(o=n(t))&&r?r.p(t,c):(r.d(1),r=o(t),r&&(r.c(),r.m(e.parentNode,e)))},d(t){r.d(t),t&&s(e)}}}function R(e){let n,o,r,c,u;return{c(){n=a("svg"),o=a("path"),r=a("path"),h(o,"d","M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"),h(r,"d","M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"),h(n,"class","toggle-icon svelte-1rfzjba"),h(n,"width","16"),h(n,"height","16"),h(n,"fill","currentColor"),h(n,"viewBox","0 0 16 16")},m(t,s){l(t,n,s),i(n,o),i(n,r),c||(u=p(n,"click",e[3]),c=!0)},p:t,d(t){t&&s(n),c=!1,u()}}}function G(e){let n,o,r,c,u;return{c(){n=a("svg"),o=a("path"),r=a("path"),h(o,"d","M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"),h(r,"d","M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"),h(n,"class","toggle-icon svelte-1rfzjba"),h(n,"width","16"),h(n,"height","16"),h(n,"fill","currentColor"),h(n,"viewBox","0 0 16 16")},m(t,s){l(t,n,s),i(n,o),i(n,r),c||(u=p(n,"click",e[3]),c=!0)},p:t,d(t){t&&s(n),c=!1,u()}}}function H(t){let e,n,o=t[1].children,r=[];for(let e=0;e<o.length;e+=1)r[e]=J(q(t,o,e));const c=t=>K(r[t],1,1,(()=>{r[t]=null}));return{c(){e=u("div");for(let t=0;t<r.length;t+=1)r[t].c();h(e,"id","inner-children-div"),h(e,"class","svelte-1rfzjba")},m(t,o){l(t,e,o);for(let t=0;t<r.length;t+=1)r[t].m(e,null);n=!0},p(t,n){if(2&n){let i;for(o=t[1].children,i=0;i<o.length;i+=1){const c=q(t,o,i);r[i]?(r[i].p(c,n),P(r[i],1)):(r[i]=J(c),r[i].c(),P(r[i],1),r[i].m(e,null))}for(B(),i=o.length;i<r.length;i+=1)c(i);O()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)P(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)K(r[t]);n=!1},d(t){t&&s(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(r,t)}}}function J(t){let e,n,o,r,c,a,d,p,m;return d=new V({props:{tree:t[4]}}),{c(){e=u("div"),n=u("br"),o=f(),r=u("span"),r.textContent="        ",c=f(),a=u("span"),S(d.$$.fragment),p=f(),h(e,"class","child svelte-1rfzjba")},m(t,s){l(t,e,s),i(e,n),i(e,o),i(e,r),i(e,c),i(e,a),L(d,a,null),i(e,p),m=!0},p(t,e){const n={};2&e&&(n.tree=t[4]),d.$set(n)},i(t){m||(P(d.$$.fragment,t),m=!0)},o(t){K(d.$$.fragment,t),m=!1},d(t){t&&s(e),T(d)}}}function Q(t){let e,n,o,r,c,a,p,g,$,b,v=t[1].componentKey+"",y=t[1].componentName+"";function x(t,e){return t[2]?I:F}let w=x(t),_=w(t),A=t[2]&&t[0]&&H(t);return{c(){e=u("div"),n=u("div"),o=f(),_.c(),r=f(),c=u("b"),a=d(v),p=d(', an instance of the "'),g=d(y),$=d('" component\n\n  '),A&&A.c(),h(n,"class","vspace svelte-1rfzjba")},m(t,s){l(t,e,s),i(e,n),i(e,o),_.m(e,null),i(e,r),i(e,c),i(c,a),i(e,p),i(e,g),i(e,$),A&&A.m(e,null),b=!0},p(t,[n]){w===(w=x(t))&&_?_.p(t,n):(_.d(1),_=w(t),_&&(_.c(),_.m(e,r))),(!b||2&n)&&v!==(v=t[1].componentKey+"")&&m(a,v),(!b||2&n)&&y!==(y=t[1].componentName+"")&&m(g,y),t[2]&&t[0]?A?(A.p(t,n),5&n&&P(A,1)):(A=H(t),A.c(),P(A,1),A.m(e,null)):A&&(B(),K(A,1,1,(()=>{A=null})),O())},i(t){b||(P(A),b=!0)},o(t){K(A),b=!1},d(t){t&&s(e),_.d(),A&&A.d()}}}function U(t,e,n){let o,{tree:r}=e,{expanded:c=!0}=e;return t.$$set=t=>{"tree"in t&&n(1,r=t.tree),"expanded"in t&&n(0,c=t.expanded)},t.$$.update=()=>{2&t.$$.dirty&&(r.children.length?n(2,o=!0):n(2,o=!1))},[c,r,o,function(){n(0,c=!c)}]}class V extends Y{constructor(t){super(),W(this,t,U,Q,c,{tree:1,expanded:0})}}function X(t){let e,n,o,r,c,a;function d(e){t[2](e)}let p={};return void 0!==t[0]&&(p.tree=t[0]),r=new V({props:p}),y.push((()=>function(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}(r,"tree",d))),{c(){e=u("main"),n=u("h1"),n.textContent="Component Tree",o=f(),S(r.$$.fragment),h(e,"class","svelte-yg16s0")},m(t,c){l(t,e,c),i(e,n),i(e,o),L(r,e,null),a=!0},p(t,[e]){const n={};var o;!c&&1&e&&(c=!0,n.tree=t[0],o=()=>c=!1,w.push(o)),r.$set(n)},i(t){a||(P(r.$$.fragment,t),a=!0)},o(t){K(r.$$.fragment,t),a=!1},d(t){t&&s(e),T(r)}}}function Z(t,e,n){let o,r,c={componentKey:-1,componentName:"BaseApp",children:[]};var i;return i=async()=>{console.log("sidebarMount"),console.log("preconnectPort",r),r=await chrome.runtime.connect({name:"sidebar-port"}),console.log("currPort",r),r.onMessage.addListener(((t,e,r)=>{console.log("sidebar-message",t.body);const i=o;t.body.componentData.forEach(((t,e)=>{i.children=[...i.children,{componentKey:e,componentName:t[2],children:[]}]})),n(1,c=i)})),await(async()=>{chrome.devtools.inspectedWindow.getResources((t=>{for(let e=0;e<t.length;e++)t[e].url.endsWith("bundle.js")&&t[e].getContent(((t,e)=>{r.postMessage({target:"CANOPY",body:"runAndInjectScript",script:t})}))}))})(),r.postMessage({target:"CANOPY",body:"getComponents"})},b().$$.on_mount.push(i),function(t){b().$$.on_destroy.push(t)}((()=>{console.log("sidebarDestroyed"),r.disconnect(),r=void 0,chrome.runtime.reload()})),t.$$.update=()=>{2&t.$$.dirty&&n(0,o=c)},[o,c,function(t){o=t,n(0,o),n(1,c)}]}return new class extends Y{constructor(t){super(),W(this,t,Z,X,c,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=sidebarBundle.js.map
