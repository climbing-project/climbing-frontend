import styled from "styled-components";
import { ReactElement, useEffect } from "react";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "../_app";
import SearchLayout from "@/components/search/SearchLayout";
import SearchBanner from "@/components/search/searchBanner";
import GymListBanner from "@/components/search/GymListBanner";
import { useRouter } from "next/router";
import { COLOR } from "@/styles/global-color";
import { signIn } from "next-auth/react";

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.accessToken) {
      console.log(`access : ${router.query.accessToken}`);
      console.log(`refresh : ${router.query.refreshToken}`);
      console.log(`email : ${router.query.email}`);
      router.push({
        pathname: "/login",
        query: {
          accessToken: router.query.accessToken,
          refreshToken: router.query.refreshToken,
        },
      });
      // console.log(`accessToken: ${router.query.accessToken}`);
      // const saveTokens = async () => {
      //   return await signIn("CredentialsForOAuth", {
      //     accessToken: router.query.accessToken,
      //     refreshToken: router.query.refreshToken,
      //     type: "oauth",
      //     redirect: false,
      //     callbackUrl: "/",
      //   });
      // };
      // router.push("/login").then(saveTokens().catch(console.error));
    }
  }, [router, router.query]);

  return (
    <Styled.Wrapper>
      <SearchBanner />
      <GymListBanner />
      <Styled.ButtonWrapper>
        <Styled.MoreButton onClick={() => router.push("/search")}>
          내 주위 암장 더보기..
        </Styled.MoreButton>
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <SearchLayout>{page}</SearchLayout>
    </Layout>
  );
};

const Styled = {
  Wrapper: styled.div``,
  ButtonWrapper: styled.div`
    text-align: right;
  `,
  MoreButton: styled.button`
    background-color: ${COLOR.LIGHT_MAIN};
    display: inline-block;
    margin-bottom: 300px;
    border: 1px solid ${COLOR.LIGHT_MAIN};
    border-radius: 10px;
    padding: 5px;
    /* font-weight: bold; */
    font-style: italic;
  `,
};

export default HomePage;
