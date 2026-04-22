import { useEffect, useMemo, useRef, useState } from "react";
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
import { LIVE_SESSION_GALLERY, LIVE_SESSION_IMAGES } from "../assets/summer-sessions/images.js";

const PAYMENT_URL = __RAZORPAY_URL__;

function trackLiveWebinarPaymentClick() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "InitiateCheckout", {
      value: 99,
      currency: "INR",
      content_name: "Live Webinar Seat",
    });
  }
}

/** slice(4) is 7 URLs; last repeats ss10 for layout parity; investment banner uses gallery.wide */
const [heroWorkshopA, heroWorkshopB, problemWorkshop, agendaWorkshop, ferrariWorkshop, sessionWorkshop, whyWorkshop] =
  LIVE_SESSION_IMAGES.slice(4);
const investWorkshop = LIVE_SESSION_GALLERY.wide;

const GREEN = "#0d9f72";
const GREEN_DIM = "#0a7a58";
const GOLD = "#d4af37";
const GOLD_SOFT = "#c9a84c";
const BG = "#030303";
const CARD = "#121212";
const MUTED = "#9ca3af";

const SEATS_TAKEN = 148;
const SEATS_TOTAL = 200;

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setShow(true);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[820ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: show ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function WebinarPhoto({ src, alt, className, imgClassName = "" }) {
  if (!src) return null;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

function AmbientMesh() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden motion-reduce:hidden"
      aria-hidden
    >
      <div
        className="absolute -top-[20%] left-[10%] h-[min(90vw,560px)] w-[min(90vw,560px)] rounded-full bg-emerald-600/25 blur-[120px] animate-fxFloat"
        style={{ animationDuration: "24s" }}
      />
      <div
        className="absolute bottom-[-10%] right-[5%] h-[min(75vw,480px)] w-[min(75vw,480px)] rounded-full bg-amber-500/20 blur-[100px] animate-fxFloat"
        style={{ animationDuration: "18s", animationDelay: "-4s" }}
      />
      <div className="absolute left-1/2 top-1/3 h-[40vh] w-[60vw] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[90px] animate-fxGlowPulse" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(13,159,114,0.12),transparent)]" />
    </div>
  );
}

function SeatBar() {
  const pct = (SEATS_TAKEN / SEATS_TOTAL) * 100;
  const [fill, setFill] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setFill(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/[0.06]">
        <div
          className="h-full rounded-full transition-[width] duration-[1.8s] ease-out motion-reduce:transition-none"
          style={{
            width: fill ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${GREEN}, ${GOLD_SOFT})`,
            boxShadow: "0 0 24px rgba(13,159,114,0.45)",
          }}
        />
      </div>
      <p className="mt-3 text-center text-sm text-white/90">
        <span className="font-semibold text-white">{SEATS_TAKEN}</span>
        <span className="mx-1" style={{ color: GOLD }}>
          of {SEATS_TOTAL}
        </span>
        <span className="text-white/80">seats taken</span>
      </p>
    </div>
  );
}

function PrimaryCta({ children, href, className = "", onClick }) {
  const sharedClass = `group relative w-full min-w-[280px] overflow-hidden rounded-xl px-8 py-4 text-center text-base font-semibold text-white no-underline shadow-lg transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_14px_48px_rgba(13,159,114,0.42)] active:scale-[0.98] motion-reduce:transition-colors sm:w-auto inline-flex items-center justify-center gap-2 ${className}`;
  const style = {
    background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DIM} 100%)`,
    boxShadow: "0 8px 32px rgba(13,159,114,0.35)",
  };
  if (href) {
    return (
      <a href={href} rel="noopener noreferrer" className={sharedClass} style={style} onClick={onClick}>
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-500 group-hover:translate-x-full group-hover:opacity-100 motion-reduce:hidden"
          aria-hidden
        />
      </a>
    );
  }
  return (
    <span className={`${sharedClass} cursor-not-allowed opacity-40`} style={style}>
      {children}
    </span>
  );
}

function GoldCta({ children, href, className = "", onClick }) {
  const base =
    `rounded-xl px-4 py-2 text-sm font-semibold text-black no-underline transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_10px_36px_rgba(212,175,55,0.35)] active:scale-[0.98] motion-reduce:transition-colors inline-flex items-center justify-center ${className}`;
  if (!href) {
    return (
      <span className={`${base} cursor-not-allowed opacity-40`} style={{ background: GOLD }}>
        {children}
      </span>
    );
  }
  return (
    <a href={href} rel="noopener noreferrer" className={base} style={{ background: GOLD }} onClick={onClick}>
      {children}
    </a>
  );
}

export default function LiveWebinar() {
  const [navSolid, setNavSolid] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: "Live Webinar",
        content_category: "webinar",
      });
    }
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
    <div className="relative min-h-screen overflow-x-hidden text-white" style={{ backgroundColor: BG }}>
      <AmbientMesh />

      <style>{`
        .fx-head { font-family: ui-sans-serif, system-ui, "Segoe UI", Inter, sans-serif; letter-spacing: -0.02em; }
        .fx-overline { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; }
        @keyframes fxHeroIn {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fx-hero-stagger { opacity: 0; animation: fxHeroIn 0.88s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .fx-hero-stagger { opacity: 1; animation: none; transform: none; }
        }
      `}</style>

      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ${
          navSolid ? "border-white/10 bg-black/80 shadow-lg shadow-black/40" : "border-transparent bg-black/40"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="fx-head text-xl font-black tracking-tight transition-transform duration-300 hover:scale-[1.02]">
            Future<span style={{ color: GOLD }}>X</span>
          </span>
          <GoldCta href={PAYMENT_URL || undefined} onClick={PAYMENT_URL ? trackLiveWebinarPaymentClick : undefined}>
            Reserve Seat — ₹99
          </GoldCta>
        </div>
      </header>

      {!PAYMENT_URL ? (
        <div
          className="animate-fadeIn mx-auto max-w-6xl px-4 py-2 text-center text-sm motion-reduce:animate-none"
          style={{ background: "rgba(220,38,38,0.12)", color: "#fca5a5" }}
        >
          Set <code className="text-white/90">RAZORPAY_URL</code> in{" "}
          <code className="text-white/90">lyfshilp-frontend/.env</code> and restart the dev server so reserve
          links work.
        </div>
      ) : null}

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-4xl px-4 pb-20 pt-16 text-center">
        <div
          className="fx-hero-stagger mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_24px_rgba(13,159,114,0.2)]"
          style={{ borderColor: `${GREEN}55`, color: GREEN, animationDelay: "0ms" }}
        >
          <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: GREEN }} />
          <span className="text-sm font-medium">Live Session — Limited Seats</span>
        </div>
        <h1
          className="fx-head fx-hero-stagger mb-6 text-4xl font-black leading-tight sm:text-5xl md:text-6xl"
          style={{ animationDelay: "90ms" }}
        >
          Everyone Uses AI.
          <br />
          Almost Nobody Uses It <span style={{ color: GOLD }}>Right.</span>
        </h1>
        <p
          className="fx-hero-stagger mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl"
          style={{ animationDelay: "180ms" }}
        >
          Join one live 90-minute session and leave with a{" "}
          <strong className="text-white">real AI-built project</strong> — plus the exact map to build your own{" "}
          <strong className="text-white">business and brand using AI.</strong>
        </p>
        <div
          className="fx-hero-stagger mb-8 flex flex-wrap items-center justify-center gap-3 text-lg"
          style={{ animationDelay: "260ms" }}
        >
          <span className="line-through text-white/40 transition-colors hover:text-white/55">₹499</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" style={{ color: GREEN }} />
          <span className="text-3xl font-black sm:text-4xl" style={{ color: GOLD }}>
            ₹99
          </span>
          <span className="text-base text-white/60">only</span>
        </div>
        <div
          className="fx-hero-stagger mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "340ms" }}
        >
          <PrimaryCta href={PAYMENT_URL} onClick={trackLiveWebinarPaymentClick}>
            Reserve My Seat for ₹99
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </PrimaryCta>
        </div>
        <div
          className="fx-hero-stagger mb-12 flex flex-wrap justify-center gap-8 text-sm motion-reduce:mb-12"
          style={{ color: MUTED, animationDelay: "420ms" }}
        >
          {[
            { Icon: Lock, label: "Secure Payment" },
            { Icon: Smartphone, label: "WhatsApp Confirmation" },
            { Icon: Clock, label: "90 Min Live Session" },
          ].map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 transition-all duration-300 hover:scale-105"
              style={{ color: GREEN }}
            >
              <Icon className="h-4 w-4 opacity-90" /> {label}
            </span>
          ))}
        </div>
        <div className="fx-hero-stagger" style={{ animationDelay: "500ms" }}>
          <SeatBar />
        </div>
        <div
          className="fx-hero-stagger mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2"
          style={{ animationDelay: "560ms" }}
        >
          <div className="group/hp relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_40px_-8px_rgba(13,159,114,0.25)]">
            <WebinarPhoto
              src={heroWorkshopA}
              alt="Students in a FutureX workshop session"
              className="h-full w-full"
              imgClassName="min-h-full transition-transform duration-700 group-hover/hp:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-emerald-950/20" />
          </div>
          <div className="group/hp relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-all duration-500 hover:border-amber-500/25 hover:shadow-[0_0_40px_-8px_rgba(212,175,55,0.2)]">
            <WebinarPhoto
              src={heroWorkshopB}
              alt="Workshop activity at Lyfshilp Academy"
              className="h-full w-full"
              imgClassName="min-h-full transition-transform duration-700 group-hover/hp:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-black/50 via-transparent to-amber-950/15" />
          </div>
        </div>
      </section>

      {/* Problem + grid */}
      <section className="relative z-10 mx-auto max-w-6xl border-t border-white/5 px-4 py-20">
        <Reveal>
          <p className="fx-overline mb-4" style={{ color: GREEN }}>
            The problem
          </p>
          <h2 className="fx-head mb-4 max-w-4xl text-3xl font-black sm:text-4xl">
            Your child uses ChatGPT every day. Are they actually ahead – or just keeping up?
          </h2>
          <p className="mb-10 max-w-2xl text-lg text-white/55">
            There is a massive difference between using AI and commanding it. Almost every student is stuck at level
            one.
          </p>
        </Reveal>
        <Reveal delay={40}>
          <div className="group/pb relative mx-auto mb-14 aspect-[21/9] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.75)] transition-all duration-500 hover:border-white/20 sm:aspect-[2.4/1]">
            <WebinarPhoto
              src={problemWorkshop}
              alt="Students collaborating during a live AI workshop"
              className="absolute inset-0 h-full w-full min-h-full min-w-full"
              imgClassName="min-h-full min-w-full object-cover object-center transition-transform duration-700 group-hover/pb:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="grid gap-0 overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)] md:grid-cols-3">
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
            ].map((col, i) => (
              <div
                key={col.title}
                className={`group/col border-b border-white/10 p-6 transition-all duration-500 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 ${
                  col.tone === "highlight"
                    ? "bg-white/[0.05] md:hover:bg-white/[0.07]"
                    : "hover:bg-white/[0.02]"
                }`}
                style={{
                  transitionDelay: `${i * 40}ms`,
                }}
              >
                {col.tone === "highlight" ? (
                  <span
                    className="mb-3 inline-block rounded px-3 py-1 text-xs font-bold text-black shadow-md transition-transform duration-300 group-hover/col:scale-105"
                    style={{ background: GOLD }}
                  >
                    AFTER FUTUREX
                  </span>
                ) : null}
                <h3
                  className="mb-6 text-xs font-bold uppercase tracking-widest"
                  style={{ color: col.tone === "highlight" ? GOLD : MUTED }}
                >
                  {col.title}
                </h3>
                <ul className="space-y-4">
                  {col.items.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 text-sm leading-relaxed transition-colors duration-200 group-hover/col:text-white/90"
                      style={{ color: col.tone === "highlight" ? "rgba(255,255,255,0.92)" : MUTED }}
                    >
                      <span className="mt-0.5 shrink-0 transition-transform duration-200 group-hover/col:scale-110">
                        {col.icon === "x" ? <X className="h-4 w-4 text-white/35" /> : null}
                        {col.icon === "arrow" ? <span className="text-white/35">→</span> : null}
                        {col.icon === "check" ? <Check className="h-4 w-4" style={{ color: GREEN }} /> : null}
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-12 flex justify-center">
          <PrimaryCta href={PAYMENT_URL} onClick={trackLiveWebinarPaymentClick}>
            Reserve My Seat — ₹99
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </PrimaryCta>
        </Reveal>
      </section>

      {/* 90 minutes */}
      <section className="relative z-10 mx-auto max-w-6xl border-t border-white/5 px-4 py-20">
        <Reveal>
          <p className="fx-overline mb-4" style={{ color: GREEN }}>
            What happens in 90 minutes
          </p>
          <h2 className="fx-head mb-3 text-3xl font-black sm:text-4xl">You Will Leave With —</h2>
          <p className="mb-8 max-w-xl text-white/55">Not slides. Not theory. Real things you can use the same day.</p>
        </Reveal>
        <Reveal delay={40}>
          <div className="group/ag relative mx-auto mb-10 aspect-[2.2/1] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-all duration-500 hover:border-emerald-500/25 sm:aspect-[2.6/1]">
            <WebinarPhoto
              src={agendaWorkshop}
              alt="Live build session during the 90-minute FutureX workshop"
              className="absolute inset-0 h-full w-full min-h-full min-w-full"
              imgClassName="min-h-full min-w-full object-cover object-center transition-transform duration-700 group-hover/ag:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={60}>
          <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.75)]">
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
            ].map((row, idx) => (
              <div
                key={row.n}
                className="grid items-start gap-6 p-6 transition-colors duration-300 hover:bg-white/[0.04] sm:grid-cols-[auto_1fr] sm:p-8"
                style={{ background: CARD, transitionDelay: `${idx * 30}ms` }}
              >
                <span className="fx-head text-2xl font-black tabular-nums" style={{ color: GOLD }}>
                  {row.n}
                </span>
                <div>
                  <h3 className="mb-2 text-lg font-bold">{row.t}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{row.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={100} className="mt-12 flex justify-center">
          <PrimaryCta href={PAYMENT_URL} onClick={trackLiveWebinarPaymentClick}>
            Pay ₹99 &amp; Reserve — Razorpay
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </PrimaryCta>
        </Reveal>
      </section>

      {/* Gallery — full width, taller tiles */}
      <section className="relative z-10 mx-auto w-full max-w-6xl border-t border-white/5 px-4 py-20">
        <Reveal>
          <p className="fx-overline mb-4" style={{ color: GOLD }}>
            From our workshops
          </p>
          <h2 className="fx-head mb-3 text-3xl font-black sm:text-4xl">Students Who Already Made the Shift</h2>
          <p className="mb-10 text-white/55">Real sessions. Real students. Real projects.</p>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex w-full flex-col gap-3 md:gap-4">
            <div className="flex w-full flex-col gap-3 md:flex-row md:gap-4">
              <div className="group/g1 relative min-h-[220px] w-full flex-1 overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-all duration-500 hover:border-emerald-500/35 hover:shadow-[0_0_40px_-8px_rgba(13,159,114,0.25)] md:min-h-[320px]">
                <WebinarPhoto
                  src={LIVE_SESSION_GALLERY.main}
                  alt="Main workshop — group session with FutureX"
                  className="absolute inset-0 h-full w-full"
                  imgClassName="transition-transform duration-700 group-hover/g1:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="flex w-full shrink-0 flex-col gap-3 md:w-[min(40%,280px)] md:gap-4">
                <div className="group/g2 relative min-h-[120px] w-full flex-1 overflow-hidden rounded-2xl border border-white/10 shadow-md transition-all duration-500 hover:border-amber-500/35 hover:shadow-lg md:min-h-[152px]">
                  <WebinarPhoto
                    src={LIVE_SESSION_GALLERY.stackTop}
                    alt="Workshop student activity"
                    className="absolute inset-0 h-full w-full"
                    imgClassName="transition-transform duration-700 group-hover/g2:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="group/g3 relative min-h-[120px] w-full flex-1 overflow-hidden rounded-2xl border border-white/10 shadow-md transition-all duration-500 hover:border-amber-500/35 hover:shadow-lg md:min-h-[152px]">
                  <WebinarPhoto
                    src={LIVE_SESSION_GALLERY.stackBottom}
                    alt="Students working during the workshop"
                    className="absolute inset-0 h-full w-full"
                    imgClassName="transition-transform duration-700 group-hover/g3:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
              </div>
            </div>
            <div className="group/g4 relative min-h-[140px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-all duration-500 hover:border-emerald-500/35 hover:shadow-[0_0_36px_-6px_rgba(13,159,114,0.2)] sm:min-h-[180px]">
              <WebinarPhoto
                src={LIVE_SESSION_GALLERY.wide}
                alt="Wide workshop or classroom shot"
                className="absolute inset-0 h-full w-full"
                imgClassName="transition-transform duration-700 group-hover/g4:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/50" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={140} className="mt-10 flex justify-center">
          <GoldCta
            href={PAYMENT_URL || undefined}
            className="px-10 py-4 text-base font-semibold"
            onClick={PAYMENT_URL ? trackLiveWebinarPaymentClick : undefined}
          >
            Enroll Now — ₹99
          </GoldCta>
        </Reveal>
      </section>

      {/* Ferrari */}
      <section className="relative z-10 mx-auto mb-16 max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 px-4 py-16 text-center shadow-[0_24px_80px_-30px_rgba(0,0,0,0.9)] sm:mb-20 sm:py-20">
        <Reveal className="relative z-10">
          <div className="mx-auto mb-12 flex w-full max-w-[min(100%,320px)] justify-center sm:mb-14 sm:max-w-[min(100%,420px)] md:mb-16 md:max-w-[min(100%,520px)]">
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/15 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
              <WebinarPhoto
                src={ferrariWorkshop}
                alt=""
                className="aspect-[4/3] w-full"
                imgClassName="opacity-[0.88] motion-reduce:opacity-100"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
            </div>
          </div>
          <h2 className="fx-head mb-6 text-2xl font-black leading-snug sm:text-3xl md:text-4xl">
            You are sitting in a <span className="relative inline-block text-[1.05em]" style={{ color: GOLD }}>
              Ferrari.
              <span className="absolute -inset-1 -z-10 rounded-lg bg-amber-400/10 blur-md transition-opacity duration-500 hover:opacity-100" />
            </span>{" "}
            Using it to go to the grocery store. Every student around you is doing the same thing.
          </h2>
          <p className="mb-10 text-lg text-white/55">
            This session teaches you to shift gears — from passenger to driver, from user to commander.
          </p>
        </Reveal>
        <Reveal delay={100} className="relative z-10">
          <PrimaryCta href={PAYMENT_URL} onClick={trackLiveWebinarPaymentClick}>
            I Want to Shift Gears — ₹99
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </PrimaryCta>
        </Reveal>
      </section>

      {/* For / Skip */}
      <section className="relative z-10 mx-auto max-w-6xl border-t border-white/5 px-4 py-20">
        <Reveal>
          <h2 className="fx-head mb-10 text-center text-3xl font-black">This Session Is For —</h2>
        </Reveal>
        <Reveal delay={50}>
          <div className="group/sx relative mx-auto mb-12 aspect-[2.2/1] max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-xl transition-all duration-500 hover:border-white/20 sm:aspect-[2.5/1]">
            <WebinarPhoto
              src={sessionWorkshop}
              alt="FutureX session in progress"
              className="h-full w-full"
              imgClassName="min-h-[140px] transition-transform duration-700 group-hover/sx:scale-[1.03] sm:min-h-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
          </div>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal delay={40}>
            <div className="rounded-2xl border border-white/5 bg-black/20 p-6 transition-all duration-500 hover:border-emerald-500/25 hover:shadow-[0_0_48px_-12px_rgba(13,159,114,0.2)] md:p-8">
              <h3 className="mb-6 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>
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
                  <li
                    key={t}
                    className="flex gap-3 text-sm leading-relaxed transition-transform duration-200 hover:translate-x-1"
                    style={{ color: GREEN }}
                  >
                    <Check className="h-5 w-5 shrink-0" strokeWidth={2.5} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-white/5 bg-black/20 p-6 transition-all duration-500 hover:border-amber-500/20 hover:shadow-[0_0_40px_-12px_rgba(212,175,55,0.12)] md:p-8">
              <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/45">Skip this if</h3>
              <ul className="space-y-4">
                {[
                  "You want another online lecture to watch and forget",
                  "You are not willing to put in 90 focused minutes",
                  "You think AI is just a shortcut for homework",
                  "You are looking for magic — not a skill you have to practise",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex gap-3 text-sm leading-relaxed transition-transform duration-200 hover:translate-x-1"
                    style={{ color: GOLD_SOFT }}
                  >
                    <X className="h-5 w-5 shrink-0 opacity-80" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal delay={160} className="mt-12 flex justify-center">
          <PrimaryCta href={PAYMENT_URL} onClick={trackLiveWebinarPaymentClick}>
            Join Now — ₹99
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </PrimaryCta>
        </Reveal>
      </section>

      {/* Why not free */}
      <section className="relative z-10 mx-auto max-w-6xl border-t border-white/5 px-4 py-20">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <Reveal className="relative flex w-full max-w-md flex-col items-center justify-center gap-6 lg:w-1/3">
            <div className="group/wy relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 shadow-xl transition-all duration-500 hover:border-emerald-500/30 lg:max-w-none">
              <WebinarPhoto
                src={whyWorkshop}
                alt="Workshop moment — commitment and focus"
                className="h-full w-full"
                imgClassName="transition-transform duration-700 group-hover/wy:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            </div>
            <span
              className="pointer-events-none select-none text-[6rem] font-black italic leading-none opacity-[0.1] transition-all duration-700 motion-reduce:transition-none sm:text-[7rem] lg:hover:opacity-[0.16]"
              style={{ color: GREEN, fontFamily: "system-ui" }}
              aria-hidden
            >
              ₹99
            </span>
          </Reveal>
          <Reveal delay={80} className="flex-1 space-y-5">
            <p className="fx-overline" style={{ color: GREEN }}>
              Why not free?
            </p>
            <h2 className="fx-head text-3xl font-black sm:text-4xl">&quot;Why is it only ₹99?&quot;</h2>
            <p className="text-white/90">
              Because <strong>free sessions get ignored.</strong>
            </p>
            <p className="leading-relaxed text-white/65">
              ₹99 is not the price of this session. It is the price of your <strong className="text-white">commitment.</strong>{" "}
              We want students who will actually show up, build something, and do the work — not people who register and
              forget.
            </p>
            <p className="leading-relaxed text-white/65">
              <strong className="text-white">If you are serious about this, ₹99 is nothing.</strong> If you are not —
              this session is not for you.
            </p>
            <PrimaryCta href={PAYMENT_URL} onClick={trackLiveWebinarPaymentClick}>
              I&apos;m Serious — Pay ₹99
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </PrimaryCta>
          </Reveal>
        </div>
      </section>

      {/* Investment card */}
      <section className="relative z-10 mx-auto max-w-2xl border-t border-white/5 px-4 py-20">
        <Reveal>
          <p className="fx-overline mb-4 text-center" style={{ color: GOLD_SOFT }}>
            Your investment
          </p>
          <h2 className="fx-head mb-2 text-center text-3xl font-black">Everything You Get.</h2>
          <h2 className="fx-head mb-10 text-center text-3xl font-black">For ₹99.</h2>
        </Reveal>
        <Reveal delay={80}>
          <div
            className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_28px_80px_-24px_rgba(0,0,0,0.9)] transition-all duration-500 hover:border-white/15 hover:shadow-[0_32px_100px_-20px_rgba(13,159,114,0.18)]"
            style={{
              background: CARD,
              boxShadow: `inset 0 3px 0 0 ${GREEN}`,
            }}
          >
            <div className="group/inv relative aspect-[2.4/1] max-h-[220px] w-full border-b border-white/10 sm:max-h-[260px]">
              <WebinarPhoto
                src={investWorkshop}
                alt="Everything you get — live FutureX workshop"
                className="absolute inset-0 h-full w-full min-h-full min-w-full"
                imgClassName="min-h-full min-w-full object-cover object-center transition-transform duration-700 group-hover/inv:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
            </div>
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
                <li
                  key={label}
                  className="flex items-start gap-3 px-5 py-4 text-sm transition-colors duration-200 hover:bg-white/[0.03]"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: GREEN }} />
                  <span className="flex-1 text-white/90">{label}</span>
                  <span className="shrink-0 text-xs line-through text-white/35">{strike}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 px-6 py-8 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-white/50">Total value</p>
              <p className="mb-2 text-4xl font-black tabular-nums motion-safe:animate-fxTick" style={{ color: GOLD }}>
                ₹99
              </p>
              <p className="mb-8 text-sm text-white/50">
                Regular Price: <span className="line-through">₹499</span>
              </p>
              <a
                href={PAYMENT_URL || undefined}
                rel="noopener noreferrer"
                onClick={PAYMENT_URL ? trackLiveWebinarPaymentClick : undefined}
                className={`group mb-6 inline-flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold text-white no-underline transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(13,159,114,0.4)] active:scale-[0.98] motion-reduce:transition-colors ${
                  !PAYMENT_URL ? "pointer-events-none opacity-40" : ""
                }`}
                style={{ background: GREEN }}
              >
                Reserve My Seat — ₹99 Only
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <div className="flex flex-wrap justify-center gap-6 text-xs text-white/50">
                <span className="inline-flex items-center gap-1 transition-colors hover:text-white/70">
                  <Shield className="h-4 w-4" style={{ color: GREEN }} /> Secure via Razorpay
                </span>
                <span className="inline-flex items-center gap-1 transition-colors hover:text-white/70">
                  <Smartphone className="h-4 w-4" style={{ color: GREEN }} /> Instant WhatsApp Confirmation
                </span>
              </div>
              <p className="mt-4 text-xs text-white/45">✓ UPI · Card · Net Banking</p>
              <div className="mt-8">
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-[width] duration-[1.4s] ease-out"
                    style={{
                      width: `${((SEATS_TOTAL - 52) / SEATS_TOTAL) * 100}%`,
                      background: `linear-gradient(90deg, ${GREEN}, ${GOLD_SOFT})`,
                      boxShadow: "0 0 16px rgba(13,159,114,0.4)",
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-white/55">
                  <span style={{ color: GOLD }}>148 of 200</span> seats taken
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Closing */}
      <section className="relative z-10 mx-auto max-w-4xl border-t border-white/5 px-4 py-24 text-center">
        <Reveal>
          <div className="group/cl relative mx-auto mb-10 aspect-[2.4/1] max-w-3xl overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-all duration-500 hover:border-amber-500/25 sm:aspect-[2.6/1]">
            <WebinarPhoto
              src={heroWorkshopA}
              alt="Students who took the workshop"
              className="h-full w-full"
              imgClassName="min-h-[120px] transition-transform duration-700 group-hover/cl:scale-[1.03] sm:min-h-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/55" />
          </div>
          <h2 className="fx-head mb-6 text-2xl font-black leading-tight sm:text-3xl md:text-4xl">
            The students who act today will look back at this as{" "}
            <span style={{ color: GREEN }}>the moment everything changed.</span>
          </h2>
          <p className="mb-10 text-white/50">The ones who scroll past will still be in first gear.</p>
        </Reveal>
        <Reveal delay={60}>
          <div className="mb-10 flex justify-center gap-3 sm:gap-4">
            {[
              { v: countdown.h, l: "Hours" },
              { v: countdown.m, l: "Minutes" },
              { v: countdown.s, l: "Seconds" },
            ].map((u) => (
              <div
                key={u.l}
                className="min-w-[76px] rounded-xl border border-white/10 bg-[#141414] px-3 py-4 shadow-inner transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_0_28px_-6px_rgba(212,175,55,0.2)] sm:min-w-[88px]"
              >
                <div className="fx-head text-2xl font-black tabular-nums sm:text-3xl" style={{ color: GOLD }}>
                  {u.v}
                </div>
                <div className="mt-1 text-[0.65rem] uppercase tracking-widest text-white/40">{u.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <PrimaryCta href={PAYMENT_URL} onClick={trackLiveWebinarPaymentClick}>
            Reserve My Seat — ₹99 Only
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </PrimaryCta>
          <p className="mt-6 text-sm text-white/45">
            <span className="inline-flex items-center gap-1 transition-colors hover:text-amber-200/90" style={{ color: GOLD }}>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
              Only {SEATS_TOTAL - SEATS_TAKEN} seats remaining
            </span>
            <span className="text-white/40"> | Registration closes {closeDate}</span>
          </p>
        </Reveal>
      </section>

      <Reveal>
        <footer className="relative z-10 mx-auto max-w-6xl border-t border-white/5 px-4 py-12 text-center text-xs text-white/40">
          <p>
            © 2026 FutureX by Lyfshilp Academy ·{" "}
            <Link to="/termsconditions" className="underline transition-colors hover:text-white/70">
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link to="/contact" className="underline transition-colors hover:text-white/70">
              Contact Us
            </Link>
          </p>
          <p className="mt-2 transition-colors hover:text-white/55">Building AI Commanders, One Student at a Time.</p>
        </footer>
      </Reveal>
    </div>
  );
}
