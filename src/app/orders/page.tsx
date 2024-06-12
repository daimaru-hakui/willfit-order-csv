import React from "react";
import OrdersList from "./OrdersList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[900px] mt-6">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bold text-xl">CSVリスト</h2>
        <Button variant="outline" asChild>
          <Link href="/orders/new">新規CSV作成</Link>
        </Button>
      </div>
      <OrdersList />
    </div>
  );
}
