import { useRef, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { DEVICE_SIZE } from "@/constants/styles";
import { MAX_WIDTH } from "@/constants/admin/constants";
import type { ImageCarouselProps } from "@/constants/gyms/types";

const ImageCarousel = ({ defaultImage, imageList }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = useRef(
    defaultImage && defaultImage !== "" ? [defaultImage, ...imageList] : [...imageList],
  );

  return (
    <S.Wrapper>
      <S.Overlay>
        <S.OverlayButtons>
          <S.Button
            $direction="left"
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            disabled={currentIndex === 0}
          >
            <S.ArrowLeft />
          </S.Button>{" "}
          <S.Button
            $direction="right"
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            disabled={currentIndex === images.current.length - 1}
          >
            <S.ArrowRight />
          </S.Button>
        </S.OverlayButtons>
        <S.OverlayText>
          {currentIndex + 1}/{images.current.length} | 전체사진
        </S.OverlayText>
      </S.Overlay>
      <S.Container $shift={`-${currentIndex * MAX_WIDTH}px`}>
        {images.current.map((image, i) => (
          <S.Image key={i}>
            <Image src={image} alt={`암벽센터 제공 사진 (${(i + 1).toString()})`} fill />
          </S.Image>
        ))}
      </S.Container>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    overflow: hidden;
    border-radius: 8px;
    width: inherit;
    height: 568px;
    @media ${DEVICE_SIZE.laptop} {
      height: 402px;
    }
    @media ${DEVICE_SIZE.tablet} {
      height: 265px;
    }
    @media ${DEVICE_SIZE.mobileLarge} {
      height: 166px;
    }
    @media ${DEVICE_SIZE.mobileSmall} {
      height: 133px;
    }
  `,
  Overlay: styled.div`
    overflow: hidden;
    border-radius: 8px;
    position: absolute;
    width: inherit;
    height: inherit;
    z-index: 5;
    display: grid;
  `,
  OverlayButtons: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-self: center;
  `,
  Button: styled.button<{ $direction: string }>`
    border: none;
    height: 125px;
    width: 70px;
    padding: 0;
    background: #7be1ff;
    opacity: 0.7;
    border-radius: ${({ $direction }) =>
      $direction === "left" ? "0px 12px 12px 0px" : "12px 0px 0px 12px"};
    cursor: pointer;
    @media ${DEVICE_SIZE.tablet} {
      height: 80px;
      width: 40px;
    }
  `,
  Container: styled.div<{ $shift: string }>`
    display: flex;
    position: relative;
    width: inherit;
    height: inherit;
    left: ${({ $shift }) => $shift};
  `,
  OverlayText: styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    height: 18px;
    background: #1c1c1c;
    color: white;
    padding: 6px 8px;
    cursor: default;
  `,
  Image: styled.div`
    position: relative;
    flex-shrink: 0;
    width: inherit;
    height: inherit;
    & img {
      object-fit: cover;
    }
  `,
  ArrowLeft: styled(IoIosArrowBack)`
    color: white;
    font-size: 3rem;
    @media ${DEVICE_SIZE.tablet} {
      font-size: 2rem;
    }
    @media ${DEVICE_SIZE.mobileSmall} {
      font-size: 1.4rem;
    }
  `,
  ArrowRight: styled(IoIosArrowForward)`
    color: white;
    font-size: 3rem;
    @media ${DEVICE_SIZE.tablet} {
      font-size: 2rem;
    }
    @media ${DEVICE_SIZE.mobileSmall} {
      font-size: 1.4rem;
    }
  `,
};

export default ImageCarousel;
