import { useEffect, useState } from "react";
import styled from "styled-components";
import { IoTrash } from "react-icons/io5";
import AdminLayout from "@/components/admin/AdminLayout";
import Layout from "@/components/Layout";
import UserComment from "@/components/admin/UserComment";
import { GYM_API } from "@/constants/constants";
import { UserComments } from "@/constants/gyms/types";
import { NextPageWithLayout } from "@/pages/_app";

const ManagePage: NextPageWithLayout = () => {
  const [comments, setComments] = useState<UserComments>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  const fetchData = () => {
    /*
    // 전역상태에 저장된 관리자계정 정보로 fetch 요청
    const id = '전역상태에서 가져온 값';
    fetch(`${GYM_API}${id}`)
      .then((response) => response.json())
      .then((data) => {
        const { comments } = data;
        setComments(comments);
      })
      .catch((error) => {
        //에러 핸들링
      });
    */

    // 관리자계정 정보/API가 준비되기 전에 사용할 임의값
    fetch(`${testUrl}`)
      .then((response) => response.json())
      .then((data) => {
        const { comments } = data;
        setComments(comments);
      })
      .catch((error) => {
        // 테스트를 위한 임시방편 (추후 에러 핸들링 코드로 교체 필요)
        console.log("json-server 서버가 오프라인입니다. 암장 정보를 샘플값으로 대체합니다.");
        setComments(sampleData);
      });
  };

  const updateDatabase = async (comments: UserComments) => {
    try {
      await fetch(`${GYM_API}${testId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments }),
      });
    } catch (e) {
      return false;
    }
    return true;
  };

  const handleDelete = (index: number) => {
    const remainingComments = comments.filter((comment) => index !== comments.indexOf(comment));
    updateDatabase(remainingComments);
    setComments(remainingComments);
  };

  if (isLoading) return <div>loading</div>;

  return (
    <S.Wrapper>
      <S.Main>
        <S.Box>
          <S.Header>댓글 관리</S.Header>
          <S.Content $direction="column">
            {comments.map(({ user, date, text }, i) => (
              <S.Row key={i}>
                <UserComment user={user} date={date} text={text} />
                <IoTrash onClick={() => handleDelete(i)} />
              </S.Row>
            ))}
          </S.Content>
        </S.Box>
      </S.Main>
    </S.Wrapper>
  );
};

ManagePage.getLayout = (page) => {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Sidebar: styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 20vw;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    gap: 36px;
    background: #fafaf8;
    padding: 36px;
  `,
  Box: styled.div`
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
  Link: styled.div`
    cursor: pointer;

    &:hover {
      color: #1aabff;
    }
  `,
  Row: styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
  `,
};

// 테스트용 상수값
const testId = "75334254-93a8-4cfb-afec-29e368ac0803";
const testUrl = `${GYM_API}${testId}`;
const sampleData: UserComments = [
  { user: "ㅁㄴㅇㄹ", text: "asdlfj", date: "24.01.20" },
  { user: "leop", text: "foliwjd sldkfj sdl", date: "24.01.20" },
  { user: "54f1ef", text: "ㄴ이;라ㅓㅁ짏ㅈㄴㄷㄹ ㄴㅇㄹ", date: "24.02.10" },
];

export default ManagePage;
