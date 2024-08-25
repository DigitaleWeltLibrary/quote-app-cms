"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchdata() {
  try {
    const allQuotes = await prisma.data.findMany();
    return allQuotes;
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    throw error;
  }
}
