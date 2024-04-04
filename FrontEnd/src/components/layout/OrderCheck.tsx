import TextArea from "antd/es/input/TextArea";
import { Button, Table, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { useState, useEffect } from "react";
import { handleStepOrder, handleRemoveProductToCart } from "../../redux/slice/orderSlice";


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
];

export const OrderCheck = () => {
    const dispatch = useDispatch();
    const dataOrder = useSelector((state:any) => state.order.order);
    const user = useSelector((state:any) => state.auth.currentUser);
    const dataTable = (data:any) => {
        if (!data || !Array.isArray(data)) {
            return [];
        }

        function formatVnd(value:any) {
            return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    
        return data.map((values:any) => {
            return {
                key: uuidV4(),
                id: values.id,
                product: (
                    <div
                        className="flex cursor-pointer"
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
                    values.quantity
                ),
            };
        });
    };

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let sum = 0;
        if (dataOrder) {
            dataOrder.map((item:any) => {
                sum += item.quantity * item.price;
            });

            setTotalPrice(sum);
        }
    }, [dataOrder]);

    const onFinish = async ({ fullName, phone, address, note }:any) => {
        const userInfo = {
            user_id: user.id,
            fullName: fullName,
            phone: phone,
            address: address,
            note: note,
            totalPrice: totalPrice,
        };
        const orderInfo = dataOrder.map((item: any) => ({
            product_id: item.id,
            quantity: item.quantity,
        }));
        try {
            const formData = new FormData();
            formData.append("userInfo", JSON.stringify(userInfo));
            formData.append("orderInfo", JSON.stringify(orderInfo));
            try {
                const response = await fetch('http://127.0.0.1:8000/api/vnpay_payment', {
                    method: 'POST',
                    body: formData
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                dataOrder.forEach((item: any) => {
                    dispatch(handleRemoveProductToCart(item.id));
                });
                dispatch(handleStepOrder("prev"))
                window.location.href = responseData
            } catch (error) {
                console.error('Error:', error);
            }
        } catch (err:any) {
            console.log(err);
        }
    };

    return (
        <div className="flex max-xl:flex-col gap-4 p-5">
            <div>
                <Table
                    columns={columns}
                    className="border"
                    dataSource={dataTable(dataOrder)}
                    locale={{ emptyText: "Không có sản phẩm trong giỏ hàng" }}
                    pagination={false}
                />
                <div className="mt-5 right-0">
                    <h3 className="font-semibold text-[19px]">Tổng tiền: <span className="text-red-500 font-normal text-16px">{(totalPrice).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</span></h3>
                </div>
            </div>
            <div className="w-[30%] border rounded-[8px]">
                <div>
                    <Form
                        name="basic"
                        layout="vertical"
                        autoComplete="off"
                        action="#"
                        onFinish={onFinish}
                        className="bg-white rounded-lg border-gray-900 max-w-md p-4 sm:p-2 lg:p-4 text-left"
                        >
                        <Form.Item
                            label="Họ và tên"
                            name="fullName" 
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập họ và tên!",
                                },
                            ]}
                        >
                            <Input
                                className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                                placeholder="Nguyen Van A"
                            />
                        </Form.Item>
                        <Form.Item
                            className="text-left"
                            label="Số điện thoại"
                            name="phone" 
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="0345678910"
                                className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 "
                            />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address" 
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ, số nhà!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Địa chỉ, số nhà"
                                className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                            />
                        </Form.Item>
                        <Form.Item label="Ghi chú" name="note">
                            <TextArea></TextArea>
                        </Form.Item>
                        <Form.Item className="text-sm font-medium text-gray-700">
                            <Button
                            size="large"
                            type="primary"
                            danger
                            className="w-full"
                            htmlType="submit"
                            >
                            Mua hàng
                            </Button>
                        </Form.Item>
                        <Form.Item className="text-sm font-medium text-gray-700">
                            <Button
                            size="large"
                            type="primary"
                            danger
                            className="w-full"
                            htmlType="submit"
                            onClick={() => dispatch(handleStepOrder("prev"))}
                            >
                            Quay lại
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
 