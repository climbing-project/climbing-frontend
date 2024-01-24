"use client";

import { styled } from "styled-components";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import DropDown, { DropItem } from "./DropDown";
import { Console } from "console";

interface SearchProps {
  dataList: Array<DropItem>;
  width?: string;
  fontSize?: string;
  placeholder?: string;
  postfixIcon?: JSX.Element; // 검색창에 표시되는 아이콘
  // handleSubmit?: (unknown: unknown) => unknown;
}

export const Search = ({
  dataList,
  width,
  fontSize,
  placeholder = "",
  postfixIcon,
}: // handleSubmit,
SearchProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState(-1);
  const [isInputFocus, setInputFocus] = useState(false);
  const [filterStr, setFilterStr] = useState("");
  const filteredList = dataList.filter((dataItem) =>
    dataItem.info.match(filterStr)
  );

  // 바깥쪽을 클릭했을때 dropdown 숨기기 위해
  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setInputFocus(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <Styled.Wrapper width={width} ref={searchRef}>
      <Styled.Form onSubmit={() => console.log("hello")}>
        <Styled.Input
          type="text"
          placeholder={placeholder}
          fontSize={fontSize}
          onClick={(e) => {
            e.stopPropagation(); // 상위로 이벤트 전송 막음
          }}
          onFocus={(e) => {
            setIndex(-1);
            setInputFocus(true);
          }}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key == "ArrowUp") {
              if (index > -1) {
                if (index != 0) {
                  (e.target as HTMLInputElement).value =
                    filteredList[index - 1].info;
                }
                setIndex(index - 1);
              }
            } else if (e.key == "ArrowDown") {
              if (index < filteredList.length - 1) {
                (e.target as HTMLInputElement).value =
                  filteredList[index + 1].info;
                setIndex(index + 1);
              }
            } else if (e.key == "Escape") {
              (e.target as HTMLInputElement).value = "";
              setFilterStr("");
              setIndex(-1);
            } else {
              setFilterStr((e.target as HTMLInputElement).value);
            }
          }}
        />
        {postfixIcon}
      </Styled.Form>
      {isInputFocus && filteredList.length != 0 && (
        <DropDown
          prefixIcon={postfixIcon}
          dropItems={filteredList}
          highlightWord={filterStr}
          highlightIndex={index}
          fontSize={fontSize}
        />
      )}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div<{
    width?: string;
  }>`
    ${(props) => props.width && `width: ${props.width};`}
  `,
  Form: styled.form`
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
  `,
  Input: styled.input<{
    fontSize?: string;
  }>`
    border: none;
    outline: none; // input 포커스시의 볼더 없애기
    width: 80%;
    ${(props) => props.fontSize && `font-size: ${props.fontSize};`}
  `,
};

export default Search;
