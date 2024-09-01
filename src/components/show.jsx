import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deletequote } from "../server/deletequote";

export default function Show({ data, styleclass, refetch, changeedit }) {
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
            <FontAwesomeIcon
              color="rgb(179, 95, 53)"
              icon={faPen}
              onClick={() => changeedit(data.id)}
            />
            <FontAwesomeIcon
              color="#FF0000"
              icon={faTrash}
              onClick={() => {
                deletequote(data.id);
                refetch();
              }}
            />
          </div>
          <p>{data.author || "Unbekannter Autor"}</p>
        </div>
      </section>
    </section>
  );
}
