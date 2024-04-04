import { Button, InputNumber, Space } from "antd";

export const Quantity = (Props:any) => {
    const { type, value, hiddenTitle, onChange } = Props;
    const handleDecrease = () => {
        if (onChange) {
        onChange(value - 1);
        }
    };

    const handleIncrease = () => {
        if (onChange) {
        onChange(value + 1);
        }
    };
    return (
        <>
            <div className={type == "vertical" ? "flex flex-col" : "flex"}>
                {hiddenTitle ? "" : <h3 className="text-13px">Số lượng: </h3>}

                <Space className="quantity !gap-0 w-[120px] mt-3">
                    <Button
                        onClick={handleDecrease}
                        disabled={value <= 1}
                        className="w-1/4 ml-1 flex justify-center items-center"
                    >
                        -
                    </Button>
                    <InputNumber
                        className="w-12 flex justify-center items-center"
                        min={1}
                        value={value}
                        onChange={(newValue) => onChange && onChange(newValue)}
                    />
                    <Button
                        onClick={handleIncrease}
                        className="w-1/4 ml-1 flex justify-center items-center"
                    >
                        +
                    </Button>
                </Space>
            </div>
        </>
    )
}
