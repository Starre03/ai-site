import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { serviceMenuLinks, solutionMenuLinks } from "../content/siteContent";
import { BODY, C } from "../lib/theme";
import { BrandMark } from "./ui";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menus = useMemo(
    () => [
      { label: "Diensten", items: serviceMenuLinks },
      { label: "Oplossingen", items: solutionMenuLinks },
    ],
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDesktopMenu(null);
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

  const groupIsActive = (items) => items.some((item) => item.to === location.pathname);

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
      onMouseLeave={() => setDesktopMenu(null)}
    >
      <Link id="nav-logo" to="/" style={{ textDecoration: "none" }} aria-label="Ga naar home">
        <BrandMark />
      </Link>
      <div className="desktop-nav" style={{ display: "flex", gap: 24, alignItems: "center", position: "relative" }}>
        {menus.map((group) => {
          const active = groupIsActive(group.items);
          const isOpen = desktopMenu === group.label;

          return (
            <div
              key={group.label}
              style={{ position: "relative" }}
              onMouseEnter={() => setDesktopMenu(group.label)}
            >
              <button
                onClick={() => setDesktopMenu((current) => (current === group.label ? null : group.label))}
                style={{
                  background: "none",
                  border: "none",
                  color: active || isOpen ? C.text : C.textMuted,
                  textDecoration: "none",
                  fontSize: "0.78rem",
                  fontWeight: active || isOpen ? 600 : 500,
                  transition: "color 0.3s",
                  fontFamily: BODY,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: 0,
                }}
              >
                {group.label}
                <span style={{ fontSize: "0.65rem", opacity: 0.8 }}>{isOpen ? "▴" : "▾"}</span>
              </button>
              {isOpen ? (
                <div
                  style={{
                    position: "absolute",
                    top: 34,
                    left: -20,
                    width: 440,
                    padding: 14,
                    borderRadius: 20,
                    background: "rgba(10,16,28,0.94)",
                    border: `1px solid ${C.border}`,
                    backdropFilter: "blur(24px) saturate(1.2)",
                    WebkitBackdropFilter: "blur(24px) saturate(1.2)",
                    boxShadow: "0 18px 60px rgba(0,0,0,0.34)",
                    display: "grid",
                    gap: 8,
                  }}
                >
                  {group.items.map((item) => (
                    <Link
                      key={item.to + item.label}
                      to={item.to}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        borderRadius: 14,
                        padding: "12px 14px",
                        background: item.to === location.pathname ? "rgba(14,165,233,0.08)" : "transparent",
                        transition: "background 0.25s ease",
                      }}
                    >
                      <div style={{ color: C.text, fontFamily: BODY, fontWeight: 600, fontSize: "0.84rem" }}>{item.label}</div>
                      <div style={{ color: C.textSoft, fontFamily: BODY, fontSize: "0.76rem", lineHeight: 1.65, marginTop: 5 }}>
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        <NavLink
          to="/over"
          style={({ isActive }) => ({
            color: isActive ? C.text : C.textMuted,
            textDecoration: "none",
            fontSize: "0.78rem",
            fontWeight: isActive ? 600 : 500,
            transition: "color 0.3s",
            fontFamily: BODY,
          })}
        >
          Over
        </NavLink>
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
          {menus.map((group) => (
            <div key={group.label} style={{ display: "grid", gap: 10 }}>
              <div
                style={{
                  color: C.textMuted,
                  fontFamily: BODY,
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {group.label}
              </div>
              {group.items.map((item) => (
                <NavLink
                  key={item.to + item.label}
                  to={item.to}
                  style={({ isActive }) => ({
                    color: isActive ? C.text : C.textSoft,
                    textDecoration: "none",
                    fontFamily: BODY,
                    fontSize: "0.9rem",
                    lineHeight: 1.4,
                  })}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
          <NavLink
            to="/over"
            style={({ isActive }) => ({
              color: isActive ? C.text : C.textSoft,
              textDecoration: "none",
              fontFamily: BODY,
              fontSize: "0.9rem",
            })}
          >
            Over
          </NavLink>
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
