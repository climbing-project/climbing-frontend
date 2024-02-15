import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import GradeBlock from './GradeBlock';
import { GymData } from '@/pages/admin/edit';

interface GradeEditorProps {
  gradesList: string[] | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData | null>>;
}

const NEW_LIST = ['#d9d9d9', '#d9d9d9', '#d9d9d9'];

const GradeEditor = ({ gradesList, setCurrentData }: GradeEditorProps) => {
  const handleColorChange = (index: number, color: string) => {
    const currentList = gradesList ? [...gradesList] : [...NEW_LIST];
    currentList[index] = color;
    setCurrentData(
      (prev) => ({ ...prev, grades: [...currentList] }) as GymData,
    );
  };
  return (
    <Styled.Wrapper>
      <Styled.Header>난이도</Styled.Header>
      <Styled.Content>
        {gradesList
          ? gradesList.map((grade, i) => (
              <GradeBlock
                key={i}
                index={i}
                color={grade}
                handleColorChange={handleColorChange}
              />
            ))
          : NEW_LIST.map((grade, i) => (
              <GradeBlock
                key={i}
                index={i}
                color={grade}
                handleColorChange={handleColorChange}
              />
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
    gap: 6px;
  `,
};

export default GradeEditor;
