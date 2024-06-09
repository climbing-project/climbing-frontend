import { requestData } from "@/service/api";
import { useSession } from "next-auth/react";
import router, { Router } from "next/router";
import { useState } from "react";
import { styled } from "styled-components";
import { signOut } from "next-auth/react";
import handleSignOut from "@/service/api/logout";
const DeleteAccount = () => {
  const { data: session, status } = useSession();

  const [isChecked, setIsChecked] = useState(true);

  const handleDeleteAccount = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const onSuccess = () => {
      //TODO: 삭제후 로그아웃 논의필요
      alert("계정이 삭제되었습니다.");
      return handleSignOut();
    };

    requestData({
      option: "DELETE",
      url: "/members",
      data: {
        checkPassword: "Password",
      },
      onSuccess,
      hasBody: false,
    });
  };
  if (status !== "authenticated") {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    // 체크박스 추가 필요
    <S.Wrapper>
      <S.ButtonBox onClick={handleDeleteAccount} disabled={!isChecked}>
        회원 탈퇴
      </S.ButtonBox>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    height: 700px;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
  `,
  ButtonBox: styled.button`
    height: 40px;
    background-color: #f9f2f2;
    border: none;
  `,
};
export default DeleteAccount;
