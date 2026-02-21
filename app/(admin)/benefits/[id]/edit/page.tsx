import { prisma } from "@/lib/db";
import BenefitForm from "@/app/components/admin/BenefitForm";
import { notFound } from "next/navigation";

export default async function EditBenefitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const benefit = await prisma.benefit.findUnique({
    where: { id },
  });

  if (!benefit) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-zinc-800">Edit Benefit</h3>
        <p className="text-sm text-zinc-500">Update the details for this benefit highlight.</p>
      </div>
      <BenefitForm benefit={benefit} />
    </div>
  );
}
