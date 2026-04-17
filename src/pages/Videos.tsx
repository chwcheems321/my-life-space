import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { formatDate, formatDuration, cn } from '@/lib/utils'

export default function Videos() {
  const { posts } = useApp()
  const [playingId, setPlayingId] = useState<string | null>(null)

  const videos = posts.flatMap(post =>
    post.media
      .filter(m => m.type === 'video')
      .map(media => ({
        ...media,
        postId: post.id,
        postTitle: post.title || post.content.slice(0, 50),
        postDate: post.createdAt,
        authorName: post.authorName
      }))
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6"
    >
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          视频
        </h1>
        <p className="text-muted">
          {videos.length} 个视频
        </p>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-lg shadow-soft overflow-hidden card-hover"
            >
              {/* Video Player / Thumbnail */}
              <div className="relative aspect-video bg-gray-100">
                {playingId === video.id ? (
                  <video
                    src={video.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    onEnded={() => setPlayingId(null)}
                  />
                ) : (
                  <button
                    onClick={() => setPlayingId(video.id)}
                    className="absolute inset-0 group"
                  >
                    <img
                      src={video.thumbnail || ''}
                      alt={video.postTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-gray-800 ml-1" />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-sm font-medium">
                        {formatDuration(video.duration)}
                      </div>
                    )}
                  </button>
                )}
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-medium text-foreground line-clamp-2 mb-2">
                  {video.postTitle}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>{video.authorName}</span>
                  <span>{formatDate(video.postDate)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-4xl">🎬</span>
          </div>
          <h3 className="font-serif text-xl text-foreground mb-2">还没有视频</h3>
          <p className="text-muted">上传你的第一个视频吧</p>
        </div>
      )}
    </motion.div>
  )
}
