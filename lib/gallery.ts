export interface GalleryPhoto { id: string; title: string; description: string; image: string; }
export interface GalleryAlbum { id: string; title: string; description: string; photos: GalleryPhoto[]; createdAt: string; }

export const initialGalleryAlbums: GalleryAlbum[] = [{
  id: "project-highlights", title: "Project highlights", description: "A closer look at our projects, places, and people.", createdAt: "2026-01-01T00:00:00.000Z",
  photos: [
    { id: "g1", title: "Gumu Khola A", description: "Our flagship run-of-river project.", image: "https://images.unsplash.com/photo-1549424840-7ab3fba0132b?auto=format&fit=crop&q=80" },
    { id: "g2", title: "Gumu Khola B", description: "A project supporting regional grid stability.", image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80" },
    { id: "g3", title: "Upper Gumu", description: "Our newest hydropower development.", image: "https://images.unsplash.com/photo-1582215286577-fb5f5cb3c82d?auto=format&fit=crop&q=80" },
  ],
}];
