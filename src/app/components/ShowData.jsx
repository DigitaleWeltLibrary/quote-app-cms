"use client";
import React from "react";
import style from "../scss/components/showdata.module.scss";
import Show from "./show";
import useSWR from "swr";
import { fetchdata } from "../server/fetchdata";

export default function ShowData() {
  const { data, isLoading } = useSWR("fetchdata", fetchdata, {
    tags: ["fetchdata"],
  });

  return (
    <article className={style.datacontainer}>
      <h1>{isLoading ? "Daten werden geladen..." : "Vorhandene Daten"}</h1>
      <article>
        {data?.map((item) => (
          <Show styleclass={style.showcard} key={item.id} data={item} />
        ))}
      </article>
    </article>
  );
}
