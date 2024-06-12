import { Order } from "@/utils/order.type";
import React from "react";

export default function OrderEditHeader({ order }: { order: Order }) {
  return (
    <div className="mt-6 px-3 flex gap-6">
      <div>
        <div className="font-semibold text-sm">得意先コード</div>
        <div>{order.customerCode}</div>
      </div>
      <div>
        <div className="font-semibold text-sm">得意先名</div>
        <div>{order.customerName}</div>
      </div>
      <div>
        <div className="font-semibold text-sm">期間</div>
        <div>
          {order.terms.at(0)?.orderDate} ~ {order.terms.at(-1)?.orderDate}
        </div>
      </div>
    </div>
  );
}
