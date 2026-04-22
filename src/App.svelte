<script lang="ts">
  import { BUNDLES } from "./lib/products";
  import BundleCard from "./lib/BundleCard.svelte";
  import LoginScreen from "./lib/LoginScreen.svelte";
  import { loadUser, clearUser } from "./lib/auth";

  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");

  let userId = $state<string | null>(loadUser());

  function onLogin(id: string) {
    userId = id;
  }

  function signOut() {
    clearUser();
    userId = null;
  }
</script>

{#if !userId}
  <LoginScreen {onLogin} />
{:else}
  <div class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(68,214,44,0.12),_transparent_26%),linear-gradient(180deg,_#060806_0%,_#040504_100%)] text-[var(--razer-text)]">
    <!-- Top bar -->
    <header
      class="sticky top-0 z-10 border-b border-[#18301a] bg-[#050706]/88 backdrop-blur"
    >
      <div
        class="mx-auto flex h-14 max-w-5xl items-center justify-between px-6"
      >
        <div class="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            class="h-5 w-5 fill-[#44d62c] drop-shadow-[0_0_10px_rgba(68,214,44,0.5)]"
            aria-hidden="true"
          >
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            />
          </svg>
          <span class="text-sm font-semibold tracking-[0.16em] text-[#d8ffd2] uppercase">
            QA Credits
          </span>
        </div>
        <div class="flex items-center gap-3">
          <span class="hidden text-xs text-[#7d947c] sm:inline">
            {userId}
          </span>
          <button
            onclick={signOut}
            class="rounded-full border border-[#245427] bg-[#0c120d] px-3 py-1 text-xs font-medium text-[#b7d5b2] transition hover:border-[#44d62c] hover:text-[#efffeb] hover:shadow-[0_0_16px_rgba(68,214,44,0.18)]"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
      <p class="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#44d62c]">
        For QA Teams. By Fast Releases.
      </p>
      <h1
        class="text-[48px] font-bold leading-[1.05] tracking-tight sm:text-[56px]"
      >
        Buy credits.<br />
        <span class="text-[#6fff58]">Pay once. Run more.</span>
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#92a791]">
        Credits power every QA run. Pick a bundle, pay with any major card, and
        we'll load your balance the moment Stripe confirms.
      </p>
    </section>

    <!-- Status banner -->
    {#if status === "success"}
      <div
        class="mx-auto mb-8 max-w-2xl rounded-xl border border-[#2ea81f] bg-[#0f1f10] px-5 py-3.5 text-sm text-[#b8ffad] shadow-[0_0_24px_rgba(68,214,44,0.12)]"
      >
        Payment confirmed. Your credits are on the way.
      </div>
    {:else if status === "cancel"}
      <div
        class="mx-auto mb-8 max-w-2xl rounded-xl border border-[#355437] bg-[#111712] px-5 py-3.5 text-sm text-[#b5c8b2]"
      >
        Checkout cancelled. No charge was made.
      </div>
    {/if}

    <!-- Pricing grid -->
    <main
      class="mx-auto grid max-w-5xl gap-4 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3"
    >
      {#each BUNDLES as bundle (bundle.id)}
        <BundleCard {bundle} {userId} />
      {/each}
    </main>

    <footer
      class="border-t border-[#132115] px-6 py-6 text-center text-xs text-[#657963]"
    >
      Payments processed by Stripe · Service
      <code class="ml-1 text-[#44d62c]">barber-service</code>
    </footer>
  </div>
{/if}
