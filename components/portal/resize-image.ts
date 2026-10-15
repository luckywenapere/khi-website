/**
 * Shrink a photo in the browser before upload: longest edge ≤ 1600 px, JPEG
 * quality 0.8 (a phone photo goes from ~4 MB to ~300 KB). Keeps each request
 * far below Vercel's 4.5 MB limit.
 */
const MAX_EDGE = 1600;
const QUALITY = 0.8;

async function decode(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      // Fall through to <img> decoding (older Safari).
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function resizeImage(file: File): Promise<Blob> {
  let source: ImageBitmap | HTMLImageElement;
  try {
    source = await decode(file);
  } catch {
    throw new Error(
      `We couldn't open "${file.name}". Please choose a JPEG or PNG photo.`,
    );
  }
  const width = "naturalWidth" in source ? source.naturalWidth : source.width;
  const height =
    "naturalHeight" in source ? source.naturalHeight : source.height;
  const scale = Math.min(1, MAX_EDGE / Math.max(width, height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser couldn't prepare the photo.");
  // White background so transparent PNGs don't turn black as JPEG.
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  if ("close" in source) source.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", QUALITY),
  );
  if (!blob) throw new Error("Your browser couldn't prepare the photo.");
  return blob;
}
