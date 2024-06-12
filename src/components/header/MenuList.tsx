"use client";
import React from "react";
import MenuItem from "./MenuItem";
import { Button } from "../ui/button";
import { auth } from "@/lib/firebase/client";

export default function MenuList({
  setOpen,
}: {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <ul className="grow flex items-center gap-3" onClick={() => setOpen && setOpen(false)}>
        <MenuItem href="/customers">顧客一覧</MenuItem>
        <MenuItem href="/orders">CSV一覧</MenuItem>
        {auth.currentUser && (
          <Button variant="outline" onClick={() => auth.signOut()}>
            ログアウト
          </Button>
        )}
      </ul>
    </>
  );
}
