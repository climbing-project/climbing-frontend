import { Search } from "@/components/Search";
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
      <Search addressList={sampleAddress} />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
};

export default SearchBanner;
