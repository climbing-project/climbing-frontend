import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { GymData } from '@/pages/admin/edit';

interface AccommodationsEditorProps {
  accommodationsList: string[] | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData | null>>;
}

const AccommodationsEditor = ({
  accommodationsList,
  setCurrentData,
}: AccommodationsEditorProps) => {
  const handleChange = (checkedItem: string, isChecked: boolean) => {
    if (isChecked) {
      const prevList = accommodationsList ? accommodationsList : [];
      setCurrentData(
        (prev) =>
          ({ ...prev, accommodations: [...prevList, checkedItem] }) as GymData,
      );
    } else {
      const filteredList = accommodationsList?.filter(
        (item) => item !== checkedItem,
      );
      setCurrentData(
        (prev) => ({ ...prev, accommodations: [...filteredList!] }) as GymData,
      );
    }
  };
  return (
    <Styled.Wrapper>
      <Styled.Header>시설 정보</Styled.Header>
      <Styled.Content>
        {ACCOMMODATIONS_LIST.map(({ value, text }) => (
          <label key={value}>
            <input
              type="checkbox"
              name={value}
              defaultChecked={accommodationsList?.includes(value)}
              onChange={(e) => {
                handleChange(e.target.name, e.target.checked);
              }}
            />
            {text}
          </label>
        ))}
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
  `,
};

// 상수
export const ACCOMMODATIONS_LIST = [
  {
    value: 'showers',
    text: '샤워실',
  },
  {
    value: 'yogamat',
    text: '요가매트',
  },
  {
    value: 'gymball',
    text: '짐볼',
  },
  {
    value: 'moonboard',
    text: '문보드',
  },
];

export default AccommodationsEditor;
