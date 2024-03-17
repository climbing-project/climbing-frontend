import Link from "next/link";
import styled from "styled-components";

const AdminLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <S.Wrapper>
      <S.Menu>
        <h3>암장 정보 관리</h3>
        <Link href="/admin/edit/1">기본 정보</Link>
        <Link href="/admin/edit/2">상세 정보</Link>
        <Link href="/admin/manage">댓글 관리</Link>
      </S.Menu>
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    width: 100%;
  `,
  Menu: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 36px;
    gap: 12px;
    background: #ffffc4;
  `,
  Content: styled.div`
    flex: 1 0 0;
    background: coral;
  `,
};

export default AdminLayout;
