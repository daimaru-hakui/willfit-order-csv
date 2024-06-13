"use client";
import React from "react";
import MenuTitle from "./MenuTitle";
import MenuList from "./MenuList";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      if (pathname === "/auth/login") {
        router.push("/orders");
        return;
      }
      console.log("ログイン");
    } else {
      console.log("未ログイン");
      router.push("/auth/login");
    }
  });

  if (pathname === "/auth/login") return <div></div>;

  return (
    <nav className="bg-muted flex justify-between items-center sticky top-0 p-3 shadow-md">
      <header className="flex items-center">
        <MenuTitle />
      </header>
      <div className="flex md:justify-between">
        <MenuList />
      </div>
    </nav>
  );
}
