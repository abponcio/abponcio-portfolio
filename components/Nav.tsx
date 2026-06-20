"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { navLinks } from "@/lib/content";

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav
      className="floatnav fixed z-[60]"
      data-open={menuOpen}
      style={{
        top: 18,
        left: "clamp(16px, 4vw, 40px)",
      }}
      aria-label="Main navigation"
    >
      <div className="floatnav-pill">
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Home — abponcio"
          className="shrink-0 grid place-items-center no-underline rounded-full"
          style={{
            width: 40,
            height: 40,
            background: "var(--accent)",
          }}
        >
          <Logo size={40} animate={pathname === "/"} onAccent />
        </Link>

        <div className="fn-links">
          <div className="fn-links-inner">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="nav-link no-underline"
              >
                {label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>

        <button
          type="button"
          className="floatnav-hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span className="fn-bar top" />
          <span className="fn-bar mid" />
          <span className="fn-bar bot" />
        </button>
      </div>
    </nav>
  );
}
