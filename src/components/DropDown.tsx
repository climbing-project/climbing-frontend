import { styled } from "styled-components";
import reactStringReplace from "react-string-replace";

interface DropDownProps {
  prefixIcon?: JSX.Element; // list왼쪽 react-icon 컴포넌트 태그
  width?: string; // 길이 없을 시, 하위 컴포넌트 크기에 맞춤
  highlightWord?: String; // 강조 문구 있을 시, 강조 표시
  highlightIndex?: number; // 강조할 행은 강조표시
  dropItems: Array<DropItem>;
}

export interface DropItem {
  id: number;
  info: string;
}

const DropDown = ({
  prefixIcon,
  width,
  highlightWord = "",
  highlightIndex = -1,
  dropItems,
}: DropDownProps) => {
  const listItems = dropItems.map(({ id, info }: DropItem, index) => (
    <S.Element key={id} highlight={index == highlightIndex}>
      {prefixIcon || null}
      {reactStringReplace(info, highlightWord as string, (match) => (
        <b>{match}</b>
      ))}
    </S.Element>
  ));

  return (
    <S.Wrapper width={width}>
      <S.Group>{listItems}</S.Group>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{
    width?: string;
  }>`
    border: 1px solid black;
    border-radius: 5px;
    padding: 0px;
    margin: 0px;
    ${(props) =>
      props.width ? `width: ${props.width};` : `display:inline-block;`}
  `,
  Group: styled.ul`
    margin: 0;
    padding: 0;
  `,
  Element: styled.li<{
    highlight: boolean;
  }>`
    padding-left: 10px;
    list-style: none;
    ${(props) => props.highlight && `background-color: #eeee8d`};
  `,
};

export default DropDown;
