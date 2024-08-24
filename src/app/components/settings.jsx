"use client";
import style from "../scss/components/settings.module.scss";
import { useFormState } from "react-dom";
import { editsettings } from "../server/editsettings";
import { useState } from "react";
import useSWR from "swr";
import { fetchSettings } from "../server/fetchsettings";

export default function Settings() {
  const [state, editdata] = useFormState(editsettings, {
    message: "",
  });
  const [change, setchnage] = useState(false);
  const { data, isLoading } = useSWR("fetchSettings", fetchSettings);

  if (isLoading) return <h1>Daten werden geladen ...</h1>;

  return (
    <form action={editdata} className={style.form}>
      <h1>Einstellungen</h1>
      <h2>Basis Einstellungen </h2>
      <label htmlFor="title">Websitename</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder={data[0] || "Ich heiße ..."}
        onChange={() => setchnage(true)}
      />
      <label htmlFor="mdescription">Beschreibung (meta)</label>
      <input
        type="text"
        name="mdescription"
        id="mdescription"
        placeholder={data[1] || "Bitte beschreibe mich ..."}
        onChange={() => setchnage(true)}
      />
      <label htmlFor="mkeywords">Schlagwörter</label>
      <input
        type="text"
        name="mkeywords"
        id="mkeywords"
        placeholder={data[2] || "Kurze Wörter über mich..."}
        onChange={() => setchnage(true)}
      />

      <h2>Footer Links</h2>
      <label htmlFor="impressum">Impressum</label>
      <input
        type="text"
        name="impressum"
        id="impressum"
        placeholder={data[3] || "www.****.**/impressum"}
        onChange={() => setchnage(true)}
      />
      <label htmlFor="dsvg">Datenschutz</label>
      <input
        type="text"
        name="dsvg"
        id="dsvg"
        placeholder={data[4] || "www.****.**/dsvg"}
        onChange={() => setchnage(true)}
      />
      <label htmlFor="agbs">AGBs</label>
      <input
        type="text"
        name="agbs"
        id="agbs"
        placeholder={data[5] || "www.****.**/agbs"}
        onChange={() => setchnage(true)}
      />
      <p className="error">{state.message}</p>
      <input
        type="submit"
        value="Bearbeiten"
        disabled={!change}
        onClick={() => setchnage(true)}
      />
    </form>
  );
}
