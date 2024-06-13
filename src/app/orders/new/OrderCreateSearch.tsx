import { useCallback, useEffect, useState } from "react";
import OrderCustomerSelect from "./OrderCustomerSelect";
import OrderCustomerTermInput from "./OrderCustomerTermInput";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Customer } from "@/utils/customer.type";
import { useStore } from "@/lib/store";
import CustomerEditModal from "@/app/customers/CustomerEditModal";
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from "date-fns";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    initTerm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer, setStartDate, setEndDate]);

  const initTerm = useCallback(() => {
    if (!customer) return;
    const targetDay = customer?.closingDate;
    const thisDate = new Date();

    const closingDate =
      targetDay === "末"
        ? endOfMonth(new Date())
        : new Date(format(new Date(), `yyyy-MM-${targetDay}`));

    const endDateData =
      thisDate < closingDate ? closingDate : addMonths(closingDate, 1);

    setEndDate(new Date(endDateData));

    const startDateDate =
      targetDay === "末"
        ? startOfMonth(closingDate)
        : addDays(subMonths(endDateData, 1), 1);

    setStartDate(startDateDate);
  }, [customer, setStartDate, setEndDate]);

  return (
    <div className="flex items-center gap-3">
      <OrderCustomerSelect customers={customers} />
      {customer && (
        <CustomerEditModal customer={customer} customerId={customer.id} />
      )}
      <OrderCustomerTermInput date={startDate} setDate={setStartDate} /> ~
      <OrderCustomerTermInput date={endDate} setDate={setEndDate} />
      <Button onClick={initTerm}>期間リセット</Button>
    </div>
  );
}
