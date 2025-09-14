// src/api/localExperience.js
import raw from "../data/experience.json";

// -------- helpers --------
const clean = (v) => (typeof v === "string" ? v.trim() : v ?? "");
const nOrNull = (v) => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};
const normUrl = (u) => {
  const s = clean(u);
  if (!s) return "";
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
};
const makeId = (title, company, start, end) =>
  [title || "role", company || "org", start || "start", end || "end"]
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

// Normalize one row from JSON into what the UI expects
function normalize(e) {
  const startYear = nOrNull(e.start_year ?? e.startYear ?? e.start);
  const endYear =
    e.end_year === "Present" || e.endYear === "Present"
      ? null
      : nOrNull(e.end_year ?? e.endYear ?? e.end);

  // Keep type in snake_case so your JSX `replace(/_/g, ' ')` works
  const typeRaw = clean(e.type);
  const typeSnake =
    typeRaw ? typeRaw.toLowerCase().replace(/\s+/g, "_") : "";

  return {
    id: e.id || makeId(e.title, e.company, startYear, endYear),
    title: clean(e.title),
    company: clean(e.company),
    description: clean(e.description),
    location: clean(e.location),
    logo_url: clean(e.logo_url || e.logoUrl || e.logo),
    website: normUrl(e.website || e.company_url || e.url),
    start_year: startYear,
    end_year: endYear, // null => Present
    type: typeSnake,
  };
}

/**
 * Return experiences sorted:
 * - Current (end_year=null) first
 * - Then by end_year desc
 * - Then by start_year desc
 */
export function getExperiences() {
  const items = (raw ?? []).map(normalize);
  items.sort((a, b) => {
    // current first
    if (a.end_year === null && b.end_year !== null) return -1;
    if (a.end_year !== null && b.end_year === null) return 1;

    // then by end year desc (nulls handled above)
    const de = (b.end_year ?? -Infinity) - (a.end_year ?? -Infinity);
    if (de) return de;

    // then by start year desc
    const ds = (b.start_year ?? -Infinity) - (a.start_year ?? -Infinity);
    if (ds) return ds;

    // finally by company/title to keep stable
    return (a.company + a.title).localeCompare(b.company + b.title);
  });
  return items;
}
