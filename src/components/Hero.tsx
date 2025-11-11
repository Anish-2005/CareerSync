"use client";

import { motion } from "framer-motion";
import ThreeScene from "./ThreeScene";

export default function Hero() {
  return (
    <section style={{ padding: "48px 16px", display: "flex", gap: 32, alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 640 }}>
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} style={{ fontSize: 42, lineHeight: 1.05, margin: 0 }}>
          Take control of your job search — organized, visual, and fast.
        </motion.h1>

        <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.12 }} style={{ marginTop: 16, fontSize: 16, color: "#374151" }}>
          CareerSync helps you track every application, follow-ups, interviews, and offers — all from a single smart dashboard. Integrates beautiful 3D visuals for a modern touch.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} style={{ marginTop: 22, display: "flex", gap: 12 }}>
          <a href="#demo" style={{ padding: "10px 16px", background: "#111827", color: "#fff", borderRadius: 8, textDecoration: "none" }}>Try demo</a>
          <a href="#features" style={{ padding: "10px 16px", borderRadius: 8, textDecoration: "none", border: "1px solid #e5e7eb" }}>Learn more</a>
        </motion.div>
      </div>

      <div style={{ flex: "0 0 520px", display: "flex", justifyContent: "center" }}>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
          <ThreeScene />
        </motion.div>
      </div>
    </section>
  );
}
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
