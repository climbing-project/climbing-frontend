import styled from "styled-components";
import { MdAccessTime, MdPerson } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";
import type { UserComment } from "@/constants/gyms/types";

interface CommentProps {
  comment: UserComment;
  handleDelete: (commentId: number) => void;
}

const Comment = ({ comment: { id, user, createdAt, text }, handleDelete }: CommentProps) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Row>
          <MdPerson />
          {user}
        </S.Row>
        <S.Row>
          <MdAccessTime />
          {createdAt}
        </S.Row>
        <S.TextField>{text}</S.TextField>
      </S.Container>
      <S.Icon size="1.3rem" onClick={() => handleDelete(id)} />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    border: 1px solid ${COLOR.DISABLED};
    background: ${COLOR.BACKGROUND_LIGHT};
    border-radius: 12px;
    padding: 16px;
    display: flex;
    gap: 36px;
    @media ${DEVICE_SIZE.laptop} {
      gap: 0;
    }
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    min-height: 50px;
    gap: 8px;
  `,
  Row: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  TextField: styled.div`
    padding: 12px;
    border-radius: 8px;
    background: white;
    border: 1px solid ${COLOR.DISABLED};
  `,
  Icon: styled(IoTrash)`
    cursor: pointer;
  `,
};

export default Comment;
