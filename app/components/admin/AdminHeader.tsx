"use client";

import { usePathname } from "next/navigation";

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email: string;
  };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname.startsWith("/dashboard")) return "Dashboard Overview";
    if (pathname.startsWith("/users")) return "User Management";
    if (pathname.startsWith("/products")) return "Product Management";
    if (pathname.startsWith("/categories")) return "Category Management";
    return "Admin Panel";
  };

  return (
    <header className="h-16 bg-white border-b border-zinc-200 px-8 flex items-center justify-between shadow-sm flex-none">
      <h2 className="text-xl font-semibold text-zinc-800">{getPageTitle()}</h2>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-zinc-900">{user.name || "Administrator"}</p>
          <p className="text-xs text-zinc-500">{user.email}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
          {(user.name || user.email).charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
