import { useRef, useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { FaBlog } from "react-icons/fa6";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { DeleteTwoTone } from "@ant-design/icons";
import { Button, Empty, Tooltip, Badge } from "antd";
import { handleRemoveProductToCart } from "../../redux/slice/orderSlice";
import '../../styles/Header.css'
import { ManagerAccount } from "./ManagerAccount";
import { logOutUser } from "../../redux/apiRequest";
import { AnyAction } from "redux";

export const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const user = useSelector((state:any) => state?.auth?.currentUser);
    const productCarts = useSelector((state:any) => state?.order?.carts);
    // console.log(productCarts);

    function formatVnd(value:any) {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleClickProductCarts = (products:any) => {
        navigate(`/shop/details/${products.id}`);
    };

    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        const handleWindowClick = (e:any) => {
        if (
            !menuRef.current?.contains(e.target) &&
            !imgRef.current?.contains(e.target)
        ) {
            setOpen(false);
        }
    };
        window.addEventListener("click", handleWindowClick);
        return () => {
            window.removeEventListener("click", handleWindowClick);
        };
    }, []);

    const handleAccountInfoClick = () => {
        setOpenModal(true);
    };

    const handleLogout = () => {
        dispatch(logOutUser(navigate) as unknown as AnyAction);
    }

    const listProductsCart = (
        <div className="flex flex-col items-start cursor-pointer p-0">
            <h4 className="text-gray-300 m-0 pb-2">Sản Phẩm Mới Thêm</h4>
            <div className="max-h-[500px] w-full overflow-auto">
                {productCarts && productCarts.length > 0 ? (
                    productCarts?.map((values:any) => {
                        return (
                            <div
                                key={uuidv4()}
                                className="flex justify-between hover:bg-gray-200 p-2"
                                onClick={() => handleClickProductCarts(values)}
                            >
                                <div className="flex w-3/4 leading-6">
                                    <img
                                        className="w-[50px] mr-2"
                                        src={values.thumbnail}
                                        alt=""
                                    />
                                    <h4 className=" text-black m-0 line-clamp-2">
                                        {values.name}
                                    </h4>
                                </div>
                                <div className="flex justify-end items-center w-1/4">
                                    <div className="flex flex-col items-end mx-2">
                                        <span className=" text-red-500">
                                        {formatVnd(values.price)}đ
                                        </span>
                                        <span className="text-gray-600">x{values.quantity}</span>
                                    </div>
                                    <DeleteTwoTone
                                        style={{
                                            fontSize: 20,
                                            paddingRight: 0,
                                        }}
                                        twoToneColor={"#bababa"}
                                        onClick={(e:any) => {
                                            e.stopPropagation();
                                            dispatch(handleRemoveProductToCart(values.id));
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Không có sản phẩm trong giỏ hàng"
                    />
                )}
            </div>
            <div className="w-full flex justify-between items-center mt-2">
                <h5 className=" text-gray-300 m-0 flex-1">
                    {productCarts?.length} Thêm Hàng Vào Giỏ
                </h5>
                <Button
                    type="primary"
                    danger
                    onClick={() => {
                        // dispatch(handleStepOrder(0));
                        navigate("/order");
                    }}
                    >
                    Xem tất cả
                </Button>
            </div>
        </div>
    );
    const userRole = useSelector((state:any) => state?.auth.currentUser?.role);
    const userCanAccess = userRole === 'admin';

    return (
        <div className="text-black duration-200 sticky z-40 right-0 top-0 border border-[#e8ebed]">
            {/* upper Navbar */}
            <div className="bg-white py-2">
                <div className="flex justify-between items-center pl-24 pr-20">
                    <div>
                        <Link to='/' className='text-2xl font-bold text-blue-700 flex items-center gap-2'><FaBlog className=' inline-block'/>Books</Link>
                    </div>
                    <div className="navbar1 flex gap-7 font-semibold text-17px">
                        <NavLink className="p-3 nav-link" to='/'>Home</NavLink>
                        <NavLink className="p-3 nav-link" to='/shop'>Shop</NavLink>
                        <Link className="p-3 nav-link" to='/'>About</Link>
                        <Link className="p-3 nav-link" to='/'>Contact</Link>
                    </div>
                    {/* sreach bar */}
                    <div className="flex justify-between items-center gap-4">
                        <div className="relative group hiidden sm:block">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gay-300 px-2 py-1 focus:outline-none focus-border-1 focus:border-primar"
                            />
                            <CiSearch className="text-blue-700 group-hover:text-blue-700 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                        {/* order button  */}
                        <button className="bg-gradient-to-r from-blue-500 to-[#0b589a] transition-all duration-200 text-white rounded-full flex items-center gap-3 group px-2 py-1.5 ">
                        <Tooltip
                            overlayInnerStyle={{
                                width: "400px",
                            }}
                            // open
                            color="white"
                            placement="bottomRight"
                            title={listProductsCart}
                            arrow={true}
                        >
                            <Badge
                            className="flex justify-center items-center mx-2 text-white"
                            count={productCarts?.length}
                            overflowCount={productCarts?.length}
                            >
                                <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
                            </Badge>
                        </Tooltip>
                        </button>
                        {/* user profile  */}
                        <div className="navbar__actions">
                        {user ? (
                            <>
                                {/* avatar User */}
                                <div className="hidden ml-4 lg:block" ref={imgRef} onClick={() => setOpen(!open)}>
                                    <img className="rounded-full h-[35px] w-[35px] hover:cursor-pointer" src={user.image_path}/>
                                </div>
                                {
                                    // Menu Profile User
                                    open && (
                                        <div className="absolute z-9999 m-0 top-0 right-0 bottom-auto left-auto transform translate-x-[-27.3333px] translate-y-[57.3333px]">
                                            <ul className="navbar__ul">
                                                <div className="flex">
                                                    <div className="my-2.5 relative">
                                                        <div>
                                                            <img className="rounded-full h-[50.4px] w-[50.4px]" src={user.image_path}/>
                                                        </div>
                                                    </div>
                                                    <div className="ml-3 self-center">
                                                        <span className="font-semibold text-[#292929] text-16px">{user.name}</span>
                                                        <div className="text-text-color-light">{user.email}</div>
                                                    </div>
                                                </div>
                                                {userCanAccess && (
                                                    <li className="block py-2">
                                                        <Link to='/admin/dash-board'>Trang quản trị</Link>
                                                    </li>
                                                )}
                                                <li className="block py-2">
                                                    <button onClick={handleAccountInfoClick}>Thông tin tài khoản</button>
                                                </li>
                                                <li className="block py-2">
                                                    <Link to='/history-order' className="text-gray-color hover:text-[#292929]">Lịch sử đơn hàng</Link>
                                                </li>
                                                <li className="block py-2">
                                                    <button onClick={handleLogout} className="text-gray-color hover:text-[#292929]">Đăng xuất</button>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    )
                                }
                            </>
                        ) : (
                            <> 
                                {/* onClick={handleLoginClick}
                                onClick={handleRegisterClick} */}
                                <Link className="ml-5" to='/login'>
                                    <button className="text-black font-semibold mr-8" >Đăng nhập</button>
                                </Link>
                                <Link to='/register'>
                                    <button className="font-semibold text-white bg-gradient-to-r from-blue-500 to-[#0b589a] rounded-[99px] py-[9px] px-5 hover:opacity-90"> Đăng ký</button>
                                </Link>
                            </>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            {user && (
                <ManagerAccount
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    dataUser={user}
                />
            )}
        </div>
        
    )
}
