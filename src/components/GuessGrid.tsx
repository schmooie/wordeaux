import React from 'react';
import styled from 'styled-components';
import Box from './Box'

const LetterBox = styled.div`
  font-family: 'Courier';
  border: 1px solid black;
  padding: 20px;
  margin: 1px;
`;

type WordGuess = Array<string | null>;

function GuessRow(props: { guess: WordGuess }) {
  return (
    <Box>
      {props.guess.map((char, index) =>
        <LetterBox key={index}>
          {char || (<span>&nbsp;</span>)}
        </LetterBox>
      )}
    </Box>
  )
}

export default function GuessGrid(props: {
  wordsGuessed: string[],
  guessesRemaining: number,
  correctWord: string,
}) {
  const { wordsGuessed, guessesRemaining, correctWord } = props;

  let renderableGuesses: WordGuess[] = wordsGuessed.map((word) => {
    const arr: WordGuess = word.split('');

    while (arr.length < correctWord.length) {
      arr.push(null);
    }
    return arr;
  });

  let dummyWordArr: WordGuess = [];

  for (let i = 0; i < correctWord.length; i++) {
    dummyWordArr.push(null);
  }

  for (let i = 0; i < guessesRemaining - wordsGuessed.length; i++) {
    renderableGuesses.push([...dummyWordArr]);
  }

  return (
    <Box flexDirection="column" alignItems="center">
      {renderableGuesses.map((guess, index) => <GuessRow key={index} guess={guess}/>)}
    </Box>
  );
}
