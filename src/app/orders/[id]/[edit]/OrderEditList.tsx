"use client";
import { Order } from "@/utils/order.type";
import React from "react";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import OrderEditQuantityModal from "./OrderEditQuantityModal";

export default function OrderEditList({ order }: { order: Order; }) {
  return (
    <div className="grid grid-cols-[400px_70px_1fr] px-3 gap-3">
      <div>
        <div className="grid grid-cols-[1fr_70px_70px] h-12 px-2 font-semibold items-center bg-gray-300 rounded-md shadow-md">
          <div>商品名</div>
          {/* <div>サイズ</div> */}
          <div>売価</div>
          <div>原価</div>
        </div>
        {order?.terms.at(0)?.details.map((detail) => (
          <div
            key={detail.productCode}
            className="grid grid-cols-[1fr_70px_70px] h-10 mt-2 px-2 text-sm items-center bg-gray-100 rounded-md shadow-md"
          >
            <div>{detail.productName}</div>
            {/* <div>{detail.size}</div> */}
            <div className="text-right pr-2">{detail.salePrice}円</div>
            <div className="text-right pr-2">{detail.costPrice}円</div>
          </div>
        ))}
      </div>

      <div>
        <div className="grid grid-cols-1 h-12 px-2 items-center font-semibold bg-gray-300 rounded-md shadow-md">
          <div className="text-center">合計</div>
        </div>
        {order?.terms.at(0)?.details.map((detail, index) => (
          <div
            key={detail.productCode}
            className="grid grid-cols-1 h-10 mt-2 px-2 text-sm items-center bg-gray-100 rounded-md shadow-md text-right"
          >
            {order.terms?.reduce((sum: number, term) => (
              sum + (term.details && term.details[index]?.quantity || 0)
            ), 0).toLocaleString()}
          </div>

        ))}
      </div>

      <div className="w-full flex gap-1 pb-3 min-w-[1200px] overflow-auto">
        {order?.terms.map((term, index) => (
          <div key={term.orderDate}>
            <div
              className={cn(
                new Date(term.orderDate).getDay() === 0
                  ? "bg-rose-500"
                  : "bg-gray-500",
                new Date(term.orderDate).getDay() === 6 ? "bg-sky-500" : "",
                "h-[50px] rounded-md text-center text-white",
                "flex flex-col items-center justify-center w-12 h-12 rounded-md p-1"
              )}
            >
              <div className="">{format(new Date(term.orderDate), "d日")}</div>
              <div className="">{format(new Date(term.orderDate), "EEE")}</div>
            </div>
            {term.details?.map((detail, idx) => (
              <div
                key={detail.productCode}
                className="flex justify-center items-center w-12 h-10 mt-2 cursor-pointer"
              >
                <OrderEditQuantityModal
                  quantity={detail.quantity}
                  index={index}
                  idx={idx}
                  order={order}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
