import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import ImageUploader from './ImageUploader';
import ImageList from './ImageList';
import useS3 from './useS3';
import { GymData } from '@/pages/admin/edit';

interface ImageEditorProps {
  images: string[] | undefined;
  thumbnails: string[] | undefined;
  setCurrentData: Dispatch<SetStateAction<GymData>>;
}

const ImageEditor = ({
  images,
  thumbnails,
  setCurrentData,
}: ImageEditorProps) => {
  const uploadImage = (newImage: string) => {
    const key = newImage.includes('thumb_') ? 'imageThumbnails' : 'images';
    let currentList: string[];

    switch (key) {
      case 'imageThumbnails':
        currentList = thumbnails ? [...thumbnails] : [];
        setCurrentData(
          (current) =>
            ({ ...current, [key]: [...currentList, newImage] }) as GymData,
        );
        break;

      case 'images':
        currentList = images ? [...images] : [];
    }
    setCurrentData(
      (current) =>
        ({ ...current, [key]: [...currentList, newImage] }) as GymData,
    );
  };

  const deleteImage = (url: string) => {
    const originUrl = url.replace('thumb_', '');
    setCurrentData((current) => {
      const filteredOriginList = current!.images!.filter(
        (img) => img !== originUrl,
      );
      const filteredThumbnailList = current!.imageThumbnails!.filter(
        (img) => img !== url,
      );
      return {
        ...current,
        images: filteredOriginList,
        imageThumbnails: filteredThumbnailList,
      } as GymData;
    });
  };

  const { handleS3Upload, handleS3Delete } = useS3(uploadImage, deleteImage);

  return (
    <Styled.Wrapper>
      <Styled.Header>암장 이미지</Styled.Header>
      <Styled.Content $direction="column">
        <ImageUploader handleS3Upload={handleS3Upload} />
        {thumbnails ? (
          <ImageList handleS3Delete={handleS3Delete} images={thumbnails} />
        ) : null}
      </Styled.Content>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
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
  `,
};

export default ImageEditor;
