import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { news, NewsItem } from "@/lib/data";

const newsDataFile = path.join(process.cwd(), "data", "news.json");

export async function getStoredNews(): Promise<NewsItem[]> {
  try {
    return JSON.parse(await readFile(newsDataFile, "utf8")) as NewsItem[];
  } catch {
    return news;
  }
}

export async function saveNews(items: NewsItem[]) {
  await mkdir(path.dirname(newsDataFile), { recursive: true });
  await writeFile(newsDataFile, JSON.stringify(items, null, 2), "utf8");
}
