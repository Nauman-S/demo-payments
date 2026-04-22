import { useState } from "react";
import type { Bundle } from "../lib/products";
import { formatUSD, perCredit } from "../lib/products";
import { startCheckout } from "../lib/api";

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onBuy = async () => {
    setLoading(true);
    setError(null);
    try {
      const { checkout_url } = await startCheckout(bundle);
      window.location.href = checkout_url;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setLoading(false);
    }
  };

  const ring = bundle.highlight
    ? "ring-2 ring-indigo-400/70 shadow-indigo-500/20"
    : "ring-1 ring-white/10";

  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-white/5 p-8 backdrop-blur ${ring} shadow-xl transition hover:scale-[1.02] hover:bg-white/[0.08]`}
    >
      {bundle.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          Most popular
        </span>
      )}

      <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
        {bundle.name}
      </h3>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-5xl font-bold text-white">
          {formatUSD(bundle.amountCents)}
        </span>
        <span className="text-sm text-slate-400">
          {bundle.currency.toUpperCase()}
        </span>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        {perCredit(bundle.amountCents, bundle.credits)}
      </p>
      <p className="mt-6 text-3xl font-semibold text-white">
        {bundle.credits.toLocaleString()}
        <span className="ml-2 text-base font-normal text-slate-400">
          credits
        </span>
      </p>
      <p className="mt-4 grow text-sm leading-relaxed text-slate-400">
        {bundle.tagline}
      </p>

      <button
        onClick={onBuy}
        disabled={loading}
        className={`mt-8 rounded-lg px-4 py-3 text-sm font-semibold transition ${
          bundle.highlight
            ? "bg-indigo-500 text-white hover:bg-indigo-400 disabled:bg-indigo-500/50"
            : "bg-white text-slate-900 hover:bg-slate-200 disabled:bg-slate-400"
        } disabled:cursor-not-allowed`}
      >
        {loading ? "Redirecting…" : `Buy ${bundle.credits} credits`}
      </button>

      {error && (
        <p className="mt-3 text-xs text-rose-400">{error}</p>
      )}
    </div>
  );
}
