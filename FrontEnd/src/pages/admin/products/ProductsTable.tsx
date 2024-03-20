import { Button, Drawer, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import { AdvancedSearchForm } from "./AdvancedSearchForm";
import { HeaderProductsTable } from "./HeaderProductsTable";
import { DetailProduct } from "./DetailProduct";
import { UpdateProduct } from "./UpdateProduct";
import { getAllProduct, deleteProduct, restoreProduct } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import moment from 'moment';

export const ProductsTable = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProduct() as unknown as AnyAction);
    }, []);
    const data = useSelector((state:any) => state?.product.listProduct.products);
    // console.log(`data:`, data);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
  
    const [filters, setFilters] = useState([]);
    const [softs, setSofts] = useState("-updatedAt");
  
    const [openDetailBook, setOpenDetailBook] = useState(false);
    const [openModalUpdateBook, setOpenModalUpdateBook] = useState(false);
  
    const [dataBook, setDataBook] = useState([]);
  
    // const { dataListBooks: data } = useSelector((state) => state?.managerBooks);
  
    // useEffect(() => {
    //     (async function () {
    //         try {
    //         const res = await fetchBooksWithPaginate(
    //             current,
    //             pageSize,
    //             filters.join(""),
    //             softs
    //         );
    
    //         const { meta, result } = res.data.data;
    
    //         setCurrent(() => meta.current);
    //         setPageSize(() => meta.pageSize);
    //         setTotal(() => meta.total);
    
    //         dispatch(fetchBooks(result));
    
    //         const resListCategory = await fetchBooksCategory();
    
    //         if (resListCategory && resListCategory.data) {
    //             const dataListCategory = resListCategory.data.data.map((value) => {
    //             return {
    //                 value,
    //                 label: value,
    //             };
    //             });
    
    //             dispatch(fetchListCategory(dataListCategory));
    //         }
    //         } catch (error) {
    //         console.log(`error:`, error);
    //         }
    //     })();
    // }, [dispatch, current, pageSize, total, filters, softs]);
  
    // const onChange = async (pagination, filters, sorter, extra) => {
    //     console.log("params", pagination, filters, sorter, extra);
    //     console.log(`sorter:`, sorter);
    
    //     if (pagination && pagination.current !== current) {
    //         setCurrent(() => pagination.current);
    //     }
    
    //     if (pagination && pagination.pageSize !== pageSize) {
    //         setPageSize(() => pagination.pageSize);
    //     }
    
    //     if (sorter.order === "ascend") {
    //         setSofts(sorter.field);
    //     }
    
    //     if (sorter.order === "descend") {
    //         setSofts(-sorter.field);
    //     }
    // };
  
    const columns:any = [
        {
            title: "ID",
            width: 100,
            dataIndex: "id",
            key: "updatedAt",
            render: (text:any, record:any) => {
                return (
                    <a href="#" onClick={() => {setDataBook(record);setOpenDetailBook(true);}}>{text}</a>
                );
            },
        },
        {
            title: "Ảnh sách",
            width: "100px",
            dataIndex: "thumbnail_image",
            key: "thumbnail_image",
            render: (text:any) => {
                return (
                    <img className="w-full" src={text} alt=""/>
                );
            },
        },
        {
            title: "Tên sách",
            width: 200,
            dataIndex: "name",
            key: "name",
            sorter: {
                compare: (a:any, b:any) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: "Thể loại",
            dataIndex: "category",
            key: "category",
            width: 150,
            sorter: {
                compare: (a:any, b:any) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            key: "author",
            width: 150,
            sorter: {
                compare: (a:any, b:any) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            key: "price",
            width: 100,
            sorter: {
                compare: (a:any, b:any) => a.chinese - b.chinese,
                multiple: 3,
            },
            render: (text:any) => {
                return (
                    <span>{`${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span>
                );
            },
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updated_at",
            key: "updated_at",
            width: 150,
            sorter: {
                compare: (a:any, b:any) => a.chinese - b.chinese,
                multiple: 3,
            },
            render: (text: any) => moment(text).format("DD-MM-YYYY, h:mm:ss a")
        },
        {
            title: "Thao tác",
            key: "action",
            fixed: "right",
            width: "120px",
            render: (text:any, record:any) => (
                <Space>
                    <Button
                        onClick={() => {setOpenModalUpdateBook(true);setDataBook(record);}}size="small"> <EditOutlined style={{color: "#80ffd7",cursor: "pointer",fontSize: "20px",}}/>
                    </Button>
        
                    <Button size="small">
                        <Popconfirm
                            title="Xóa sản phẩm!"
                            description="Bạn có chắc muốn xóa sản phẩm này không?"
                            onConfirm={async () => {
                                const res = await deleteProduct(text.id);
                                if (res.status === 200) {
                                    setFilters([]);
                                    setSofts("");
                                    message.error(`Bạn đã xóa người dùng ${text.fullName}`);
                                    dispatch(getAllProduct() as unknown as AnyAction);
                                }
                            }}
                            onCancel={(e) => {
                                console.log(e);
                            }} 
                            okText="Vâng" cancelText="Không">
                            <DeleteOutlined style={{color: "#FF8080",marginLeft: "4px",cursor: "pointer",fontSize: "20px",}}/>
                        </Popconfirm>
                    </Button>

                    <Button size="small">
                        <Popconfirm
                        title="Khôi phục người dùng!"
                        description="Bạn có chắc muốn khôi phục sản phẩm này không?"
                            onConfirm={async () => {
                                const res = await restoreProduct(text.id);
                                if (res.status === 200) {
                                    setFilters([]);
                                    setSofts("");
                                    message.success(`Khôi phục thành công ${text.fullName}`);
                                    dispatch(getAllProduct() as unknown as AnyAction);
                                }
                            }}
                        onCancel={(e) => {
                            console.log(e);
                        }}
                        okText="Vâng"
                        cancelText="Không"
                        >
                        <UndoOutlined
                            style={{
                                color: "#80ffd7",
                                marginLeft: "4px",
                                cursor: "pointer",
                                fontSize: "20px",
                            }}
                        />
                        </Popconfirm>
                    </Button>
                </Space>
            ),
        },
    ];
  
    return (
        <>
            <AdvancedSearchForm setFilters={setFilters} />
            <HeaderProductsTable
                data={data}
                setFilters={setFilters}
                setSofts={setSofts}
            />
            <Table
            style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                padding: "4px",
                borderRadius: "4px",
            }}
            columns={columns}
            dataSource={data?.map((product:any)=> ({ ...product, key: product.id }))}
            pagination={{
                defaultPageSize: 10,
                pageSize: pageSize,
                showSizeChanger: true,
                total: total,
                position: ["bottomRight"],
                pageSizeOptions: ["10", "20", "30"],
                showTotal: (total, range) => {
                return (
                    <>
                    <Space size={6}>
                        <div>
                        {range[0]}-{range[1]}
                        </div>
                        trên {total} rows
                    </Space>
                    </>
                );
                },
            }}
            scroll={{
                x: 1000,
                y: 700,
                scrollToFirstRowOnChange: true,
            }}
            // onChange={onChange}
            />
            <Drawer
            placement="right"
            onClose={() => {
                setOpenDetailBook(false);
            }}
            open={openDetailBook}
            width={"50%"}
            >
            <DetailProduct dataBook={dataBook} />
            </Drawer>
            <UpdateProduct
            dataBook={dataBook}
            openModalUpdateBook={openModalUpdateBook}
            setFilters={setFilters}
            setOpenModalUpdateBook={setOpenModalUpdateBook}
            />
        </>
    );
};
