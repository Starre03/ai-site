import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../content/siteContent";
import { BODY, C } from "../lib/theme";
import { BrandMark } from "./ui";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const goToIntake = () => {
    if (location.pathname !== "/") {
      navigate("/#intake");
      setTimeout(() => {
        document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return;
    }

    document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      role="navigation"
      aria-label="Hoofdnavigatie"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1.2rem, 4vw, 3rem)",
        background: scrolled ? "rgba(11,17,32,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        transition: "all 0.5s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <Link id="nav-logo" to="/" style={{ textDecoration: "none" }} aria-label="Ga naar home">
        <BrandMark />
      </Link>
      <div className="desktop-nav" style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              color: isActive ? C.text : C.textMuted,
              textDecoration: "none",
              fontSize: "0.78rem",
              fontWeight: isActive ? 600 : 500,
              transition: "color 0.3s",
              fontFamily: BODY,
            })}
          >
            {link.label}
          </NavLink>
        ))}
        <button
          onClick={goToIntake}
          style={{
            background: C.primary,
            color: "#fff",
            padding: "7px 18px",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: "0.78rem",
            border: "none",
            cursor: "pointer",
            fontFamily: BODY,
          }}
        >
          Plan AI intake
        </button>
      </div>
      <button
        className="mobile-nav"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Menu sluiten" : "Menu openen"}
        aria-expanded={open}
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: C.text,
          fontSize: 18,
          cursor: "pointer",
          padding: 8,
        }}
      >
        {open ? "✕" : "☰"}
      </button>
      {open ? (
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 0,
            right: 0,
            background: "rgba(11,17,32,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${C.border}`,
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                color: isActive ? C.text : C.textSoft,
                textDecoration: "none",
                fontFamily: BODY,
                fontSize: "0.9rem",
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={goToIntake}
            style={{
              background: C.primary,
              color: "#fff",
              padding: "10px 18px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: "0.82rem",
              border: "none",
              cursor: "pointer",
              fontFamily: BODY,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Plan AI intake
          </button>
        </div>
      ) : null}
    </nav>
  );
}
