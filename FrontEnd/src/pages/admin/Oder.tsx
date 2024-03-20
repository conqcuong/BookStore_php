import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

function formatVnd(value:any) {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const columns = [
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: uuidv4(),
      render: (text:any) => {
        return `${moment(text).subtract(10, "days").calendar()} - ${moment(
          text
        ).format("LT")}`;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: uuidv4(),
      render: (text:any) => {
        return <>{formatVnd(text)}đ</>;
      },
    },
    {
      title: "Trạng thái",
      key: uuidv4(),
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
      key: uuidv4(),
      width: 300,
      render: (_:any, record:any) => {
        return record.detail.map((values:any) => {
          return (
            <div key={uuidv4()} className="flex justify-start items-center">
              <h5 className="flex-1">{values.bookName}</h5>
              <span className="ml-3">X{values.quantity}</span>
            </div>
          );
        });
      },
    },
  ];

  const orderData = {
    address: "Illum sunt dolorem, Hòa Bình, Huyện Lạc Thủy, Xã Yên Bồng",
    createdAt: "2024-02-21T18:21:13.147Z",
    detail: [
      {
        bookName: "Đại Việt Sử Ký Toàn Thư Trọn Bộ",
        quantity: 3,
        _id: "653f7b2ee5d85450c173fb73"
      },
      {
        bookName: "Salt, Fat, Acid, Heat: Mastering the Elements of Good Cooking",
        quantity: 3,
        _id: "653f7b2ee5d85450c173fb71"
      }
    ],
    key: "737d21d6-8466-4324-bdb9-d30a154f5822",
    name: "Bree Simon",
    phone: "90988083861",
    totalPrice: 2460000,
    type: "COD",
    updatedAt: "2024-02-21T18:21:13.147Z",
    __v: 0,
    _id: "65d63f19c3ec1933b07ffcab"
  };

export const Oder = () => {
    const [dataOrderHistory, setDataOrderHistory] = useState([orderData]);

  return (
    <div className="p-3" key={uuidv4()}>
    <h3 className="font-sans">Lịch sử đặt hàng:</h3>
    <Table
      columns={columns}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => {
          return (
            <Table
              pagination={false}
              columns={[
                {
                  title: "Tên người mua",
                  dataIndex: "user",
                  key: uuidv4(),
                },
                {
                  title: "Số điện thoại",
                  dataIndex: "phone",
                  key: uuidv4(),
                },
                {
                  title: "Địa chỉ",
                  dataIndex: "address",
                  key: uuidv4(),
                },
                {
                  title: "Chi tiết",
                  key: uuidv4(),
                },
              ]}
              dataSource={[
                {
                  key: uuidv4(),
                  user: record.name,
                  phone: record.phone,
                  address: record.address,
                  detail: record.detail,
                },
              ]}
            />
          );
        },
      }}
      dataSource={dataOrderHistory}
    />
  </div>
  )
}
