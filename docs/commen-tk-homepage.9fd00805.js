parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
function e(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=t(e))){var n=0,r=function(){};return{s:r,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i,a=!0,l=!1;return{s:function(){o=e[Symbol.iterator]()},n:function(){var e=o.next();return a=e.done,e},e:function(e){l=!0,i=e},f:function(){try{a||null==o.return||o.return()}finally{if(l)throw i}}}}function t(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var r=document.getElementById("input-type"),o=document.getElementById("input-owner"),i=document.getElementById("input-repo"),a=document.getElementsByName("input-issue"),l=document.getElementById("input-issuenumber"),u=document.getElementById("input-theme"),c=document.getElementById("input-pagesize"),d=document.getElementById("btnCopyClipboard");function s(t){fetch("https://api.github.com/users/"+t.target.value+"/repos").then(function(e){return e.json()}).then(function(t){i.innerHTML="";var n,r=e(t);try{for(r.s();!(n=r.n()).done;){var a=n.value,l=document.createElement("option");l.innerText=a.name,l.value=a.name,i.appendChild(l),console.log(a.name)}}catch(u){r.e(u)}finally{r.f()}i.parentElement.parentElement.style.display="block",document.getElementById("hljs-value-repo").innerText="'".concat(o.value,"/[REPO]'")}).catch(function(e){return console.error(e)})}function m(e){document.getElementById("hljs-value-repo").innerText="'".concat(o.value,"/").concat(i.value,"'")}function v(e){var t=document.getElementById("hljs-attribute-issue").innerText;"number"==e.target.value?(document.getElementById("hljs-value-issue").innerText="'"+l.value+"'","issue-param"==t&&(document.getElementById("hljs-attribute-issue").innerText="issue-number")):(document.getElementById("hljs-value-issue").innerText="'".concat(e.target.value,"'"),"issue-number"==t&&(document.getElementById("hljs-attribute-issue").innerText="issue-param"))}function g(e){document.getElementById("hljs-value-issue").innerText="'"+l.value+"'"}function h(e){document.getElementById("hljs-value-theme").innerText="'"+e.target.value.toLowerCase()+"'"}function y(e){document.getElementById("hljs-value-page-size").innerText="'"+e.target.value+"'"}function f(e){e.target.innerHTML='<svg aria-hidden="true" height="16" role="img" viewBox="0 0 14 16" width="14" style="display:inline-block;fill:#28a745;user-select:none;vertical-align:text-bottom"><path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>';var t=document.createRange();t.selectNode(document.getElementById("copyArea")),window.getSelection().removeAllRanges(),window.getSelection().addRange(t),document.execCommand("copy"),window.getSelection().removeAllRanges(),setTimeout(function(){e.target.innerHTML='<svg aria-hidden="true" height="16" role="img" viewBox="0 0 14 16" width="14" style="display:inline-block;fill:currentColor;user-select:none;vertical-align:text-bottom"><path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path></svg>'},1e3)}o.addEventListener("change",s),i.addEventListener("change",m),a.forEach(function(e){return e.addEventListener("change",v)}),l.addEventListener("change",g),u.addEventListener("change",h),c.addEventListener("input",y),d.addEventListener("click",f);
},{}]},{},["Focm"], null)
//# sourceMappingURL=/commen-tk-homepage.9fd00805.js.map