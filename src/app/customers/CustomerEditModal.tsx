"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Customer } from "@/utils/customer.type";
import React, { useEffect, useState } from "react";
import CustomerEditForm from "./CustomerEditForm";


type Props = {
  customer: Customer;
  customerId: string;
};

export default function CustomerEditModal({ customer }: Props) {
  const [open, setOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState(customer);
;

  useEffect(() => {
    setDefaultValues(customer);
  }, [customer]);

  const handleOpenChange = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">編集</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>顧客編集</DialogTitle>
        </DialogHeader>
        <CustomerEditForm
          customer={customer}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
