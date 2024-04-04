import {  Tabs, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../components/layout/Footer";
import { ListBooks } from "../components/layout/ListBooks";
import { fetchBooksWithPaginateHomePage } from "../redux/apiRequest";
import { Header } from "../components/layout/Header";

export const ShopPage = () => {
    useEffect(() => {
        dispatchTyped(fetchBooksWithPaginateHomePage("-sold"));
    }, []);
   

    const dispatchTyped = useDispatch<any>();
    const dataListBooks = useSelector((state:any) => state?.product.dataListBooks.products);

    const onChangeProductTab = (key:any) => {
        switch (key) {
            case "popular":
                dispatchTyped(fetchBooksWithPaginateHomePage("-sold"));
                break;
            case "productsNew":
                dispatchTyped(fetchBooksWithPaginateHomePage("-updatedAt"));
                break;
            case "minToMax":
                dispatchTyped(fetchBooksWithPaginateHomePage("price"));
                break;
            case "maxToMin":
                dispatchTyped(fetchBooksWithPaginateHomePage("-price"));
                break;
            default:
                break;
        }
    };
    
    
    const itemsProductTab = [
        {
            key: "popular",
            label: "Phổ biến",
            children: <ListBooks dataListBooks={dataListBooks} />,
        },
        {
            key: "productsNew",
            label: "Hàng Mới",
            children: <ListBooks dataListBooks={dataListBooks} />,
        },
        {
            key: "minToMax",
            label: "Giá Thấp Đến Cao",
            children: <ListBooks dataListBooks={dataListBooks} />,
        },
        {
            key: "maxToMin",
            label: "Giá Cao Đến Thấp",
            children: <ListBooks dataListBooks={dataListBooks} />,
        },
    ];

    return (
        <div>
            <Header/>
            <div className="bg-[#f5f4f4] pt-5">
            <Breadcrumb className="mb-5 ml-[200px]"
                items={
                    [
                        {
                            href: "",
                            title: <HomeOutlined />,
                        },
                        {
                            title: "Shop Page",
                        },
                    ]
                }
            />
            <div className='flex min-h-screen sm:min-w-full mx-[200px] bg-white'>
                <div className='pr-10 pl-5 max-w-full flex-1 lg:w-[calc(100%_-_96px)] md:px-8 sm:px-4 overflow-hidden'>
                    <section className="w-full max-w-[1920px] p-0 mx-auto">
                        <div className="">
                            <Tabs
                                className="flex-1 mb-5"
                                defaultActiveKey="1"
                                items={itemsProductTab}
                                onChange={onChangeProductTab}
                            />
                        </div>
                    </section>
                </div>
            </div> 
            </div> 
            <Footer/>      
        </div>
    )
}
