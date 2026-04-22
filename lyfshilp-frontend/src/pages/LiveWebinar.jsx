import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Clock,
  Lock,
  Shield,
  Smartphone,
  X,
} from "lucide-react";

const PAYMENT_URL = __RAZORPAY_URL__;

const GREEN = "#0d9f72";
const GREEN_DIM = "#0a7a58";
const GOLD = "#d4af37";
const GOLD_SOFT = "#c9a84c";
const BG = "#030303";
const CARD = "#121212";
const MUTED = "#9ca3af";

const SEATS_TAKEN = 148;
const SEATS_TOTAL = 200;

function SeatBar() {
  const pct = (SEATS_TAKEN / SEATS_TOTAL) * 100;
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${GREEN}, ${GOLD_SOFT})`,
          }}
        />
      </div>
      <p className="mt-2 text-center text-sm text-white/90">
        <span className="text-white font-semibold">{SEATS_TAKEN}</span>
        <span className="mx-1" style={{ color: GOLD }}>
          of {SEATS_TOTAL}
        </span>
        <span className="text-white/80">seats taken</span>
      </p>
    </div>
  );
}

function PrimaryCta({ children, href, className = "" }) {
  const sharedClass = `w-full sm:w-auto min-w-[280px] px-8 py-4 rounded-lg font-semibold text-white shadow-lg transition hover:opacity-95 inline-flex items-center justify-center text-center no-underline ${className}`;
  const style = {
    background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DIM} 100%)`,
    boxShadow: `0 8px 32px rgba(13,159,114,0.35)`,
  };
  if (href) {
    return (
      <a href={href} rel="noopener noreferrer" className={sharedClass} style={style}>
        {children}
      </a>
    );
  }
  return (
    <span className={`${sharedClass} opacity-40 cursor-not-allowed`} style={style}>
      {children}
    </span>
  );
}

export default function LiveWebinar() {
  const closeDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, []);

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const countdown = useMemo(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    let diff = end.getTime() - now;
    if (diff < 0) diff = 0;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return {
      h: String(h).padStart(2, "0"),
      m: String(m).padStart(2, "0"),
      s: String(s).padStart(2, "0"),
    };
  }, [now]);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BG }}>
      <style>{`
        .fx-head { font-family: ui-sans-serif, system-ui, "Segoe UI", Inter, sans-serif; letter-spacing: -0.02em; }
        .fx-overline { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; }
      `}</style>

      {/* Nav */}
      <header
        className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md"
        style={{ background: "rgba(3,3,3,0.85)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="fx-head text-xl font-black tracking-tight">
            Future<span style={{ color: GOLD }}>X</span>
          </span>
          <a
            href={PAYMENT_URL || undefined}
            rel="noopener noreferrer"
            className={`text-sm font-semibold px-4 py-2 rounded-md text-black transition hover:brightness-110 no-underline inline-block ${!PAYMENT_URL ? "opacity-40 pointer-events-none" : ""}`}
            style={{ background: GOLD }}
          >
            Reserve Seat — ₹99
          </a>
        </div>
      </header>

      {!PAYMENT_URL ? (
        <div
          className="max-w-6xl mx-auto px-4 py-2 text-sm text-center"
          style={{ background: "rgba(220,38,38,0.12)", color: "#fca5a5" }}
        >
          Set <code className="text-white/90">RAZORPAY_URL</code> in{" "}
          <code className="text-white/90">lyfshilp-frontend/.env</code> and restart the dev server so
          reserve links work.
        </div>
      ) : null}

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-20 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded border mb-8"
          style={{ borderColor: `${GREEN}55`, color: GREEN }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN }} />
          <span className="text-sm font-medium">Live Session — Limited Seats</span>
        </div>
        <h1 className="fx-head text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
          Everyone Uses AI.
          <br />
          Almost Nobody Uses It{" "}
          <span style={{ color: GOLD }}>Right.</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join one live 90-minute session and leave with a{" "}
          <strong className="text-white">real AI-built project</strong> — plus the exact map to build your own{" "}
          <strong className="text-white">business and brand using AI.</strong>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-lg">
          <span className="line-through text-white/40">₹499</span>
          <ArrowRight className="w-5 h-5" style={{ color: GREEN }} />
          <span className="text-3xl sm:text-4xl font-black" style={{ color: GOLD }}>
            ₹99
          </span>
          <span className="text-white/60 text-base">only</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <PrimaryCta href={PAYMENT_URL}>Reserve My Seat for ₹99 →</PrimaryCta>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm mb-12" style={{ color: MUTED }}>
          <span className="inline-flex items-center gap-2" style={{ color: GREEN }}>
            <Lock className="w-4 h-4" /> Secure Payment
          </span>
          <span className="inline-flex items-center gap-2" style={{ color: GREEN }}>
            <Smartphone className="w-4 h-4" /> WhatsApp Confirmation
          </span>
          <span className="inline-flex items-center gap-2" style={{ color: GREEN }}>
            <Clock className="w-4 h-4" /> 90 Min Live Session
          </span>
        </div>
        <SeatBar />
      </section>

      {/* Problem + grid */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-t border-white/5">
        <p className="fx-overline mb-4" style={{ color: GREEN }}>
          The problem
        </p>
        <h2 className="fx-head text-3xl sm:text-4xl font-black max-w-4xl mb-4">
          Your child uses ChatGPT every day. Are they actually ahead – or just keeping up?
        </h2>
        <p className="text-white/55 max-w-2xl mb-14 text-lg">
          There is a massive difference between using AI and commanding it. Almost every student is stuck at level one.
        </p>
        <div className="grid md:grid-cols-3 gap-0 rounded-xl overflow-hidden border border-white/10">
          {[
            {
              title: "Most students",
              tone: "muted",
              items: [
                "Copy answers from AI and call it productivity",
                "Use ChatGPT in the most basic way possible",
                "Have no real project or proof of skill",
                "Stuck in first gear with no map forward",
              ],
              icon: "x",
            },
            {
              title: "Your child right now",
              tone: "muted",
              items: [
                "Uses AI daily but only at the surface level",
                "Knows AI matters but not what to do with it",
                "Curious but has no clear direction",
                "Sitting in a Ferrari. In first gear.",
              ],
              icon: "arrow",
            },
            {
              title: "After FutureX",
              tone: "highlight",
              items: [
                "Commands AI to build real things from scratch",
                "Has an actual AI project to show and share",
                "Knows the exact map to build a brand using AI",
                "Driving. At full speed. With a destination.",
              ],
              icon: "check",
            },
          ].map((col) => (
            <div
              key={col.title}
              className={`p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 ${
                col.tone === "highlight" ? "" : ""
              }`}
              style={{
                background: col.tone === "highlight" ? "rgba(255,255,255,0.04)" : "transparent",
              }}
            >
              {col.tone === "highlight" ? (
                <span
                  className="inline-block text-xs font-bold px-3 py-1 rounded mb-3 text-black"
                  style={{ background: GOLD }}
                >
                  AFTER FUTUREX
                </span>
              ) : null}
              <h3
                className="text-xs font-bold tracking-widest uppercase mb-6"
                style={{ color: col.tone === "highlight" ? GOLD : MUTED }}
              >
                {col.title}
              </h3>
              <ul className="space-y-4">
                {col.items.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed" style={{ color: col.tone === "highlight" ? "rgba(255,255,255,0.92)" : MUTED }}>
                    <span className="shrink-0 mt-0.5">
                      {col.icon === "x" ? <X className="w-4 h-4 text-white/35" /> : null}
                      {col.icon === "arrow" ? <span className="text-white/35">→</span> : null}
                      {col.icon === "check" ? <Check className="w-4 h-4" style={{ color: GREEN }} /> : null}
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <PrimaryCta href={PAYMENT_URL}>Reserve My Seat — ₹99 →</PrimaryCta>
        </div>
      </section>

      {/* 90 minutes */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-t border-white/5">
        <p className="fx-overline mb-4" style={{ color: GREEN }}>
          What happens in 90 minutes
        </p>
        <h2 className="fx-head text-3xl sm:text-4xl font-black mb-3">You Will Leave With —</h2>
        <p className="text-white/55 mb-12 max-w-xl">Not slides. Not theory. Real things you can use the same day.</p>
        <div className="rounded-xl border border-white/10 divide-y divide-white/10 overflow-hidden">
          {[
            {
              n: "01",
              t: "See the Gap Live — On Screen",
              d: "Watch the same task done by a basic AI user vs an AI commander. The difference is instant and shocking. You will never see ChatGPT the same way.",
            },
            {
              n: "02",
              t: "Build One Real AI Project — Live",
              d: "You build alongside us in real time. A portfolio page, a business pitch, a brand post series — something you made, not copied. Show it to your parents tonight.",
            },
            {
              n: "03",
              t: "The Map to Build Your Business and Brand",
              d: "The exact roadmap to go from AI user to AI commander — content, freelancing, digital products, personal brand. Specific steps. No vague advice.",
            },
            {
              n: "04",
              t: "Know Exactly Where to Start Tomorrow",
              d: "Most students finish a session excited and then do nothing. You will leave with one clear action for tomorrow morning. Not 10 things. One thing.",
            },
          ].map((row) => (
            <div key={row.n} className="grid sm:grid-cols-[auto_1fr] gap-6 p-6 sm:p-8 items-start" style={{ background: CARD }}>
              <span className="text-2xl font-black fx-head" style={{ color: GOLD }}>
                {row.n}
              </span>
              <div>
                <h3 className="font-bold text-lg mb-2">{row.t}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{row.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <PrimaryCta href={PAYMENT_URL}>Pay ₹99 &amp; Reserve — Razorpay</PrimaryCta>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-t border-white/5">
        <p className="fx-overline mb-4" style={{ color: GOLD }}>
          From our workshops
        </p>
        <h2 className="fx-head text-3xl sm:text-4xl font-black mb-3">Students Who Already Made the Shift</h2>
        <p className="text-white/55 mb-10">Real sessions. Real students. Real projects.</p>
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div
              className="flex-1 min-h-[220px] md:min-h-[320px] rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center p-6 text-center text-white/40 text-sm"
              style={{ background: "#0a0a0a" }}
            >
              Add your main workshop photo here (wide group or presenter)
              <span className="text-xs mt-2 opacity-60">Suggested: 800×600 or wider</span>
            </div>
            <div className="flex flex-col gap-3 md:gap-4 w-full md:w-[min(40%,280px)] shrink-0">
              <div
                className="flex-1 min-h-[120px] md:min-h-[152px] rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center p-4 text-center text-white/40 text-xs"
                style={{ background: "#0a0a0a" }}
              >
                Student activity — 400×300
              </div>
              <div
                className="flex-1 min-h-[120px] md:min-h-[152px] rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center p-4 text-center text-white/40 text-xs"
                style={{ background: "#0a0a0a" }}
              >
                Student on laptop — 400×300
              </div>
            </div>
          </div>
          <div
            className="min-h-[120px] rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center p-4 text-center text-white/40 text-sm"
            style={{ background: "#0a0a0a" }}
          >
            Wide group or classroom — 1200×400
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href={PAYMENT_URL || undefined}
            rel="noopener noreferrer"
            className={`px-10 py-4 rounded-lg font-semibold text-black transition hover:brightness-110 no-underline inline-flex items-center justify-center ${!PAYMENT_URL ? "opacity-40 pointer-events-none" : ""}`}
            style={{ background: GOLD }}
          >
            Enroll Now — ₹99
          </a>
        </div>
      </section>

      {/* Ferrari */}
      <section className="max-w-3xl mx-auto px-4 py-24 text-center border-t border-white/5">
        <h2 className="fx-head text-2xl sm:text-3xl md:text-4xl font-black leading-snug mb-6">
          You are sitting in a <span style={{ color: GOLD }}>Ferrari.</span> Using it to go to the grocery store. Every student around you is doing the same thing.
        </h2>
        <p className="text-white/55 text-lg mb-10">
          This session teaches you to shift gears — from passenger to driver, from user to commander.
        </p>
        <PrimaryCta href={PAYMENT_URL}>I Want to Shift Gears — ₹99 →</PrimaryCta>
      </section>

      {/* For / Skip */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-t border-white/5" style={{ background: "#0a0a0a" }}>
        <h2 className="fx-head text-3xl font-black text-center mb-12">This Session Is For —</h2>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: GREEN }}>
              You should join if
            </h3>
            <ul className="space-y-4">
              {[
                "You are in Class 9-12 and want to stand out from every other student",
                "You use ChatGPT but feel like you are only scratching the surface",
                "You want to build something real — not just consume theory",
                "You want to make money online but have no direction yet",
                "Your parents are worried you are wasting time — you want to prove them wrong",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed" style={{ color: GREEN }}>
                  <Check className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 text-white/45">
              Skip this if
            </h3>
            <ul className="space-y-4">
              {[
                "You want another online lecture to watch and forget",
                "You are not willing to put in 90 focused minutes",
                "You think AI is just a shortcut for homework",
                "You are looking for magic — not a skill you have to practise",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed" style={{ color: GOLD_SOFT }}>
                  <X className="w-5 h-5 shrink-0 opacity-80" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <PrimaryCta href={PAYMENT_URL}>Join Now — ₹99</PrimaryCta>
        </div>
      </section>

      {/* Why not free */}
      <section className="max-w-6xl mx-auto px-4 py-20 border-t border-white/5">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div
            className="relative w-full lg:w-1/3 flex justify-center select-none pointer-events-none"
            aria-hidden
          >
            <span
              className="text-[8rem] sm:text-[10rem] font-black italic leading-none opacity-[0.12]"
              style={{ color: GREEN, fontFamily: "system-ui" }}
            >
              ₹99
            </span>
          </div>
          <div className="flex-1 space-y-5">
            <p className="fx-overline" style={{ color: GREEN }}>
              Why not free?
            </p>
            <h2 className="fx-head text-3xl sm:text-4xl font-black">&quot;Why is it only ₹99?&quot;</h2>
            <p className="text-white/90">
              Because <strong>free sessions get ignored.</strong>
            </p>
            <p className="text-white/65 leading-relaxed">
              ₹99 is not the price of this session. It is the price of your <strong className="text-white">commitment.</strong>{" "}
              We want students who will actually show up, build something, and do the work — not people who register and forget.
            </p>
            <p className="text-white/65 leading-relaxed">
              <strong className="text-white">If you are serious about this, ₹99 is nothing.</strong> If you are not — this session is not for you.
            </p>
            <PrimaryCta href={PAYMENT_URL}>I&apos;m Serious — Pay ₹99</PrimaryCta>
          </div>
        </div>
      </section>

      {/* Investment card */}
      <section className="max-w-2xl mx-auto px-4 py-20 border-t border-white/5">
        <p className="fx-overline text-center mb-4" style={{ color: GOLD_SOFT }}>
          Your investment
        </p>
        <h2 className="fx-head text-3xl font-black text-center mb-2">Everything You Get.</h2>
        <h2 className="fx-head text-3xl font-black text-center mb-10">For ₹99.</h2>
        <div
          className="rounded-2xl border border-white/10 overflow-hidden"
          style={{
            background: CARD,
            boxShadow: `inset 0 3px 0 0 ${GREEN}`,
          }}
        >
          <ul className="divide-y divide-white/10">
            {[
              ["90-minute live session with FutureX", "₹600"],
              ["One real AI project built live by you", "₹500"],
              ["The business and brand map using AI", "₹600"],
              ["Session recording access for 48 hours", "₹300"],
              ["AI toolkit PDF + resource guide", "₹200"],
              ["WhatsApp community access", "₹200"],
              ["Exclusive webinar-only course offer", "Priceless"],
            ].map(([label, strike]) => (
              <li key={label} className="flex items-start gap-3 px-5 py-4 text-sm">
                <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: GREEN }} />
                <span className="flex-1 text-white/90">{label}</span>
                <span className="line-through text-white/35 text-xs shrink-0">{strike}</span>
              </li>
            ))}
          </ul>
          <div className="px-6 py-8 text-center border-t border-white/10">
            <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Total value</p>
            <p className="text-4xl font-black mb-2" style={{ color: GOLD }}>
              ₹99
            </p>
            <p className="text-sm text-white/50 mb-8">
              Regular Price: <span className="line-through">₹499</span>
            </p>
            <a
              href={PAYMENT_URL || undefined}
              rel="noopener noreferrer"
              className={`w-full py-4 rounded-lg font-semibold text-white mb-6 transition hover:opacity-95 no-underline inline-flex items-center justify-center ${!PAYMENT_URL ? "opacity-40 pointer-events-none" : ""}`}
              style={{ background: GREEN }}
            >
              Reserve My Seat — ₹99 Only →
            </a>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-white/50">
              <span className="inline-flex items-center gap-1">
                <Shield className="w-4 h-4" style={{ color: GREEN }} /> Secure via Razorpay
              </span>
              <span className="inline-flex items-center gap-1">
                <Smartphone className="w-4 h-4" style={{ color: GREEN }} /> Instant WhatsApp Confirmation
              </span>
            </div>
            <p className="mt-4 text-xs text-white/45">✓ UPI · Card · Net Banking</p>
            <div className="mt-8">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${((SEATS_TOTAL - 52) / SEATS_TOTAL) * 100}%`,
                    background: GREEN,
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-white/55">
                <span style={{ color: GOLD }}>148 of 200</span> seats taken
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center border-t border-white/5">
        <h2 className="fx-head text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-6">
          The students who act today will look back at this as{" "}
          <span style={{ color: GREEN }}>the moment everything changed.</span>
        </h2>
        <p className="text-white/50 mb-10">The ones who scroll past will still be in first gear.</p>
        <div className="flex justify-center gap-3 sm:gap-4 mb-10">
          {[
            { v: countdown.h, l: "Hours" },
            { v: countdown.m, l: "Minutes" },
            { v: countdown.s, l: "Seconds" },
          ].map((u) => (
            <div
              key={u.l}
              className="min-w-[76px] sm:min-w-[88px] rounded-lg px-3 py-4 border border-white/10"
              style={{ background: "#141414" }}
            >
              <div className="text-2xl sm:text-3xl font-black fx-head" style={{ color: GOLD }}>
                {u.v}
              </div>
              <div className="text-[0.65rem] uppercase tracking-widest text-white/40 mt-1">{u.l}</div>
            </div>
          ))}
        </div>
        <PrimaryCta href={PAYMENT_URL}>Reserve My Seat — ₹99 Only →</PrimaryCta>
        <p className="mt-6 text-sm text-white/45">
          <span className="inline-flex items-center gap-1" style={{ color: GOLD }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            Only {SEATS_TOTAL - SEATS_TAKEN} seats remaining
          </span>
          <span className="text-white/40"> | Registration closes {closeDate}</span>
        </p>
      </section>

      <footer className="max-w-6xl mx-auto px-4 py-12 text-center text-xs text-white/40 border-t border-white/5">
        <p>
          © 2026 FutureX by Lyfshilp Academy ·{" "}
          <Link to="/termsconditions" className="underline hover:text-white/60">
            Privacy Policy
          </Link>{" "}
          ·{" "}
          <Link to="/contact" className="underline hover:text-white/60">
            Contact Us
          </Link>
        </p>
        <p className="mt-2">Building AI Commanders, One Student at a Time.</p>
      </footer>
    </div>
  );
}
