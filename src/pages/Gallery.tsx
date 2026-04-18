import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Camera, Plus } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import Lightbox from '@/components/common/Lightbox'

export default function Gallery() {
  const { posts } = useApp()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Collect all images from posts
  const allImages = posts.flatMap(post =>
    post.media
      .filter(m => m.type === 'image')
      .map(img => ({
        ...img,
        postId: post.id,
        postTitle: post.title || post.content.slice(0, 30),
        postDate: post.createdAt
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
          <Camera className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted">照片墙</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">美好瞬间</span>
        </h1>
        <p className="text-muted">
          {allImages.length} 张照片 · 点击查看大图
        </p>
      </motion.div>

      {/* Gallery */}
      {allImages.length > 0 ? (
        <div className="masonry-grid">
          {allImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.3 }}
              className="masonry-item group cursor-pointer"
              onClick={() => {
                setLightboxIndex(idx)
                setLightboxOpen(true)
              }}
            >
              <div className="cute-image relative overflow-hidden">
                <img
                  src={img.thumbnail || img.url}
                  alt={img.postTitle}
                  className="w-full"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium truncate">{img.postTitle}</p>
                  </div>
                </div>
                {/* Play icon for images with video */}
                {img.thumbnail && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <span className="text-lg">▶️</span>
                    </div>
                  </div>
                )}
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
            <span className="text-6xl">📷</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">还没有照片</h3>
          <p className="text-muted mb-6">上传你的第一张照片吧</p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 cute-btn"
          >
            <Plus className="w-4 h-4" />
            上传照片
          </Link>
        </motion.div>
      )}

      <Lightbox
        images={allImages.map(m => m.url)}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
    </motion.div>
  )
}
