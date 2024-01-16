import { useEffect } from 'react';
import styled from 'styled-components';

interface MapCoordinates {
  latitude: string | number;
  longitude: string | number;
}

interface MapProps {
  coordinates: MapCoordinates;
}

const NaverMap = ({ coordinates }: MapProps) => {
  const { latitude, longitude } = coordinates;

  useEffect(() => {
    getMap();
  }, []);

  const getMap = () => {
    const position = new naver.maps.LatLng(Number(latitude), Number(longitude));
    const map = new naver.maps.Map('map', {
      center: position,
      zoom: 16,
    });

    const marker = new naver.maps.Marker({
      position,
      map,
    });
  };

  return <StyledDiv id="map"></StyledDiv>;
};

const StyledDiv = styled.div`
  width: 100%;
  height: 400px;
`;

export default NaverMap;
