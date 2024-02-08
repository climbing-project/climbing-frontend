import { Dispatch, SetStateAction } from 'react';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import ImageUploader from './ImageUploader';
import ImageList from './ImageList';
import { GymData } from '@/pages/admin/edit';

interface ImageFieldProps {
  imageData: string[] | null;
  setCurrentData: Dispatch<SetStateAction<GymData | null>>;
}

// 테스트용 값
const S3_REGION = 'ap-northeast-2';
const BUCKET_NAME = 'oruritest';
const S3_PATH = 'https://oruritest.s3.ap-northeast-2.amazonaws.com/';
const FOLDER_NAME = 'bubu';

const ImageField = ({ imageData, setCurrentData }: ImageFieldProps) => {
  // S3 클라이언트 생성
  const client = new S3Client({
    region: S3_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY as string,
    },
  });

  // S3에 업로드하는 함수
  const handleS3Upload = async (file: File, fileName: string) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: `${FOLDER_NAME}/${fileName}`,
      Body: file,
    };

    try {
      await client.send(new PutObjectCommand(params));
    } catch (error) {
      console.log('에러 발생: ' + error);
    } finally {
      handleImageUpload(`${S3_PATH}${FOLDER_NAME}/${fileName}`);
    }
  };

  const handleImageUpload = (newImage: string) => {
    if (imageData) {
      const currentList = [...imageData];
      setCurrentData(
        (current) =>
          ({ ...current, images: [...currentList, newImage] }) as GymData,
      );
    } else {
      setCurrentData(
        (current) => ({ ...current, images: [newImage] }) as GymData,
      );
    }
  };

  const handleS3Delete = async (url: string) => {
    const fileKey = url.replace(S3_PATH, '');
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
    };

    try {
      await client.send(new DeleteObjectCommand(params));
    } catch (error) {
      console.log('에러 발생: ' + error);
    } finally {
      handleImageDelete(url);
    }
  };

  const handleImageDelete = (url: string) => {
    const filteredList = imageData?.filter((imageUrl) => imageUrl !== url);
    setCurrentData(
      (current) => ({ ...current, images: filteredList }) as GymData,
    );
  };

  return (
    <>
      <ImageUploader handleS3Upload={handleS3Upload} />
      {imageData ? (
        <ImageList handleS3Delete={handleS3Delete} images={imageData} />
      ) : null}
    </>
  );
};

export default ImageField;
