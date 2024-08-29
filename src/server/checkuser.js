"use server";
import { encrypt } from "@/lib/helpauth";
import { safedata } from "@/lib/serverhelpfunc";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function checkuser(Formstate, formdata) {
  try {
    const username = await safedata(formdata.get("username"));
    const password = await safedata(formdata.get("password"));

    if (!username || !password) {
      return {
        success: false,
        message: "Keine Eingabe am Server erhalten.",
      };
    }

    const user = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Nutzer nicht gefunden.",
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const expires = new Date(Date.now() + 60 * 60 * 1000);
      const session = await encrypt({ user, expires });

      cookies().set("session", session, { expires, httpOnly: true });
      return {
        success: true,
        message: "Nutzer ist berechtigt.",
      };
    } else {
      return {
        success: false,
        message: "Passwort falsch.",
      };
    }
  } catch (error) {
    console.error(`Fehler beim Überprüfen des Nutzers: ${error.message}`);
    return {
      success: false,
      message: "Serverfehler",
    };
  } finally {
    await prisma.$disconnect();
  }
}
