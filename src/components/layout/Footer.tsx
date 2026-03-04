import Link from "next/link";
import Image from "next/image";

const navigation = {
  product: [
    { name: "Paket Internet", href: "/pricing" },
    { name: "Layanan", href: "/services" },
    { name: "Cek Coverage", href: "/coverage" },
    { name: "Promo", href: "/pricing" },
  ],
  company: [
    { name: "Tentang Kami", href: "/about" },
    { name: "Portal Pelanggan", href: "/portal" },
  ],
  support: [
    { name: "Pusat Bantuan", href: "/contact" },
    { name: "Hubungi Kami", href: "/contact" },
    { name: "Syarat & Ketentuan", href: "#" },
  ],
  entertainment: [
    { name: "Hiburan", href: "https://hiburan.jelantik.com", external: true },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/p/PT-Artacomindo-Jejaring-Nusa-100054324456980/",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    // {
    //   name: "Instagram",
    //   href: "#",
    //   icon: (props: React.SVGProps<SVGSVGElement>) => (
    //     <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    //       <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.37c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    //     </svg>
    //   ),
    // },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/icons/icon-96.webp"
                  alt="Jelantik Logo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 48px) 100vw, 48px"
                />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Jelantik</span>
                <p className="text-xs text-slate-400">by PT. Artacomindo Jejaring Nusa</p>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Solusi internet fiber optic 100% dengan kecepatan tinggi, harga terjangkau, dan layanan 24/7.
              Nikmati koneksi tanpa batas tanpa FUP.
            </p>
            <div className="mt-6 flex gap-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label={item.name}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Produk</h3>
            <ul className="mt-4 space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Perusahaan</h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Bantuan</h3>
            <ul className="mt-4 space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entertainment Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Hiburan</h3>
            <ul className="mt-4 space-y-3">
              {navigation.entertainment.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                      {item.name}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-sm hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Information */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="bg-slate-800 rounded-xl p-6 mb-8">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Informasi Legalitas</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-400">
              <div>
                <p className="font-semibold text-white mb-2">PT. Artacomindo Jejaring Nusa</p>
                <p className="mb-2">Didirikan berdasarkan Akta Notaris Nomor 08 pada tanggal 05 Desember 2014 dari Notaris Hj. Nurmiati, S.H. di Jakarta.</p>
              </div>
              <div>
                <p className="mb-2"><span className="text-orange-400 font-semibold">Izin ISP:</span> 812000588380400006</p>
                <p className="mb-2"><span className="text-orange-400 font-semibold">Izin Jaringan:</span> 812000588380400011</p>
                <p><span className="text-orange-400 font-semibold">Izin JARTAPTUP:</span> 1164 Tahun 2016</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Jelantik by PT. Artacomindo Jejaring Nusa. Semua hak dilindungi.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="text-slate-400 hover:text-white transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
