import { useState } from 'react';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';

const GradeBlock = () => {
  const [blockColor, setBlockColor] = useState('#d9d9d9');
  return (
    <>
      <Styled.Block $color={blockColor} />
      <ColorPicker setBlockColor={setBlockColor} />
    </>
  );
};

const Styled = {
  Block: styled.div<{ $color: string }>`
    box-sizing: border-box;
    border: 1px solid #d0d0d0;
    width: 100px;
    height: 100px;
    background: ${({ $color }) => $color};
    cursor: pointer;
  `,
};

export default GradeBlock;
