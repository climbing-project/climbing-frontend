import { SetStateAction, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { requestData } from "@/service/api";
import PreviewCard from "./PreviewCard";
import { LazyLoadingItemsProps } from "@/constants/search/types";
import { SimpleGymData } from "@/constants/gyms/types";
import { styled } from "styled-components";

const LazyLoadingItems = ({
  searchWord = "",
  sortingType,
  isSearchPage = true,
}: LazyLoadingItemsProps) => {
  const [items, setItems] = useState<SimpleGymData[]>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [queryUrl, setQueryUrl] = useState<string>("");

  const getMoreData = () => {
    if (isSearchPage) {
      const onSuccess = (gymsData: SimpleGymData[]) => {
        if (gymsData.length == 0) {
          setHasMore(false);
        } else {
          setItems(items.concat(gymsData));
          setCurrPage(currPage + 1);
        }
      };

      requestData({
        option: "GET",
        url: `/gyms/search?${queryUrl}&p=${currPage}`,
        hasBody: true,
        onSuccess,
      });
    }
  };

  useEffect(() => {
    // page.current = 1;
    // console.log("useEffet : " + page.current);
    if (isSearchPage) {
      let query = `q=${searchWord}`;
      if (sortingType) {
        query += `&s=${sortingType}`;
      }

      const onSuccess = (gymsData: SimpleGymData[]) => {
        setItems(gymsData);
        if (gymsData.length != 0) {
          setQueryUrl(query);
          setCurrPage(currPage + 1);
          // console.log(page.current);
          setHasMore(true);
        }
      };

      requestData({
        option: "GET",
        url: `/gyms/search?${query}&p=0`,
        hasBody: true,
        onSuccess,
      });
    } else {
      const onSuccess = (gymsData: SimpleGymData[]) => {
        setItems(gymsData);
        setHasMore(false);
      };
      requestData({
        option: "GET",
        url: `/gyms`,
        hasBody: true,
        onSuccess,
      });
    }
  }, [isSearchPage, searchWord, sortingType]);

  // console.log(items);
  const PreviewCards = items.map((gymInfo, index) => {
    return (
      <PreviewCard
        key={index}
        width="350px"
        height="350px"
        cardInfo={gymInfo}
      />
    );
  });

  return (
    <InfiniteScroll
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      dataLength={items.length}
      next={getMoreData}
      hasMore={hasMore}
      scrollableTarget="scrollableDiv"
      loader={<h4>Loading ...</h4>}
      // endMessage={
      //   <p style={{ textAlign: "center" }}>
      //     <b>마지막</b>
      //   </p>
      // }
    >
      {isSearchPage ? PreviewCards : PreviewCards.slice(0, 6)}
    </InfiniteScroll>
  );
};

const S = {
  InfiniteWrapper: styled.div`
    display: flex;
    justify-content: center;
  `,
};

export default LazyLoadingItems;
