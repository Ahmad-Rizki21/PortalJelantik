"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/about" },
  { name: "Layanan", href: "/services" },
  { name: "Harga", href: "/pricing" },
  { name: "Cek Coverage", href: "/coverage" },
  { name: "Portal", href: "/portal" },
  { name: "Kontak", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 overflow-hidden rounded-2xl transform group-hover:scale-105 transition-transform shadow-md">
            <Image
              src="/images/icons/icon-96.webp"
              alt="Jelantik Logo"
              fill
              className="object-cover"
              sizes="(max-width: 48px) 100vw, 48px"
            />
          </div>
          <span className="text-2xl font-bold text-blue-600">
            Jelantik
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                item.name === "Portal"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg px-4 shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800"
                  : pathname === item.href
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`}
            >
              {item.name}
              {pathname === item.href && item.name !== "Portal" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex">
          <a
            href="https://wa.me/6289606025227?text=Halo%20Jelantik,%20saya%20ingin%20berlangganan%20internet"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-600 hover:shadow-lg transition-all"
          >
            Langganan Sekarang
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Buka menu utama</span>
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-base font-medium ${
                  item.name === "Portal"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center"
                    : pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://wa.me/6289606025227?text=Halo%20Jelantik,%20saya%20ingin%20berlangganan%20internet"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-lg bg-orange-500 px-6 py-3 text-base font-semibold text-white mt-4 hover:bg-orange-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Langganan Sekarang
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
