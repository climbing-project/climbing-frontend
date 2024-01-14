import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import styled from 'styled-components';

const GymInfo = ({
  gymData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Styled.Wrapper>
      <div>헤더 이미지</div>
      <Styled.InfoContainer>
        <Styled.Column>
          <div className="sub-header">
            암장 주소
            <br />
            <div className="sub-name">
              <span>암장명</span>
              <span>버튼</span>
            </div>
          </div>
          <div>암장 설명</div>
          <div>구글지도</div>
          <div>댓글</div>
        </Styled.Column>
        <Styled.Column>
          <div>관련 태그</div>
          <div>이용금액</div>
          <div>영업시간</div>
          <div>시설 정보</div>
          <div>난이도</div>
          <div>연락처</div>
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
  `,
  Column: styled.div`
    display: flex;
    flex-direction: column;
  `,
};

export const getServerSideProps: GetServerSideProps = async () => {
  /* 
  암장 정보를 불러오는 API가 준비될 시 아래 코드로 교체 예정:

  // Fetch API data
  const gymData = await (await fetch('')).json();
  return { props: { gymData } };
  */

  return { props: {} };
};

export default GymInfo;
