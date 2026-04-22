import Razorpay from "razorpay";

const AMOUNT_PAISE = 9900;

function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) return null;
  return new Razorpay({ key_id, key_secret });
}

export async function createWebinarOrder(req, res) {
  const rzp = getRazorpay();
  if (!rzp) {
    return res.status(503).json({
      error: "Payments are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
    });
  }
  try {
    const order = await rzp.orders.create({
      amount: AMOUNT_PAISE,
      currency: "INR",
      receipt: `fx_webinar_${Date.now()}`,
      notes: { product: "FutureX Live Webinar Seat" },
    });
    res.json({
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (e) {
    console.error("Razorpay order error:", e);
    res.status(502).json({
      error: e?.error?.description || e?.message || "Could not create order",
    });
  }
}
