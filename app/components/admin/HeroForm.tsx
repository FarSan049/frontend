"use client";

import { useActionState, useState, useEffect } from "react";
import { updateHeroAction } from "@/app/actions/hero/hero-actions";
import Image from "next/image";

interface HeroActionState {
  errors?: {
    title?: string[];
    motto?: string[];
    subtitle?: string[];
    images?: string[];
  };
  success?: boolean;
  error?: string;
}

interface HeroFormProps {
  hero?: {
    title: string;
    motto: string;
    subtitle: string;
    images: any;
  };
}

export default function HeroForm({ hero }: HeroFormProps) {
  const [state, formAction, isPending] = useActionState(updateHeroAction as any, { 
    errors: {} 
  } as HeroActionState);

  const initialImageUrl = (hero?.images as string) || "/images/hero-office.jpg";
  const [previewUrl, setPreviewUrl] = useState<string>(initialImageUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
      <div className="space-y-4">
        <label className="text-sm font-semibold text-zinc-700 ml-1">Hero Image</label>
        <div className="flex items-start gap-4">
          <div className="relative w-48 h-32 rounded-xl overflow-hidden border border-zinc-200 flex-shrink-0 bg-zinc-50">
            <Image
              src={previewUrl}
              alt="Hero image preview"
              fill
              className="object-cover"
              unoptimized={previewUrl.startsWith("blob:")}
            />
          </div>
          <div className="flex-1">
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition"
            />
            <p className="text-[10px] text-zinc-400 mt-2">
              Best resolution: 1920x1080. Max size: 5MB.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-semibold text-zinc-700 ml-1">
            Title Content
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={hero?.title || "Sewa Tanaman untuk"}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-green-500 bg-zinc-50/30 transition focus:ring-4 focus:ring-green-500/10 outline-none font-medium"
            placeholder="e.g., Sewa Tanaman untuk"
          />
          {state?.errors?.title && (
            <p className="text-xs font-semibold text-red-500 mt-1 ml-1">{state.errors.title[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="motto" className="text-sm font-semibold text-zinc-700 ml-1">
            Motto (Highlighted Text)
          </label>
          <input
            id="motto"
            name="motto"
            type="text"
            defaultValue={hero?.motto || "Kantor yang Lebih Estetik"}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-green-500 bg-zinc-50/30 transition focus:ring-4 focus:ring-green-500/10 outline-none font-medium"
            placeholder="e.g., Kantor yang Lebih Estetik"
          />
          {state?.errors?.motto && (
            <p className="text-xs font-semibold text-red-500 mt-1 ml-1">{state.errors.motto[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subtitle" className="text-sm font-semibold text-zinc-700 ml-1">
          Subtitle
        </label>
        <textarea
          id="subtitle"
          name="subtitle"
          rows={3}
          defaultValue={hero?.subtitle || "Ciptakan suasana kerja yang nyaman dan profesional tanpa ribet perawatan. Kami urus semuanya untuk Anda."}
          className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-green-500 bg-zinc-50/30 transition focus:ring-4 focus:ring-green-500/10 outline-none font-medium resize-none"
          placeholder="Ciptakan suasana kerja yang nyaman..."
        />
        {state?.errors?.subtitle && (
          <p className="text-xs font-semibold text-red-500 mt-1 ml-1">{state.errors.subtitle[0]}</p>
        )}
      </div>

      {state?.error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm font-medium">
          Hero section updated successfully!
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-700 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-green-900/10 flex items-center justify-center gap-2"
        >
          {isPending ? "Updating..." : "Update Hero Section"}
        </button>
      </div>
    </form>
  );
}
