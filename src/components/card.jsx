"use client";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { getRandomQuote } from "../server/generator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Card() {
  const [copy, changecopy] = useState(false);
  let { data } = useSWR("getRandomQuote", getRandomQuote);
  const { quote, author, img } = data || {};
  const getquote = () => mutate("getRandomQuote");

  function copyTextToClipboard(text) {
    changecopy((prevCopy) => !prevCopy);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      changecopy((prevCopy) => !prevCopy);
    }, 2000);
  }

  return (
    <article>
      <h2>Zufalls Zitat anzeigen</h2>
      {img && (
        <img
          src={`data:image/png;base64,${img}`}
          alt={`Bild zum Zitat von ${quote}`}
        />
      )}
      <h1>{quote}</h1>
      <p>{author || "Autor unbekannt"}</p>

      <section>
        <div
          onClick={() =>
            copyTextToClipboard(`"${quote}" — ${author || "Autor unbekannt"}`)
          }
        >
          <FontAwesomeIcon
            icon={copy ? faCheck : faCopy}
            size="xl"
            color={copy ? "green" : "rgb(255, 187, 152)"}
          />
        </div>
        <a
          href="https://github.com/DigitaleWeltLibrary/quote-app-cms"
          target="_blank"
        >
          Made with <FontAwesomeIcon icon={faHeart} color="red" />
        </a>
        <button onClick={getquote}>Neues Zitat</button>
      </section>
    </article>
  );
}
