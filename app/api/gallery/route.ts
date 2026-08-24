import { randomUUID } from "crypto";
import path from "path";
import { NextResponse } from "next/server";
import { GalleryAlbum, GalleryPhoto } from "@/lib/gallery";
import { addActivity } from "@/lib/activity-store";
import { getPublicFileUrl, getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
const supportedExtensions = new Set([".heic", ".heif", ".jpg", ".jpeg", ".png", ".svg", ".webp", ".avif"]);
type AlbumRow = { id: string; title: string; description: string; created_at: string; gallery_photos: { id: string; title: string; description: string; storage_path: string; sort_order: number }[] };
const toAlbum = (album: AlbumRow): GalleryAlbum => ({ id: album.id, title: album.title, description: album.description, createdAt: album.created_at, photos: (album.gallery_photos ?? []).sort((a, b) => a.sort_order - b.sort_order).map((photo): GalleryPhoto => ({ id: photo.id, title: photo.title, description: photo.description, image: getPublicFileUrl("gallery", photo.storage_path) })) });

export async function GET() { try { const { data, error } = await getSupabaseAdmin().from("gallery_albums").select("id, title, description, created_at, gallery_photos(id, title, description, storage_path, sort_order)").order("created_at", { ascending: false }); if (error) throw error; return NextResponse.json({ data: (data as AlbumRow[]).map(toAlbum) }, { headers: { "Cache-Control": "no-store, max-age=0" } }); } catch (error) { return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to load gallery." }, { status: 500 }); } }

export async function POST(request: Request) {
  try {
    const formData = await request.formData(); const title = String(formData.get("title") ?? "").trim(); const description = String(formData.get("description") ?? "").trim(); const files = formData.getAll("images").filter((value): value is File => value instanceof File && value.size > 0);
    if (!title) return NextResponse.json({ message: "An album title is required." }, { status: 400 }); if (!files.length) return NextResponse.json({ message: "Choose at least one image." }, { status: 400 }); if (files.some((file) => !supportedExtensions.has(path.extname(file.name).toLowerCase()))) return NextResponse.json({ message: "Please use a supported image format." }, { status: 400 });
    const supabase = getSupabaseAdmin(); const { data: album, error: albumError } = await supabase.from("gallery_albums").insert({ title, description }).select("id, title, description, created_at").single(); if (albumError || !album) throw albumError ?? new Error("Unable to create album.");
    const photos = await Promise.all(files.map(async (file, index) => { const storagePath = `${album.id}/${randomUUID()}${path.extname(file.name).toLowerCase()}`; const { error } = await supabase.storage.from("gallery").upload(storagePath, Buffer.from(await file.arrayBuffer()), { contentType: file.type || undefined }); if (error) throw error; return { album_id: album.id, title: file.name.replace(/\.[^.]+$/, ""), description: "", storage_path: storagePath, sort_order: index }; }));
    const { data: savedPhotos, error: photoError } = await supabase.from("gallery_photos").insert(photos).select("id, title, description, storage_path, sort_order"); if (photoError) throw photoError; await addActivity(`Gallery album added: ${title}`); return NextResponse.json({ data: toAlbum({ ...album, gallery_photos: savedPhotos ?? [] }) }, { status: 201 });
  } catch (error) { return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to create album." }, { status: 500 }); }
}

export async function PATCH(request: Request) { try { const { albumId, title, description } = await request.json() as { albumId?: string; title?: string; description?: string }; const { data, error } = await getSupabaseAdmin().from("gallery_albums").update({ title: String(title ?? "").trim() || "Untitled album", description: String(description ?? "").trim() }).eq("id", albumId).select("id, title, description, created_at, gallery_photos(id, title, description, storage_path, sort_order)").single(); if (error) throw error; return NextResponse.json({ data: toAlbum(data as AlbumRow) }); } catch (error) { return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to update album." }, { status: 500 }); } }

export async function DELETE(request: Request) { try { const { albumId } = await request.json() as { albumId?: string }; const supabase = getSupabaseAdmin(); const { data: photos, error: photosError } = await supabase.from("gallery_photos").select("storage_path").eq("album_id", albumId); if (photosError) throw photosError; if (photos?.length) { const { error } = await supabase.storage.from("gallery").remove(photos.map((photo) => photo.storage_path)); if (error) throw error; } const { error: deleteError } = await supabase.from("gallery_albums").delete().eq("id", albumId); if (deleteError) throw deleteError; await addActivity("Gallery album deleted"); return NextResponse.json({ message: "Album deleted" }); } catch (error) { return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to delete album." }, { status: 500 }); } }
