import { Sidebar } from "../components/layout/Sidebar"
import { Layout, Tabs, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../components/layout/Footer";
import { ListBooks } from "../components/layout/ListBooks";
import { fetchBooksWithPaginateHomePage } from "../redux/apiRequest";



const { Content } = Layout;

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
            <div className='flex min-h-screen sm:min-w-full'>
                    <div className='hidden shrink-0 lg:block'>
                        <Sidebar/>
                    </div>
                    <div className='pr-10 pl-5 max-w-full flex-1 lg:w-[calc(100%_-_96px)] md:px-8 sm:px-4 overflow-hidden'>
                        <section className="w-full max-w-[1920px] p-0 mx-auto">
                            <div className="">
                                <Layout style={{height: "89vh",}}>
                                    <Layout style={{padding: "24px 24px 24px",}}>
                                        <Breadcrumb className="mb-2"
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
                                        <Content
                                        className="flex flex-col"
                                        style={{
                                            padding: "0px 24px 0px 24px",
                                            margin: 0,
                                            borderRadius: "8px",
                                            minHeight: "100%",
                                            // background: colorBgContainer,
                                        }}
                                        >
                                        <Tabs
                                            className="flex-1 mb-5"
                                            defaultActiveKey="1"
                                            items={itemsProductTab}
                                            onChange={onChangeProductTab}
                                        />
                                        {/* <Pagination
                                            className="flex justify-end items-center border-2 p-5"
                                            total={total}
                                            showTotal={(total, range) => {
                                                return `${range[0]}-${range[1]} trên ${total} sản phẩm`;
                                            }}
                                            current={current}
                                            defaultPageSize={pageSize}
                                            defaultCurrent={current}
                                            onChange={onChangePagination}
                                        /> */}
                                        </Content>
                                    </Layout>
                                </Layout>
                            </div>
                        </section>
                    </div>
            </div>  
            <Footer/>      
        </div>
    )
}
