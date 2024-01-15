import styled from 'styled-components';

// 상수
const DIFFICULTY_COLORS = [
  '#f35f5f',
  '#fabb72',
  '#f3db85',
  '#b2dea3',
  '#b1d3ff',
  '#538adc',
  '#7c64dd',
];

interface DifficultyBarProps {
  [key: string]: number;
}

const DifficultyBar: React.FC<DifficultyBarProps> = ({ difficulty = 0 }) => {
  const colorCount = DIFFICULTY_COLORS.length;
  const barColors = DIFFICULTY_COLORS.slice(0, difficulty).concat(
    Array(colorCount - difficulty).fill(undefined),
  );

  return (
    <Styled.Wrapper>
      <Bar.Container>
        {barColors.map((color, i) => (
          <Bar.Box key={i} $color={color} />
        ))}
      </Bar.Container>
      <Label>
        <span>easy</span>
        <span>hard</span>
      </Label>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
};

const Bar = {
  Container: styled.div`
    display: flex;
    gap: 2px;
  `,
  Box: styled.div<{ $color?: string }>`
    height: 33px;
    flex: 1 0 0;
    background: ${(props) => props.$color || '#d9d9d9'};
  `,
};

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  color: #b7b7b7;
  line-height: 150%;
  margin-top: 4px;
`;

export default DifficultyBar;
