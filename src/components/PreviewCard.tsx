import { styled } from "styled-components";
import Image from "next/image";
import img01 from "../../public/thumbnail3.jpg";
import { IoBookmarkOutline } from "react-icons/io5";
import { FcLikePlaceholder } from "react-icons/fc";

interface WallInfo {
  thumbnailSrc: string;
  address: string;
  name: string;
  latestSettingDay: string;
  likeNumber: number;
}

interface CardProps {
  width?: string;
  height?: string;
  cardInfo: WallInfo;
}

const PreviewCard = ({ width, height, cardInfo }: CardProps) => {
  return (
    <S.Container width={width} height={height}>
      <S.ImageWrapper>
        <S.Image src={img01} alt="image" fill />
      </S.ImageWrapper>
      <S.InfoContainer>
        <S.MainInfoContainer>
          <S.NameContainer>
            <div>{cardInfo.address}</div>
            <div>{cardInfo.name}</div>
          </S.NameContainer>
          <IoBookmarkOutline />
        </S.MainInfoContainer>
        <S.SubInfoContainer>
          <S.Date>최근 세팅일 : {cardInfo.latestSettingDay}</S.Date>
          <S.LikeContainer>
            {cardInfo.likeNumber}
            <FcLikePlaceholder />
          </S.LikeContainer>
        </S.SubInfoContainer>
      </S.InfoContainer>
    </S.Container>
  );
};

const S = {
  Container: styled.div<{
    width?: string;
    height?: string;
  }>`
    width: ${(props) => props.width || `350px`};
    height: ${(props) => props.height || `100px`};
    border: 1px solid black;
    border-radius: 5px;
    overflow: hidden;
  `,
  ImageWrapper: styled.div`
    height: 60%;
    position: relative;
  `,
  Image: styled(Image)`
    object-fit: "cover";
  `,
  InfoContainer: styled.div`
    height: 35%; // TODO: 이미지 채운 나머지를 채우고 싶은데 안됨
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
  `,
  MainInfoContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  NameContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  SubInfoContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  Date: styled.div``,
  LikeContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
};

export default PreviewCard;
