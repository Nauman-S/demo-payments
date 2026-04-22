<script lang="ts">
  import { toUserId, storeUser } from "./auth";

  let { onLogin }: { onLogin: (userId: string) => void } = $props();

  let handle = $state("");
  let submitting = $state(false);

  function submit(e: SubmitEvent) {
    e.preventDefault();
    if (!handle.trim()) return;
    submitting = true;
    const id = toUserId(handle);
    storeUser(id);
    onLogin(id);
  }
</script>

<div
  class="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(68,214,44,0.14),_transparent_24%),linear-gradient(180deg,_#050706_0%,_#040504_100%)] px-6"
>
  <div class="w-full max-w-sm">
    <div class="mb-10 flex flex-col items-center">
      <div
        class="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#2d5f2f] bg-[#0b120c] shadow-[0_0_22px_rgba(68,214,44,0.18)]"
      >
        <svg
          viewBox="0 0 24 24"
          class="h-7 w-7 fill-[#44d62c]"
          aria-hidden="true"
        >
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      </div>
      <p class="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#44d62c]">
        Demo Access
      </p>
      <h1 class="text-center text-[32px] font-bold leading-tight text-[#f3fff0]">
        Sign in to QA Credits
      </h1>
      <p class="mt-2 text-center text-sm text-[#879b86]">
        Demo — any handle works. No password.
      </p>
    </div>

    <form
      onsubmit={submit}
      class="space-y-3 rounded-3xl border border-[#182419] bg-[linear-gradient(180deg,_rgba(15,19,15,0.96),_rgba(7,9,7,0.98))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
    >
      <label class="block">
        <span class="sr-only">Username</span>
        <input
          type="text"
          bind:value={handle}
          placeholder="Username"
          autocomplete="off"
          spellcheck="false"
          class="w-full rounded-2xl border border-[#1f311f] bg-[#090d09] px-4 py-3.5 text-[15px] text-[#f3fff0] placeholder:text-[#5f725f] focus:border-[#44d62c] focus:outline-none focus:ring-2 focus:ring-[#44d62c]/20"
        />
      </label>

      <button
        type="submit"
        disabled={!handle.trim() || submitting}
        class="w-full rounded-full bg-[#44d62c] py-3 text-[15px] font-semibold text-black transition hover:bg-[#6fff58] hover:shadow-[0_0_26px_rgba(68,214,44,0.3)] disabled:cursor-not-allowed disabled:bg-[#274026] disabled:text-[#769071]"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>
    </form>

    {#if handle.trim()}
      <p class="mt-6 text-center text-xs text-[#617460]">
        You'll sign in as
        <code class="text-[#9fe691]">{toUserId(handle)}</code>
      </p>
    {/if}
  </div>
</div>
