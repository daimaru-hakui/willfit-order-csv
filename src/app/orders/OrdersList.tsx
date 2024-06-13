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
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import CsvDownloadModal from "./CsvDownloadModal";
import OrderDeleteButton from "./OrderDeleteButton";
import { format, setMonth } from "date-fns";
import Loading from "../customers/loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    const baseDate = setMonth(new Date(), 4);
    console.log(baseDate);
    const customerCol = collection(db, "orders");
    const q = query(
      customerCol,
      orderBy("createdAt", "desc"),
      where("createdAt", ">", baseDate)
    );
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
    return <Loading />;
  }

  if (orders.length === 0)
    return <div className="mt-12">現在、登録されているCSVはありません。</div>;

  return (
    <Table className="mt-3 w-[1200px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">顧客コード</TableHead>
          <TableHead className="w-[200px]">顧客名</TableHead>
          <TableHead className="w-[300px]">期間</TableHead>
          <TableHead className="w-[300px]">作成日</TableHead>
          <TableHead className="w-[300px]">更新日</TableHead>
          <TableHead className="w-[100px]">actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.customerCode}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>
              {order.terms.at(0)?.orderDate} ~ {order.terms.at(-1)?.orderDate}
            </TableCell>
            <TableCell>
              {format(
                new Date(order.createdAt?.toDate()),
                "yyyy年MM月dd日 HH時mm分"
              )}
            </TableCell>
            <TableCell>
              {order.updatedAt &&
                format(
                  new Date(order.updatedAt?.toDate()),
                  "yyyy年MM月dd日 HH時mm分"
                )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-3">
                <CsvDownloadModal order={order} />
                <Button variant="outline" asChild>
                  <Link href={`/orders/${order.id}/edit`}>詳細</Link>
                </Button>
                <OrderDeleteButton orderId={order.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
