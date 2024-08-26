"use client";
import react, { useState } from "react";
import TogglePage from "../components/TogglePage";
import Data from "../components/Data";
import Settings from "../components/settings";
import Header from "../components/Header";

export default function Dashboard() {
  const [data, changepage] = useState(true);
  const [shownewdata, newdatavisibility] = useState(false);

  return (
    <main>
      <Header newdatavisibility={newdatavisibility} show={data} shownewdata={shownewdata} />
      <TogglePage site={data} change={changepage} />

      {data ? (
        <Data show={shownewdata} newdatavisibility={newdatavisibility} />
      ) : (
        <Settings isVisible={data} />
      )}
    </main>
  );
}
