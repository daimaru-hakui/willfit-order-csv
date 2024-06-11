"use client";
import React from "react";
import MenuItem from "./MenuItem";

export default function MenuList({
  setOpen,
}: {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <ul className="grow flex gap-3" onClick={() => setOpen && setOpen(false)}>
        <MenuItem href="/customers">顧客一覧</MenuItem>
        <MenuItem href="/orders">CSV一覧</MenuItem>
      </ul>
    </>
  );
}
