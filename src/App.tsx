import React from 'react';
import styled from 'styled-components';
import yaml from 'js-yaml';
import data from './data.yaml';
import get from './http';

const Container = styled.div`
  @media screen and (min-width: 48rem) {
  width: 48rem;
  margin: 0 auto;
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  color: palevioletred;
`;

class StartButton extends React.Component {
  handleClick() {
    console.log('click');
  }
  render() {
    const Button = styled.button`
      width: 100%;
    `;
    return (
      <Button onClick={() => this.handleClick()}>
        Start
      </Button>
    );
  }
}

class App extends React.Component {
  constructor(props: object) {
    super(props);

    get(data).then((req) => {
      const data = yaml.load(req.response);
      console.dir(data);
      this.state = data;
    }).catch((err) => console.error(err));
  }

  render() {
    return (
      <Container className="App">
        <header>
          <Title>
            S.R.S. 日本語
          </Title>
        </header>
        <article>
          <StartButton />
        </article>
      </Container>
    );
  }
}

export default App;
