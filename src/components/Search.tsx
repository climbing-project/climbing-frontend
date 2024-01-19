"use client";

import { styled } from "styled-components";
import { IoSearch } from "react-icons/io5";
import DropDown, { DropItem } from "./DropDown";
import { useEffect, useRef, useState } from "react";

interface AddressListProps {
  addressList: Array<DropItem>;
}

export const Search = ({ addressList }: AddressListProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isInputFocus, setInputFocus] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setInputFocus(false);
        console.log("hi");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // const handleInputChange = (event) => {};
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
            setInputFocus(true);
          }}
        />
        <IoSearch />
      </Styled.Form>
      {isInputFocus && (
        <DropDown
          prefixIcon={<IoSearch />}
          dropItems={addressList}
          width="365px"
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
