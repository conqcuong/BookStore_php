import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper/modules';
import '../../styles/BannerCard.css'

export const BannerCard = () => {
  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
        {/*Left side*/}
        <div className='flex w-full flex-col md:flex-row justify-between gap-10 pt-40 pb-20'>
            <div className='w-1/2 space-y-8 h-full'>
                <h2 className='text-5xl font-bold leading-snug  text-black'>Buy and Sell Your Books <span className='text-blue-700'>for the Best Prices</span></h2>
                <p className='md:w-4/5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quas quasi error ab ullam maiores modi laudantium temporibus ea, laboriosam dicta? Ex beatae in eaque recusandae reiciendis magnam, repellat consectetur.</p>
                
            </div>
        </div>
        {/*Right side*/}
        <div>
            <div className='banner'>
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src="https://st.nettruyenee.com/data/comics/24/lao-to-tong-vua-xinh-vua-ngau.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://st.nettruyenee.com/data/comics/22/be-thoc-dang-thuong-duoc-tam-nguoi-cau-t-9422.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://st.nettruyenee.com/data/comics/22/be-thoc-dang-thuong-duoc-tam-nguoi-cau-t-9422.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://st.nettruyenee.com/data/comics/22/be-thoc-dang-thuong-duoc-tam-nguoi-cau-t-9422.jpg" alt="" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </div>
  )
}
