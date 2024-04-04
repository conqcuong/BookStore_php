import { FireTwoTone } from "@ant-design/icons";
import { Space } from "antd";
import { Link } from "react-router-dom";

export const ListBooks = (Props:any) => {
    const { dataListBooks } = Props;

    return (
        <div className="flex flex-wrap justify-start 2xl:gap-4 gap-2">
        {dataListBooks?.map((book:any) => {
            return (
                <div className="rounded-[8px] border-[2px] border-[#e8e8e8]" key={book.id}>
                    <div className="flex flex-col justify-between">
                        <div className="p-3 w-[220px]">
                            <div className="mb-2 flex justify-center">
                                <Link to={`/shop/details/${book.id}`} className="relative overflow-hidden text-center">
                                    <img className="max-h-[190px] w-auto text-center" src={book.thumbnail_image} alt="" />
                                </Link>
                            </div>
                            <Link to={`/shop/details/${book.id}`}><h2 className="line-clamp-2 font-semibold">{book.name}</h2></Link>
                            <div className="mt-1">
                                <p>
                                    <span className='text-[#C92127] font-semibold'>{(book.price).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</span>
                                </p>
                            </div>
                            <div>
                                <p className='text-[10px]'><span className='text-[#7A7E7F] mt-[1px]'>Đã bán </span>{book.sold}</p>
                            </div>
                        </div>     
                        <hr className="my-2"/>
                        <Space
                            key={1}
                            size={"small"}
                            className="flex justify-center books-center mb-2"
                        >
                            Giao hàng siêu tốc
                            <FireTwoTone twoToneColor="#eb2f2f" />
                        </Space> 
                    </div>
                </div>
            );
        })}
        </div>
    )
}
