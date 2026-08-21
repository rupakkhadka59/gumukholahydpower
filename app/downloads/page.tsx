import { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import { downloads } from "@/lib/data";
import { FileText, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Downloads & Resources",
  description: "Access related articles, reports, and technical documents regarding our hydropower operations.",
};

export default function DownloadsPage() {
  return (
    <div>
      <Hero 
        title="Downloads & Resources"
        subtitle="Access detailed reports, environmental assessments, and technical articles related to our hydropower projects."
        imageSrc="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80"
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">Research & Reports</h2>
          <p className="text-muted-foreground text-lg">
            Download our latest publications and technical documents to learn more about run-of-river generation, environmental conservation, and our operational metrics.
          </p>
        </div>
        
        <div className="space-y-6">
          {downloads.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-sm hover:border-secondary transition-colors">
              <div className="bg-primary/10 p-4 rounded-lg flex-shrink-0">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-primary dark:text-white">{item.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary/10 text-secondary border border-secondary/20">
                    {item.type}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3 sm:mb-0">
                  {item.description}
                </p>
                <div className="text-sm font-medium text-slate-500 mt-2">
                  {item.fileSize} • Published on {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              
              <div className="flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-5 py-3 rounded-md font-medium transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
