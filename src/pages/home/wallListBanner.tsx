import LazyLoadingItems from "@/components/LazyLoadingItems";
import PreviewCard from "@/components/PreviewCard";
import styled from "styled-components";

const sampleWall = {
  thumbnailSrc: "/public/thumbnail2.png",
  address: "서울 강남구 신사동 529-4 B2",
  name: "더자스클라이밍짐2",
  latestSettingDay: "22.03.04",
  likeNumber: 156,
};
const sampleWallList = [
  {
    id: 1,
    info: {
      thumbnailSrc: "./public/thumbnail1.png",
      address: "서울 강남구 신사동 529-4 B1",
      name: "더자스클라이밍짐",
      latestSettingDay: "22.03.03",
      likeNumber: 155,
    },
  },
  {
    id: 2,
    info: {
      thumbnailSrc: "./public/thumbnail2.png",
      address: "서울 강남구 신사동 529-4 B2",
      name: "더자스클라이밍짐2",
      latestSettingDay: "22.03.04",
      likeNumber: 156,
    },
  },
  {
    id: 3,
    info: {
      thumbnailSrc: "./public/thumbnail3.png",
      address: "서울 강남구 신사동 529-4 B3",
      name: "더자스클라이밍짐3",
      latestSettingDay: "22.03.05",
      likeNumber: 157,
    },
  },
  {
    id: 4,
    info: {
      thumbnailSrc: "./public/thumbnail2.png",
      address: "서울 강남구 신사동 529-4 B2",
      name: "더자스클라이밍짐2",
      latestSettingDay: "22.03.04",
      likeNumber: 156,
    },
  },
  {
    id: 5,
    info: {
      thumbnailSrc: "./public/thumbnail1.png",
      address: "서울 강남구 신사동 529-4 B1",
      name: "더자스클라이밍짐1",
      latestSettingDay: "22.03.03",
      likeNumber: 155,
    },
  },
  {
    id: 6,
    info: {
      thumbnailSrc: "./public/thumbnail1.png",
      address: "서울 강남구 신사동 529-4 B1",
      name: "더자스클라이밍짐1",
      latestSettingDay: "22.03.03",
      likeNumber: 155,
    },
  },
];

const WallListBanner = () => {
  const wallList = [
    <PreviewCard key="3" width="380px" height="350px" cardInfo={sampleWall} />,
    <div key="2">bye</div>,
  ];
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
