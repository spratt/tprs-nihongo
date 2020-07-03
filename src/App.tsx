import React from 'react';
import styled from 'styled-components';
import yaml from 'js-yaml';
import YouTube from 'react-youtube';

import xhr from './http';

import data from './data.yaml';

const Container = styled.div`
  @media screen and (min-width: 60rem) {
  width: 60rem;
  margin: 0 auto;
  }
`;

const Title = styled.h1`
  padding-left: 1rem;
  font-size: 1.5em;
  color: orangered;
`;

const BigButton = styled.button`
  font-size: 2rem;
  width: 100%;
`;

interface AppState {
  player?: YT.Player;
  src: string;
  stopTimes: number[];
  timer?: any;
};

// @types/youtube won't let me refer to their const enum PlayerState
// directly, so I have to recreate its values here
//const PlayerStateUnstarted = -1;
//const PlayerStateEnded = 0;
const PlayerStatePlaying = 1;
//const PlayerStatePaused = 2;
//const PlayerStateBuffering = 3;
//const PlayerStateCued = 4;

class App extends React.Component<{},AppState> {

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
    };
  }

  play() {
    this.state.player?.playVideo();
    this.forceUpdate();
  }

  pause() {
    this.state.player?.pauseVideo();
    this.forceUpdate();
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

  renderButton() {
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
        { this.renderButton() }
      </Container>
    );
  }
}

export default App;
