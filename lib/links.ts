// Single source of truth for outbound destinations.
export const links = {
  whatnot: "https://www.whatnot.com/user/hobbyboyzholdings",
  x: "https://x.com/HobbyBoyz_",
  youtube: "https://www.youtube.com/@HobbyBoyz",
  ebay: "https://www.ebay.com/usr/hobbyboyz-llc",
} as const;

// Anchor targets used by the header nav.
export const nav = [
  { label: "About", href: "#about" },
  { label: "Breaks", href: "#breaks" },
  { label: "Live", href: "#live" },
] as const;
