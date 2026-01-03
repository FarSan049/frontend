"use client";
import Image from "next/image";
import { products } from "@/lib/products";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function KatalogPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Jumlah produk per halaman

  // Filter produk
  const filteredProducts = products.filter((p) => {
    const matchCategory = filter === "all" || p.category === filter;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  // Hitung total halaman
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Dapatkan produk untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Fungsi untuk pindah halaman
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Reset ke halaman 1 saat filter berubah
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white-50">
      {/* Header */}
      <section className="relative min-h-175 flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/katalogcover.jpg"
            alt="Background tanaman"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-white/5 via-gray-600/30 to-white" />
        </div>

        {/* Content */}
        <div className="relative w-full">
          <div className="max-w-6xl mx-auto px-6 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                Katalog Tanaman
              </h1>

              <p className="mt-4 text-lg text-green-50 max-w-2xl mx-auto">
                Pilihan tanaman hias terbaik untuk kantor, rumah, dan ruang
                komersial
              </p>

              {/* SEARCH */}
              <div className="mt-8 flex justify-center">
                <div className="relative w-full max-w-md">
                  <input
                    type="text"
                    placeholder="Cari tanaman..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-full px-6 py-3 pr-12 text-white ring-2 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                </div>
              </div>

              {/* FILTER */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                {["all", "indoor", "outdoor"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all backdrop-blur-md ${
                      filter === cat
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-white/80 text-green-800 hover:bg-white"
                    }`}
                  >
                    {cat === "all"
                      ? "Semua"
                      : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      {/* <section className="py-8 bg-white border-b">
        
      </section> */}

      {/* Products Grid */}
      <section className="pt-5 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Info Pagination */}
          <div className="mb-6 text-center text-green-700">
            Menampilkan {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredProducts.length)} dari{" "}
            {filteredProducts.length} produk
          </div>

          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <Image
                      loading="eager"
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="h-64 w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-green-900">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-green-700 flex-1">{item.desc}</p>
                    <a
                      href={`https://wa.me/6281314110863?text=Halo,%20saya%20tertarik%20dengan%20${item.name}`}
                      className="inline-block mt-4 text-green-700 font-semibold hover:underline hover:text-green-800 transition-colors"
                    >
                      Tanya via WhatsApp →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-2xl font-semibold text-green-900">
                Tidak ada produk ditemukan
              </h3>
              <p className="mt-2 text-green-700">
                Coba pilih kategori lain atau hubungi kami untuk informasi lebih
                lanjut
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => {
                    // Tampilkan page numbers dengan smart pagination
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`min-w-[40px] h-10 rounded-lg font-semibold transition-all ${
                            currentPage === pageNumber
                              ? "bg-green-700 text-white shadow-md"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <span
                          key={pageNumber}
                          className="px-2 flex items-center text-green-600"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-900">
            Tidak Menemukan yang Anda Cari?
          </h2>
          <p className="mt-4 text-green-700 text-lg">
            Hubungi kami untuk konsultasi gratis dan rekomendasi tanaman yang
            sesuai dengan kebutuhan Anda
          </p>
          <a
            href="https://wa.me/62xxxxxxxxxx?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20tanaman"
            className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Hubungi via WhatsApp
          </a>
        </div>
      </section>

      {/* Back to Home */}
      <div className="py-8 text-center bg-green-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
