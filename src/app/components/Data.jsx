"use client";
import NewData from "./NewData";
import React, { useEffect } from "react";
import ShowData from "./ShowData";
import useSWR, { mutate } from "swr";
import { fetchdata } from "../server/fetchdata";

export default function Data({ show, newdatavisibility }) {
  const { data, isLoading } = useSWR("fetchdata", fetchdata, {
    tags: ["fetchdata"],
  });

  const refetch = () => mutate("fetchdata");

    useEffect(() => {
    refetch();
  }, [show]);

  return (
    <>
      {show ? <NewData newdatavisibility={newdatavisibility} /> : null}

      <ShowData load={isLoading} requestdata={data} refetch={refetch} />
    </>
  );
}
