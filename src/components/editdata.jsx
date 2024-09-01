"use client";
import React, { useEffect, useState } from "react";
import style from "../scss/components/newdata.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { editquote } from "../server/editquote";
import { useFormState } from "react-dom";

export default function EditData({ data, setEditId }) {
  const [change, setchange] = useState(false);
  const [state, editdataquote] = useFormState(editquote, {
    message: "",
    status: "",
  });
  const [imagePreview, setImagePreview] = useState(
    data?.img ? `data:image/png;base64,${data.img}` : null
  );

  useEffect(() => {
    if (data?.img) {
      setImagePreview(`data:image/png;base64,${data.img}`);
    } else {
      setImagePreview(null);
    }
  }, [data?.img]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
    setchange(true);
  };

  return (
    <form
      action={editdataquote}
      className={style.form}
      encType="multipart/form-data"
      onSubmit={() => {
        setEditId(null);
      }}
    >
      <FontAwesomeIcon
        size="xl"
        className={style.x}
        icon={faX}
        color="rgb(164, 48, 75)"
        onClick={() => setEditId(null)}
      />
      <h1>Datensatz bearbeiten</h1>
      <article>
        <section>
          <input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            onChange={handleFileChange}
          />
          <label htmlFor="image">
            <img
              src={imagePreview || "/images/upload.png"}
              alt="Vorschau"
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                marginTop: "10px",
              }}
            />
          </label>
        </section>
        <section>
          <label htmlFor="quote">Zitat</label>
          <input
            type="text"
            name="quote"
            id="quote"
            placeholder={data.quote || "Mein Text ..."}
            onChange={(e) => {
              if (e.target.value.trim() !== "") {
                setchange(true);
              }
            }}
          />
          <label htmlFor="author">Autor</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder={data.author || "Ich bin ..."}
            onChange={(e) => {
              if (e.target.value.trim() !== "") {
                setchange(true);
              }
            }}
          />
          {state.message && <p className="error">{state.message}</p>}
          <input type="hidden" name="id" value={data.id} />
          <input type="submit" value="Speichern" disabled={!change} />
        </section>
      </article>
    </form>
  );
}
