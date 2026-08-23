import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-white/85 text-primary/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="Gumu Khola logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full bg-white object-contain p-1"
              />
              <span className="font-bold text-xl text-primary tracking-tight">
                Gumu Khola
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed">
              Powering our communities with clean, reliable, and sustainable hydropower. Committed to environmental stewardship and engineering excellence.
            </p>

          </div>

          <div>
            <h3 className="mb-5 font-semibold text-primary">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-secondary-light transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-secondary-light transition-colors">Our Projects</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-secondary-light transition-colors">How It Works</Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-secondary-light transition-colors">Downloads</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-secondary-light transition-colors">Careers</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-primary">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>Lamidanda 05,<br />Kalinchowk Rural Muncipality,<br />Dolakha, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <span className="min-w-0 break-words">+977-9812345678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <span className="min-w-0 break-words">info@gumukholahydro.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-primary">Newsletter</h3>
            <p className="mb-4 text-sm">Stay updated with our latest projects and sustainability initiatives.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/70 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-primary text-sm"
                required
              />
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary-light text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-primary/20 pt-8 text-center text-sm text-primary/60 md:flex-row md:justify-between md:text-left">
          <p className="max-w-full">&copy; {new Date().getFullYear()} Gumu Khola Hydropower. All rights reserved.</p>
          <div className="flex max-w-full flex-wrap justify-center gap-x-5 gap-y-2 md:justify-end">
            <Link href="/privacy" className="hover:text-secondary-light transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-secondary-light transition-colors">Terms of Service</Link>
            <Link href="/admin/login" className="hover:text-secondary-light transition-colors opacity-50 hover:opacity-100">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
