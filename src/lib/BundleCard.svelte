<script lang="ts">
  import type { Bundle } from "./products";
  import { formatUSD, perCredit } from "./products";
  import { startCheckout } from "./api";

  let { bundle }: { bundle: Bundle } = $props();

  let loading = $state(false);
  let error = $state<string | null>(null);

  async function onBuy() {
    loading = true;
    error = null;
    try {
      const { checkout_url } = await startCheckout(bundle);
      window.location.href = checkout_url;
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      loading = false;
    }
  }

  const ring = $derived(
    bundle.highlight
      ? "ring-2 ring-indigo-400/70 shadow-indigo-500/20"
      : "ring-1 ring-white/10",
  );
</script>

<div
  class="relative flex flex-col rounded-2xl bg-white/5 p-8 backdrop-blur {ring} shadow-xl transition hover:scale-[1.02] hover:bg-white/[0.08]"
>
  {#if bundle.highlight}
    <span
      class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
    >
      Most popular
    </span>
  {/if}

  <h3 class="text-sm font-semibold uppercase tracking-wider text-indigo-300">
    {bundle.name}
  </h3>
  <div class="mt-4 flex items-baseline gap-2">
    <span class="text-5xl font-bold text-white">
      {formatUSD(bundle.amountCents)}
    </span>
    <span class="text-sm text-slate-400">
      {bundle.currency.toUpperCase()}
    </span>
  </div>
  <p class="mt-1 text-sm text-slate-500">
    {perCredit(bundle.amountCents, bundle.credits)}
  </p>
  <p class="mt-6 text-3xl font-semibold text-white">
    {bundle.credits.toLocaleString()}
    <span class="ml-2 text-base font-normal text-slate-400">credits</span>
  </p>
  <p class="mt-4 grow text-sm leading-relaxed text-slate-400">
    {bundle.tagline}
  </p>

  <button
    onclick={onBuy}
    disabled={loading}
    class="mt-8 rounded-lg px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed {bundle.highlight
      ? 'bg-indigo-500 text-white hover:bg-indigo-400 disabled:bg-indigo-500/50'
      : 'bg-white text-slate-900 hover:bg-slate-200 disabled:bg-slate-400'}"
  >
    {loading ? "Redirecting…" : `Buy ${bundle.credits} credits`}
  </button>

  {#if error}
    <p class="mt-3 text-xs text-rose-400">{error}</p>
  {/if}
</div>
