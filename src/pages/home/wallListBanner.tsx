import LazyLoadingItems from "@/components/LazyLoadingItems";
import PreviewCard from "@/components/PreviewCard";
import styled from "styled-components";

const sampleWalls = [
  {
    thumbnailSrc: "/public/thumbnail2.png",
    address: "서울 강남구 신사동 529-4 B2",
    name: "더자스클라이밍짐2",
    latestSettingDay: "22.03.04",
    likeNumber: 156,
  },
  {
    thumbnailSrc: "./public/thumbnail1.png",
    address: "서울 강남구 신사동 529-4 B1",
    name: "더자스클라이밍짐",
    latestSettingDay: "22.03.03",
    likeNumber: 155,
  },
  {
    thumbnailSrc: "./public/thumbnail2.png",
    address: "서울 강남구 신사동 529-4 B2",
    name: "더자스클라이밍짐2",
    latestSettingDay: "22.03.04",
    likeNumber: 156,
  },
  {
    thumbnailSrc: "./public/thumbnail3.png",
    address: "서울 강남구 신사동 529-4 B3",
    name: "더자스클라이밍짐3",
    latestSettingDay: "22.03.05",
    likeNumber: 157,
  },
  {
    thumbnailSrc: "./public/thumbnail2.png",
    address: "서울 강남구 신사동 529-4 B2",
    name: "더자스클라이밍짐2",
    latestSettingDay: "22.03.04",
    likeNumber: 156,
  },
  {
    thumbnailSrc: "./public/thumbnail1.png",
    address: "서울 강남구 신사동 529-4 B1",
    name: "더자스클라이밍짐1",
    latestSettingDay: "22.03.03",
    likeNumber: 155,
  },
  {
    thumbnailSrc: "./public/thumbnail1.png",
    address: "서울 강남구 신사동 529-4 B1",
    name: "더자스클라이밍짐1",
    latestSettingDay: "22.03.03",
    likeNumber: 155,
  },
];

const wallList = sampleWalls.map((wallInfo, index) => {
  return (
    <PreviewCard key={index} width="350px" height="300px" cardInfo={wallInfo} />
  );
});

const WallListBanner = () => {
  return (
    <Styled.Wrapper>
      <LazyLoadingItems cardList={wallList} />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
};

export default WallListBanner;
