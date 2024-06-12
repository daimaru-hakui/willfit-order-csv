"use client";
import { db } from "@/lib/firebase/client";
import { Customer } from "@/utils/customer.type";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import OrderCreateForm from "./OrderCreateForm";
import OrderCustomerSelect from "./OrderCustomerSelect";
import { useStore } from "@/lib/store";
import OrderCustomerTermInput from "./OrderCustomerTermInput";
import { addDays, differenceInCalendarDays, format, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import CustomerEditModal from "@/app/customers/CustomerEditModal";
import OrderCreateArea from "./OrderCreateArea";
import { useRouter } from "next/navigation";

export default function OrderCreateContainer() {
  const [customer, setCustomer] = useState<Customer>();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const customerId = useStore((state) => state.customerId);
  const setCustomerId = useStore((state) => state.setCustomerId);
  const router = useRouter()

  const startDate = useStore((state) => state.startDate);
  const setStartDate = useStore((state) => state.setStartDate);
  const endDate = useStore((state) => state.endDate);
  const setEndDate = useStore((state) => state.setEndDate);
  const resetDate = useStore((state) => state.resetDate);
  const [terms, setTerms] = useState<string[]>([]);

  useEffect(() => {
    const customerColl = collection(db, "customers");
    const q = query(customerColl, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, {
      next: (snapshot) => {
        setCustomers(
          snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Customer)
          )
        );
      },
      error: (e) => {
        console.log(e);
      },
    });
    return () => {
      unsub();
      setCustomerId("");
    };
  }, [setCustomerId]);

  useEffect(() => {
    if (!customerId) return;
    const findCustomer = customers.find(
      (customer) => customer.id === customerId
    );
    setCustomer({ ...findCustomer, id: customerId } as Customer);
  }, [customerId, customers]);

  const reset = () => {
    resetDate();
  };


  return (
    <div className="w-full mx-auto">
      <div className="flex gap-3 mb-6">
        <OrderCustomerSelect customers={customers} />
        <OrderCustomerTermInput date={startDate} setDate={setStartDate} />
        <OrderCustomerTermInput date={endDate} setDate={setEndDate} />
        <Button onClick={reset}>期間リセット</Button>
      </div>
      {customer && (
        <OrderCreateArea
          customer={customer}
          terms={terms}
          setTerms={setTerms}
        />
      )}
    </div>
  );
}
