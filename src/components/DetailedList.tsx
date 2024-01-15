import styled from 'styled-components';

interface DetailedListItem {
  [key: string]: string | number;
}

interface DetailedListProps {
  items: Array<DetailedListItem>;
}

const DetailedList: React.FC<DetailedListProps> = ({ items }) => {
  return (
    <Styled.Wrapper>
      {items.map((item, i) => {
        const keys = Object.keys(item);
        return (
          <Styled.Item key={i}>
            <div>{item[keys[0]]}</div>
            <Styled.Div>
              <Styled.Hr></Styled.Hr>
            </Styled.Div>
            <div>{item[keys[1]]}</div>
          </Styled.Item>
        );
      })}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.ul`
    margin-block: 0;
    padding: 0;
    list-style: none;
  `,
  Item: styled.li`
    display: flex;
    justify-content: space-between;
    gap: 8px;
  `,
  Div: styled.div`
    flex-grow: 2;
  `,
  Hr: styled.hr`
    position: relative;
    top: 2px;
    border-top: none;
    border-bottom: 2px dotted gray;
  `,
};

export default DetailedList;
