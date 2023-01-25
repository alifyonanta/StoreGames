import type { NextPage } from 'next';
import { useEffect } from 'react';
import AOS from 'aos';
import Navbar from '../components/organisms/Navbar';
import MainBanner from '../components/organisms/MainBanner';
import TransactionStep from '../components/organisms/TransactionStep';
import FeatutedGame from '../components/organisms/FeaturedGames';
import Reached from '../components/organisms/Reached';
import Story from '../components/organisms/Story';
import Footer from '../components/organisms/Footer';
import Head from 'next/head';

export default function Home()  {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
    <Head>
      <title>StoreGG</title>
      <meta name="description" content="Kami menyediakan jutaan cara untuk player game"/>
      <meta property="og: title" content="StoreGG - Get a New Experience"/>
      <meta property="og: description" content="Kami menyediakan jutaan cara untuk player game"/>
      <meta property="og: image" content="https://imageurl"/>
      <meta property="og: url" content="https://storegg.com"/>
    </Head>
    <Navbar />
    <MainBanner />
    <TransactionStep />
    <FeatutedGame />
    <Reached />
    <Story />
    <Footer />
    </>
  );
}