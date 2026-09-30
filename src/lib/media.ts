// Single source of truth for the "work image" used in the Hero → Services
// handoff, so both sections show the exact same photo — not two different
// ones — reinforcing that it's one continuous image, not a third unrelated
// visual appearing in Services.
export const WORK_IMG =
  'https://images.unsplash.com/photo-1611844327158-1b6c66bc402c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxkZXNpZ25lciUyMHdvcmtpbmclMjBsYXB0b3AlMjB3aXJlZnJhbWUlMjBwcm90b3R5cGUlMjBjcmVhdGl2ZXxlbnwxfHx8fDE3ODg1NDA5ODJ8MA&ixlib=rb-4.1.0&q=80&w=800'

// Inline SVG used as the placeholder when a remote thumbnail fails to load, so
// a blocked Unsplash request degrades to a themed gradient panel instead of a
// broken-image icon. Same 1400x900 ratio as the Unsplash URLs it replaces.
export function placeholderImage(accent = '#6347D8', id = 'g') {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">` +
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="#17152B"/><stop offset="100%" stop-color="#121116"/>` +
    `</linearGradient></defs>` +
    `<rect width="1400" height="900" fill="url(#${id})"/>` +
    `<circle cx="700" cy="450" r="200" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="2"/>` +
    `<circle cx="700" cy="450" r="8" fill="${accent}" fill-opacity="0.5"/>` +
    `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
