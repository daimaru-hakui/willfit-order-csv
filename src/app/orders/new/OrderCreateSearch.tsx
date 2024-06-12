import { useEffect, useState } from "react";
import OrderCustomerSelect from "./OrderCustomerSelect";
import OrderCustomerTermInput from "./OrderCustomerTermInput";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Customer } from "@/utils/customer.type";
import { useStore } from "@/lib/store";
import CustomerEditModal from "@/app/customers/CustomerEditModal";

type Props = {
  customer?: Customer;
};

export default function OrderCreateSearch({ customer }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const startDate = useStore((state) => state.startDate);
  const setStartDate = useStore((state) => state.setStartDate);
  const endDate = useStore((state) => state.endDate);
  const setEndDate = useStore((state) => state.setEndDate);

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
    };
  }, []);

  return (
    <div className="flex gap-3">
      <OrderCustomerSelect customers={customers} />
      {customer && (
        <CustomerEditModal customer={customer} customerId={customer.id} />
      )}
      <OrderCustomerTermInput date={startDate} setDate={setStartDate} />
      <OrderCustomerTermInput date={endDate} setDate={setEndDate} />
    </div>
  );
}