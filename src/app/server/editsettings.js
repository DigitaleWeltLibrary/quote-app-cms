"use server";
import fs from "fs";
import { revalidatePath } from "next/cache";
import path from "path";

export async function editsettings(Formstate, formdata) {
  try {
    const title = formdata.get("title").trim()?.replace(/></g, "");
    const mdescription = formdata
      .get("mdescription")
      .trim()
      ?.replace(/></g, "");
    const mkeywords = formdata.get("mkeywords").trim()?.replace(/></g, "");
    const impressum = formdata.get("impressum").trim()?.replace(/></g, "");
    const dsvg = formdata.get("dsvg").trim()?.replace(/></g, "");
    const agbs = formdata.get("agbs").trim()?.replace(/></g, "");

    const filePath = path.join(
      process.cwd(),
      "public",
      "json",
      "settings.json"
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    let json = JSON.parse(fileContents);

    json.title = title;
    json.mdescription = mdescription;
    json.mkeywords = mkeywords;
    json.impressum = impressum;
    json.dsvg = dsvg;
    json.agbs = agbs;

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    revalidatePath("/dashboard");
    return { message: "Änderungen wurden vorgenommen." };
  } catch (error) {
    return { message: "Fehler beim verarbeiten" };
  }
}
