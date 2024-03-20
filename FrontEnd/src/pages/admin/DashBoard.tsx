import { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import CountUp from "react-countup";

const formatter = (value:any) => <CountUp end={value} separator="," />;
export const DashBoard = () => {
    const [order, setOrder] = useState(10);
    const [user, setUser] = useState(13);
    return (
        <Row gutter={16}>
            <Col span={12}>
                <Card>
                    <Statistic title="Người dùng" value={user} precision={2} formatter={formatter} />
                </Card>
            </Col>
            <Col span={12}>
                <Card>
                    <Statistic title="Đơn đặt hàng" value={order} formatter={formatter} />
                </Card>
            </Col>
        </Row>
    )
}
