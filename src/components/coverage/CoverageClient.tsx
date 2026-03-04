"use client";

import { useState, useEffect } from "react";

const coverageAreas = [
  {
    id: 1,
    name: "Tambun",
    detail: "Perumahan Kompas Tambun",
    region: "Bekasi, Jawa Barat",
    icon: "🏘️",
  },
  {
    id: 2,
    name: "Puri Sava Waringin Kurung",
    detail: "Serang, Banten",
    region: "Serang, Banten",
    icon: "🏡",
  },
  {
    id: 3,
    name: "Parama by Sava",
    detail: "Serang, Banten",
    region: "Serang, Banten",
    icon: "🏘️",
  },
  {
    id: 4,
    name: "Komarudin Lama",
    detail: "Pulogebang, Cakung",
    region: "Jakarta Timur",
    icon: "🏢",
  },
  {
    id: 5,
    name: "Rusun Nagrak",
    detail: "Nagrak, Cilincing",
    region: "Jakarta Utara",
    icon: "🏢",
  },
];

export default function CoverageClient() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [provinces, setProvinces] = useState<Array<{ id: string; name: string }>>([]);
  const [regencies, setRegencies] = useState<Array<{ id: string; name: string }>>([]);
  const [districts, setDistricts] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [checkResult, setCheckResult] = useState<string>("");

  // Fetch provinces on component mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchRegencies = async (provinceId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
      const data = await response.json();
      setRegencies(data);
      setDistricts([]);
      setSelectedRegency("");
      setSelectedDistrict("");
    } catch (error) {
      console.error("Error fetching regencies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDistricts = async (regencyId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`);
      const data = await response.json();
      setDistricts(data);
      setSelectedDistrict("");
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    if (provinceId) {
      fetchRegencies(provinceId);
    } else {
      setRegencies([]);
      setDistricts([]);
    }
  };

  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regencyId = e.target.value;
    setSelectedRegency(regencyId);
    if (regencyId) {
      fetchDistricts(regencyId);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
  };

  const checkCoverage = () => {
    if (!selectedProvince || !selectedRegency || !selectedDistrict) {
      setCheckResult("Mohon lengkapi semua pilihan wilayah");
      return;
    }

    const provinceName = provinces.find(p => p.id === selectedProvince)?.name || "";
    const regencyName = regencies.find(r => r.id === selectedRegency)?.name || "";
    const districtName = districts.find(d => d.id === selectedDistrict)?.name || "";

    // Check if area is covered
    const isCovered = coverageAreas.some(area => 
      area.region.toLowerCase().includes(provinceName.toLowerCase()) ||
      area.region.toLowerCase().includes(regencyName.toLowerCase()) ||
      area.detail.toLowerCase().includes(districtName.toLowerCase())
    );

    if (isCovered) {
      setCheckResult(`✅ Selamat! Area ${districtName}, ${regencyName}, ${provinceName} sudah tercover oleh Jelantik. Hubungi kami untuk berlangganan!`);
    } else {
      setCheckResult(`❌ Maaf, area ${districtName}, ${regencyName}, ${provinceName} belum tercover. Kami akan terus memperluas jangkauan kami. Hubungi kami untuk informasi lebih lanjut.`);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Cek <span className="text-blue-600">Area Coverage</span>
            </h1>
            <p className="text-xl text-slate-600">
              Periksa apakah lokasi Anda sudah tercover oleh layanan internet Jelantik
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Areas Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Area yang Sudah Tercover
            </h2>
            <p className="text-lg text-slate-600">
              Berikut adalah area yang sudah terjangkau oleh layanan Jelantik
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {coverageAreas.map((area) => (
              <div
                key={area.id}
                className="relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Number Badge */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {area.id.toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4 mt-2">{area.icon}</div>

                {/* Coverage Badge */}
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium mb-3">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414z" clipRule="evenodd" />
                  </svg>
                  Coverage Available
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {area.name}
                </h3>
                <p className="text-slate-600 text-sm mb-1">{area.detail}</p>
                <p className="text-xs text-blue-600 font-medium">{area.region}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Check Coverage Section */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center">
              Cek Wilayah Anda
            </h2>
            <p className="text-slate-600 mb-8 text-center">
              Pilih wilayah Anda untuk mengecek ketersediaan layanan Jelantik
            </p>

            <div className="space-y-6">
              {/* Province Select */}
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-slate-700 mb-2">
                  Provinsi
                </label>
                <select
                  id="province"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Pilih Provinsi</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Regency Select */}
              <div>
                <label htmlFor="regency" className="block text-sm font-medium text-slate-700 mb-2">
                  Kabupaten/Kota
                </label>
                <select
                  id="regency"
                  value={selectedRegency}
                  onChange={handleRegencyChange}
                  disabled={!selectedProvince || loading}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option value="">Pilih Kabupaten/Kota</option>
                  {regencies.map((regency) => (
                    <option key={regency.id} value={regency.id}>
                      {regency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Select */}
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-slate-700 mb-2">
                  Kecamatan
                </label>
                <select
                  id="district"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!selectedRegency || loading}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option value="">Pilih Kecamatan</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Check Button */}
              <button
                onClick={checkCoverage}
                disabled={!selectedDistrict}
                className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Cek Coverage
              </button>

              {/* Result */}
              {checkResult && (
                <div className={`p-6 rounded-xl ${checkResult.includes('✅') ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
                  <p className={`text-center font-medium ${checkResult.includes('✅') ? 'text-green-800' : 'text-orange-800'}`}>
                    {checkResult}
                  </p>
                  {checkResult.includes('✅') && (
                    <div className="mt-4 text-center">
                      <a
                        href="https://wa.me/6289606025227?text=Halo%20Jelantik,%20saya%20ingin%20berlangganan%20internet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-all"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Hubungi Kami Sekarang
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Area Anda Belum Tercover?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Jangan khawatir! Kami terus memperluas jangkauan layanan. Hubungi kami untuk informasi lebih lanjut.
          </p>
          <a
            href="https://wa.me/6289606025227?text=Halo%20Jelantik,%20saya%20ingin%20informasi%20area%20coverage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-full bg-orange-500 text-white shadow-md hover:bg-orange-600 hover:shadow-lg transition-all"
          >
            Hubungi Kami
          </a>
        </div>
      </section>
    </>
  );
}
