import { requestData } from "@/service/api";
import { useState } from "react";
import { styled } from "styled-components";

const EmailVerification = () => {
  const initialTime = 10;
  const [remainingTime, setRemainingTime] = useState(initialTime);

  const startTimer = () => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const getVerificationNum = (event: any) => {
    event.preventDefault();
    startTimer();
    // const onSuccess = (verficationNum: string) => {
    //   // TODO: 유저 입력 아이디 fix
    //   console.log(verficationNum);
    //   // 타이머 시작(5분)
    //   startTimer();
    // };

    // const data = {
    //   email: "dmswl6310@naver.com", //유저가 입력한 아이디(이메일)
    // };

    // requestData({
    //   option: "POST",
    //   url: `/members/email-auth`,
    //   data: data,
    //   onSuccess,
    // });
  };
  return (
    <S.Container>
      <h1>
        인증번호 유효 시간:
        <span style={{ color: "red" }}>{formatTime(remainingTime)}</span>
      </h1>
      <button onClick={getVerificationNum}>인증하기</button>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    background: white;
    border: 1px solid #d0d0d0;
  `,
};

export default EmailVerification;
