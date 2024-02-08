import { Dispatch, SetStateAction } from 'react';
import ImageUploader from './ImageUploader';
import ImageList from './ImageList';
import { GymData } from '@/pages/admin/edit';

interface ImageFieldProps {
  imageData: string[] | null;
  setCurrentData: Dispatch<SetStateAction<GymData | null>>;
}

const ImageField = ({ imageData, setCurrentData }: ImageFieldProps) => {
  const handleImageUpdate = (arr: string[]) => {
    if (imageData) {
      const currentList = [...imageData];
      setCurrentData(
        (current) =>
          ({ ...current, images: [...currentList, ...arr] }) as GymData,
      );
    } else {
      setCurrentData((current) => ({ ...current, images: arr }) as GymData);
    }
  };

  const handleImageDelete = (url: string) => {
    console.log('delete ' + url);
  };

  return (
    <>
      <ImageUploader handleImageUpdate={handleImageUpdate} />
      {imageData ? (
        <ImageList handleImageDelete={handleImageDelete} images={imageData} />
      ) : null}
    </>
  );
};

export default ImageField;
