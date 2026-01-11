import { createFileRoute, Link } from '@tanstack/react-router'
import { getProducts } from '@/data/laravel-api'

// ✅ FULL SSR - Page publique avec SEO
export const Route = createFileRoute('/products/')({
  loader: async () => await getProducts(), // Exécuté côté SERVEUR
  component: ProductsPage,
})

function ProductsPage() {
  const products = Route.useLoaderData()

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-8 text-white"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120, 119, 198, 0.3), transparent)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nos Produits
          </h1>
          <p className="text-zinc-400 text-lg">
            Page rendue côté serveur (Full SSR) - Parfait pour le SEO
          </p>
          <Link
            to="/"
            className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              {/* Stock Badge */}
              <div className="absolute top-4 right-4">
                {product.inStock ? (
                  <span className="px-3 py-1 text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                    En stock
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30 rounded-full">
                    Rupture
                  </span>
                )}
              </div>

              {/* Product ID */}
              <div className="mb-4">
                <span className="text-xs font-mono text-zinc-500">
                  #{product.id}
                </span>
              </div>

              {/* Product Name */}
              <h2 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                {product.name}
              </h2>

              {/* Product Description */}
              <p className="text-sm text-zinc-400 mb-4 line-clamp-3">
                {product.description}
              </p>

              {/* View Button */}
              <Link
                to="/products/$id"
                params={{ id: String(product.id) }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Voir le détail
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Info Badge */}
        <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-400"
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
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Mode Full SSR activé
              </h3>
              <p className="text-sm text-zinc-400">
                Cette page est rendue côté serveur. Le HTML complet avec les
                produits est envoyé directement au navigateur. Parfait pour le
                référencement Google (SEO) et les performances.
              </p>
              <p className="text-xs text-zinc-500 mt-2">
                📍 Fichier: <code>src/routes/products.tsx</code>
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
