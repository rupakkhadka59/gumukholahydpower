"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Project } from "@/lib/data";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { data: Project[] }) => setProjects(result.data.slice(0, 3)))
      .catch(() => undefined);
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
    </div>
  );
}
