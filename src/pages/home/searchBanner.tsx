import { Search } from "@/components/Search";
import styled from "styled-components";

const SearchBanner = () => {
  return (
    <Styled.Wrapper>
      <Search searchType="address" />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
};

export default SearchBanner;
