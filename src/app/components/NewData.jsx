import React, { useState } from "react";
import style from "../scss/components/newdata.module.scss";

export default function NewData() {
  const [upload, changeupload] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <form action="" className={style.form}>
      <h1>Neuen Datensatz erstellen</h1>
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
            onChange={(e) => changeupload(e.target.value.length !== 0)}
            placeholder="Mein Text ..."
            required
          />
          <label htmlFor="author">Autor</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Ich bin ..."
          />
          <input type="submit" value="Erstellen" disabled={!upload} />
        </section>
      </article>
    </form>
  );
}
