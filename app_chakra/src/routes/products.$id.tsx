import { createFileRoute, Link } from '@tanstack/react-router'
import { getProductById } from '@/data/laravel-api'

// ✅ FULL SSR - Page détail produit avec SEO
export const Route = createFileRoute('/products/$id')({
  loader: async ({ params }) => {
    const id = parseInt(params.id)
    return await getProductById({ data: id })
  },
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const product = Route.useLoaderData()

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-8 text-white"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120, 119, 198, 0.3), transparent)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour aux produits
        </Link>

        {/* Product Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-xs font-mono text-zinc-500">
                Produit #{product.id}
              </span>
              <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {product.name}
              </h1>
            </div>
            {product.inStock ? (
              <span className="px-4 py-2 text-sm font-semibold bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                En stock
              </span>
            ) : (
              <span className="px-4 py-2 text-sm font-semibold bg-red-500/20 text-red-400 border border-red-500/30 rounded-full">
                Rupture de stock
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mb-8">
            <span className="text-3xl font-bold text-white">
              {product.price}
            </span>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-zinc-300">
              Description
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              disabled={!product.inStock}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100"
            >
              {product.inStock ? 'Ajouter au panier' : 'Produit indisponible'}
            </button>
            <button className="px-6 py-4 border border-white/20 hover:border-white/40 rounded-lg transition-colors">
              <svg
                className="w-6 h-6 text-zinc-400 hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Info Badge */}
        <div className="mt-8 p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-400"
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
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                Page dynamique SSR
              </h3>
              <p className="text-sm text-zinc-400">
                Cette page utilise un paramètre dynamique <code className="px-2 py-1 bg-white/10 rounded">$id</code>
                {' '}et charge les données côté serveur pour chaque produit. L'URL change mais le SEO reste optimal.
              </p>
              <p className="text-xs text-zinc-500 mt-2">
                📍 Fichier: <code>src/routes/products.$id.tsx</code>
              </p>
              <p className="text-xs text-zinc-500">
                📡 API: <code>src/data/laravel-api.ts → getProductById()</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
