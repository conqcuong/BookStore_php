import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useSelector } from "react-redux";

function formatVnd(value: any) {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const HistoryOrderPage = () => {
    const user = useSelector((state:any) => state.auth.currentUser);
    const [dataOrderHistory, setDataOrderHistory] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/product/getOrder");
                if (res) {
                    const filteredData = res.data.filter((order:any) => order.user_id === user.id);
                    setDataOrderHistory(filteredData);
                }
            } catch (error) {
                
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            title: "Thời gian",
            dataIndex: "created_at",
            key: "created_at",
            render: (text: any) => {
                return `${moment(text).subtract(10, "days").calendar()} - ${moment(text).format("LT")}`;
            },
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (text: any) => {
                return <>{formatVnd(text)}đ</>;
            },
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: () => (
                <>
                    <Tag color={"green"} key={"green"}>
                        Thành công
                    </Tag>
                </>
            ),
        },
        {
            title: "Đơn mua",
            key: "detail",
            width: 300,
            render: (_: any, record: any) => {
                return record.items.map((item: any) => {
                    return (
                        <div key={uuidv4()} className="flex justify-start items-center">
                            <h5 className="flex-1">{item.product_name}</h5>
                            <span className="ml-3">X{item.quantity}</span>
                        </div>
                    );
                });
            },
        },
    ];

    return (
        <>
            <Header/>
            <div className="min-h-screen sm:min-w-full mx-[200px] bg-white mt-10">
                <div className="p-3" key={uuidv4()}>
                <h3 className="font-sans mb-5 font-semibold text-2xl">Lịch sử đặt hàng:</h3>
                <Table
                    columns={columns}
                    expandable={{
                        expandRowByClick: true,
                    }}
                    dataSource={dataOrderHistory}
                />
                </div>
            </div>
            <Footer/>
        </>
    );
};
