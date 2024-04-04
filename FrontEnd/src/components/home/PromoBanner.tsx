import { Link } from 'react-router-dom'
import PromoBannerImg from '../../assets/awardbooks.png'

export const PromoBanner = () => {
  return (
    <div className='mt-16 py-12 bg-teal-100 px-4 lg:px-24'>
        <div className='flex justify-between items-center gap-12'>
            <div className='md:w-1/2'>
                <h2 className='text-5xl font-bold mb-6 leading-snug'>2024 National Book Awards for Fiction Shortlist</h2>
                <Link to={'/shop'} className='block'><button className='bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>Shop Books now</button></Link>
            </div>
                
            <div>
                <img src={PromoBannerImg} alt='' className='w-96'></img>
            </div>
        </div>
    </div>
  )
}
