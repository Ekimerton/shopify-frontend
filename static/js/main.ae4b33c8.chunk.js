(this["webpackJsonpshopify-frontend"]=this["webpackJsonpshopify-frontend"]||[]).push([[0],{113:function(e,t,n){},115:function(e,t,n){},148:function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),c=n(22),s=n.n(c),r=(n(113),n(114),n(83)),a=n(45),l=(n(115),n(154)),j=n(152),d=n(106),b=n(107),u=n(155),m=n(153),h=n(96),p=n.n(h),O=n(15);n(134).config();var f=l.a.Step,y=j.a.Meta;var x=function(){var e=Object(i.useState)(!1),t=Object(a.a)(e,2),n=t[0],o=t[1],c=Object(i.useState)(""),s=Object(a.a)(c,2),h=s[0],x=s[1],g=Object(i.useState)([]),S=Object(a.a)(g,2),v=S[0],w=S[1],C=E("nominated",{}),N=Object(a.a)(C,2),k=N[0],I=N[1],A=E("nominatedCount",0),T=Object(a.a)(A,2),Y=T[0],z=T[1];function E(e,t){var n=Object(i.useState)((function(){return JSON.parse(localStorage.getItem(e))||t})),o=Object(a.a)(n,2),c=o[0],s=o[1];return Object(i.useEffect)((function(){localStorage.setItem(e,JSON.stringify(c))}),[e,c]),[c,s]}function D(e){var t=e.body.imdbID in k;return Object(O.jsx)(j.a,{style:{width:200},cover:Object(O.jsx)("img",{alt:"missing poster",src:e.body.Poster,height:250}),actions:[Object(O.jsx)(b.a,{type:"primary",disabled:t||Y>=5,onClick:function(){return e.onClick(e.body)},children:"Nominate"})],children:Object(O.jsx)(y,{title:e.body.Title,description:e.body.Year})})}function J(e){return Object(O.jsx)(j.a,{style:{width:200},cover:Object(O.jsx)("img",{alt:"missing poster",src:e.body.Poster,height:250}),actions:[Object(O.jsx)(b.a,{type:"primary",onClick:function(){return e.onClick(e.body)},children:"Remove"})],children:Object(O.jsx)(y,{title:e.body.Title,description:e.body.Year})})}Object(i.useEffect)((function(){o(!0),p.a.get("https://www.omdbapi.com",{params:{apikey:"461330f7",type:"movie",s:h}}).then((function(e){"False"!==e.data.Response?w(e.data.Search):w([]),o(!1)})).catch((function(e){w([]),o(!1)}))}),[h]);var M=function(e){var t=Object(r.a)({},k);t[e.imdbID]=e,I(t),Y>=4&&d.a.success({message:"Nominations Complete",description:"You have successfully nominated five movies! Scroll down to adjust nominations or share final picks."}),z(Y+1)},R=function(e){var t=Object(r.a)({},k);delete t[e.imdbID],I(t),z(Y-1)};return Object(O.jsx)("div",{children:Object(O.jsxs)("body",{className:"App-body",children:[Object(O.jsxs)(j.a,{className:"App-compartment",title:"The Shoppies",headStyle:{fontSize:24,textAlign:"center"},children:[Object(O.jsx)("p",{children:" Hello, this is my entry in the shoppy awards. To use this service, either use the search component to look for films, or the nominations component to manage nominations. Your nominations will persist as you come and go from the site. "}),Object(O.jsxs)(l.a,{size:"small",current:function(){switch(Y){case 0:return 0;case 5:return 2;default:return 1}}(),children:[Object(O.jsx)(f,{title:"Search OMDB"}),Object(O.jsx)(f,{title:5===Y?"Nominations Complete!":5-Y+" Nominations Left"}),Object(O.jsx)(f,{title:"Evaluate Picks and Share"})]})]}),Object(O.jsxs)(j.a,{className:"App-compartment",title:"Search",headStyle:{fontSize:24,textAlign:"center"},children:[Object(O.jsx)("h3",{children:" Movie Title:"}),Object(O.jsx)(u.a,{placeholder:"Enter movie title here!",loading:n,allowClear:!0,size:"large",value:h,onChange:function(e){return x(e.target.value)},style:{marginBottom:20}}),""!==h&&!n&&Object(O.jsxs)("h3",{children:["Showing results for: ",h]}),Object(O.jsx)(m.b,{grid:{gutter:16},style:{width:"100%",justifyContent:"center"},dataSource:v,loading:n,locale:{emptyText:""===h?"Your Search Results Go Here!":"No Search Results"},renderItem:function(e){return Object(O.jsx)(m.b.Item,{children:Object(O.jsx)(D,{body:e,onClick:M})})}})]}),Object(O.jsx)(j.a,{className:"App-compartment",title:"Nominations",headStyle:{fontSize:24,textAlign:"center",justifyContent:"center",alignItems:"center"},children:Object(O.jsx)(m.b,{grid:{gutter:16},locale:{emptyText:"Your Nominations Go Here!"},dataSource:Object.entries(k),renderItem:function(e){return Object(O.jsx)(m.b.Item,{children:Object(O.jsx)(J,{body:e[1],onClick:R})})}})})]})})};s.a.render(Object(O.jsx)(o.a.StrictMode,{children:Object(O.jsx)(x,{})}),document.getElementById("root"))}},[[148,1,2]]]);
//# sourceMappingURL=main.ae4b33c8.chunk.js.map