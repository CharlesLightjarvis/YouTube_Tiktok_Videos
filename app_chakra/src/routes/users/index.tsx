import { getUsers } from '@/data/users-api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
  component: RouteComponent,
  ssr: false,
})

function RouteComponent() {
  // ❌ useQuery s'exécute côté CLIENT (navigateur)
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers, // Appelle la Server Function depuis le browser
  })

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-8 text-white"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(59, 130, 246, 0.3), transparent)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8">
          Liste des utilisateurs
        </h1>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-zinc-400">Chargement des utilisateurs...</p>
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
                Erreur lors du chargement des utilisateurs
              </p>
            </div>
          </div>
        )}

        {/* Users List */}
        {!isLoading && !error && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-sm text-zinc-400">{user.email}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Info Badge */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
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
                Server Functions dans un fichier séparé
              </h3>
              <p className="text-sm text-zinc-400">
                Cette page utilise{' '}
                <code className="px-2 py-1 bg-white/10 rounded">
                  ssr: false
                </code>
                {' '}et charge les données depuis un fichier Server Functions séparé.
              </p>
              <p className="text-xs text-zinc-500 mt-2">
                📍 Fichier: <code>src/routes/users/index.tsx</code>
              </p>
              <p className="text-xs text-zinc-500">
                📡 API: <code>src/data/users-api.ts → getUsers()</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
