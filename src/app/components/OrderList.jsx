import React from "react";

function OrderList() {
    return (
        <div>
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                    <p className="text-[#1c170d] tracking-light text-[32px] font-bold leading-tight min-w-72">
                        Order
                    </p>
                </div>
                <h3 className="text-[#1c170d] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                    Order Items
                </h3>
                <div className="flex items-center gap-4 bg-[#fcfbf8] px-4 min-h-[72px] py-2 justify-between">
                    <div className="flex flex-col justify-center">
                        <p className="text-[#1c170d] text-base font-medium leading-normal line-clamp-1">
                            Shrimp Fried Rice
                        </p>
                        <p className="text-[#9b844b] text-sm font-normal leading-normal line-clamp-2">
                            1 item
                        </p>
                    </div>
                    <div className="shrink-0">
                        <p className="text-[#1c170d] text-base font-normal leading-normal">
                            ฿ 80
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-[#fcfbf8] px-4 min-h-[72px] py-2 justify-between">
                    <div className="flex flex-col justify-center">
                        <p className="text-[#1c170d] text-base font-medium leading-normal line-clamp-1">
                            Water
                        </p>
                        <p className="text-[#9b844b] text-sm font-normal leading-normal line-clamp-2">
                            1 item
                        </p>
                    </div>
                    <div className="shrink-0">
                        <p className="text-[#1c170d] text-base font-normal leading-normal">
                            ฿ 10
                        </p>
                    </div>
                </div>
                <h3 className="text-[#1c170d] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                    Summary
                </h3>
                <div className="p-4">
                    <div className="flex justify-between gap-x-6 py-2">
                        <p className="text-[#9b844b] text-sm font-normal leading-normal">
                            Total
                        </p>
                        <p className="text-[#1c170d] text-sm font-normal leading-normal text-right">
                            ฿ 90
                        </p>
                    </div>
                    <div className="flex justify-between gap-x-6 py-2">
                        <p className="text-[#9b844b] text-sm font-normal leading-normal">
                            Discount
                        </p>
                        <p className="text-[#1c170d] text-sm font-normal leading-normal text-right">
                            ฿ 0
                        </p>
                    </div>
                    <div className="flex justify-between gap-x-6 py-2">
                        <p className="text-[#9b844b] text-sm font-normal leading-normal">
                            Grand Total
                        </p>
                        <p className="text-[#1c170d] text-sm font-normal leading-normal text-right">
                            ฿ 90
                        </p>
                    </div>
                </div>
                <div className="flex px-4 py-3 justify-end">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#f4c653] text-[#1c170d] text-base font-bold leading-normal tracking-[0.015em]">
                        <span className="truncate">Confirm Order</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderList;
