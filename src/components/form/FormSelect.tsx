import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  form: UseFormReturn<any, any, undefined>;
  name: string;
  label: string;
  defaultValue?: any;
};

export default function FormSelect({
  form,
  name,
  label,
  defaultValue = "",
}: Props) {
  const lastDays = ["5", "10", "15", "20", "25", "末"];
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label || name}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={defaultValue}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={defaultValue} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {lastDays.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
