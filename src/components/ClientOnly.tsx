"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically load heavy client components only on the client
const Hero = dynamic(() => import("./Hero"), { ssr: false });
const DemoDashboard = dynamic(() => import("./DemoDashboard"), { ssr: false });

export default function ClientOnly() {
  return (
    <>
      <Hero />
      <DemoDashboard />
    </>
  );
}
