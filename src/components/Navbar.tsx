import { styled } from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthBar from "./auth/AuthBar";
import { usePathname } from "next/navigation";

// navbar(헤더)를 보여주지 않을 페이지 주소 지정
const nonNavPage = ["/login", "/join"];

// 마진이 붙어야될 주소 지정
const marginPage = ["/home", "/search", "/gyms"];

const Navbar = () => {
  const pathName = usePathname();
  const [showNavBar, setShowNavBar] = useState(true);
  const needMargin = marginPage.some((url) => pathName?.includes(url));

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const needNavBar = !nonNavPage.some((url) => pathName?.includes(url));
    setShowNavBar(needNavBar);
  }, [pathName]);

  if (!showNavBar) return;

  // 햄버거 바는 기능이 적을시, 닉네임클릭시 나오는 네비와 합칠수도있음. 현재는 그대로 둠
  return (
    <>
      <S.Space></S.Space>
      <S.Wrapper $needMargin={needMargin}>
        <S.BarContainer>
          <Link href={"/"} style={{ textDecoration: "none" }}>
            오르리
          </Link>
          <S.MenuContainer>
            <AuthBar />
            <S.ButtonWrapper>=</S.ButtonWrapper>
          </S.MenuContainer>
        </S.BarContainer>
      </S.Wrapper>
    </>
  );
};

const S = {
  Palette: styled.div<{ $color: string }>`
    height: 27px;
    width: 27px;
    border-radius: 4px;
    background: ${({ $color }) => $color};
    cursor: pointer;
  `,
  Space: styled.div`
    height: 80px;
  `,
  Wrapper: styled.div<{ $needMargin: boolean }>`
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;

    margin-left: ${({ $needMargin }) => ($needMargin === true ? "10%" : "0")};
    margin-right: ${({ $needMargin }) => ($needMargin === true ? "10%" : "0")};
  `,
  BarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
  `,
  MenuContainer: styled.div`
    display: flex;
    flex-direction: row;
  `,
  ButtonWrapper: styled.button`
    margin-left: 10px;
  `,
};

export default Navbar;
