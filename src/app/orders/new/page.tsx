import OrderCreateContainer from "./OrderCreateContainer";
import OrderCreateForm from "./OrderCreateForm";
import { useSearchParams } from "next/navigation";

type Props = {
  params: {
    search: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function OrderCreatePage({ searchParams }:Props) {
  console.log(searchParams);
  return (
    <div className="w-full flex justify-center p-6 overflow-auto">
      <OrderCreateContainer />
    </div>
  );
}
