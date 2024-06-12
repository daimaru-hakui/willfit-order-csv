import { Form } from "@/components/ui/form";
import React, { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { db } from "@/lib/firebase/client";
import { Order } from "@/utils/order.type";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { FormInput } from "@/components/form/FormInput";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  defaultValues: { quantity: number };
  index: number;
  idx: number;
  order: Order;
  setOpen: (value: SetStateAction<boolean>) => void;
};

export default function OrderEditQuantityForm({
  defaultValues,
  index,
  idx,
  order,
  setOpen,
}: Props) {
  const form = useForm<{ quantity: number }>({
    defaultValues,
  });

  const onSubmit = async (data: { quantity: number }) => {
    const newTerms = handleOrderQuantityChange(data);
    const orderRef = doc(db, "orders", order.id);
    await updateDoc(orderRef, {
      terms: [...newTerms],
      updatedAt: serverTimestamp(),
    });
    setOpen(false);
  };

  const handleOrderQuantityChange = (data: { quantity: number }) => {
    const newTerms = order.terms.map((term, termIndex) => {
      if (termIndex === index) {
        const newDetails = term.details.map((detail, detailIndex) => {
          if (detailIndex === idx) {
            return {
              ...detail,
              quantity: +data.quantity,
            };
          } else {
            return {
              ...detail,
            };
          }
        });
        return { details: newDetails, orderDate: term.orderDate };
      } else {
        return {
          ...term,
        };
      }
    });
    return newTerms;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormInput type="number" name="quantity" label="数量" form={form} />
        </div>
        <DialogFooter>
          <Button type="submit">更新</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
