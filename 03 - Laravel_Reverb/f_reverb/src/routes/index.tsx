import echo from '@/lib/echo'
import { createFileRoute } from '@tanstack/react-router'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  useEffect(() => {
    echo
      ?.channel('likes')
      .listen('IncrementLikeEvent', (event: { likes: number }) => {
        console.log(event)
        setLike(true)
      })

    echo
      ?.channel('likes')
      .listen('DecrementLikeEvent', (event: { likes: number }) => {
        console.log(event)
        setLike(false)
      })
  }, [echo])

  const [like, setLike] = useState(false)
  const toggleLike = () => setLike(!like)

  return (
    <div className="h-screen flex items-center justify-center">
      <Heart
        size={200}
        onClick={toggleLike}
        className={
          like ? 'text-red-500 fill-red-500' : 'text-gray-300 fill-gray-300'
        }
      />
    </div>
  )
}
