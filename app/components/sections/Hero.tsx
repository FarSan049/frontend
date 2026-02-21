import { prisma } from "@/lib/db";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const hero = await prisma.hero.findFirst();

  // Fallback to static data if no hero is found in DB
  const defaultHero = {
    title: "Sewa Tanaman untuk",
    motto: "Kantor yang Lebih Estetik",
    subtitle: "Ciptakan suasana kerja yang nyaman dan profesional tanpa ribet perawatan. Kami urus semuanya untuk Anda.",
    images: "/images/hero-office.jpg",
  };

  return <HeroClient hero={(hero as any) || defaultHero} />;
}
