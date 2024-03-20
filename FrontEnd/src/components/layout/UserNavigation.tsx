import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space, message, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import ManagerAccount from "./ManagerAccount"; 
export const UserNavigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const user = useSelector((state:any) => state?.auth.currentUser);

    const handleMenuClick = (item:any) => {
        if (item.key === "logout") {
            message.info("Logged out successfully");
        } else if (item.key === "user") {
            setOpenModal(true);
        } else {
            
            navigate(item.key);
        }
    };

    const menuItems = [
        {
            label: <Link to="/">Trang chủ</Link>,
            key: "/",
        },
        {
            label: user?.role === "admin" ? <Link to="/admin/dash-board">Trang quản trị</Link> : null,
            key: "/admin/dash-board",
        },        
        {
            label: <div onClick={() => setOpenModal(true)}>Quản lý tài khoản</div>,
            key: "user",
        },
        {
            label: <Link to="/orderhistory">Lịch sử đơn hàng</Link>,
            key: "quanLy",
        },
        {
            type: "divider",
        },
        {
            label: "Đăng xuất",
            key: "logout",
            danger: true,
        },
    ];

    return (
        <>
            <Dropdown
                placement="top"
                overlay={
                    <Menu onClick={handleMenuClick}>
                        {menuItems.map((item, index) => (
                            item.type === "divider" ? (
                                <Menu.Divider key={`divider-${index}`} />
                            ) : (
                                <Menu.Item key={item.key} danger={item.danger}>
                                    {item.label}
                                </Menu.Item>
                            )
                        ))}
                    </Menu>
                }
                trigger={["click"]}
            >
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    <Space>
                        <Button size="large" className="flex justify-center items-center gap-2 p-3">
                            <Space style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "165px" }}>
                                {user?.name}
                            </Space>
                            <Avatar src={user?.image_path} icon={<UserOutlined />} />
                        </Button>
                    </Space>
                </a>
            </Dropdown>
            {/* <ManagerAccount openModal={openModal} setOpenModal={setOpenModal} dataUser={user} /> */}
        </>
    );
};
