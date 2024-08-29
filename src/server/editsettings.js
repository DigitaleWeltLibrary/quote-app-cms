"use server";
import fs from "fs";
import { revalidatePath } from "next/cache";
import path from "path";

const safedata = (data) => data.trim()?.replace(/></g, "");

export async function editsettings(Formstate, formdata) {
  const inputs = [
    "title",
    "mdescription",
    "mkeywords",
    "impressum",
    "dsvg",
    "agbs",
  ];

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "json",
      "settings.json"
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    let json = JSON.parse(fileContents);

    inputs.forEach((input) => {
      let value = safedata(formdata.get(input));
      if (value.length !== 0) {
        json[input] = value;
      }
    });

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    revalidatePath("/dashboard");
    return { message: "Änderungen wurden vorgenommen." };
  } catch (error) {
    return { message: "Fehler beim verarbeiten" };
  }
}
