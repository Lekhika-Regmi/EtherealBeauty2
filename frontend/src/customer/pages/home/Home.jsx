import React from 'react'
import Banner from './Banner'
import Brands from './Brands'
import TrendingProducts from'../products/TrendingProducts'
import AqiSection from'./AqiSection'
import PromoBanner from './PromoBanner'

const Home = () => {
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
