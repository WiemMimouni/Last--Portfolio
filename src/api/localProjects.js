// src/api/localProjects.js
import raw from "../data/projects.json";

// helpers
const asArray = (v) =>
  Array.isArray(v) ? v : (typeof v === "string" ? v.split(",").map(s => s.trim()).filter(Boolean) : []);
const asNumberOrNull = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};
const cleanUrl = (u) => {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  return "https://" + String(u).replace(/^\/\//, "");
};

function normalize(p) {
  return {
    id: p.id || Math.random().toString(36).slice(2),
    title: p.title?.trim() || "",
    description: p.description?.trim() || "",
    category: p.category?.trim() || "",
    status: p.status?.trim() || "",
    year: asNumberOrNull(p.year),
    url: cleanUrl(p.url || ""),
    image_url: p.image_url || "",
    impact: p.impact || "",
    tags: asArray(p.tags),
    featured: Boolean(p.featured),
  };
}

/** Returns a sorted, cleaned array you can render directly. */
export function getProjects() {
  const items = (raw ?? []).map(normalize);
  const scoreYear = (y) => (y == null ? -Infinity : y);

  items.sort((a, b) => {
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    const dy = scoreYear(b.year) - scoreYear(a.year);
    if (dy) return dy;
    return a.title.localeCompare(b.title);
  });

  return items;
}
