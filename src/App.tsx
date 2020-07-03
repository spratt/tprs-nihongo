import React from 'react';
import styled from 'styled-components';
import yaml from 'js-yaml';
import YouTube from 'react-youtube';
import * as wanakana from 'wanakana';

import {KanjiDic} from './KanjiDic';
import xhr from './http';
import data from './data/data.yaml';

const Container = styled.div`
  @media screen and (min-width: 60rem) {
  width: 60rem;
  margin: 0 auto;
  }
`;

const ListenContainer = styled.span``;

const Title = styled.h1`
  padding-left: 1rem;
  font-size: 1.5em;
  color: orangered;
`;

const BigButton = styled.button`
  font-size: 2rem;
  width: 100%;
`;

// @types/youtube won't let me refer to their const enum PlayerState
// directly, so I have to recreate its values here
//const PlayerStateUnstarted = -1;
//const PlayerStateEnded = 0;
const PlayerStatePlaying = 1;
//const PlayerStatePaused = 2;
//const PlayerStateBuffering = 3;
//const PlayerStateCued = 4;

interface AppState {
  player?: YT.Player;
  src: string;
  stopTimes: number[];
  timer?: any;

  lastListenResults: string[];
};

class App extends React.Component<{},AppState> {
  private recognition?: any;
  private kanjiDic = new KanjiDic();

  constructor(props: {}) {
    super(props);
    console.log('new App()');

    // Start async get call
    xhr('GET', data).then((req) => {
      yaml.load(req.response);
      // TODO
    }).catch((err) => console.error(err));

    

    this.state = {
      src: 'FsiAxc5T23g',
      stopTimes: [165, 178],
      lastListenResults: [],
    };

    const anyWindow: any = window;
    if (anyWindow.SpeechRecognition || anyWindow.webkitSpeechRecognition ||
        anyWindow.mozSpeechRecognition || anyWindow.msSpeechRecognition) {
      this.recognition = new (anyWindow.SpeechRecognition || anyWindow.webkitSpeechRecognition ||
                              anyWindow.mozSpeechRecognition || anyWindow.msSpeechRecognition)();
      this.recognition.lang = 'ja-JP';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 5;

      this.recognition.onresult = (event: SpeechRecognitionEvent) => this.listenCallback(event);
    }
  }

  play() {
    this.state.player?.playVideo();
    this.forceUpdate();
  }

  pause() {
    this.state.player?.pauseVideo();
    this.forceUpdate();
  }

  listenCallback(event: SpeechRecognitionEvent) {
    console.log('listenCallback');
    console.dir(event);
    if (event.results.length > 0) {
      const listenResults = Array.from(event.results[0]).map((x: any) => {
        const transcript = x.transcript;

        const tokens = wanakana.tokenize(transcript);
        console.dir(tokens);
        const kanji_tokens = tokens.map((token) => {
          if (wanakana.isKanji(token)) {
            const kanji = this.kanjiDic.getKanji(token);
            if (kanji) return kanji;
          }
          return token;
        });
        kanji_tokens.forEach(console.dir);

        return transcript;
      });
      this.setState({
        src: this.state.src,
        stopTimes: this.state.stopTimes,
        lastListenResults: listenResults,
      });
    }
  }

  listen() {
    this.recognition.start();
  }

  getNextStopTime() {
    let time = this.state.player?.getCurrentTime() || 0;
    let maxTime = this.state.player?.getDuration() || 0;
    for (let stopTime of this.state.stopTimes) {
      if (time < stopTime) {
        return stopTime;
      }
    }
    return maxTime;
  }

  onPlayerStateChange(event: YT.OnStateChangeEvent) {
    if (this.state.timer) {
      clearTimeout(this.state.timer);
    }
    if (event.data === PlayerStatePlaying) {
      let time = this.state.player?.getCurrentTime() || 0;
      let nextStop = this.getNextStopTime();
      // Add .4 of a second to the time in case it's close to the current time
      // (The API kept returning ~9.7 when hitting play after stopping at 10s)
      if (time + .4 < nextStop) {
        let rate = this.state.player?.getPlaybackRate() || 1;
        let remainingTime = (nextStop - time) / rate;
        this.setState({
          src: this.state.src,
          stopTimes: this.state.stopTimes,
          timer: setTimeout(() => this.pause(), remainingTime * 1000),
        });
      }
    } else {
      this.setState({
        timer: null,
      });
    }
  }

  onPlayerReady(event: YT.PlayerEvent) {
    this.setState({player: event.target});
  }

  renderContinueButton() {
    let label = 'Continue ->';
    let onClick = () => this.play();
    if (this.state.player?.getPlayerState() === PlayerStatePlaying) {
      label = 'Pause ||';
      onClick = () => this.pause();
    }
    return (
      <BigButton onClick={onClick}>
        { label }
      </BigButton>
    );
  }

  renderListener() {
    const empty = (<span></span>);
    if (!this.recognition) {
      return empty;
    }
    let lastResults = empty;
    if (this.state.lastListenResults.length === 1) {
      lastResults = (
        <p>
        { this.state.lastListenResults[0] }
        </p>
      );
    } else if (this.state.lastListenResults.length > 1) {
      const listItems = Array.from(this.state.lastListenResults).map((s: string) => (
        <li key={s}>{s}</li>
      ));
      lastResults = (
        <ol>{ listItems }</ol>
      );
    }
    return (
      <ListenContainer>
        <BigButton onClick={() => this.listen() }>
          Listen
        </BigButton>
        { lastResults }
      </ListenContainer>
    );    
  }

  render() {
    const zero: 0 | 1 | undefined = 0;
    const opts = {
      width: '960',
      height: '473',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: zero,
        // TODO: In the final build, uncomment the next line
        //controls: zero,
        start: 70,
      },
    };

    return (
      <Container>
        <header>
          <Title>
            T.P.R.S. 日本語
          </Title>
        </header>
        <YouTube videoId={this.state.src} opts={opts}
                 onStateChange={(event: YT.OnStateChangeEvent) => this.onPlayerStateChange(event) }
                 onReady={(event: YT.PlayerEvent) => this.onPlayerReady(event)} />
        { this.renderContinueButton() }
        { this.renderListener() }
      </Container>
    );
  }
}

export default App;
