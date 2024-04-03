import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import CommentTextarea from "./CommentTextarea";
import { SERVER_ADDRESS } from "@/constants/constants";
import type { CommentsProps, UserComments } from "@/constants/gyms/types";

const Comments = ({ id, comments, session }: CommentsProps) => {
  const [currentComments, setCurrentComments] = useState<UserComments>(comments || []);

  const handleAddComment = async (input: string) => {
    // if (!session || !session.user) return; // 추후 복원
    const newComment = {
      user: (session?.user?.name as string) || "익명님",
      // user: session.user.name as string,
      date: getCurrentDate(),
      text: input,
    };

    try {
      const res = await fetch(`${SERVER_ADDRESS}/gyms/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: [newComment, ...currentComments] }),
      });
      if (!res.ok) throw new Error("DB에 반영 실패");
      setCurrentComments((prev) => [newComment, ...prev]);
    } catch (e) {
      alert("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const date = currentDate.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${date}`;
  };

  return (
    <S.Wrapper>
      {/* {session ? (
        <CommentTextarea handleAddComment={handleAddComment} />
      ) : (
        <div className="login-prompt">
          로그인해서 후기를 남겨주세요!
          <S.Link href={"/login"}>로그인하기</S.Link>
        </div>
      )} */}
      <CommentTextarea handleAddComment={handleAddComment} />
      {currentComments && currentComments.length > 0
        ? currentComments.map(({ user, date, text }, i) => (
            <S.Comment key={i}>
              <div>
                <span className="comment__user">{user}</span>
                <span className="comment__date">{date}</span>
              </div>
              <div>{text}</div>
            </S.Comment>
          ))
        : null}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;

    .login-prompt {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
    }
  `,
  Comment: styled.div`
    display: flex;
    flex-direction: column;
    white-space: pre-wrap;
    margin: 26px 0px;
    gap: 12px;

    .comment__user {
      font-weight: 700;
      margin-right: 16px;
    }

    .comment__date {
      color: #c3c3c3;
    }
  `,
  Link: styled(Link)`
    background: #307fe5;
    border-radius: 8px;
    color: white;
    width: 120px;
    text-align: center;
    padding: 6px 12px;
    text-decoration: none;
  `,
};

export default Comments;
