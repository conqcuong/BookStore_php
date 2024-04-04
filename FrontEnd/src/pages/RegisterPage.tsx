import {
    Button,
    Divider,
    Form,
    Input,
} from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { OAuth } from '../components/layout/OAuth'
import { useDispatch } from "react-redux";
import { RegisterUser } from "../redux/apiRequest";
import { AnyAction } from "redux";

export const RegisterPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async ({ email, password, fullName }:any) => {
        const newUser = {
            name: fullName,
            email: email,
            password: password,
        };
        try {
            dispatch(RegisterUser(newUser, navigate) as unknown as AnyAction);
        } catch (err:any) {
            console.log(err);
        }
    };
    return (
        <div className="flex items-center justify-center h-screen">
            {/* onFinish={onFinish} onFinishFailed={onFinishFailed}  */}
            <Form name="basic" layout="vertical" autoComplete="off" action="#" onFinish={onFinish} className="bg-white shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] border-2 rounded-lg max-w-md p-4 sm:p-6 lg:p-8 container mt-[50px] md:mt-[100px]">
                <h1 className="text-xl text-center font-medium text-gray-900 dark:text-dark">Đăng ký</h1>
                <Divider />
                <Form.Item label="Tên đầy đủ" name="fullName" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                    rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên của bạn!",
                    },
                    ]}>
                    <Input className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" placeholder="Your Name" />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập email!",
                    },
                    {
                        pattern:
                        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                        message: "Email nhập không chính xác!",
                    },
                ]}>
                    <Input className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" placeholder="name@company.com"/>
                </Form.Item>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!!",
                        },
                        {
                            // pattern:
                            //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                            message:
                            "Mật khẩu yêu cầu từ 8 đến 16 ký tự, có chữ cái in hoa và ký tự đặc biệt!",
                        },
                    ]}>
                    <Input.Password style={{ background: "transparent", borderColor: "rgb(209 213 219) ",}} placeholder="••••••••" className="flex border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 " />
                </Form.Item>
                <Form.Item>
                    <Button className="w-full min-h-[50px] text-white hover:!text-white bg-blue-700 hover:!bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" htmlType="submit" loading={isSubmit}>Đăng ký</Button>
                </Form.Item>
                <Form.Item className="text-sm font-semibold text-gray-700">
                    <span>Tài khoản đã có sẵn?</span>
                    <NavLink to={"/login"} className="text-blue-700 hover:underline dark:text-blue-500 ml-1">Đăng nhập</NavLink>
                </Form.Item>
                <div className='flex w-full gap-4 items-center mb-6'>
                    <div className='flex-1 w-full bg-gray-200 h-[1px]'></div>
                        <span className='text-gray-600'>Or Login with</span>
                    <div className='flex-1 w-full bg-gray-200 h-[1px]'></div>
                </div>
                <OAuth/>
            </Form>
            
        </div>
    )
}
