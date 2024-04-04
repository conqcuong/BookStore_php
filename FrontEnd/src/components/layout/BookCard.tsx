import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/BookCards.css'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export const BookCards = () => {

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
        slidesToShow: 6,
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
        <div className="bg-white rounded">
            <div className='ml-4 pt-4'>
                <h2 className='font-bold'>Giới thiệu</h2>
            </div>
            <Slider {...settings}>
                {books.map(book => (
                    <div className='p-3'>
                        <div className='mb-2'>
                            <Link to={`/shop/details/${book.id}`} className='max-w-[170px]'>
                                <img className='w-full h-[200px]' src={book.thumbnail_image} alt='' />
                            </Link>
                        </div>
                        <div>
                            <Link to={`/shop/details/${book.id}`}><h2 className='mt-2 line-clamp-1'>{book.name}</h2></Link>
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
