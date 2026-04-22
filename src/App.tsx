import { BundleCard } from "./components/BundleCard";
import { BUNDLES } from "./lib/products";

export function App() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <header className="mx-auto max-w-6xl px-6 pt-16 pb-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
          Razer · QA Service
        </p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Top up your QA credits
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
          Credits power every QA run. Pick a bundle, pay with any major card,
          and we'll load your balance the moment Stripe confirms.
        </p>
      </header>

      {status === "success" && (
        <div className="mx-auto mb-6 max-w-2xl rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
          Payment confirmed. Your credits are on the way — you can close this
          tab or buy more below.
        </div>
      )}
      {status === "cancel" && (
        <div className="mx-auto mb-6 max-w-2xl rounded-lg border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
          Checkout cancelled. No charge was made.
        </div>
      )}

      <main className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {BUNDLES.map((b) => (
          <BundleCard key={b.id} bundle={b} />
        ))}
      </main>

      <footer className="border-t border-white/5 px-6 py-8 text-center text-xs text-slate-500">
        Payments processed by Stripe. Service:{" "}
        <code className="text-slate-400">barber-service</code>
      </footer>
    </div>
  );
}
