import { writeFile, mkdir, unlink } from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");
    const folder = formData.get("path") || "uploads";

    const uploaded = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const tempDir = path.join(process.cwd(), "temp");
      await mkdir(tempDir, { recursive: true });

      const filePath = path.join(tempDir, file.name);
      await writeFile(filePath, buffer);

      const result = await cloudinary.uploader.upload(filePath, {
        folder,
      });

      // Delete temp file after upload
      await unlink(filePath);

      uploaded.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    return NextResponse.json({ success: true, uploaded });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Upload failed", error: err.message },
      { status: 500 }
    );
  }
}
