"use server";

const { PrismaClient } = require("@prisma/client");

const Prisma = new PrismaClient();

export async function deletequote(id) {
  try {
    const deletedData = await Prisma.data.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Fehler beim Löschen des Datensatzes:", error);
  } finally {
    await Prisma.$disconnect();
  }
}
