import react, { Component } from 'React';
import styled from 'styled-components';
import Box from './Box';

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
  padding: 15px;
  margin: 2px;
`;

const KeyBoardTray = styled(Box)`
  max-width: 400px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ActionButton = styled.button`
  height: 60px;
  width: 80px;
`;

// TODO: make display layout QWERTY
function Keyboard(props: {
  keysPressedDictionary: KeyboardState,
  onLetterClick: Function,
  onSubmit: Function,
  onBackspace: Function,
}) {
  const { keysPressedDictionary, onLetterClick, onSubmit, onBackspace } = props;
  const letters: string[] = Object.keys(keysPressedDictionary);

  return (
    <Box alignItems='center'>
      <ActionButton onClick={() => onBackspace()}>DEL</ActionButton>
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
      <ActionButton onClick={() => onSubmit()}>ENTER</ActionButton>
    </Box>
  );
}

export default Keyboard;
