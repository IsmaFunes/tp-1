(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(5852)}])},5852:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return T},options:function(){return z}});var r=t(4051),a=t.n(r),o=t(5893);function i(e){return fetch(e).then((function(e){return e.json()}))}var l=t(7294),c=t(5545),u=t(1903),s=t(6886),d=t(5113),m=t(5861),f=t(913),h=t(3841),p=t(3815),g=t(5819),v=t(3457),x=t(480),b=t(9368),j=t(5418),w=t(3328),y=t(5376),Z=t(6901);function C(e,n){return 0==e||0==n?0:e==n?e:e>n?C(e-n,n):C(e,n-e)}function P(e,n){return 1==C(e,n)}Number.prototype.toFixedNoRound=function(e){var n=String(this),t=n.indexOf(".");return Number(n.substring(0,t+e+1))};var k="/tp-1",N=t(1812);function S(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function O(e,n,t,r,a,o,i){try{var l=e[o](i),c=l.value}catch(u){return void t(u)}l.done?n(c):Promise.resolve(c).then(r,a)}function I(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var o=e.apply(n,t);function i(e){O(o,r,a,i,l,"next",e)}function l(e){O(o,r,a,i,l,"throw",e)}i(void 0)}))}}function E(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function _(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){E(e,n,t[n])}))}return e}function M(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}function A(e){return function(e){if(Array.isArray(e))return S(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"===typeof e)return S(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return S(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}w.kL.register(w.uw,w.f$,w.ZL,w.Dx,w.u,w.De);var z={responsive:!0,plugins:{legend:{position:"top"},title:{display:!0,text:"Histograma"}},scales:{x:{stacked:!0,title:{display:!0,text:"Intervalo",color:"black",font:{size:18}}},y:{title:{display:!0,text:"Frecuencia",color:"black",font:{size:18}}}}},F=[{field:"i",headerName:"i",width:70,sortable:!1},{field:"axic",headerName:"a.Xi+c",width:100,sortable:!1},{field:"next",headerName:"Xi+1",width:100,sortable:!1},{field:"rnd",headerName:"RND",width:130,sortable:!1}],R=function(e){var n=e.name,t=e.onChange,r=e.params,a=void 0===r?{}:r,i=M(e,["name","onChange","params"]);return(0,o.jsx)(u.Z,_({sx:{mr:3,mb:3},value:a[n],type:"number",onChange:function(e){t(n,e.target.value)}},i,{inputProps:{inputMode:"numeric",pattern:"[0-9]*"}}))};function T(){var e=(0,l.useState)({n:"",modo:"lineal",aditiva:"",multiplicativa:"",semilla:"",modulo:"",cantIntervalos:5,k:"",g:""}),n=e[0],t=e[1],r=(0,l.useState)(!0),u=r[0],w=r[1],C=(0,l.useState)(!1),S=C[0],O=C[1],M=(0,l.useState)(0),T=M[0],D=M[1],L=(0,l.useState)([]),X=L[0],B=L[1],q=(0,l.useState)([]),W=q[0],$=q[1],H=(0,l.useState)({page:0,pageSize:100}),U=H[0],J=H[1],Q=(0,l.useState)([]),G=Q[0],K=Q[1],V=(0,l.useState)([]),Y=V[0],ee=V[1],ne=(0,l.useState)([]),te=ne[0],re=ne[1],ae=(0,l.useState)(!1),oe=ae[0],ie=ae[1];(0,l.useEffect)((function(){var e;n.k&&(e="multiplicativo"===n.modo?8*n.k+(oe?5:3):4*n.k+1,me("multiplicativa",e))}),[n.k,n.modo,oe]),(0,l.useEffect)((function(){n.g&&me("modulo",Math.pow(2,n.g))}),[n.g]);var le=function(){if(!n.n||"nativo"!==n.modo&&(!n.modulo||!n.multiplicativa||!n.semilla)||"lineal"===n.modo&&!n.aditiva)return ue("Ingrese todos los par\xe1metros requeridos"),!1;if(n.n>1e6)return ue("El n\xfamero de muestra no puede ser superior a 1000000"),!1;if("lineal"!==n.modo||P(Number(n.aditiva),Number(n.modulo))||se("El par\xe1metro C tiene que ser relativamente primo con el m\xf3dulo"),"multiplicativo"===n.modo){if(n.semilla%2===0)return ue("La semilla (x0) tiene que ser un n\xfamero impar para el congruencial multiplicativo"),!1;(function(e){var n=!0;if(1===e)return!1;for(var t=2;t<e;t++)if(e%t==0){n=!1;break}return n})(n.semilla)||se("Para tener un mejor resultado, defina la semilla (x0) como un n\xfamero primo")}return!0},ce=function(){var e=I(a().mark((function e(){var t,r,o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(ee([]),re([]),!le()){e.next=13;break}return O(!0),e.next=6,i("".concat(k,"/api/rnd?modo=").concat(n.modo,"&n=").concat(n.n,"&aditiva=").concat(n.aditiva,"&multiplicativa=").concat(n.multiplicativa,"&modulo=").concat(n.modulo,"&semilla=").concat(n.semilla,"&intervalos=").concat(n.cantIntervalos,"&round=").concat(u));case 6:t=e.sent,r=t.size,o=t.intervals,D(r),$(o),O(!1),de();case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ue=function(e){return ee((function(n){return A(n).concat([e])}))},se=function(e){return re((function(n){return A(n).concat([e])}))},de=(0,l.useCallback)(I(a().mark((function e(){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O(!0),e.next=3,i("".concat(k,"/api/rnd?page=").concat(U.page,"&size=").concat(U.pageSize));case 3:n=e.sent,O(!1),B(n);case 6:case"end":return e.stop()}}),e)}))),[U]),me=function(e,n){var r=Number(n);"modo"!==e&&(isNaN(r)||r<0)||t((function(t){return _({},t,E({},e,n))}))};return(0,l.useEffect)((function(){T&&de()}),[U,T,de]),(0,l.useEffect)((function(){if(W.length)if(n.n<30)se("Para calcular chi cuadrado, la muestra debe ser mayor a 30");else{var e=[],t=0;W.forEach((function(r,a){var o={interval:"".concat(r.from," - ").concat(r.to),fo:r.items.length,fe:n.n/W.length,i:a},i=Math.pow((o.fo-o.fe)/o.fe,2).toFixed(4);o.c=Number(i),t+=o.c,o.acu=Number(t.toFixed(4)),e.push(o)})),K(e)}}),[W,n.n]),(0,o.jsxs)(s.ZP,{sx:{padding:5},container:!0,spacing:2,direction:"column",children:[(0,o.jsx)(s.ZP,{item:!0,xs:!0,children:(0,o.jsxs)(d.Z,{elevation:2,children:[Boolean(Y.length)&&(0,o.jsx)(Z.Z,{severity:"error",children:Y.map((function(e){return(0,o.jsx)(m.Z,{children:e},e)}))}),Boolean(te.length)&&(0,o.jsx)(Z.Z,{severity:"warning",children:te.map((function(e){return(0,o.jsx)(m.Z,{children:e},e)}))})]})}),(0,o.jsx)(s.ZP,{item:!0,xs:!0,children:(0,o.jsxs)(d.Z,{elevation:1,sx:{padding:2},children:[(0,o.jsxs)(s.ZP,{container:!0,direction:"column",spacing:2,children:[(0,o.jsxs)(s.ZP,{item:!0,children:[(0,o.jsxs)(f.Z,{children:[(0,o.jsx)(h.Z,{id:"label-modo",children:"Modo"}),(0,o.jsxs)(p.Z,{labelId:"label-modo",id:"select-modo",value:n.modo,label:"Modo",onChange:function(e){me("modo",e.target.value)},sx:{minWidth:250,mr:5},children:[(0,o.jsx)(g.Z,{value:"lineal",children:"Congruencial Lineal"}),(0,o.jsx)(g.Z,{value:"multiplicativo",children:"Congruencial Multiplicativo"}),(0,o.jsx)(g.Z,{value:"nativo",children:"Nativo"})]})]}),(0,o.jsxs)(f.Z,{children:[(0,o.jsx)(h.Z,{id:"label-modo",children:"Cant. Int\xe9rvalos"}),(0,o.jsxs)(p.Z,{labelId:"label-intervals",id:"select-intervals",value:n.cantIntervalos,label:"Ittervalos",onChange:function(e){me("cantIntervalos",e.target.value)},sx:{minWidth:200},children:[(0,o.jsx)(g.Z,{value:5,children:"5"}),(0,o.jsx)(g.Z,{value:10,children:"10"}),(0,o.jsx)(g.Z,{value:15,children:"15"}),(0,o.jsx)(g.Z,{value:20,children:"20"})]})]})]}),(0,o.jsxs)(s.ZP,{item:!0,children:[(0,o.jsx)(R,{name:"n",label:"n",params:n,onChange:me}),"nativo"!==n.modo&&(0,o.jsx)(R,{params:n,name:"semilla",label:"X0",onChange:me}),"nativo"!==n.modo&&(0,o.jsx)(R,{params:n,name:"k",label:"k",onChange:me}),"nativo"!==n.modo&&(0,o.jsx)(R,{params:n,disabled:Boolean(n.k),name:"multiplicativa",label:"a",onChange:me}),"nativo"!==n.modo&&(0,o.jsx)(R,{params:n,name:"g",label:"g",onChange:me}),"nativo"!==n.modo&&(0,o.jsx)(R,{params:n,disabled:Boolean(n.g),name:"modulo",label:"m",onChange:me}),"lineal"===n.modo&&(0,o.jsx)(R,{params:n,name:"aditiva",label:"c",onChange:me})]}),(0,o.jsxs)(s.ZP,{item:!0,children:[(0,o.jsx)(v.Z,{children:(0,o.jsx)(x.Z,{control:(0,o.jsx)(b.Z,{checked:u,onChange:function(e){return w(e.target.checked)}}),label:"Redondear decimales"})}),"multiplicativo"===n.modo&&(0,o.jsx)(v.Z,{children:(0,o.jsx)(x.Z,{control:(0,o.jsx)(b.Z,{checked:oe,onChange:function(e){return ie(e.target.checked)}}),label:"Usar 5 + 8k (por defecto usa 3 + 8k)"})})]})]}),(0,o.jsx)(N.Z,{loading:S,variant:"contained",sx:{mt:1},onClick:ce,children:"Calcular"})]})}),(0,o.jsx)(s.ZP,{item:!0,xs:5,marginTop:2,children:(0,o.jsxs)(s.ZP,{container:!0,spacing:1,direction:"row",children:[(0,o.jsxs)(s.ZP,{item:!0,xs:!0,sx:{textAlign:"center"},children:[(0,o.jsx)(m.Z,{variant:"h5",children:"Tabla de valores"}),(0,o.jsx)(j.Z,{sx:{height:"500px"},children:(0,o.jsx)(c._,_({rows:X||[],columns:F,loading:S,paginationMode:"server",rowCount:T,pageSize:10,rowsPerPageOptions:[5,10,50,100],getRowId:function(e){return e.i},disableColumnFilter:!0,localeText:{noRowsLabel:"No hay datos",columnMenuFilter:"Filtrar",columnMenuHideColumn:"Esconder",columnMenuShowColumns:"Mostrar columnas"},componentsProps:{pagination:{labelRowsPerPage:"Filas por p\xe1gina",labelDisplayedRows:function(e){var n=e.from,t=e.to,r=e.count;e.page;return"".concat(n,"-").concat(t," de ").concat(-1!==r?r:"m\xe1s de ".concat(t))}}}},U,{onPageChange:function(e){return J((function(n){return _({},n,{page:e})}))},onPageSizeChange:function(e){return J((function(n){return _({},n,{pageSize:e})}))}}))})]}),(0,o.jsxs)(s.ZP,{item:!0,xs:!0,sx:{textAlign:"center"},children:[(0,o.jsx)(m.Z,{variant:"h5",children:"Ji-Cuadrada"}),(0,o.jsx)(j.Z,{sx:{height:"500px"},children:(0,o.jsx)(c._,{rows:G||[],loading:S,hideFooterPagination:!0,columns:[{field:"interval",headerName:"Intervalo",width:100},{field:"fo",headerName:"fo",width:100},{field:"fe",headerName:"fe",width:100},{field:"c",headerName:"C",width:100},{field:"acu",headerName:"C (AC)",width:100}],sx:{"& .chi-result":{backgroundColor:"lightgreen",fontWeight:"bold"}},getRowId:function(e){return e.interval},getCellClassName:function(e){return"acu"===e.field&&e.row.i===G.length-1?"chi-result":""}})})]})]})}),(0,o.jsx)(s.ZP,{item:!0,xs:!0,children:(0,o.jsx)(d.Z,{elevation:1,children:(0,o.jsx)(y.$Q,{options:z,data:{labels:W.map((function(e){return"".concat(e.from," - ").concat(e.to)})),datasets:[{barPercentage:1,categoryPercentage:1,label:"fo",backgroundColor:"rgba(255, 99, 132, 0.7)",data:W.map((function(e){return e.items.length}))},{barPercentage:1,categoryPercentage:1,label:"fe",backgroundColor:"rgba(53, 162, 235, 0.3)",data:W.map((function(){return n.n/W.length}))}]}})})})]})}}},function(e){e.O(0,[570,571,774,888,179],(function(){return n=8581,e(e.s=n);var n}));var n=e.O();_N_E=n}]);