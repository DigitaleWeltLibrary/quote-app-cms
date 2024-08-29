"use server";

import { safedata } from "@/lib/serverhelpfunc";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function checkuser(Formstate, formdata) {
  const username = safedata(formdata.get("username"));
  const password = safedata(formdata.get("password"));

  if (!username || !password) {
    return {
      success: false,
      message: "Keine Eingabe am Server erhalten.",
    };
  }

  try {
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
    } else if (await bcrypt.compare(password, user.password)) {
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
    return {
      success: false,
      message: "Serverfehler",
    };
  } finally {
    await prisma.$disconnect();
  }
}
