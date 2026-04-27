"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = (open: boolean) => {
    setMenuOpen(open);
  };

  if (isHomePage) {
    return null;
  }

  return <Navbar menuOpen={menuOpen} onMenuToggle={handleMenuToggle} />;
}
