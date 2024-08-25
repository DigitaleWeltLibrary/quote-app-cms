import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deletequote } from "../server/deletequote";
import { mutate } from "swr";

export default function Show({ data, styleclass }) {
  return (
    <section className={styleclass}>
      <img
        src={
          data.img
            ? `data:image/png;base64,${data.img}`
            : "/images/nottotakepictures.png"
        }
        alt={data.quote}
      />

      <section>
        <h2>{data.quote || "Fehler: Bitte neu laden..."}</h2>

        <div>
          <div>
            <FontAwesomeIcon color="grey" icon={faPen} />
            <FontAwesomeIcon
              color="red"
              icon={faTrash}
              onClick={() => {
                deletequote(data.id);
                mutate("fetchdata");
              }}
            />
          </div>
          <p>{data.author || "Unbekannter Autor"}</p>
        </div>
      </section>
    </section>
  );
}
