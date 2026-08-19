import React from 'react'
import HeroBanner from '../Components/HeroBanner'
import LatestCollection from '../Components/latestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import NewsletterBox from '../Components/NewsletterBox'

const Home = () => {
  return (
    <>
      <HeroBanner/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
      
    </>
  )
}

export default Home