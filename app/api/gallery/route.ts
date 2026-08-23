import { randomUUID } from "crypto";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { GalleryItem, initialGalleryItems } from "@/lib/gallery";
import { addActivity } from "@/lib/activity-store";

export const runtime = "nodejs";

const galleryDirectory = path.join(process.cwd(), "public", "uploads", "gallery");
const galleryDataFile = path.join(process.cwd(), "data", "gallery.json");
const supportedExtensions = new Set([".heic", ".heif", ".jpg", ".jpeg", ".png", ".svg", ".webp", ".avif"]);

async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    return JSON.parse(await readFile(galleryDataFile, "utf8")) as GalleryItem[];
  } catch {
    return initialGalleryItems;
  }
}

async function saveGalleryItems(items: GalleryItem[]) {
  await mkdir(path.dirname(galleryDataFile), { recursive: true });
  await writeFile(galleryDataFile, JSON.stringify(items, null, 2), "utf8");
}

export async function GET() {
  return NextResponse.json(
    { data: await getGalleryItems() },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("image");
  const title = String(formData.get("title") ?? "").trim() || "Untitled Image";
  const description = String(formData.get("description") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: "An image is required." }, { status: 400 });
  }

  const extension = path.extname(file.name).toLowerCase();
  if (!supportedExtensions.has(extension)) {
    return NextResponse.json({ message: "Only supported: .heic, .heif, .jpg, .jpeg, .png, .svg, .webp, .avif" }, { status: 400 });
  }

  await mkdir(galleryDirectory, { recursive: true });
  const fileName = `${randomUUID()}${extension}`;
  await writeFile(path.join(galleryDirectory, fileName), Buffer.from(await file.arrayBuffer()));

  const items = await getGalleryItems();
  const item: GalleryItem = { id: randomUUID(), title, description, image: `/uploads/gallery/${fileName}` };
  await saveGalleryItems([item, ...items]);
  await addActivity(`Gallery image added: ${title}`);

  return NextResponse.json({ data: item, message: "Image added" }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json() as { id?: string };
  const items = await getGalleryItems();
  const item = items.find((galleryItem) => galleryItem.id === id);

  if (!item) return NextResponse.json({ message: "Image not found." }, { status: 404 });

  if (item.image.startsWith("/uploads/gallery/")) {
    try {
      await unlink(path.join(process.cwd(), "public", item.image));
    } catch {
      // The metadata can still be removed when the file is already missing.
    }
  }

  await saveGalleryItems(items.filter((galleryItem) => galleryItem.id !== id));
  await addActivity(`Gallery image deleted: ${item.title}`);
  return NextResponse.json({ message: "Image deleted" });
}
