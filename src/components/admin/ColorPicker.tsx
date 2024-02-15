import { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const GRADE_COLORS = [
  '#f35f5f',
  '#fabb72',
  '#f3db85',
  '#b2dea3',
  '#b1d3ff',
  '#538adc',
  '#7c64dd',
  '#7a9c2e',
  '#b35f87',
  '#3d8fa2',
  '#f7b041',
  '#5c387f',
  '#ffffff',
  '#f7941d',
];

interface ColorPickerProps {
  setBlockColor: Dispatch<SetStateAction<string>>;
}

const ColorPicker = ({ setBlockColor }: ColorPickerProps) => {
  return (
    <Styled.Wrapper>
      {GRADE_COLORS.map((color, i) => (
        <Styled.Palette
          key={i}
          data-hex={color}
          $color={color}
          onClick={(e: BaseSyntheticEvent) =>
            setBlockColor(e.target.dataset.hex)
          }
        ></Styled.Palette>
      ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    background: #f5f5f5;
    border-radius: 8px;
    width: 300px;
    padding: 20px;
  `,
  Palette: styled.div<{ $color: string }>`
    height: 27px;
    width: 27px;
    border-radius: 4px;
    background: ${({ $color }) => $color};
    cursor: pointer;
  `,
};

export default ColorPicker;
