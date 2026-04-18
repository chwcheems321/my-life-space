import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Video, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { formatDate, formatDuration } from '@/lib/utils'

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="py-8"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 shadow-cute mb-4">
          <Video className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted">视频集</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">影像时刻</span>
        </h1>
        <p className="text-muted">
          {videos.length} 个视频 · 点击播放
        </p>
      </motion.div>

      {/* Videos Grid */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="cute-card overflow-hidden"
            >
              {/* Video Player */}
              <div className="relative aspect-video bg-gradient-to-br from-secondary to-accent">
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
                    className="absolute inset-0 group w-full h-full"
                  >
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.postTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl opacity-50">🎬</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-primary-dark ml-1" />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/70 rounded-full text-white text-sm font-medium">
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
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-cute animate-float">
            <span className="text-6xl">🎬</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">还没有视频</h3>
          <p className="text-muted mb-6">上传你的第一个视频吧</p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 cute-btn"
          >
            <Plus className="w-4 h-4" />
            上传视频
          </Link>
        </motion.div>
      )}
    </motion.div>
  )
}
