<script lang="ts">
  import { BUNDLES } from "./lib/products";
  import BundleCard from "./lib/BundleCard.svelte";

  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");
</script>

<div
  class="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white"
>
  <header class="mx-auto max-w-6xl px-6 pt-16 pb-8 text-center">
    <p
      class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300"
    >
      Razer · QA Service
    </p>
    <h1 class="text-5xl font-bold tracking-tight sm:text-6xl">
      Top up your QA credits
    </h1>
    <p class="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
      Credits power every QA run. Pick a bundle, pay with any major card, and
      we'll load your balance the moment Stripe confirms.
    </p>
  </header>

  {#if status === "success"}
    <div
      class="mx-auto mb-6 max-w-2xl rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200"
    >
      Payment confirmed. Your credits are on the way — you can close this tab
      or buy more below.
    </div>
  {:else if status === "cancel"}
    <div
      class="mx-auto mb-6 max-w-2xl rounded-lg border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-200"
    >
      Checkout cancelled. No charge was made.
    </div>
  {/if}

  <main
    class="mx-auto grid max-w-6xl gap-6 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-3"
  >
    {#each BUNDLES as bundle (bundle.id)}
      <BundleCard {bundle} />
    {/each}
  </main>

  <footer
    class="border-t border-white/5 px-6 py-8 text-center text-xs text-slate-500"
  >
    Payments processed by Stripe. Service: <code class="text-slate-400"
      >barber-service</code
    >
  </footer>
</div>
