import { Metadata } from "next";
import InfoPage from "@/components/ui/InfoPage";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore project and landscape highlights from Gumu Khola Hydropower.",
};

export default function GalleryPage() {
  return (
    <InfoPage
      title="Gallery"
      subtitle="A closer look at our projects, places, and people."
      imageSrc="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80"
    >
      <GalleryGrid />
    </InfoPage>
  );
}
