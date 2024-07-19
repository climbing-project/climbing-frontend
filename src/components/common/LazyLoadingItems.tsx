import { SetStateAction, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { requestData } from "@/service/api";
import PreviewCard from "./PreviewCard";
import { usePathname } from "next/dist/client/components/navigation";
import { LazyLoadingItemsProps } from "@/constants/search/types";
import { SimpleGymData } from "@/constants/gyms/types";
import { styled } from "styled-components";

const LazyLoadingItems = ({
  searchWord = "",
  sortingType,
}: LazyLoadingItemsProps) => {
  const pathName = usePathname() as string;
  const [items, setItems] = useState<SimpleGymData[]>([]);
  const page = useRef(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [queryUrl, setQueryUrl] = useState<string>("");

  const getMoreData = () => {
    if (pathName.includes("search")) {
      const onSuccess = (gymsData: SimpleGymData[]) => {
        if (gymsData.length == 0) {
          setHasMore(false);
        } else {
          setItems(items.concat(gymsData));
          page.current += 1;
        }
      };

      // requestData({
      //   option: "GET",
      //   url: `/gyms/search?${queryUrl}&p=${page.current}`,
      //   hasBody: true,
      //   onSuccess,
      // });
    }
  };

  useEffect(() => {
    if (pathName?.includes("search")) {
      let query = `q=${searchWord}`;
      if (sortingType) {
        query += `&s=${sortingType}`;
      }

      const onSuccess = (gymsData: SimpleGymData[]) => {
        setItems(gymsData);
        if (gymsData.length != 0) {
          setQueryUrl(query);
          page.current += 1;
          setHasMore(true);
        }
      };

      // requestData({
      //   option: "GET",
      //   url: `/gyms/search?${query}&p=0`,
      //   hasBody: true,
      //   onSuccess,
      // });
    } else {
      const onSuccess = (gymsData: SimpleGymData[]) => {
        setItems(gymsData);
        setHasMore(false);
      };
      // requestData({
      //   option: "GET",
      //   url: `/gyms`,
      //   hasBody: true,
      //   onSuccess,
      // });
    }
  }, [pathName, searchWord, sortingType]);

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
      {pathName.includes("search") ? PreviewCards : PreviewCards.slice(0, 6)}
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
