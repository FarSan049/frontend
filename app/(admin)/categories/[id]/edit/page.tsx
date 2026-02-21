import { prisma } from "@/lib/db";
import CategoryForm from "@/app/components/admin/CategoryForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/categories" className="p-2 hover:bg-zinc-100 rounded-full transition text-zinc-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h3 className="text-2xl font-bold text-zinc-800">Edit Category</h3>
      </div>

      <CategoryForm category={category} />
    </div>
  );
}
