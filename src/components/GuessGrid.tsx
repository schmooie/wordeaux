import React from 'react';
import styled from 'styled-components';
import Box from './Box'
import COLORS from '../constants/colors';

enum Matches {
  Perfect = "PERFECT",
  Partial = "PARTIAL",
  No = "NO",
  Empty = "EMPTY",
}

const matchColorDictionary = {
  [Matches.Perfect]: COLORS.Green,
  [Matches.Partial]: COLORS.Yellow,
  [Matches.No]: COLORS.Gray,
  [Matches.Empty]: COLORS.White,
}

const LetterBox = styled.div<{
  match: Matches,
}>`
  font-family: 'Courier';
  border: 1px solid black;
  padding: 20px;
  margin: 1px;
  background: ${props => matchColorDictionary[props.match] };
`;

type WordGuess = Array<string | null>;

function GuessRow(props: {
  guess: WordGuess,
  matches: Matches[],
}) {
  return (
    <Box>
      {props.guess.map((char, index) =>
        <LetterBox key={index} match={props.matches[index]}>
          {char || (<span>&nbsp;</span>)}
        </LetterBox>
      )}
    </Box>
  )
}

function checkGuess(guess: string, correctWord: string, hideResults: boolean) {
  const matches: Matches[] = [];
  const lettersInWord: Set<string> = new Set(correctWord.split(''));

  if ((guess.length !== correctWord.length) || hideResults) {
    return correctWord.split('').map(_ => Matches.Empty);
  }

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === correctWord[i]) {
      matches.push(Matches.Perfect);
    } else if (lettersInWord.has(guess[i])) {
      matches.push(Matches.Partial);
    } else {
      matches.push(Matches.No);
    }
  }

  return matches;
}

export default function GuessGrid(props: {
  wordsGuessed: string[],
  guessesAllowed: number,
  correctWord: string,
  isCurrentGuessSubmitted: boolean,
  indexOfCurrentGuess: number,
}) {
  const {
    wordsGuessed,
    guessesAllowed,
    correctWord,
    isCurrentGuessSubmitted,
    indexOfCurrentGuess
  } = props;

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

  for (let i = 0; i < guessesAllowed - wordsGuessed.length; i++) {
    renderableGuesses.push([...dummyWordArr]);
  }

  return (
    <Box flexDirection="column" alignItems="center">
      {renderableGuesses.map((guess, index) => (
        <GuessRow
          key={index}
          guess={guess}
          matches={checkGuess(guess.join(''), correctWord, !isCurrentGuessSubmitted && indexOfCurrentGuess === index)}
        />
      ))}
    </Box>
  );
}
