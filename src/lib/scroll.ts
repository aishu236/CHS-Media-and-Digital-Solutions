const DEFAULT_HEADER_OFFSET = 80; // matches the fixed navbar height (h-20)

export function scrollToSection(
  id: string,
  options?: {
    offset?: number;
  },
): boolean {
  if (typeof window === "undefined") return false;

  const el = document.getElementById(id);
  if (!el) return false;

  const offset = options?.offset ?? DEFAULT_HEADER_OFFSET;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  return true;
}
