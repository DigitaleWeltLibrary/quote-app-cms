"use client";

import react, { useState } from "react";
import TogglePage from "../components/TogglePage";

export default function Dashboard() {
  const [data, changepage] = useState(true);

  return (
    <main>
      <TogglePage site={data} change={changepage} />
      <h1>{data ? "Vorhandene Daten:" : "Einstellungen"}</h1>
    </main>
  );
}
