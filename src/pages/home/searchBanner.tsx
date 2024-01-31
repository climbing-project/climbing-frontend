import { Search } from "@/components/Search";
import { IoSearch } from "react-icons/io5";
import styled from "styled-components";
import { GymSampleInfo } from ".";
import { Dispatch, FormEventHandler, SetStateAction } from "react";

const sampleAddress = [
  { id: 1, info: "잠실" },
  { id: 2, info: "잠실2동" },
  { id: 3, info: "잠실1동" },
  { id: 4, info: "송파동" },
  { id: 5, info: "송파2동" },
  { id: 6, info: "송파1동" },
];

const sampleList = [
  {
    thumbnailSrc: "/public/thumbnail2.png",
    address: "서울 강남구 신사1동 529-4 B2",
    name: "search클릭",
    latestSettingDay: "22.03.04",
    likeNumber: 156,
  },
];

interface SearchBannerProps {
  setGymList: Dispatch<SetStateAction<GymSampleInfo[]>>;
}

const SearchBanner = ({ setGymList }: SearchBannerProps) => {
  const getData = async (input: string | null) => {
    const res = await fetch(`http://localhost:3000/search?q={input}`);
    const data = await res.json();
    setGymList(data);
  };

  const handleGymList = (event: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    console.log(event.target["search"].value);
    getData(event.target["search"].value); // 서버로 요청해서 데이터 받기
    // setGymList(sampleList);
  };

  return (
    <Styled.Wrapper>
      <Search
        dataList={sampleAddress}
        width="400px"
        postfixIcon={<IoSearch />}
        placeholder="주소를 입력하면 실내암벽장을 찾아드려요."
        onSubmit={handleGymList as (unknown: unknown) => unknown}
        useLocation={true}
      />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 150px;
    margin-top: 50px;
  `,
};

export default SearchBanner;
