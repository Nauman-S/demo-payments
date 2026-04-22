<script lang="ts">
  import type { Bundle } from "./products";
  import { formatUSD, perCredit } from "./products";
  import { startCheckout } from "./api";

  let { bundle, userId }: { bundle: Bundle; userId: string } = $props();

  let loading = $state(false);
  let error = $state<string | null>(null);

  async function onBuy() {
    loading = true;
    error = null;
    try {
      const { checkout_url } = await startCheckout(bundle, userId);
      window.location.href = checkout_url;
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      loading = false;
    }
  }
</script>

<div
  class="relative flex flex-col rounded-2xl border bg-[linear-gradient(180deg,_rgba(17,22,18,0.96),_rgba(8,10,8,0.98))] p-7 transition duration-200 {bundle.highlight
    ? 'border-[#44d62c] shadow-[0_0_32px_rgba(68,214,44,0.12)] hover:shadow-[0_0_40px_rgba(68,214,44,0.18)]'
    : 'border-[#1a251a] hover:border-[#2b462b]'}"
>
  {#if bundle.highlight}
    <span
      class="absolute -top-2.5 left-6 rounded-full bg-[#44d62c] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-black shadow-[0_0_18px_rgba(68,214,44,0.45)]"
    >
      Popular
    </span>
  {/if}

  <h3 class="text-sm font-medium uppercase tracking-[0.18em] text-[#93a591]">
    {bundle.name}
  </h3>

  <div class="mt-3 flex items-baseline gap-1.5">
    <span
      class="text-[40px] font-bold leading-none tracking-tight text-[#f4fff0]"
    >
      {formatUSD(bundle.amountCents)}
    </span>
    <span class="text-sm text-[#6c846c]">
      {bundle.currency.toUpperCase()}
    </span>
  </div>
  <p class="mt-1 text-xs text-[#6e816f]">
    {perCredit(bundle.amountCents, bundle.credits)}
  </p>

  <div class="my-6 h-px bg-[#162116]"></div>

  <p class="text-[15px] font-semibold text-[#efffeb]">
    {bundle.credits.toLocaleString()} credits
  </p>
  <p class="mt-2 grow text-sm leading-relaxed text-[#8ca08b]">
    {bundle.tagline}
  </p>

  <button
    onclick={onBuy}
    disabled={loading}
    class="mt-6 rounded-full py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed {bundle.highlight
      ? 'bg-[#44d62c] text-black hover:bg-[#6fff58] hover:shadow-[0_0_24px_rgba(68,214,44,0.28)] disabled:bg-[#284126] disabled:text-[#7fa27a]'
      : 'border border-[#315332] text-[#d7f7d2] hover:border-[#44d62c] hover:text-[#f3fff0] disabled:border-[#1a251b] disabled:text-[#577057]'}"
  >
    {loading ? "Redirecting…" : "Buy credits"}
  </button>

  {#if error}
    <p class="mt-3 text-xs text-[#ff7d7d]">{error}</p>
  {/if}
</div>
