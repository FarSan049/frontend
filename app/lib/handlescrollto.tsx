"use client";

import { useRouter, usePathname } from "next/navigation";

export function useHandleScrollTo() {
  const router = useRouter();
  const pathname = usePathname();

  return (id: string) => {
    // Kalau sudah di home → langsung scroll
    if (pathname === "/") {
      const section = document.querySelector(id);
      if (!section) return;

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    // Kalau di halaman lain → pindah ke home + hash
    router.push(`/${id}`);
  };
}
