import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/BookCards.css'


export const BookCards = ({headline, books}:any) => {

    const NextArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            />
        );
    }

    const PrevArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            />
        );
    }

    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1, 
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="mx-[200px] min-h-[270px rounded-2xl mt-10">
            <div>
                <h2 className='relative flex w-full justify-between font-bold items-center mb-10'>
                    <b className='block flex-1 h-[2px] opacity-60 bg-[#5555]'></b>
                    <span className='border-2 px-4 py-1 text-[24px] opacity-70'>{headline}</span>
                    <b className='block flex-1 h-[2px] opacity-60 bg-[#5555]'></b>
                </h2>
            </div>
            <Slider {...settings}>
                <div className='p-3 border rounded-md'>
                    <div className='mb-2'>
                        <div className='max-w-[250px]'>
                            <img className='w-full' src='https://cdn0.fahasa.com/media/catalog/product/d/9/d90063dfb62ac7f103cd1f0de62c04c2_1.jpg' alt='' />
                        </div>
                    </div>
                    <div>
                        <h2 className='mt-2 line-clamp-1'>English Grammar English Grammar English Grammar</h2>
                        <div>
                            <p>
                                <span className='text-[#C92127] font-semibold'>599.000 đ</span>
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>60</p>
                        </div>
                    </div>
                </div> 
                <div className='p-3 border rounded-md'>
                    <div className='mb-2'>
                        <div className='max-w-[250px]'>
                            <img className='w-full' src='https://cdn0.fahasa.com/media/catalog/product/d/9/d90063dfb62ac7f103cd1f0de62c04c2_1.jpg' alt='' />
                        </div>
                    </div>
                    <div>
                        <h2 className='mt-2'>English Grammar</h2>
                        <div>
                            <p>
                                <span className='text-[#C92127] font-semibold'>599.000 đ</span>
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>60</p>
                        </div>
                    </div>
                </div> 
                <div className='p-3 border rounded-md'>
                    <div className='mb-2'>
                        <div className='max-w-[250px]'>
                            <img className='w-full' src='https://cdn0.fahasa.com/media/catalog/product/d/9/d90063dfb62ac7f103cd1f0de62c04c2_1.jpg' alt='' />
                        </div>
                    </div>
                    <div>
                        <h2 className='mt-2'>English Grammar</h2>
                        <div>
                            <p>
                                <span className='text-[#C92127] font-semibold'>599.000 đ</span>
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>60</p>
                        </div>
                    </div>
                </div> 
                <div className='p-3 border rounded-md'>
                    <div className='mb-2'>
                        <div className='max-w-[250px]'>
                            <img className='w-full' src='https://cdn0.fahasa.com/media/catalog/product/d/9/d90063dfb62ac7f103cd1f0de62c04c2_1.jpg' alt='' />
                        </div>
                    </div>
                    <div>
                        <h2 className='mt-2'>English Grammar</h2>
                        <div>
                            <p>
                                <span className='text-[#C92127] font-semibold'>599.000 đ</span>
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>60</p>
                        </div>
                    </div>
                </div> <div className='p-3 border rounded-md'>
                    <div className='mb-2'>
                        <div className='max-w-[250px]'>
                            <img className='w-full' src='https://cdn0.fahasa.com/media/catalog/product/d/9/d90063dfb62ac7f103cd1f0de62c04c2_1.jpg' alt='' />
                        </div>
                    </div>
                    <div>
                        <h2 className='mt-2'>English Grammar</h2>
                        <div>
                            <p>
                                <span className='text-[#C92127] font-semibold'>599.000 đ</span>
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>60</p>
                        </div>
                    </div>
                </div> <div className='p-3 border rounded-md'>
                    <div className='mb-2'>
                        <div className='max-w-[250px]'>
                            <img className='w-full' src='https://cdn0.fahasa.com/media/catalog/product/d/9/d90063dfb62ac7f103cd1f0de62c04c2_1.jpg' alt='' />
                        </div>
                    </div>
                    <div>
                        <h2 className='mt-2'>English Grammar</h2>
                        <div>
                            <p>
                                <span className='text-[#C92127] font-semibold'>599.000 đ</span>
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>60</p>
                        </div>
                    </div>
                </div> <div className='p-3 border rounded-md'>
                    <div className='mb-2'>
                        <div className='max-w-[250px]'>
                            <img className='w-full' src='https://cdn0.fahasa.com/media/catalog/product/d/9/d90063dfb62ac7f103cd1f0de62c04c2_1.jpg' alt='' />
                        </div>
                    </div>
                    <div>
                        <h2 className='mt-2'>English Grammar</h2>
                        <div>
                            <p>
                                <span className='text-[#C92127] font-semibold'>599.000 đ</span>
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>60</p>
                        </div>
                    </div>
                </div> <div className='p-3 border rounded-md'>
                    <div className='mb-2'>
                        <div className='max-w-[250px]'>
                            <img className='w-full' src='https://cdn0.fahasa.com/media/catalog/product/d/9/d90063dfb62ac7f103cd1f0de62c04c2_1.jpg' alt='' />
                        </div>
                    </div>
                    <div>
                        <h2 className='mt-2'>English Grammar</h2>
                        <div>
                            <p>
                                <span className='text-[#C92127] font-semibold'>599.000 đ</span>
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>60</p>
                        </div>
                    </div>
                </div> <div className='p-3 border rounded-md'>
                    <div className='mb-2'>
                        <div className='max-w-[250px]'>
                            <img className='w-full' src='https://cdn0.fahasa.com/media/catalog/product/d/9/d90063dfb62ac7f103cd1f0de62c04c2_1.jpg' alt='' />
                        </div>
                    </div>
                    <div>
                        <h2 className='mt-2'>English Grammar</h2>
                        <div>
                            <p>
                                <span className='text-[#C92127] font-semibold'>599.000 đ</span>
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>60</p>
                        </div>
                    </div>
                </div> <div className='p-3 border rounded-md'>
                    <div className='mb-2'>
                        <div className='max-w-[250px]'>
                            <img className='w-full' src='https://cdn0.fahasa.com/media/catalog/product/d/9/d90063dfb62ac7f103cd1f0de62c04c2_1.jpg' alt='' />
                        </div>
                    </div>
                    <div>
                        <h2 className='mt-2'>English Grammar</h2>
                        <div>
                            <p>
                                <span className='text-[#C92127] font-semibold'>599.000 đ</span>
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>60</p>
                        </div>
                    </div>
                </div> <div className='p-3 border rounded-md'>
                    <div className='mb-2'>
                        <div className='max-w-[250px]'>
                            <img className='w-full' src='https://cdn0.fahasa.com/media/catalog/product/d/9/d90063dfb62ac7f103cd1f0de62c04c2_1.jpg' alt='' />
                        </div>
                    </div>
                    <div>
                        <h2 className='mt-2'>English Grammar</h2>
                        <div>
                            <p>
                                <span className='text-[#C92127] font-semibold'>599.000 đ</span>
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>60</p>
                        </div>
                    </div>
                </div> 
            </Slider>
        </div>
    )
}
