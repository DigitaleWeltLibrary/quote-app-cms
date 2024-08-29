"use client";
import React, { useEffect, useState } from "react";
import style from "../scss/components/showdata.module.scss";
import Show from "./show";
import EditData from "./editdata";

export default function ShowData({ load, requestdata, refetch }) {
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    refetch();
  }, [editId]);

  return (
    <article className={style.datacontainer}>
      <h1>{load ? "Daten werden geladen..." : "Vorhandene Daten"}</h1>
      <article>
        {requestdata?.map((item) =>
          editId === item.id ? (
            <EditData key={item.id} data={item} setEditId={setEditId} />
          ) : (
            <Show
              styleclass={style.showcard}
              key={item.id}
              data={item}
              refetch={refetch}
              changeedit={setEditId}
            />
          )
        )}
      </article>
    </article>
  );
}
