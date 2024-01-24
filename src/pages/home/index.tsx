import styled from "styled-components";
import { useState } from "react";
import GymListBanner from "./GymListBanner";
import SearchBanner from "./searchBanner";

const sampleGyms: GymSampleInfo[] = [
  {
    thumbnailSrc: "/public/thumbnail2.png",
    address: "서울 강남구 신사1동 529-4 B2",
    name: "더자스클라이밍짐2",
    latestSettingDay: "22.03.04",
    likeNumber: 156,
  },
  {
    thumbnailSrc: "./public/thumbnail1.png",
    address: "서울 강남구 신사2동 529-4 B1",
    name: "더자스클라이밍짐",
    latestSettingDay: "22.03.03",
    likeNumber: 155,
  },
  {
    thumbnailSrc: "./public/thumbnail2.png",
    address: "서울 송파구 신사동 529-4 B2",
    name: "더자스클라이밍짐2",
    latestSettingDay: "22.03.04",
    likeNumber: 156,
  },
  {
    thumbnailSrc: "./public/thumbnail3.png",
    address: "서울 송파구 송파동 신사동 529-4 B3",
    name: "더자스클라이밍짐3",
    latestSettingDay: "22.03.05",
    likeNumber: 157,
  },
  {
    thumbnailSrc: "./public/thumbnail2.png",
    address: "서울 송파구 송파2동 529-4 B2",
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

export interface GymSampleInfo {
  thumbnailSrc: string;
  address: string;
  name: string;
  latestSettingDay: string;
  likeNumber: number;
}

const Home = () => {
  const [gymLists, setGymLists] = useState<GymSampleInfo[]>(sampleGyms);

  return (
    <Styled.Wrapper>
      <SearchBanner setGymList={setGymLists} />
      <GymListBanner gymList={gymLists} setGymList={setGymLists} />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div``,
};

export default Home;
