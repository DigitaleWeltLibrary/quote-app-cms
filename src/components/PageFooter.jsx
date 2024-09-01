import React from "react";
import style from "../scss/components/footer.module.scss";

export default function PageFooter({ impr, agb, dsvg }) {
  if (!impr && !agb && !dsvg) {
    return null;
  }

  return (
    <footer className={style.footer}>
      {impr && <a href={impr}>Impressum</a>}
      {agb && <a href={agb}>AGBs</a>}
      {dsvg && <a href={dsvg}>Datenschutz</a>}
    </footer>
  );
}
