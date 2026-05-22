import { Link } from "react-router-dom";
import futureXPrivacyPdf from "../assets/FutureX_Privacy_Policy.pdf";

export default function PrivacyPolicy() {
  return (
    <section
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(180deg,#071a11,#030c07)" }}
    >
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-6 sm:pt-28">
        <Link
          to="/"
          className="text-sm hover:underline"
          style={{ color: "rgba(0,200,150,.9)" }}
        >
          ← Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
          FutureX Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-white/55">
          Full policy (PDF).{" "}
          <a
            href={futureXPrivacyPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline decoration-white/30 underline-offset-2 hover:decoration-current"
            style={{ color: "rgba(0,200,150,.95)" }}
          >
            Open or download
          </a>
        </p>
      </div>
      <div className="mx-auto max-w-[min(100%,1200px)] px-4 pb-16">
        <iframe
          title="FutureX Privacy Policy"
          src={`${futureXPrivacyPdf}#view=FitH`}
          className="h-[calc(100vh-14rem)] min-h-[480px] w-full rounded-xl border shadow-lg"
          style={{
            borderColor: "rgba(0,200,150,.2)",
            boxShadow: "0 24px 80px -30px rgba(0,0,0,.75)",
          }}
        />
      </div>
    </section>
  );
}
