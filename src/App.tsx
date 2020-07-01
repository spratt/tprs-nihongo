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

const Prompt = styled.h2``;

interface SummaryProps {
  answered: number;
  correct: number;
}

function Summary(props: SummaryProps) {
  return (
    <div>
      Correct: {props.correct}<br />
    Answered: {props.answered}<br />
    </div>
  )
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

interface AppState {
  facts: Fact[];
  responses: string[];
  question: Question;
  answer?: string;

  numCorrect: number;
  numAnswered: number;
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

        numCorrect: 0,
        numAnswered: 0,
      };
      this.nextQuestion();
    }).catch((err) => console.error(err));

    // Initialize empty state while we wait for the xhr to finish
    this.state = {
      facts: [],
      responses: [],
      question: App.emptyQuestion,

      numCorrect: 0,
      numAnswered: 0,
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

  handleClick(r: string) {
    if (this.state.answer !== null && this.state.answer !== undefined) return;
    this.setState({
      answer: r,
    });
    const numAnswered = this.state.numAnswered + 1;
    let numCorrect = this.state.numCorrect;
    if (r === this.state.question.fact.response) {
      numCorrect++;
    }
    this.setState({
      numAnswered: numAnswered,
      numCorrect: numCorrect,
    });
  }

  hasAnswered() {
    return this.state.answer !== null && this.state.answer !== undefined;
  }

  isCorrectAnswer(response: string) {
    return response === this.state.question.fact.response;
  }

  isWrongAnswer(response: string) {
    return this.state.answer === response && response !== this.state.question.fact.response;
  }

  renderCard() {
    const buttons = this.state.question.responses.map((response: string, i: number) => {
      if (this.hasAnswered()) {
        if (this.isCorrectAnswer(response)) {
          return (
            <CorrectButton key={i} onClick={() => this.nextQuestion()}>
              {response}
            </CorrectButton>
          );
        } else if (this.isWrongAnswer(response)) {
          return (
            <WrongButton key={i} onClick={() => this.nextQuestion()}>
              {response}
            </WrongButton>
          );
        }
        return (
          <BigButton key={i} onClick={() => this.nextQuestion()}>
            {response}
          </BigButton>
        );
      } else {
        return (
          <BigButton key={i} onClick={() => this.handleClick(response)}>
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
        <Summary answered={ this.state.numAnswered } correct={ this.state.numCorrect } />
        {this.renderCard()}
      </Container>
    );
  }
}

export default App;
