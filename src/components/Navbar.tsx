"use client";

import Link from "next/link";
import { Menu, User, LogIn, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={26} />
            <Link href="/" style={{ fontWeight: 700, fontSize: 18, textDecoration: "none", color: "inherit" }}>CareerSync</Link>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="#features" style={{ textDecoration: "none", color: "inherit" }}>Features</Link>
          <Link href="#demo" style={{ textDecoration: "none", color: "inherit" }}>Demo</Link>
          <Link href="/login" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "#0f172a", color: "#fff", textDecoration: "none" }}>
            <LogIn size={16} /> Sign in
          </Link>
          <div style={{ display: "none" }}>
            <Menu />
          </div>
        </div>
      </nav>
    </header>
  );
}