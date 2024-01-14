import styled from "styled-components";

const Test = () => {
  return (
    <Styled.Wrapper>
      This is test page!
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
  background-color: orange;
  `,
};

export default Test;