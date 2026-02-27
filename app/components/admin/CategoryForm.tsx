"use client";

import { useActionState } from "react";
import { createCategoryAction } from "@/app/actions/category/category-create";
import { updateCategoryAction } from "@/app/actions/category/category-update";
import Link from "next/link";
import type { Category } from "@prisma/client";

interface CategoryFormProps {
  category?: Category;
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const isEdit = !!category;
  
  // Bind the ID to the update action if we're in edit mode
  const updateCategoryWithId = isEdit ? updateCategoryAction.bind(null, category.id) : null;
  
  const [state, action, isPending] = useActionState(
    isEdit ? updateCategoryWithId! : createCategoryAction,
    { errors: {}, message: null }
  );

  return (
    <form action={action} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-zinc-700 ml-1">
          Category Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="e.g., Bouquet, Standing Flower"
          defaultValue={category?.name || ""}
          className={`w-full px-4 py-3 rounded-xl border ${
            state.errors?.name ? "border-red-500 bg-red-50/10" : "border-zinc-200 focus:border-green-500 bg-zinc-50/30"
          } transition focus:ring-4 focus:ring-green-500/10 outline-none font-medium`}
        />
        {state.errors?.name && (
          <p className="text-xs font-semibold text-red-500 mt-1 ml-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div className="pt-4 flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-green-900/10"
        >
          {isPending ? "Saving..." : isEdit ? "Update Category" : "Add Category"}
        </button>
        <Link
          href="/categories"
          className="flex-1 px-6 py-3 rounded-xl font-bold text-zinc-600 hover:bg-zinc-100 transition text-center"
        >
          Cancel
        </Link>
      </div>

      {state.message && !state.errors && (
        <div className={`p-4 rounded-xl text-sm font-medium ${state.message.includes("success") ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
          {state.message}
        </div>
      )}
    </form>
  );
}
