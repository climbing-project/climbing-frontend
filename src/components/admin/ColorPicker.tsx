import { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const GRADE_COLORS = [
  '#f472b6',
  '#e11d48',
  '#f75454',
  '#ff8138',
  '#a1421c',
  '#fbdb24',
  '#c4ff57',
  '#67dc3c',
  '#059669',
  '#05b4bd',
  '#abe2ff',
  '#319bf8',
  '#243dcb',
  '#a855f7',
  '#652fc9',
  '#fdfdfd',
  '#a5a5a5',
  '#1e1e1e',
];

interface ColorPickerProps {
  handleColorSelect: (color: string) => void;
}

const ColorPicker = ({ handleColorSelect }: ColorPickerProps) => {
  return (
    <Styled.Wrapper>
      {GRADE_COLORS.map((color, i) => (
        <Styled.Palette
          key={i}
          data-hex={color}
          $color={color}
          onClick={(e: BaseSyntheticEvent) =>
            handleColorSelect(e.target.dataset.hex)
          }
        ></Styled.Palette>
      ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    position: absolute;
    bottom: 45px;
    right: 0px;
    display: flex;
    flex-wrap: wrap;
    width: calc(27px * 5 + 6px * 4);
    gap: 6px;
    background: #f1f0f0;
    border-radius: 8px;
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
