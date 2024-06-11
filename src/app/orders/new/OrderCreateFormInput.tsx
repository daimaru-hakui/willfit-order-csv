import { CreateOrder } from "@/utils/order.type";
import React, { useEffect, useRef } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<CreateOrder, any, undefined>;
  product: {
    productCode: string;
    productName: string;
    size: string;
    price: number;
    quantity: number;
  };
  orderDate: string;
  index: number;
  idx: number;
};

export default function OrderCreateFormInput({
  form,
  product,
  orderDate,
  index,
  idx,
}: Props) {
  const ref = useRef<HTMLInputElement | null>(null);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    ref?.current?.select();
  };

  useEffect(() => {
    form.setValue(`terms.${index}.details.${idx}.quantity`, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        defaultValue={Number(product.price)}
        {...form.register(`terms.${index}.details.${idx}.price`, {
          valueAsNumber: true,
        })}
      />

      <input
        type="number"
        defaultValue={product.quantity}
        className="w-[75px] h-[40px] mt-2 block p-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        {...form.register(`terms.${index}.details.${idx}.quantity`, {
          valueAsNumber: true,
        })}
        ref={ref}
        onChange={(e) =>
          form.setValue(
            `terms.${index}.details.${idx}.quantity`,
            +e.target.value
          )
        }
        onFocus={handleFocus}
      />
    </div>
  );
}
