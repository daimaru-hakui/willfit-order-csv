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

export default function OrderCreateContainer() {
  const [customer, setCustomer] = useState<Customer>();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const customerId = useStore((state) => state.customerId);
  const setCustomerId = useStore((state) => state.setCustomerId);

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
    const findCustomer = customers.find(customer => customer.id === customerId);
    setCustomer({ ...findCustomer, id: customerId } as Customer);
  }, [customerId, customers]);

  useEffect(() => {
    if (!customer) return;
    let terms = [];
    const differences = differenceInCalendarDays(
      new Date(endDate),
      new Date(startDate)
    );
    for (let i = 1; i <= differences + 1; i++) {
      const day = addDays(new Date(subDays(startDate, 1)), i);
      terms.push(format(new Date(day), "yyyy-MM-dd"));
    }
    const newWeeks = terms.filter((term) => {
      const day = new Date(term).getDay();
      const result = customer?.excludedDays?.includes(day);
      return result;
    });
    setTerms(newWeeks);
  }, [startDate, endDate, customerId, customer]);

  const reset = () => {
    resetDate();
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex gap-3 mb-6">
        <OrderCustomerSelect customers={customers} />
        {customer && (
          <CustomerEditModal
            key={customer.id}
            customer={customer}
            customerId={customerId}
          />
        )}
        <OrderCustomerTermInput date={startDate} setDate={setStartDate} />
        <OrderCustomerTermInput date={endDate} setDate={setEndDate} />
        <Button onClick={reset}>期間リセット</Button>
      </div>
      <OrderCreateForm customer={customer} terms={terms} />
    </div>
  );
}
