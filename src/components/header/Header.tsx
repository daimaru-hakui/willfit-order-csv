import React, { useState } from "react";
import MenuTitle from "./MenuTitle";
import MenuList from "./MenuList";

export default function Header() {
  return (
    <nav className="bg-muted flex justify-between items-center sticky top-0 p-3">
      <header className="flex items-center">
        <MenuTitle />
      </header>
      <div className="hidden md:flex md:justify-between">
        <MenuList />
      </div>
    </nav>
  );
}
