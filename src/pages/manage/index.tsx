import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import GymList from "@/components/manage/GymList";
import ManageLayout from "@/components/manage/ManageLayout";
import { NavContext, type NavStateProps } from "@/NavContext";
import { COLOR } from "@/styles/global-color";
import { DEVICE_SIZE } from "@/constants/styles";

const ManageHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { gymList } = useContext(NavContext) as NavStateProps;

  useEffect(() => {
    if (gymList) setIsLoading(false);
  }, [isLoading, gymList]);

  return (
    <ManageLayout>
      <h1 className="desktop-view" style={{ margin: 0 }}>
        내 암장
      </h1>
      <h2 className="mobile-view" style={{ margin: 0 }}>
        내 암장
      </h2>
      <S.Wrapper>
        {isLoading &&
          Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="skeleton skeleton__block"
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          ))}
        {gymList && gymList.length >= 1 && (
          <>
            {gymList.map((gym) => (
              <GymList key={gym.id} id={gym.id.toString()} name={gym.name} />
            ))}
          </>
        )}
        <Link href="/manage/register">
          <S.Btn>새 암장 등록</S.Btn>
        </Link>
      </S.Wrapper>
    </ManageLayout>
  );
};

const S = {
  Wrapper: styled.div`
    background: white;
    border: 1px solid ${COLOR.DISABLED};
    padding: 32px 40px;
    @media ${DEVICE_SIZE.laptop} {
      padding: 1.3rem 1rem;
    }
  `,
  Btn: styled.div`
    background: ${COLOR.MAIN};
    color: #fff;
    padding: 1rem;
    border-radius: 12px;
    display: grid;
    max-width: 160px;
    place-content: center center;
    margin: auto;
    margin-top: 2rem;
    cursor: pointer;
  `,
};

export default ManageHome;
