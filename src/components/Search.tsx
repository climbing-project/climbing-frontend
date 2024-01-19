"use client";

import { styled } from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import DropDown, { DropItem } from "./DropDown";

interface AddressListProps {
  addressList: Array<DropItem>;
}

export const Search = ({ addressList }: AddressListProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState(-1);
  const [isInputFocus, setInputFocus] = useState(false);
  const [filterStr, setFilterStr] = useState("");
  const filteredList = addressList.filter((addressItem) =>
    addressItem.info.match(filterStr)
  );

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
    <Styled.Wrapper ref={searchRef}>
      <Styled.Form>
        <Styled.Input
          type="text"
          placeholder="주소를 입력하면 실내암벽장을 찾아드려요."
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
            } else {
              setFilterStr((e.target as HTMLInputElement).value);
            }
          }}
        />
        <IoSearch />
      </Styled.Form>
      {isInputFocus && filteredList.length != 0 && (
        <DropDown
          prefixIcon={<IoSearch />}
          dropItems={filteredList}
          highlightWord={filterStr}
          highlightIndex={index}
          width="385px"
        />
      )}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: inline-block;
  `,
  Form: styled.form`
    border: 1px solid black;
    border-radius: 5px;
    padding-left: 5px;
    margin-bottom: 5px;
    width: 380px;
  `,
  Input: styled.input`
    border: none;
    outline: none; // input 포커스시의 볼더 없애기
    width: 350px;
  `,
};

export default Search;
