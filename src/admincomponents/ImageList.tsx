import Image from 'next/image';
import styled from 'styled-components';

interface ImageListProps {
  images: string[];
}

const URL_PREFIX = 'https://oruritest.s3.ap-northeast-2.amazonaws.com/bubu/';

const ImageList = ({ images }: ImageListProps) => {
  return (
    <Styled.Wrapper>
      {images.map((image, i) => (
        <Styled.Image key={i}>
          <Image src={image} fill={true} alt={image.replace(URL_PREFIX, '')} />
        </Styled.Image>
      ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    max-width: 600px;
  `,
  Image: styled.div`
    position: relative;
    border: 1px solid #d0d0d0;
    width: 140px;
    height: 80px;

    img {
      object-fit: cover;
    }
  `,
};

export default ImageList;
