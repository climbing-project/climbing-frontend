import { styled } from "styled-components";
import { IoSearch } from "react-icons/io5";

interface AddressListProps {
  items: Array<Address>;
}

interface Address {
  address: string;
}

const sampleAddress = [
  [
    { address: "잠실" },
    { address: "잠실2동" },
    { address: "잠실1동" },
    { address: "송파동" },
    { address: "송파2동" },
    { address: "송파1동" },
    { address: "송파1동" },
  ],
];

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
      <Styled.ResultWrapper>
        <ul>
          <li>
            <IoSearch />
            송파1동
          </li>
          <li>
            <IoSearch />
            송파2동
          </li>
        </ul>
      </Styled.ResultWrapper>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    li {
      list-style: none;
    }
    ul {
      margin: 0;
      padding: 0;
      padding-left: 5px;
    }
  `,
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
  ResultWrapper: styled.div`
    border: 1px solid black;
    padding-left: 5px;
    margin-top: 5px;
    border-radius: 5px;
    width: 380px;
  `,
};

export default Search;
