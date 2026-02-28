"use client"
import Link from "next/link";

export default function Footer() {
  
  return (
    <footer className="bg-green-900 text-green-100">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND & DESC */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">
            WARDHANA FLOWER
          </h3>

          <p className="text-sm leading-relaxed text-green-200">
            Kami menghadirkan manfaat dan keindahan alam ke dalam setiap
            ruang melalui layanan sewa tanaman yang estetis dan profesional.
          </p>

          <p className="mt-4 text-sm text-green-200">
            Wujudkan ruang kerja yang lebih hidup bersama kami.
          </p>

          {/* SOCIAL */}
          <div className="flex items-center gap-4 mt-6">
            <a href="https://www.instagram.com/wardhanaflora?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram" className="hover:text-white transition">
              Instagram
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-white transition">
              Facebook
            </a>
            <a href="https://wa.me/6281314110863?text=Halo,%20Wardhana%20Flora,%20saya%20ingin%20konsultasi%20untuk%20rental%20tanaman" aria-label="WhatsApp" className="hover:text-white transition">
              WhatsApp
            </a>
          </div>
        </div>

        {/* ALAMAT */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Alamat</h4>
          <p className="text-sm text-green-200 leading-relaxed">
            Jl. Kemenyan No.76 Rt.08/05 Kel.Ciganjur Kec.Jagakarsa Jaksel<br />
            Tangerang Selatan, Indonesia
          </p>

          <a
            href="https://maps.app.goo.gl/PREYAdhYntL2Qqno7"
            className="inline-block mt-3 text-sm text-green-300 hover:text-white transition"
          >
            Open Map →
          </a>

          <h4 className="font-semibold mb-4 text-white mt-6">Alamat Nursery</h4>
          <p className="text-sm text-green-200 leading-relaxed">
            Jl. Raya Parung Ciputat, Serua, Bojongsari<br />
            Kota Depok, Jawa Barat
          </p>

          <a
            href="https://maps.app.goo.gl/WFDtxs25n1FDhWwAA"
            className="inline-block mt-3 text-sm text-green-300 hover:text-white transition"
          >
            Open Map →
          </a>

          <p className="mt-4 text-sm text-green-200">
            {/* <span className="font-medium text-white">what3words:</span><br /> */}
            
          </p>
        </div>

        {/* JAM KERJA */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Jam Kerja</h4>
          <p className="text-sm text-green-200">
            Senin – Jumat: 09.00 – 17.00
          </p>
          <p className="text-sm text-green-200 mt-1">
            Sabtu & Minggu: Libur
          </p>

          <h4 className="font-semibold mt-6 mb-2 text-white">Kontak</h4>
          <p className="text-sm text-green-200">
            081314110863
          </p>
          <p className="text-sm text-green-200">
            0895339498733
          </p>
          <p className="text-sm text-green-200">
            wardanaflora01@gmail.com
          </p>

          <h4 className="font-semibold mb-4 mt-6 text-white">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/katalog" className="hover:text-white transition">
                Katalog Tanaman
              </a>
            </li>
            <li>
              <a href={`https://wa.me/6281314110863?text=Halo,%20saya%20tertarik%20untuk%20sewa%20tanaman`} className="hover:text-white transition">
                Sewa Tanaman
              </a>
            </li>
            {/* <li>
              <a href="#" className="hover:text-white transition">
                Artikel & Tips
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Kebijakan Privasi
              </a>
            </li> */}
          </ul>
        </div>

        {/* MAPS */}
        <div>
          <iframe className="w-full h-64 md:h-72 border-0 allowFullScreen referrerpolicy no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7930.12885990329!2d106.73951124478498!3d-6.3856865621185115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef61b68baf91%3A0x4e1026943923d77e!2sWardhan%20flora%20%26%20aglonema!5e0!3m2!1sid!2sid!4v1766647550581!5m2!1sid!2sid" 
            loading="lazy" title="Maps lokasi nursery"></iframe>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-green-300 text-center">
          © {new Date().getFullYear()} Wardhana Flora — Indonesia. All rights reserved. 
        </div> 
      </div>
    </footer>
  )
}
