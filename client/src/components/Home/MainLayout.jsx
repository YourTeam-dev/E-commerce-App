import React from 'react'
import HeroSlider from './main/Hero'
import FeaturedProduct from './main/FeaturedProduct'
import FeaturedCategory from './main/FeaturedCategory'
import Footer from './main/Footer'

function MainLayout() {
  return (
    <div>
      <HeroSlider/>
      <FeaturedCategory/>
      <FeaturedProduct/>
      <Footer/>
    </div>
  )
}

export default MainLayout
