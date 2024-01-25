import styled from 'styled-components';
import TextField from "./TextField";

const NewGymForm = () => {
  return (
    <Styled.Wrapper>
      <Styled.Form>
        <div>
          <h4>암장명</h4>
          <TextField formName={'name'} characterLimit={20} />
        </div>
        <div>
          <h4>암장 주소</h4>
        </div>
        <div>
          <h4>암장 설명</h4>
        </div>
        <div>
          <h4>관련 태그</h4>
        </div>
        <div>
          <h4>이용금액</h4>
        </div>
        <div>
          <h4>영업시간</h4>
        </div>
        <div>
          <h4>시설 정보</h4>
        </div>
        <div>
          <h4>난이도</h4>
        </div>
        <div>
          <h4>연락처</h4>
        </div>
        <div>
          <h4>암장 사진</h4>
        </div>
        <input type="submit" name="" />
      </Styled.Form>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    h4 {
      margin-top: 0;
      margin-bottom: 4px;
    }
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
};

export default NewGymForm;
