import styled from "styled-components";

export interface UserCommentProps {
  user: string;
  date: string;
  text: string;
}

const UserComment = ({ user, date, text }: UserCommentProps) => {
  return (
    <S.Wrapper>
      <span>
        {user} {date}
      </span>
      <span>{text}</span>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
  `,
};

export default UserComment;
