export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const galleryStorageKey = "gumuk-khola-gallery";

export const initialGalleryItems: GalleryItem[] = [
  { id: "g1", title: "Gumu Khola A", description: "Our flagship run-of-river project.", image: "https://images.unsplash.com/photo-1549424840-7ab3fba0132b?auto=format&fit=crop&q=80" },
  { id: "g2", title: "Gumu Khola B", description: "A project supporting regional grid stability.", image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80" },
  { id: "g3", title: "Upper Gumu", description: "Our newest hydropower development.", image: "https://images.unsplash.com/photo-1582215286577-fb5f5cb3c82d?auto=format&fit=crop&q=80" },
  { id: "g4", title: "River and Renewable Energy", description: "Working with nature to generate clean energy.", image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80" },
  { id: "g5", title: "Sustainable Infrastructure", description: "Infrastructure designed for lasting value.", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80" },
  { id: "g6", title: "Working With Communities", description: "Creating lasting value with local communities.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80" },
];
