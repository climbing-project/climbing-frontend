import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import CommentTextarea from './CommentTextarea';
import { useState } from 'react';
import { CommentsProps, UserComment } from '@/constants/types';

// 임시
const api = 'http://localhost:3000/gyms/';

const Comments = ({ id, comments }: CommentsProps) => {
  const [currentComments, setCurrentComments] = useState<UserComment>(
    comments || [],
  );
  const { data: session } = useSession();

  const handleAddComment = (input: string) => {
    const newComment = {
      user: 'test-user', // 추후 유저 닉네임으로 대체
      date: getCurrentDate(),
      text: input,
    };

    setCurrentComments((prev) => [newComment, ...prev]);

    fetch(`${api}${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comments: [newComment, ...currentComments] }),
    });
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const date = currentDate.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${date}`;
  };

  return (
    <S.Wrapper>
      {/* {session ? <CommentTextarea /> : <div>로그인해서 후기를 남겨주세요!</div>} */}
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
  `,
  Comment: styled.div`
    display: flex;
    flex-direction: column;
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
};

export default Comments;
