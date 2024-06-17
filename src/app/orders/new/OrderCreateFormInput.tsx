import { cn } from "@/lib/utils";
import { Customer } from "@/utils/customer.type";
import { CreateOrder } from "@/utils/order.type";
import React, { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<CreateOrder, any, undefined>;
  customer: Customer;
  product: {
    productCode: string;
    productName: string;
    size: string;
    salePrice: number;
    costPrice: number;
    quantity: number;
  };
  orderDate: string;
  index: number;
  idx: number;
  setIsActive: (value: number | string) => void;
};

export default function OrderCreateFormInput({
  form,
  customer,
  product,
  index,
  idx,
  setIsActive,
}: Props) {
  const ref = useRef<any | null>(null);
  useEffect(() => {
    form.setValue(`terms.${index}.details.${idx}.quantity`, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  return (
    <div key={product.productName}>
      <input
        type="hidden"
        defaultValue={product.productCode}
        {...form.register(`terms.${index}.details.${idx}.productCode`)}
      />
      <input
        type="hidden"
        defaultValue={product.productName}
        {...form.register(`terms.${index}.details.${idx}.productName`)}
      />
      <input
        type="hidden"
        defaultValue={product.size}
        {...form.register(`terms.${index}.details.${idx}.size`)}
      />
      <input
        type="hidden"
        defaultValue={Number(product.salePrice)}
        {...form.register(`terms.${index}.details.${idx}.salePrice`, {
          valueAsNumber: true,
        })}
      />
      <input
        type="hidden"
        defaultValue={Number(product.costPrice)}
        {...form.register(`terms.${index}.details.${idx}.costPrice`, {
          valueAsNumber: true,
        })}
      />

      <input
        id={String(`${index}-${idx}`)}
        type="number"
        defaultValue={0}
        className={cn(
          "w-[75px] h-[30px] mt-2 block p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        )}
        {...form.register(`terms.${index}.details.${idx}.quantity`, {
          valueAsNumber: true,
        })}
        onChange={(e) =>
          form.setValue(
            `terms.${index}.details.${idx}.quantity`,
            +e.target.value
          )
        }
        onFocus={(e) => e.target.select()}
        onMouseEnter={(e) => {
          setIsActive(idx);
        }}
        onMouseLeave={() => {
          setIsActive("");
        }}
      />
    </div>
  );
}
