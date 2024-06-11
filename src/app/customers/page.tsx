import React from "react";
import CustomersList from "./CustomersList";
import { CustomerCreateModal } from "./CustomerCreateModal";

export default function CustomersPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[500px] mt-6">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bold text-xl">顧客登録</h2>
        <CustomerCreateModal />
      </div>
      <CustomersList />
    </div>
  );
}
