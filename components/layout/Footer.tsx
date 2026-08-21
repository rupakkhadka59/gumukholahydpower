import Link from "next/link";
import { Droplets, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-secondary p-2 rounded-lg">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Gumu Khola
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Powering our communities with clean, reliable, and sustainable hydropower. Committed to environmental stewardship and engineering excellence.
            </p>

          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-secondary transition-colors">Our Projects</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-secondary transition-colors">How It Works</Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-secondary transition-colors">Downloads</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-secondary transition-colors">Careers</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>Lamidanda 05,<br />Kalinchowk Rural Muncipality,<br />Dolakha, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>+977-9812345678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>info@gumukholahydro.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Newsletter</h3>
            <p className="text-sm mb-4">Stay updated with our latest projects and sustainability initiatives.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-white text-sm"
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

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Gumu Khola Hydropower. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/admin/login" className="hover:text-white transition-colors opacity-50 hover:opacity-100">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
