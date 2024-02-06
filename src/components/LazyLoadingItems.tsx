import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { styled } from "styled-components";
import PreviewCard from "./PreviewCard";

interface LoadingProps {
  cardList: Array<JSX.Element>;
}
// { cardList }: LoadingProps
const LazyLoadingItems = () => {
  const [items, setItems] = useState([]);

  const fetchData = () => {
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 2 })));
    }, 1500);
  };

  useEffect(() => {
    // fetch.then(res=>{
    // })
  });
  // const CardList =
  //   gymList &&
  //   gymList.map((gymInfo, index) => {
  //     return (
  //       <PreviewCard
  //         key={index}
  //         width="350px"
  //         height="300px"
  //         cardInfo={gymInfo}
  //       />
  //     );
  //   });

  // return <S.Wrapper>{cardList}</S.Wrapper>;
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={true}
      loader={<h4>Loading ...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {items.map((gymInfo, index) => {
        return (
          <PreviewCard
            key={index}
            width="350px"
            height="300px"
            cardInfo={gymInfo}
          />
        );
      })}
    </InfiniteScroll>
  );
};

const S = {
  Wrapper: styled.div<{
    width?: string;
  }>`
    display: flex;
    flex-wrap: wrap;
  `,
};

export default LazyLoadingItems;
