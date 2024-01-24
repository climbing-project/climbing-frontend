import { styled } from "styled-components";
import reactStringReplace from "react-string-replace";

interface DropDownProps {
  dropItems: Array<DropItem>;
  prefixIcon?: JSX.Element; // list왼쪽 react-icon 컴포넌트 태그
  highlightWord?: String; // 강조 문구 있을 시, 강조 표시
  highlightIndex?: number; // 강조할 행은 강조표시
  width?: string; // search컴포넌트 없이 dropdown 단독으로 쓸때만 사용
  fontSize?: string;
}

export interface DropItem {
  id: number;
  info: string;
}

const DropDown = ({
  dropItems,
  prefixIcon,
  highlightWord = "",
  highlightIndex = -1,
  width,
  fontSize,
}: DropDownProps) => {
  const listItems = dropItems.map(({ id, info }: DropItem, index) => (
    <S.Element
      key={index}
      $highlight={index == highlightIndex}
      fontSize={fontSize}
    >
      {prefixIcon || null}
      {reactStringReplace(info, highlightWord as string, (match, index) => (
        <b key={index}>{match}</b>
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
    padding-top: 5px;
    padding-bottom: 5px;
    margin: 0px;
    ${(props) => props.width && `width: ${props.width};`}
  `,
  Group: styled.ul`
    margin: 0;
    padding: 0;
  `,
  Element: styled.li<{
    $highlight: boolean;
    fontSize?: string;
  }>`
    padding-left: 5px;
    list-style: none;
    ${(props) => props.fontSize && `font-size: ${props.fontSize}`};
    ${(props) => props.$highlight && `background-color: #eeee8d`};
  `,
};

export default DropDown;
