import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Keyboard, { KeyboardState } from './components/Keyboard';

function createKeyboardState(oldState?: KeyboardState) : KeyboardState {
  // console.log(oldState)
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

interface AppState {
  keysPressedDictionary: KeyboardState
  guessesRemaining: number,
  word: string,
}

class App extends Component<{}, AppState>{
  constructor(props: {}) {
    super(props);

    this.state = {
      keysPressedDictionary: createKeyboardState(),
      guessesRemaining: 5,
      word: getWord(),
    }
  }

  onLetterClick(letter: string) {
    const { word, keysPressedDictionary } = this.state;
    const lettersInWord: Set<string> = new Set(word.split(''));

    this.setState({
      keysPressedDictionary: createKeyboardState({
        ...keysPressedDictionary,
        [letter]: {
          pressed: true,
          presentInWord: lettersInWord.has(letter),
        }
      })
    });
}

  render() {
    const { keysPressedDictionary, guessesRemaining, word } = this.state;

    return (
      <div className="App">
        <div>Guesses remaining: {guessesRemaining}</div>
        <div>Word: {word}</div>
        <Keyboard
          keysPressedDictionary={keysPressedDictionary}
          onLetterClick={this.onLetterClick.bind(this)}
      />
      </div>
    );
  }
}


export default App;
