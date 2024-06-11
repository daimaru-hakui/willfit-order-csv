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
import { Customer } from "@/utils/customer.type";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomerEditModal from "./CustomerEditModal";

export default function CustomersList() {
  const [customers, setCustomers] = useState<Customer[]>();

  useEffect(() => {
    const customerCol = collection(db, "customers");
    const q = query(customerCol, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, {
      next: (snapshot) => {
        setCustomers(
          snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Customer)
          )
        );
      },
      error: (e) => {
        console.log(e.message);
      },
    });
    return () => unsub();
  }, []);

  if (!customers) {
    return <div></div>;
  }

  return (
    <Table className="mt-3">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">顧客コード</TableHead>
          <TableHead className="w-[250px]">顧客名</TableHead>
          <TableHead className="w-[100px]">期間</TableHead>
          <TableHead className="w-[100px]">actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.createdAt}>
            <TableCell className="font-medium">
              {customer.customerCode}
            </TableCell>
            <TableCell className="font-medium">
              {customer.customerName}
            </TableCell>
            <TableCell className="font-medium"></TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-3">
                <CustomerEditModal
                  customer={customer}
                  customerId={customer.id}
                />
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
