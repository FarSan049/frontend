import { prisma } from "@/lib/db";
import Link from "next/link";
import { deleteTestimonialAction } from "@/app/actions/testimonial/testimonial-actions";
import DeleteButton from "@/app/components/admin/DeleteButton";

export default async function TestimonialsListPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-zinc-800">Testimonial Management</h3>
          <p className="text-sm text-zinc-500">Manage client reviews and feedback.</p>
        </div>
        <Link
          href="/testimonials/create"
          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition shadow-sm font-medium"
        >
          Add New Testimonial
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100">
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                        <p className="text-sm font-semibold text-zinc-900">{t.name}</p>
                        <p className="text-xs text-zinc-500">{t.role}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-zinc-600 line-clamp-2">{t.message}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/testimonials/${t.id}/edit`}
                        className="p-2 text-zinc-600 hover:text-green-700 hover:bg-green-50 rounded-md transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <DeleteButton id={t.id} action={deleteTestimonialAction} />
                    </div>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-zinc-500 italic text-sm">
                    No testimonials found. Start by adding one.
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
