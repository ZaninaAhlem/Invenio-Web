import "../styles/globals.css";
import Layout from "../components/layout";
import React from "react";
import { wrapper } from "../redux/store";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
);

export default wrapper.withRedux(MyApp);
