"use client";
import React from "react";
import style from "../scss/components/showdata.module.scss";
import Show from "./show";

export default function ShowData({ load, requestdata, refetch }) {
  return (
    <article className={style.datacontainer}>
      <h1>{load ? "Daten werden geladen..." : "Vorhandene Daten"}</h1>
      <article>
        {requestdata?.map((item) => (
          <Show
            styleclass={style.showcard}
            key={item.id}
            data={item}
            refetch={refetch}
          />
        ))}
      </article>
    </article>
  );
}
