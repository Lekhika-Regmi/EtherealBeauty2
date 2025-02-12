import React from 'react';
import { FaBox, FaShoppingBag, FaShoppingCart } from 'react-icons/fa';
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai'; // Correct import
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { RxDashboard } from 'react-icons/rx';
import {VscNewFile} from "react-icons/vsc";
import {CiMoneyBill} from "react-icons/ci";
import { Link } from 'react-router-dom';

const DashboardSideBar = ({ active }) => {
    return (
        <div className="w-[250px] h-[100vh] bg-pink-200 text-black shadow-md sticky top-0 left-0 z-10">
            {/* single item */}
            <div className="w-full flex items-center p-4">
                <Link to="/Dashboard" className="w-full flex items-center gap-2">
                    <RxDashboard size={30}
                        color={'${active === 1 ? "crimson" : "#555"}'} />
                    <h5
                        className={`pl-2 text-[18px] font-[400] ${active === 1 ? "text-[crimson]" : "text-[black]"
                            }`}
                    >
                        Dashboard
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-orders" className="w-full flex items-center gap-2">
                    <FaShoppingBag size={30}
                        color={'${active === 2 ? "crimson" : "#555"}'} />
                    <h5
                        className={`pl-2 text-[18px] font-[400] ${active === 2 ? "text-[crimson]" : "text-[black]"
                            }`}
                    >
                         Orders
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-products" className="w-full flex items-center gap-2">
                    <FaBox size={30}
                        color={'${active === 3 ? "crimson" : "#555"}'} />
                    <h5
                        className={`pl-2 text-[18px] font-[400] ${active === 3 ? "text-[crimson]" : "text-[black]"
                            }`}
                    >
                         Products
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-create-product" className="w-full flex items-center gap-2">
                    <AiOutlineFolderAdd size={30}
                        color={'${active === 4? "crimson" : "#555"}'} />
                    <h5
                        className={`pl-2 text-[18px] font-[400] ${active === 4 ? "text-[crimson]" : "text-[black]"
                            }`}
                    >
                        Create Product
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-events" className="w-full flex items-center gap-2">
                    <FaShoppingCart size={30}
                        color={'${active === 5 ? "crimson" : "#555"}'} />
                    <h5
                        className={`pl-2 text-[18px] font-[400] ${active === 5 ? "text-[crimson]" : "text-[black]"
                            }`}
                    >
                         Sales 
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-create-events" className="w-full flex items-center gap-2">
                    <VscNewFile
                        size={30}
                        color={'${active === 6 ? "crimson" : "#555"}'} />
                    <h5
                        className={`pl-2 text-[18px] font-[400] ${active === 6 ? "text-[crimson]" : "text-[black]"
                            }`}
                    >
                        Payments 
                    </h5>
                </Link>
            </div>

            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-create-events" className="w-full flex items-center gap-2">
                    <CiMoneyBill
                        size={30}
                        color={'${active === 7 ? "crimson" : "#555"}'} />
                    <h5
                        className={`pl-2 text-[18px] font-[400] ${active === 7 ? "text-[crimson]" : "text-[black]"
                            }`}
                    >
                        Withdraw Money
                    </h5>
                </Link>
            </div>


            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-coupons" className="w-full flex items-center gap-2">
                    <AiOutlineGift
                        size={30}
                        color={'${active === 8 ? "crimson" : "#555"}'} />
                    <h5
                        className={`pl-2 text-[18px] font-[400] ${active === 8 ? "text-[crimson]" : "text-[black]"
                            }`}
                    >
                        Discount Codes 
                    </h5>
                </Link>
            </div>


            <div className="w-full flex items-center p-4">
                <Link to="/dashboard-refunds" className="w-full flex items-center gap-2">
                    <HiOutlineReceiptRefund
                        size={30}
                        color={'${active === 9 ? "crimson" : "#555"}'} />
                    <h5
                        className={`pl-2 text-[18px] font-[400] ${active === 9 ? "text-[crimson]" : "text-[black]"
                            }`}
                    >
                        Refunds
                    </h5>
                </Link>
            </div>
        </div>
    );
};

export default DashboardSideBar;