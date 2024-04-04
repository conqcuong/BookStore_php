import { Table, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";

export const Oder = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [dataOrderHistory, setDataOrderHistory] = useState([]);

  useEffect(() => {
    // Fetch data from API
    axios.get("http://127.0.0.1:8000/api/product/getOrder")
      .then(response => {
        // Xử lý dữ liệu nhận được từ API và cập nhật state
        const formattedData = response.data.map(order => {
          return {
            ...order,
            key: order.id, // Sử dụng trường id làm key
          };
        });
        setDataOrderHistory(formattedData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleExpand = (record) => {
    const expanded = expandedRowKeys.includes(record.id);
    if (expanded) {
      setExpandedRowKeys(expandedRowKeys.filter((key) => key !== record.id));
    } else {
      setExpandedRowKeys([...expandedRowKeys, record.id]);
    }
  };

  const columns = [
    {
      title: "Thời gian",
      dataIndex: "created_at",
      key: "createdAt",
      render: (text) => {
        return `${moment(text).subtract(10, "days").calendar()} - ${moment(
          text
        ).format("LT")}`;
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => {
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
      key: "orderDetail",
      width: 300,
      render: (_, record) => {
        return record.items.map((item, index) => (
          <div key={index} className="flex justify-start items-center">
            <h5 className="flex-1">{item.product_name}</h5>
            <span className="ml-3">X{item.quantity}</span>
          </div>
        ));
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <button onClick={() => handleExpand(record)}>
          {expandedRowKeys.includes(record.id) ? "Thu gọn" : "Mở rộng"}
        </button>
      ),
    },
  ];

  return (
    <div className="p-3">
      <h3 className="font-sans">Lịch sử đặt hàng:</h3>
      <Table
        columns={columns}
        expandable={{
          expandRowByClick: false,
          expandedRowRender: (record) => (
            <Table
              columns={[
                { title: "Tên người mua", dataIndex: "user_name", key: "userName" },
                { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
                { title: "Địa chỉ", dataIndex: "address", key: "address" },
                { title: "Chi tiết", dataIndex: "detail", key: "detail", render: (text, record) => (
                    <ul>
                      {record.items.map((item, index) => (
                        <li key={index}>{item.product_name} - {item.quantity}</li>
                      ))}
                    </ul>
                )},
              ]}
              dataSource={[record]}
              pagination={false}
            />
          ),
          expandedRowKeys,
          onExpand: (_, record) => handleExpand(record),
        }}
        dataSource={dataOrderHistory}
        rowKey="id" // Đặt rowKey là trường id
      />
    </div>
  );
};

function formatVnd(value:any) {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
