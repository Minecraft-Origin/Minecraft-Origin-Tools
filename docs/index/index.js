!function(e,t,n){"use strict";e=e&&{}.hasOwnProperty.call(e,"default")?e.default:e,t=t&&{}.hasOwnProperty.call(t,"default")?t.default:t,n=n&&{}.hasOwnProperty.call(n,"default")?n.default:n,document.head.appendChild(document.createElement("style")).innerHTML=".update-check-root {\n  width: 100%;\n  height: 100%;\n  padding: 16px;\n  background-color: #FFF;\n  overflow: auto; }\n  .update-check-root.state-0 {\n    display: grid;\n    place-content: center; }\n  .update-check-root.state-1 {\n    padding-top: 0; }\n    .update-check-root.state-1 > .ant-tabs {\n      overflow: visible; }\n      .update-check-root.state-1 > .ant-tabs > .ant-tabs-bar {\n        position: -webkit-sticky;\n        position: sticky;\n        top: 0;\n        background-color: #FFF;\n        z-index: 666; }\n";const s=n.create(),r={method:"get",timeout:0};s.interceptors.response.use(e=>e.data,e=>Promise.reject(e));var i=function(e,t,n){return e=encodeURI(e),n=Object.assign({},r,n),s({url:e,params:t,method:n.method,timeout:n.timeout})};async function a(e){const t=await i(`https://api.github.com/repos/Minecraft-Origin/Minecraft-Origin/contents/${e}?_=${+new Date}`);let n="";return Array.isArray(t)?n=t:"base64"===t.encoding&&(n=decodeURIComponent(escape(atob(t.content)))),n}var l={methods:{async getModsData(){let e;try{e=await a("/README.md"),this.stateError=null,this.state=1}catch(e){this.stateError=e,this.state=2}1===this.state&&(this.tabsActiveKey=this.modpackTypeList[0].key,this.modpackData=this.analysisModsData(e),a("/Minecraft Origin/.minecraft/mods").then(e=>{this.analysisModsFileInfo(e),this.watchTabsToGetModsUpdateData()}).catch(e=>{[].concat(...Object.values(this.modpackData)).forEach(e=>{this.$set(e,"nameGetState",2)})}))},watchTabsToGetModsUpdateData(){this.$refs.tabs.$on("change",this.getModsUpdateData),this.getModsUpdateData()},async getModsUpdateData(){const e=this.modpackData[this.tabsActiveKey].filter(({nameGetState:e,file:t,href:n,updateFile:s})=>1===e&&t&&n&&n.startsWith("https://www.curseforge.com/")&&!s);for(const t of e)try{const{files:e,versions:n}=await this.getModUpdateData(t.href),s=this.findUpdateFileData(e,n,"1.12.2");s?this.$set(t,"updateFile",s.name):console.error(`[ ${t.title} - ${t.subTitle} ] 模组未检测到对应版本: ${t.href} ${t.href.replace("www.curseforge.com","api.cfwidget.com")}\n`)}catch(e){console.error(`[ ${t.title} - ${t.subTitle} ] 模组检测更新失败: ${t.href} ${t.href.replace("www.curseforge.com","api.cfwidget.com")}\n`,e)}},async getModUpdateData(e){const t=e.replace("www.curseforge.com","api.cfwidget.com"),n=await i(t);return"in_queue"===n.error?(await(s=1e3,new Promise(e=>{setTimeout(e,s)})),this.getModUpdateData(e)):n;var s},findUpdateFileData(e,t,n){let s;return e=e.filter(({versions:e})=>e.includes(n)),t=t[n],e.length?[s]=e.sort((e,t)=>new Date(t.uploaded_at)-new Date(e.uploaded_at)):t&&t.length&&([s]=t.sort((e,t)=>new Date(t.uploaded_at)-new Date(e.uploaded_at))),s}}};var o=function(e,t,n){return e(n={path:t,exports:{},require(e,t){return function(){throw Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&n.path)}},n.exports),n.exports}(e=>{function t(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}e.exports={defaults:{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1},getDefaults:t,changeDefaults(t){e.exports.defaults=t}}});const c=/[&<>"']/,h=/[&<>"']/g,p=/[<>"']|&(?!#?\w+;)/,u=/[<>"']|&(?!#?\w+;)/g,d={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},g=e=>d[e];const f=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function m(e){return e.replace(f,(e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):"")}const k=/(^|[^\[])\^/g;const b=/[^\w:]/g,x=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;const w={},y=/^[^:]+:\/*[^/]*$/,_=/^([^:]+:)[\s\S]*$/,$=/^([^:]+:\/*[^/]*)[\s\S]*$/;function z(e,t){w[" "+e]||(y.test(e)?w[" "+e]=e+"/":w[" "+e]=v(e,"/",!0));const n=-1===(e=w[" "+e]).indexOf(":");return"//"===t.substring(0,2)?n?t:e.replace(_,"$1")+t:"/"===t.charAt(0)?n?t:e.replace($,"$1")+t:e+t}function v(e,t,n){const s=e.length;if(0===s)return"";let r=0;for(;r<s;){const i=e.charAt(s-r-1);if(i!==t||n){if(i===t||!n)break;r++}else r++}return e.substr(0,s-r)}var S={escape(e,t){if(t){if(c.test(e))return e.replace(h,g)}else if(p.test(e))return e.replace(u,g);return e},unescape:m,edit(e,t){e=e.source||e,t=t||"";const n={replace(t,s){return s=(s=s.source||s).replace(k,"$1"),e=e.replace(t,s),n},getRegex(){return RegExp(e,t)}};return n},cleanUrl(e,t,n){if(e){let e;try{e=decodeURIComponent(m(n)).replace(b,"").toLowerCase()}catch(e){return null}if(0===e.indexOf("javascript:")||0===e.indexOf("vbscript:")||0===e.indexOf("data:"))return null}t&&!x.test(n)&&(n=z(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch(e){return null}return n},resolveUrl:z,noopTest:{exec(){}},merge(e){let t,n,s=1;for(;s<arguments.length;s++)for(n in t=arguments[s],t)({}).hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},splitCells(e,t){const n=e.replace(/\|/g,(e,t,n)=>{let s=!1,r=t;for(;--r>=0&&"\\"===n[r];)s=!s;return s?"|":" |"}).split(/ \|/);let s=0;if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(/\\\|/g,"|");return n},rtrim:v,findClosingBracket(e,t){if(-1===e.indexOf(t[1]))return-1;const n=e.length;let s=0,r=0;for(;r<n;r++)if("\\"===e[r])r++;else if(e[r]===t[0])s++;else if(e[r]===t[1]&&(s--,s<0))return r;return-1},checkSanitizeDeprecation(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}};const{defaults:A}=o,{rtrim:T,splitCells:C,escape:R,findClosingBracket:I}=S;function D(e,t,n){const s=t.href,r=t.title?R(t.title):null;return"!"!==e[0].charAt(0)?{type:"link",raw:n,href:s,title:r,text:e[1]}:{type:"image",raw:n,text:R(e[1]),href:s,title:r}}var E=class{constructor(e){this.options=e||A}space(e){const t=this.rules.block.newline.exec(e);if(t)return t[0].length>1?{type:"space",raw:t[0]}:{raw:"\n"}}code(e,t){const n=this.rules.block.code.exec(e);if(n){const e=t[t.length-1];if(e&&"paragraph"===e.type)return{raw:n[0],text:n[0].trimRight()};const s=n[0].replace(/^ {4}/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?s:T(s,"\n")}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const e=t[0],n=function(e,t){const n=e.match(/^(\s+)(?:```)/);if(null===n)return t;const s=n[1];return t.split("\n").map(e=>{const t=e.match(/^\s+/);if(null===t)return e;const[n]=t;return n.length>=s.length?e.slice(s.length):e}).join("\n")}(e,t[3]||"");return{type:"code",raw:e,lang:t[2]?t[2].trim():t[2],text:n}}}heading(e){const t=this.rules.block.heading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[1].length,text:t[2]}}nptable(e){const t=this.rules.block.nptable.exec(e);if(t){const e={type:"table",header:C(t[1].replace(/^ *| *\| *$/g,"")),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:t[3]?t[3].replace(/\n$/,"").split("\n"):[],raw:t[0]};if(e.header.length===e.align.length){let t,n=e.align.length;for(t=0;t<n;t++)/^ *-+: *$/.test(e.align[t])?e.align[t]="right":/^ *:-+: *$/.test(e.align[t])?e.align[t]="center":/^ *:-+ *$/.test(e.align[t])?e.align[t]="left":e.align[t]=null;for(n=e.cells.length,t=0;t<n;t++)e.cells[t]=C(e.cells[t],e.header.length);return e}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){const e=t[0].replace(/^ *> ?/gm,"");return{type:"blockquote",raw:t[0],text:e}}}list(e){const t=this.rules.block.list.exec(e);if(t){let e=t[0];const n=t[2],s=n.length>1,r={type:"list",raw:e,ordered:s,start:s?+n:"",loose:!1,items:[]},i=t[0].match(this.rules.block.item);let a,l,o,c,h,p,u,d=!1;const g=i.length;for(let t=0;t<g;t++)a=i[t],e=a,l=a.length,a=a.replace(/^ *([*+-]|\d+\.) */,""),~a.indexOf("\n ")&&(l-=a.length,a=this.options.pedantic?a.replace(/^ {1,4}/gm,""):a.replace(RegExp("^ {1,"+l+"}","gm"),"")),t!==g-1&&(o=this.rules.block.bullet.exec(i[t+1])[0],(n.length>1?1===o.length:o.length>1||this.options.smartLists&&o!==n)&&(c=i.slice(t+1).join("\n"),r.raw=r.raw.substring(0,r.raw.length-c.length),t=g-1)),h=d||/\n\n(?!\s*$)/.test(a),t!==g-1&&(d="\n"===a.charAt(a.length-1),h||(h=d)),h&&(r.loose=!0),p=/^\[[ xX]\] /.test(a),u=void 0,p&&(u=" "!==a[1],a=a.replace(/^\[[ xX]\] +/,"")),r.items.push({type:"list_item",raw:e,task:p,checked:u,loose:h,text:a});return r}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:this.options.sanitize?"paragraph":"html",raw:t[0],pre:!this.options.sanitizer&&("pre"===t[1]||"script"===t[1]||"style"===t[1]),text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):R(t[0]):t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){t[3]&&(t[3]=t[3].substring(1,t[3].length-1));return{tag:t[1].toLowerCase().replace(/\s+/g," "),raw:t[0],href:t[2],title:t[3]}}}table(e){const t=this.rules.block.table.exec(e);if(t){const e={type:"table",header:C(t[1].replace(/^ *| *\| *$/g,"")),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:t[3]?t[3].replace(/\n$/,"").split("\n"):[]};if(e.header.length===e.align.length){e.raw=t[0];let n,s=e.align.length;for(n=0;n<s;n++)/^ *-+: *$/.test(e.align[n])?e.align[n]="right":/^ *:-+: *$/.test(e.align[n])?e.align[n]="center":/^ *:-+ *$/.test(e.align[n])?e.align[n]="left":e.align[n]=null;for(s=e.cells.length,n=0;n<s;n++)e.cells[n]=C(e.cells[n].replace(/^ *\| *| *\| *$/g,""),e.header.length);return e}}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1]}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t)return{type:"paragraph",raw:t[0],text:"\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1]}}text(e,t){const n=this.rules.block.text.exec(e);if(n){const e=t[t.length-1];return e&&"text"===e.type?{raw:n[0],text:n[0]}:{type:"text",raw:n[0],text:n[0]}}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:R(t[1])}}tag(e,t,n){const s=this.rules.inline.tag.exec(e);if(s)return!t&&/^<a /i.test(s[0])?t=!0:t&&/^<\/a>/i.test(s[0])&&(t=!1),!n&&/^<(pre|code|kbd|script)(\s|>)/i.test(s[0])?n=!0:n&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(s[0])&&(n=!1),{type:this.options.sanitize?"text":"html",raw:s[0],inLink:t,inRawBlock:n,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(s[0]):R(s[0]):s[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const e=I(t[2],"()");if(e>-1){const n=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=""}let n=t[2],s="";if(this.options.pedantic){const e=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);e?(n=e[1],s=e[3]):s=""}else s=t[3]?t[3].slice(1,-1):"";n=n.trim().replace(/^<([\s\S]*)>$/,"$1");return D(t,{href:n?n.replace(this.rules.inline._escapes,"$1"):n,title:s?s.replace(this.rules.inline._escapes,"$1"):s},t[0])}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=(n[2]||n[1]).replace(/\s+/g," ");if(e=t[e.toLowerCase()],!e||!e.href){const e=n[0].charAt(0);return{type:"text",raw:e,text:e}}return D(n,e,n[0])}}strong(e){const t=this.rules.inline.strong.exec(e);if(t)return{type:"strong",raw:t[0],text:t[4]||t[3]||t[2]||t[1]}}em(e){const t=this.rules.inline.em.exec(e);if(t)return{type:"em",raw:t[0],text:t[6]||t[5]||t[4]||t[3]||t[2]||t[1]}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(/\n/g," ");const n=/[^ ]/.test(e),s=e.startsWith(" ")&&e.endsWith(" ");return n&&s&&(e=e.substring(1,e.length-1)),e=R(e,!0),{type:"codespan",raw:t[0],text:e}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[1]}}autolink(e,t){const n=this.rules.inline.autolink.exec(e);if(n){let e,s;return"@"===n[2]?(e=R(this.options.mangle?t(n[1]):n[1]),s="mailto:"+e):(e=R(n[1]),s=e),{type:"link",raw:n[0],text:e,href:s,tokens:[{type:"text",raw:e,text:e}]}}}url(e,t){let n;if(n=this.rules.inline.url.exec(e)){let e,s;if("@"===n[2])e=R(this.options.mangle?t(n[0]):n[0]),s="mailto:"+e;else{let t;do{t=n[0],n[0]=this.rules.inline._backpedal.exec(n[0])[0]}while(t!==n[0]);e=R(n[0]),s="www."===n[1]?"http://"+e:e}return{type:"link",raw:n[0],text:e,href:s,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e,t,n){const s=this.rules.inline.text.exec(e);if(s){let e;return e=t?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(s[0]):R(s[0]):s[0]:R(this.options.smartypants?n(s[0]):s[0]),{type:"text",raw:s[0],text:e}}}};const{noopTest:L,edit:F,merge:M}=S,U={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,nptable:L,table:L,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};U.def=F(U.def).replace("label",U._label).replace("title",U._title).getRegex(),U.bullet=/(?:[*+-]|\d{1,9}\.)/,U.item=/^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/,U.item=F(U.item,"gm").replace(/bull/g,U.bullet).getRegex(),U.list=F(U.list).replace(/bull/g,U.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+U.def.source+")").getRegex(),U._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",U._comment=/<!--(?!-?>)[\s\S]*?-->/,U.html=F(U.html,"i").replace("comment",U._comment).replace("tag",U._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),U.paragraph=F(U._paragraph).replace("hr",U.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",U._tag).getRegex(),U.blockquote=F(U.blockquote).replace("paragraph",U.paragraph).getRegex(),U.normal=M({},U),U.gfm=M({},U.normal,{nptable:"^ *([^|\\n ].*\\|.*)\\n *([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",table:"^ *\\|(.+)\\n *\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),U.gfm.nptable=F(U.gfm.nptable).replace("hr",U.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",U._tag).getRegex(),U.gfm.table=F(U.gfm.table).replace("hr",U.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",U._tag).getRegex(),U.pedantic=M({},U.normal,{html:F("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",U._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,fences:L,paragraph:F(U.normal._paragraph).replace("hr",U.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",U.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});const O={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:L,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,strong:/^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,em:/^_([^\s_])_(?!_)|^_([^\s_<][\s\S]*?[^\s_])_(?!_|[^\s,punctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\s,punctuation])|^\*([^\s*<\[])\*(?!\*)|^\*([^\s<"][\s\S]*?[^\s\[\*])\*(?![\]`punctuation])|^\*([^\s*"<\[][\s\S]*[^\s])\*(?!\*)/,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:L,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/,_punctuation:"!\"#$%&'()*+\\-./:;<=>?@\\[^_{|}~"};O.em=F(O.em).replace(/punctuation/g,O._punctuation).getRegex(),O._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,O._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,O._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,O.autolink=F(O.autolink).replace("scheme",O._scheme).replace("email",O._email).getRegex(),O._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,O.tag=F(O.tag).replace("comment",U._comment).replace("attribute",O._attribute).getRegex(),O._label=/(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,O._href=/<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/,O._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,O.link=F(O.link).replace("label",O._label).replace("href",O._href).replace("title",O._title).getRegex(),O.reflink=F(O.reflink).replace("label",O._label).getRegex(),O.normal=M({},O),O.pedantic=M({},O.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,link:F(/^!?\[(label)\]\((.*?)\)/).replace("label",O._label).getRegex(),reflink:F(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",O._label).getRegex()}),O.gfm=M({},O.normal,{escape:F(O.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~+(?=\S)([\s\S]*?\S)~+/,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/}),O.gfm.url=F(O.gfm.url,"i").replace("email",O.gfm._extended_email).getRegex(),O.breaks=M({},O.gfm,{br:F(O.br).replace("{2,}","*").getRegex(),text:F(O.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});var q={block:U,inline:O};const{defaults:Z}=o,{block:P,inline:B}=q;function j(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function G(e){let t,n,s="";const r=e.length;for(t=0;t<r;t++)n=e.charCodeAt(t),Math.random()>.5&&(n="x"+n.toString(16)),s+="&#"+n+";";return s}var N=class e{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Z,this.options.tokenizer=this.options.tokenizer||new E,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options;const t={block:P.normal,inline:B.normal};this.options.pedantic?(t.block=P.pedantic,t.inline=B.pedantic):this.options.gfm&&(t.block=P.gfm,this.options.breaks?t.inline=B.breaks:t.inline=B.gfm),this.tokenizer.rules=t}static get rules(){return{block:P,inline:B}}static lex(t,n){return new e(n).lex(t)}lex(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    "),this.blockTokens(e,this.tokens,!0),this.inline(this.tokens),this.tokens}blockTokens(e,t=[],n=!0){let s,r,i,a;for(e=e.replace(/^ +$/gm,"");e;)if(s=this.tokenizer.space(e))e=e.substring(s.raw.length),s.type&&t.push(s);else if(s=this.tokenizer.code(e,t))e=e.substring(s.raw.length),s.type?t.push(s):(a=t[t.length-1],a.raw+="\n"+s.raw,a.text+="\n"+s.text);else if(s=this.tokenizer.fences(e))e=e.substring(s.raw.length),t.push(s);else if(s=this.tokenizer.heading(e))e=e.substring(s.raw.length),t.push(s);else if(s=this.tokenizer.nptable(e))e=e.substring(s.raw.length),t.push(s);else if(s=this.tokenizer.hr(e))e=e.substring(s.raw.length),t.push(s);else if(s=this.tokenizer.blockquote(e))e=e.substring(s.raw.length),s.tokens=this.blockTokens(s.text,[],n),t.push(s);else if(s=this.tokenizer.list(e)){for(e=e.substring(s.raw.length),i=s.items.length,r=0;r<i;r++)s.items[r].tokens=this.blockTokens(s.items[r].text,[],!1);t.push(s)}else if(s=this.tokenizer.html(e))e=e.substring(s.raw.length),t.push(s);else if(n&&(s=this.tokenizer.def(e)))e=e.substring(s.raw.length),this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title});else if(s=this.tokenizer.table(e))e=e.substring(s.raw.length),t.push(s);else if(s=this.tokenizer.lheading(e))e=e.substring(s.raw.length),t.push(s);else if(n&&(s=this.tokenizer.paragraph(e)))e=e.substring(s.raw.length),t.push(s);else if(s=this.tokenizer.text(e,t))e=e.substring(s.raw.length),s.type?t.push(s):(a=t[t.length-1],a.raw+="\n"+s.raw,a.text+="\n"+s.text);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw Error(t)}return t}inline(e){let t,n,s,r,i,a;const l=e.length;for(t=0;t<l;t++)switch(a=e[t],a.type){case"paragraph":case"text":case"heading":a.tokens=[],this.inlineTokens(a.text,a.tokens);break;case"table":for(a.tokens={header:[],cells:[]},r=a.header.length,n=0;n<r;n++)a.tokens.header[n]=[],this.inlineTokens(a.header[n],a.tokens.header[n]);for(r=a.cells.length,n=0;n<r;n++)for(i=a.cells[n],a.tokens.cells[n]=[],s=0;s<i.length;s++)a.tokens.cells[n][s]=[],this.inlineTokens(i[s],a.tokens.cells[n][s]);break;case"blockquote":this.inline(a.tokens);break;case"list":for(r=a.items.length,n=0;n<r;n++)this.inline(a.items[n].tokens)}return e}inlineTokens(e,t=[],n=!1,s=!1){let r;for(;e;)if(r=this.tokenizer.escape(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.tag(e,n,s))e=e.substring(r.raw.length),n=r.inLink,s=r.inRawBlock,t.push(r);else if(r=this.tokenizer.link(e))e=e.substring(r.raw.length),"link"===r.type&&(r.tokens=this.inlineTokens(r.text,[],!0,s)),t.push(r);else if(r=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(r.raw.length),"link"===r.type&&(r.tokens=this.inlineTokens(r.text,[],!0,s)),t.push(r);else if(r=this.tokenizer.strong(e))e=e.substring(r.raw.length),r.tokens=this.inlineTokens(r.text,[],n,s),t.push(r);else if(r=this.tokenizer.em(e))e=e.substring(r.raw.length),r.tokens=this.inlineTokens(r.text,[],n,s),t.push(r);else if(r=this.tokenizer.codespan(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.br(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.del(e))e=e.substring(r.raw.length),r.tokens=this.inlineTokens(r.text,[],n,s),t.push(r);else if(r=this.tokenizer.autolink(e,G))e=e.substring(r.raw.length),t.push(r);else if(n||!(r=this.tokenizer.url(e,G))){if(r=this.tokenizer.inlineText(e,s,j))e=e.substring(r.raw.length),t.push(r);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw Error(t)}}else e=e.substring(r.raw.length),t.push(r);return t}};const{defaults:H}=o,{cleanUrl:K,escape:V}=S;var W=class{constructor(e){this.options=e||H}code(e,t,n){const s=(t||"").match(/\S*/)[0];if(this.options.highlight){const t=this.options.highlight(e,s);null!=t&&t!==e&&(n=!0,e=t)}return s?'<pre><code class="'+this.options.langPrefix+V(s,!0)+'">'+(n?e:V(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:V(e,!0))+"</code></pre>\n"}blockquote(e){return"<blockquote>\n"+e+"</blockquote>\n"}html(e){return e}heading(e,t,n,s){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+s.slug(n)+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"}hr(){return this.options.xhtml?"<hr/>\n":"<hr>\n"}list(e,t,n){const s=t?"ol":"ul";return"<"+s+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+s+">\n"}listitem(e){return"<li>"+e+"</li>\n"}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return"<p>"+e+"</p>\n"}table(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return"<tr>\n"+e+"</tr>\n"}tablecell(e,t){const n=t.header?"th":"td";return(t.align?"<"+n+' align="'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"}strong(e){return"<strong>"+e+"</strong>"}em(e){return"<em>"+e+"</em>"}codespan(e){return"<code>"+e+"</code>"}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return"<del>"+e+"</del>"}link(e,t,n){if(null===(e=K(this.options.sanitize,this.options.baseUrl,e)))return n;let s='<a href="'+V(e)+'"';return t&&(s+=' title="'+t+'"'),s+=">"+n+"</a>",s}image(e,t,n){if(null===(e=K(this.options.sanitize,this.options.baseUrl,e)))return n;let s='<img src="'+e+'" alt="'+n+'"';return t&&(s+=' title="'+t+'"'),s+=this.options.xhtml?"/>":">",s}text(e){return e}},X=class{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}},J=class{constructor(){this.seen={}}slug(e){let t=e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-");if(this.seen.hasOwnProperty(t)){const e=t;do{this.seen[e]++,t=e+"-"+this.seen[e]}while(this.seen.hasOwnProperty(t))}return this.seen[t]=0,t}};const{defaults:Q}=o,{unescape:Y}=S;var ee=class e{constructor(e){this.options=e||Q,this.options.renderer=this.options.renderer||new W,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new X,this.slugger=new J}static parse(t,n){return new e(n).parse(t)}parse(e,t=!0){let n,s,r,i,a,l,o,c,h,p,u,d,g,f,m,k,b,x,w="";const y=e.length;for(n=0;n<y;n++)switch(p=e[n],p.type){case"space":continue;case"hr":w+=this.renderer.hr();continue;case"heading":w+=this.renderer.heading(this.parseInline(p.tokens),p.depth,Y(this.parseInline(p.tokens,this.textRenderer)),this.slugger);continue;case"code":w+=this.renderer.code(p.text,p.lang,p.escaped);continue;case"table":for(c="",o="",i=p.header.length,s=0;s<i;s++)o+=this.renderer.tablecell(this.parseInline(p.tokens.header[s]),{header:!0,align:p.align[s]});for(c+=this.renderer.tablerow(o),h="",i=p.cells.length,s=0;s<i;s++){for(l=p.tokens.cells[s],o="",a=l.length,r=0;r<a;r++)o+=this.renderer.tablecell(this.parseInline(l[r]),{header:!1,align:p.align[r]});h+=this.renderer.tablerow(o)}w+=this.renderer.table(c,h);continue;case"blockquote":h=this.parse(p.tokens),w+=this.renderer.blockquote(h);continue;case"list":for(u=p.ordered,d=p.start,g=p.loose,i=p.items.length,h="",s=0;s<i;s++)m=p.items[s],k=m.checked,b=m.task,f="",m.task&&(x=this.renderer.checkbox(k),g?m.tokens.length>0&&"text"===m.tokens[0].type?(m.tokens[0].text=x+" "+m.tokens[0].text,m.tokens[0].tokens&&m.tokens[0].tokens.length>0&&"text"===m.tokens[0].tokens[0].type&&(m.tokens[0].tokens[0].text=x+" "+m.tokens[0].tokens[0].text)):m.tokens.unshift({type:"text",text:x}):f+=x),f+=this.parse(m.tokens,g),h+=this.renderer.listitem(f,b,k);w+=this.renderer.list(h,u,d);continue;case"html":w+=this.renderer.html(p.text);continue;case"paragraph":w+=this.renderer.paragraph(this.parseInline(p.tokens));continue;case"text":for(h=p.tokens?this.parseInline(p.tokens):p.text;n+1<y&&"text"===e[n+1].type;)p=e[++n],h+="\n"+(p.tokens?this.parseInline(p.tokens):p.text);w+=t?this.renderer.paragraph(h):h;continue;default:{const e='Token with "'+p.type+'" type was not found.';if(this.options.silent)return void console.error(e);throw Error(e)}}return w}parseInline(e,t){t=t||this.renderer;let n,s,r="";const i=e.length;for(n=0;n<i;n++)switch(s=e[n],s.type){case"escape":r+=t.text(s.text);break;case"html":r+=t.html(s.text);break;case"link":r+=t.link(s.href,s.title,this.parseInline(s.tokens,t));break;case"image":r+=t.image(s.href,s.title,s.text);break;case"strong":r+=t.strong(this.parseInline(s.tokens,t));break;case"em":r+=t.em(this.parseInline(s.tokens,t));break;case"codespan":r+=t.codespan(s.text);break;case"br":r+=t.br();break;case"del":r+=t.del(this.parseInline(s.tokens,t));break;case"text":r+=t.text(s.text);break;default:{const e='Token with "'+s.type+'" type was not found.';if(this.options.silent)return void console.error(e);throw Error(e)}}return r}};const{merge:te,checkSanitizeDeprecation:ne,escape:se}=S,{getDefaults:re,changeDefaults:ie,defaults:ae}=o;function le(e,t,n){if(null==e)throw Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw Error("marked(): input parameter is of type "+{}.toString.call(e)+", string expected");if("function"==typeof t&&(n=t,t=null),t=te({},le.defaults,t||{}),ne(t),n){const s=t.highlight;let r;try{r=N.lex(e,t)}catch(e){return n(e)}const i=e=>{let i;if(!e)try{i=ee.parse(r,t)}catch(t){e=t}return t.highlight=s,e?n(e):n(null,i)};if(!s||s.length<3)return i();if(delete t.highlight,!r.length)return i();let a=0;return le.walkTokens(r,e=>{"code"===e.type&&(a++,s(e.text,e.lang,(t,n)=>{if(t)return i(t);null!=n&&n!==e.text&&(e.text=n,e.escaped=!0),a--,0===a&&i()}))}),void(0===a&&i())}try{const n=N.lex(e,t);return t.walkTokens&&le.walkTokens(n,t.walkTokens),ee.parse(n,t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",t.silent)return"<p>An error occurred:</p><pre>"+se(e.message+"",!0)+"</pre>";throw e}}le.options=le.setOptions=e=>(te(le.defaults,e),ie(le.defaults),le),le.getDefaults=re,le.defaults=ae,le.use=e=>{const t=te({},e);if(e.renderer){const n=le.defaults.renderer||new W;for(const t in e.renderer){const s=n[t];n[t]=(...r)=>{let i=e.renderer[t].apply(n,r);return!1===i&&(i=s.apply(n,r)),i}}t.renderer=n}if(e.tokenizer){const n=le.defaults.tokenizer||new E;for(const t in e.tokenizer){const s=n[t];n[t]=(...r)=>{let i=e.tokenizer[t].apply(n,r);return!1===i&&(i=s.apply(n,r)),i}}t.tokenizer=n}if(e.walkTokens){const n=le.defaults.walkTokens;t.walkTokens=t=>{e.walkTokens(t),n&&n(t)}}le.setOptions(t)},le.walkTokens=(e,t)=>{for(const n of e)switch(t(n),n.type){case"table":for(const e of n.tokens.header)le.walkTokens(e,t);for(const e of n.tokens.cells)for(const n of e)le.walkTokens(n,t);break;case"list":le.walkTokens(n.items,t);break;default:n.tokens&&le.walkTokens(n.tokens,t)}},le.Parser=ee,le.parser=ee.parse,le.Renderer=W,le.TextRenderer=X,le.Lexer=N,le.lexer=N.lex,le.Tokenizer=E,le.Slugger=J,le.parse=le;const oe=new le.Lexer;function ce(e,t,n,s,r,i,a,l,o,c){"boolean"!=typeof a&&(o=l,l=a,a=!1);const h="function"==typeof n?n.options:n;let p;if(e&&e.render&&(h.render=e.render,h.staticRenderFns=e.staticRenderFns,h._compiled=!0,r&&(h.functional=!0)),s&&(h._scopeId=s),i?(p=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,o(e)),e&&e._registeredComponents&&e._registeredComponents.add(i)},h._ssrRegister=p):t&&(p=a?function(e){t.call(this,c(e,this.$root.$options.shadowRoot))}:function(e){t.call(this,l(e))}),p)if(h.functional){const e=h.render;h.render=function(t,n){return p.call(n),e(t,n)}}else{const e=h.beforeCreate;h.beforeCreate=e?[].concat(e,p):[p]}return n}const he={mixins:[l,{methods:{analysisModsData(e){const t={},n=(s=e,oe.lex(s));var s;return this.modpackTypeList.forEach(({label:e,key:s})=>{const r=n.findIndex(t=>"html"===t.type&&function(e,t){const n=document.createElement("template");n.innerHTML=t;const s=document.importNode(n.content,!0);if("H3"===s.firstElementChild.nodeName.toUpperCase()&&s.firstElementChild.textContent.trim()===e)return!0}(e,t.text)),i=n[r+1],a=t[s]=[];i.tokens.cells.forEach(([e])=>{let t="",n="",s="";e.forEach(e=>{switch(e.type){case"text":t+=e.text;break;case"link":n=e.text,s=e.href}}),t=t.replace(/\s*-\s*$/,"").trim(),t=t.replace("&#39;","'").trim(),a.push({title:t,subTitle:n,href:s})})}),t},analysisModsFileInfo(e){const t=e.filter(({type:e})=>"file"===e);Object.entries(this.modpackData).forEach(([e,n])=>{const s=this.modpackTypeList.find(({key:t})=>t===e).label;n.forEach(e=>{let n=e.title;n.includes("[ 前置 ]")?n=n.split("]").slice(-1)[0].trim():/^([^(]+)\(([^)]+)\)$/.test(n)&&(n=n.replace(/\s/g,"").replace(/^([^(]+)\(([^)]+)\)$/,"$1 - $2"));const r=t.findIndex(({name:e})=>e.includes(`[ ${s} ]`)&&e.includes(`[ ${n} ]`));if(r<0)this.$set(e,"nameGetState",2);else{const n=t.splice(r,1)[0];this.$set(e,"nameGetState",1),this.$set(e,"file",n.name.split(/\[\s(BOTH|CLIENT|SERVER)\s\]/).slice(-1)[0].trim())}})})}}}],data(){return{state:0,stateError:null,retryCount:0,retryActiveButtonIndex:null,retryButtonDataList:[{label:"重试",cycles:1},{label:"重试 10 次",cycles:10},{label:"重试到成功为止",cycles:1/0}],modpackTypeList:[{label:"基础",key:"Basis"},{label:"基础+",key:"Basis+"},{label:"增强",key:"Enhance"},{label:"极限",key:"Ultimate_Limit"}],modpackData:{},tabsActiveKey:"",modsTableColumns:[{title:"名称",dataIndex:"title",width:"28em",scopedSlots:{customRender:"name"}},{title:"文件名及版本",dataIndex:"file",width:"28em",scopedSlots:{customRender:"file"}},{title:"模组主页",dataIndex:"href",scopedSlots:{customRender:"href"}}]}},methods:{async retryGetFileContent(e){this.state=2,this.retryCount=0,this.retryActiveButtonIndex=this.retryButtonDataList.map(({cycles:e})=>e).indexOf(e);for(let t=0;t<e&&(this.retryCount++,await this.getModsData(),1!==this.state);t++);this.retryCount=0,this.retryActiveButtonIndex=null},onChangeTabs(){this.$refs.tabs.$el.scrollIntoView()}},mounted(){this.getModsData()}};var pe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"update-check-root",class:"state-"+e.state},[0===e.state?[n("a-spin",{attrs:{tip:"Loading ..."}})]:2===e.state?[n("a-result",{attrs:{status:"error",title:"获取 README.md 文件失败","sub-title":e.stateError&&e.stateError.message},scopedSlots:e._u([{key:"extra",fn(){return e._l(e.retryButtonDataList,(t,s)=>n("a-button",{key:t.cycles,attrs:{type:"primary",loading:e.retryActiveButtonIndex===s,disabled:null!==e.retryActiveButtonIndex&&e.retryActiveButtonIndex!==s},on:{click(n){return e.retryGetFileContent(t.cycles)}}},[e._v("\n          "+e._s(t.label)+"\n          "+e._s(e.retryActiveButtonIndex===s&&s>0?"( "+e.retryCount+" )":"")+"\n        ")]))},proxy:!0}])})]:1===e.state?[n("a-tabs",{ref:"tabs",on:{change:e.onChangeTabs},model:{value:e.tabsActiveKey,callback(t){e.tabsActiveKey=t},expression:"tabsActiveKey"}},e._l(e.modpackTypeList,t=>n("a-tab-pane",{key:t.key,attrs:{tab:t.label}},[n("a-table",{attrs:{size:"middle",pagination:!1,columns:e.modsTableColumns,"data-source":e.modpackData[t.key]},scopedSlots:e._u([{key:"name",fn(t,s){return[n("span",{domProps:{textContent:e._s(t)}}),e._v(" "),s.subTitle&&!t.includes(s.subTitle)?n("span",[e._v("- "+e._s(s.subTitle))]):e._e()]}},{key:"file",fn(t,s){return[n("div",{ref:"files",refInFor:!0,domProps:{record:s}},[s.nameGetState?2===s.nameGetState?n("a-icon",{attrs:{type:"warning",title:"文件名及版本加载失败"}}):1===s.nameGetState?[n("div",{class:s.updateFile&&"color-"+(t===s.updateFile?"success":"warning")},[n("a-icon",{attrs:{type:"file"}}),e._v(" "+e._s(t)+"\n                ")],1),e._v(" "),s.updateFile&&t!==s.updateFile?n("div",{staticClass:"color-error"},[n("a-icon",{attrs:{type:"fire"}}),e._v(" "+e._s(s.updateFile)+"\n                ")],1):e._e()]:e._e():n("a-spin",{attrs:{size:"small",title:"文件名及版本加载中"}})],2)]}},{key:"href",fn(t){return[t?n("a",{attrs:{target:"_blank",rel:"noreferrer",href:t},domProps:{textContent:e._s(t)}}):e._e()]}}],null,!0)})],1)),1)]:e._e()],2)};pe._withStripped=!0;const ue=ce({render:pe,staticRenderFns:[]},void 0,he,void 0,!1,void 0,!1,void 0,void 0,void 0);document.head.appendChild(document.createElement("style")).innerHTML="#app {\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n  #app .app-sider {\n    height: 100%;\n    position: fixed;\n    left: 0;\n    overflow: auto; }\n    #app .app-sider .app-sider-name {\n      line-height: 3;\n      margin: 16px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n      background: rgba(255, 255, 255, 0.2);\n      color: #FFF;\n      font-size: 18px; }\n    #app .app-sider .app-sider-menu .ant-menu-item:first-child {\n      margin-top: 0; }\n  #app .app-content > .ant-empty {\n    margin-top: 120px; }\n";const de={data(){return{siderWidth:280,menuActiveIndex:0,menuDataList:[{label:"Update Check",icon:"star",component:"update-check"}]}},computed:{menuActiveItem({menuDataList:e,menuActiveIndex:t}){return e[t]}},methods:{changeMenuActiveIndex({key:e}){this.menuActiveIndex=e}},components:{UpdateCheck:ue}};var ge=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-layout",{attrs:{id:"app"}},[n("a-layout-sider",{staticClass:"app-sider",attrs:{width:e.siderWidth}},[n("div",{staticClass:"app-sider-name"},[e._v("Minecraft Origin Tools")]),e._v(" "),n("a-menu",{staticClass:"app-sider-menu",attrs:{theme:"dark",mode:"inline","default-selected-keys":[0]},on:{select:e.changeMenuActiveIndex}},e._l(e.menuDataList,(t,s)=>n("a-menu-item",{key:s},[t.icon?n("a-icon",{attrs:{type:t.icon}}):e._e(),e._v(" "),n("span",{domProps:{textContent:e._s(t.label)}})],1)),1)],1),e._v(" "),n("a-layout",{style:{marginLeft:e.siderWidth+"px"}},[n("a-layout-content",{staticClass:"app-content"},[e.menuActiveItem.component?n(e.menuActiveItem.component,{tag:"div"}):n("a-empty",{attrs:{description:!1}})],1)],1)],1)};ge._withStripped=!0;const fe=ce({render:ge,staticRenderFns:[]},void 0,de,void 0,!1,void 0,!1,void 0,void 0,void 0);document.head.appendChild(document.createElement("style")).innerHTML=".color-success {\n  color: #52c41a !important; }\n\n.color-warning {\n  color: #faad14 !important; }\n\n.color-error {\n  color: #f5222d !important; }\n",e.use(t),new e({...fe}).$mount("#app")}(Vue,antd,axios);
