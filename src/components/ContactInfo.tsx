import styled from 'styled-components';
import {
  BsTwitterX,
  BsFacebook,
  BsInstagram,
  BsTelephoneFill,
} from 'react-icons/bs';
import { ContactInfoProps } from '@/constants/types';

// 상수
export const CONTACT_ICONS = {
  phone: <BsTelephoneFill />,
  twitter: <BsTwitterX />,
  facebook: <BsFacebook />,
  instagram: <BsInstagram />,
};

const ContactInfo = ({ contact, snsList }: ContactInfoProps) => {
  const platforms = snsList ? Object.keys(snsList) : [];
  return (
    <S.Wrapper>
      {CONTACT_ICONS.phone} {contact}
      {platforms.map((platform, i) => (
        <div key={i}>
          {CONTACT_ICONS[platform as keyof typeof CONTACT_ICONS]}{' '}
          {snsList[platform as keyof typeof snsList]}
        </div>
      ))}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    gap: 30px;
    width: 100%;

    div {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  `,
};

export default ContactInfo;
