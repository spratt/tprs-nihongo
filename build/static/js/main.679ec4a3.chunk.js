(this["webpackJsonptprs-nihongo"]=this["webpackJsonptprs-nihongo"]||[]).push([[0],{27:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_0.02ab68d4.yaml"},28:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_1.e66cd891.yaml"},29:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_2.93d75634.yaml"},30:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_3.6fcd9b2c.yaml"},31:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_4.1bddbbb0.yaml"},32:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_5.3f1c5526.yaml"},33:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_6.5ac50b4d.yaml"},34:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_7.1fd2d205.yaml"},35:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_8.338edfbd.yaml"},36:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_9.f2417162.yaml"},37:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_10.e9781bfc.yaml"},38:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_11.9f275a4f.yaml"},39:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_12.d4403ff5.yaml"},40:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_13.ef2cddef.yaml"},41:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_14.3654ae15.yaml"},42:function(t,e,n){t.exports=n.p+"static/media/data.7afd0079.yaml"},49:function(t,e,n){t.exports=n(94)},54:function(t,e,n){},94:function(t,e,n){"use strict";n.r(e);var i=n(0),a=n.n(i),r=n(23),o=n.n(r),s=(n(54),n(47)),c=n(3),u=n(4),l=n(48),d=n(46),f=n(9),h=n(10),p=n(12),m=n.n(p),v=n(24),y=n(15),g=function(){function t(e){Object(c.a)(this,t),this.recognition=void 0;var n=window;this.recognition=new(n.SpeechRecognition||n.webkitSpeechRecognition||n.mozSpeechRecognition||n.msSpeechRecognition),this.recognition.lang="ja-JP",this.recognition.interimResults=!1,this.recognition.maxAlternatives=5,this.recognition.onresult=e}return Object(u.a)(t,null,[{key:"isPossible",value:function(){var t=window;return t.SpeechRecognition||t.webkitSpeechRecognition||t.mozSpeechRecognition||t.msSpeechRecognition}}]),Object(u.a)(t,[{key:"start",value:function(){this.recognition.start()}}]),t}();function k(t,e){return new Promise((function(n,i){var a=new XMLHttpRequest;a.withCredentials=!0,a.addEventListener("load",(function(){200===a.status?n(a):i(a)})),a.addEventListener("error",(function(){i(a)})),a.addEventListener("abort",(function(){i(a)})),a.open(t,e),a.send()}))}var b=n(27),j=n.n(b),x=n(28),_=n.n(x),w=n(29),E=n.n(w),R=n(30),S=n.n(R),O=n(31),T=n.n(O),C=n(32),L=n.n(C),P=n(33),z=n.n(P),A=n(34),B=n.n(A),D=n(35),J=n.n(D),K=n(36),V=n.n(K),G=n(37),I=n.n(G),M=n(38),N=n.n(M),U=n(39),W=n.n(U),q=n(40),F=n.n(q),H=n(41),X=n.n(H),$=[j.a,_.a,E.a,S.a,T.a,L.a,z.a,B.a,J.a,V.a,I.a,N.a,W.a,F.a,X.a],Q=function t(e,n){Object(c.a)(this,t),this.literal=void 0,this.dicEntry=void 0,this.literal=e,this.dicEntry=n},Y=function(){function t(){var e=this;Object(c.a)(this,t),this.data={},$.forEach((function(t){k("GET",t).then((function(t){var n=m.a.load(t.response);Object.keys(n).forEach((function(t){return e.data[t]=n[t]}))})).catch((function(e){return console.error("Error loading ".concat(t),e)}))}))}return Object(u.a)(t,[{key:"lookup",value:function(t){return this.data[t]}},{key:"getKanji",value:function(t){var e=this.lookup(t);if(e)return new Q(t,e)}}]),t}(),Z=n(42),tt=n.n(Z);function et(){var t=Object(f.a)(["\n  font-size: 2rem;\n  width: 100%;\n"]);return et=function(){return t},t}function nt(){var t=Object(f.a)(["\n  padding-left: 1rem;\n  font-size: 1.5em;\n  color: orangered;\n"]);return nt=function(){return t},t}function it(){var t=Object(f.a)([""]);return it=function(){return t},t}function at(){var t=Object(f.a)(["\n  @media screen and (min-width: 60rem) {\n  width: 60rem;\n  margin: 0 auto;\n  }\n"]);return at=function(){return t},t}var rt=h.a.div(at()),ot=h.a.span(it()),st=h.a.h1(nt()),ct=h.a.button(et()),ut=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).recognizer=void 0,i.kanjiDic=new Y,console.log("new App()"),k("GET",tt.a).then((function(t){m.a.load(t.response)})).catch((function(t){return console.error(t)})),i.state={src:"FsiAxc5T23g",stopTimes:[165,178],lastListenResults:[]},g.isPossible()&&(i.recognizer=new g((function(t){return i.listenCallback(t)}))),i}return Object(u.a)(n,[{key:"play",value:function(){var t;null===(t=this.state.player)||void 0===t||t.playVideo(),this.forceUpdate()}},{key:"pause",value:function(){var t;null===(t=this.state.player)||void 0===t||t.pauseVideo(),this.forceUpdate()}},{key:"listenCallback",value:function(t){var e=this;if(console.log("listenCallback"),console.dir(t),t.results.length>0){var n=Array.from(t.results[0]).map((function(t){var n=t.transcript,i=y.tokenize(n);return console.dir(i),i.map((function(t){if(y.isKanji(t)){var n=e.kanjiDic.getKanji(t);if(n)return n}return t})).forEach(console.dir),n}));this.setState({src:this.state.src,stopTimes:this.state.stopTimes,lastListenResults:n})}}},{key:"listen",value:function(){var t;null===(t=this.recognizer)||void 0===t||t.start()}},{key:"getNextStopTime",value:function(){var t,e,n,i=(null===(t=this.state.player)||void 0===t?void 0:t.getCurrentTime())||0,a=(null===(e=this.state.player)||void 0===e?void 0:e.getDuration())||0,r=Object(s.a)(this.state.stopTimes);try{for(r.s();!(n=r.n()).done;){var o=n.value;if(i<o)return o}}catch(c){r.e(c)}finally{r.f()}return a}},{key:"onPlayerStateChange",value:function(t){var e=this;if(this.state.timer&&clearTimeout(this.state.timer),1===t.data){var n,i=(null===(n=this.state.player)||void 0===n?void 0:n.getCurrentTime())||0,a=this.getNextStopTime();if(i+.4<a){var r,o=(a-i)/((null===(r=this.state.player)||void 0===r?void 0:r.getPlaybackRate())||1);this.setState({src:this.state.src,stopTimes:this.state.stopTimes,timer:setTimeout((function(){return e.pause()}),1e3*o)})}}else this.setState({timer:null})}},{key:"onPlayerReady",value:function(t){this.setState({player:t.target})}},{key:"renderContinueButton",value:function(){var t,e=this,n="Continue ->",i=function(){return e.play()};return 1===(null===(t=this.state.player)||void 0===t?void 0:t.getPlayerState())&&(n="Pause ||",i=function(){return e.pause()}),a.a.createElement(ct,{onClick:i},n)}},{key:"renderListener",value:function(){var t=this,e=a.a.createElement("span",null);if(!this.recognizer)return e;var n=e;if(1===this.state.lastListenResults.length)n=a.a.createElement("p",null,this.state.lastListenResults[0]);else if(this.state.lastListenResults.length>1){var i=Array.from(this.state.lastListenResults).map((function(t){return a.a.createElement("li",{key:t},t)}));n=a.a.createElement("ol",null,i)}return a.a.createElement(ot,null,a.a.createElement(ct,{onClick:function(){return t.listen()}},"Listen"),n)}},{key:"render",value:function(){var t=this,e={width:"960",height:"473",playerVars:{autoplay:0,start:70}};return a.a.createElement(rt,null,a.a.createElement("header",null,a.a.createElement(st,null,"T.P.R.S. \u65e5\u672c\u8a9e")),a.a.createElement(v.a,{videoId:this.state.src,opts:e,onStateChange:function(e){return t.onPlayerStateChange(e)},onReady:function(e){return t.onPlayerReady(e)}}),this.renderContinueButton(),this.renderListener())}}]),n}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(ut,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[49,1,2]]]);
//# sourceMappingURL=main.679ec4a3.chunk.js.map