"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function checkuser(Formstate, formdata) {
  const username = formdata.get("username").trim()?.replace(/></g, "");
  const password = formdata.get("password").trim()?.replace(/></g, "");

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
