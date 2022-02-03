import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import Keyboard, { KeyboardState } from './components/Keyboard';
import GuessGrid from './components/GuessGrid';
import Box from './components/Box';

function createKeyboardState(oldState?: KeyboardState) : KeyboardState {
  return {
    a: { pressed: false, presentInWord: false },
    b: { pressed: false, presentInWord: false },
    c: { pressed: false, presentInWord: false },
    d: { pressed: false, presentInWord: false },
    e: { pressed: false, presentInWord: false },
    f: { pressed: false, presentInWord: false },
    g: { pressed: false, presentInWord: false },
    h: { pressed: false, presentInWord: false },
    i: { pressed: false, presentInWord: false },
    j: { pressed: false, presentInWord: false },
    k: { pressed: false, presentInWord: false },
    l: { pressed: false, presentInWord: false },
    m: { pressed: false, presentInWord: false },
    n: { pressed: false, presentInWord: false },
    o: { pressed: false, presentInWord: false },
    p: { pressed: false, presentInWord: false },
    q: { pressed: false, presentInWord: false },
    r: { pressed: false, presentInWord: false },
    s: { pressed: false, presentInWord: false },
    t: { pressed: false, presentInWord: false },
    u: { pressed: false, presentInWord: false },
    v: { pressed: false, presentInWord: false },
    w: { pressed: false, presentInWord: false },
    x: { pressed: false, presentInWord: false },
    y: { pressed: false, presentInWord: false },
    z: { pressed: false, presentInWord: false },
    ...oldState,
  };
}

function getWord() : string {
  const wordList = [
    'adieu',
    'cranes',
    'farted',
    'pooped'
  ];

  return wordList[Math.floor(Math.random() * wordList.length)];
}

interface AppProps {
  guessesAllowed: number,
}

interface AppState {
  keysPressedDictionary: KeyboardState
  guessesAllowed: number,
  correctWord: string,
  lettersInWord: string[],
  wordsGuessed: string[],
  currentGuess: string[],
  gameWon: boolean,
}

const StyledKeyboard = styled(Keyboard)`
  margin-top: 20px;
  background: red;
`;

class App extends Component<AppProps, AppState>{
  constructor(props: AppProps) {
    super(props);

    const correctWord = getWord();

    this.state = {
      keysPressedDictionary: createKeyboardState(),
      guessesAllowed: props.guessesAllowed,
      correctWord, // todo move to props
      lettersInWord: correctWord.split(''),
      wordsGuessed: [],
      currentGuess: [],
      gameWon: false,
    };
  }

  onLetterClick(letter: string) {
    const { currentGuess, lettersInWord, wordsGuessed, guessesAllowed, gameWon } = this.state;

    if (gameWon ||
      (currentGuess.length === lettersInWord.length) ||
      (wordsGuessed.length >= guessesAllowed)
    ) {
      return;
    }

    this.setState({
      currentGuess: [...currentGuess, letter]
    });
  }

  onSubmit() {
    const { currentGuess, keysPressedDictionary, lettersInWord, wordsGuessed, correctWord } = this.state;

    // ignore submits of insufficient length
    if (currentGuess.length !== lettersInWord.length) {
      return;
    }

    const newGuessKeyboardState = currentGuess.reduce((stateObj, letter) => {
      return {
        ...stateObj,
        [letter]: {
          pressed: true,
          presentInWord: lettersInWord.indexOf(letter) > -1,
        }
      }
    }, {});

    const guessWord = currentGuess.join('');

    this.setState({
      keysPressedDictionary: createKeyboardState({
        ...keysPressedDictionary,
        ...newGuessKeyboardState,
      }),
      gameWon: guessWord === correctWord,
      // append word to list of guessed words
        wordsGuessed: [...wordsGuessed, guessWord],
      // clear current guess list
      currentGuess: [],
    });
  }

  onBackspace() {
    const newCurrentGuess = this.state.currentGuess.slice();

    newCurrentGuess.pop();
    this.setState({ currentGuess: newCurrentGuess });
  }

  render() {
    const {
      keysPressedDictionary,
      guessesAllowed,
      correctWord,
      wordsGuessed,
      currentGuess
    } = this.state;

    const wordsGuessedIncludingCurrentGuess = currentGuess.length ? [...wordsGuessed, currentGuess.join('')] : wordsGuessed;

    return (
      <div className="App">
        <Box alignItems="center" flexDirection="column">
          <GuessGrid
            wordsGuessed={wordsGuessedIncludingCurrentGuess}
            guessesAllowed={guessesAllowed}
            correctWord={correctWord}
            isCurrentGuessSubmitted={!currentGuess.length}
            indexOfCurrentGuess={wordsGuessed.length}
          />
          <StyledKeyboard
            keysPressedDictionary={keysPressedDictionary}
            onLetterClick={this.onLetterClick.bind(this)}
            onSubmit={this.onSubmit.bind(this)}
            onBackspace={this.onBackspace.bind(this)}
          />
        </Box>
      </div>
    );
  }
}


export default App;
