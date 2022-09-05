import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Charm | Explore everything</title>
        <meta
          name="description"
          content="Charm is a network of communities where people can dive into their interests, hobbies and passions. There's a community for whatever you're interested in on Charm."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center w-screen h-screen">
        <h1 className="text-4xl">
          Welcome to&nbsp;
          <a href="https://nextjs.org" className="title">
            Next.js!
          </a>
          <br />
          <span className="text-base flex items-center">
            Powered by
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </h1>
      </main>
    </>
  );
};

export default HomePage;
