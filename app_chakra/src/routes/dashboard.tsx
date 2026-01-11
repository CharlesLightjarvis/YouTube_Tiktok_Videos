import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/data/laravel-api'

// ✅ SPA MODE - Page privée sans SSR (Dashboard admin)
export const Route = createFileRoute('/dashboard')({
  ssr: false, // ❌ Pas de SSR pour le dashboard
  component: DashboardPage,
})

function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // ❌ useQuery s'exécute côté CLIENT (navigateur)
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts, // Appelle la Server Function depuis le browser
  })

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-8 text-white"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(236, 72, 153, 0.3), transparent)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Dashboard Administrateur
              </h1>
              <p className="text-zinc-400 mt-2">
                Gestion des produits - Mode SPA (sans SSR)
              </p>
            </div>
            <Link
              to="/"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
            >
              ← Accueil
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
              <p className="text-zinc-400">Chargement des produits...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-400 font-semibold">
                Erreur lors du chargement des produits
              </p>
            </div>
          </div>
        )}

        {/* Users Grid */}
        {!isLoading && !error && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="text-3xl font-bold text-white mb-1">
                  {products.length}
                </div>
                <div className="text-sm text-zinc-400">Total produits</div>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="text-3xl font-bold text-white mb-1">
                  {filteredProducts.length}
                </div>
                <div className="text-sm text-zinc-400">Résultats filtrés</div>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  {products.filter((p) => p.inStock).length}
                </div>
                <div className="text-sm text-zinc-400">En stock</div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Produit
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {product.id}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-white">
                                {product.name}
                              </div>
                              <div className="text-xs text-zinc-500">
                                ID: {product.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-zinc-400 max-w-xs truncate">
                          {product.description}
                        </td>
                        <td className="px-6 py-4">
                          {product.inStock ? (
                            <span className="px-3 py-1 text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                              En stock
                            </span>
                          ) : (
                            <span className="px-3 py-1 text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30 rounded-full">
                              Rupture
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="px-3 py-1 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-colors">
                            Modifier
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredProducts.length === 0 && !isLoading && (
                <div className="py-12 text-center">
                  <p className="text-zinc-400">Aucun produit trouvé</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Info Badge */}
        <div className="mt-8 p-6 bg-pink-500/10 border border-pink-500/20 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-pink-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">
                Mode SPA activé (sans SSR)
              </h3>
              <p className="text-sm text-zinc-400">
                Ce dashboard utilise{' '}
                <code className="px-2 py-1 bg-white/10 rounded">
                  ssr: false
                </code>
                . Les données sont chargées côté client avec React Query après
                le rendu initial. Parfait pour les pages privées qui n'ont pas
                besoin de SEO.
              </p>
              <p className="text-xs text-zinc-500 mt-2">
                📍 Fichier: <code>src/routes/dashboard.tsx</code>
              </p>
              <p className="text-xs text-zinc-500">
                📡 API: <code>src/data/laravel-api.ts → getProducts()</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
