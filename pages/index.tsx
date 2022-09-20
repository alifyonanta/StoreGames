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

export default function Home()  {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
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