import styled from 'styled-components';
import TextField from "./TextField";
import AddressField from './AddressField';
import ContactField from './ContactField';

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
          <AddressField />
        </div>
        <div>
          <h4>연락처</h4>
          <ContactField />
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
