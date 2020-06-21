import React from 'react';
import styled from 'styled-components';
import yaml from 'js-yaml';

import xhr from './http';
import {shuffle, randomChoices} from './random';

import data from './data.yaml';

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
  background-color: lightgreen;
`;

const WrongButton = styled.button`
  font-size: 2rem;
  width: 100%;
  background-color: orangered;
`;

const Prompt = styled.h2`
`;

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

function Summary(props: object) {
  return (
    <div>
    </div>
  )
}

interface AppState {
  facts: Fact[];
  responses: string[];
  question: Question;
  answer?: number;
}

class App extends React.Component<{},AppState> {
  static emptyQuestion = {
    fact: {
      prompt: '',
      response: '',
      related: [],
      mnemonic: '',
    },
    responses: [],
  };

  constructor(props: {}) {
    super(props);
    console.log('new App()');

    // Start async get call
    xhr('GET', data).then((req) => {
      const data = yaml.load(req.response);
      const responses = data.facts.map((fact: Fact) => fact.response);
      this.state = {
        facts: data.facts,
        responses: responses,
        question: App.emptyQuestion,
      };
    }).catch((err) => console.error(err));

    // Initialize empty state while we wait for the xhr to finish
    this.state = {
      facts: [],
      responses: [],
      question: App.emptyQuestion,
    };
  }
  
  nextQuestion() {
    console.log('nextQuestion() called');
    if (this.state.facts.length === 0) {
      console.log('nextQuestion() empty facts');
      return
    }
    console.log('nextQuestion() this.state');
    console.dir(this.state);
    const fact = randomChoices(this.state.facts, 1)[0];
    const responses = [fact.response];
    const otherResponses = this.state.responses.filter((response) => response !== fact.response);
    responses.push(...randomChoices(otherResponses, 3));
    const newState = {
      facts: this.state.facts,
      responses: this.state.responses,
      question: {
        fact: fact,
        responses: shuffle(responses),
      },
      answer: undefined,
    };
    console.log('nextQuestion() new state');
    console.dir(newState);
    this.setState(newState);
  }

  handleClick(i: number) {
    if (this.state.answer !== null && this.state.answer !== undefined) return;
    this.setState({
      answer: i,
    });
  }

  isCorrectAnswer(response: string, i: number) {
    return this.state.answer === i && response === this.state.question.fact.response;
  }

  isWrongAnswer(response: string, i: number) {
    return this.state.answer === i && response !== this.state.question.fact.response;
  }

  renderCard() {
    const buttons = this.state.question.responses.map((response: string, i: number) => {
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
          {this.state.question.fact.prompt}
        </Prompt>
        {buttons}
      </div>
    );
  }

  render() {
    return (
      <Container>
        <header>
          <Title>
            S.R.S. 日本語
          </Title>
        </header>
        <BigButton onClick={() => this.nextQuestion() }>
          Next Question
        </BigButton>
        {this.renderCard()}
        <Summary />
      </Container>
    );
  }
}

export default App;
