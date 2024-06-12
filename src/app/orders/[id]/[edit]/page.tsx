import React from "react";
import OrderEditContainer from "./OrderEditContainer";

type Props = {
  params: {
    id: string;
  };
};

export default function OrderEditPage({ params }: Props) {
  const orderId = params.id;
  return (
    <div className="w-full">
      <OrderEditContainer orderId={orderId} />
    </div>
  );
}
