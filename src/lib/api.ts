import type { Bundle } from "./products";
import { SERVICE } from "./products";

export type CheckoutResponse = {
  checkout_url: string;
  session_id: string;
  order_id: string;
};

export async function startCheckout(
  bundle: Bundle,
  userId: string,
): Promise<CheckoutResponse> {
  const origin = window.location.origin;
  const res = await fetch("/demo/api/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      service: SERVICE,
      product_id: bundle.id,
      credits: bundle.credits,
      amount: bundle.amountCents,
      currency: bundle.currency,
      client_reference_id: userId,
      success_url: `${origin}/demo/?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/demo/?status=cancel`,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`checkout failed (${res.status}): ${body}`);
  }

  return res.json();
}
