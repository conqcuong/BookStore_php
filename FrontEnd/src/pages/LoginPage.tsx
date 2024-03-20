import {
    Button,
    Checkbox,
    Divider,
    Form,
    Input,
    message,
    notification,
} from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { OAuth } from '../components/layout/OAuth'
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/apiRequest";
import { AnyAction } from "redux";

export const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async ({ email, password }:any) => {
        const newUser = {
            email: email,
            password: password,
        };
        try {
            dispatch(loginUser(newUser) as unknown as AnyAction);
        } catch (err:any) {
            console.log(err);
        }
    };
    
    return (
        <div className="flex items-center justify-center h-screen">
            {/* onFinishFailed={onFinishFailed}  */}
            <Form name="basic" layout="vertical" autoComplete="off" action="#" className="bg-white shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] border-2 rounded-lg max-w-md p-4 sm:p-6 lg:p-8 container mt-[50px] md:mt-[100px]" onFinish={onFinish} >
                <h1 className="text-xl text-center font-medium text-gray-900 dark:text-dark">
                    Đăng nhập
                </h1>
                <Divider />
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
                <Form.Item style={{ display: "inline-block" }} name="remember" valuePropName="checked">
                    <Checkbox>Lưu thông tin</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button className="w-full min-h-[50px] text-white hover:!text-white bg-blue-700 hover:!bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" htmlType="submit" loading={isSubmit}>Đăng nhập</Button>
                </Form.Item>
                <Form.Item className="text-sm font-semibold text-gray-700">
                    <span>Chưa có tài khoản?</span>
                    <NavLink to={"/register"} className="text-blue-700 hover:underline dark:text-blue-500 ml-1">Tạo tài khoản</NavLink>
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
