import { styled } from "styled-components";

interface LoadingProps {
  cardList: Array<JSX.Element>;
}

const LazyLoadingItems = ({ cardList }: LoadingProps) => {
  return <S.Wrapper>{cardList}</S.Wrapper>;
};

const S = {
  Wrapper: styled.div<{
    width?: string;
  }>``,
};

export default LazyLoadingItems;
