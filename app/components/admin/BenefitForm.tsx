"use client";

import { useActionState } from "react";
import { createBenefitAction, updateBenefitAction } from "@/app/actions/benefit/benefit-actions";
import Link from "next/link";

interface BenefitActionState {
  errors?: {
    title?: string[];
    desc?: string[];
    icon?: string[];
  };
  success?: boolean;
  error?: string;
}

interface BenefitFormProps {
  benefit?: {
    id: string;
    title: string;
    desc: string;
    icon: string;
  };
}

export default function BenefitForm({ benefit }: BenefitFormProps) {
  const isEdit = !!benefit;
  const action = isEdit ? updateBenefitAction.bind(null, benefit.id) : createBenefitAction;
  
  const [state, formAction, isPending] = useActionState(action as any, { 
    errors: {} 
  } as BenefitActionState);

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-semibold text-zinc-700 ml-1">
          Benefit Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={benefit?.title || ""}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-green-500 bg-zinc-50/30 transition focus:ring-4 focus:ring-green-500/10 outline-none font-medium"
          placeholder="e.g., Free Maintenance"
        />
        {state?.errors?.title && (
          <p className="text-xs font-semibold text-red-500 mt-1 ml-1">{state.errors.title[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="icon" className="text-sm font-semibold text-zinc-700 ml-1">
          Icon (Emoji)
        </label>
        <input
          id="icon"
          name="icon"
          type="text"
          defaultValue={benefit?.icon || ""}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-green-500 bg-zinc-50/30 transition focus:ring-4 focus:ring-green-500/10 outline-none font-medium"
          placeholder="e.g., 🌱"
        />
        {state?.errors?.icon && (
          <p className="text-xs font-semibold text-red-500 mt-1 ml-1">{state.errors.icon[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="desc" className="text-sm font-semibold text-zinc-700 ml-1">
          Description
        </label>
        <textarea
          id="desc"
          name="desc"
          rows={4}
          defaultValue={benefit?.desc || ""}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-green-500 bg-zinc-50/30 transition focus:ring-4 focus:ring-green-500/10 outline-none font-medium resize-none"
          placeholder="Tell users why this is a benefit..."
        />
        {state?.errors?.desc && (
          <p className="text-xs font-semibold text-red-500 mt-1 ml-1">{state.errors.desc[0]}</p>
        )}
      </div>

      <div className="pt-4 flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-green-900/10"
        >
          {isPending ? "Saving..." : isEdit ? "Update Benefit" : "Add Benefit"}
        </button>
        <Link
          href="/benefits"
          className="flex-1 px-6 py-3 rounded-xl font-bold text-zinc-600 hover:bg-zinc-100 transition text-center"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
