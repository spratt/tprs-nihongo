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
  player: YT.Player;
};

class App extends React.Component<{},AppState> {

  constructor(props: {}) {
    super(props);
    console.log('new App()');

    // Start async get call
    xhr('GET', data).then((req) => {
      yaml.load(req.response);
      // TODO
    }).catch((err) => console.error(err));
  }

  play() {
    this.state.player.playVideo();
  }

  pause() {
    this.state.player.pauseVideo();
  }

  render() {
    const zero: 0 | 1 | undefined = 0;
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: zero,
      },
    };

    return (
      <Container>
        <header>
          <Title>
            T.P.R.S. 日本語
          </Title>
        </header>
        <YouTube videoId="FsiAxc5T23g" opts={opts} onReady={(event: YT.PlayerEvent) => {
          this.setState({player: event.target});
        }} />
        <BigButton onClick={() => this.play()}>
          Play
        </BigButton>
        <BigButton onClick={() => this.pause()}>
          Pause
        </BigButton>
      </Container>
    );
  }
}

export default App;
