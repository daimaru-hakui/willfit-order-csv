"use client";
import { db } from "@/lib/firebase/client";
import { Customer } from "@/utils/customer.type";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import OrderCreateArea from "./OrderCreateArea";
import OrderCreateSearch from "./OrderCreateSearch";

type Props = {
  customerId: string | null;
};

export default function OrderCreateContainer({ customerId }: Props) {
  const [customer, setCustomer] = useState<Customer>();
  const resetDate = useStore((state) => state.resetDate);
  const [terms, setTerms] = useState<string[]>([]);

  useEffect(() => {
    if (!customerId) return;
    const customerRef = doc(db, "customers", customerId);
    onSnapshot(customerRef, {
      next: (snapshot) => {
        setCustomer({ ...snapshot.data(), id: snapshot.id } as Customer);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }, [customerId]);

  const reset = () => {
    resetDate();
  };

  return (
    <section className="w-full mx-auto">
      <div className="flex gap-3 mb-6">
        <OrderCreateSearch customer={customer} />
        <Button onClick={reset}>期間リセット</Button>
      </div>

      {customer && (
        <OrderCreateArea
          customer={customer}
          terms={terms}
          setTerms={setTerms}
        />
      )}
    </section>
  );
}
