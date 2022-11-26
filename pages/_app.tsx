import type { AppProps } from "next/app";
import { FunctionComponent } from "react";
import MainLayout from "../libs/layout/MainLayout";
import "../styles/globals.css";

export type AppPropsWidthLayout<P = Record<string, unknown>> = AppProps<P> & {
  Component: {
    Layout: FunctionComponent;
    LayoutProps: any;
  };
};

export default function App({
  Component,
  pageProps = {},
}: AppPropsWidthLayout) {
  const Layout = Component.Layout ?? MainLayout;
  const LayoutProps = Component.LayoutProps ?? {};
  return (
    <Layout {...LayoutProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

// App.getInitialProps = async ({ Component, ctx }: AppContext) => {
// console.log('Component', Component);
// console.log('ctx', ctx);
// }
