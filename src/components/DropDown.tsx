import { styled } from "styled-components";
import reactStringReplace from "react-string-replace";

interface DropDownProps {
  prefixIcon?: JSX.Element; // list왼쪽 react-icon 컴포넌트 태그
  width?: string; // 길이 없을 시, 하위 컴포넌트 크기에 맞춤
  highlightWord?: String; // 강조 문구 있을 시, 강조 표시
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
  dropItems,
}: DropDownProps) => {
  const listItems = dropItems.map(({ id, info }: DropItem) => (
    <li key={id}>
      {prefixIcon || null}
      {reactStringReplace(info, highlightWord as string, (match) => (
        <b>{match}</b>
      ))}
    </li>
  ));

  return (
    <S.Wrapper width={width}>
      <ul>{listItems}</ul>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{ width?: string }>`
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    ${(props) =>
      props.width ? `width: ${props.width};` : `display:inline-block;`}

    ul {
      margin: 0;
      padding: 0;
    }
    li {
      list-style: none;
    }
  `,
};

export default DropDown;
