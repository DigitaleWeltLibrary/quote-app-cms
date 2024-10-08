"use server";
import fs from "fs";
import path from "path";
import Card from "../components/card";
import style from "../scss/pages/index.module.scss";
import PageFooter from "@/components/PageFooter";

export async function generateMetadata() {
  const filePath = path.join(process.cwd(), "public", "json", "settings.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const metadataJson = JSON.parse(fileContents);

  return {
    title: metadataJson.title,
    description: metadataJson.description,
    keywords: metadataJson.keywords,
  };
}

export default async function Index() {
  const filePath = path.join(process.cwd(), "public", "json", "settings.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const metadataJson = JSON.parse(fileContents);

  return (
    <>
      <main className={style.main}>
        <Card />
      </main>
      <PageFooter
        impr={metadataJson.impressum}
        agb={metadataJson.agbs}
        dsvg={metadataJson.dsvg}
      />
    </>
  );
}
