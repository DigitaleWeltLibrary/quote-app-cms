"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getRandomQuote() {
  try {
    const count = await prisma.data.count();

    if (count === 0) {
      return { message: "No data found" };
    }

    const randomIndex = Math.floor(Math.random() * count);

    const [randomRecord] = await prisma.data.findMany({
      skip: randomIndex,
      take: 1,
    });

    return randomRecord || { message: "No data found" };
  } catch (error) {
    console.error("Error fetching random record:", error);
    return { message: "Error fetching data" };
  }
}
