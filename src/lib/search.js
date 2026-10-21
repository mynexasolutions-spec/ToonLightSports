import { products } from '../data/mockData';

const normalize = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Returns products ranked by relevance. Every word must match (name, category or id);
// if nothing matches that strictly, products matching any word are returned instead.
export function searchProducts(query, list = products) {
  const q = normalize(query);
  if (!q) return [];
  const words = q.split(' ');

  const scored = list.map((p) => {
    const name = normalize(p.name);
    const hay = `${name} ${normalize(p.category)} ${normalize(p.id)}`;
    const nameWords = name.split(' ');
    let matched = 0;
    let score = 0;
    for (const w of words) {
      if (!hay.includes(w)) continue;
      matched += 1;
      score += nameWords.some((nw) => nw.startsWith(w)) ? 12 : 5;
      if (name.includes(w)) score += 4;
    }
    if (name.startsWith(q)) score += 60;
    else if (name.includes(q)) score += 30;
    return { p, matched, score };
  });

  const all = scored.filter((s) => s.matched === words.length);
  const pool = all.length ? all : scored.filter((s) => s.matched > 0);
  return pool.sort((a, b) => b.score - a.score).map((s) => s.p);
}
