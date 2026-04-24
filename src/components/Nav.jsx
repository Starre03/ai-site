import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { serviceMenuLinks } from "../content/siteContent";
import { trackEvent } from "../lib/analytics";
import { BODY, C } from "../lib/theme";
import { BrandMark } from "./ui";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menus = useMemo(
    () => [{ label: "Diensten", items: serviceMenuLinks }],
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

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const groupIsActive = (items) => items.some((item) => item.to === location.pathname);

  const aboutMenu = [
    { label: "Over ons", to: "/over", description: "Lees meer over StarLeo, onze achtergrond en waar wij voor staan." },
    { label: "Contact", to: "/#contact", description: "Neem direct contact op voor vragen of een eerste gesprek." },
  ];

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
        height: 66,
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
        {[...menus, { label: "Over", items: aboutMenu }].map((group) => {
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
                aria-haspopup="menu"
                aria-expanded={isOpen}
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
                  role="menu"
                  style={{
                    position: "absolute",
                    top: 34,
                    left: 0,
                    right: "auto",
                    transform: "none",
                    width: "fit-content",
                    minWidth: group.label === "Over" ? 150 : 190,
                    maxWidth: group.label === "Over" ? 180 : 230,
                    padding: 10,
                    borderRadius: 20,
                    background: "rgba(10,16,28,0.94)",
                    border: `1px solid ${C.border}`,
                    backdropFilter: "blur(24px) saturate(1.2)",
                    WebkitBackdropFilter: "blur(24px) saturate(1.2)",
                    boxShadow: "0 18px 60px rgba(0,0,0,0.34)",
                    display: "grid",
                    gap: 4,
                  }}
                >
                  {group.items.map((item) =>
                    item.to === "/#contact" ? (
                      <button
                        key={item.to + item.label}
                        type="button"
                        onClick={() => {
                          setDesktopMenu(null);
                          goToSection("contact");
                        }}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          borderRadius: 14,
                          padding: "12px 14px",
                          background: "transparent",
                          transition: "background 0.25s ease",
                          border: "none",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ color: C.text, fontFamily: BODY, fontWeight: 600, fontSize: "0.84rem", whiteSpace: "nowrap" }}>{item.label}</div>
                      </button>
                    ) : (
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
                        <div style={{ color: C.text, fontFamily: BODY, fontWeight: 600, fontSize: "0.84rem", whiteSpace: "nowrap" }}>{item.label}</div>
                      </Link>
                    ),
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
        <Link
          to="/quickscan"
          onClick={() => trackEvent("nav_quickscan_click", { location: "desktop_nav" })}
          style={{
            textDecoration: "none",
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
          Start quickscan
        </Link>
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
            top: 66,
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
          {[...menus, { label: "Over", items: aboutMenu }].map((group) => (
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
              {group.items.map((item) =>
                item.to === "/#contact" ? (
                  <button
                    key={item.to + item.label}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      goToSection("contact");
                    }}
                    style={{
                      color: C.textSoft,
                      textDecoration: "none",
                      fontFamily: BODY,
                      fontSize: "0.9rem",
                      lineHeight: 1.4,
                      background: "none",
                      border: "none",
                      padding: 0,
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
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
                ),
              )}
            </div>
          ))}
          <Link
            to="/quickscan"
            onClick={() => trackEvent("nav_quickscan_click", { location: "mobile_nav" })}
            style={{
              textDecoration: "none",
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
            Start quickscan
          </Link>
        </div>
      ) : null}
    </nav>
  );
}
