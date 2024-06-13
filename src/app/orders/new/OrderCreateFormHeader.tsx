import { Customer } from "@/utils/customer.type";
import { CreateOrder } from "@/utils/order.type";
import { UseFormReturn } from "react-hook-form";

type Props = {
  defaultValues: Customer;
  form: UseFormReturn<CreateOrder, any, undefined>;
};
export default function OrderCreateFormHeader({ defaultValues, form }: Props) {
  return (
    <>
      <div className="w-full max-w-[500px] mt-1">
        <div className="grid grid-cols-[1fr_100px_70px_70px] items-center h-[50px] px-2 bg-gray-300 rounded-md shadow-md">
          <div className="text-left font-semibold min-w-[120px]">
            商品名
          </div>
          <div className="text-left font-semibold">サイズ</div>
          <div className="text-left font-semibold">売価</div>
          <div className="text-left font-semibold">原価</div>
        </div>
        {defaultValues?.products?.map((d) => (
          <div
            key={d.productName}
            className="grid grid-cols-[1fr_100px_70px_70px] items-center h-[40px] mt-2 px-2 bg-gray-100 rounded-md shadow-md"
          >
            <div className="min-w-[120px]">{d.productName}</div>
            <div className="px-1">{d.size}</div>
            <div className="px-1 text-right">
              {d.salePrice.toLocaleString()}円
            </div>
            <div className="px-1 text-right">
              {d.costPrice.toLocaleString()}円
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-[70px] mt-1">
        <div className="grid grid-cols-1 items-center h-[50px] px-2 bg-gray-300 rounded-md shadow-md">
          <div className="text-center font-semibold">合計</div>
        </div>
        {defaultValues?.products?.map((d, index) => (
          <div
            key={d.productName}
            className="grid grid-cols-1 items-center h-[40px] mt-2 px-2 bg-gray-100 rounded-md shadow-md"
          >
            <div className="text-right px-2">
              {form.watch('terms')?.reduce((sum: number, term) => (
                sum + (term.details && term.details[index]?.quantity || 0)
              ), 0)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}