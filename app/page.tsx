import Hero from "@/components/ui/Hero";
import StatsCounter from "@/components/ui/StatsCounter";
import ProjectCard from "@/components/ui/ProjectCard";
import { stats, projects } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, Leaf, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero 
        title="Powering Gumu Khola with Clean, Renewable Hydropower"
        subtitle="We harness the power of nature to provide sustainable, reliable energy for generations to come."
        imageSrc="https://images.unsplash.com/photo-1549424840-7ab3fba0132b?auto=format&fit=crop&q=80"
        ctaText="Explore Our Projects"
        ctaLink="/projects"
        isMain={true}
      />

      <StatsCounter stats={stats} />

      {/* Introduction Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6">Committed to a Sustainable Future</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Gumu Khola Hydropower, we believe in the harmony between technological advancement and environmental preservation. Our run-of-river projects are designed to minimize ecological impact while maximizing energy output.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-2xl border border-border text-center">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Eco-Friendly</h3>
              <p className="text-muted-foreground">Minimal reservoir impact, preserving local ecosystems and river health.</p>
            </div>
            
            <div className="p-6 bg-card rounded-2xl border border-border text-center">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">High Efficiency</h3>
              <p className="text-muted-foreground">Utilizing state-of-the-art turbines and generators for maximum power extraction.</p>
            </div>

            <div className="p-6 bg-card rounded-2xl border border-border text-center">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Reliability</h3>
              <p className="text-muted-foreground">Consistent baseload power supporting the regional grid year-round.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl">Discover how our infrastructure is powering communities today and building capacity for tomorrow.</p>
            </div>
            <Link href="/projects" className="hidden md:flex items-center text-secondary hover:text-primary transition-colors font-semibold">
              View All <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="mt-10 md:hidden text-center">
            <Link href="/projects" className="inline-flex items-center text-secondary hover:text-primary transition-colors font-semibold">
              View All Projects <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
