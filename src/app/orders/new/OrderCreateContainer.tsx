"use client";
import { db } from "@/lib/firebase/client";
import { Customer } from "@/utils/customer.type";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import OrderCreateArea from "./OrderCreateArea";
import OrderCreateSearch from "./OrderCreateSearch";

type Props = {
  customerId: string | null;
};

export default function OrderCreateContainer({ customerId }: Props) {
  const [customer, setCustomer] = useState<Customer>();
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
      },
    });
  }, [customerId]);

  return (
    <section className="w-full mx-auto flex flex-col gap-6">
      <OrderCreateSearch customer={customer} />

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
