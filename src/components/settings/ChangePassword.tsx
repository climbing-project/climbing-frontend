import { useSession } from "next-auth/react";
import { useState } from "react";
import InputWithTitle from "../common/InputWithTitle";
import { PASSWORD_REGREX } from "@/constants/login/constants";
import { styled } from "styled-components";
import { requestData } from "@/service/api";

const ChangePassword = () => {
  const { status } = useSession();

  const [isCurrentValid, setIsCurrentValid] = useState(false);
  const [CurrentMessage, setCurrentMessage] = useState("");

  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [newPasswordMessage, setNewPasswordMessage] = useState("");

  const [isReEnterPasswordValid, setIsReEnterPasswordValid] = useState(false);
  const [reEnterPasswordMessage, setReEnterPasswordMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleCurrentChange = (event: {
    target: {
      value: string;
    };
  }) => {
    const currentPassword = event.target.value;

    if (!PASSWORD_REGREX.test(currentPassword)) {
      setCurrentMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsCurrentValid(false);
    } else {
      setCurrentMessage("");
      setIsCurrentValid(true);
      setCurrentPassword(currentPassword);
    }
  };

  const handleNewPasswordChange = (event: {
    target: {
      value: string;
    };
  }) => {
    const currentNewPassword = event.target.value;

    if (!PASSWORD_REGREX.test(currentNewPassword)) {
      setNewPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsNewPasswordValid(false);
    } else {
      setNewPasswordMessage("");
      setIsNewPasswordValid(true);
      setNewPassword(currentNewPassword);
    }
  };

  const handleReEnterPasswordChange = (event: {
    target: {
      value: string;
    };
  }) => {
    const currentReEnterpassword = event.target.value;
    if (currentReEnterpassword !== newPassword) {
      setReEnterPasswordMessage("비밀번호가 같지 않습니다.");
      setIsReEnterPasswordValid(false);
    } else {
      setReEnterPasswordMessage("");
      setIsReEnterPasswordValid(true);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const onSuccess = () => {
      alert("비밀번호 변경 완료");
    };

    requestData({
      option: "POST",
      url: "/members/join",
      data: { beforePassword: currentPassword, afterPassword: newPassword },
      onSuccess,
      hasBody: false,
    });
  };

  if (status !== "authenticated") {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <S.Wrapper>
      <S.JoinForm className="container" onSubmit={handleSubmit}>
        <InputWithTitle
          name="currentPassword"
          type="password"
          title="현재 비밀번호"
          onChange={handleCurrentChange}
          message={CurrentMessage}
        />
        <InputWithTitle
          name="newPassword"
          type="password"
          title="새 비밀번호"
          onChange={handleNewPasswordChange}
          message={newPasswordMessage}
        />
        <InputWithTitle
          name="reEnterNewPassword"
          type="password"
          title="새 비밀번호 확인"
          onChange={handleReEnterPasswordChange}
          message={reEnterPasswordMessage}
        />
        <S.ButtonBox
          type="submit"
          disabled={
            !(isCurrentValid && isNewPasswordValid && isReEnterPasswordValid)
          }
        >
          비밀번호 변경하기
        </S.ButtonBox>
      </S.JoinForm>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div``,
  JoinForm: styled.form`
    display: flex;
    flex-direction: column;
    height: 500px;
    padding: 50px;
    margin-bottom: 30px;
  `,
  ButtonBox: styled.button`
    height: 40px;
    background-color: #f9f2f2;
    border: none;
  `,
};
export default ChangePassword;
