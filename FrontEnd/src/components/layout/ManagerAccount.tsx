import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Modal, Row, Tabs, Upload, message,} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState, useRef } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { getLogin } from "../../redux/apiRequest";


export const ManagerAccount = (Props:any) => {const { dataUser, openModal, setOpenModal } = Props;
    const dispatch = useDispatch();
    const [formUpdateInfo] = Form.useForm();
    const [formChangePassword] = Form.useForm();
    const [tabs, setTabs] = useState("info");

    const [avatar, setAvatar] = useState(dataUser.image_path);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [newAvatar, setNewAvatar] = useState<any>();
    const [isSubmit, setIsSubmit] = useState(false);
    const renderAvatar = () => {
        if (avatarUrl) {
        return (
            <Avatar size={200} src={avatarUrl} />
        );
        } else {
        return (
            <Avatar size={200} src={avatar} icon={<UserOutlined />} />
        );
        }
    };

    const onChange = (key:any) => {
        setTabs(key);
    };
    const userId = dataUser.id
    const onFinish = async () => {
        const valuesFormUpdateInfo = formUpdateInfo.getFieldsValue();
        const valuesChangePassword = formChangePassword.getFieldsValue();
        if (tabs === "info") {
            setIsSubmit(true);
            try {
                const dataUser = {
                    name: valuesFormUpdateInfo.fullName,
                    phone: valuesFormUpdateInfo.phone,
                    address: valuesFormUpdateInfo.address,
                }
                const formData = new FormData();
                formData.append('data', JSON.stringify(dataUser));
                formData.append('file', newAvatar);
                axios.post(`http://127.0.0.1:8000/api/user/edit/${userId}`, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    dispatch(getLogin() as unknown as AnyAction);
                    message.success('Cập nhật thông tin thành công!');
                    setIsSubmit(false);
                })
                .catch(error => {
                    console.error('Đã xảy ra lỗi trong quá trình gửi yêu cầu:', error);
                });
            } catch (error) {
                console.error("Error updating info:", error);
            }
        }
        if (tabs === "password") {
            setIsSubmit(true);
            try {
                const dataUser = {
                    password: valuesChangePassword.newPassword,
                }
                const formData = new FormData();
                formData.append('data', JSON.stringify(dataUser));
                axios.post(`http://127.0.0.1:8000/api/user/edit/${userId}`, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    dispatch(getLogin() as unknown as AnyAction);
                    message.success('Cập nhật thông tin thành công!');
                    setIsSubmit(false);
                })
                .catch(error => {
                    console.error('Đã xảy ra lỗi trong quá trình gửi yêu cầu:', error);
                });
            } catch (error) {
                console.error("Error updating info:", error);
            }
        }
    };

    const handleCancel = () => {
        setAvatar(dataUser.image_path);
        setAvatarUrl(null);
        formChangePassword.setFieldValue("currentPassword", "");
        formChangePassword.setFieldValue("newPassword", "");
        setOpenModal(false);
    };
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            setNewAvatar(file);
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);
        }
    };

    const handleUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); 
        }
    };

    const items = [
    {
        key: "info",
        label: "Cập nhật thông tin",
        children: (
            <Row className="flex justify-center items-center">
                <Col span={12} className="flex flex-col justify-start items-start">
                    <div className="flex flex-col items-center gap-4">
                        {renderAvatar()}
                        <input
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                        />
                        <Button
                            icon={<UploadOutlined />}
                            onClick={handleUploadButtonClick}
                        >
                            Tải ảnh lên
                        </Button>
                    </div>
                </Col>
                <Col span={12}>
                <Form
                    onFinish={onFinish}
                    form={formUpdateInfo}
                    name="basic"
                    layout="vertical"
                    autoComplete="off"
                    action="#"
                    className="bg-white rounded-lg border-gray-900 max-w-md p-4 sm:p-2 lg:p-4 container text-left"
                >
                    <Form.Item
                    label="Email"
                    name="email"
                    initialValue={dataUser.email}
                    >
                    <Input
                        className="flex border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                        disabled
                    />
                    </Form.Item>
                    <Form.Item
                    label="Tên hiển thị"
                    name="fullName"
                    initialValue={dataUser.name}
                    rules={[
                        {
                        required: true,
                        message: "Vui lòng nhập tên của bạn!",
                        },
                    ]}
                    >
                    <Input
                        placeholder="Nguyen Van A"
                        className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                    />
                    </Form.Item>
                    <Form.Item
                    className="text-left"
                    label="Số điện thoại"
                    name="phone"
                    initialValue={dataUser.phone}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số điện thoại!",
                        },
                        {
                            pattern: /^\d{10}$/,
                            message: "Số điện thoại phải có 10 chữ số!",
                        },
                    ]}
                    >
                    <Input
                        placeholder="0345678910"
                        className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 "
                    />
                    </Form.Item>
                    <Form.Item
                    className="text-left"
                    label="Địa chỉ"
                    name="address"
                    initialValue={dataUser.address}
                    rules={[
                        {
                        required: true,
                        message: "Vui lòng nhập địa chỉ!",
                        },
                    ]}
                    >
                    <TextArea
                        placeholder="Địa chỉ"
                        className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 "
                    />
                    </Form.Item>
                </Form>
                </Col>
            </Row>
        ),
    },
    {
        key: "password",
        label: "Đổi mật khẩu",
        children: (
        <Form
            name="basic"
            layout="vertical"
            form={formChangePassword}
            onFinish={onFinish}
            autoComplete="off"
            action="#"
            className="bg-white rounded-lg border-gray-900 max-w-md p-4 sm:p-2 lg:p-4 container text-left"
        >
            <Form.Item label="Email" name="email" initialValue={dataUser.email}>
            <Input
                className="flex border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2"
                disabled
            />
            </Form.Item>
            <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
                {
                required: true,
                message: "Vui lòng nhập mật khẩu!!",
                },
                {
                pattern:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                message:
                    "Mật khẩu yêu cầu từ 8 đến 16 ký tự, có chữ cái in hoa và ký tự đặc biệt!",
                },
            ]}
            >
            <Input.Password
                style={{
                background: "transparent",
                borderColor: "rgb(209, 213, 219) ",
                }}
                placeholder="••••••••"
                className="flex border !bg-white border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 "
            />
            </Form.Item>
        </Form>
        ),
    },
    ];

    return (
    <Modal
        open={openModal}
        // open={true}
        width="50vw"
        title="Quản lý tài khoản"
        onCancel={handleCancel}
        footer={
        <>
            <Button onClick={handleCancel}>Hủy bỏ</Button>
            <Button
                type="primary"
                loading={isSubmit}
                className="bg-blue-500 text-white"
                onClick={() => {
                    // tabs === "infor"
                    //   ? formUpdateInfo.submit()
                    //   : formChangePassword.submit();
                    onFinish();
                }}
                >
                Áp dụng
            </Button>
        </>
        }
    >
        <Tabs defaultActiveKey="info" items={items} onChange={onChange} />
    </Modal>
    );
};
