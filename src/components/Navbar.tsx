import { styled } from "styled-components";

const Navbar = () => {
  return (
    <S.Wrapper>
      <button>오르리</button>
      <S.MenuContainer>
        <S.ButtonWrapper>로그인</S.ButtonWrapper>
        <S.ButtonWrapper>회원가입</S.ButtonWrapper>
        <S.ButtonWrapper>=</S.ButtonWrapper>
      </S.MenuContainer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
  `,
  MenuContainer: styled.div``,
  ButtonWrapper: styled.button`
    margin-left: 10px;
  `,
};

export default Navbar;
