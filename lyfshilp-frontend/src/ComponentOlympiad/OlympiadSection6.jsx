import { useState, useEffect, useRef } from "react";
import api from "../api/axios.js";

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const inputStyle = {
  width: "100%", marginTop: 6, padding: "11px 14px",
  background: "rgba(255,255,255,.07)", border: "1px solid rgba(0,200,150,.22)",
  borderRadius: 10, color: "#fff", fontFamily: "'DM Sans',sans-serif",
  fontSize: ".88rem", outline: "none", boxSizing: "border-box",
  transition: "border-color .25s",
};

const labelStyle = {
  fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
  fontSize: ".82rem", color: "rgba(255,255,255,.75)",
};

export default function OlympiadSection6() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ schoolName: "", contactPerson: "", designation: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();

  const validateForm = () => {
    if (!form.schoolName.trim()) return "School Name is required";
    if (!form.contactPerson.trim()) return "Contact Person is required";
    if (!form.designation.trim()) return "Designation is required";
    if (!/^\d{10}$/.test(form.phone)) return "Phone number must be 10 digits";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email format";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contactPerson") setForm({ ...form, [name]: value.replace(/[^a-zA-Z\s]/g, "") });
    else if (name === "phone") setForm({ ...form, [name]: value.replace(/[^0-9]/g, "").slice(0, 10) });
    else if (name === "schoolName" || name === "designation") setForm({ ...form, [name]: value.replace(/[^a-zA-Z0-9\s.,-]/g, "") });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg(""); setError("");
    const validationError = validateForm();
    if (validationError) { setError(validationError); setLoading(false); return; }
    try {
      const res = await api.post("/partner-school/submit", form);
      if (res.data.success) {
        setMsg("Form submitted successfully!");
        setForm({ schoolName: "", contactPerson: "", designation: "", phone: "", email: "" });
        setTimeout(() => { setOpen(false); setMsg(""); }, 1500);
      }
    } catch { setMsg("Something went wrong. Try again."); setTimeout(() => setMsg(""), 2000); }
    setLoading(false);
  };

  return (
    <section style={{
      background: "#061510",
      padding: "88px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 50% 40%,rgba(0,200,150,.13),transparent 50%)",
      }} />

      {/* ── MODAL ── */}
      {open && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,.65)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16, zIndex: 999,
        }}>
          <div style={{
            background: "linear-gradient(165deg,#0d3d2f,#071a11)",
            border: "1px solid rgba(0,200,150,.28)",
            borderRadius: 20, padding: "32px 28px",
            width: "100%", maxWidth: 480, position: "relative",
            boxShadow: "0 24px 64px rgba(0,0,0,.5)",
          }}>
            <button
              onClick={() => setOpen(false)}
              disabled={loading}
              style={{
                position: "absolute", top: 12, right: 16,
                background: "none", border: "none", color: "rgba(255,255,255,.5)",
                fontSize: "1.5rem", cursor: "pointer", lineHeight: 1,
              }}
            >×</button>

            <h2 style={{
              fontFamily: "'Playfair Display',serif", fontWeight: 900,
              fontSize: "1.5rem", color: "#fff", textAlign: "center", marginBottom: 20,
            }}>Enroll as Partner School</h2>

            {msg && <p style={{ textAlign: "center", color: "#00c896", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, marginBottom: 12 }}>{msg}</p>}
            {error && <p style={{ textAlign: "center", color: "#ff6b6b", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, marginBottom: 12 }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { name: "schoolName", label: "School Name", placeholder: "Enter school name" },
                { name: "contactPerson", label: "Contact Person", placeholder: "Enter name" },
                { name: "designation", label: "Designation", placeholder: "Principal / Coordinator / Teacher" },
                { name: "phone", label: "Phone Number", placeholder: "10-digit number" },
                { name: "email", label: "Official Email", placeholder: "Enter email" },
              ].map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label style={labelStyle}>{label} *</label>
                  <input
                    name={name} value={form[name]}
                    onChange={handleChange} placeholder={placeholder}
                    required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "rgba(0,200,150,.55)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(0,200,150,.22)"; }}
                  />
                </div>
              ))}
              <button
                type="submit" disabled={loading}
                style={{
                  marginTop: 4, padding: "13px", borderRadius: 50,
                  border: "none", cursor: loading ? "not-allowed" : "pointer",
                  background: loading ? "rgba(255,255,255,.15)" : "linear-gradient(135deg,#00c896,#128061)",
                  color: "#fff", fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 700, fontSize: "1rem",
                  boxShadow: loading ? "none" : "0 8px 24px rgba(0,200,150,.3)",
                  transition: "all .25s",
                }}
              >{loading ? "Submitting…" : "Submit Enrollment"}</button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left text */}
          <div
            ref={leftRef}
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity .8s ease, transform .8s ease",
            }}
          >
            <div style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", fontWeight: 700,
              letterSpacing: "2.5px", textTransform: "uppercase", color: "#00c896", marginBottom: 14,
            }}>Join the Movement</div>
            <h2 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900,
              color: "#fff", lineHeight: 1.15, marginBottom: 16,
            }}>
              Empower the Next <br />
              <span style={{ color: "#00c896" }}>Generation of Leaders</span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.52)",
              fontSize: ".95rem", lineHeight: 1.85, marginBottom: 28,
            }}>
              Join the national ecosystem of future-ready schools. Get in touch to learn how FutureX Fellowship can transform your students into confident founders, thinkers, and leaders.
            </p>

            {/* Contact */}
            <div style={{
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(0,200,150,.15)",
              borderRadius: 16, padding: "20px 20px", marginBottom: 24,
            }}>
              {[
                { icon: "PH", label: "Phone", val: "7042671115 | 7042672300", href: "tel:7042671115" },
                { icon: "EM", label: "Email", val: "service.excellence@lyfshilpacademy.com", href: "mailto:service.excellence@lyfshilpacademy.com" },
                { icon: "WB", label: "Website", val: "lyfshilp.com", href: "https://lyfshilp.com" },
              ].map(({ icon, label, val, href }) => (
                <a key={label} href={href} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14, textDecoration: "none" }}>
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 9,
                      flexShrink: 0,
                      marginTop: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: ".62rem",
                      fontWeight: 800,
                      letterSpacing: ".5px",
                      color: "#00c896",
                      border: "1px solid rgba(0,200,150,.3)",
                      background: "rgba(0,200,150,.08)",
                    }}
                  >
                    {icon}
                  </span>
                  <div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".75rem", color: "#00c896", textTransform: "uppercase", letterSpacing: "1px" }}>{label}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,.58)", fontSize: ".82rem", wordBreak: "break-all" }}>{val}</div>
                  </div>
                </a>
              ))}
            </div>

            <button
              onClick={() => setOpen(true)}
              style={{
                display: "block", width: "100%", padding: "16px",
                borderRadius: 50, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg,#00c896,#128061)",
                color: "#fff", fontFamily: "'DM Sans',sans-serif",
                fontWeight: 700, fontSize: "1rem", letterSpacing: ".5px",
                boxShadow: "0 10px 28px rgba(0,200,150,.35)",
                transition: "transform .25s, box-shadow .25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,200,150,.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,200,150,.35)"; }}
            >
              Enroll as a Partner School Today →
            </button>
          </div>

          {/* Right image */}
          <div
            ref={rightRef}
            className="flex justify-center"
            style={{
              opacity: rightInView ? 1 : 0,
              transform: rightInView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity .8s ease .15s, transform .8s ease .15s",
              position: "relative",
            }}
          >
            <div style={{
              position: "absolute", inset: "5%",
              background: "radial-gradient(circle,rgba(0,200,150,.15),transparent 65%)",
              filter: "blur(20px)", borderRadius: "50%",
            }} />
            <img src="/images/7.svg" alt="Partner Schools"
              style={{ position: "relative", zIndex: 1, width: "85%", maxWidth: 420, filter: "drop-shadow(0 20px 48px rgba(0,0,0,.4))" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
