"use client";
import React from "react";
import style from "../scss/components/header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function Header({ newdatavisibility, show, shownewdata }) {
  return (
    <header className={style.header}>
      <h2>Dashboard</h2>
      <section>
        {!show ? null : (
          <FontAwesomeIcon
            icon={faPenToSquare}
            color="#7d8e95"
            onClick={() => newdatavisibility(!shownewdata)}
          />
        )}
        <FontAwesomeIcon icon={faRightFromBracket} color="#7d8e95" />
      </section>
    </header>
  );
}
