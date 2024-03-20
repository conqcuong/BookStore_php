import { Divider, Layout, Space, Checkbox, Row, Col, Form, Button, Slider, InputNumber, Drawer } from "antd";
import { v4 as uuidv4 } from "uuid";
import { FilterOutlined, RedoOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../redux/apiRequest";
import { AnyAction } from "redux";

const { Sider } = Layout;
import "../../styles/sideBar.scss";

const CheckboxGroup = Checkbox.Group;

export const Sidebar = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllProduct() as unknown as AnyAction);
    }, []);

    const [pageSize, setPageSize] = useState(10);
    const [filters, setFilters] = useState<string[]>([]);
    const [filtersListSearch, setFiltersListSearch] = useState<string>('');
    const [checkedList, setCheckedList] = useState<any[]>([]);
    const [range, setRange] = useState([0, 500000]);

    const toVND = (values: number) => {
        return `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const onFormLayoutChange = (props: any) => {
        console.log(`layout:`, props);
    };

    const onFinish = () => {
        setFilters((prevFilters) => {
            return [...prevFilters, `${filtersListSearch}&price>=${range[0]}&price<=${range[1]}`];
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const listCategory = useSelector((state: any) => state?.product.listProduct.categories);

    const onChangeCategory = (list: any) => {
        setFiltersListSearch(`category=${list.join(",")}`); 

        const newFilters = list.map((item: string) => `category=${item}`); 
        setFilters(newFilters); 
        setCheckedList(list);
    };

    return (
        <>
            <Drawer>
                <Sider
                    width={"100%"}
                    style={{
                        background: '#fff',
                    }}
                    >
                    <Form
                        initialValues={{
                        layout: "horizontal",
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        className="w-full p-2"
                    >
                        <Space className="flex justify-between p-3">
                        <Space>
                            <FilterOutlined />
                            Bộ lọc tìm kiếm
                        </Space>
                        <RedoOutlined
                            className="cursor-pointer"
                            onClick={() => {
                            setCheckedList([]);
                            setRange([0, 500000]);
                            setFilters([]);
                            }}
                        />
                        </Space>
                        <Divider className="m-0" />
                        <Space className="flex flex-col items-start p-3 ">
                        <Space>Danh sách tìm kiếm:</Space>
                        <CheckboxGroup value={checkedList} onChange={onChangeCategory}>
                            <Row className="flex flex-col items-start ">
                            {listCategory?.map((item: any) => {
                                return (
                                    <Col key={item.id}>
                                        <Checkbox value={item.id}>{item.nameCate}</Checkbox>
                                    </Col>
                                );
                            })}
                            </Row>
                        </CheckboxGroup>
                        </Space>
                        <Divider />
                        <Form.Item>
                        Khoảng giá:
                        <Row>
                            <Col span={24} className="my-2">
                            <InputNumber
                                min={0}
                                max={range[1]}
                                defaultValue={0}
                                value={range[0]}
                                onChange={(value) => {
                                    if (value === null) {
                                        return;
                                    }
                                    setRange([
                                        value >= range[1] ? range[1] : value,
                                        range[1],
                                    ]);
                                }}
                                addonAfter="VND"
                            />
                            </Col>
                            Đến
                            <Col span={24}>
                            <InputNumber
                                min={range[0]}
                                max={1000000}
                                value={range[1]}
                                onChange={(value) => {
                                    if (value === null) {
                                        return;
                                    }
                                    setRange([
                                        range[0],
                                        value <= range[0] ? range[0] : value,
                                    ]);
                                }}
                                addonAfter="VND"
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                            <Slider
                                tooltip={{ open: false }}
                                range
                                step={1000}
                                min={0}
                                max={1000000}
                                value={range}
                                onChange={(values) => {
                                setRange(values);
                                }}
                            />
                            </Col>
                        </Row>
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" className="w-full" htmlType="submit">
                            Tìm kiếm
                        </Button>
                        </Form.Item>
                    </Form>
                    <Divider className="mt-0" />
                </Sider>
            </Drawer>
            <Sider
                className="max-md:hidden"
                width={250}
                style={{
                    background: '#fff',
                }}
            >
                <Form
                initialValues={{
                    layout: "horizontal",
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="w-full p-2"
                >
                <Space className="flex justify-between p-3">
                    <Space>
                    <FilterOutlined />
                    Bộ lọc tìm kiếm
                    </Space>
                    <RedoOutlined
                    className="cursor-pointer"
                    onClick={() => {
                        setCheckedList([]);
                        setRange([0, 500000]);
                        setFilters([]);
                    }}
                    />
                </Space>
                <Divider className="m-0" />
                <Space className="flex flex-col items-start p-3 ">
                    <Space>Danh sách tìm kiếm:</Space>
                    <CheckboxGroup value={checkedList} onChange={onChangeCategory}>
                        <Row className="flex flex-col items-start ">
                            {listCategory?.map((item:any) => {
                                return (
                                    <Col key={uuidv4()}>
                                        <Checkbox value={item.id}>{item.nameCate}</Checkbox>
                                    </Col>
                                );
                            })}
                        </Row>
                    </CheckboxGroup>
                </Space>
                <Divider />
                Khoảng giá:
                <Form.Item>
                    <Row>
                    <Col span={24} className="my-2">
                    <InputNumber
                        min={0}
                        max={range[1]}
                        defaultValue={0}
                        value={range[0]}
                        onChange={(value) => {
                            if (value === null) {
                                return;
                            }
                            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
                            setRange([numericValue >= range[1] ? range[1] : numericValue, range[1]]);
                        }}
                        addonAfter="VND"
                    />
                    </Col>
                    Đến
                    <Col span={24}>
                        <InputNumber
                        min={range[0]}
                        max={1000000}
                        value={range[1]}
                        onChange={(value) => {
                            if (value === null) {
                                return;
                            }
                            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
                            setRange([range[0], numericValue <= range[0] ? range[0] : numericValue]);
                        }}
                        addonAfter="VND"
                        />
                    </Col>
                    </Row>
                    <Row>
                    <Col span={24}>
                        <Slider
                        tooltip={{ open: false }}
                        range
                        step={1000}
                        min={0}
                        max={1000000}
                        value={range}
                        onChange={(values) => {
                            setRange(values);
                        }}
                        />
                    </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="w-full bg-blue-500" htmlType="submit">
                    Tìm kiếm
                    </Button>
                </Form.Item>
                </Form>
                <Divider className="mt-0" />
            </Sider>
        </>
    );
};
