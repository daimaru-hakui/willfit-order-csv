"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import OrderCreateFormInput from "./OrderCreateFormInput";
import { useStore } from "@/lib/store";
import { CreateOrder, CreateOrderSchema } from "@/utils/order.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Customer } from "@/utils/customer.type";

type Props = {
  terms: string[];
  defaultValues: Customer;
};

export default function OrderCreateForm({ terms, defaultValues }: Props) {
  const startDate = useStore((state) => state.startDate);
  const endDate = useStore((state) => state.endDate);
  const form = useForm<CreateOrder>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      customerCode: defaultValues.customerCode,
      customerName: defaultValues.customerName,
    },
    values: {
      customerCode: defaultValues.customerCode,
      customerName: defaultValues.customerName,
      terms: [],
    },
  });

  const onSubmit = async (data: CreateOrder) => {
    console.log(data);
    await handleCreateOrder(data);
  };

  const errorInvalid = (e: any) => {
    console.log("error", e);
  };

  const handleCreateOrder = async (data: CreateOrder) => {
    console.log(data);
    const result = confirm("登録して宜しいでしょうか");
    if (!result) return;
    const ordersRef = collection(db, "orders");
    await addDoc(ordersRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
  };

  const reset = () => {
    form.reset();
  };

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, defaultValues]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, errorInvalid)}
          className="w-full"
        >
          <input type="hidden" {...form.register(`customerCode`)} />
          <input type="hidden" {...form.register(`customerName`)} />
          <div className="flex">
            <div className="w-full max-w-[500px] mt-1">
              <div className="grid grid-cols-[1fr_100px_70px_70px_70px] items-center h-[50px] px-2 bg-gray-100 rounded-md shadow-sm">
                <div className="text-left font-semibold min-w-[120px]">
                  商品名
                </div>
                <div className="text-left font-semibold">サイズ</div>
                <div className="text-left font-semibold">売価</div>
                <div className="text-left font-semibold">原価</div>
                <div className="text-left font-semibold">合計</div>
              </div>
              {defaultValues?.products?.map((d,index) => (
                <div
                  key={d.productName}
                  className="grid grid-cols-[1fr_100px_70px_70px_70px] items-center h-[40px] mt-2 px-2 bg-gray-100 rounded-md"
                >
                  <div className="min-w-[120px]">{d.productName}</div>
                  <div className="px-1">{d.size}</div>
                  <div className="px-1 text-right">
                    {d.salePrice.toLocaleString()}円
                  </div>
                  <div className="px-1 text-right">
                    {d.costPrice.toLocaleString()}円
                  </div>
                  {/* <div>{form.watch({`terms.${}`})}</div> */}
                </div>
              ))}
            </div>

            <div className="overflow-auto mx-2 p-1 pb-3">
              <div className="flex">
                {terms?.map((day, index) => (
                  <div key={day} className="px-[1px]">
                    <input
                      type="hidden"
                      defaultValue={day}
                      {...form.register(`terms.${index}.orderDate`)}
                    />
                    <div
                      className={cn(
                        new Date(day).getDay() === 0
                          ? "bg-rose-500"
                          : "bg-gray-500",
                        new Date(day).getDay() === 6 ? "bg-sky-500" : "",
                        "h-[50px] rounded-md text-center text-white"
                      )}
                    >
                      <div>{format(new Date(day), "d日")}</div>
                      <div>{format(new Date(day), "EEE")}</div>
                    </div>
                    {defaultValues?.products.map((product, idx) => (
                      <OrderCreateFormInput
                        customer={defaultValues}
                        key={product.productName}
                        form={form}
                        product={product}
                        orderDate={day}
                        index={index}
                        idx={idx}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center gap-3 mt-4">
            <Button type="button" variant="outline" onClick={reset}>
              数量リセット
            </Button>
            <Button type="submit">登録</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
