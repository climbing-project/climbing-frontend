import LazyLoadingItems from "@/components/LazyLoadingItems";
import PreviewCard from "@/components/PreviewCard";
import styled from "styled-components";
import { GymSampleInfo } from ".";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";

const sampleList = [
  {
    thumbnailSrc: "/public/thumbnail2.png",
    address: "서울 강남구 신사1동 529-4 B2",
    name: "정렬기준 클릭",
    latestSettingDay: "22.03.04",
    likeNumber: 156,
  },
];

interface GymListBannerProps {
  gymList: Array<GymSampleInfo>;
  setGymList: Dispatch<SetStateAction<GymSampleInfo[]>>;
}

const GymListBanner = ({ gymList, setGymList }: GymListBannerProps) => {
  const sortingType = ["인기순", "최신순", "거리순"];

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // 누른 버튼(인기순,최신순..)에 따라 다른값을 서버로 요청해서 데이터 받기
    // const res = await getSearchRequest(userInput);
    console.log(event.currentTarget.textContent);
    setGymList(sampleList);
  };

  const SortingButtons = sortingType.map((type, index) => {
    return (
      <Styled.SortButton key={index} onClick={handleClick}>
        {type}
      </Styled.SortButton>
    );
  });

  const CardList =
    gymList &&
    gymList.map((gymInfo, index) => {
      return (
        <PreviewCard
          key={index}
          width="350px"
          height="300px"
          cardInfo={gymInfo}
        />
      );
    });

  return (
    <Styled.Wrapper>
      <Styled.ButtonWrapper>{SortingButtons}</Styled.ButtonWrapper>
      <LazyLoadingItems cardList={CardList} />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: flex-start;
  `,
  SortButton: styled.button`
    margin: 5px;
  `,
};

export default GymListBanner;
