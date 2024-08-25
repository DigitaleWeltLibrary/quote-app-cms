"use server";
import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const safedata = (data) => data.trim()?.replace(/></g, "");

function arrayBufferToBase64(buffer) {
  return Buffer.from(buffer).toString("base64");
}

const uploadDir = path.join(process.cwd(), "public", "uploads");
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

export async function newquote(Formstate, formdata) {
  let quote = safedata(formdata.get("quote"));
  let author = safedata(formdata.get("author")) || "";
  let imgfile = formdata.get("image");
  let imgBase64 = "";

  if (quote == "") {
    return { message: "Keine Daten zum speichern gefunden." };
  }

  if (imgfile) {
    let imgArrayBuffer = await imgfile.arrayBuffer();
    imgBase64 = arrayBufferToBase64(imgArrayBuffer);
  }

  try {
    const data = await prisma.data.create({
      data: {
        quote: quote,
        author: author,
        img: imgBase64,
      },
    });
    console.log("Zitat erfolgreich erstellt:", data);
  } catch (error) {
    if (error.code === "P2002") {
      return { message: "Fehler: Dieses Zitat existiert bereits." };
    } else {
      return { message: "Ein anderer Fehler ist aufgetreten:", error };
    }
  }

  if (!imgBase64 && author !== "") {
    return { message: "Datensatz mit Zitat und Autor wurde erstellt." };
  } else if (!imgBase64) {
    return { message: "Datensatz mit Zitat wurde erstellt." };
  } else if (author === "") {
    return { message: "Datensatz mit Zitat und Bild wurde erstellt." };
  } else {
    return { message: "Datensatz mit Zitat, Bild und Autor wurde erstellt." };
  }
}
