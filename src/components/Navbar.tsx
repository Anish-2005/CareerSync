"use client";

import Link from "next/link";
import { Briefcase, Grid, LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <header style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link href="/" style={{ display: "flex", gap: 10, alignItems: "center", textDecoration: "none", color: "inherit" }}>
        <Briefcase size={28} />
        <span style={{ fontWeight: 700, fontSize: 18 }}>CareerSync</span>
      </Link>

      <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Link href="#features" style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none" }}>
          <Grid size={16} /> Features
        </Link>
        <Link href="#demo" style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link href="#" style={{ display: "flex", gap: 8, alignItems: "center", textDecoration: "none", border: "1px solid #ddd", padding: "8px 12px", borderRadius: 8 }}>
          <LogIn size={16} /> Sign in
        </Link>
      </nav>
    </header>
  );
}
