"use client";
import style from "../scss/components/settings.module.scss";
import { useFormState } from "react-dom";
import { editsettings } from "../server/editsettings";
import { useState } from "react";

export default function Settings() {
  const [state, editdata] = useFormState(editsettings, {
    message: "",
  });
  const [change, setchnage] = useState(false);

  return (
    <form action={editdata} className={style.form}>
      <h1>Einstellungen</h1>
      <h2>Basis Einstellungen </h2>
      <label htmlFor="title">Websitename</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Ich heiße ..."
        required
        onChange={() => setchnage(true)}
      />
      <label htmlFor="mdescription">Beschreibung (meta)</label>
      <input
        type="text"
        name="mdescription"
        id="mdescription"
        placeholder="Bitte beschreibe mich ..."
        required
        onChange={() => setchnage(true)}
      />
      <label htmlFor="mkeywords">Schlagwörter</label>
      <input
        type="text"
        name="mkeywords"
        id="mkeywords"
        placeholder="Kurze Wörter über mich..."
        required
        onChange={() => setchnage(true)}
      />

      <h2>Footer Links</h2>
      <label htmlFor="impressum">Impressum</label>
      <input
        type="text"
        name="impressum"
        id="impressum"
        placeholder="www.****.**/impressum"
        required
        onChange={() => setchnage(true)}
      />
      <label htmlFor="dsvg">Datenschutz</label>
      <input
        type="text"
        name="dsvg"
        id="dsvg"
        placeholder="www.****.**/dsvg"
        required
        onChange={() => setchnage(true)}
      />
      <label htmlFor="agbs">AGBs</label>
      <input
        type="text"
        name="agbs"
        id="agbs"
        placeholder="www.****.**/agbs"
        required
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
