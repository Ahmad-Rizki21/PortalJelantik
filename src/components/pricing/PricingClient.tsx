"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Categorized plans by speed to match Indihome behavior
const plansBySpeed: Record<string, any[]> = {
  "10Mbps": [
    {
      id: 1,
      type: "Home Broadband",
      speed: "10 Mbps",
      price: 166500,
      install: "Gratis",
      devices: "1 - 3 Perangkat",
      popular: false,
      color: "from-blue-600 to-blue-400"
    }
  ],
  "20Mbps": [
    {
      id: 2,
      type: "Home Broadband",
      speed: "20 Mbps",
      price: 231990,
      install: "Gratis",
      devices: "4 - 6 Perangkat",
      popular: true,
      color: "from-orange-600 to-orange-400"
    }
  ],
  "30Mbps": [
    {
      id: 3,
      type: "Home Broadband",
      speed: "30 Mbps",
      price: 276390,
      install: "Gratis",
      devices: "7 - 9 Perangkat",
      popular: false,
      color: "from-blue-600 to-blue-400"
    }
  ],
  "50Mbps": [
    {
      id: 4,
      type: "Home Broadband",
      speed: "50 Mbps",
      price: 321789,
      install: "Gratis",
      devices: "10 - 15 Perangkat",
      popular: false,
      color: "from-blue-600 to-blue-400"
    }
  ]
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID").format(price);
}

export default function PricingClient() {
  const [selectedSpeed, setSelectedSpeed] = useState("10Mbps");
  const speeds = Object.keys(plansBySpeed);

  return (
    <div className="bg-[#f8f9fb] min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Side: Title */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="mb-4">
              <span className="text-orange-600 font-black text-2xl tracking-tighter">Jelantik</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-8">
              Pilih Paket Internet <span className="text-blue-600">Terbaik</span> Untuk Anda
            </h1>
            <p className="text-slate-600 text-lg">
              Nikmati koneksi stabil tanpa batas kuota dengan harga yang tetap hemat setiap bulan.
            </p>
          </div>

          {/* Right Side: Tabs & Cards */}
          <div className="lg:col-span-8">
            {/* Speed Tabs */}
            <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200">
              {speeds.map((speed) => (
                <button
                  key={speed}
                  onClick={() => setSelectedSpeed(speed)}
                  className={`px-8 py-4 font-bold transition-all relative ${
                    selectedSpeed === speed 
                      ? "text-blue-600" 
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {speed}
                  {selectedSpeed === speed && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Product Cards Grid */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {plansBySpeed[selectedSpeed].map((plan) => (
                <div 
                  key={plan.id}
                  className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden transform hover:-translate-y-2 transition-all duration-500 border border-slate-50 group"
                >
                  {/* Card Header (Gradient with Speed) */}
                  <div className={`bg-gradient-to-br ${plan.color} p-10 relative`}>
                    <div className="absolute top-4 right-4 text-white/20">
                      <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-white/80 font-bold mb-1 uppercase tracking-widest text-xs">{plan.type}</p>
                    <h3 className="text-white text-4xl font-black">{plan.speed}</h3>
                  </div>

                  {/* Card Details */}
                  <div className="p-10 space-y-6">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3 text-slate-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                        <span className="text-sm font-medium">Internet</span>
                      </div>
                      <span className="font-bold text-slate-800">{plan.speed}</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3 text-slate-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-sm font-medium">Biaya pasang</span>
                      </div>
                      <span className="font-bold text-slate-800">Rp {plan.install}</span>
                    </div>

                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3 text-slate-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                        <span className="text-sm font-medium">Perangkat</span>
                      </div>
                      <span className="font-bold text-slate-800">{plan.devices}</span>
                    </div>

                    <div className="pt-8">
                      <div className="text-blue-600 text-3xl font-black mb-6">
                        Rp {formatPrice(plan.price)}
                      </div>
                      <a
                        href={`https://wa.me/6289606025227?text=Halo%20Jelantik,%20saya%20tertarik%20dengan%20paket%20${encodeURIComponent(plan.speed)}%20${encodeURIComponent(plan.type)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-blue-600 hover:shadow-lg transition-all"
                      >
                        Pilih Paket
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Special Info Section (Rusun/Perumahan) */}
      <section className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-2xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 translate-x-1/2" />
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-bold mb-6">
                Informasi Penting
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 leading-tight">
                Paket Internet Khusus <br/><span className="text-blue-600">Perumahan & Rusun</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Harga di atas adalah estimasi untuk area Perumahan umum. Untuk area **Rusun (Nagrak, dsb)**, kami memiliki skema harga khusus yang jauh lebih terjangkau.
              </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 text-slate-800 font-bold">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    Instalasi di Rusun Lebih Cepat
                 </div>
                 <div className="flex items-center gap-4 text-slate-800 font-bold">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    Dukungan On-site 24 Jam
                 </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/rusun-nagrak.jpeg" 
                  alt="Rusun Nagrak" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
