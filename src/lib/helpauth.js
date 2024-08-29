"use server";
import { jwtVerify, SignJWT } from "jose";

const secretkey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretkey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

export async function decrypt(input) {
  try {
    const { payload } = await jwtVerify(input, key, { alg: ["HS256"] });
    return payload;
  } catch (e) {
    console.error(`Fehler: ${e}`);
    return null;
  }
}
