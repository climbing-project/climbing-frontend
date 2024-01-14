import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

const GymInfo = ({
  gymData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  /* 
  암장 정보를 불러오는 API가 준비될 시 아래 코드로 교체 예정:

  // Fetch API data
  const gymData = await (await fetch('')).json();
  return { props: { gymData } };
  */

  return { props: {} };
};

export default GymInfo;
