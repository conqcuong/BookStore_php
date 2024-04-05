import { useState, useEffect } from "react";
import { Card, Col, Row, Statistic } from "antd";
import CountUp from "react-countup";
import axios from "axios";
import { useSelector } from "react-redux";

const formatter = (value:any) => <CountUp end={value} separator="," />;

export const DashBoard = () => {
    const [orderCount, setOrderCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const listUser = useSelector((state:any) => state?.user.listUser);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/product/getOrder");
                if (response.data && Array.isArray(response.data)) {
                    setOrderCount(response.data.length);

                    const revenue = response.data.reduce((total, order) => {
                        return total + parseFloat(order.totalPrice);
                    }, 0);
                    setTotalRevenue(revenue);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Row gutter={16}>
            <Col span={12}>
                <Card>
                    <Statistic
                        title="Người dùng"
                        value={listUser ? listUser.length : 0} 
                        precision={0}
                        formatter={formatter}
                    />
                </Card>
                <Card style={{ marginTop: 20 }}>
                    <Statistic
                        title="Tổng doanh thu"
                        value={totalRevenue}
                        formatter={formatter}
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card>
                    <Statistic
                        title="Đơn đặt hàng"
                        value={orderCount}
                        formatter={formatter}
                    />
                </Card>
            </Col>
        </Row>
    );
};
