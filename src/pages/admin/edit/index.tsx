import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ImageField from '@/admincomponents/ImageField';

export interface GymData {
  id: string;
  name: string;
  address: {
    jibunAddress: string;
    roadAddress: string;
    unitAddress: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contact: Array<{
    platform: string;
    info: string;
  }>;
  latestSettingDay: string;
  images?: Array<string>;
  openHours?: Array<{ days: string; hours: string }>;
  pricing?: Array<{ item: string; price: string }>;
  tags?: Array<string>;
  description?: string;
  grades?: Array<string>;
  accommodations?: Array<string>;
}

const EditPage = () => {
  const [currentData, setCurrentData] = useState<null | GymData>(null);
  const router = useRouter();

  // 서버로부터 암장정보 fetch
  useEffect(() => {
    // 신규 생성일 경우 router query로 넘어온 데이터를 state에 저장하고 early return함
    if (router.query.newRegister) {
      const { gymData } = router.query;
      setCurrentData(JSON.parse(gymData as string));
      return;
    }

    // 암장 등록이 돼있는 경우 fetch로 데이터를 불러와 state에 저장
    fetchData();
  }, []);

  const fetchData = () => {
    /*
    // 전역상태에 저장된 관리자계정 정보로 fetch 요청
    const id = '전역상태에서 가져온 값';
    fetch(`API주소_${id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
    */

    // 관리자계정 정보/API가 준비되기 전에 사용할 임의값
    const sampleData = {
      id: 'sample-id',
      name: '샘플암장2',
      address: {
        jibunAddress: '대전광역시 동구 판암동 498-14',
        roadAddress: '대전광역시 동구 판교3길 3',
        unitAddress: '4층',
      },
      description:
        '왜 은행회관 헬스클럽에 다녀야할까요? Why Health Club 은행회관 헬스클럽은 고품격입니다. 기구 및 각종 인테리어 최고급으로 품격을 느낄 수 있습니다. 최고급 헬스클럽과 사우나가 준비된 은행회관 헬스클럽에서 지금 바로 다짐해 보세요! ',
      coordinates: {
        latitude: 36.318415,
        longitude: 127.4521708,
      },
      contact: [
        {
          platform: 'phone',
          info: '1588-1588',
        },
      ],
      latestSettingDay: '24.02.01',
      images: [
        'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/43869ea0-2c95-49c2-915f-c06fc6abfdf1.png',
        'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/e71ff822-088f-4629-926c-de0645578b07.png',
      ],
    };

    setCurrentData(sampleData);
  };

  return (
    <Styled.Wrapper>
      <Styled.Sidebar>
        <h3>암장 정보 관리</h3>
        <div>기본 정보</div>
        <div>상세 정보</div>
        <h4>댓글 관리</h4>
      </Styled.Sidebar>
      <Styled.Main>
        <Styled.Container>
          <Styled.Header>암장 이미지</Styled.Header>
          <Styled.Content $direction="column">
            <ImageField
              imageData={currentData?.images ? currentData.images : null}
              setCurrentData={setCurrentData}
            />
          </Styled.Content>
        </Styled.Container>
        <Styled.Container>
          <Styled.Header>기본 정보</Styled.Header>
          <Styled.Content $direction="row">
            <div>
              <h4>암장 이름</h4>
              <Styled.TextField>{currentData?.name}</Styled.TextField>
            </div>
            <div>
              <h4>주소</h4>
              <Styled.TextField>
                {currentData?.address.roadAddress}{' '}
                {currentData?.address.unitAddress}
              </Styled.TextField>
            </div>
            <div>
              <h4>연락처</h4>
              <Styled.TextField>
                {currentData?.contact[0].info}
              </Styled.TextField>
            </div>
          </Styled.Content>
        </Styled.Container>
        <Styled.Container>
          <Styled.Header>설명글</Styled.Header>
          <Styled.Content>
            <div>{currentData?.description}</div>
          </Styled.Content>
        </Styled.Container>
      </Styled.Main>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    /* gap: 20px; */
  `,
  Sidebar: styled.div`
    display: flex;
    flex-direction: column;
    width: 20vw;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    gap: 36px;
    background: #fafaf8;
    padding: 36px;
  `,
  Container: styled.div`
    background: white;
    border: 1px solid #d0d0d0;
  `,
  Header: styled.div`
    border-bottom: 1px solid #d0d0d0;
    font-weight: 700;
    font-size: 24px;
    padding: 32px 40px;
  `,
  Content: styled.div<{ $direction?: string }>`
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    gap: 20px;

    h4 {
      margin-top: 0;
      margin-bottom: 8px;
    }
  `,
  TextField: styled.div`
    box-sizing: border-box;
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid #d0d0d0;
    padding: 12px 18px;
    width: 350px;
  `,
};

export default EditPage;
