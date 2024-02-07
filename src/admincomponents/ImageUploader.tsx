import { DragEventHandler } from 'react';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import styled from 'styled-components';
import { MdOutlineUploadFile } from 'react-icons/md';

interface ImageUploadProps {
  updateList: (arr: string[]) => void;
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

// 테스트용 값
const S3_REGION = 'ap-northeast-2';
const BUCKET_NAME = 'oruritest';
const S3_PATH = 'https://oruritest.s3.ap-northeast-2.amazonaws.com/';
const FOLDER_NAME = 'bubu';

const ImageUploader = ({ updateList }: ImageUploadProps) => {
  const client = new S3Client({
    region: S3_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY as string,
    },
  });

  // AWS S3에 업로드
  const handleUpload = async (file: File, fileName: string) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: `${FOLDER_NAME}/${fileName}`,
      Body: file,
    };

    try {
      await client.send(new PutObjectCommand(params));
    } catch (error) {
      console.log('에러 발생: ' + error);
    }
  };

  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length === 0) return;

    const files: string[] = [];
    console.log(e.dataTransfer.files);

    const droppedFiles = Array.from(e.dataTransfer.files);
    let rejectedFileCount = 0;

    droppedFiles.forEach((file) => {
      if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
        // 랜덤한 파일명 생성
        const randomizedFileName = crypto.randomUUID() + '.png';
        handleUpload(file, randomizedFileName);
        files.push(`${S3_PATH}${FOLDER_NAME}/${randomizedFileName}`);
      } else {
        // 유효한 이미지 형식(jpeg/png)이 아닐 시 이용자에게 알리기 위해 파일 갯수 트랙킹
        rejectedFileCount += 1;
      }
    });

    if (rejectedFileCount > 0) {
      alert(`${rejectedFileCount}개의 파일은 업로드되지 않았습니다.`);
    }

    updateList(files);
  };

  return (
    <Styled.Wrapper>
      <div
        id="drop_zone"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => e.preventDefault()}
      >
        <MdOutlineUploadFile />
        <br />
      </div>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    #drop_zone {
      width: 600px;
      height: 200px;
      background: #f4f4f4;
      border-radius: 8px;
      border: 2px dashed #cacaca;
      font-size: 36pt;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  `,
};

export default ImageUploader;
