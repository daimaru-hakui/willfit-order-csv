"use client";
import {
  Customer,
  CustomerEdit,
  CustomerEditSchema,
} from "@/utils/customer.type";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { SubmitRhkButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";
import FormSelect from "@/components/form/FormSelect";

type Props = {
  customer: Customer;
  defaultValues: Customer;
};

export default function CustomerEditForm({ customer, defaultValues }: Props) {
  const [loading, setLoading] = useState(false);
  const form = useForm<CustomerEdit>({
    resolver: zodResolver(CustomerEditSchema),
    defaultValues,
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
      salePrice: 0,
      costPrice: 0,
      quantity: 0,
    });
  };

  const deleteProduct = (idx: number) => {
    remove(idx);
  };

  const onSubmit = async (data: CustomerEdit) => {
    await updateCustomer(data);
  };

  const updateCustomer = async (data: CustomerEdit) => {
    setLoading(true);
    const customerDoc = doc(db, "customers", customer.id);
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
      // setOpen((prev) => !prev);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <FormInput
              form={form}
              name="customerCode"
              type="text"
              label="顧客コード"
            />
            <FormInput
              form={form}
              name="customerName"
              type="text"
              label="顧客名"
            />
            <FormSelect
              form={form}
              name="closingDate"
              label="締め日"
              defaultValue={customer.closingDate}
            />
            <CheckboxInput form={form} defaultValue={customer?.excludedDays} />
          </div>
          <div className="flex flex-col gap-3 mt-3">
            {fields.map((item, idx) => (
              <div key={item.id} className="flex gap-3 items-end">
                <div>
                  <Input
                    type="hidden"
                    defaultValue={0}
                    {...form.register(`products.${idx}.quantity`, {
                      valueAsNumber: true,
                    })}
                  />
                  {idx === 0 && <Label className="pb-3 block">品番</Label>}
                  <Input
                    type="text"
                    className="w-[100px]"
                    maxLength={8}
                    autoComplete="off"
                    {...form.register(`products.${idx}.productCode`)}
                  />
                </div>
                <div>
                  {idx === 0 && <Label className="pb-3 block">商品名</Label>}
                  <Input
                    type="text"
                    autoComplete="off"
                    {...form.register(`products.${idx}.productName`)}
                  />
                </div>
                {/* <div> */}
                {/* {idx === 0 && <Label className="pb-3 block">サイズ</Label>} */}
                <Input
                  type="hidden"
                  {...form.register(`products.${idx}.size`)}
                />
                {/* </div> */}
                <div>
                  {idx === 0 && <Label className="pb-3 block">売価</Label>}
                  <Input
                    className="w-[90px]"
                    type="number"
                    {...form.register(`products.${idx}.salePrice`)}
                  />
                </div>
                <div>
                  {idx === 0 && <Label className="pb-3 block">原価</Label>}
                  <Input
                    className="w-[90px]"
                    type="number"
                    {...form.register(`products.${idx}.costPrice`)}
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
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              閉じる
            </Button>
          </DialogClose>
          <SubmitRhkButton
            text="更新"
            isPending={loading}
            className="w-[100px]"
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
