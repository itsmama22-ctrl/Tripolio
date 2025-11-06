import type { AppProps } from "next/app";
import Head from "next/head";
import "leaflet/dist/leaflet.css";
import "../styles/marker-cluster.css";
import "../styles/globals.css";

export default function TripolioApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Tripolio helps you discover curated stays and travel experiences with affiliate recommendations for every destination."
        />
        <link rel="icon" href="/assets/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
