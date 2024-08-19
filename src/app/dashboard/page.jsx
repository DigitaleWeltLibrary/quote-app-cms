"use client";

import react, { useState } from "react";
import TogglePage from "../components/TogglePage";
import Data from "../components/Data";
import Settings from "../components/settings";

export default function Dashboard() {
  const [data, changepage] = useState(true);

  return (
    <main>
      <TogglePage site={data} change={changepage} />
      {data ? <Data /> : <Settings isVisible={data} />}
    </main>
  );
}
