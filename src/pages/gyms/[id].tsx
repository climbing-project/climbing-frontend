import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import Comments from "@/components/gyms/Comments";
import DynamicMap from "@/components/gyms/DynamicMap";
import ErrorPage from "@/components/common/ErrorPage";
import ChatModal from "@/components/chat/ChatModal";
import ImageCarousel from "@/components/gyms/ImageCarousel";
import MainContent from "@/components/gyms/MainContent";
import SideContent from "@/components/gyms/SideContent";
import useApi from "@/hooks/useApi";
import { requestData } from "@/service/api";
import { IMAGE_SIZE } from "@/constants/gyms/constants";
import { DEVICE_SIZE } from "@/constants/styles";
import type { GymData } from "@/constants/gyms/types";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

const GymInfo = ({ id }: InferGetServerSidePropsType<GetServerSideProps>) => {
  const { data: session } = useSession();
  const [gymData, setGymData] = useState<null | GymData>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isLoading) return;
    requestData({
      option: "GET",
      url: `/gyms/${id}`,
      onSuccess: (data) => {
        const gymData = { ...data, id };
        setGymData(gymData);
      },
      onError: (e) => {
        console.log(e);
        setIsError(true);
      },
    });
    setIsLoading(false);
  }, [isLoading, id]);

  if (isError) return <ErrorPage statusCode={500} />;
  return (
    <div style={{ display: "grid", placeContent: "center" }}>
      <S.Wrapper style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ImageCarousel
          isLoading={isLoading}
          defaultImage={gymData?.defaultImage}
          imageList={gymData?.images}
        />
        <S.InfoContainer>
          <S.Main
            style={{
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              flex: "1 0 0",
              gap: "36px",
            }}
          >
            <MainContent isLoading={isLoading} gymData={gymData} />
            <DynamicMap
              isLoading={isLoading}
              name={gymData?.name}
              coordinates={gymData?.coordinates}
            />
          </S.Main>
          <SideContent gymData={gymData} />
        </S.InfoContainer>
        <Comments key={id} id={id} comments={gymData?.comments} session={session} />
      </S.Wrapper>
      {!isLoading && <ChatModal key={id} gymId={id} gymName={gymData?.name} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  return { props: { id } };
};

const S = {
  Wrapper: styled.div`
    width: ${IMAGE_SIZE.desktop.width + "px"};
    .address {
      display: flex;
      gap: 6px;
      color: gray;
      margin-bottom: 18px;
    }
    .header {
      display: flex;
      align-items: flex-end;
      align-content: flex-end;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .header__text {
      font-weight: 700;
      font-size: 2.3rem;
    }
    .icons {
      position: relative;
      bottom: 6px;
      display: flex;
      gap: 6px;
    }
    .description {
      white-space: break-spaces;
    }
    @media ${DEVICE_SIZE.laptop} {
      width: 850px;
    }
    @media ${DEVICE_SIZE.tablet} {
      width: ${IMAGE_SIZE.tablet.width + "px"};
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      width: ${IMAGE_SIZE.mobileLarge.width + "px"};
      .header__text {
        font-size: 1.7rem;
      }
    }
    @media ${DEVICE_SIZE.mobileSmall} {
      width: ${IMAGE_SIZE.mobileSmall.width + "px"};
      .header {
        line-height: 2.3rem;
      }
      .header__text {
        font-size: 1.5rem;
      }
    }
  `,
  InfoContainer: styled.div`
    display: flex;
    gap: 18px;
    margin-top: 40px;
    flex-direction: row;
    @media ${DEVICE_SIZE.laptop} {
      flex-direction: column;
    }
  `,
  Main: styled.div`
    @media (min-width: 1281px) {
      padding: 0px 18px;
    }
    @media ${DEVICE_SIZE.desktop} {
      width: 752px;
    }
    @media ${DEVICE_SIZE.laptop} {
      width: ${IMAGE_SIZE.laptop.width + "px"};
    }
    @media ${DEVICE_SIZE.tablet} {
      width: ${IMAGE_SIZE.tablet.width + "px"};
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      width: ${IMAGE_SIZE.mobileLarge.width + "px"};
    }
    @media ${DEVICE_SIZE.mobileSmall} {
      width: ${IMAGE_SIZE.mobileSmall.width + "px"};
    }
  `,
};

export default GymInfo;
