import { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/ui/Hero";
import { news } from "@/lib/data";

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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <article key={item.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="text-sm text-secondary font-medium mb-3">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h2 className="text-xl font-bold text-primary dark:text-white mb-3 hover:text-secondary transition-colors">
                  <Link href={`/news/${item.id}`}>
                    {item.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
                <Link 
                  href={`/news/${item.id}`}
                  className="text-primary dark:text-white font-medium hover:text-secondary transition-colors inline-flex items-center"
                >
                  Read Full Article
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
