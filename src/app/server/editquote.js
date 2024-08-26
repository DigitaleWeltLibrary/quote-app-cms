"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const safedata = (data) => data.trim()?.replace(/></g, "");

function arrayBufferToBase64(buffer) {
  return Buffer.from(buffer).toString("base64");
}

export async function editquote(Formstate, formdata) {
  let quote = safedata(formdata.get("quote")) || "";
  let author = safedata(formdata.get("author")) || "";
  let id = safedata(formdata.get("id")) || "";
  let imgfile = formdata.get("image");
  let imgBase64 = "";

  if (id == "") {
    return { message: "Fehler beim verarbeiten.", status: 400 };
  }

  if (imgfile) {
    try {
      let imgArrayBuffer = await imgfile.arrayBuffer();
      imgBase64 = arrayBufferToBase64(imgArrayBuffer);
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return { message: "Fehler beim Verarbeiten des Bildes", status: 400 };
    }
  }

  const updateData = {};

  if (author) {
    updateData.author = author;
  }
  if (imgBase64) {
    updateData.img = imgBase64;
  }
  if (quote) {
    updateData.quote = quote;
  }

  try {
    const data = await prisma.data.update({
      where: {
        id: id,
      },
      data: updateData,
    });
  } catch (error) {
    return { message: `Ein Fehler: ${error}`, status: 400 };
  } finally {
    await prisma.$disconnect();
  }
  return { message: "Erfolgreich verarbeitet", status: 200 };
}
