import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Lucas' Portfolio</title>
      </Head>
      <Header />
      
    </div>
  );
}
