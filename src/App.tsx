import React from 'react';
import styled from 'styled-components';
import yaml from 'js-yaml';
import YouTube from 'react-youtube';

import {SpeechRecognizer} from './SpeechRecognizer';
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

const HalfButton = styled.button`
  font-size: 2rem;
  width: 50%;
`;

// @types/youtube won't let me refer to their const enum PlayerState
// directly, so I have to recreate its values here
//const PlayerStateUnstarted = -1;
//const PlayerStateEnded = 0;
const PlayerStatePlaying = 1;
//const PlayerStatePaused = 2;
//const PlayerStateBuffering = 3;
//const PlayerStateCued = 4;

interface Video {
  series: string;
  lesson: number;
  name: string;
  author: string;
  src: string;
  startTime: number;
  stopTimes: number[];
}

const firstVideo = {
  series: 'Complete Beginners',
  lesson: 1,
  name: 'Chickens and Names',
  author: 'Japanese Immersion with Asami',
  src: 'FsiAxc5T23g',
  startTime: 70,
  stopTimes: [
    165,
    178
  ]
};

interface Data {
  videos: Video[];
}

interface AppState {
  player?: YT.Player;
  timer?: any;
  video: number;
  data: Data;

  isListening: boolean;
  lastListenResults: string[];
};

export default class App extends React.Component<{},AppState> {
  private recognizer?: SpeechRecognizer;
  private kanjiDic = new KanjiDic();
  private mounted: boolean = false;

  constructor(props: {}) {
    super(props);
    console.log('new App()');

    // Start async get call
    xhr('GET', data).then((req) => {
      const data = yaml.load(req.response);
      if (this.mounted) {
        this.setState({data:data});
      } else {
        this.state = {
          video: 0,
          data: data,
          isListening: false,
          lastListenResults: [],
        };
      }
    }).catch((err) => console.error(err));

    this.state = {
      video: 0,
      data: {
        videos: [firstVideo],
      },
      isListening: false,
      lastListenResults: [],
    };

    if (SpeechRecognizer.isPossible()) {
      this.recognizer = new SpeechRecognizer((event) => this.listenCallback(event));
    }
  }

  componentDidMount() {
    this.mounted = true;
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
    if (event.results.length > 0) {
      const listenResults = Array.from(event.results[0]).map((x: SpeechRecognitionAlternative) => {
        return x.transcript;
      });
      this.setState({lastListenResults: listenResults});
    }
  }

  listen() {
    this.recognizer?.start();
    this.setState({isListening: this.recognizer?.hasStarted() || false});
  }

  getNextStopTime() {
    const time = this.state.player?.getCurrentTime() || 0;
    const maxTime = this.state.player?.getDuration() || 0;
    const video = this.state.data.videos[this.state.video] || firstVideo;
    for (let stopTime of video.stopTimes) {
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
      const time = this.state.player?.getCurrentTime() || 0;
      const nextStop = this.getNextStopTime();
      // Add .4 of a second to the time in case it's close to the current time
      // (The API kept returning ~9.7 when hitting play after stopping at 10s)
      if (time + .4 < nextStop) {
        const rate = this.state.player?.getPlaybackRate() || 1;
        const remainingTime = (nextStop - time) / rate;
        this.setState({timer: setTimeout(() => this.pause(), remainingTime * 1000)});
      }
    } else {
      this.setState({timer: null});
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
    if (!this.recognizer) {
      return (<span></span>);
    }
    const phrases = this.state.lastListenResults.map((phrase) => {
      return (
        <BigButton key={phrase} onClick={() => this.setState({lastListenResults:[phrase]})}>
          { this.kanjiDic.makePhrase(phrase) }
        </BigButton>
      );
    });
    const listenLabel = this.recognizer.hasStarted() ?
                        'Stop Listening' : 'Start Listening';
    return (
      <ListenContainer>
        <BigButton onClick={() => this.listen() }>
          { listenLabel }
        </BigButton>
        { phrases }
      </ListenContainer>
    );    
  }

  prevVideo() {
    if (this.state.video - 1 < 0) return;
    this.setState({video: this.state.video - 1});
  }

  nextVideo() {
    if (this.state.video + 1 >= this.state.data.videos.length) return;
    this.setState({video: this.state.video + 1});
  }

  render() {
    const zero: 0 | 1 | undefined = 0;
    const video = this.state.data.videos[this.state.video] || firstVideo;
    const opts = {
      width: '960',
      height: '473',
      playerVars: {
        autoplay: zero,
        controls: zero,
        start: video.startTime,
      },
    };

    return (
      <Container>
        <header>
          <Title>
            T.P.R.S. 日本語
          </Title>
        </header>
        <YouTube videoId={video.src} opts={opts}
                 onStateChange={(event: YT.OnStateChangeEvent) => this.onPlayerStateChange(event) }
                 onReady={(event: YT.PlayerEvent) => this.onPlayerReady(event)} />
        <HalfButton onClick={() => this.prevVideo() }>Previous</HalfButton>
        <HalfButton onClick={() => this.nextVideo() }>Next</HalfButton>
        { this.renderContinueButton() }
        { this.renderListener() }
      </Container>
    );
  }
}
