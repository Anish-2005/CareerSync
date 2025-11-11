import Navbar from "../components/Navbar";
import Features from "../components/Features";
import ClientOnly from "../components/ClientOnly";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "var(--font-geist-sans, Arial)" }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ClientOnly />
        <Features />
      </main>
    </div>
  );
}
