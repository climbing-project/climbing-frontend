import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import {
  BsTwitterX,
  BsFacebook,
  BsInstagram,
  BsTelephoneFill,
  BsGlobe2,
} from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import { GymData } from '@/pages/admin/edit';

interface BasicInfoProps {
  name: string;
  address: { jibunAddress: string; roadAddress: string; unitAddress: string };
  contact: string;
  snsList?: { twitter?: string; facebook?: string; instagram?: string };
  homepage?: string;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

const REGEX_NUMBER = /^[0-9-]*$/;

const BasicInfoEditor = ({
  name,
  address,
  contact,
  snsList,
  homepage,
  setCurrentData,
}: BasicInfoProps) => {
  const handleNameChange = (input: string) => {
    if (input.length > 20) return;
    setCurrentData((prev) => ({ ...prev, name: input }) as GymData);
  };

  const handleHomepageChange = (input: string) => {
    if (input.length > 50) return;
    setCurrentData((prev) => ({ ...prev, homepage: input }) as GymData);
  };

  const handleContactChange = (input: string) => {
    if (!REGEX_NUMBER.test(input)) return;
    if (input.length > 15) return;
    setCurrentData((prev) => ({ ...prev, contact: input }) as GymData);
  };

  const handleSnsChange = (input: string, key: string) => {
    if (input.length > 30) return;
    setCurrentData((prev) => {
      const newObject = prev ? { ...prev.sns } : {};
      newObject[key as keyof typeof newObject] = input;
      return { ...prev, sns: newObject } as GymData;
    });
  };

  const handleAddressChange = (input: string, key: string) => {
    if (input.length > 30) return;
    setCurrentData((prev) => {
      const newObject = prev
        ? { ...prev.address }
        : { jibunAddress: '', roadAddress: '', unitAddress: '' };
      newObject[key as keyof typeof newObject] = input;
      return { ...prev, address: newObject } as GymData;
    });
  };

  return (
    <Styled.Wrapper>
      <Styled.Header>기본 정보</Styled.Header>
      <Styled.Content $direction="column">
        <div>
          <div>
            <h4>암장 이름</h4>
            <Styled.TextField $width="380px">
              <input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
              {name.length}/20
            </Styled.TextField>
          </div>
          <div>
            <h4>주소</h4>
            <Styled.TextField $width="450px">
              <input defaultValue={address.roadAddress} readOnly />
              <input
                value={address.unitAddress}
                onChange={(e) =>
                  handleAddressChange(e.target.value, 'unitAddress')
                }
                placeholder="상세 주소"
              />
              <IoSearch className="field-icon" onClick={() => console.log()} />
            </Styled.TextField>
          </div>
        </div>
        <div>
          <div>
            <h4>연락처</h4>
            <Styled.TextField $width="240px">
              <BsTelephoneFill />
              <input
                value={contact}
                onChange={(e) => handleContactChange(e.target.value)}
              />
              {contact.length}/15
            </Styled.TextField>
          </div>
          <div>
            <h4>도메인</h4>
            <Styled.TextField $width="350px">
              <BsGlobe2 />
              <input
                value={homepage}
                onChange={(e) => handleHomepageChange(e.target.value)}
              />
            </Styled.TextField>
          </div>
        </div>
        <div>
          <div>
            <h4>SNS</h4>
            <div className="field__list">
              {SNS_VALUES.map(({ platform, icon }, i) => (
                <Styled.TextField key={i} $width="300px">
                  {icon}
                  <input
                    name={platform}
                    value={
                      snsList ? snsList[platform as keyof typeof snsList] : ''
                    }
                    onChange={(e) => {
                      handleSnsChange(e.target.value, e.target.name);
                    }}
                  />
                </Styled.TextField>
              ))}
            </div>
          </div>
        </div>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    background: white;
    border: 1px solid #d0d0d0;
  `,
  Header: styled.div`
    border-bottom: 1px solid #d0d0d0;
    font-weight: 700;
    font-size: 24px;
    padding: 32px 40px;
  `,
  Content: styled.div<{ $direction?: string }>`
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    gap: 20px;

    .field__list,
    & > div {
      display: flex;
      gap: 8px;
    }
  `,
  TextField: styled.div<{ $width?: string }>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 6px;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #d0d0d0;
    padding: 12px 18px;
    width: ${({ $width }) => $width || '200px'};

    input {
      border: none;
      background: transparent;
      width: 100%;
      padding: 0;
    }

    .field-icon {
      flex-shrink: 0;
      cursor: pointer;
    }
  `,
};

const SNS_VALUES = [
  {
    platform: 'twitter',
    icon: <BsTwitterX />,
  },
  {
    platform: 'facebook',
    icon: <BsFacebook />,
  },
  { platform: 'instagram', icon: <BsInstagram /> },
];

export default BasicInfoEditor;
