"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/firebase/client";
import { Order } from "@/utils/order.type";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFiletypeCsv } from "react-icons/bs";


export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    const customerCol = collection(db, "orders");
    const q = query(customerCol, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, {
      next: (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order))
        );
      },
      error: (e) => {
        console.log(e.message);
      },
    });
    return () => unsub();
  }, []);

  if (!orders) {
    return <div></div>;
  }

  return (
    <Table className="mt-3">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">顧客コード</TableHead>
          <TableHead className="w-[250px]">顧客名</TableHead>
          <TableHead className="w-[400px]">期間</TableHead>
          <TableHead className="w-[100px]">actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.customerCode}</TableCell>
            <TableCell className="font-medium">{order.customerName}</TableCell>
            <TableCell className="font-medium">
              {order.terms.at(0)?.orderDate} ~ {order.terms.at(-1)?.orderDate}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-3">
                <BsFiletypeCsv size={22} className="cursor-pointer" />
                <RiDeleteBin6Line
                  size={24}
                  color="red"
                  className="cursor-pointer"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
