"use client";

import { CheckCircle, Calendar, List } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { title: "Unified Pipeline", desc: "See all applications and statuses in one timeline.", icon: List },
  { title: "Automated Reminders", desc: "Never miss a follow-up or interview prep.", icon: Calendar },
  { title: "Insights & Reports", desc: "Analytics to discover what works and where to improve.", icon: CheckCircle },
];

export default function Features() {
  return (
    <section id="features" style={{ padding: "40px 24px" }}>
      <h2 style={{ fontSize: 28, marginBottom: 18 }}>Powerful features for job seekers</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div key={f.title} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }} style={{ padding: 18, borderRadius: 12, border: "1px solid #eee" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Icon size={24} />
                <div>
                  <div style={{ fontWeight: 700 }}>{f.title}</div>
                  <div style={{ color: "#6b7280" }}>{f.desc}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
