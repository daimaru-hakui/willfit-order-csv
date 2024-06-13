import React, { useEffect, useState } from "react";
import OrderCreateForm from "./OrderCreateForm";
import { Customer } from "@/utils/customer.type";
import {
  addDays,
  differenceInCalendarDays,
  format,
  subDays,
} from "date-fns";
import { useStore } from "@/lib/store";

type Props = {
  customer: Customer;
  terms: string[];
  setTerms: any;
};

export default function OrderCreateArea({ customer, terms, setTerms }: Props) {
  const [defaultValues, setDefaultValues] = useState<Customer>();
  const startDate = useStore((state) => state.startDate);
  const endDate = useStore((state) => state.endDate);

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
  }, [startDate, endDate, customer, setTerms]);

  useEffect(() => {
    setDefaultValues(customer);
  }, [customer]);

  if (!defaultValues) return;

  return (
    <div>
      <OrderCreateForm defaultValues={defaultValues} terms={terms} />
    </div>
  );
}
