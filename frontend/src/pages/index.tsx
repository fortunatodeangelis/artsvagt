import Head from 'next/head';
import { HeaderNav } from '@/components/HeaderNav/HeaderNav';
import RegionsContainer from '@/components/RegionsContainer/RegionsContainer';

export default function Home() {
  return (
    <>
      <Head>
        <title>ArtSvagt - Species Vulnerability Assessment Tool</title>
        <meta
          name="description"
          content="ArtSvagt, Species Vulnerability Assessment Tool"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderNav />
      <RegionsContainer />
    </>
  );
}
