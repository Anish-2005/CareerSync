"use client";

import ThreeScene from "./ThreeScene";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section style={{ display: "flex", gap: 32, alignItems: "center", padding: 40 }}>
      <div style={{ flex: 1, maxWidth: 640 }}>
        <motion.h1 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} style={{ fontSize: 42, lineHeight: 1.05, margin: 0 }}>
          Track your applications, land the role.
        </motion.h1>

        <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }} style={{ color: "#6b7280", marginTop: 16, fontSize: 18 }}>
          CareerSync helps you manage job applications, follow-ups, interviews and offers in one place — with beautiful visualizations and frictionless workflows.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <a href="#demo" style={{ background: "#111827", color: "white", padding: "12px 18px", borderRadius: 8, textDecoration: "none" }}>Try the demo</a>
          <a href="#features" style={{ border: "1px solid #e5e7eb", padding: "12px 18px", borderRadius: 8, textDecoration: "none" }}>Learn more</a>
        </motion.div>
      </div>

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
        <ThreeScene />
      </motion.div>
    </section>
  );
}
