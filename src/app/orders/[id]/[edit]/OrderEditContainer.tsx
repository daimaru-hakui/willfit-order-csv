"use client";
import React, { useEffect, useState } from "react";
import OrderEditList from "./OrderEditList";
import { Order } from "@/utils/order.type";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import Loading from "@/app/customers/loading";
import OrderEditHeader from "./OrderEditHeader";

export default function OrderEditContainer({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const orderRef = doc(db, "orders", orderId);
    onSnapshot(orderRef, {
      next: (snapshot) => {
        setOrder({ ...snapshot.data(), id: snapshot.id } as Order);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }, [orderId]);

  if (!order) {
    return <Loading />;
  }

  return (
    <div className="space-y-4">
      <OrderEditHeader order={order} />
      <OrderEditList order={order} />
    </div>
  );
}
