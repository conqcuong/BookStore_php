import { Button, Space, Steps, Table, message } from "antd";
import  { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { DeleteTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Quantity } from "../components/layout/Quantity";
import { handleQuantity, handleRemoveProductToCart, handleProductToOrder, handleStepOrder } from '../redux/slice/orderSlice'
import { OrderCheck } from "../components/layout/OrderCheck";

const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      width: 200,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 200,
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      width: 200,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      width: 120,
    },
];

    export const OrderPage = () => {
        const dispatch = useDispatch();
        const [totalPrice, setTotalPrice] = useState(0);
        const dataCarts = useSelector((state:any) => state?.order?.carts);

        const { order: dataOrder, stepOrder } = useSelector((state:any) => state?.order);
        let idProductOrder:any;
        const navigate = useNavigate();
        const toSlug = (str:any) => {
            // Chuyển hết sang chữ thường
            str = str.toLowerCase();

            // xóa dấu
            str = str
            .normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
            .replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp

            // Thay ký tự đĐ
            str = str.replace(/[đĐ]/g, "d");

            // Xóa ký tự đặc biệt
            str = str.replace(/([^0-9a-z-\s])/g, "");

            // Xóa khoảng trắng thay bằng ký tự -
            str = str.replace(/(\s+)/g, "-");

            // Xóa ký tự - liên tiếp
            str = str.replace(/-+/g, "-");

            // xóa phần dư - ở đầu & cuối
            str = str.replace(/^-+|-+$/g, "");

            // return
            return str;
        };

        useEffect(() => {
            let sum = 0;
            if (dataCarts) {
                dataCarts.map((item:any) => {
                    sum += item.quantity * item.price;
                });

                setTotalPrice(sum);
            }
        }, [dataCarts, stepOrder]);

        const handleClickProductCarts = (products:any) => {
            const slug = toSlug(products.name);
            navigate(`/book/${slug}?id=${products._id}`);
        };

        function formatVnd(value:any) {
            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const rowSelection = {
            onChange: (selectedRowKeys:any, selectedRows:any) => {
                idProductOrder = selectedRows.map((item:any) => {
                    return item.id;
                });
            },
            getCheckboxProps: (record:any) => ({
                disabled: record.name === "Disabled User",
                name: record.name,
            }),
        };

        const dataTable = (data:any) => {
            if (!data || !Array.isArray(data)) {
                return [];
            }
        
            return data.map((values:any) => {
                return {
                    key: uuidV4(),
                    id: values.id,
                    product: (
                    <div
                        className="flex cursor-pointer"
                        onClick={() => {
                        handleClickProductCarts(values);
                        }}
                    >
                        <img
                        className="w-[50px] mr-2"
                        src={values.thumbnail}
                        alt=""
                        />
                        <h3 className=" text-black m-0 line-clamp-2">
                        {values.name}
                        </h3>
                    </div>
                    ),
                    price: (
                    <span className="text-red-500">
                        {formatVnd(values.price)}đ
                    </span>
                    ),
                    total: (
                    <span className="text-gray-500">
                        {formatVnd(values.price * values.quantity)} đ
                    </span>
                    ),
                    quantity: (
                        <Quantity
                            hiddenTitle
                            type={"vertical"}
                            value={values.quantity}
                            onChange={(value:any) => {
                                return dispatch(
                                    handleQuantity({ id: values.id, quantity: value }),
                                );
                                
                            }}
                        />
                    ),
                    action: (
                    <div className="text-center">
                        <DeleteTwoTone
                        style={{
                            fontSize: 20,
                            paddingRight: 0,
                            cursor: "pointer",
                        }}
                        twoToneColor={"#bababa"}
                        onClick={() => {
                            dispatch(handleRemoveProductToCart(values.id));
                        }}
                        />
                    </div>
                    ),
                };
            });
        };    

        const steps = [
            {
                title: "Giỏ hàng",
                content: (
                    <div className="flex gap-6">
                        <Table
                            className="border"
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={dataTable(dataCarts)}
                            locale={{ emptyText: "Không có sản phẩm trong giỏ hàng" }}
                            pagination={false}
                        />
                        <div className="w-[200px] flex-col gap-2 p-3 border">
                            <Space className="flex flex-col items-start">
                                <h3 className="font-semibold mb-1">Tạm tính:</h3>
                                <span className="mb-1">{formatVnd(totalPrice)}đ</span>
                            </Space>
                            <Space className="flex flex-col items-start mb-1">
                                <h3 className="font-semibold ">Tổng tiền:</h3>
                                <span>{formatVnd(totalPrice)}đ</span>
                            </Space>
                            <div className="w-full flex flex-col gap-2 mt-3">
                                <Button
                                    size="large"
                                    type="primary"
                                    danger
                                    className="w-full"
                                    onClick={() => {
                                        if (idProductOrder) {
                                            dispatch(handleProductToOrder([dataCarts, idProductOrder]));
                                            dispatch(handleStepOrder("next"));
                                        } else {
                                            message.error("Vui lòng chọn sản phẩm.");
                                        }
                                    }}
                                >
                                    Mua hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                title: "Đặt hàng",
                content: (
                    <OrderCheck/>
                ),
            },
            // {
            //     title: "Hoàn thành",
            //     content: (
            //         <>
            //         <Button key="console" onClick={() => navigate("/orderhistory")}>
            //             Xem lịch sử đơn hàng
            //         </Button>
            //         </>
            //     ),
            // },
        ];

        const items = steps.map((item) => ({
            key: item.title,
            title: item.title,
        }));

        return (
            <>
                <Header/>
                <div className="flex min-h-screen sm:min-w-full mx-[200px] bg-white mt-10">
                    <Content>
                        <Steps className=" text-center w-[40%] mb-5" current={stepOrder} items={items} />
                        <div>{steps[stepOrder].content}</div>
                    </Content>
                </div>
                <Footer/>
            </>
        );
    };