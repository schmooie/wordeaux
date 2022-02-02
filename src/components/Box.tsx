import React from 'react';
import styled from 'styled-components';

interface BoxProps {
  alignItems?: string,
  justifyContent?: string,
  flexDirection?: string,
  flexWrap?: string,
}

const Box = styled('div')<BoxProps>`
  display: flex;
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justifyContent};
  flex-direction: ${props => props.flexDirection};
  flex-wrap: ${props => props.flexWrap};
`;

export default Box;
