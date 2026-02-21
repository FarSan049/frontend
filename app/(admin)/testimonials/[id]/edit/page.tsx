import { prisma } from "@/lib/db";
import TestimonialForm from "@/app/components/admin/TestimonialForm";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({
    where: { id },
  });

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-zinc-800">Edit Testimonial</h3>
        <p className="text-sm text-zinc-500">Update the details for this client review.</p>
      </div>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
