const KEY = "demo_user_id";

// Format: razer_user_<sanitized-handle>
export function toUserId(raw: string): string {
  const clean = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return `razer_user_${clean || "anon"}`;
}

export function loadUser(): string | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(KEY);
}

export function storeUser(id: string): void {
  localStorage.setItem(KEY, id);
}

export function clearUser(): void {
  localStorage.removeItem(KEY);
}
