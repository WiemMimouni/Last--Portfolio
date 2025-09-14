// src/api/localRecognition.js
import raw from "../data/recognition.json";

// helpers
const nOrNull = (v) => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

function normalize(r) {
  return {
    id: r.id || Math.random().toString(36).slice(2),
    title: (r.title || "").trim(),
    organization: (r.organization || "").trim(),
    description: (r.description || "").trim(),
    year: nOrNull(r.year),
    location: (r.location || "").trim(),
    type: (r.type || "").trim(),           // e.g., award | partnership | press
    image_url: r.image_url || "",
    link_url: r.link_url || "",
    created_date: r.created_date || "",
  };
}

/** Clean + sort (newest first, then title) */
export function getRecognition() {
  const items = (raw ?? []).map(normalize);
  const y = (v) => (v == null ? -Infinity : v);
  items.sort((a, b) => (y(b.year) - y(a.year)) || a.title.localeCompare(b.title));
  return items;
}
