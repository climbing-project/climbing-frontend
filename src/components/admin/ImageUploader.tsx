import { DragEventHandler } from 'react';
import styled from 'styled-components';
import { MdOutlineUploadFile } from 'react-icons/md';

interface ImageUploadProps {
  handleS3Upload: (file: File, fileName: string) => Promise<void>;
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

const ImageUploader = ({ handleS3Upload }: ImageUploadProps) => {
  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length === 0) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    let rejectedFileCount = 0;

    droppedFiles.forEach((file) => {
      if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
        // 랜덤한 파일명 생성
        const randomizedFileName = crypto.randomUUID() + '.png';
        handleS3Upload(file, randomizedFileName);
      } else {
        // 유효한 이미지 형식(jpeg/png)이 아닐 시 이용자에게 알리기 위해 파일 갯수 트랙킹
        rejectedFileCount += 1;
      }
    });

    if (rejectedFileCount > 0) {
      alert(`${rejectedFileCount}개의 파일은 업로드되지 않았습니다.`);
    }
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
