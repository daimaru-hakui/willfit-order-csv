import React from "react";

export default function Customerslayout({
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
