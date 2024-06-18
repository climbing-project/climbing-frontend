import { styled } from "styled-components";
import reactStringReplace from "react-string-replace";
import CurrentLocationBtn from "../search/CurrentLocationBtn";
import { Dispatch, SetStateAction } from "react";
import { COLOR } from "@/styles/global-color";

interface DropDownProps {
  dropItems: Array<DropItem>;
  prefixIcon?: JSX.Element; // list왼쪽 react-icon 컴포넌트 태그
  highlightWord?: String; // 강조 문구 있을 시, 강조 표시
  highlightIndex?: number; // 강조할 행은 강조표시
  setHighlightIndex?: Dispatch<SetStateAction<number>>;
  width?: string; // search컴포넌트 없이 dropdown 단독으로 쓸때만 사용
  fontSize?: string;
  useLocation?: boolean;
  handleClick?: (arg: unknown) => unknown;
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
  setHighlightIndex,
  width,
  fontSize,
  useLocation = false,
  handleClick,
}: DropDownProps) => {
  const handleMouseHover = (index: number) => {
    if (setHighlightIndex) {
      setHighlightIndex(index);
    }
  };
  const listItems = dropItems.map(({ id, info }: DropItem, index) => (
    <S.Element
      key={index}
      $highlight={index == highlightIndex}
      fontSize={fontSize}
      onClick={handleClick}
      onMouseEnter={() => handleMouseHover(index)}
    >
      {prefixIcon || null}
      <S.Space></S.Space>
      {reactStringReplace(info, highlightWord as string, (match, index) => (
        <strong key={index}>{match}</strong>
      ))}
    </S.Element>
  ));

  return (
    <S.Wrapper className="container" width={width}>
      <S.Group>{listItems}</S.Group>
      {useLocation && <CurrentLocationBtn />}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{
    width?: string;
  }>`
    position: absolute;
    z-index: 1;
    background-color: white;

    width: ${(props) => props.width || `100%`};
    border: 2px solid ${COLOR.LIGHT_MAIN};
    border-radius: 5px;
  `,
  Group: styled.ul`
    margin: 0;
    padding: 0;
  `,
  Element: styled.li<{
    $highlight: boolean;
    fontSize?: string;
  }>`
    display: flex;
    flex-direction: row;
    height: 30px;
    padding: 3px 10px;
    align-items: center;
    list-style: none;
    ${(props) => props.fontSize && `font-size: ${props.fontSize}`};
    ${(props) => props.$highlight && `background-color: ${COLOR.LIGHT_MAIN}`};
  `,
  Space: styled.div`
    margin-left: 10px;
  `,
};

export default DropDown;
