"use server";
import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { arrayBufferToBase64, safedata } from "@/lib/serverhelpfunc";

const prisma = new PrismaClient();

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
      return {
        message: "Fehler: Dieses Zitat existiert bereits.",
        status: 400,
      };
    } else {
      return {
        message: `Ein anderer Fehler ist aufgetreten: ${error}`,
        status: 400,
      };
    }
  }

  if (!imgBase64 && author !== "") {
    return {
      message: "Datensatz mit Zitat und Autor wurde erstellt.",
      status: 200,
    };
  } else if (!imgBase64) {
    return { message: "Datensatz mit Zitat wurde erstellt.", status: 200 };
  } else if (author === "") {
    return {
      message: "Datensatz mit Zitat und Bild wurde erstellt.",
      status: 200,
    };
  } else {
    return {
      message: "Datensatz mit Zitat, Bild und Autor wurde erstellt.",
      status: 200,
    };
  }
}
