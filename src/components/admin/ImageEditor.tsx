import Image from "next/image";
import styled from "styled-components";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ImageList from "./ImageList";
import ImageUploader from "./ImageUploader";
import useS3, { FOLDER_NAME, S3_PATH, THUMBNAIL_PREFIX } from "../../hooks/useS3";
import type { ImageEditorProps } from "@/constants/admin/types";

const ImageEditor = ({
  allThumbnails,
  defaultImage,
  setCurrentData,
  setLoadedData,
  updateData,
}: ImageEditorProps) => {
  const thumbnails =
    allThumbnails?.filter((image) => {
      if (!defaultImage || defaultImage === "") return image;
      const defaultImageFile = defaultImage.replace(`${S3_PATH}${FOLDER_NAME}/`, "");
      return !image.includes(defaultImageFile);
    }) || [];

  const uploadImage = (url: string, key: string) => {
    if (key === "default" && !url.includes(`${THUMBNAIL_PREFIX}`)) {
      setCurrentData((prev) => ({ ...prev, defaultImage: url }));
      setLoadedData((prev) => {
        updateData(JSON.stringify({ ...prev, defaultImage: url }));
        return { ...prev, defaultImage: url };
      });
    }
    if (!url.includes(`${THUMBNAIL_PREFIX}`)) return;

    setCurrentData((current) => {
      const originImage = url.replace(`${THUMBNAIL_PREFIX}`, "");
      const currentThumbnails = current.imageThumbnails || [];
      const imageThumbnails = [...currentThumbnails, url];

      if (key === "default") {
        setLoadedData((prev) => {
          updateData(JSON.stringify({ ...prev, imageThumbnails }));
          return { ...prev, imageThumbnails };
        });
        return {
          ...current,
          imageThumbnails,
        };
      } else {
        const currentImages = current.images || [];
        const images = [...currentImages, originImage];
        const imageThumbnails = [...currentThumbnails, url];
        setLoadedData((prev) => {
          updateData(JSON.stringify({ ...prev, images, imageThumbnails }));
          return { ...prev, images, imageThumbnails };
        });
        return {
          ...current,
          images,
          imageThumbnails,
        };
      }
    });
  };

  const deleteImage = (url: string, key: string) => {
    if (key === "default") {
      const thumbnailUrl = url.replace(`${FOLDER_NAME}/`, `${FOLDER_NAME}/thumb_`);
      setCurrentData((prev) => {
        const imageThumbnails = prev.imageThumbnails!.filter((img) => img !== thumbnailUrl);
        return { ...prev, defaultImage: "", imageThumbnails };
      });
      setLoadedData((prev) => {
        const imageThumbnails = prev.imageThumbnails!.filter((img) => img !== thumbnailUrl);
        updateData(JSON.stringify({ ...prev, defaultImage: "", imageThumbnails }));
        return { ...prev, defaultImage: "", imageThumbnails };
      });
      return;
    }

    const imageUrl = url.replace(`${THUMBNAIL_PREFIX}`, "");
    setCurrentData((prev) => {
      const images = prev.images!.filter((img) => img !== imageUrl);
      const imageThumbnails = prev.imageThumbnails!.filter((img) => img !== url);
      updateData(JSON.stringify({ ...prev, images, imageThumbnails }));
      return { ...prev, images, imageThumbnails };
    });
    setLoadedData((prev) => {
      const images = prev.images!.filter((img) => img !== imageUrl);
      const imageThumbnails = prev.imageThumbnails!.filter((img) => img !== url);
      return { ...prev, images, imageThumbnails };
    });
  };

  const { handleS3Upload, handleS3Delete } = useS3(uploadImage, deleteImage);

  return (
    <S.Wrapper>
      <S.Header>암장 이미지</S.Header>
      <S.Content $direction="column">
        <S.Row>
          <strong>대표 이미지</strong>
          {defaultImage ? (
            <S.Image>
              <S.DeleteButton onClick={() => handleS3Delete(defaultImage, "default")}>
                <RiDeleteBin6Fill color="#ffffff" />
              </S.DeleteButton>
              <Image src={defaultImage} width={462} height={215} alt={defaultImage} />
            </S.Image>
          ) : (
            <ImageUploader dataKey="default" handleS3Upload={handleS3Upload} />
          )}
        </S.Row>
        <S.Row>
          <strong>
            추가 이미지
            <br />
            {thumbnails ? thumbnails.length : 0}/10
          </strong>
          {thumbnails ? (
            <>
              {thumbnails.length < 10 ? (
                <ImageUploader
                  dataKey="display"
                  imageCount={thumbnails.length}
                  handleS3Upload={handleS3Upload}
                />
              ) : null}
              <ImageList handleS3Delete={handleS3Delete} images={thumbnails} />
            </>
          ) : (
            <ImageUploader dataKey="display" handleS3Upload={handleS3Upload} />
          )}
        </S.Row>
      </S.Content>
    </S.Wrapper>
  );
};

const S = {
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
  Row: styled.div`
    display: flex;
    gap: 12px;
    strong {
      flex-shrink: 0;
      margin-right: 20px;
    }
  `,
  Image: styled.div`
    position: relative;
    border: 1px solid #d0d0d0;
    width: 462px;
    height: 215px;
    img {
      object-fit: cover;
    }
  `,
  DeleteButton: styled.div`
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 30px;
    height: 30px;
  `,
};

export default ImageEditor;
