"use client";

import { useActionState } from "react";
import { createTestimonialAction, updateTestimonialAction } from "@/app/actions/testimonial/testimonial-actions";
import Link from "next/link";

interface TestimonialActionState {
  errors?: {
    name?: string[];
    role?: string[];
    message?: string[];
  };
  success?: boolean;
  error?: string;
}

interface TestimonialFormProps {
  testimonial?: {
    id: string;
    name: string;
    role: string;
    message: string;
  };
}

export default function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const isEdit = !!testimonial;
  const action = isEdit ? updateTestimonialAction.bind(null, testimonial.id) : createTestimonialAction;
  
  const [state, formAction, isPending] = useActionState(action as any, { 
    errors: {} 
  } as TestimonialActionState);

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-zinc-700 ml-1">
          Client Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={testimonial?.name || ""}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-green-500 bg-zinc-50/30 transition focus:ring-4 focus:ring-green-500/10 outline-none font-medium"
          placeholder="e.g., Andi Pratama"
        />
        {state?.errors?.name && (
          <p className="text-xs font-semibold text-red-500 mt-1 ml-1">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className="text-sm font-semibold text-zinc-700 ml-1">
          Client Role
        </label>
        <input
          id="role"
          name="role"
          type="text"
          defaultValue={testimonial?.role || ""}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-green-500 bg-zinc-50/30 transition focus:ring-4 focus:ring-green-500/10 outline-none font-medium"
          placeholder="e.g., Office Manager"
        />
        {state?.errors?.role && (
          <p className="text-xs font-semibold text-red-500 mt-1 ml-1">{state.errors.role[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-zinc-700 ml-1">
          Message/Review
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          defaultValue={testimonial?.message || ""}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-green-500 bg-zinc-50/30 transition focus:ring-4 focus:ring-green-500/10 outline-none font-medium resize-none"
          placeholder="What did they say about your service?"
        />
        {state?.errors?.message && (
          <p className="text-xs font-semibold text-red-500 mt-1 ml-1">{state.errors.message[0]}</p>
        )}
      </div>

      <div className="pt-4 flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-green-900/10"
        >
          {isPending ? "Saving..." : isEdit ? "Update Testimonial" : "Add Testimonial"}
        </button>
        <Link
          href="/testimonials"
          className="flex-1 px-6 py-3 rounded-xl font-bold text-zinc-600 hover:bg-zinc-100 transition text-center"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
