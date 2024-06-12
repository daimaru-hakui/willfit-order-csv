import OrderCreateContainer from "./OrderCreateContainer";

type Props = {
  params: {
    search: string;
  };
  searchParams: { [key: string]: string | string[] | undefined; };
};

export default function OrderCreatePage({ searchParams }: Props) {
  const customer = searchParams.search as string || null;
  return (
    <div className="w-full flex justify-center p-6 overflow-auto">
      <OrderCreateContainer customerId={customer} />
    </div>
  );
}
