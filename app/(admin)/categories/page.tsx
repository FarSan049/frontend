import { prisma } from "@/lib/db";
import Link from "next/link";
import { deleteCategoryAction } from "@/app/actions/category/category-delete";
import DeleteButton from "@/app/components/admin/DeleteButton";

export default async function CategoriesListPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
        _count: {
            select: { products: true }
        }
    }
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-zinc-800">Category Management</h3>
          <p className="text-sm text-zinc-500">Manage your product categories and classification.</p>
        </div>
        <Link
          href="/categories/create"
          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition shadow-sm font-medium"
        >
          Add New Category
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100">
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-center">Products Count</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-zinc-900">{category.name}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                      {category._count.products} products
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/categories/${category.id}/edit`}
                        className="p-2 text-zinc-600 hover:text-green-700 hover:bg-green-50 rounded-md transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <DeleteButton id={category.id} action={deleteCategoryAction} />
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-zinc-500 italic text-sm">
                    No categories found. Start by adding one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
