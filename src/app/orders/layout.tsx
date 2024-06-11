import React from "react";

export default function Orderrslayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center w-full">
      {children}
    </div>
  );
}
