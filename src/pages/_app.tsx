import Layout from "@/components/Layout";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { NextComponentType } from "next/types";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
