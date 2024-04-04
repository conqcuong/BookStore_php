import React from 'react'
import { BannerCard } from '../components/home/BannerCard'
import { BestSellerBooks } from '../components/home/BestSellerBooks'
import { FavoriveBooks } from '../components/home/FavoriveBooks'
import { PromoBanner } from '../components/home/PromoBanner'
import { OtherBooks } from '../components/home/OtherBooks'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export const HomePage = () => {
  return (
    <div>
        <Header/>
        <BannerCard/>
        <BestSellerBooks/>
        <FavoriveBooks/>
        <PromoBanner/>
        <OtherBooks/>
        <Footer/>
    </div>
  )
}
