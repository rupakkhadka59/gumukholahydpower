"use client";

import { useState } from "react";
import Hero from "@/components/ui/Hero";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");
  
  const statuses = ["All", "Operational", "Under Construction", "Planning"];
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.status === filter);

  return (
    <div>
      <Hero 
        title="Our Projects"
        subtitle="Explore our portfolio of run-of-river hydropower facilities."
        imageSrc="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-primary dark:text-white mb-6 md:mb-0">Project Portfolio</h2>
          
          <div className="flex flex-wrap gap-2">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === status 
                    ? "bg-secondary text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No projects found matching the selected status.</p>
          </div>
        )}
      </div>
    </div>
  );
}
