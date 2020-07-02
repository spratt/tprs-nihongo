import React from 'react';
import styled from 'styled-components';
import yaml from 'js-yaml';

import xhr from './http';

import data from './data.yaml';

const Container = styled.div`
  @media screen and (min-width: 48rem) {
  width: 48rem;
  margin: 0 auto;
  }
`;

const Title = styled.h1`
  padding-left: 1rem;
  font-size: 1.5em;
  color: orangered;
`;

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
      </Container>
    );
  }
}

export default App;
