import { Order } from "@/utils/order.type";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { BsFiletypeCsv } from "react-icons/bs";

type Props = {
  order: Order;
};

export default function OrderCsvButton({ order }: Props) {
  const [headers, setHeader] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  return (
    <CSVLink data={data} headers={headers}>
      <BsFiletypeCsv size={22} className="cursor-pointer" />
    </CSVLink>
  );
}
