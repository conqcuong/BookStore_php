import FavBook from '../../assets/favoritebook.jpg'

export const FavoriveBooks = () => {
    return (
        <div className='mx-[100px] px-4 my-20 flex justify-between items-center gap-12'>
            <div className='w-1/2'>
                <img src={FavBook} alt='' className='rounded w-10/12'></img>
            </div>

            <div className='w-1/2 space-y-6'>
                <h2 className='text-6xl font-bold my-5 w-3/4 leading-snug'>Find Your Favorite <span className='text-blue-700'>Book Here!</span></h2>
                <p className='mb-10 text-lg w-5/6'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident eos aut architecto animi iusto nobis, esse repudiandae illo quam saepe quas accusantium, nulla, hic ipsam tempora! Repellendus cum optio veniam!</p>
                <div className='flex justify-between gap-6 w-3/4 my-14'>
                    <div>
                        <h3 className='text-3xl font-bold'>800+</h3>
                        <p className='text-base'>Book Listing</p>
                    </div>
                    <div>
                        <h3 className='text-3xl font-bold'>550+</h3>
                        <p className='text-base'>Register  User</p>
                    </div>
                    <div>
                        <h3 className='text-3xl font-bold'>1200+</h3>
                        <p className='text-base'>PDF Downloads</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
