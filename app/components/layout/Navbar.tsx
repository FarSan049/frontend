"use client";

import { useEffect, useState } from "react";
import { useHandleScrollTo } from "@/app/lib/handlescrollto";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "#home", type: "section" },
  { label: "Benefits", href: "#benefits", type: "section" },
  { label: "Tanaman", href: "#products", type: "section" },
  { label: "Testimoni", href: "#testimonials", type: "section" },
  { label: "Katalog", href: "/katalog", type: "page" },
];

export default function Navbar() {
  const pathname = usePathname();
  const handleScrollTo = useHandleScrollTo();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [open, setOpen] = useState(false);
  const isKatalog = pathname === "/katalog";

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768; // md breakpoint Tailwind
      setIsScrolled(isMobile ? true : window.scrollY > 80);

      navItems.forEach((item) => {
        if (item.type !== "section") return;

        const section = document.querySelector(item.href);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(item.href);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        {/* LOGO */}
        <Link href="/" className="relative w-32 h-10 shrink-0">
          <Image
            src="/images/wf.png"
            alt="Logo Wardhana Flower"
            fill
            priority
            sizes="128px"
            className="object-contain"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navItems.map((item) => {
            // 👉 PAGE NAV (pindah halaman)
            if (item.type === "page") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition ${
                    isKatalog
                      ? "text-green-700 font-semibold"
                      : "text-green-900 hover:text-green-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            // 👉 SECTION NAV (scroll)
            return (
              <button
                key={item.href}
                onClick={() => handleScrollTo(item.href)}
                className={`cursor-pointer transition ${
                  isScrolled
                    ? activeSection === item.href
                      ? "text-green-700 font-semibold"
                      : "text-green-900 hover:text-green-700"
                    : activeSection === item.href
                      ? "text-green-800"
                      : "text-green-900 hover:text-green-700"
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <a
            href="https://wa.me/6281314110863?text=Halo,%20Wardhana%20Flora,%20saya%20ingin%20konsultasi%20untuk%20rental%20tanaman"
            className="ml-4 px-5 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition"
          >
            WhatsApp
          </a>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-green-900"
        >
          ☰
        </button>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-md px-6 pb-6 animate-fadeIn">
          {navItems.map((item) =>
            item.type === "page" ? (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-green-900 font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.href}
                onClick={() => {
                  handleScrollTo(item.href);
                  setOpen(false);
                }}
                className="block w-full text-left py-3 text-green-900 font-medium"
              >
                {item.label}
              </button>
            ),
          )}

          <a
            href="https://wa.me/62xxxxxxxxxx"
            className="block mt-4 text-center px-5 py-3 rounded-full bg-green-700 text-white"
          >
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
