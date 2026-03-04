import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-linear-to-r from-blue-600 to-blue-800 px-8 py-10 text-white">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-6 group">
             <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
             Kembali ke Portal
          </Link>
          <h1 className="text-3xl font-bold">Kebijakan Privasi</h1>
          <p className="mt-2 text-blue-100">Terakhir diperbarui: 4 Maret 2026</p>
        </div>
        
        <div className="px-8 py-10 prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">1. Informasi yang Kami Kumpulkan</h2>
            <p className="text-slate-600 leading-relaxed">
              Portal Jelantik mengumpulkan informasi yang Anda berikan saat mendaftar dan menggunakan layanan kami, termasuk namun tidak terbatas pada:
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600">
              <li>Nama lengkap</li>
              <li>Alamat email</li>
              <li>Nomor telepon / WhatsApp</li>
              <li>Alamat pemasangan layanan</li>
              <li>Data tagihan dan riwayat pembayaran</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">2. Penggunaan Informasi</h2>
            <p className="text-slate-600 leading-relaxed">
              Informasi yang kami kumpulkan digunakan untuk:
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600">
              <li>Mengelola akun pelanggan Anda</li>
              <li>Memproses tagihan dan konfirmasi pembayaran</li>
              <li>Memberikan dukungan teknis dan layanan pelanggan</li>
              <li>Mengirimkan informasi penting terkait layanan Internet Jelantik</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">3. Keamanan Data</h2>
            <p className="text-slate-600 leading-relaxed">
              Kami berkomitmen untuk menjaga keamanan data pribadi Anda. Kami menggunakan enkripsi standar industri (AES-256) untuk melindungi data sensitif Anda selama transmisi dan penyimpanan. Kami tidak akan pernah menjual atau membagikan informasi pribadi Anda kepada pihak ketiga untuk kepentingan pemasaran tanpa izin eksplisit dari Anda.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">4. Hak Anda</h2>
            <p className="text-slate-600 leading-relaxed">
              Anda berhak untuk mengakses, memperbarui, atau meminta penghapusan informasi pribadi Anda kapan saja melalui Portal Pelanggan atau dengan menghubungi layanan pelanggan kami.
            </p>
          </section>

          <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 italic text-slate-500 text-sm">
            Kebijakan ini merupakan bagian dari upaya Jelantik untuk memberikan transparansi dan keamanan bagi seluruh pelanggan kami. Jika Anda memiliki pertanyaan, silakan hubungi kami melalui Pusat Bantuan.
          </div>
        </div>
        
        <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex justify-center">
          <p className="text-slate-400 text-sm font-medium">© 2026 Artacomindo Jejaring Nusa. Semua hak dilindungi.</p>
        </div>
      </div>
    </div>
  );
}
