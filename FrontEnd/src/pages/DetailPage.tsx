import { useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Breadcrumb, Rate, Divider } from "antd";
import { HomeOutlined, InteractionTwoTone, MinusCircleTwoTone, WalletTwoTone, TruckOutlined } from "@ant-design/icons";
import { BsCart3 } from "react-icons/bs";
import { Quantity } from "../components/layout/Quantity";
import { BookCards } from "../components/layout/BookCard";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {handleAddProductToCart} from "../redux/slice/orderSlice";

export const DetailPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id}:any = useParams();
    const bookId = parseInt(id);
    const [images, setImages] = useState<{ thumbnail: string; }[]>([]);
    const [mainImage, setMainImage] = useState<string>("");
    const listbook = useSelector((state:any) => state?.product.dataListBooks.products);
    const book = listbook.find((g:any) => g.id === bookId);
    
    useEffect(() => {
        if (book) {
            const { thumbnail_image, detail_image } = book;
            const mergeThumbnailAndSlider = [thumbnail_image, ...detail_image];
            const listImage = mergeThumbnailAndSlider.map((item: string) => ({
                thumbnail: item,
            }));
            setImages(listImage);
            setMainImage(listImage[0].thumbnail)
        }
    }, [book]);

    const handleThumbnailClick = (thumbnail: string) => {
        setMainImage(thumbnail);
    };
    const [quantity, setQuantity] = useState(1);

    const handleAddCarts = () => {
        const dataBook = {
            id: bookId,
            name: book?.name,
            price: book?.price,
            author: book?.author,
            thumbnail: book?.thumbnail_image,
            quantity: quantity,
        }
        dispatch(handleAddProductToCart(dataBook));
    }

    const handleBuy = () =>{
        const dataBook = {
            id: bookId,
            name: book?.name,
            price: book?.price,
            author: book?.author,
            thumbnail: book?.thumbnail_image,
            quantity: quantity,
        }
        navigate('/order')
        dispatch(handleAddProductToCart(dataBook));
    }

    return (
        <>
            <Header />
            <div className="bg-[#f5f4f4]">
                <div className="mx-[300px] pb-4">
                    <div className="pt-5">
                        <Breadcrumb className="mb-5"
                            items={[
                                {
                                    href: "",
                                    title: <HomeOutlined />,
                                },
                                {
                                    title: "Shop Page",
                                },
                            ]}
                        />
                        <div>
                            <div className='pr-4 pl-4 pt-4 pb-6 bg-white flex rounded-lg'>
                                <div>
                                    <div>
                                        {images && images.length > 0 && (
                                            <div className="flex gap-1">
                                                <div className="flex flex-col">
                                                    {images.map((image, index) => (
                                                        <img 
                                                            key={index} 
                                                            src={image.thumbnail} 
                                                            alt={`Thumbnail ${index + 1}`} 
                                                            className="cursor-pointer h-auto w-16 mb-4"
                                                            onClick={() => handleThumbnailClick(image.thumbnail)}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex">
                                                    <img src={mainImage} alt="Main Image" className="max-w-full h-auto w-auto max-h-[392px]"/>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        <button className="flex justify-center items-center border-solid text-[#C92127] bg-white border-2 border-[#C92127] w-[200px] h-[40px] font-semibold text-14px px-[10px] rounded-lg" onClick={handleAddCarts}>
                                            <BsCart3 className="mr-2" size={20} color="#C92127"/>
                                            Thêm vào giỏ hàng
                                        </button>
                                        <button className="bg-[#C92127] w-[200px] h-[40px] font-semibold text-14px px-[10px] rounded-lg text-white" onClick={handleBuy}>Mua ngay</button>
                                    </div>
                                </div>
                                <div className="ml-9">
                                    <h5 className="m-0 text-12px font-thin">Tác giả: {book.author}</h5>
                                    <h1 className="font-medium text-[22px] text-[#333] leading-6 my-4">{book.name}</h1>
                                    <div className="text-11px">
                                        4.7{" "}
                                        {
                                            <Rate
                                            disabled
                                            className="text-11px mx-1"
                                            defaultValue={5}
                                            />
                                        }
                                        (41)
                                        <Divider type="vertical" /> Đã bán: {book.sold}
                                        <div className="pt-2 pb-4 flex flex-row items-center justify-between">
                                            <span className="text-[30px] text-[#C92127] font-semibold">{(book.price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</span>
                                        </div>
                                        <div>
                                        <Quantity
                                            type={"vertical"}
                                            value={quantity}
                                            onChange={(value:any) => {
                                                return setQuantity(() => value);
                                            }}
                                        />
                                        </div>
                                        <div className="bg-white rounded-xl p-3 mt-3">
                                            <span><TruckOutlined className="text-xl mr-2 text-blue-600 text-[19px]"/>An tâm mua sắm</span>
                                            <Divider className="m-2" />
                                            <span>
                                            <WalletTwoTone className="text-xl mr-2" />
                                            Được mở hộp kiểm tra khi nhận hàng.
                                            </span>
                                            <Divider className="m-2" />
                                            <span>
                                            <InteractionTwoTone className="text-xl mr-2" />
                                            Được hoàn tiền 111% nếu là hàng giả.
                                            </span>
                                            <Divider className="m-2" />
                                            <span>
                                            <MinusCircleTwoTone className="text-xl mr-2" />
                                            Đổi trả miễn phí tại nhà trong 30 ngày nếu sản phẩm lỗi.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white mt-8">
                        <h2 className="font-bold text-17px">Mô tả sản phẩm</h2>
                        <div>
                            {book.description}
                        </div>
                    </div>
                    <div className="py-8">
                        <BookCards/>
                    </div>
                    <div className="bg-white py-[10px] px-[27px] rounded-lg">
                        <div className="flex justify-between">
                            <div className="p-[10px]">
                                <div className="flex items-center">
                                    <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-1-2020/icon/ico_shop_1.png" className="h-[24px] w-[26px]" alt="" />
                                    <span className="ml-4 font-bold text-14px text-[#646464]">Chính Sách Khách Sỉ</span>
                                </div>
                            </div>
                            <div className="p-[10px]">
                                <div className="flex items-center">
                                    <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-1-2020/icon/ico_truck.png" className="h-[24px] w-[26px]" alt="" />
                                    <span className="ml-4 font-bold text-14px text-[#646464]">Thời Gian Giao Hàng</span>
                                </div>
                            </div>
                            <div className="p-[10px]">
                                <div className="flex items-center">
                                    <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-1-2020/icon/ico_transfer.png" className="h-[24px] w-[26px]" alt="" />
                                    <span className="ml-4 font-bold text-14px text-[#646464]">Chính Sách đổi trả</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};
