import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { downloads, DownloadItem } from "@/lib/data";

const reportDataFile = path.join(process.cwd(), "data", "reports.json");

export async function getStoredReports(): Promise<DownloadItem[]> {
  try {
    return JSON.parse(await readFile(reportDataFile, "utf8")) as DownloadItem[];
  } catch {
    return downloads;
  }
}

export async function saveReports(items: DownloadItem[]) {
  await mkdir(path.dirname(reportDataFile), { recursive: true });
  await writeFile(reportDataFile, JSON.stringify(items, null, 2), "utf8");
}
