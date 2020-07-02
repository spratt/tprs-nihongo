import React from 'react';
import styled from 'styled-components';
import yaml from 'js-yaml';

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

interface VideoProps {
  title: string;
  src: string;
}

function Video(props: VideoProps) {
  return (
    <iframe
      title={ props.title }
      src={ props.src }
      width="960"
      height="473"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
}

class App extends React.Component<{},{}> {

  constructor(props: {}) {
    super(props);
    console.log('new App()');

    // Start async get call
    xhr('GET', data).then((req) => {
      yaml.load(req.response);
      // TODO
    }).catch((err) => console.error(err));
  }

  render() {
    return (
      <Container>
        <header>
          <Title>
            T.P.R.S. 日本語
          </Title>
        </header>
        <Video
          title="Lesson One!"
          src="https://www.youtube.com/embed/FsiAxc5T23g"
        />
      </Container>
    );
  }
}

export default App;
