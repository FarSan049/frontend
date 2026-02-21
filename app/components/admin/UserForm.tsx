"use client";

import { useActionState } from "react";
import { createUserAction } from "@/app/actions/user/user-create";
import { updateUserAction } from "@/app/actions/user/user-update";
import Link from "next/link";

interface UserFormProps {
  user?: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface ActionState {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
}

export default function UserForm({ user }: UserFormProps) {
  const isEdit = !!user;
  const action = isEdit ? updateUserAction.bind(null, user.id) : createUserAction;
  const [state, formAction, isPending] = useActionState<ActionState | null, FormData>(action as any, null);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 block">Full Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user?.name || ""}
            required
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-green-700/20 focus:border-green-700 outline-none transition"
            placeholder="e.g. John Doe"
          />
          {state?.errors?.name && (
            <p className="text-xs text-red-500 mt-1">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 block">Email Address</label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email || ""}
            required
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-green-700/20 focus:border-green-700 outline-none transition"
            placeholder="name@example.com"
          />
          {state?.errors?.email && (
            <p className="text-xs text-red-500 mt-1">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 block">
            {isEdit ? "New Password (optional)" : "Password"}
          </label>
          <input
            type="password"
            name="password"
            required={!isEdit}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-green-700/20 focus:border-green-700 outline-none transition"
            placeholder="••••••••"
          />
          <p className="text-xs text-zinc-500">
            {isEdit ? "Leave blank to keep current password." : "Must be at least 6 characters long."}
          </p>
          {state?.errors?.password && (
            <p className="text-xs text-red-500 mt-1">{state.errors.password[0]}</p>
          )}
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-md shadow-green-700/10 disabled:opacity-50"
          >
            {isPending ? "Saving..." : isEdit ? "Update User" : "Create User"}
          </button>
          <Link
            href="/users"
            className="flex-1 px-6 py-3 rounded-xl font-bold text-zinc-600 hover:bg-zinc-100 transition text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
