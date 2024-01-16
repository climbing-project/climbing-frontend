import { styled } from "styled-components";
import { IoSearch } from "react-icons/io5";

export const Search = ({ searchType }: { searchType: string }) => {
  return (
    <Styled.Wrapper>
      <Styled.Form>
        <Styled.Input
          type="text"
          placeholder="주소를 입력하면 실내암벽장을 찾아드려요."
        />
        <IoSearch />
      </Styled.Form>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
  Form: styled.form`
    border: 1px solid black;
    border-radius: 5px;
    padding-left: 5px;
    width: 380px;
  `,
  Input: styled.input`
    border: none;
    outline: none; // input 포커스시의 볼더 없애기
    width: 350px;
  `,
  Label: styled.label`
    /* display: inline-block;
    width: 42px;
    height: 100%;
    font-weight: bold; */
  `,
  // Button: styled.button`
  //   width: 100%;
  //   height: 100%;
  //   color: rgb(255, 255, 255);
  //   border: 0px none;
  //   background: none;
  //   text-align: center;
  //   font-size: 16px;
  //   vertical-align: middle;
  // `,
};

export default Search;
