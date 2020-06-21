import React from 'react';
import styled from 'styled-components';
import yaml from 'js-yaml';
import data from './data.yaml';
import xhr from './http';

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

const BigButton = styled.button`
  font-size: 2rem;
  width: 100%;
`;

const Prompt = styled.h2`
`;

interface CardProps {
  prompt: string;
  response: string;  
}

interface CardState {
  prompt: string;
  response: string;
}

class Card extends React.Component<CardProps,CardState> {
  constructor(props: CardProps) {
    super(props);

    this.state = {
      prompt: props.prompt,
      response: props.response
    };
  }

  render() {
    return (
      <div>
        <Prompt>
          {this.state.prompt}
        </Prompt>
        <BigButton>
          {this.state.response}
        </BigButton>
      </div>
    )
  }
}

function Summary(props: object) {
  return (
    <div>
    </div>
  )
}

interface Fact {
  prompt: string;
  response: string;
  related: string[];
  mnemonic: string;
}
interface AppState {
  facts: Fact[];
}

class App extends React.Component<{},AppState> {
  constructor(props: {}) {
    super(props);

    // Initialize empty state while we wait for the xhr to finish
    this.state = {
      facts: []
    };
  }

  componentDidMount() {
    xhr('GET', data).then((req) => {
      const data = yaml.load(req.response);
      console.dir(data);
      this.setState(data);
    }).catch((err) => console.error(err));
  }

  render() {
    const cards = this.state.facts.map((fact: Fact) => {
      return (
        <Card
          prompt={fact.prompt}
          response={fact.response}
        />
      )
    });

    return (
      <Container className="App">
        <header>
          <Title>
            S.R.S. 日本語
          </Title>
        </header>
        {cards}
        <Summary />
      </Container>
    );
  }
}

export default App;
