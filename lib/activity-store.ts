import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export interface ActivityItem {
  id: string;
  text: string;
  createdAt: string;
}

const activityDataFile = path.join(process.cwd(), "data", "activity.json");

export async function getActivities(): Promise<ActivityItem[]> {
  try {
    return JSON.parse(await readFile(activityDataFile, "utf8")) as ActivityItem[];
  } catch {
    return [];
  }
}

export async function addActivity(text: string) {
  const activities = await getActivities();
  const item: ActivityItem = { id: `${Date.now()}-${Math.random()}`, text, createdAt: new Date().toISOString() };
  await mkdir(path.dirname(activityDataFile), { recursive: true });
  await writeFile(activityDataFile, JSON.stringify([item, ...activities].slice(0, 20), null, 2), "utf8");
}
