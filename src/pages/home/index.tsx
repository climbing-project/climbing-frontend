import styled from "styled-components";
import SearchBanner from "./searchBanner";

// Todo: header, footer 추가 필요
// Todo: 암장 목록 추가 필요
// Todo: 전체 페이지에 대한 global style 필요
const Home = () => {
  return (
    <Styled.Wrapper>
      {/* <Header /> */}
      <SearchBanner />
      {/* <WallList /> */}
      {/* <Footer /> */}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
};

export default Home;
