import { useEffect, useState } from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import styled from 'styled-components';
import {
  IoShareSocialOutline,
  IoHeart,
  IoHeartOutline,
  IoBookmark,
  IoBookmarkOutline,
} from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import Tag from '@/components/Tag';
import DetailedList from '@/components/DetailedList';
import DifficultyBar from '@/components/DifficultyBar';
import ContactInfo from '@/components/ContactInfo';
import DynamicMap from '@/components/DynamicMap';

const GymInfo = ({
  gymData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // 네이버 지도 API 로딩 관련 상태
  const [isLoading, setIsLoading] = useState(true);

  // 네이버 지도 API를 동적으로 로딩 및 적용
  useEffect(() => {
    const mapApi =
      'https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=lm660e08li';
    const script = document.querySelector(
      `script[src='${mapApi}']`,
    ) as HTMLScriptElement;

    if (script) {
      handleLoader();
      return;
    }

    const newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = mapApi;
    document.head.appendChild(newScript);
    newScript.onload = handleLoader;
  }, []);

  // API 로딩 상태 핸들러
  const handleLoader = () => {
    setIsLoading(false);
  };

  return (
    <Styled.Wrapper>
      <Styled.Placeholder>
        <div className="photos">암장 사진</div>
      </Styled.Placeholder>
      <Styled.InfoContainer>
        <Styled.Column>
          <div className="sub-header">
            <FaLocationDot /> {gymData.address}
            <br />
            <div className="sub-name">
              <span>{gymData.name}</span>&nbsp;
              <IoHeartOutline /> <IoBookmarkOutline /> <IoShareSocialOutline />
            </div>
          </div>
          <Styled.Placeholder>
            <div className="description">{gymData.description}</div>
          </Styled.Placeholder>
          {isLoading ? null : <DynamicMap coordinates={gymData.coordinates} />}
          <div>댓글</div>
        </Styled.Column>
        <Styled.Column>
          <Styled.SideContainer className="container">
            <h4>관련 태그</h4>
            {gymData.tags.map((tag: string, i: number) => (
              <Tag key={i} prefix="#" text={tag} />
            ))}
          </Styled.SideContainer>
          <Styled.SideContainer className="container">
            <h4>이용금액</h4>
            <DetailedList items={gymData.pricing} />
          </Styled.SideContainer>
          <Styled.SideContainer className="container">
            <h4>영업시간</h4>
            <DetailedList items={gymData.openHours} />
          </Styled.SideContainer>
          <Styled.SideContainer className="container">
            <h4>시설 정보</h4>
            {gymData.accommodations.join(', ')}
          </Styled.SideContainer>
          <Styled.SideContainer className="container">
            <h4>난이도</h4>
            <DifficultyBar difficulty={gymData.difficulty} />
          </Styled.SideContainer>
          <Styled.SideContainer className="container">
            <h4>연락처</h4>
            <ContactInfo contactList={gymData.contact} />
          </Styled.SideContainer>
        </Styled.Column>
      </Styled.InfoContainer>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  InfoContainer: styled.div`
    display: flex;
    width: 1200px;
    justify-content: space-between;
    margin-top: 40px;
  `,
  Column: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    div {
      border: 1px solid #eeeeee;
    }

    h4 {
      margin-top: 0;
      margin-bottom: 16px;
    }
  `,
  SideContainer: styled.div`
    padding: 24px 28px;
  `,
  // 임시 컴포넌트 - 최종 프로덕트에서 제외
  Placeholder: styled.div`
    .photos {
      width: 1200px;
      height: 568px;
      border-radius: 8px;
      background: #eee;
      text-align: center;
    }

    .description {
      max-width: 736px;
    }
  `,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gymId = context.query.id;

  /* 
  암장 정보를 불러오는 API가 준비될 시 아래 코드로 교체 예정:

  // Fetch API data
  const gymData = await (await fetch(`.../gyms/${gymId}`)).json();
  return { props: { gymData } };
  */

  // 임시 데이터
  const gymData = {
    images: [],
    address: '서울시 강남구 테헤란로 123',
    coordinates: {
      latitude: 37.3595704,
      longitude: 127.1054221,
    },
    name: '클라이밍성지',
    description: `1940년대 프랑스 전문 산악인들의 교육 훈련용으로 시작된 이후, 인공으로 만들어진 암벽 구조물을 손과 발을 사용하여 등반하는 레저스포츠로 발전하였다. '인공암벽등반'이라고도 한다. 유럽과 러시아, 미국으로 전파되어 다양한 국제 대회가 개최되었고, 1987년 국제산악연맹(UIAA)에서 스포츠클라이밍에 관한 규정을 제정하면서 스포츠 경기로서의 규칙을 갖추었다. 한국에는 1988년에 도입되었고, 전국적으로 빠르게 보급되어 사계절 내내 즐길 수 있는 레저 스포츠로서 각광받고 있다. 제32회 올림픽경기대회(도쿄 올림픽)부터 올림픽 정식 종목으로 채택되었다.`,
    difficulty: 5,
    openHours: [
      {
        days: '평일',
        time: '10:00 - 20:00',
      },
      {
        days: '주말',
        time: '13:00 - 22:00',
      },
      {
        days: '공휴일',
        time: '휴관',
      },
    ],
    pricing: [
      { item: '일일 이용권', price: '10,000원' },
      { item: '주간 멤버십(이용+암벽화+강습)', price: '89,000원' },
      { item: '월간 멤버십(사우나 포함)', price: '월 100,000원' },
    ],
    accommodations: [
      '샤워실',
      '무료 wifi',
      '락커',
      '요가매트',
      '짐볼',
      '어린이 놀이터',
    ],
    tags: ['암벽', '짱', '운동', '하세요'],
    contact: [
      { platform: 'twitter', address: 'sdlfkj' },
      { platform: 'facebook', address: 'sdlfkj' },
      { platform: 'instagram', address: 'sdlfkj' },
      { platform: 'phone', address: '010-1234-5678' },
    ],
  };

  return { props: { gymData } };
};

export default GymInfo;
