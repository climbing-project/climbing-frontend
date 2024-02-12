import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { FormEventHandler } from "react";

const GeneralLogin = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const result = await signIn("credentials", {
      username,
      password,
    });

    if (result?.error) {
      // 로그인 실패 시 오류 메시지
    } else {
      console.log("login success");
    }
  };

  return (
    <S.Wrapper className="container">
      <S.LoginForm onSubmit={handleSubmit}>
        <S.InputBox type="id" name="username" placeholder="아이디" required />
        <S.InputBox
          type="password"
          name="password"
          placeholder="비밀번호"
          required
        />
        <S.ButtonBox type="submit">로그인</S.ButtonBox>
      </S.LoginForm>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    height: 160px;
    padding: 50px;
    margin-bottom: 30px;
  `,
  LoginForm: styled.form`
    display: flex;
    flex-direction: column;
  `,
  InputBox: styled.input`
    height: 40px;
    margin-bottom: 20px;
  `,
  ButtonBox: styled.button`
    height: 40px;
    background-color: #f9f2f2;
    border: none;
  `,
};

export default GeneralLogin;
