import { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import NewsList from "@/components/news/NewsList";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Latest news, press releases, and updates from Gumu Khola Hydropower.",
};

export default function NewsPage() {
  return (
    <div>
      <Hero 
        title="News & Updates"
        subtitle="Stay informed about our latest projects, milestones, and company news."
        imageSrc="https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?auto=format&fit=crop&q=80"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <NewsList />
      </div>
    </div>
  );
}
