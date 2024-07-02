/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { NAVERMAP_STATIC_API } from "@/constants/constants";
import type { MapProps } from "@/constants/gyms/types";

const MAP_SIZES = {
  mobile: {
    width: 280,
    height: 200,
  },
  tablet: {
    width: 560,
    height: 400,
  },
  desktop: {
    width: 716,
    height: 400,
  },
};

const DynamicMap = ({ isLoading, name, coordinates }: MapProps) => {
  const [staticImg, setstaticImg] = useState<null | string>(null);

  useEffect(() => {
    if (!name || !coordinates || isLoading || !window) return;
    const { latitude, longitude } = coordinates;
    const encodedName = encodeURIComponent(name);
    const viewportWidth = window.innerWidth;
    let imageUrl;

    // Naver StaticMap API를 한번만 호출하기 때문에 렌더링 당시의 viewport 너비에 따라 고정된 이미지 사이즈를 가져옴
    if (viewportWidth <= 600) {
      const WIDTH = MAP_SIZES.mobile.width;
      const HEIGHT = MAP_SIZES.mobile.height;
      imageUrl = `${NAVERMAP_STATIC_API}w=${WIDTH}&h=${HEIGHT}&markers=type:t|size:small|color:blue|label:${encodedName}|pos:${longitude}%20${latitude}&X-NCP-APIGW-API-KEY-ID=lm660e08li`;
    } else if (viewportWidth <= 900) {
      const WIDTH = MAP_SIZES.tablet.width;
      const HEIGHT = MAP_SIZES.tablet.height;
      imageUrl = `${NAVERMAP_STATIC_API}w=${WIDTH}&h=${HEIGHT}&markers=type:t|size:small|color:blue|label:${encodedName}|pos:${longitude}%20${latitude}&X-NCP-APIGW-API-KEY-ID=lm660e08li`;
    } else {
      const WIDTH = MAP_SIZES.desktop.width;
      const HEIGHT = MAP_SIZES.desktop.height;
      imageUrl = `${NAVERMAP_STATIC_API}w=${WIDTH}&h=${HEIGHT}&markers=type:t|size:small|color:blue|label:${encodedName}|pos:${longitude}%20${latitude}&format=png&X-NCP-APIGW-API-KEY-ID=lm660e08li`;
    }

    setstaticImg(imageUrl);
  }, [name, coordinates, isLoading]);

  if (isLoading) return <div className="skeleton map-container" />;
  if (staticImg)
    return (
      <div className="map-container">
        <img src={staticImg} alt="암장 지도" />
      </div>
    );
  return null;
};

export default DynamicMap;
