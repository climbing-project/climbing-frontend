import LazyLoadingItems from "@/components/common/LazyLoadingItems";
import styled from "styled-components";
import { MouseEventHandler, useEffect } from "react";
import router from "next/router";
import { GymListBannerProps } from "@/constants/search/types";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import {
  queryToSortingType,
  sortingTypes,
  sortingTypeToQuery,
} from "@/constants/search/constants";

const GymListBanner = ({
  searchWord,
  sortingType = "",
}: GymListBannerProps) => {
  // const sortingTypes = ["이름순", "인기순", "세팅일순", "거리순"];
  // const sortingTypeToQuery = (type: string) => {
  //   switch (type) {
  //     case "이름순":
  //       return "NAME";
  //     case "인기순":
  //       return "POPU";
  //     case "세팅일순":
  //       return "LATE";
  //     case "거리순":
  //       return "DIST";
  //     default:
  //       return "NAME";
  //   }
  // };

  // const queryToSortingType = (query: string) => {
  //   switch (query) {
  //     case "NAME":
  //       return "이름순";
  //     case "POPU":
  //       return "인기순";
  //     case "LATE":
  //       return "세팅일순";
  //     case "DIST":
  //       return "거리순";
  //     default:
  //       return "이름순";
  //   }
  // };
  const queryType = queryToSortingType(sortingType);
  useEffect(() => {
    console.log("gymListBanner Component");
  }, []);

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const buttonText = event.currentTarget.textContent!;
    const sortingQuery = sortingTypeToQuery(buttonText);
    console.log("정렬 버튼 클릭");
    // 검색내용 포함시켜 라우팅
    if (searchWord) {
      router
        .push({
          pathname: "/search",
          query: { q: searchWord, s: sortingQuery },
        })
        .then(() => router.reload());
    } else {
      router
        .push({
          pathname: "/search",
          query: { s: sortingQuery },
        })
        .then(() => router.reload());
    }
  };

  const SortingButtons = sortingTypes.map((type, index) => {
    return (
      <Styled.Container key={index}>
        <Styled.SortButton
          className={queryType === type ? "btn-plain-clicked" : "btn-plain"}
          key={index}
          onClick={handleButtonClick}
        >
          {type}
        </Styled.SortButton>
        {index !== 3 ? <Styled.Divider>|</Styled.Divider> : null}
      </Styled.Container>
    );
  });

  return (
    <Styled.Wrapper>
      <Styled.ButtonWrapper>{SortingButtons}</Styled.ButtonWrapper>
      <LazyLoadingItems searchWord={searchWord} sortingType={sortingType} />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1140px;
    margin: 0 auto;
  `,
  Container: styled.div`
    display: flex;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    @media ${DEVICE_SIZE.mobileSmall} {
      justify-content: center;
      margin-bottom: 10px;
    }
  `,
  SortButton: styled.button`
    margin-left: 5px;
    margin-right: 5px;
    @media ${DEVICE_SIZE.mobileSmall} {
      font-size: 1rem;
    }
  `,
  Divider: styled.div`
    color: ${COLOR.BORDER_UNFOCUSED};
  `,
};

export default GymListBanner;
