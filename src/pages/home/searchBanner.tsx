import { Search } from "@/components/Search";
import { IoSearch } from "react-icons/io5";
import styled from "styled-components";

const sampleAddress = [
  { id: 1, info: "잠실" },
  { id: 2, info: "잠실2동" },
  { id: 3, info: "잠실1동" },
  { id: 4, info: "송파동" },
  { id: 5, info: "송파2동" },
  { id: 6, info: "송파1동" },
];

const SearchBanner = () => {
  return (
    <Styled.Wrapper>
      <Search
        dataList={sampleAddress}
        width="350px"
        // fontSize="10px"
        postfixIcon={<IoSearch />}
        placeholder="주소를 입력하면 실내암벽장을 찾아드려요."
      />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
};

export default SearchBanner;
