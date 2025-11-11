import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DemoDashboard from "../components/DemoDashboard";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "var(--font-geist-sans, Arial)" }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Hero />
        <Features />
        <DemoDashboard />
      </main>
    </div>
  );
}
