export type Bundle = {
  id: string;
  name: string;
  credits: number;
  amountCents: number;
  currency: string;
  tagline: string;
  highlight?: boolean;
};

// Edit this list to change the pricing page. Amounts are in the smallest
// currency unit (cents for USD). The `service` is fixed at the app level.
export const SERVICE = "barber-service";

export const BUNDLES: Bundle[] = [
  {
    id: "credits-100",
    name: "Starter",
    credits: 100,
    amountCents: 1000,
    currency: "usd",
    tagline: "Kick the tires. Perfect for small teams trialing QA automation.",
  },
  {
    id: "credits-500",
    name: "Pro",
    credits: 500,
    amountCents: 4500,
    currency: "usd",
    tagline: "Most popular. 10% savings vs. Starter, good for sustained workloads.",
    highlight: true,
  },
  {
    id: "credits-2000",
    name: "Scale",
    credits: 2000,
    amountCents: 14900,
    currency: "usd",
    tagline: "For heavy users. Best per-credit rate.",
  },
];

export const formatUSD = (cents: number) =>
  `$${(cents / 100).toFixed(2).replace(/\.00$/, "")}`;

export const perCredit = (cents: number, credits: number) =>
  `${(cents / credits).toFixed(2)}¢/credit`;
