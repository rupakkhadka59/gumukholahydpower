"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      href: "/about",
      children: [
        { name: "Board of Directors", href: "/about/board-of-directors" },
        { name: "Vision & Mission", href: "/about/vision-mission" },
        { name: "Office Staffs", href: "/about/office-staffs" },
        { name: "Organization Structure", href: "/about/organization-structure" },
      ],
    },
    { name: "Our Project", href: "/projects" },
    { name: "Reports", href: "/reports" },
    { name: "Notice & News", href: "/news" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white/85 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.webp"
                alt="Gumu Khola logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full bg-white object-contain p-1 transition-transform group-hover:scale-105"
              />
              <span className="font-bold text-xl tracking-tight transition-colors text-primary">
                Gumu Khola
              </span>
            </Link>
          </div>
          
          <div className="hidden lg:flex sm:items-center sm:space-x-8">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-secondary-light ${
                      pathname.startsWith("/about") ? "text-primary" : "text-primary/80"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full z-50 w-56 translate-y-2 rounded-md border border-primary/10 bg-white/95 p-2 opacity-0 shadow-lg backdrop-blur-md transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded px-3 py-2 text-sm text-primary/80 transition-colors hover:bg-secondary-light/10 hover:text-secondary-light"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-secondary-light ${
                    pathname === link.href ? "text-primary" : "text-primary/80"
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled
                  ? "text-primary dark:text-white"
                  : "text-primary dark:text-white lg:text-white"
              } hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 shadow-lg border-t border-slate-100 dark:border-slate-800 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <div key={link.name}>
                <div className="flex items-center">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex-1 rounded-md px-3 py-2 text-base font-medium ${
                      pathname === link.href || (link.children && pathname.startsWith("/about"))
                        ? "text-secondary bg-slate-50 dark:bg-slate-900"
                        : "text-slate-600 dark:text-slate-300 hover:text-secondary-light dark:hover:text-secondary-light hover:bg-secondary-light/10 dark:hover:bg-secondary-light/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.children && (
                    <button
                      type="button"
                      aria-label="Toggle About Us submenu"
                      onClick={() => setIsAboutMenuOpen(!isAboutMenuOpen)}
                      className="rounded-md p-2 text-primary hover:bg-secondary-light/10 hover:text-secondary-light"
                    >
                      <ChevronDown className={`h-5 w-5 transition-transform ${isAboutMenuOpen ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {link.children && isAboutMenuOpen && (
                  <div className="ml-4 border-l border-secondary/20 pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-secondary-light/10 hover:text-secondary-light"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
