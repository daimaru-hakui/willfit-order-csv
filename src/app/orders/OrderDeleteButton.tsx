import { db } from "@/lib/firebase/client";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function OrderDeleteButton({ orderId }: { orderId: string }) {
  const handleOrderDelete = async () => {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;
    try {
      const orderDocRef = doc(db, "orders", orderId);
      await deleteDoc(orderDocRef);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  return (
    <RiDeleteBin6Line
      size={24}
      color="red"
      className="cursor-pointer"
      onClick={handleOrderDelete}
    />
  );
}
