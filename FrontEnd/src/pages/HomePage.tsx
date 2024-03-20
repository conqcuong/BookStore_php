import React from 'react'
import { Footer } from '../components/layout/Footer'
import { SlideHome } from '../components/layout/SlideHome'
import { Sidebar } from '../components/layout/Sidebar'

export const HomePage = () => {
  return (
    <div>
      <div className='flex min-h-screen sm:min-w-full'>
                        <div className='hidden shrink-0 lg:block'>
                            <Sidebar/>
                        </div>
                        <div className='pr-10 pl-5 max-w-full flex-1 lg:w-[calc(100%_-_96px)] md:px-8 sm:px-4 overflow-hidden'>
                            {/* <section className="w-full max-w-[1920px] p-0 mx-auto">
                                <div className="mt-[18px]">
                                    <SlideHome/>
                                </div>
                                
                            </section> */}
                        </div>
                    </div>        
    </div>
  )
}
