// src/api/localEvents.js
import raw from "../data/events.json";

// ---- helpers ---------------------------------------------------------------
const cleanStr = (v) => (typeof v === "string" ? v.trim() : v ?? "");
const asLower = (v, d = "event") => cleanStr(v || d).toLowerCase();
const normUrl = (u) => {
  const s = cleanStr(u);
  if (!s) return "";
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
};
const parseDate = (v) => {
  if (!v) return { ts: null, iso: null };
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return { ts: null, iso: null };
  return { ts: d.getTime(), iso: d.toISOString() };
};

const makeId = (title, iso) => {
  const slug = cleanStr(title || "event")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return `${slug}-${iso ? iso.slice(0, 10) : "nodate"}`;
};

// ---- normalization ---------------------------------------------------------
function normalize(e) {
  const { ts, iso } = parseDate(e.date || e.start_date);
  return {
    id: e.id || makeId(e.title, iso),
    title: cleanStr(e.title),
    description: cleanStr(e.description),
    event_name: cleanStr(e.event_name || e.name),
    type: asLower(e.type, "event"),            // e.g., "keynote" | "panel" | "podcast"
    date: iso,                                 // ISO string or null
    date_ts: ts,                               // timestamp or null
    location: cleanStr(e.location),
    audience_size: e.audience_size ?? null,
    video_url: normUrl(e.video_url || e.link_url),
  };
}

// ---- public API ------------------------------------------------------------
/** Return all events, newest first (null dates last). */
export function getEvents() {
  const items = (raw ?? []).map(normalize);
  items.sort((a, b) => {
    const ta = a.date_ts ?? 0;
    const tb = b.date_ts ?? 0;
    if (tb !== ta) return tb - ta;
    return a.title.localeCompare(b.title);
  });
  return items;
}

/** Convenience filter if you ever need it (e.g., "keynote"). */
export function getEventsByType(type) {
  const t = String(type || "").toLowerCase();
  return getEvents().filter((e) => e.type === t);
}

/** Split into upcoming vs past using local time "now". */
export function splitUpcomingPast(now = Date.now()) {
  const all = getEvents();
  const upcoming = all.filter((e) => (e.date_ts ?? 0) >= now);
  const past = all.filter((e) => (e.date_ts ?? 0) < now);
  return { upcoming, past };
}
