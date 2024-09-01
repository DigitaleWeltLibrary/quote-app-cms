import style from "../scss/components/togglepage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faListCheck } from "@fortawesome/free-solid-svg-icons";

export default function TogglePage({ site, change }) {
  return (
    <section className={site ? `${style.toggle} ${style.data}` : style.toggle}>
      <span onClick={() => change(true)}>
        <FontAwesomeIcon icon={faGear} color="rgb(179, 95, 53)" size="xxl" />
        <p>Daten</p>
      </span>
      <span onClick={() => change(false)}>
        <FontAwesomeIcon
          icon={faListCheck}
          color="rgb(179, 95, 53)"
          size="xxl"
        />
        <p>Einstellungen</p>
      </span>
    </section>
  );
}
