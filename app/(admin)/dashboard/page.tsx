import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [userCount, productCount, categoryCount] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.category.count(),
  ]);

  const stats = [
    { name: "Total Users", value: userCount, icon: "👥", color: "bg-blue-500" },
    { name: "Total Products", value: productCount, icon: "🌿", color: "bg-green-500" },
    { name: "Total Categories", value: categoryCount, icon: "📁", color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">{stat.name}</p>
              <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <h3 className="text-lg font-semibold text-zinc-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <a href="/users/create" className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-zinc-200 hover:border-green-500 hover:bg-green-50 transition-colors group">
              <span className="text-2xl mb-2">👤+</span>
              <span className="text-sm font-medium text-zinc-600 group-hover:text-green-700">Add User</span>
            </a>
            <a href="/products/create" className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-zinc-200 hover:border-green-500 hover:bg-green-50 transition-colors group">
              <span className="text-2xl mb-2">🌿+</span>
              <span className="text-sm font-medium text-zinc-600 group-hover:text-green-700">Add Product</span>
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <h3 className="text-lg font-semibold text-zinc-800 mb-4">System Info</h3>
          <div className="space-y-3">
             <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Next.js Version</span>
                <span className="font-mono text-zinc-700">16.0.10</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Database</span>
                <span className="text-zinc-700">MariaDB</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Prisma Client</span>
                <span className="text-zinc-700">v7.4.1</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
