(this.webpackJsonpsudoku=this.webpackJsonpsudoku||[]).push([[0],{10:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var c=n(1),i=n.n(c),r=n(4),a=n.n(r),o=(n(9),n(2)),s=(n(10),n(0));function u(e){var t="";switch(e.gameState){case"incomplete":t="Your game is: incomplete :s";break;case"incorrect":t="Your game is: incorrect :(";break;case"correct":t="Your game is: solved :D"}return Object(s.jsx)("div",{className:"gameState",children:t})}function l(e){var t=Math.pow(e.n,2),n=e.n,r=(e.setGrid,e.grid,[]),a=e.changeCell,u=Object(c.useState)(-1),l=Object(o.a)(u,2),d=l[0],f=l[1],h=Object(c.useState)(-1),g=Object(o.a)(h,2),p=g[0],j=g[1];function b(t){var n=parseInt(t.target.getAttribute("data-row")),c=parseInt(t.target.getAttribute("data-col"));0===e.originalGrid[n][c]&&(f(n),j(c))}var O=function(t){var c=t.which;console.log(c);switch(c){case 37:t.preventDefault(),j(Math.max(0,p-1));break;case 39:t.preventDefault(),j(Math.min(n*n-1,p+1));break;case 38:t.preventDefault(),f(Math.max(0,d-1));break;case 40:t.preventDefault(),f(Math.min(n*n-1,d+1));break;case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 8:case 46:0===e.originalGrid[d][p]&&(c>=49&&c<=57?a(d,p,c-48):8!==c&&46!==c||a(d,p,0));break;default:return}};i.a.useEffect((function(){return window.addEventListener("keydown",O),function(){window.removeEventListener("keydown",O)}}),[p,d]),i.a.useEffect((function(){f(-1),j(-1)}),[e.originalGrid]);for(var m=0;m<t;m++){for(var v=[],G=0;G<t;G++){var x=m*t+G,w=0===m,N=m===t-1,S=0===G,k=G===t-1,C=!w&&m%n===0,E=!N&&(m+1)%n===0,y=!S&&G%n===0,z=!k&&(G+1)%n===0,J=0!==e.originalGrid[m][G],M=m===d&&G===p,D=e.grid[m][G]<0,A=Math.abs(e.grid[m][G]);v.push(Object(s.jsxs)("div",{"data-row":m,"data-col":G,className:"cell ".concat(w?"top":""," ").concat(N?"bottom":""," ").concat(S?"left":""," ").concat(k?"right":"","\n                                                ").concat(C?"miniTop":""," ").concat(E?"miniBottom":"","\n                                                ").concat(y?"miniLeft":""," ").concat(z?"miniRight":"","\n                                                ").concat(J?"originalCell":""," ").concat(M?"activeCell":"","\n                                                ").concat(D?"oldCell":""),onMouseDown:b,children:[" ",0!==A?A:""," "]},x.toString()))}r.push(Object(s.jsx)("div",{className:"row",children:v},m.toString()))}return Object(s.jsx)("div",{className:"grid",children:r})}function d(e){var t=e.setGrid,n=e.setOriginalGrid,c=e.setN;return Object(s.jsx)("button",{onClick:function(e){fetch("/api/new_puzzle").then((function(e){return e.text()})).then((function(e){return JSON.parse(e)})).then((function(e){console.log(e.grid),n(e.grid),t(e.grid),c(e.n)}))},children:"New Game"})}function f(e){e.setGrid;var t=e.originalGrid,n=e.changeCell;return Object(s.jsx)("button",{onClick:function(e){fetch("/api/solve_puzzle",{method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({grid:t})}).then((function(e){return e.text()})).then((function(e){return JSON.parse(e)})).then((function(e){var t=e.history,c=0;0===t[2]&&console.log("here"),t.forEach((function(e){setTimeout((function(){0===e[2]&&console.log("here"),n(e[0],e[1],e[2])}),c),c+=100})),console.log(t)}))},children:"Solve Game"})}function h(e){return Object(s.jsxs)("div",{className:"bottomBar",children:[Object(s.jsx)(d,{setGrid:e.setGrid,setOriginalGrid:e.setOriginalGrid,setN:e.setN}),Object(s.jsx)(f,{setGrid:e.setGrid,originalGrid:e.originalGrid,changeCell:e.changeCell})]})}var g=function(){var e=Object(c.useState)([]),t=Object(o.a)(e,2),n=t[0],i=t[1],r=Object(c.useState)([]),a=Object(o.a)(r,2),d=a[0],f=a[1],g=Object(c.useState)(0),p=Object(o.a)(g,2),j=p[0],b=p[1],O=Object(c.useState)("incomplete"),m=Object(o.a)(O,2),v=m[0],G=m[1];function x(e,t,n){f((function(c){var i=[];return c.forEach((function(e){var t=[];e.forEach((function(e){t.push(e)})),i.push(t)})),i[e][t]=n,i}))}return Object(c.useEffect)((function(){fetch("/api/new_puzzle").then((function(e){return e.text()})).then((function(e){return JSON.parse(e)})).then((function(e){console.log(e.grid),i(e.grid),f(e.grid),b(e.n)}))}),[]),Object(c.useEffect)((function(){var e=d.length>0;d.forEach((function(t){t.forEach((function(t){0===t&&(e=!1)}))})),e?fetch("/api/check_puzzle",{method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({grid:d})}).then((function(e){return e.text()})).then((function(e){return JSON.parse(e)})).then((function(e){G(e.status)})):G("incomplete"),console.log(v)}),[d]),Object(s.jsx)("div",{className:"App",children:Object(s.jsxs)("div",{className:"gridHolder",children:[Object(s.jsx)(u,{gameState:v}),Object(s.jsx)(l,{originalGrid:n,grid:d,n:j,setGrid:f,changeCell:x}),Object(s.jsx)(h,{setGrid:f,setOriginalGrid:i,setN:b,originalGrid:n,changeCell:x})]})})};a.a.render(Object(s.jsx)(g,{}),document.getElementById("root"))},9:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.e3e982d4.chunk.js.map