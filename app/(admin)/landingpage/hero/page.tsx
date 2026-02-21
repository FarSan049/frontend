import { prisma } from "@/lib/db";
import HeroForm from "@/app/components/admin/HeroForm";

export default async function HeroManagementPage() {
  const hero = await prisma.hero.findFirst();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-semibold text-zinc-800">Hero Section Management</h3>
        <p className="text-sm text-zinc-500">Customize the first impression your visitors see.</p>
      </div>
      
      <HeroForm hero={hero as any} />
    </div>
  );
}
