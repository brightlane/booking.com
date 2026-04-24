import fs from "fs";
import path from "path";

/**
 * TRAFFIC INTELLIGENCE ENGINE
 * - tracks which posts get clicks
 * - boosts viral posts automatically
 * - ranks destinations by performance
 */

const DATA_FILE = path.join(process.cwd(), "data/traffic.json");

/**
 * LOG A CLICK
 */
export function logClick(slug, source = "unknown") {
  const data = loadData();

  if (!data[slug]) {
    data[slug] = {
      clicks: 0,
      sources: {},
      lastUpdated: new Date().toISOString()
    };
  }

  data[slug].clicks += 1;
  data[slug].sources[source] = (data[slug].sources[source] || 0) + 1;
  data[slug].lastUpdated = new Date().toISOString();

  saveData(data);
}

/**
 * GET TOP PERFORMING POSTS
 */
export function getTopPosts(limit = 10) {
  const data = loadData();

  return Object.entries(data)
    .map(([slug, stats]) => ({
      slug,
      clicks: stats.clicks
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, limit);
}

/**
 * VIRAL SCORE (used for boosting social posts)
 */
export function getViralScore(slug) {
  const data = loadData();

  const post = data[slug];
  if (!post) return 0;

  // simple viral scoring model
  const clickScore = post.clicks * 10;
  const recencyBoost =
    (Date.now() - new Date(post.lastUpdated).getTime()) < 86400000 ? 20 : 0;

  return clickScore + recencyBoost;
}

/**
 * BOOST WINNING POSTS (used in social automation)
 */
export function getBoostedPosts(posts) {
  return posts
    .map(p => ({
      ...p,
      score: getViralScore(p.slug)
    }))
    .sort((a, b) => b.score - a.score);
}

/**
 * LOAD DATA
 */
function loadData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return {};
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return {};
  }
}

/**
 * SAVE DATA
 */
function saveData(data) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}
