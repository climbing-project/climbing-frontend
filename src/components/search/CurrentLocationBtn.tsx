import styled from "styled-components";
import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";
import { CurrentLocationBtnProps } from "@/constants/search/types";
import { COLOR } from "@/styles/global-color";

const GEOToAddress = async (longitude: number, latitude: number) => {
  const response = await (
    await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API}`,
        },
      }
    )
  ).json();

  return response["documents"][1]["address_name"]; // ~~2동 까지 나옴
};

const CurrentLocationBtn = ({ fontSize = "18px" }: CurrentLocationBtnProps) => {
  const [location, setLocation] = useState("현재 위치로 찾기");

  const success = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = await GEOToAddress(longitude, latitude);
    setLocation(location);
  };

  const error = () => {
    // 현재 위치 못가져옴
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      // 브라우저가 위치 정보를 지원하지 않음;
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return (
    <S.Wrapper fontSize={fontSize} onClick={handleLocation}>
      <IoLocationOutline size={23} color={COLOR.SPECIAL} />
      <S.Space></S.Space>
      {location}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{ fontSize?: string }>`
    display: flex;
    flex-direction: row;
    padding: 3px 10px;
    align-items: center;
    height: 30px;
    background-color: white;
    color: ${COLOR.SPECIAL};
    cursor: pointer;
    ${(props) => props.fontSize && `font-size: ${props.fontSize}`}
  `,
  Space: styled.div`
    margin-left: 10px;
  `,
};

export default CurrentLocationBtn;
