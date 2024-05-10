import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

type GymListProps = {
  name: string;
  id: string;
};

const GymList = ({ name, id }: GymListProps) => {
  const router = useRouter();
  return (
    <Wrapper>
      {name}:<Link href={`/admin/edit/${id}?p=1`}>기본 정보 수정하기</Link> |
      <Link href={`/admin/edit/${id}?p=2`}>상세 정보 수정하기</Link> |
      <Link href={`/admin/manage/${id}`}>댓글 관리하기</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default GymList;
