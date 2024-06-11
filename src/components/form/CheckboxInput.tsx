"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { CustomerCreate } from "@/utils/customer.type";

type Props = {
  form: UseFormReturn<CustomerCreate>;
  defaultValue?: number[];
};

export default function CheckboxInput({ form, defaultValue }: Props) {
  const [array, setArray] = useState<number[]>(
    defaultValue || [0, 1, 2, 3, 4, 5, 6]
  );

  useEffect(() => {
    form.setValue("excludedDays", [...array]);
    console.log(array)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array]);

  const handleChecked = (e: React.FormEvent<HTMLButtonElement>) => {};
  const dayOfWeeks = [
    {
      label: "日",
      value: 0,
    },
    {
      label: "月",
      value: 1,
    },
    {
      label: "火",
      value: 2,
    },
    {
      label: "水",
      value: 3,
    },
    {
      label: "木",
      value: 4,
    },
    {
      label: "金",
      value: 5,
    },
    {
      label: "土",
      value: 6,
    },
  ];
  return (
    <div>
      <div className="font-semibold text-base">曜日</div>
      <div className="items-top flex space-x-2 mt-2">
        <input type="hidden" {...form.register("excludedDays")} />
        {dayOfWeeks.map((week) => (
          <React.Fragment key={week.value}>
            <Checkbox
              id={week.label}
              checked={array?.includes(week.value)}
              value={week.value}
              onCheckedChange={(checked) => {
                return checked
                  ? setArray([...array, week.value])
                  : setArray(array?.filter((value) => value !== week.value));
              }}
              onChange={(e) => handleChecked(e)}
            />
            <label
              htmlFor={week.label}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {week.label}
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
