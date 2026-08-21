import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/data";
import { MapPin, Zap, Calendar } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusColor = 
    project.status === "Operational" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
    project.status === "Under Construction" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
    "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400";

  return (
    <div className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md ${statusColor}`}>
            {project.status}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-card-foreground mb-2">{project.name}</h3>
        <p className="text-muted-foreground text-sm mb-6 flex-grow">{project.description}</p>
        
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center text-sm text-card-foreground">
            <MapPin className="w-4 h-4 text-secondary mr-2" />
            {project.location}
          </div>
          <div className="flex items-center text-sm text-card-foreground">
            <Zap className="w-4 h-4 text-secondary mr-2" />
            {project.capacityMW} MW Capacity
          </div>
          {project.commissioningYear && (
            <div className="flex items-center text-sm text-card-foreground">
              <Calendar className="w-4 h-4 text-secondary mr-2" />
              Commissioned: {project.commissioningYear}
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4">
          <Link 
            href={`/projects`} 
            className="text-secondary font-medium text-sm hover:text-primary transition-colors flex items-center"
          >
            Learn More
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
