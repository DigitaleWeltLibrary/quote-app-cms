import style from "../scss/components/togglepage.module.scss";

export default function TogglePage({ site, change }) {
  return (
    <section className={site ? `${style.toggle} ${style.data}` : style.toggle}>
      <span onClick={() => change(true)}>Daten</span>
      <span onClick={() => change(false)}>Einstellungen</span>
    </section>
  );
}
