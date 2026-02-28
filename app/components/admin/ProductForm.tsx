"use client";

import { useActionState, useState, useEffect } from "react";
import { createProductAction } from "@/app/actions/product/product-create";
import { updateProductAction } from "@/app/actions/product/product-update";
import Link from "next/link";
import Image from "next/image";

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    desc: string;
    images: any;
    idcategory: string;
  };
  categories: {
    id: string;
    name: string;
  }[];
}

interface ActionState {
  errors?: {
    name?: string[];
    desc?: string[];
    idcategory?: string[];
    images?: string[];
  };
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const isEdit = !!product;
  const action = isEdit ? updateProductAction.bind(null, product.id) : createProductAction;
  const [state, formAction, isPending] = useActionState<ActionState | null, FormData>(action as any, null);

  const initialImageUrl = product 
    ? (Array.isArray(product.images) ? product.images[0] : product.images) 
    : "";

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
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 block">Product Name</label>
          <input
            type="text"
            name="name"
            defaultValue={product?.name || ""}
            required
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-green-700/20 focus:border-green-700 outline-none transition"
            placeholder="e.g. Monstera Variegata"
          />
          {state?.errors?.name && (
            <p className="text-xs text-red-500 mt-1">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 block">Category</label>
          <select
            name="idcategory"
            defaultValue={product?.idcategory || ""}
            required
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-green-700/20 focus:border-green-700 outline-none transition bg-white"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {state?.errors?.idcategory && (
            <p className="text-xs text-red-500 mt-1">{state.errors.idcategory[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 block">Description</label>
          <textarea
            name="desc"
            defaultValue={product?.desc || ""}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-green-700/20 focus:border-green-700 outline-none transition resize-none"
            placeholder="Describe the plant's features..."
          ></textarea>
          {state?.errors?.desc && (
            <p className="text-xs text-red-500 mt-1">{state.errors.desc[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 block">Product Image</label>
          <div className="flex items-start gap-4">
            {previewUrl && (
              <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-zinc-200 flex-shrink-0 bg-zinc-50">
                <Image
                  src={previewUrl}
                  alt="Product preview"
                  fill
                  className="object-cover"
                  unoptimized={previewUrl.startsWith("blob:")}
                />
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition"
              />
              <p className="text-[10px] text-zinc-400 mt-2">
                Accepted formats: JPG, PNG, WEBP. Max size: 5MB.
              </p>
            </div>
          </div>
          {state?.errors?.images && (
            <p className="text-xs text-red-500 mt-1">{state.errors.images[0]}</p>
          )}
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-md shadow-green-700/10 disabled:opacity-50"
          >
            {isPending ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
          </button>
          <Link
            href="/products"
            className="flex-1 px-6 py-3 rounded-xl font-bold text-zinc-600 hover:bg-zinc-100 transition text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
