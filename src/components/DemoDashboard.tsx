"use client";

import { motion } from "framer-motion";

const sample = {
  columns: [
    { id: "applied", title: "Applied", items: ["Frontend Engineer — Acme", "Data Analyst — Beta"] },
    { id: "interview", title: "Interview", items: ["Backend Engineer — Gamma"] },
    { id: "offer", title: "Offer", items: ["DevOps — Delta"] },
  ],
};

export default function DemoDashboard() {
  return (
    <section id="demo" style={{ padding: "36px 16px", maxWidth: 1200, margin: "0 auto" }}>
      <h3 style={{ fontSize: 20 }}>Live demo — sample pipeline</h3>

      <div style={{ display: "flex", gap: 12, marginTop: 18, alignItems: "flex-start" }}>
        {sample.columns.map((col) => (
          <div key={col.id} style={{ width: 320, background: "#fff", border: "1px solid #e6eef6", borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>{col.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {col.items.map((it) => (
                <motion.div key={it} whileHover={{ scale: 1.02 }} style={{ background: "#f8fafc", padding: 12, borderRadius: 8 }}>
                  <div style={{ fontWeight: 600 }}>{it}</div>
                  <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>Company: example • Last action: 3 days ago</div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";

const sampleApplications = [
  { id: 1, company: "Acme Corp", role: "Frontend Engineer", status: "Applied" },
  { id: 2, company: "Bright Labs", role: "Product Designer", status: "Interview" },
  { id: 3, company: "Orbit Systems", role: "Backend Engineer", status: "Offer" },
  { id: 4, company: "NeonTech", role: "Data Scientist", status: "Applied" },
];

function Card({ app }: { app: any }) {
  return (
    <motion.div whileHover={{ y: -6 }} style={{ padding: 12, borderRadius: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", background: "white", border: "1px solid #eee", marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ fontWeight: 700 }}>{app.company}</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>{app.status}</div>
      </div>
      <div style={{ color: "#374151" }}>{app.role}</div>
    </motion.div>
  );
}

export default function DemoDashboard() {
  return (
    <section id="demo" style={{ padding: "24px", background: "#f9fafb", borderRadius: 12, margin: 24 }}>
      <h3 style={{ marginTop: 0 }}>Demo Dashboard</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div>
          <h4>Applied</h4>
          {sampleApplications.filter((a) => a.status === "Applied").map((a) => <Card key={a.id} app={a} />)}
        </div>

        <div>
          <h4>Interview</h4>
          {sampleApplications.filter((a) => a.status === "Interview").map((a) => <Card key={a.id} app={a} />)}
        </div>

        <div>
          <h4>Offer</h4>
          {sampleApplications.filter((a) => a.status === "Offer").map((a) => <Card key={a.id} app={a} />)}
        </div>
      </div>
    </section>
  );
}
