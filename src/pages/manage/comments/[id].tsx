import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import Comment from "@/components/manage/comments/Comment";
import ManageLayout from "@/components/manage/ManageLayout";
import ErrorFallback from "@/components/common/ErrorFallback";
import { requestData } from "@/service/api";
import { NavContext, type NavStateProps } from "@/NavContext";
import { SERVER_ADDRESS } from "@/constants/constants";
import { DEVICE_SIZE } from "@/constants/styles";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { UserComment } from "@/constants/gyms/types";

const CommentsPage = ({ id }: InferGetServerSidePropsType<GetServerSideProps>) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [comments, setComments] = useState<UserComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedGymId } = useContext(NavContext) as NavStateProps;

  useEffect(() => {
    if (!session || !isLoading) return;
    requestData({
      option: "GET",
      url: `/manage/gyms/${id}/comments`,
      token: session.jwt.accessToken,
      onSuccess: (comments: UserComment[]) => setComments(comments),
      onError: (e) => {
        console.log(e);
        setComments([]);
      },
    });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, router]);

  useEffect(() => {
    if (selectedGymId !== null && selectedGymId !== id) {
      setIsLoading(true);
      router.push(`/manage/comments/${selectedGymId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGymId]);

  const handleDelete = async (commentId: number) => {
    const confirmation = confirm("삭제한 댓글은 복구할 수 없습니다. 댓글을 삭제하시겠습니까?");
    if (!confirmation || !session) return;

    await fetch(`${SERVER_ADDRESS}/manage/gyms/${id}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + session.jwt.accessToken,
      },
    });

    const remainingComments = comments.filter((comment) => comment.id !== commentId);
    setComments(remainingComments);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ManageLayout>
        <h1 className="desktop-view" style={{ margin: 0 }}>
          댓글 관리
        </h1>
        <h2 className="mobile-view" style={{ margin: 0 }}>
          댓글 관리
        </h2>
        {isLoading ? (
          <div className="editor-wrapper">
            <S.Content>
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} style={{ width: "100%", marginBottom: "1rem" }}>
                  <div
                    className="skeleton skeleton__normal-text"
                    style={{ width: "10%", marginBottom: "0.5rem" }}
                  />
                  <div
                    className="skeleton skeleton__normal-text"
                    style={{ width: "15%", marginBottom: "0.5rem" }}
                  />
                  <div className="skeleton skeleton__block" style={{ width: "90%" }} />
                </div>
              ))}
            </S.Content>
          </div>
        ) : (
          <div className="editor-wrapper">
            <S.Content $direction="column">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment
                    comment={comment}
                    key={comment.id}
                    handleDelete={() => handleDelete(comment.id)}
                  />
                ))
              ) : (
                <div>관리할 댓글이 없습니다.</div>
              )}
            </S.Content>
          </div>
        )}
      </ManageLayout>
    </ErrorBoundary>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  return { props: { id } };
};

const S = {
  Content: styled.div<{ $direction?: string }>`
    padding: 32px 40px;
    display: flex;
    flex-direction: ${(props) => props.$direction};
    flex-wrap: wrap;
    gap: 20px;
    @media ${DEVICE_SIZE.laptop} {
      padding: 1.3rem 1rem;
    }
  `,
};

export default CommentsPage;
