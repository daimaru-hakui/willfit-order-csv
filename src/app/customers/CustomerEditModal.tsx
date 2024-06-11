"use client";
import { SubmitRhkButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase/client";
import {
  Customer,
  CustomerEdit,
  CustomerEditSchema,
  CustomerWithQuantity,
} from "@/utils/customer.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

type Props = {
  customer: Customer | CustomerWithQuantity;
  customerId: string;
};

export default function CustomerEditModal({ customer, customerId }: Props) {
  const [loading, setLoading] = useState(false);
  const form = useForm<CustomerEdit>({
    resolver: zodResolver(CustomerEditSchema),
    defaultValues: customer,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const addProduct = () => {
    append({
      productCode: "",
      productName: "",
      size: "",
      price: 0,
    });
  };

  const deleteProduct = (idx: number) => {
    remove(idx);
  };

  const updateCustomer = async (data: CustomerEdit) => {
    setLoading(true);
    const customerDoc = doc(db, "customers", customerId);
    try {
      await updateDoc(customerDoc, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      console.log("成功");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CustomerEdit) => {
    await updateCustomer(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">編集</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>顧客編集</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormInput
                  control={form.control}
                  name="customerCode"
                  type="text"
                  label="顧客コード"
                />
                <FormInput
                  control={form.control}
                  name="customerName"
                  type="text"
                  label="顧客名"
                />
                <CheckboxInput
                  form={form}
                  defaultValue={customer.excludedDays}
                />
              </div>
              <div className="flex flex-col gap-3 mt-3">
                {fields.map((item, idx) => (
                  <div key={item.id} className="flex gap-3 items-end">
                    <div>
                      {idx === 0 && (
                        <Label className="pb-3 block">品番</Label>
                      )}
                      <Input
                        type="text"
                        autoComplete="off"
                        {...form.register(`products.${idx}.productCode`)}
                      />
                    </div>
                    <div>
                      {idx === 0 && (
                        <Label className="pb-3 block">商品名</Label>
                      )}
                      <Input
                        type="text"
                        autoComplete="off"
                        {...form.register(`products.${idx}.productName`)}
                      />
                    </div>
                    <div>
                      {idx === 0 && (
                        <Label className="pb-3 block">サイズ</Label>
                      )}
                      <Input
                        type="text"
                        {...form.register(`products.${idx}.size`)}
                      />
                    </div>
                    <div>
                      {idx === 0 && <Label className="pb-3 block">価格</Label>}
                      <Input
                        type="number"
                        {...form.register(`products.${idx}.price`)}
                      />
                    </div>
                    <RiDeleteBinLine
                      size={32}
                      className="mb-1 cursor-pointer"
                      onClick={() => deleteProduct(idx)}
                    />
                  </div>
                ))}
              </div>
              <Button type="button" size="default" onClick={() => addProduct()}>
                <FiPlus />
                <div>商品追加</div>
              </Button>
            </div>
            <div className="text-right">
              <SubmitRhkButton text="更新" isPending={loading} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
