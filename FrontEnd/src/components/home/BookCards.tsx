import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/BookCards.css';
import { Link } from 'react-router-dom';

export const BookCards = ({ headline }: any) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/product/-sold')
            .then(response => {
                setBooks(response.data.products); // Update here to access the 'products' key
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

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
        const { className, onClick } = props;
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
                {books.map((book: any, index: number) => (
                    <div className='p-3 border rounded-md' key={index}>
                        <div className='mb-2'>
                            <div className='max-w-[250px]'>
                                <Link to={`/shop/details/${book.id}`}>
                                    <img className='w-full max-w-[215px] max-h-[328px]' src={book.thumbnail_image} alt='' />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <Link to={`/shop/details/${book.id}`}>
                                <h2 className='mt-2 line-clamp-1'>{book.name}</h2>
                            </Link>
                            <div>
                                <p>
                                    <span className='text-[#C92127] font-semibold'>{(book.price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</span>
                                </p>
                            </div>
                            <div>
                                <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>{book.sold}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}
