"use client";
import { db } from "@/lib/firebase/client";
import { Customer, CustomerWithQuantity } from "@/utils/customer.type";
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

type Product = {
  productName: string;
  productCode: string;
  size: string;
  price: number;
  quantity: number;
};

export default function OrderCreateContainer() {
  const [customer, setCustomer] = useState<CustomerWithQuantity>();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const customerId = useStore((state) => state.customerId);

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
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!customerId) return;
    const customerDoc = doc(db, "customers", customerId);
    const unsub = onSnapshot(customerDoc, {
      next: (snapshot) => {
        const products = snapshot
          .data()
          ?.products.map((product: Product) => ({ ...product, quantity: 0 }));
        setCustomer({
          id: snapshot.id,
          ...snapshot.data(),
          products,
        } as CustomerWithQuantity);
      },
    });
    return () => unsub();
  }, [customerId]);

  useEffect(() => {
    if (!customer) return;
    let weeks = [];
    const term = differenceInCalendarDays(
      new Date(endDate),
      new Date(startDate)
    );
    for (let i = 1; i <= term + 1; i++) {
      const day = addDays(new Date(subDays(startDate, 1)), i);
      weeks.push(format(new Date(day), "yyyy-MM-dd"));
    }
    const newWeeks = weeks.filter((week) => {
      const day = new Date(week).getDay();
      const result = customer?.excludedDays.includes(day);
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
          <CustomerEditModal customer={customer} customerId={customerId} />
        )}
        <OrderCustomerTermInput date={startDate} setDate={setStartDate} />
        <OrderCustomerTermInput date={endDate} setDate={setEndDate} />
        <Button onClick={reset}>期間リセット</Button>
      </div>
      <OrderCreateForm customer={customer} terms={terms} />
    </div>
  );
}
