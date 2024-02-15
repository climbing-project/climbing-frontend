import { useState } from 'react';
import styled from 'styled-components';
import TextField from './TextField';
import AddressField from './AddressField';
import ContactField from './ContactField';

interface NewGymFormProps {
  handleSubmit: Function;
}

const NewGymForm = ({ handleSubmit }: NewGymFormProps) => {
  const [address, setAddress] = useState({
    jibunAddress: '',
    roadAddress: '',
    unitAddress: '',
  });
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  const getSettingDate = (): string => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString();
    const day = currentDate.getDate().toString();
    const settingDate = `${year.slice(-2)}.${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
    return settingDate;
  };

  return (
    <Styled.Wrapper>
      <Styled.Form
        onSubmit={(e) => {
          e.preventDefault();
          const nameField = document.querySelector(
            '.field__name',
          ) as HTMLInputElement;
          const contactField = document.querySelector(
            '.field__contact',
          ) as HTMLInputElement;
          handleSubmit({
            name: nameField.value,
            address,
            coordinates,
            contact: contactField.value,
            latestSettingDay: getSettingDate(),
          });
        }}
      >
        <div>
          <h4>암장명</h4>
          <TextField formName={'name'} characterLimit={20} />
        </div>
        <div>
          <h4>암장 주소</h4>
          <AddressField
            setAddress={setAddress}
            setCoordinates={setCoordinates}
          />
        </div>
        <div>
          <h4>연락처</h4>
          <ContactField />
        </div>
        <input type="submit" value="등록" />
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
