(this["webpackJsonptprs-nihongo"]=this["webpackJsonptprs-nihongo"]||[]).push([[0],{28:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_0.02ab68d4.yaml"},29:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_1.e66cd891.yaml"},30:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_2.93d75634.yaml"},31:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_3.6fcd9b2c.yaml"},32:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_4.1bddbbb0.yaml"},33:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_5.3f1c5526.yaml"},34:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_6.5ac50b4d.yaml"},35:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_7.1fd2d205.yaml"},36:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_8.338edfbd.yaml"},37:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_9.f2417162.yaml"},38:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_10.e9781bfc.yaml"},39:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_11.9f275a4f.yaml"},40:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_12.d4403ff5.yaml"},41:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_13.ef2cddef.yaml"},42:function(t,e,n){t.exports=n.p+"static/media/kanjidic2_indexed_14.3654ae15.yaml"},46:function(t,e,n){t.exports=n.p+"static/media/data.7afd0079.yaml"},50:function(t,e,n){t.exports=n(96)},55:function(t,e,n){},96:function(t,e,n){"use strict";n.r(e);var i=n(0),a=n.n(i),r=n(23),s=n.n(r),o=(n(55),n(48)),c=n(8),u=n(3),l=n(49),d=n(47),f=n(4),h=n(5),m=n(12),p=n.n(m),v=n(24),y=function(){function t(e){Object(c.a)(this,t),this.recognition=void 0,this.isStarted=void 0;var n=window;this.recognition=new(n.SpeechRecognition||n.webkitSpeechRecognition||n.mozSpeechRecognition||n.msSpeechRecognition),this.recognition.lang="ja-JP",this.recognition.interimResults=!1,this.recognition.maxAlternatives=5,this.recognition.onresult=e,this.isStarted=!1}return Object(u.a)(t,null,[{key:"isPossible",value:function(){var t=window;return t.SpeechRecognition||t.webkitSpeechRecognition||t.mozSpeechRecognition||t.msSpeechRecognition}}]),Object(u.a)(t,[{key:"start",value:function(){this.isStarted?(this.isStarted=!1,this.recognition.stop()):(this.isStarted=!0,this.recognition.start())}},{key:"hasStarted",value:function(){return this.isStarted}}]),t}(),g=n(16),k=n(27);function j(t,e){return new Promise((function(n,i){var a=new XMLHttpRequest;a.withCredentials=!0,a.addEventListener("load",(function(){200===a.status?n(a):i(a)})),a.addEventListener("error",(function(){i(a)})),a.addEventListener("abort",(function(){i(a)})),a.open(t,e),a.send()}))}var b=n(28),x=n.n(b),_=n(29),S=n.n(_),E=n(30),w=n.n(E),L=n(31),R=n.n(L),T=n(32),C=n.n(T),O=n(33),P=n.n(O),z=n(34),A=n.n(z),B=n(35),D=n.n(B),J=n(36),V=n.n(J),G=n(37),I=n.n(G),M=n(38),N=n.n(M),U=n(39),W=n.n(U),q=n(40),F=n.n(q),H=n(41),K=n.n(H),X=n(42),$=n.n(X);function Q(){var t=Object(f.a)(["\n  font-size: 2rem;\n"]);return Q=function(){return t},t}var Y=[x.a,S.a,w.a,R.a,C.a,P.a,A.a,D.a,V.a,I.a,N.a,W.a,F.a,K.a,$.a],Z=h.a.span(Q());function tt(t){var e=k.groupBy(t.dicEntry.reading_meaning.rmgroup.reading,"typ"),n=t.dicEntry.literal;return e.ja_kun.length>0?n=e.ja_kun[0].text:e.ja_on.length>0&&(n=e.ja_on[0].text),a.a.createElement(Z,null,a.a.createElement("ruby",null,t.dicEntry.literal,a.a.createElement("rt",null,n)))}var et=function(){function t(){var e=this;Object(c.a)(this,t),this.data={},Y.forEach((function(t){j("GET",t).then((function(t){var n=p.a.load(t.response);Object.keys(n).forEach((function(t){return e.data[t]=n[t]}))})).catch((function(e){return console.error("Error loading ".concat(t),e)}))}))}return Object(u.a)(t,[{key:"lookup",value:function(t){return this.data[t]}},{key:"renderString",value:function(t){var e=this.lookup(t);return e?a.a.createElement(tt,{dicEntry:e}):a.a.createElement(Z,null,t)}},{key:"makePhrase",value:function(t){var e=this;return g.tokenize(t).map((function(t){return g.isKanji(t)?Array.from(t).map((function(t){return e.renderString(t)})):a.a.createElement(Z,null,t)})).flat()}}]),t}(),nt=n(46),it=n.n(nt);function at(){var t=Object(f.a)(["\n  font-size: 2rem;\n  width: 100%;\n"]);return at=function(){return t},t}function rt(){var t=Object(f.a)(["\n  padding-left: 1rem;\n  font-size: 1.5em;\n  color: orangered;\n"]);return rt=function(){return t},t}function st(){var t=Object(f.a)([""]);return st=function(){return t},t}function ot(){var t=Object(f.a)(["\n  @media screen and (min-width: 60rem) {\n  width: 60rem;\n  margin: 0 auto;\n  }\n"]);return ot=function(){return t},t}var ct=h.a.div(ot()),ut=h.a.span(st()),lt=h.a.h1(rt()),dt=h.a.button(at()),ft=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).recognizer=void 0,i.kanjiDic=new et,console.log("new App()"),j("GET",it.a).then((function(t){p.a.load(t.response)})).catch((function(t){return console.error(t)})),i.state={src:"FsiAxc5T23g",stopTimes:[165,178],isListening:!1,lastListenResults:[]},y.isPossible()&&(i.recognizer=new y((function(t){return i.listenCallback(t)}))),i}return Object(u.a)(n,[{key:"play",value:function(){var t;null===(t=this.state.player)||void 0===t||t.playVideo(),this.forceUpdate()}},{key:"pause",value:function(){var t;null===(t=this.state.player)||void 0===t||t.pauseVideo(),this.forceUpdate()}},{key:"setLastListenResults",value:function(t){this.setState({src:this.state.src,stopTimes:this.state.stopTimes,isListening:this.state.isListening,lastListenResults:t})}},{key:"listenCallback",value:function(t){if(console.log("listenCallback"),console.dir(t),t.results.length>0){var e=Array.from(t.results[0]).map((function(t){return t.transcript}));this.setLastListenResults(e)}}},{key:"listen",value:function(){var t,e;null===(t=this.recognizer)||void 0===t||t.start(),this.setState({src:this.state.src,stopTimes:this.state.stopTimes,isListening:(null===(e=this.recognizer)||void 0===e?void 0:e.hasStarted())||!1,lastListenResults:this.state.lastListenResults})}},{key:"getNextStopTime",value:function(){var t,e,n,i=(null===(t=this.state.player)||void 0===t?void 0:t.getCurrentTime())||0,a=(null===(e=this.state.player)||void 0===e?void 0:e.getDuration())||0,r=Object(o.a)(this.state.stopTimes);try{for(r.s();!(n=r.n()).done;){var s=n.value;if(i<s)return s}}catch(c){r.e(c)}finally{r.f()}return a}},{key:"onPlayerStateChange",value:function(t){var e=this;if(this.state.timer&&clearTimeout(this.state.timer),1===t.data){var n,i=(null===(n=this.state.player)||void 0===n?void 0:n.getCurrentTime())||0,a=this.getNextStopTime();if(i+.4<a){var r,s=(a-i)/((null===(r=this.state.player)||void 0===r?void 0:r.getPlaybackRate())||1);this.setState({src:this.state.src,stopTimes:this.state.stopTimes,timer:setTimeout((function(){return e.pause()}),1e3*s)})}}else this.setState({timer:null})}},{key:"onPlayerReady",value:function(t){this.setState({player:t.target})}},{key:"renderContinueButton",value:function(){var t,e=this,n="Continue ->",i=function(){return e.play()};return 1===(null===(t=this.state.player)||void 0===t?void 0:t.getPlayerState())&&(n="Pause ||",i=function(){return e.pause()}),a.a.createElement(dt,{onClick:i},n)}},{key:"renderListener",value:function(){var t=this;if(!this.recognizer)return a.a.createElement("span",null);var e=this.state.lastListenResults.map((function(e){return a.a.createElement(dt,{key:e,onClick:function(){return t.setLastListenResults([e])}},t.kanjiDic.makePhrase(e))})),n=this.recognizer.hasStarted()?"Stop Listening":"Start Listening";return a.a.createElement(ut,null,a.a.createElement(dt,{onClick:function(){return t.listen()}},n),e)}},{key:"render",value:function(){var t=this,e={width:"960",height:"473",playerVars:{autoplay:0,start:70}};return a.a.createElement(ct,null,a.a.createElement("header",null,a.a.createElement(lt,null,"T.P.R.S. \u65e5\u672c\u8a9e")),a.a.createElement(v.a,{videoId:this.state.src,opts:e,onStateChange:function(e){return t.onPlayerStateChange(e)},onReady:function(e){return t.onPlayerReady(e)}}),this.renderContinueButton(),this.renderListener())}}]),n}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(ft,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[50,1,2]]]);
//# sourceMappingURL=main.4595818d.chunk.js.map