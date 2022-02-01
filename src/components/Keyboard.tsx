import react, { Component } from 'React';
import styled from 'styled-components';

interface KeyPressState {
  pressed: boolean,
  presentInWord: boolean,
}

export interface KeyboardState {
  a: KeyPressState,
  b: KeyPressState,
  c: KeyPressState,
  d: KeyPressState,
  e: KeyPressState,
  f: KeyPressState,
  g: KeyPressState,
  h: KeyPressState,
  i: KeyPressState,
  j: KeyPressState,
  k: KeyPressState,
  l: KeyPressState,
  m: KeyPressState,
  n: KeyPressState,
  o: KeyPressState,
  p: KeyPressState,
  q: KeyPressState,
  r: KeyPressState,
  s: KeyPressState,
  t: KeyPressState,
  u: KeyPressState,
  v: KeyPressState,
  w: KeyPressState,
  x: KeyPressState,
  y: KeyPressState,
  z: KeyPressState,
  [key: string]: KeyPressState
}

const Button = styled.button`
  background: ${(props: KeyPressState) => props.presentInWord ? 'green' : props.pressed ? 'gray' : 'white'};
  color: black;
  padding: 25px;
  margin: 2px;
`;

const KeyBoardTray = styled.div`
  display: flex;
  max-width: 600px;
  flex-wrap: wrap;
`;

// TODO: make display layout QWERTY
function Keyboard(props:{ keysPressedDictionary: KeyboardState, onLetterClick: Function }) {
  const { keysPressedDictionary, onLetterClick } = props;
  const letters: string[] = Object.keys(keysPressedDictionary);

  return (
    <KeyBoardTray>
      {letters.map(letter => {
        return (
          <Button
            {...keysPressedDictionary[letter]}
            onClick={() => onLetterClick(letter)}
            key={letter}
          >
            {letter}
          </Button>
        );
      })}
    </KeyBoardTray>
  );
}

export default Keyboard;
