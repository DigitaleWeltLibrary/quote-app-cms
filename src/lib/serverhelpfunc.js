export async function safedata(data) {
  return data.trim()?.replace(/></g, "");
}

export async function arrayBufferToBase64(buffer) {
  return Buffer.from(buffer).toString("base64");
}
