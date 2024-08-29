import style from "../scss/components/togglepage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faListCheck } from "@fortawesome/free-solid-svg-icons";

export default function TogglePage({ site, change }) {
  return (
    <section className={site ? `${style.toggle} ${style.data}` : style.toggle}>
      <span onClick={() => change(true)}>
        <FontAwesomeIcon icon={faGear} color="#7d8e95" size="xxl" />
        <p>Daten</p>
      </span>
      <span onClick={() => change(false)}>
        <FontAwesomeIcon icon={faListCheck} color="#7d8e95"  size="xxl"/>
        <p>Einstellungen</p>
      </span>
    </section>
  );
}
