import styled from "styled-components";
import Image from "next/image";
import NaverIcon from "../../../public/naver_rec.png";
import GoogleIcon from "../../../public/google_rec.png";
import KakaoIcon from "../../../public/kakao_rec.png";
import Link from "next/link";

// 백엔드로 리다이렉트(백엔드에서 인가코드->토큰받고 프론트로 보내줌)
const OtherLogin = () => {
  return (
    <S.Wrapper>
      <div>간편로그인</div>
      <S.IconContainer>
        <Link
          href={`https://nid.naver.com/oauth2.0/authorize?
          response_type=code
          &client_id=${process.env.NAVER_CLIENT_ID}
          &redirect_uri=${process.env.NAVER_REDIRECT_URI}
          &state=${process.env.NAVER_STATE}`}
        >
          <Image src={NaverIcon} alt="네이버 아이콘" height={30} />
        </Link>
        <Link
          href={`https://accounts.google.com/o/oauth2/v2/auth?
          client_id=${process.env.GOOGLE_CLIENT_ID}
		      &redirect_uri=${process.env.GOOGLE_REDIRECT_URI}
		      &response_type=code
		      &scope=email profile`}
        >
          <Image src={GoogleIcon} alt="구글 아이콘" height={30} />
        </Link>
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?
          client_id=${process.env.KAKAO_CLIENT_ID}
          &redirect_uri=${process.env.KAKAO_REDIRECT_URI}
          &response_type=code
          &scope=account_email`}
        >
          <Image src={KakaoIcon} alt="카카오 아이콘" height={30} />
        </Link>
      </S.IconContainer>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  IconContainer: styled.div`
    margin-top: 10px;
    display: flex;
    width: 450px;
    justify-content: space-between;
  `,
};
export default OtherLogin;
