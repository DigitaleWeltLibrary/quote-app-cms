"use server";
import path from "path";
import fs from "fs/promises";

export async function fetchSettings() {
  const filePath = path.join(process.cwd(), "public", "json", "settings.json");
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    let resp = [];

    Object.entries(jsonData).map(([key, value]) => resp.push( value));

    return resp;
  } catch (error) {
    console.error("Fehler beim Lesen der JSON-Datei:", error);
    return [];
  }
}
