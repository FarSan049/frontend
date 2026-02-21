'use client'
import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from 'react';
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  desc: string;
  images: any;
}

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Detect screen size untuk responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hitung total pages berdasarkan cards per view
  const totalPages = Math.ceil(products.length / cardsPerView);

  // Fungsi untuk pindah ke slide berikutnya
  const nextSlide = useCallback(() => {
    if (totalPages === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  // Fungsi untuk pindah ke slide sebelumnya
  const prevSlide = useCallback(() => {
    if (totalPages === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Fungsi untuk pindah ke slide tertentu
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto play carousel
  useEffect(() => {
    if (!isAutoPlaying || totalPages <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, totalPages]);

  // Hentikan autoplay saat hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const getImageUrl = (images: any) => {
    if (Array.isArray(images) && images.length > 0) return images[0];
    if (typeof images === 'string') return images;
    return "/images/placeholder.jpg";
  };

  if (products.length === 0) return null;

  return (
    <section id="products" className="py-20 bg-green-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 text-center">
          Pilihan Tanaman Favorit
        </h2>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-12 relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden pb-4">
            <div 
              className="flex transition-transform duration-500 ease-out py-4"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {/* Buat pages berdasarkan cardsPerView */}
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="min-w-full flex gap-8 px-4"
                >
                  {products
                    .slice(pageIndex * cardsPerView, (pageIndex + 1) * cardsPerView)
                    .map((item) => (
                      <div
                        key={item.id}
                        className={`${cardsPerView === 1 ? 'w-full' : 'flex-1'}`}
                      >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                          <Image
                            src={getImageUrl(item.images)}
                            alt={item.name}
                            width={400}
                            height={400}
                            className="h-64 w-full object-cover"
                          />
                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-semibold text-green-900">
                              {item.name}
                            </h3>
                            <p className="mt-2 text-green-700 flex-1">{item.desc}</p>
                            <a
                              href={`https://wa.me/6281213941963?text=Halo,%20saya%20tertarik%20dengan%20${item.name}`}
                              className="inline-block mt-4 text-green-700 font-semibold hover:underline"
                            >
                              Tanya via WhatsApp →
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white text-green-900 rounded-full p-3 shadow-lg transition-all duration-300 z-10 hover:scale-110"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white text-green-900 rounded-full p-3 shadow-lg transition-all duration-300 z-10 hover:scale-110"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'bg-green-700 w-8 h-3'
                      : 'bg-green-300 w-3 h-3 hover:bg-green-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Button Lihat Lainnya */}
          <div className="flex justify-center mt-8">
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Lihat Semua Produk
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
