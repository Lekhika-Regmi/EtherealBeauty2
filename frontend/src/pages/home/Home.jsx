import React, {useEffect} from 'react'
import Banner from './Banner'
import Brands from './Brands'
import TrendingProducts from'../products/TrendingProducts'
import AqiSection from'./AqiSection'
import PromoBanner from './PromoBanner'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
        <Banner/>
        <Brands/>
        <TrendingProducts/>
        <AqiSection/>
        <PromoBanner/>
    </>
  )
}

export default Home
