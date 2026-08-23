import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { projects, Project } from "@/lib/data";

const projectDataFile = path.join(process.cwd(), "data", "projects.json");

export async function getStoredProjects(): Promise<Project[]> {
  try {
    return JSON.parse(await readFile(projectDataFile, "utf8")) as Project[];
  } catch {
    return projects;
  }
}

export async function saveProjects(items: Project[]) {
  await mkdir(path.dirname(projectDataFile), { recursive: true });
  await writeFile(projectDataFile, JSON.stringify(items, null, 2), "utf8");
}
