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

const CorrectButton = styled.button`
  font-size: 2rem;
  width: 100%;
  background-color: green;
`;

const WrongButton = styled.button`
  font-size: 2rem;
  width: 100%;
  background-color: red;
`;

const Prompt = styled.h2`
`;

function randomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomChoices(arr: any[], n: number) {
  if (arr.length < n) {
    return arr;
  }
  const options = arr.slice();
  const choices = [];
  while (choices.length < n) {
    let i = randomInt(options.length);
    choices.push(options[i]);
    options.splice(i, 1);
  }
  return choices;
}

function shuffle(arr: any[]) {
  return randomChoices(arr, arr.length);
}

interface Fact {
  prompt: string;
  response: string;
  related: string[];
  mnemonic: string;
}

interface Question {
  fact: Fact;
  responses: string[];
}

interface CardState extends Question {
  answer?: number;
}

class Card extends React.Component<Question,CardState> {
  constructor(question: Question) {
    super(question);

    this.state = {
      fact: question.fact,
      responses: shuffle(question.responses),
    };
  }

  handleClick(i: number) {
    if (this.state.answer !== null && this.state.answer !== undefined) return;
    this.setState({
      answer: i,
    });
  }

  isCorrectAnswer(response: string, i: number) {
    return this.state.answer === i && response === this.state.fact.response;
  }

  isWrongAnswer(response: string, i: number) {
    return this.state.answer === i && response !== this.state.fact.response;
  }

  render() {
    const buttons = this.state.responses.map((response: string, i: number) => {
      if (this.isCorrectAnswer(response, i)) {
        return (
          <CorrectButton key={i}>
            {response}
          </CorrectButton>
        );
      } else if (this.isWrongAnswer(response, i)) {
        return (
          <WrongButton key={i}>
            {response}
          </WrongButton>
        );
      } else {
        return (
          <BigButton key={i} onClick={() => this.handleClick(i)}>
            {response}
          </BigButton>
        );
      }
    });
    return (
      <div>
        <Prompt>
          {this.state.fact.prompt}
        </Prompt>
        {buttons}
      </div>
    );
  }
}

function Summary(props: object) {
  return (
    <div>
    </div>
  )
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
      this.setState({
        facts: shuffle(data.facts),
      })
    }).catch((err) => console.error(err));
  }

  render() {
    const responses = this.state.facts.map((fact: Fact) => fact.response);
    let card = null;
    if (this.state.facts.length > 0) {
      card = (
        <Card
          fact={this.state.facts[0]}
          responses={responses}
        />
      );
    }

    return (
      <Container className="App">
        <header>
          <Title>
            S.R.S. 日本語
          </Title>
        </header>
        {card}
        <Summary />
      </Container>
    );
  }
}

export default App;
