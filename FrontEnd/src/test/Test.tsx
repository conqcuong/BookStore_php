import React from 'react';
import { Form } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Add Quill styles


export const Test = () => {
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'size': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
            {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    return (
        <Form.Item
            label="Mô tả"
            name="description"
            rules={[
                {
                    required: true,
                    message: "Vui lòng nhập mô tả sách!",
                },
            ]}
        >
            <ReactQuill
                placeholder="Vui lòng nhập mô tả sách"
                modules={modules}
                formats={formats}
            />
        </Form.Item>
    );
};
